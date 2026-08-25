import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  // Mock role - in real app this comes from Supabase/Auth
  const [userRole, setUserRole] = useState<'client' | 'coach'>('client');
  const [profileCode] = useState('APEX-7742-X');

  const copyToClipboard = async (text: string) => {
    try {
      await Share.share({ message: `Pridaj sa k mne do ApexFit! Môj kód je: ${text}` });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color={Colors.dark.tint} />
        </View>
        <Text style={styles.userName}>ALEX SMITH</Text>
        <Text style={styles.userRole}>{userRole === 'client' ? 'KLIENT' : 'TRENÉR'}</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>TRÉNINGY</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>+5kg</Text>
          <Text style={styles.statLabel}>PROGRES</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>SÉRIE</Text>
        </View>
      </View>

      {/* User Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OSOBNÉ ÚD AJE</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Váha</Text>
          <Text style={styles.detailValue}>82 kg</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Výška</Text>
          <Text style={styles.detailValue}>185 cm</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Pohlavie</Text>
          <Text style={styles.detailValue}>Muž</Text>
        </View>
      </View>

      {/* Coach Only Section */}
      {userRole === 'coach' && (
        <View style={[styles.section, styles.coachSection]}>
          <Text style={styles.sectionTitle}>SPRÁVA KLIENTOV</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Môj unikátny kód:</Text>
            <Text style={styles.profileCode}>{profileCode}</Text>
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={() => copyToClipboard(profileCode)}>
            <Ionicons name="share-social-outline" size={20} color="#000" />
            <Text style={styles.shareButtonText}>ZDIEĽAŤ KÓD</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Settings / Logout */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={Colors.dark.textMuted} />
          <Text style={styles.logoutText}>ODHLÁSIŤ SA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    gap: 12,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.tint,
  },
  userName: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.dark.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  userRole: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark.tint,
    textTransform: 'uppercase',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: Colors.dark.card,
    width: '30%',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.dark.text,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.dark.textMuted,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  section: {
    backgroundColor: Colors.dark.card,
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  coachSection: {
    borderColor: Colors.dark.tint,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.dark.textMuted,
    textTransform: 'uppercase',
    marginBottom: 16,
    letterSpacing: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.dark.textMuted,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 16,
    color: Colors.dark.text,
    fontWeight: '800',
  },
  codeContainer: {
    backgroundColor: Colors.dark.background,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: Colors.dark.tint,
  },
  codeLabel: {
    fontSize: 12,
    color: Colors.dark.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  profileCode: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.dark.tint,
    letterSpacing: 2,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.dark.tint,
    padding: 16,
    borderRadius: 16,
  },
  shareButtonText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
  },
  logoutText: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
