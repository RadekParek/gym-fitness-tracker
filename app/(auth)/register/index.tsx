import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');

  const handleRegister = () => {
    // Mock registration logic
    router.push('/(auth)/select-role');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Vítaj v <Text style={styles.accent}>ApexFit</Text></Text>
        <Text style={styles.subtitle}>Začni budovať svoju najlepšiu verziu.</Text>

        <View style={styles.inputGroup}>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor={Colors.dark.textMuted}
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Heslo" 
            placeholderTextColor={Colors.dark.textMuted}
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Dátum narodenia (DD.MM.RRRR)" 
            placeholderTextColor={Colors.dark.textMuted}
            value={dob} 
            onChangeText={setDob} 
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Pokračovať</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.link} onPress={() => router.replace('/(tabs)/home')}>
          <Text style={styles.linkText}>Už máš účet? <Text style={styles.accent}>Prihlás sa</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
  inputGroup: {
    gap: 16,
    marginBottom: 32,
  },
  input: {
    backgroundColor: Colors.dark.muted,
    color: Colors.dark.text,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  button: {
    backgroundColor: Colors.dark.tint,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.dark.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  link: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    color: Colors.dark.textMuted,
    fontSize: 14,
  },
});
