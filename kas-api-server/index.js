// const express = require('express');
// const app = express();
// const CaverExtKAS = require('caver-js-ext-kas')
// const port = 3000;

// const chainId = 8217;   // Baobob;
// const accessKeyId = "KASKLYZR6PPRA0B3H719QNCH";
// const secretAccessKey = "EWdpSaz3CArmj0WM-9AJ0xLQBUjNaeQvLED7-Z8K";
// const ABIseed = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"miningTreasury","type":"address"},{"name":"treasury","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]';
// const contractAddress = '0xcf87f94fd8f6b6f0b479771f10df672f99eada63';
// const fromAddress = '0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8';

// const ABI = JSON.parse(ABIseed)

// const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);
// let contract = new caver.klay.Contract(ABI, contractAddress);

// app.get('/', async (req, res) => {
//     res.send('Hello Node.js!');
//     try {
//         const owner = '0x0c12a8f720f721cb3879217ee45709c2345c8446'
//         // without query parameter
//         const ret = await caver.kas.kip17.getTokenListByOwner('0x9ad4163329aa90eaf52a27ac8f5e7981becebc16', owner)
//         res.send(ret)
//     } catch (err) {
//         throw err;
//     }


// });
// app.listen(port, () => {
//     console.log('Listening...');
// });

// // 마지막 블록넘버 알아내기
// app.get('/lastBlockNumber', async (req, res) => {
//     try {
//         const blockNumber = await caver.rpc.klay.getBlockNumber()
//         res.send(`최근 블록값: ${parseInt(blockNumber, 16)}`);
//     } catch (err) {
//         throw err;
//     }
// });

// // 지갑 주소 생성
// app.get('/newAccount', async (req, res) => {
//     try {
//         const result = await caver.kas.wallet.createAccount();
//         res.send(result);
//     } catch (err) {
//         throw err;
//     }
// });

// app.get('/account', async (req, res) => {
//     if (req.query.target) {
//         const targetAccount = req.query.target;
//         try {
//             const result = await caver.rpc.klay.getAccount(targetAccount);
//             res.send(result);
//         } catch (err) {
//             throw err;
//         }
//     } else {
//         res.send(`지갑 주소 정보가 올바르지 않습니다`);
//     }
// });

// app.get('/getBalance', async (req, res) => {
//     if (req.query.target) {
//         const targetAccount = req.query.target;
//         try {
//             const result = await caver.rpc.klay.getAccount(targetAccount);
//             const balance = parseInt(result.account.balance, 16) * (0.1e-17);
//             res.send(balance + ' KLAY');
//         } catch (err) {
//             throw err;
//         }
//     } else {
//         res.send(`지갑 주소 정보가 올바르지 않습니다`);
//     }
// });

// test.js
// const Caver = require('caver-js')
const chainId = 8217;   // Baobob;
const accessKeyId = "KASKLYZR6PPRA0B3H719QNCH";
const secretAccessKey = "EWdpSaz3CArmj0WM-9AJ0xLQBUjNaeQvLED7-Z8K";

const CaverExtKAS = require('caver-js-ext-kas')
const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

async function testFunction() {
    const version = await caver.rpc.klay.getClientVersion()
    console.log(version)
}

testFunction()