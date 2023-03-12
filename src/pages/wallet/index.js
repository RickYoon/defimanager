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

const Wallet = () => {

  const [walletSearchTrigger, setWalletSearchTrigger] = useState(false)
  const [isDataLoading, SetIsDataLoading] = useState(false)
  const [isWalletLoad, SetIsWalletLoad] = useState(false) 
  const [walletAddress, SetWalletAddress] = useState("") // wallet address
  const [isSmallTokenOpen, setIsSmallTokenOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [isAsset, setIsAsset] = useState(true)
  const [walletHistory, setWalletHistory] = useState([{
    time:"2022-10-22 12:00",
    from:"",
    to:"",
    content: ""    
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

        const currentLpInformation = await axios.get("https://megaton.fi/api/lp/infoList")
        console.log("currentLp", currentLpInformation.data[0])

        currentLpInformation.data[0].forEach((res)=>{
            //lpAccount
            // console.log("res",res)
            // if(res.address === )
            // if(res.)
            if(res.address === tempMegatonLP[0].lpAccount){
              console.log("res", res)
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


        const historyData = await axios.get("https://api.ton.cat/v2/contracts/address/EQCeHendv97uqK8bU0I2xiRPVuWFMiHviEZKIwJUMl_CKOsY/transactions?limit=20&offset=0")
        console.log("historyData", historyData)

        setAssetState(returnObject)
        SetIsWalletLoad(true)
        SetIsDataLoading(false)  

        } catch (e) {
          SetIsDataLoading(false)
          alert("Please check your wallet address")
        }
      }

    const connectedList = [
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
      },
      {
        projectName : "tonwhales",
        category : "staking",
        poolNumber : 0
      },
      {
        projectName : "tonstake",
        category : "staking",
        poolNumber : 0
      }
    ]

    return (
        <>
            <WalletContext.Provider value={{isAsset, setIsAsset, assetState, isDataLoading, SetIsDataLoading, isWalletLoad, SetIsWalletLoad,walletAddress, SetWalletAddress, isSmallTokenOpen, setIsSmallTokenOpen}}>
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
                      <Selector />
                      <div style={{paddingTop:"20px"}}/>
                      <WalletTokenDetailTable />
                      <div style={{paddingTop:"20px"}}/>
                      </> :
                      <>
                      <div style={{paddingTop:"20px"}}/>
                      <Selector />
                      <div style={{paddingTop:"20px"}}/>
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