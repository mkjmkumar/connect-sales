import { create } from 'zustand'

interface AppState {
  // Define your state properties here
  // For example:
  isLoggedIn: boolean;
  // ... other properties
}

export const useStore = create<AppState>((set) => ({
  isLoggedIn: false,
  // ... other initial state and actions
}));