import React, {useState,useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";

import { WalletContext } from "components/context/WalletContext"
import AddressBox from "./AddressBox.jsx"
import Selector from "./Selector.jsx"
import WalletTokenDetailTable from "pages/wallet/WalletTokenDetailTable.js"


const Wallet = () => {

  const [walletSearchTrigger, setWalletSearchTrigger] = useState(false)
  const [isDataLoading, SetIsDataLoading] = useState(false)
  const [isWalletLoad, SetIsWalletLoad] = useState(false) 
  const [walletAddress, SetWalletAddress] = useState("") // wallet address
  const [isSmallTokenOpen, setIsSmallTokenOpen] = useState(false)

  const [assetState, setAssetState] = useState({
    isWallet : true,
    totalValue : 1,
    token : {
      totalValue : 0,
      tokenList : [{
          symbol: "KLAY",
          price: 12,
          balance: 20,
          value: 240
      }],
      smallTokenList : [{
        symbol: "KLAY",
        price: 12,
        balance: 20,
        value: 240
     }]
    },
    klayswap : {
      totalValue : 1,
      vKSP : 200,
      stakedKSP : {
          balance : 1,
          price : 0.12,
          value : 2,
          unlockedDate : "2011-20-11"
      },
      pairPool : [{
            pairList : ["KLAY", "LAY"],
            balance : [32,11],
            value : 23.1
        }],
      singlePool : [{
            pairToken : "KLAY",
            balance : 231,
            price : 2,
            value : 23.1
        }],
      plusPool : [{
            pairList : ["KLAY", "LAY"],
            supply : [32,11],
            borrow : [2,1],
            debtRatio : 21,
            value : 0
        }]
      }
    })

      useEffect(() => {
        if(isDataLoading){
        setTimeout(function() {
          console.log(walletAddress.slice(0,2))
          if(walletAddress.slice(0,2) === "0x"){
            if(walletAddress.length === 42){
              loadchart()
            } else {
              SetIsDataLoading(false)
              alert("올바른 월렛주소를 입력해주세요.")
            }
          } else {
            SetIsDataLoading(false)
            alert("올바른 월렛주소를 입력해주세요.")
          }
        }, 1000);
        }
        // loadchart()
        // loadchart()
        }, [isDataLoading])
  
  
    const loadchart = async () => {
  
      const kk = await axios.get(`https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/walletbalance?address=${walletAddress}&chain=klaytn`)
      console.log("kk",kk.data)

      if(kk.data.isWallet === false){
        SetIsDataLoading(false)
        alert("올바른 월렛주소를 입력해주세요.")
      } else {
        kk.data.token.tokenList.sort(function (a, b) {
          return (a.balance * a.price) > (b.balance * b.price) ? -1 : (a.balance * a.price) < (b.balance * b.price) ? 1 : 0;
        })

        kk.data.token.smallTokenList.sort(function (a, b) {
          return (a.balance * a.price) > (b.balance * b.price) ? -1 : (a.balance * a.price) < (b.balance * b.price) ? 1 : 0;
        })


        console.log("aa",kk.data)

        setAssetState(kk.data)
        SetIsWalletLoad(true)
        SetIsDataLoading(false)  
      }



      // setAssetState(kk.data)


    }      

    return (
        <>
            <WalletContext.Provider value={{assetState, isDataLoading, SetIsDataLoading, isWalletLoad, SetIsWalletLoad,walletAddress, SetWalletAddress, isSmallTokenOpen, setIsSmallTokenOpen}}>
            <OverBox>
              <Topbox>
                <Leftcolumn>

                    <Wrappertitle>
                        <Title>Portfolio Viewer</Title>
                    </Wrappertitle>

                    <div style={{paddingTop:"20px"}}/>
                    <AddressBox />
                    {
                    isWalletLoad ? 
                    <>
                    <div style={{paddingTop:"20px"}}/>
                    <Selector />
                    <div style={{paddingTop:"20px"}}/>
                    <WalletTokenDetailTable />
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


const Leftcolumn = styled.div`
  width: 788px;
  /* background: gray; */
  @media screen and (max-width: 500px){
    width: 100%;
  }
`

const Topbox = styled.div`
  width: 1136px;
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
      width: 360px;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;

export default Wallet;