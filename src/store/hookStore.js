// import { useEffect, useLayoutEffect, useReducer, useRef } from 'react';
// import { create as createImpl } from 'zustand/vanilla';

// // Server Side Rendring(SSR) 지원.
// // 맨 마지막 분기 덕분에 Deno도 지원할 수 있다.
// const isSSR =
//   typeof window === 'undefined' ||
//   !window.navigator ||
//   /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);

// // SSR 환경일 때는 useLayoutEffect 사용 시 경고가 출력되기 때문에 useEffect를 사용한다.
// // useLayoutEffect는 브라우저에서 페인트가 일어나기 전에 동기적으로 실행되기 때문에
// // 상태 갱신 이전에 브라우저에 화면이 그려져서 생기는 일시적인 깜빡임을 차단한다.
// const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;

// // createState 인자는 코어 부분에서 보았던 생성자 함수와 같다.
// export function createStoreHook(createState) {
//   // 스토어를 생성하여 클로저에 담고, 이 스토어를 다루는 방법을 훅으로 제공할 것이다.
//   const api = typeof createState === 'function' ? createImpl(createState) : createState;

//   const useStore = (selector = api.getState, equalityFn = Object.is) => {
//     //훅을 원하는 시점에 재 실행하는 트릭
//     const [, forceUpdate] = useReducer(c => c + 1, 0);

//     const state = api.getState();

//     const stateRef = useRef(state);
//     const seletorRef = useRef(selector);
//     const equalityFnRef = useRef(equalityFn);
//     const erroedRef = useRef(false);

//     const currentSliceRef = useRef();
//     if (currentSliceRef.current === undefined) {
//         currentSliceRef.current = selector(state);
//     }

//     // 지역 변수를 사용하여 훅이 실행되는 단계(랜더링 단계)에서 Ref값이 변하는 것을 피한다.
//     let newStateSlice;
//     let hasNewStateSlice = false;
    

//     // 셀렉터나 비교 함수(equalityFn)가 변경되었다면 재실행되면서 상태의 갱신이 필요한지 비교해야한다.
//     // 또한 구독한 쪽에서 에러가 발생할 경우 적절한 오류를 표시하고 훅을 재실행한다.
//     if (
//         stateRef.current !== state ||
//         seletorRef.current !== selector ||
//         equalityFnRef.current !== equalityFn ||
//         erroedRef.current
//     ) {
//         // 위에 선언한 지역 변수에 새로운 슬라이스를 임시로 할당한다.
//         // 만약 이전 슬라이스와 같은 슬라이스가 아닐 경우 `currentSliceRef` 에 새로이 할당할 것이다.
//         newStateSlice = selector(state);
//         hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
//     }

//     // 훅이 재실행 될 때마다 변경된 요소를 갱신한다.
//     // 이펙트는 랜더링(훅이 값을 리턴함) 이후 실행된다.
//     useIsomorphicLayoutEffect(() => {
//         if (hasNewStateSlice) {
//             currentSliceRef.current = newStateSlice;
//         }
//         stateRef.current = state;
//         selectorRef.current = selector;
//         equalityFnRef.current = equalityFn;
//         erroedRef.current = false;
//     });

//     const stateBeforeSubscriptionRef = useRef(state);

//     // 코어를 분석하는 단락에서 상태의 변경을 구독하는 리스너를 subscribe 를 통해 등록할 수 있다고 했다. subscribe 를 호출하여 리스너를 등록하는 부분은 코드 조금 아래쪽에 있다.
//     useIsomorphicLayoutEffect(() => {
//         const listener = () => {
//             try {
//                 const nextState = api.getState();
//                 const nextStateSlice = seletorRef.current(nextState);

//                 if (!equalityFnRef.current(currentSliceRef.current, nextStateSlice)) {
//                     stateRef.current = nextState;
//                     currentSliceRef.current = nextStateSlice;
//                     forceUpdate();
//                 } 
//             }
//             catch(error) {
//                 erroedRef.current = true;
//                 forceUpdate();
//             }
//         };
//         const unsubscribe = api.subscribe(listener);

//         if (api.getState() !== stateBeforeSubscriptionRef.current) {
//             listener();
//         }

//         // 훅이 언마운트될 때 구독을 해제한다.
//       return unsubscribe;
//     }, []);

//     // 위의 갱신 과정을 거치며 useStore 훅이 리턴하는 값은 상태가 갱신되었을때, 
//     // 갱신되지 않았을 때에 따라 약간 달라진다. 
//     // 새로운 슬라이스가 있다면 새 슬라이스를 바로 리턴하고, 그렇지 않다면 현재 슬라이스의 레퍼런스를 유지한다. 
//     // newStateSlice 라는 변수의 값은 다음에 훅이 재실행 될 때까지 유지될 것이다.
//     return hasNewStateSlice ? newStateSlice : currentSliceRef.current;
//   };

//    // 훅을 사용하는 컴포넌트에서 때때로 스토어에 직접적으로 접근할 필요가 있을 때 활용하기 위한 트릭
//   // ex) useStore.getState() / useStore.subscribe(someCustomListener) 등
//   Object.assign(useStore, api);

//   return useStore;
// }