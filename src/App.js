import 'App.css';
import GlobalStyles from 'GlobalStyles';
import styled from 'styled-components';
import Test from 'assets/fonts/Test';
import axios from 'axios';
import React, { useEffect } from 'react';


function App() {

  useEffect(() => {
    loadUsers()
  }, [])
  const loadUsers = async () => {
    const result = await axios.get('http://localhost:3003/users')
    console.log(result.data)
  }
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
