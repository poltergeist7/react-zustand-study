import create from 'zustand';

const textCountStore = create(set => ({
    text: '',
    count: 0,
    // 객체를 직접 전달하여 상태를 갱신하는 경우
    setCount: newCount => set({ count: newCount }),

    // 함수를 전달하여 상태를 갱신하는 경우
    increment: () => set(state => ({ count: state.count + 1 })),
    setText: text => set({ text })
}));

textCountStore.subscribe(state => console.log("뭔가 바꼈는데~ : ", state)); // 어떤상태가 되더라도 로그가 출력됨
textCountStore.subscribe(
    state => console.log('Count is changed : ', count),
    state => state.count
); // count 값이 바뀔 때만 로그가 출력됨
textCountStore.subscribe(
    state => console.log('Text has been changed : ', text),
    state => state.count
); // text 값이 바뀔 때만 로그가 출력됨

textCountStore.setText('changed'); // text 값만 변경

// 결과
// 뭔가 바꼇는데~ : [Object]
// Text has been changed: Changed


export default textCountStore;