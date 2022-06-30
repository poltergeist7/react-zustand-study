// import styled from '@emotion/styled';
import { useCallback } from 'react';
// import useStore from '../../src/store/store';

// export default function Count() {

//     const {basket, increaseBasket, removeAllProduct} = useStore();
    
//     const onClickPlus = useCallback(() => {
//         console.log('click', basket)
//         increaseBasket
//     }, [basket]);

//     const onClickRemoveBasket = useCallback(() => {
//         console.log('remove', basket);
//         removeAllProduct;
//     }, []);


//     return (
//         <Wrapper>
//             <ContainerWrapper>
//             <h1> 장바구니 : {basket} </h1>
//             <button onClick={onClickPlus}>one up</button>
//             <button onClick={onClickRemoveBasket}>remove</button>
//             </ContainerWrapper>
//         </Wrapper>
//     )
// }

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: hotpink;
// `;

// const ContainerWrapper = styled.div`
//   width: 500px;
//   background-color: #fff;
//   height: 500px;
//   margin: 0 auto;
// `;

import styled from '@emotion/styled';
import useStore from '../../src/store/store';

export default function Count() {

    const {basket, increaseBasket, removeAllBears} = useStore();
    

    return (
        <Wrapper>
            <ContainerWrapper>
            <h1>장바구니 : {basket} </h1>
            <button onClick={increaseBasket}>상품 + </button>
            <button onClick={removeAllBears}>전부 삭제</button>
            </ContainerWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: hotpink;
`;

const ContainerWrapper = styled.div`
  width: 500px;
  background-color: #fff;
  height: 500px;
  margin: 0 auto;
`;