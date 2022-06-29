import styled from '@emotion/styled';
import useStore from '../../src/store/store';

export default function Count() {

    const {bears, increasePopulation, removeAllBears} = useStore();
    
    return (
        <Wrapper>
            <ContainerWrapper>
            <h1>{bears} arround here ... </h1>
            <button onClick={increasePopulation}>one up</button>
            <button onClick={removeAllBears}>remove</button>
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