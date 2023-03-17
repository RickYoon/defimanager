import React, {useState,useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";
import { Button, Modal,Image, List } from 'semantic-ui-react'
import icons from "../../assets/tokenIcons"
import * as Styled from "./index.style"


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
  const [isloadingstate, setIsloadingstate] = useState(false)
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
 
      try {

        setIsloadingstate(true)
        localStorage.setItem('lastWalletAddress', walletAddress);

        const walletData = await axios.get(`https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/tonwalletviewer?address=${walletAddress}`)
        console.log("walletData",walletData)

        // manual object for demo 
        let returnObject = {
            totalValue : walletData.data.totalValue,
            token : {
              totalValue : walletData.data.token.totalValue,
              tokenList : walletData.data.token.tokenList
            },
            megaton : {
              totalValue : walletData.data.megaton.totalValue,
              pairPool : walletData.data.megaton.pairPool
            }
          }

        let tempHistoryList = []

        const historyData = await axios.get(`https://tonapi.io/v1/jetton/getHistory?account=${walletAddress}&limit=100`)
        // console.log("historyData", historyData.data.events)

        historyData.data.events.forEach((res)=>{

          let jettonTrxList = []


          res.actions.forEach((innerRes)=>{

            if(innerRes.type === "JettonTransfer"){
              let sendReceive = "receive";
              let interAddress = "";

              // console.log("innerRes",innerRes.JettonTransfer)
              // console.log("innerRes",res.account.address)
  
              if(innerRes.JettonTransfer.sender.address === res.account.address){
                sendReceive = "send"
                interAddress = innerRes.JettonTransfer.recipient.address
              } else {
                interAddress = innerRes.JettonTransfer.sender.address
              }

              let tempAmount = Number(innerRes.JettonTransfer.amount)
              let decimals = innerRes.JettonTransfer.jetton.decimals
              let transAmount = tempAmount / Math.pow(10,decimals)

              // console.log("tempAmount", tempAmount)
              // console.log("decimals", decimals)
              // console.log("transAmount", transAmount)

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

          // console.log("tempList",tempHistoryList)


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
        setIsloadingstate(false)
        SetIsWalletLoad(true)
        SetIsDataLoading(false)  

        } catch (e) {
          SetIsDataLoading(false)
          alert(e)
        }
      }

    const connectedList = [
      {
        projectName : "Jettons",
        category : "Tokens",
        poolNumber : 0
      },
      {
        projectName : "megatonfinance",
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
                    <Button onClick={() => setModal(true)} size="mini" style={{marginLeft:"20px"}}>{connectedList.length} connected
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
                <Modal.Header style={{fontSize:"17px"}}>List ({connectedList.length})</Modal.Header>
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
                          <div style={{ fontSize: "24px" }}>$ {assetState.totalValue.toLocaleString()}</div>
                          <div style={{paddingTop:"20px"}}/>
                          <ChartCover a={assetState.token.totalValue} b={assetState.megaton.totalValue} c="0">
                            <AppleChart>token</AppleChart>
                            {
                              assetState.megaton.totalValue !== 0 ?
                              <BananaChart>Staking</BananaChart>
                              :
                              <></>
                            }
                            {
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
                          <div style={{ fontSize: "24px" }}>$ {assetState.totalValue.toLocaleString()}</div>
                          {/* {assetState.totalBalance === 0 ? "-" : assetState.totalValue.toFixed(1)} */}
                          <div style={{paddingTop:"20px"}}/>
                          <ChartCover a={assetState.token.totalValue} b={assetState.megaton.totalValue} c="0">
                            <AppleChart>token</AppleChart>
                            {
                              assetState.megaton.totalValue !== 0 ?
                              <BananaChart>Staking</BananaChart>
                              :
                              <></>
                            }
                            {
                              <></>
                            }

                          </ChartCover>
                      </SubTemplateBlockVertical>
                      <Selector />
                      {/* <div style={{paddingTop:"20px"}}/> */}
                      <WalletHistory />
                      {/* <div style={{paddingTop:"20px"}}/> */}
                      </>
                    :
                    <>
                    {
                      isloadingstate ?
                      <>
                      <div style={{paddingTop:"20px"}}/>
                      <SubTemplateBlockVertical>
                          <div style={{ marginBottom: "30px", fontSize: "13px", color: "#657795" }}>Total Value</div>
                          <div style={{ fontSize: "24px" }}><Styled.ProductSkeleton/></div>
                          {/* {assetState.totalBalance === 0 ? "-" : assetState.totalValue.toFixed(1)} */}
                          <div style={{paddingTop:"20px"}}/>
                          <ChartCover style={{width:"100%"}}>
                            <div>
                              <Styled.ProductSkeleton/>
                            </div>
                            {/* <AppleChart>token</AppleChart> */}
                          </ChartCover>
                      </SubTemplateBlockVertical>
                      </>
                      :
                      <></>
                    }
                    </>
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