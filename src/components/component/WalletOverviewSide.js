import React,{useState, useContext} from "react";
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import klaytnLogo from "../../assets/uiux/klaytnLogo.png"
import icons from "../../assets/tokenIcons"
import { WalletContext } from 'components/context/WalletContext';
import CountUp, { useCountUp } from 'react-countup';
import arrowBack from '../../assets/uiux/arrowBack.svg'
import WalletTokenDetailTable from "./WalletTokenDetailTable";
import Connector from "../layout/TopnavConnection"
import walletIcon from "../../assets/uiux/wallet.png";
import close from "../../assets/uiux/close.png"
import WalletKlayswapDetailTable from "./WalletKlayswapDetailTable";



const WalletOverview = () => {

    const {walletaddress, assetState, setServiceState,isloading, setWalletaddress, setModalstate,setAssetState} = useContext(WalletContext);
    // console.log("assetState",assetState)

    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }

    const openModal = () => {
        // console.log("walletaddress",walletaddress)
        if (walletaddress.length > 0) {

        } else {
            setModalstate(true)
        }
    }

    const disconnect = () => {
        setWalletaddress("")
        console.log("disconnect")
        setAssetState({
            totalBalance : 0,
            klayBalance : 0,
            klayValue : 0,
            tokenBalance: 0,
            tokenList: [],
            klayswap: {
                klayswapTotalBalance :0
            },
            klaystation:{
                value: 0
            },
            kronosdao: {
                value : 0
            },
            kairoscash: {
                value : 0
            }
        })
        setServiceState("portfolio")
    }




    const tokenDetail = () => {
        // console.log("clicked")
        setServiceState("tokenDetail")
    }

    const klayswapDetail = () => {
        // console.log("clicked")

        setServiceState("klayswapDetail")
    }

    const klaystationDetail = () => {
        // console.log("clicked")
        setServiceState("klaystationDetail")
    }

    const kronosDetail = () => {
        // console.log("clicked")
        setServiceState("kronosDetail")
    }

    const KairosCashDetail = () => {
        // console.log("clicked")
        setServiceState("kairoscashDetail")
    }


    const goFeedback = () => {
        window.location.href="https://forms.gle/rhRN2vtxnYM1AYcA7"
    }


    return (
        <>
            <Container>

            <FeedbackBox>
                <Bar></Bar>
                <div style={{marginLeft:"10px", width:"78%", fontSize:"20px", fontWeight:"bold"}}> Portfolio </div>
                <span>
                    <Wallet onClick={openModal}>
                        <img src={walletIcon} alt="" style={{ marginRight: "5px", height: "30px", width: "30px" }} />
                        {walletaddress !== "" | undefined ?
                            <>
                            <span style={{ fontSize: "15px" }}>{walletaddress.slice(0, 7)}...</span>
                            <img src={close} alt="" onClick={disconnect} style={{ height: "20px", width: "20px" }} />
                            </> :
                            <span>Connect</span>
                        }
                    </Wallet>
                </span>
            </FeedbackBox>

            {walletaddress.length === 0 ? 
            <>
            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "30px", fontSize: "18px", color: "#657795" }}>Total Value</div>
                <div style={{ fontSize: "24px" }}>$ -</div>
            </SubTemplateBlockVertical>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "10px", fontSize: "20px" }}>Account Overview</div>
                <Innercontainer>
                    <InnerBoxNoclick>
                        <Name>
                            <img src={klaytnLogo} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            - Klay
                        </Name>
                        <Value>
                            $ - 
                        </Value>
                    </InnerBoxNoclick>
                    <InnerBoxNoclick>
                        <Name>
                            <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            Tokens
                        </Name>
                        <Value>
                            $ -
                        </Value>
                    </InnerBoxNoclick>
                    <InnerBoxNoclick>
                        <Name>
                            <img src={icons["Klayswap"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klayswap
                        </Name>
                        <Value>
                            $ -
                        </Value>
                    </InnerBoxNoclick>
                    <InnerBoxNoclick>
                        <Name>
                            <img src={icons["Klaystation"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klaystation
                        </Name>
                        <Value>
                        $ -
                        </Value>
                    </InnerBoxNoclick>
                    <InnerBoxNoclick>
                        <Name>
                            <img src={icons["Kronosdao"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            Kronosdao
                        </Name>
                        <Value>
                        $ -
                        </Value>
                    </InnerBoxNoclick>
                    <InnerBoxNoclick>
                        <Name>
                            <img src={icons["KairosCash"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            KairosCash
                        </Name>
                        <Value>
                        $ -
                        </Value>
                    </InnerBoxNoclick>

                </Innercontainer>

            </SubTemplateBlockVertical>  
            </> : 
            isloading ? 
            <>
            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "30px", fontSize: "18px", color: "#657795" }}>Total Value</div>
                    <ReactLoading type="spinningBubbles" color="gray" height={20} width={20}/>
            </SubTemplateBlockVertical>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "10px", fontSize: "20px" }}>Account Overview</div>
                <Innercontainer>
                    <InnerBoxNoclick>
                        <Name>
                            <img src={klaytnLogo} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            {assetState.klayBalance.toFixed(1)}{"  "}Klay
                        </Name>
                        <Value>
                            $ {assetState.klayValue} <ReactLoading type="spinningBubbles" color="gray" height={20} width={20}/>
                        </Value>
                    </InnerBoxNoclick>
                    <InnerBoxNoclick>
                        <Name>
                            <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            Tokens
                        </Name>
                        <Value>
                            $ {assetState.tokenBalance} <ReactLoading type="spinningBubbles" color="gray" height={20} width={20}/>
                        </Value>
                    </InnerBoxNoclick>
                    <InnerBoxNoclick>
                        <Name>
                            <img src={icons["Klayswap"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klayswap
                        </Name>
                        <Value>
                            <span style={{ color: "#657795" }}> (<CountUp end={100} duration={32}  /> %)</span>
                            <ReactLoading type="spinningBubbles" color="gray" height={20} width={20}/>
                        </Value>
                    </InnerBoxNoclick>
                    <InnerBoxNoclick>
                        <Name>
                            <img src={icons["Klaystation"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klaystation
                        </Name>
                        <Value>
                        $ {assetState.klaystation.value} <ReactLoading type="spinningBubbles" color="gray" height={20} width={20}/>
                        </Value>
                    </InnerBoxNoclick>
                    <InnerBox onClick={kronosDetail}>
                        <Name>
                            <img src={icons["Kronosdao"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            Kronosdao
                        </Name>
                        <Value>
                        $ {assetState.kronosdao.value} <ReactLoading type="spinningBubbles" color="gray" height={20} width={20}/>
                        </Value>
                    </InnerBox>
                    <InnerBox onClick={KairosCashDetail}>
                        <Name>
                            <img src={icons["KairosCash"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            KairosCash
                        </Name>
                        <Value>
                        $ {assetState.kairoscash.value} <ReactLoading type="spinningBubbles" color="gray" height={20} width={20}/>
                        </Value>
                    </InnerBox>
                </Innercontainer>

            </SubTemplateBlockVertical>  
            {/* <WalletTokenDetailTable />   */}

            </> :
            <>
            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "30px", fontSize: "18px", color: "#657795" }}>Total Value</div>
                {isloading ?
                    <><span><ReactLoading type="spin" color="black" height={24} width={24} /></span> </> :
                    <div style={{ fontSize: "24px" }}>$ {assetState.totalBalance.toFixed(2)}</div>
                }
            </SubTemplateBlockVertical>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "10px", fontSize: "20px" }}>Account Overview</div>
                <Innercontainer>
                    <InnerBoxNoclick>
                        <Name>
                            <img src={klaytnLogo} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            {assetState.klayBalance.toFixed(1)}{"  "}Klay
                        </Name>
                        <Value>
                            $ {assetState.klayValue}
                        </Value>
                    </InnerBoxNoclick>
                    <InnerBox onClick={tokenDetail}>
                        <Name>
                            <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            Tokens
                        </Name>
                        <Value>
                            $ {assetState.tokenBalance}
                        </Value>
                    </InnerBox>
                    <InnerBox onClick={klayswapDetail}>
                        <Name>
                            <img src={icons["Klayswap"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klayswap
                        </Name>
                        <Value>
                            $ {assetState.klayswap.klayswapTotalBalance}
                        </Value>
                    </InnerBox>
                    <InnerBox onClick={klaystationDetail}>
                        <Name>
                            <img src={icons["Klaystation"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klaystation
                        </Name>
                        <Value>
                        $ {assetState.klaystation.value}
                        </Value>
                    </InnerBox>
                    <InnerBox onClick={kronosDetail}>
                        <Name>
                            <img src={icons["Kronosdao"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            Kronosdao
                        </Name>
                        <Value>
                        $ {assetState.kronosdao.value}
                        </Value>
                    </InnerBox>
                    <InnerBox onClick={KairosCashDetail}>
                        <Name>
                            <img src={icons["KairosCash"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            KairosCash
                        </Name>
                        <Value>
                        $ {assetState.kairoscash.value}
                        </Value>
                    </InnerBox>
                </Innercontainer>
            </SubTemplateBlockVertical>
            </>
            }  
            {/* <WalletTokenDetailTable />  
            <WalletKlayswapDetailTable /> */}
            </Container>
        </>
    )
}


const Wallet = styled.div`
    align-items: center;
    background: #fff;
    border: 1px solid gray;
    border-radius: 6px;
    color: gray;
    cursor: pointer;
    display: flex;
    font-weight: 500;
    gap: 8px;
    margin-left: 36px;
    padding: 10px 14px;
    font-size:18px;
    @media screen and (max-width: 500px){        
        display: none;
    }
`

const Container = styled.div`
    margin-top:30px;
    padding-left:100px;
    @media screen and (max-width: 500px){
        margin-top:0px;
        padding-left:0px;
    }
`

const FeedbackBox = styled.div`
    width: 900px;
    margin: 0px auto;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:row;
    -webkit-box-align: center;
    align-items: center;

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
        margin: 10px 10px;
        padding-bottom: 10px;
        /* position: relative; 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
        display:flex;
        flex-direction:row;
        -webkit-box-align: center;
        align-items: center;

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

    }
`


const Bar = styled.div`
    width: 6px;
    height: 30px;
    background: #3366cc;
`

const Name = styled.div`
    color: #050f19;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 16px;
    justify-content: flex-start;
    font-size:16px;
    margin-bottom: 20px;

    align-items:center;
`
const Value = styled.div`
    color: #050f19;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: flex-start;
    font-size:20px;
    align-items:center;
`

// </Innercontainer>

const InnerBoxNoclick = styled.div`

    border: 1px solid #edeff1;
    display: flex;
    padding: 16px;
    overflow: hidden;
    position: relative;
    align-items: flex-start;
    border-radius: 8px;
    flex-direction: column;
    width: 22%;
    margin: 12px;
    flex-grow:0;

    @media screen and (max-width: 500px){
        width: 100%;
        margin: 10px auto;
    }
`

const InnerBox = styled.div`

&:hover{  
    border: 1px solid blue;
  }
    cursor: pointer;
    border: 1px solid #edeff1;
    display: flex;
    padding: 16px;
    overflow: hidden;
    position: relative;
    align-items: flex-start;
    border-radius: 8px;
    flex-direction: column;
    width: 22%;
    margin: 12px;
    flex-grow:0;

    @media screen and (max-width: 500px){
        width: 100%;
        margin: 10px auto;
    }
`

const Innercontainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content:space-around;
`

const SubTemplateBlockVertical = styled.div`
     width: 900px;
    margin: 20px auto;
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
        margin: 10px 10px;
        font-size: 12px;
        }
`;


export default WalletOverview;