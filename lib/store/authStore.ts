import { create } from 'zustand';

interface AuthState {
   role: 'Individual' | 'Admin' | null;
   setRole: (role: 'Individual' | 'Admin' | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
   role: null,
   setRole: (role) => set({ role }),
}));
