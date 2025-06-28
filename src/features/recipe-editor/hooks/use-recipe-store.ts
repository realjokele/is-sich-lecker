import { create } from 'zustand'

type RecipeStore = {
  title: string | null
  hasChanges: boolean
  setTitle: (title: string | null) => void
  reset: () => void
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  title: null,
  hasChanges: false,
  setTitle: (title) => set({ title, hasChanges: true }),
  reset: () => set({ title: null, hasChanges: false }),
}))
