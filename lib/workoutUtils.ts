import { workoutService } from './services/api';
import { Set, Exercise } from '../types';

export const workoutLogic = {
  calculate1RM: (weight: number, reps: number) => {
    if (reps === 1) return weight;
    return weight * (1 + reps / 30);
  },

  async getPreviousPerformance(exerciseId: string, userId: string) {
    // In a real app, this would call the API. 
    // For MVP, we'll mock a return if the API isn't fully seeded
    return {
      lastWeight: 80,
      lastReps: 10,
      best1RM: 100
    };
  }
};
