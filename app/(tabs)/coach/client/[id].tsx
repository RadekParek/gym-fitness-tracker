import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Card, ActionButton } from '@/components/UI';

interface Profile {
  full_name: string;
  height: number;
  weight: number;
}

interface Workout {
  id: string;
  completed_at: string;
  workout_sets: any[];
  comments: any[];
}

export default function ClientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchClientData();
  }, [id]);

  async function fetchClientData() {
    try {
      setLoading(true);
      
      // 1. Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, height, weight')
        .eq('id', id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // 2. Fetch Workouts
      const { data: workoutData, error: workoutError } = await supabase
        .from('workouts')
        .select('id, completed_at')
        .eq('client_id', id)
        .order('completed_at', { ascending: false });

      if (workoutError) throw workoutError;
      
      // Initially we just get the workouts, we'll fetch sets/comments on demand or in a batch
      // For simplicity in this view, let's fetch the basic list first
      setWorkouts(workoutData || []);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleWorkout(workoutId: string) {
    if (expandedWorkout === workoutId) {
      setExpandedWorkout(null);
      return;
    }

    setExpandedWorkout(workoutId);

    try {
      // Fetch sets for this workout
      const { data: sets, error: setsError } = await supabase
        .from('workout_sets')
        .select('*')
        .eq('workout_id', workoutId);

      if (setsError) throw setsError;

      // Fetch comments for this workout
      const { data: comments, error: commentsError } = await supabase
        .from('workout_comments')
        .select('*')
        .eq('workout_id', workoutId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      setWorkouts(prev => prev.map(w => 
        w.id === workoutId ? { ...w, workout_sets: sets || [], comments: comments || [] } : w
      ));
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  async function sendFeedback(workoutId: string) {
    const text = commentText[workoutId];
    if (!text?.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('workout_comments')
        .insert({
          workout_id: workoutId,
          trainer_id: user.id,
          comment: text.trim(),
        });

      if (error) throw error;

      setCommentText(prev => ({ ...prev, [workoutId]: '' }));
      
      // Refresh comments for this workout
      const { data: comments, error: commentsError } = await supabase
        .from('workout_comments')
        .select('*')
        .eq('workout_id', workoutId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      setWorkouts(prev => prev.map(w => 
        w.id === workoutId ? { ...w, comments: comments || [] } : w
      ));

      Alert.alert('Success', 'Feedback sent to client!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size=\"large\" color=\"#00ffcc\" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Client Header */}
      <View style={styles.header}>
        <Text style={styles.clientName}>{profile?.full_name?.toUpperCase() || 'UNKNOWN CLIENT'}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>HEIGHT</Text>
            <Text style={styles.statValue}>{profile?.height} cm</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>WEIGHT</Text>
            <Text style={styles.statValue}>{profile?.weight} kg</Text>
          </View>
        </View>
      </View>

      {/* Workout History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WORKOUT HISTORY</Text>
        
        {workouts.length === 0 ? (
          <Text style={styles.emptyText}>NO WORKOUTS RECORDED</Text>
        ) : (
          workouts.map(workout => (
            <Card key={workout.id} style={styles.workoutCard}>
              <TouchableOpacity 
                onPress={() => toggleWorkout(workout.id)} 
                style={styles.workoutHeader}
              >
                <Text style={styles.workoutDate}>
                  {new Date(workout.completed_at).toLocaleDateString()}
                </Text>
                <Text style={styles.toggleText}>{expandedWorkout === workout.id ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {expandedWorkout === workout.id && (
                <View style={styles.workoutDetails}>
                  <Text style={styles.detailTitle}>EXERCISES</Text>
                  {workout.workout_sets?.map((set, idx) => (
                    <View key={idx} style={styles.setRow}>
                      <Text style={styles.setExercise}>{set.exercise_name.toUpperCase()}</Text>
                      <Text style={styles.setStats}>{set.reps} REPS × {set.weight} KG</Text>
                    </View>
                  ))}

                  <View style={styles.feedbackSection}>
                    <Text style={styles.detailTitle}>FEEDBACK LOOP</Text>
                    <View style={styles.commentList}>
                      {workout.comments?.map((c, idx) => (
                        <View key={idx} style={styles.commentBubble}>
                          <Text style={styles.commentText}>{c.comment}</Text>
                        </View>
                      ))}
                    </View>
                    
                    <View style={styles.inputRow}>
                      <TextInput 
                        style={styles.input}
                        placeholder=\"ADD FEEDBACK...\"
                        placeholderTextColor=\"#666\"
                        value={commentText[workout.id]}
                        onChangeText={(text) => setCommentText(prev => ({ ...prev, [workout.id]: text }))}
                      />
                      <TouchableOpacity 
                        style={styles.sendBtn} 
                        onPress={() => sendFeedback(workout.id)}
                      >
                        <Text style={styles.sendBtnText}>SEND</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  center: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center',
  },
  clientName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 30,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    letterSpacing: 1,
  },
  workoutCard: {
    marginBottom: 12,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 16,
    padding: 0, // Overridden by children for layout
    overflow: 'hidden',
  },
  workoutHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutDate: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#00ffcc',
    fontSize: 16,
  },
  workoutDetails: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginTop: 10,
  },
  detailTitle: {
    color: '#00ffcc',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  setExercise: {
    color: '#ccc',
    fontSize: 14,
  },
  setStats: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  feedbackSection: {
    marginTop: 20,
  },
  commentList: {
    gap: 8,
    marginBottom: 15,
  },
  commentBubble: {
    backgroundColor: '#252525',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#00ffcc',
  },
  commentText: {
    color: '#ddd',
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: '#00ffcc',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
  },
  sendBtnText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
