import React, {useState,useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";
import { Button, Modal,Image, List } from 'semantic-ui-react'
import icons from "../../assets/tokenIcons"

import { WalletContext } from "components/context/WalletContext"
import AddressBox from "./AddressBox.jsx"
import Selector from "./Selector.jsx"
import WalletTokenDetailTable from "pages/wallet/WalletTokenDetailTable.js"
import WalletHistory from "pages/wallet/WalletHistory.js"
import { GiConsoleController } from 'react-icons/gi';

const Wallet = () => {

  const [walletSearchTrigger, setWalletSearchTrigger] = useState(false)
  const [isDataLoading, SetIsDataLoading] = useState(false)
  const [isWalletLoad, SetIsWalletLoad] = useState(false) 
  const [walletAddress, SetWalletAddress] = useState("") // wallet address
  const [isSmallTokenOpen, setIsSmallTokenOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [isAsset, setIsAsset] = useState(true)
  const [walletHistory, setWalletHistory] = useState([{
    dateTime: "2022-10-22 12:00",
    trxList: [
      {
        name :"Ton",
        amount: 0,
        from : "0x",
        to : "0x"
      }
    ]
  }])

  const [assetState, setAssetState] = useState({
    isWallet : true,
    totalValue : 1,
    token : {
      totalValue : 0,
      tokenList : [{
          symbol: "KLAY",
          price: 12,
          balance: 20,
          value: 240,
          image: ""
      }]
    },
    megaton : {
      totalValue : 1,
      pairPool : [{
            pairList : ["KLAY", "LAY"],
            balance : [32,11],
            value : 23.1
        }]
      },
      tonwhales : {
        totalValue : 0,
        tokenList : [{
            symbol: "KLAY",
            price: 12,
            balance: 20,
            value: 240,
            image: ""
        }]
      }
    })

    // https://tonwhales.com/explorer/address/EQCeHendv97uqK8bU0I2xiRPVuWFMiHviEZKIwJUMl_CKOsY

      useEffect(() => {
        var lastWalletAddress = localStorage.getItem('lastWalletAddress');
        SetWalletAddress(lastWalletAddress)

        if(isDataLoading){
        setTimeout(function() {
          console.log(walletAddress.slice(0,2))
          if(walletAddress.slice(0,2) === "EQ"){
            loadchart()
          } else {
            SetIsDataLoading(false)
            alert("Please check your wallet address")
          }
        }, 1000);
        }
        // loadchart()
        // loadchart()
        }, [isDataLoading])
  
  
    const loadchart = async () => {
 

      // get Ton balance of wallet


      // console.log("priceObject", priceObject)
      // https://megaton.fi/api/token/infoList?

      // LP infos
      // https://megaton.fi/api/lp/infoList?

      // jetton address to wallet address

      // jetton_address : 0:8966b671880f34cd70994c44421d6dc1b9070e077725e59de91b66a72fb10ce7

      // https://tonapi.io/v1/jetton/getInfo?account=0%3A8966b671880f34cd70994c44421d6dc1b9070e077725e59de91b66a72fb10ce7

      try {

        // get token price
        let priceObject = {}
        localStorage.setItem('lastWalletAddress', walletAddress);

        const tokenInfosFromMegaton = await axios.get("https://megaton.fi/api/token/infoList")
        tokenInfosFromMegaton.data.forEach((res)=>
          priceObject[res.symbol] = res.price
        )
        priceObject["TON"] = priceObject["WTON"]

        // get ton balance of wallet

        let tempBalanceArray = []
        let tempMegatonLP = []
        let totalTokenValue = 0

        // ton balance
        const tonBalance = await axios.get(`https://toncenter.com/api/v2/getAddressInformation?address=EQCeHendv97uqK8bU0I2xiRPVuWFMiHviEZKIwJUMl_CKOsY`)
        if(Number(tonBalance.data.result.balance)>0){
          tempBalanceArray.push({
            symbol: "TON",
            price: priceObject["TON"],
            balance: Number(tonBalance.data.result.balance)/1000000000,
            value: Number(tonBalance.data.result.balance)/1000000000 * priceObject["TON"],
            image: "https://megaton.fi/static/img/token/ic-token-ton.png"
          })        
        }
        // console.log("tonbalance", Number(tonBalance.data.result.balance)/1000000000)


        // EQCeHendv97uqK8bU0I2xiRPVuWFMiHviEZKIwJUMl_CKOsY
        const walletBalanceData = await axios.get(`https://tonapi.io/v1/jetton/getBalances?account=EQCeHendv97uqK8bU0I2xiRPVuWFMiHviEZKIwJUMl_CKOsY`)

        walletBalanceData.data.balances.forEach((res)=>{
          if(res.metadata.symbol === "MGLP") {
            if(Number(res.balance) > 0){
              console.log("LP",res)

              // LP 의 res.jetton_address 를 기반으로 address 를 알아낸다.
              let pairName = res.metadata.name.split(" ")[2]
              let tokenAname = pairName.split("-")[0]
              let tokenBname = pairName.split("-")[1]
              
              tempMegatonLP.push({
                pairList : [tokenAname,tokenBname],
                lpAddress : res.jetton_address,
                lpBalance : Number(res.balance) / Math.pow(10,(res.metadata.decimals)),
                lpAccount : "EQCJZrZxiA80zXCZTERCHW3BuQcOB3cl5Z3pG2anL7EM505O",
                balance : [0,0],
                value : 0
              })
            }
          } else {
            if((Number(res.balance) / Math.pow(10,(res.metadata.decimals))) * 10000 > 1){
              // console.log("token",res)
              tempBalanceArray.push({
                symbol: res.metadata.symbol,
                price: priceObject[res.metadata.symbol],
                balance: Number(res.balance) / Math.pow(10,(res.metadata.decimals)),
                value: priceObject[res.metadata.symbol] * Number(res.balance) / Math.pow(10,(res.metadata.decimals)),
                image: res.metadata.image
              })
            }
          }
        })

        // total Token value
        tempBalanceArray.forEach((res)=>{
          totalTokenValue += res.value
        })
       
        console.log("tempMegatonLP", tempMegatonLP)

        // const currentLpInformation = await axios.get("https://megaton.fi/api/lp/infoList")
        // console.log("currentLp", currentLpInformation.data[0])

        const currentLpInformation = {
          data : [[
            {
                "id": 1,
                "address": "EQAW42HutyDem98Be1f27PoXobghh81umTQ-cGgaKVmRLS7-",
                "symbol": "oETH",
                "name": "Orbit Bridge Ton Ethereum",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/eth.png",
                "decimal": 18,
                "amount": "1086150186386093280160",
                "volume": "1732002.322372880466512831347992",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 1594.62507495
            },
            {
                "id": 2,
                "address": "EQANasbzD5wdVx0qikebkchrH64zNgsB38oC9PVu7rG16qNB",
                "symbol": "oWBTC",
                "name": "Orbit Bridge Ton Wrapped BTC",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/wbtc.png",
                "decimal": 8,
                "amount": "1154513677",
                "volume": "253341.8938213616973385",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 21943.60265005
            },
            {
                "id": 3,
                "address": "EQC_1YoM8RBixN95lz7odcF3Vrkc_N8Ne7gQi7Abtlet_Efi",
                "symbol": "oUSDT",
                "name": "Orbit Bridge Ton Tether",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/usdt.png",
                "decimal": 6,
                "amount": "2111463262301",
                "volume": "2128603.42428148295867",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 1.00811767
            },
            {
                "id": 4,
                "address": "EQC61IQRl0_la95t27xhIpjxZt32vl1QQVF2UgTNuvD18W-4",
                "symbol": "oUSDC",
                "name": "Orbit Bridge Ton USD Coin",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/usdc.png",
                "decimal": 6,
                "amount": "3916379780982",
                "volume": "3891422.22002591629698",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.99362739
            },
            {
                "id": 5,
                "address": "EQAAXwH0cajPsMF-nNC5kz-SaLaeaDr4M7Q1foVwP_vOW1tR",
                "symbol": "oDAI",
                "name": "Orbit Bridge Ton Dai",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/dai.png",
                "decimal": 18,
                "amount": "0",
                "volume": "0",
                "isVisible": 0,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0
            },
            {
                "id": 6,
                "address": "EQDCIEo0HUUYsAV-lTMviOd-GkSXfVPsNZMGjRaNOA_6--FD",
                "symbol": "oORC",
                "name": "Orbit Bridge Ton Orbit Chain",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/orc.png",
                "decimal": 18,
                "amount": "5033518016472552525952053",
                "volume": "490579.7530322577978158545607178",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.0974626
            },
            {
                "id": 7,
                "address": "EQAwr5lcbQcLKTAg_SQ-dpKWNQZpO1MGnrAs53bf1gkKTVHx",
                "symbol": "oORBS",
                "name": "Orbit Bridge Ton Orbs",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/orbs.png",
                "decimal": 18,
                "amount": "806234946966110628996845",
                "volume": "23350.0959105377994259437252055",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.0289619
            },
            {
                "id": 8,
                "address": "EQDZM7xsqa7huHq2lxoRLqMM71jwegQFPe7wijDDHOirpetR",
                "symbol": "oKLAY",
                "name": "Orbit Bridge Ton Klaytn",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/klay.png",
                "decimal": 18,
                "amount": "2274213361514367580280541",
                "volume": "541546.19250953140459462331901942",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.23812462
            },
            {
                "id": 9,
                "address": "EQAIifXof_2FQjs5y4jjRpQ_1nOcJHdMz7qS3yskkoUeqn1L",
                "symbol": "oKSP",
                "name": "Orbit Bridge Ton KlaySwap Protocol",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/ksp.png",
                "decimal": 18,
                "amount": "140080985241045569947991",
                "volume": "119653.52848323559661247676703445",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.85417395
            },
            {
                "id": 10,
                "address": "EQBq4d4GPyBoh-Pjnf3wxUyQSS28WY2Yt-7cPAG8FHpWpNRX",
                "symbol": "oMATIC",
                "name": "Orbit Bridge Ton Matic Token",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/matic.png",
                "decimal": 18,
                "amount": "276246832418096509748839",
                "volume": "314740.44175645951953786077547822",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 1.13934498
            },
            {
                "id": 11,
                "address": "EQCeGZcyr9Mkxf7OFLqyn40LLw292aCN_bxnT856rOkYW-I5",
                "symbol": "oMESH",
                "name": "Orbit Bridge Ton Meshswap Protocol",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/mesh.png",
                "decimal": 18,
                "amount": "1735346243125369524025563",
                "volume": "107787.37031115933345515215180707",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.06211289
            },
            {
                "id": 43,
                "address": "EQCajaUU1XXSAjTD-xOV7pE49fGtg4q8kF3ELCOJtGvQFQ2C",
                "symbol": "WTON",
                "name": "Wrapped Toncoin",
                "chain": "Ton",
                "description": "Wrapped TON Coin",
                "img": "https://wton.dev/logo192.png",
                "decimal": 9,
                "amount": "1767163013993575",
                "volume": "4206580.93950802261510275",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 2.38041477
            },
            {
                "id": 5541,
                "address": "EQCf7Nb341dxOE3N0jimngRxGEV8T3zo-eU2EZVs_nchNhhZ",
                "symbol": "oWEMIX",
                "name": "Orbit Bridge Ton WEMIX",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/wemix.png",
                "decimal": 18,
                "amount": "231031917985587603773750",
                "volume": "379077.896470974615017044849575",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 1.64080314
            },
            {
                "id": 5542,
                "address": "EQDsEumWZmrQpoMlXGdqSXWDdvQeUCGjMEJsQ3k35bqNhyvX",
                "symbol": "oWEMIX$",
                "name": "Orbit Bridge Ton WEMIX$",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/wemixdollar.png",
                "decimal": 18,
                "amount": "818041492632665714150293",
                "volume": "801941.65891823685186338679098165",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.98031905
            },
            {
                "id": 5543,
                "address": "EQAQX-vGOoGA6n5Sj2YhgmbypSzopG9d5E5wGpys2qSl_JAf",
                "symbol": "oMETA",
                "name": "Orbit Bridge Ton Metadium",
                "chain": "Ton",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/metadium.png",
                "decimal": 18,
                "amount": "0",
                "volume": "0",
                "isVisible": 0,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0
            },
            {
                "id": 7420,
                "address": "EQD8yPAEGafRy1VCTkpHq6WigBOoJ0NTuO0onBdzWKGsPdWh",
                "symbol": "META",
                "name": "Orbit Bridge Ton META ARENA Token",
                "chain": "",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/meta.png",
                "decimal": 18,
                "amount": "1886677140375919804675195",
                "volume": "55495.9288803871457233911778548",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.02941464
            },
            {
                "id": 7442,
                "address": "EQBLKkhmJFPlqjHsLu3HO-KSXaOagJI_ADI5wG9ybm53qXuP",
                "symbol": "KAI",
                "name": "Orbit Bridge Ton Kai Token",
                "chain": "",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/kai.png",
                "decimal": 18,
                "amount": "801472157365248229780814",
                "volume": "364008.88957189511894509932392676",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.45417534
            },
            {
                "id": 9396,
                "address": "EQDsoQFRBKuOe8LQhMKEKdEGcLcvvSCw0s4H7fkCcrSzTdZz",
                "symbol": "oMPWR",
                "name": "Orbit Bridge Ton Empower Token",
                "chain": "",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/mpwr.png",
                "decimal": 18,
                "amount": "25493570629704950221120",
                "volume": "6591.1781128588558158309750912",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.25854276
            },
            {
                "id": 9409,
                "address": "EQBDMHQQlWX7RNKH-YeSJiPCwIK6z7EBFrClly11pOXgNdnc",
                "symbol": "oGHUB",
                "name": "Orbit Bridge Ton GemHUB",
                "chain": "",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/ghub.png",
                "decimal": 18,
                "amount": "153054875114192381733567",
                "volume": "29569.32027598131040280635905408",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.19319424
            },
            {
                "id": 9437,
                "address": "EQBkoRg2UG67tj8QPoAfGltb9Vl8PLbofGO6FGMADuDBAZA9",
                "symbol": "oAPM",
                "name": "Orbit Bridge Ton apM Coin",
                "chain": "",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/apm.png",
                "decimal": 18,
                "amount": "5927910296767037732277681",
                "volume": "95836.88144245050503999720538786",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.01616706
            },
            {
                "id": 9480,
                "address": "EQCmzlSgRI8GFVJrGRqaxo-jvTo7211twIb0BP4m4iKZ2hmR",
                "symbol": "oAZIT",
                "name": "Orbit Bridge Ton AZIT",
                "chain": "",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/azit.png",
                "decimal": 18,
                "amount": "59052843393885438963686",
                "volume": "12376.84647204780918800923270724",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.20958934
            },
            {
                "id": 9488,
                "address": "EQAtPfb42ZZpZmLraFpWUB_Z6dZ3pxD28swXjFD-eS2NTyad",
                "symbol": "oGXA",
                "name": "Orbit Bridge Ton GALAXIA",
                "chain": "",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/gxa.png",
                "decimal": 18,
                "amount": "1231256600459517708613354",
                "volume": "10792.62898159192085555869902116",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.00876554
            },
            {
                "id": 9505,
                "address": "EQBDD3li7w-OPcWSGfe2RTz0sydcaLKrk8W0nPyLA9iy8Hcu",
                "symbol": "oMOOI",
                "name": "Orbit Bridge Ton MOOI",
                "chain": "",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/mooi.png",
                "decimal": 18,
                "amount": "68589621203214701241665",
                "volume": "8487.2440610827614599989814342",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.12373948
            },
            {
                "id": 9525,
                "address": "EQBBm5lHKu3REPf2HTnvYaIeNv-EQ6-NblR6sSsFxNtDHjAW",
                "symbol": "BURNB",
                "name": "BURN B",
                "chain": "",
                "description": "Token to burn initial MEGA",
                "img": "undefined",
                "decimal": 9,
                "amount": "1000000000",
                "volume": "0",
                "isVisible": 0,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0
            },
            {
                "id": 9526,
                "address": "EQC14ARQ-z_B5ekBmLjKd5fKs092ZV45lXoYnO-OyUovjP_Q",
                "symbol": "BURNA",
                "name": "BURN A",
                "chain": "",
                "description": "Token to burn initial MEGA",
                "img": "undefined",
                "decimal": 9,
                "amount": "1000000000",
                "volume": "0",
                "isVisible": 0,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0
            },
            {
                "id": 46857,
                "address": "EQDtSJyon_pvLOyVFhMkXZi3_VUvl-jCzlA_ye_ZTsVde9fa",
                "symbol": "oEL",
                "name": "Orbit Bridge Ton ELYSIA",
                "chain": "",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/el.png",
                "decimal": 18,
                "amount": "37458539426095594318300741",
                "volume": "98407.70351168999678955105968851",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 0.00262711
            },
            {
                "id": 47939,
                "address": "EQBf6-YoR9xylol_NwjHrLkrTFAZJCX-bsd-Xx_902OaPaBf",
                "symbol": "MEGA",
                "name": "Megaton Finance",
                "chain": "",
                "description": "Megaton Finance Token",
                "img": "https://megaton.fi/mega-logo512.png",
                "decimal": 9,
                "amount": "79054520779362",
                "volume": "159848.67028191779593566",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 2.02200543
            },
            {
                "id": 47944,
                "address": "EQAUYWLicogw0heM7gL3wdbPI4GLlAkCigFZXMgVFC_DKo0J",
                "symbol": "oNPT",
                "name": "Orbit Bridge Ton NEOPIN Token",
                "chain": "",
                "description": "Orbit Bridge Token on TON blockchain!",
                "img": "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/npt.png",
                "decimal": 18,
                "amount": "5955078349353946658699",
                "volume": "6739.16713914792009189658590775",
                "isVisible": 1,
                "type": 0,
                "stable": 0,
                "buyback": 0,
                "price": 1.13166725
            }
        ]]
        }

        currentLpInformation.data[0].forEach((res)=>{
            //lpAccount
            // console.log("res",res)
            // if(res.address === )
            // if(res.)
            if(res.address === tempMegatonLP[0].lpAccount){
              // console.log("res", res)
              tempMegatonLP[0].value = Number(res.lpPrice) * tempMegatonLP[0].lpBalance
            }
        })
          
        // balance : [0,0],
        // value : 0

        
          

        // lp balance => token balance and LP holding value
        // for (const element of tempMegatonLP) {

          // console.log("element",element)
          // const currentLpInformation = await axios.get(`https://toncenter.com/api/v2/getExtendedAddressInformation?address=0%3A${element.lpAddress.split(":")[1]}`)
          // console.log("currentLpInformation",currentLpInformation.data.result.address.account_address)
          // 
        // }

        // https://toncenter.com/api/v2/getExtendedAddressInformation?address=0%3A8966b671880f34cd70994c44421d6dc1b9070e077725e59de91b66a72fb10ce7
        


        let returnObject = {
            totalValue : 0,
            token : {
              totalValue : totalTokenValue,
              tokenList : tempBalanceArray
            },
            megaton : {
            totalValue : 1,
            pairPool : tempMegatonLP,
            },
            tonwhales : {
              totalValue : totalTokenValue,
              tokenList : tempBalanceArray
            },
          }

        let tempHistoryList = []

        const historyData = await axios.get("https://tonapi.io/v1/jetton/getHistory?account=EQCeHendv97uqK8bU0I2xiRPVuWFMiHviEZKIwJUMl_CKOsY&limit=100")
        console.log("historyData", historyData.data.events)

        historyData.data.events.forEach((res)=>{

          let jettonTrxList = []


          res.actions.forEach((innerRes)=>{

            if(innerRes.type === "JettonTransfer"){
              let sendReceive = "receive";
              let interAddress = "";

              console.log("innerRes",innerRes.JettonTransfer)
  
              if(innerRes.JettonTransfer.sender === res.account.address){
                sendReceive = "send"
                interAddress = innerRes.JettonTransfer.recipient.address
              } else {
                interAddress = innerRes.JettonTransfer.sender.address
              }

              let tempAmount = Number(innerRes.JettonTransfer.amount)
              let decimals = innerRes.JettonTransfer.jetton.decimals
              let transAmount = tempAmount / Math.pow(10,decimals)

              console.log("tempAmount", tempAmount)
              console.log("decimals", decimals)
              console.log("transAmount", transAmount)

              jettonTrxList.push({
                direction : sendReceive,
                address : interAddress,
                symbol : innerRes.JettonTransfer.jetton.symbol,
                amount : transAmount
              })
            }

          })

        tempHistoryList.push({
          dateTime : Unix_timestamp(res.timestamp),
          jettonList : jettonTrxList
        })

        //   tempHistoryList.push({
        //     dateTime : res.timestamp,
        //     // jettonInfo : {
        //     //   symbol : res.JettonTransfer.jetton.symbol,
        //     //   amount : res.JettonTransfer.amount,
        //     //   direction : sendReceive,
        //     //   interactionAddress : interAddress
        //     // }
        //   })

          console.log("tempList",tempHistoryList)


        })

        function Unix_timestamp(t){
          var date = new Date(t*1000);
          var year = date.getFullYear();
          var month = "0" + (date.getMonth()+1);
          var day = "0" + date.getDate();
          var hour = "0" + date.getHours();
          var minute = "0" + date.getMinutes();
          var second = "0" + date.getSeconds();
          return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
      }


        setWalletHistory(tempHistoryList)
        setAssetState(returnObject)
        SetIsWalletLoad(true)
        SetIsDataLoading(false)  

        } catch (e) {
          SetIsDataLoading(false)
          alert(e)
        }
      }

    const connectedList = [
      {
        projectName : "TonStake",
        category : "staking",
        poolNumber : 0
      }
      ,
      {
        projectName : "TonWhales",
        category : "staking",
        poolNumber : 0
      },
      {
        projectName : "megatonfinance",
        category : "Dexes",
        poolNumber : 0
      },
      {
        projectName : "stonfi",
        category : "Dexes",
        poolNumber : 0
      },
      {
        projectName : "dedust",
        category : "Dexes",
        poolNumber : 0
      },
      {
        projectName : "tegrofinance",
        category : "Dexes",
        poolNumber : 0
      }
    ]

    const background = "black"

    return (
        <>
            <WalletContext.Provider value={{walletHistory, isAsset, setIsAsset, assetState, isDataLoading, SetIsDataLoading, isWalletLoad, SetIsWalletLoad,walletAddress, SetWalletAddress, isSmallTokenOpen, setIsSmallTokenOpen}}>
            <OverBox>
              <Topbox>
                <Leftcolumn>

                <Wrappertitle>
                  <Title>Portfolio
                    <Button onClick={() => setModal(true)} size="mini" style={{marginLeft:"20px"}}>{connectedList.length} projects
                    </Button>
                  </Title>
                </Wrappertitle>

                <Modal
                  closeOnEscape={true}
                  closeOnDimmerClick={true}
                  open={modal}
                  size="mini"
                  onClose={() => setModal(false)}
                  onOpen={() => setModal(true)}
                >
                <Modal.Header style={{fontSize:"17px"}}>Connected Projects ({connectedList.length})</Modal.Header>
                <Modal.Content>
                <List verticalAlign='middle'>
                    {connectedList.map((element)=>(
                      <List.Item>
                        <List.Content floated='right'>
                          <Button disabled style={{fontSize:"13px"}}>{element.category}</Button>
                        </List.Content>
                        <Image avatar src={icons[element.projectName]} />
                        <List.Content verticalAlign='middle'>
                          <span style={{marginLeft:"10px", fontSize:"13px"}}>{element.projectName}
                        </span></List.Content>
                      </List.Item>
                    ))
                    }
                  </List>

                  </Modal.Content>
                  <Modal.Actions> 
                    <Button color='black' onClick={() => setModal(false)}>
                      Ok
                    </Button>
                  </Modal.Actions>
                </Modal>

                <div style={{paddingTop:"20px"}}/>
                    <AddressBox />
                    {
                    isWalletLoad ? 
                      isAsset ? 
                      <>
                      <div style={{paddingTop:"20px"}}/>
                      <SubTemplateBlockVertical>
                          <div style={{ marginBottom: "30px", fontSize: "13px", color: "#657795" }}>Total Value</div>
                          <div style={{ fontSize: "24px" }}>$ 25,310.22</div>
                          {/* {assetState.totalBalance === 0 ? "-" : assetState.totalValue.toFixed(1)} */}
                          <div style={{paddingTop:"20px"}}/>
                          <ChartCover a="50" b="30" c="20">
                            <AppleChart>token</AppleChart>
                            {
                              true ?
                              <BananaChart>Staking</BananaChart>
                              :
                              <></>
                            }
                            {
                              true ?
                              <WaterChart>LP</WaterChart>
                              :
                              <></>
                            }

                          </ChartCover>
                      </SubTemplateBlockVertical>
                      <Selector />
                      {/* <div style={{paddingTop:"20px"}}/> */}
                      <WalletTokenDetailTable />
                      <div style={{paddingTop:"20px"}}/>
                      </> :
                      <>
                      <div style={{paddingTop:"20px"}}/>
                      <SubTemplateBlockVertical>
                          <div style={{ marginBottom: "30px", fontSize: "13px", color: "#657795" }}>Total Value</div>
                          <div style={{ fontSize: "24px" }}>$ {assetState.totalBalance === 0 ? "-" : assetState.totalValue.toFixed(1)}</div>
                          <div style={{paddingTop:"20px"}}/>
                          <ChartCover a="594" b="20" c="10">
                            <AppleChart>token</AppleChart>
                            {
                              true ?
                              <BananaChart>Staking</BananaChart>
                              :
                              <></>
                            }
                            {
                              true ?
                              <WaterChart>LP</WaterChart>
                              :
                              <></>
                            }

                          </ChartCover>
                      </SubTemplateBlockVertical>
                      <Selector />
                      {/* <div style={{paddingTop:"20px"}}/> */}
                      <WalletHistory />
                      <div style={{paddingTop:"20px"}}/>
                      </>
                    :
                    <></>
                  }
                </Leftcolumn>
              </Topbox>
            </OverBox>
            </WalletContext.Provider>
        </>
    )
}


const ChartCover = styled.div`
  height: 40px;
  border: 2px solid white;
  border-radius: 10px;
  overflow: hidden;
  /* New code below: */
  display: grid;
  grid-template-columns: ${props=> props.a}fr ${props=> props.b}fr ${props=> props.c}fr;
  /* grid-template-columns: ${props=> props.a}fr ${props=> props.b}fr ${props=> props.c}fr; */
`

const AppleChart = styled.div`
  background: #111539;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BananaChart = styled.div`
  background: #4A5596;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WaterChart = styled.div`
  background:  #97A1D9;
    color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Segment = styled.div`
  height: 100%;
`;

const Leftcolumn = styled.div`
  width: 788px;
  margin: 0px auto;
  /* background: gray; */
  @media screen and (max-width: 500px){
    width: 100%;
  }
`

const Topbox = styled.div`
  width: 100%;
  /* margin-left: 32px;
  margin-right: 32px; */
  margin: 0px auto;
  gap: 24px;
  display: flex;
  /* overflow: hidden; */

  flex-direction: row;
  /* margin: 220px; */

  @media screen and (max-width: 500px){
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
  }
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
`

const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
  width: 1136px;
  @media screen and (max-width: 950px){
    width: 100%;
    padding-top: 20px;
    color: black;
  }
  @media screen and (max-width: 500px){
    width: 100%;
    padding-top: 20px;
    color: gray;
  }
`
const OverBox = styled.div`

  position: relative;
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: auto;
  padding: 30px;

  @media screen and (max-width: 950px){
    width: calc(100%);
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 10px;
  }
`



const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     max-width: 900px;
    /* margin: 10px auto; */
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:column;

    padding: 20px 25px !important;
    background: #fff;

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    border: 0px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;

export default Wallet;