import { UserProfile, Workout, Set, Group } from '../types';
import { supabase } from '../lib/supabase';

export const authService = {
  async signUp(email: string, password: string, username: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: data.user.id, username });
      if (profileError) throw profileError;
    }
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};

export const workoutService = {
  async createWorkout(userId: string, name: string) {
    const { data, error } = await supabase
      .from('workouts')
      .insert({ user_id: userId, name, date: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async addSet(workoutId: string, exerciseId: string, weight: number, reps: number) {
    const { data, error } = await supabase
      .from('sets')
      .insert({ workout_id: workoutId, exercise_id: exerciseId, weight, reps })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getWorkoutHistory(userId: string) {
    const { data, error } = await supabase
      .from('workouts')
      .select('*, sets(*, exercises(*))')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    if (error) throw error;
    return data;
  },
};

export const socialService = {
  async createGroup(ownerId: string, name: string, description: string) {
    const { data, error } = await supabase
      .from('groups')
      .insert({ owner_id: ownerId, name, description })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async joinGroup(userId: string, groupId: string) {
    const { data, error } = await supabase
      .from('group_members')
      .insert({ user_id: userId, group_id: groupId, role: 'member' });
    if (error) throw error;
    return data;
  },

  async getGroupLeaderboard(groupId: string) {
    const { data, error } = await supabase.rpc('get_group_volume_leaderboard', { g_id: groupId });
    if (error) throw error;
    return data;
  },
};
