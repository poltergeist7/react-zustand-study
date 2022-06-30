// import create from 'zustand';
// import {devtools} from 'zustand/middleware';

// const store = (set) => ({
//     basket: 0,
//     increaseBasket: () => set((state) => ({ basket: state.basket + 1})),
//     removeAllProduct: () => set({basket: 0}),
// });

// const useStore = create(devtools(store));

// export default useStore;



import create from 'zustand';
import {devtools} from 'zustand/middleware';

const store = (set) => ({
    basket: 0,
    increaseBasket: () => set((state) => ({ basket: state.basket + 1})),
    // decreaseBasket: () => set((state) => ({ bakset: state.basket + - 1})),
    removeAllBears: () => set({basket: 0}),
})

const useStore = create(devtools(store));

export default useStore;