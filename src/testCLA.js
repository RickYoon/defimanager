const axios = require('axios');

const trans = async (param) => {
    try {
        return await axios.get(`https://api-cypress.scope.klaytn.com/v1/accounts/0x02703e13b5d3d3056ac9321983b44a2cc065bb22/balances`);
    } catch (error) {
        console.error(error);
    }
};

const getlatilongi = async () => {
    const transResult = await trans();

    console.log(transResult.data.tokens)
    // console.log(Object.keys(transResult.data.tokens))

    const wallets = Object.keys(transResult.data.tokens)
    let tempAccWallet = 0
    wallets.map((wallet) => {
        // console.log(transResult.data.tokens[wallet].decimals)
        console.log(transResult.data.tokens[wallet].tokenName)
        if (transResult.data.tokens[wallet].decimals == 18) {
            console.log(transResult.data.tokens[wallet].totalSupply * 10e-19)
        } else {
            console.log(transResult.data.tokens[wallet].totalSupply * 10e-7)
        }
        // tempAccWallet += transResult.data.tokens[wallet].totalSupply * 10e-18
    })

    // (wanted LP price)/(total LP) * deposited = -- klay
    const totalLPklayusdt = 6341139
    const deposited = 11845119
    const wallett = (1 / totalLPklayusdt) * deposited
    console.log(wallett * 1.3)

    const depositedUSdt = 15463313
    const wallettt = (1 / totalLPklayusdt) * depositedUSdt
    console.log(wallettt)

    console.log((wallett * 1.3 + wallettt) * 6341139)

    // console.log(tempAccWallet)

};

getlatilongi();


