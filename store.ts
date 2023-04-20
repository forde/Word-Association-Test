import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const resultStore = create(
    persist(
        (set, get) => ({
            entries: [],
            storeEntries: (entries) => set({ entries }),
            addEntry: (newEntry) => set((state) => ({ entries: [...state.entries, newEntry] })),
        }),
        {
            name: 'results', // unique name
        }
    )
)