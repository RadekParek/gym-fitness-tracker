import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Card = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

export const ActionButton = ({ onPress, label, variant = 'primary' }) => (
  <TouchableOpacity 
    style={[styles.button, variant === 'primary' ? styles.btnPrimary : styles.btnSecondary]} 
    onPress={onPress}
  >
    <Text style={[styles.btnText, variant === 'primary' ? styles.textDark : styles.textAccent]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: '#333', borderRadius: 16, padding: 16 },
  button: { padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnPrimary: { backgroundColor: '#00ffcc' },
  btnSecondary: { backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#00ffcc' },
  btnText: { fontWeight: 'bold', fontSize: 18 },
  textDark: { color: '#0a0a0a' },
  textAccent: { color: '#00ffcc' },
});
