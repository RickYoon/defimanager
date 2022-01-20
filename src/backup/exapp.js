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
        const result = await axios.get('https://api-cypress.scope.klaytn.com/v1/accounts/0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8/balances')
        // Claim swap : https://api-cypress.scope.klaytn.com/v1/accounts/0x02703e13b5d3d3056ac9321983b44a2cc065bb22/balances 
        // holder : https://api-cypress.scope.klaytn.com/v1/tokens/0x6555f93f608980526b5ca79b3be2d4edadb5c562/holders
        // 내 지갑 : 0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8
        // https://api-cypress.scope.klaytn.com/v1/accounts/0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8/transfers?page=2&version=v3
        // https://api-cypress.scope.klaytn.com/v1/accounts/0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8/transfers?page=3&version=v3
        // https://api-cypress.scope.klaytn.com/v1/accounts/0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8
        // 0x000000000000000000000000000000000000dead // 소각주소
        console.log(result.data.tokens)
        try {
            const accounts = await klaytn.enable()
            // You now have an array of accounts!
            // Currently only one:
            // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
        } catch (error) {
            // Handle error. Likely the user rejected the login
            console.error(error)
        }
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
