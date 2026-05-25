import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
}

const supabase = createClient();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser(user) {
    set({ user, loading: false });
  },

  async signOut() {
    await supabase.auth.signOut();
    set({ user: null, loading: false });
  },

  async loadUser() {
    const { data } = await supabase.auth.getUser();
    set({ user: data.user, loading: false });
  },
}));
