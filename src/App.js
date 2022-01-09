import 'App.css';
import GlobalStyles from 'GlobalStyles';
import styled from 'styled-components';
import Test from 'assets/fonts/Test';


function App() {
  return (
    <>
      <GlobalStyles />
      <RootContainer>
        <TextField>hello</TextField>
        <TextField>font</TextField>
        <Test />
      </RootContainer>
    </>
  );
}



const RootContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextField = styled.span`
  display: flex;
  width: 150px;
  height: 150px;
  background-color: wheat;
  justify-content: center;
  align-items: center;
`;

export default App;
