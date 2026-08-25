import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Set {
  id: string;
  reps: string;
  weight: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export default function WorkoutsScreen() {
  const [workoutName, setWorkoutName] = useState('Moja Posilňa');
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: 'Nové cvičenie',
      sets: [{ id: '1', reps: '', weight: '' }],
    };
    setExercises([...exercises, newExercise]);
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: [...ex.sets, { id: (ex.sets.length + 1).toString(), reps: '', weight: '' }]
        };
      }
      return ex;
    }));
  };

  const updateSet = (exerciseId: string, setId: string, field: 'reps' | 'weight', value: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(s => s.id === setId ? { ...s, [field]: value } : s)
        };
      }
      return ex;
    }));
  };

  const updateExerciseName = (exerciseId: string, name: string) => {
    setExercises(exercises.map(ex => ex.id === exerciseId ? { ...ex, name } : ex));
  };

  const finishWorkout = () => {
    Alert.alert('Tréning ukončený!', 'Tvoj výkon bol uložený a odoslaný trenérovi. 💪');
    setExercises([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput 
          style={styles.workoutTitle} 
          value={workoutName} 
          onChangeText={setWorkoutName}
        />
        <TouchableOpacity style={styles.finishButton} onPress={finishWorkout}>
          <Text style={styles.finishButtonText}>UKONČIŤ</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.workoutList} contentContainerStyle={styles.scrollContent}>
        {exercises.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="barbell" size={64} color={Colors.dark.border} />
            <Text style={styles.emptyText}>Žiadne cvičenia. Pridaj si prvé!</Text>
          </View>
        ) : (
          exercises.map((ex, exIdx) => (
            <View key={ex.id} style={styles.exerciseCard}>
              <TextInput 
                style={styles.exerciseNameInput} 
                value={ex.name} 
                onChangeText={(val) => updateExerciseName(ex.id, val)}
              />
              
              <View style={styles.setsTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>SÉRIA</Text>
                  <Text style={styles.headerText}>OPAK.</Text>
                  <Text style={styles.headerText}>VÁHA (kg)</Text>
                </View>
                
                {ex.sets.map((set, sIdx) => (
                  <View key={set.id} style={styles.setRow}>
                    <Text style={styles.setNumber}>{sIdx + 1}</Text>
                    <TextInput 
                      style={styles.setInput} 
                      keyboardType="numeric" 
                      placeholder="0"
                      value={set.reps} 
                      onChangeText={(val) => updateSet(ex.id, set.id, 'reps', val)}
                    />
                    <TextInput 
                      style={styles.setInput} 
                      keyboardType="numeric" 
                      placeholder="0"
                      value={set.weight} 
                      onChangeText={(val) => updateSet(ex.id, set.id, 'weight', val)}
                    />
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(ex.id)}>
                <Ionicons name="add-circle-outline" size={20} color={Colors.dark.tint} />
                <Text style={styles.addSetText}>Pridať sériu</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={addExercise}>
        <Ionicons name="add" size={32} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.dark.text,
    textTransform: 'uppercase',
    flex: 1,
  },
  finishButton: {
    backgroundColor: Colors.dark.tint,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  finishButtonText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 14,
  },
  workoutList: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    gap: 16,
  },
  emptyText: {
    color: Colors.dark.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  exerciseNameInput: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.dark.text,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    paddingBottom: 4,
  },
  setsTable: {
    gap: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.dark.textMuted,
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
  },
  setNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark.text,
    width: 20,
    textAlign: 'center',
  },
  setInput: {
    backgroundColor: Colors.dark.background,
    color: Colors.dark.text,
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: '700',
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    padding: 12,
    backgroundColor: 'rgba(204, 255, 0, 0.1)',
    borderRadius: 12,
  },
  addSetText: {
    color: Colors.dark.tint,
    fontWeight: '700',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: Colors.dark.tint,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
