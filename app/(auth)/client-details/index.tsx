import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function ClientDetailsScreen() {
  const router = useRouter();
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleFinish = () => {
    router.push('/(auth)/finish-setup');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Tvoje <Text style={styles.accent}>detaily</Text></Text>
        <Text style={styles.subtitle}>Pomôže nám to s lepším sledovaním tvojho progresu.</Text>

        <View style={styles.inputGroup}>
          <TextInput 
            style={styles.input} 
            placeholder="Pohlavie (M/Ž)" 
            placeholderTextColor={Colors.dark.textMuted}
            value={gender} 
            onChangeText={setGender} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Výška v cm" 
            placeholderTextColor={Colors.dark.textMuted}
            value={height} 
            onChangeText={setHeight} 
            keyboardType="numeric"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Váha v kg" 
            placeholderTextColor={Colors.dark.textMuted}
            value={weight} 
            onChangeText={setWeight} 
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Dokončiť setup</Text>
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
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
});
