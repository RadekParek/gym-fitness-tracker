import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function FinishSetupScreen() {
  const router = useRouter();
  
  // Mock profile code - in real app, this would come from Supabase profile table
  const profileCode = "APEX-7X2B-99";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>✓</Text>
        </View>

        <Text style={styles.title}>Setup <Text style={styles.accent}>Dokončené!</Text></Text>
        <Text style={styles.subtitle}>Tvoj účet v ApexFit je teraz pripravený na akciu.</Text>

        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Tvoj unikátny kód pre trenéra:</Text>
          <Text style={styles.codeValue}>{profileCode}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={() => alert('Kód kopírovaný!')}>
            <Text style={styles.copyButtonText}>Kopírovať kód</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>
          Poskytni tento kód svojmu trenérovi, aby ťa mohol pridať do svojho systému a sledovať tvoj progres.
        </Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.buttonText}>SPOŠTARTOVAT TRÉNING</Text>
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
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.dark.card,
    width: '100%',
    padding: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.tint,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  accent: {
    color: Colors.dark.tint,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textMuted,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  codeContainer: {
    backgroundColor: Colors.dark.background,
    width: '100%',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    alignItems: 'center',
    marginBottom: 24,
  },
  codeLabel: {
    fontSize: 14,
    color: Colors.dark.textMuted,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  codeValue: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.dark.tint,
    letterSpacing: 4,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  copyButton: {
    backgroundColor: Colors.dark.muted,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  copyButtonText: {
    color: Colors.dark.text,
    fontSize: 12,
    fontWeight: '600',
  },
  hint: {
    fontSize: 14,
    color: Colors.dark.textMuted,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  button: {
    backgroundColor: Colors.dark.tint,
    width: '100%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
