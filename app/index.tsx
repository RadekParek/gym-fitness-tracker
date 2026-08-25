import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Card, ActionButton } from '../components/UI';

export default function ActiveWorkout() {
  const [sets, setSets] = useState([]);

  const addSet = () => {
    setSets([...sets, { id: Date.now().toString(), weight: 100, reps: 10 }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>APEXFIT</Text>
      <Card>
        <Text style={styles.exName}>Bench Press</Text>
        <ActionButton label="Log Set" onPress={addSet} />
      </Card>
      <FlatList 
        data={sets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.setRow}>
            <Text style={styles.setText}>Set {sets.indexOf(item) + 1}</Text>
            <Text style={styles.setDetails}>{item.weight}kg x {item.reps}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 24, paddingTop: 60 },
  title: { color: '#00ffcc', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  exName: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  setRow: { backgroundColor: '#1a1a1a', padding: 16, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  setText: { color: '#fff', fontWeight: 'bold' },
  setDetails: { color: '#00ffcc', fontWeight: 'bold' },
});
