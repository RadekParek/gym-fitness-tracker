import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function SelectRoleScreen() {
  const router = useRouter();

  const handleRoleSelection = (role: 'trainer' | 'customer') => {
    if (role === 'customer') {
      router.push('/(auth)/client-details');
    } else {
      router.push('/(auth)/finish-setup');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kto <Text style={styles.accent}>si?</Text></Text>
      <Text style={styles.subtitle}>Vyber si svoju rolu v ApexFit systéme.</Text>

      <View style={styles.roleContainer}>
        <TouchableOpacity 
          style={styles.roleCard} 
          onPress={() => handleRoleSelection('customer')}
        >
          <Text style={styles.roleTitle}>KLIENT</Text>
          <Text style={styles.roleDesc}>Chcem sledovať svoj progres, tréningy a zdieľať výsledky.</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.roleCard} 
          onPress={() => handleRoleSelection('trainer')}
        >
          <Text style={styles.roleTitle}>TRENÉR</Text>
          <Text style={styles.roleDesc}>Chcem monitorovať svojich klientov a poskytovať im rady.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  accent: {
    color: Colors.dark.tint,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textMuted,
    textAlign: 'center',
    marginBottom: 40,
  },
  roleContainer: {
    gap: 20,
  },
  roleCard: {
    backgroundColor: Colors.dark.card,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    alignItems: 'center',
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.dark.tint,
    marginBottom: 12,
    letterSpacing: 2,
  },
  roleDesc: {
    fontSize: 15,
    color: Colors.dark.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
