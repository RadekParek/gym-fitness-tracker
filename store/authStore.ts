import { create } from 'zustand';
import { UserProfile } from '../types';

interface AuthState {
  user: any | null;
  profile: UserProfile | null;
  setUser: (user: any) => void;
  setProfile: (profile: UserProfile) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  clearAuth: () => set({ user: null, profile: null }),
}));
