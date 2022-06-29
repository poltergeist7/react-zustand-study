import create from 'zustand';
import {devtools} from 'zustand/middleware';

const useStore = create((set) => ({

    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1})),
    removeAllBears: () => set({bears: 0}),
}))

export default useStore;