import create from "zustand";

interface AppState {
  leads: Lead[];
  companies: Company[];
  deals: Deal[];
  users: User[];
  addLead: (lead: Lead) => void;
  addCompany: (company: Company) => void;
  addDeal: (deal: Deal) => void;
  // ... other state and actions
}

export const useStore = create<AppState>((set) => ({
  leads: [],
  companies: [],
  deals: [],
  users: [],
  addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
  addCompany: (company) => set((state) => ({ companies: [...state.companies, company] })),
  addDeal: (deal) => set((state) => ({ deals: [...state.deals, deal] })),
  // ... other state and actions
}));