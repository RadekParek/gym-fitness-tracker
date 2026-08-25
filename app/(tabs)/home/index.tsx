import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  // Mock user role - this will be driven by Supabase Auth context later
  const userRole = 'customer'; 

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
            {['Peter', 'Michal', 'Jana'].map((client, idx) => (
              <TouchableOpacity key={idx} style={styles.clientCard}>
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{client}</Text>
                  <Text style={styles.clientStatus}>Posledný tréning: pred 2 dňami</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.dark.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.mainAction} onPress={() => {}}>
            <Text style={styles.mainActionText}>PRIDAŤ NOVÝ KLIENT</Text>
            <Ionicons name="person-add" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      )}
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
});
