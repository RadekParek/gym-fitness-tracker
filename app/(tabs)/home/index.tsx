import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const [userRole, setUserRole] = useState<'customer' | 'trainer' | 'loading'>('loading');
  const [clients, setClients] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clientCode, setClientCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    if (userRole === 'trainer') {
      fetchClients();
    }
  }, [userRole]);

  async function fetchUserProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile) {
        setUserRole(profile.role === 'trainer' ? 'trainer' : 'customer');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async function fetchClients() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, updated_at')
        .eq('trainer_id', user.id);

      if (error) throw error;
      setClients(data || []);
    } catch (error: any) {
      console.error('Error fetching clients:', error);
    }
  }

  async function handleConnectClient() {
    if (!clientCode.trim()) {
      Alert.alert('Chyba', 'Prosím zadajte kód klienta.');
      return;
    }

    if (!clientCode.startsWith('APEX-')) {
      Alert.alert('Chyba', 'Kód musí začínať predponou APEX-');
      return;
    }

    setLoading(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Nie ste prihlásený.');

      // 1. Find client by code
      const { data: clientProfile, error: searchError } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('profile_code', clientCode.trim())
        .single();

      if (searchError || !clientProfile) {
        throw new Error('Kód klienta neexistuje alebo je neplatný.');
      }

      if (clientProfile.role !== 'customer') {
        throw new Error('Tento kód nepatrí klientovi.');
      }

      if (clientProfile.trainer_id === user.id) {
        throw new Error('Tento klient je už s vami prepojený.');
      }

      // 2. Link client to trainer
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ trainer_id: user.id })
        .eq('id', clientProfile.id);

      if (updateError) throw updateError;

      Alert.alert('Úspech!', 'Klient bol úspešne pridaný do vášho zoznamu.');
      setClientCode('');
      setIsModalVisible(false);
      fetchClients();
    } catch (error: any) {
      Alert.alert('Chyba', error.message);
    } finally {
      setLoading(false);
    }
  }

  if (userRole === 'loading') {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.dark.tint} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Ahoj, <Text style={styles.userName}>Radek</Text> 👋</Text>
        <Text style={styles.subtitle}>Tvoj progres dnes vyzerá skvele.</Text>
      </View>

      {userRole === 'customer' ? (
        <View style={styles.customerSection}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="flash" size={24} color={Colors.dark.tint} />
            </View>
            <View>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Tréningov</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="trending-up" size={24} color={Colors.dark.tint} />
            </View>
            <View>
              <Text style={styles.statValue}>+4.5kg</Text>
              <Text style={styles.statLabel}>Prirastok</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.mainAction} onPress={() => {}}>
            <Text style={styles.mainActionText}>ZAČAŤ NOVÝ TRÉNING</Text>
            <Ionicons name="arrow-forward" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.trainerSection}>
          <Text style={styles.sectionTitle}>Tvoji Klienti</Text>
          <View style={styles.clientList}>
            {clients.length === 0 ? (
              <Text style={styles.emptyText}>Zatiaľ nemáte žiadnych pridelených klientov.</Text>
            ) : (
              clients.map((client, idx) => (
                <TouchableOpacity key={client.id} style={styles.clientCard}>
                  <View style={styles.clientInfo}>
                    <Text style={styles.clientName}>{client.username || 'Anonymný klient'}</Text>
                    <Text style={styles.clientStatus}>Posledná aktualizácia: {new Date(client.updated_at).toLocaleDateString()}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.dark.textMuted} />
                </TouchableOpacity>
              ))
            )}
          </View>
          <TouchableOpacity style={styles.mainAction} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.mainActionText}>PRIDAŤ NOVÝ KLIENT</Text>
            <Ionicons name="person-add" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      )}

      {/* Add Client Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>PRIDAŤ KLIENTA</Text>
            <Text style={styles.modalSubtitle}>Zadajte unikátny kód klienta (APEX-XXXX-XXXX)</Text>
            
            <TextInput 
              style={styles.modalInput} 
              placeholder="APEX-XXXX-XXXX" 
              placeholderTextColor="#666"
              value={clientCode} 
              onChangeText={setClientCode} 
              autoCapitalize="characters"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButtonText}>ZRUŠIŤ</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleConnectClient}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#000" size="small" /> : <Text style={styles.confirmButtonText}>PRIDAŤ</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark.text,
  },
  userName: {
    color: Colors.dark.tint,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textMuted,
    marginTop: 4,
  },
  customerSection: {
    gap: 20,
  },
  statCard: {
    backgroundColor: Colors.dark.card,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  statIcon: {
    backgroundColor: Colors.dark.background,
    padding: 12,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.dark.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.dark.textMuted,
  },
  trainerSection: {
    gap: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.dark.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  clientList: {
    gap: 12,
    marginBottom: 24,
  },
  clientCard: {
    backgroundColor: Colors.dark.card,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  clientInfo: {
    gap: 4,
  },
  clientName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  clientStatus: {
    fontSize: 13,
    color: Colors.dark.textMuted,
  },
  emptyText: {
    color: Colors.dark.textMuted,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  mainAction: {
    backgroundColor: Colors.dark.tint,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
  },
  mainActionText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: Colors.dark.card,
    width: '100%',
    borderRadius: 24,
    padding: 30,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    gap: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.dark.text,
    textTransform: 'uppercase',
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.//dark.textMuted,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: Colors.dark.background,
    color: Colors.dark.text,
    padding: 16,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: Colors.dark.border,
  },
  cancelButtonText: {
    color: Colors.dark.text,
    fontWeight: '700',
  },
  confirmButton: {
    flex: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: Colors.dark.tint,
  },
  confirmButtonText: {
    color: '#000',
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
