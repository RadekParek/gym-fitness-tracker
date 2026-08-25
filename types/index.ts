export type Profile = {
  id: string;
  username: string;
  avatar_url?: string;
  updated_at: string;
};

export type Exercise = {
  id: string;
  name: string;
  muscle_group: string;
  is_custom: boolean;
  created_by?: string;
  created_at: string;
};

export type Workout = {
  id: string;
  user_id: string;
  name: string;
  started_at: string;
  completed_at?: string;
  total_volume: number;
  created_at: string;
};

export type WorkoutSet = {
  id: string;
  workout_id: string;
  exercise_id: string;
  set_number: number;
  weight: number;
  reps: number;
  is_completed: boolean;
  created_at: string;
};

export type Group = {
  id: string;
  name: string;
  invite_code: string;
  created_by: string;
  created_at: string;
};

export type GroupMember = {
  group_id: string;
  user_id: string;
  joined_at: string;
};

export type GroupPost = {
  id: string;
  group_id: string;
  workout_id: string;
  user_id: string;
  created_at: string;
};
