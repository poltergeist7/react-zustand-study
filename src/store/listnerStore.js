import { listeners } from "process";

// 아래 코드는 Zustand 코드를 js로 바꿔 용이하게 보기 위해 적어놓은 것.

export function create(createState) {
    // 스토어의 상태는 클로저로 관리된다.
    let state; 

    // 상태 변경을 구독할 리스터를 Set으로 관리한다.
    // 배열로 관리할 경우 중복된 리스터를 솎아내기 어렵기 때문이다.
    const listener = new Set();

    //setState 
    const setState = (partial, replace) => {
        
        //이런 동작을 구현하려면 기존 상태를 함수의 인자로 전달하는 방법, 그리고 함수를 갱신하는 방법이 필요하다. 먼저 함수를 전달받을 경우 현재 상태를 인자로 넘겨주는 식으로 '다음 상태' 를 정의한다.
        
        const nextState = typeof partial === 'function' ? partial(state) : partial;
        // 그리고 nextState 가 기존 state 와 다른 경우 state 를 갱신한다. 상태를 갱신할 때 간단하고 효과적인 Object.assign 을 사용한다.
        if(nextState !== state) {
            const previousState = state;
            
            state = replace ? nextState : Object.assign({}, state, nextState);

            listener.forEach(listener => listener(state, previousState));
        }
    };

    //getState
    const getState = () => state;

    const subscribeWithSelector = (
        listener,
        selector = getState,
        equalityFn = Object.is
    ) => {
        let currentSlice = selector(state);

        function listenerToAdd() {
            const nextSlice = selector(state);
            if (!equalityFn(currentSlice, nextSlice)) {
                const previousSlice = currentSlice;
                listener((currentSlice = nextSlice), previousSlice)
            }
        };
        
        listeners.add(listenerToAdd);
        return () => listeners.delete(listenerToAdd);
    };

    // subscribe
    const subscribe = (listener, selector, equalityFn) => {
        if (selector || equalityFn) {
            return subscribeWithSelector(listener, selector, equalityFn);
        }
        listeners.add(listener);
        return () => listeners.delete(listener);
    }

    // 모든 리스너를 제거한다. 하지만 이미 정의된 상태를 초기화하진 않는다.
    const destroy = () => listeners.clear();

    const api = {setState, getState, subscribe, destroy};

    // 인자로 전달받은 createState 함수를 이용하여 최초 상태를 설정한다.
    state = createState(setState, getState, api);

    return api;
}