const axios = require('axios');

const trans = async (param) => {
    try {
        return await axios.get(`https://api-cypress.scope.klaytn.com/v1/accounts/0xc322b6c5d35112be004f02039d3e07d5af0b95d6/balances`);
    } catch (error) {
        console.error(error);
    }
};

const getlatilongi = async () => {
    const transResult = await trans();

    console.log(transResult.data.tokens)
    console.log(Object.keys(transResult.data.tokens))

    const wallets = Object.keys(transResult.data.tokens)
    let tempAccWallet = 0
    wallets.map((wallet) => {
        console.log(transResult.data.tokens[wallet].totalSupply * 10e-18)
        tempAccWallet += transResult.data.tokens[wallet].totalSupply * 10e-18
    })

    console.log(tempAccWallet)

};

getlatilongi();


// Eklipse 0xc322b6c5d35112be004f02039d3e07d5af0b95d6
