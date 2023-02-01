import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';
import logo from "../../assets/CI/modified.svg"
import walletIcon from "../../assets/uiux/wallet.png"
import ReactModal from 'react-modal';
import icons from "../../assets/tokenIcons"
import klaytnLogo from "../../assets/uiux/klaytnLogo.png"
import kliplogo from "../../assets/uiux/kliplogo.svg"
import close from "../../assets/uiux/close.png"
import { prepare, getResult } from 'klip-sdk'
import QRCode from "qrcode.react";
import ReactLoading from 'react-loading';
// import { useWeb3Context } from 'web3'

import WalletTokenDetailTable from "components/component/WalletTokenDetailTable"

function Topnav() {
    const [modalstate, setModalstate] = useState(false)
    const [klipmodalstate, setKlipmodalstate] = useState(false)
    const [walletaddress, setWalletaddress] = useState("")
    const [klaybalances, setKlayBalances] = useState(0)
    const [totalbalance, setTotalbalance] = useState(0)
    const [url, setUrl] = useState("");
    const [klipRequestKey, setKlipRequestKey] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const bappName = "KLAYLABS";


    useEffect(() => {
        loadAssets()        
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [walletaddress])

    const loadAssets = async () => {
        if (walletaddress.length > 0) {
            setIsLoading(true)
            const response = await axios.get(`http://54.180.32.252:1515/wallet/klay/${walletaddress}`).then((res) => { return res.data })
            console.log(response)
            let sliceValue = Number(response).toFixed(3)
            setKlayBalances(sliceValue)
            setTotalbalance(Number(sliceValue))
            setIsLoading(false)
        }

        // wallet address 를 입력하고 조회를 누르면
        // 백앤드에서 자산정보를 불러오고, 화면에 출력을 시작한다.
    }

    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }

    const openModal = () => {
        if (walletaddress.length > 0) {
        } else {
            setModalstate(true)
        }
    }

    const closeModal = () => {
        setModalstate(false)
    }

    const closeKlipModal = () => {
        setKlipmodalstate(false)
    }

    const disconnect = () => {
        setWalletaddress("")
        setKlayBalances(0)
        setTotalbalance(0)
        setIsLoading(false)
    }

    const connectKaikas = async () => {
        setIsLoading(true)
        const { klaytn } = window
        // console.log("klaytn", klaytn)

        if (klaytn) {
            try {
                await klaytn.enable()
                await scanKlaybalance(klaytn)
                closeModal()
                // klaytn.on('accountsChanged', () => setAccountInfo(klaytn))
                setIsLoading(false)

            } catch (error) {
                console.log('User denied account access')
            }
        } else {
            console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
        }

    }

    const connectMetamask = async () => {

        const provider = window.ethereum;
        const account = await provider.request({method:'eth_requestAccounts'})
        console.log(account)

        await scanKlaybalance(account[0])
        closeModal()
        setWalletaddress(account[0])
        setIsLoading(false)

    }

    

    const isMobile = () => { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) }

    const connectKlip = async () => {

        const checker = isMobile()
        // const { klaytn } = window
        // console.log("klaytn", klaytn)

        if (!checker) {
            try {
                const res = await prepare.auth({ bappName });

                if (res.err) {
                    // 에러 처리
                } else if (res.request_key) {
                    // request_key 보관
                    console.log(res);
                    setUrl(
                        `https://klipwallet.com/?target=/a2a?request_key=${res.request_key}`
                    );
                    setKlipRequestKey(res.request_key)
                    console.log(url);
                }
            } catch (error) {
                console.log('User denied account access')
            }
            setModalstate(false)
            setKlipmodalstate(true)

        } else {
            console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
        }

    }

    const scanKlaybalance = async () => {
        const { klaytn } = window
        if (klaytn === undefined) return
        setWalletaddress(klaytn.selectedAddress)
    }

    const modalStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        content: {
            width: "350px",
            height: "330px",
            margin: "auto auto",
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            border: '1px solid #ccc',
            overflow: "hidden",
            inset: "0px"
        }
    }

    const check = async () => {
        if (klipRequestKey === null) return;
        const res = await getResult(klipRequestKey);
        if (res.status === "completed") {
            const UserAddress = res.result.klaytn_address;
            console.log(UserAddress)
        }
    };

    // polling 1sec
    // https://a2a-api.klipwallet.com/v2/a2a/result?request_key=6d55d3db-312a-4d37-a94f-87d00b9574bc

    return (
        <>
            <TemplateBlock style={{ marginBottom: "0px" }}>

                {/* <span onClick={moveMain} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="logo" style={{ height: "40px", verticalAlign: "middle" }} />
                    <div style={{ height: "15px", marginTop: "5px", marginLeft: "5px", fontSize: "12px", fontStyle: "oblique" }}>DeFi-Manager  (beta)</div>
                </span> */}

                <span>
                    <Wallet onClick={openModal}>
                        <img src={walletIcon} alt="" style={{ marginRight: "5px", height: "30px", width: "30px" }} />
                        {walletaddress.length > 0 ?
                            <>
                                <span style={{ fontSize: "15px" }}>{walletaddress.slice(0, 7)}...</span>
                                <img src={close} alt="" onClick={disconnect} style={{ height: "20px", width: "20px" }} />
                            </> :
                            <span>Connect</span>
                        }
                    </Wallet>
                </span>
            </TemplateBlock>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "30px", fontSize: "18px", color: "#657795" }}>Total Value</div>
                {isLoading ?
                    <><span><ReactLoading type="spin" color="black" height={24} width={24} /></span> </> :
                    <div style={{ fontSize: "24px" }}>$ {totalbalance}</div>
                }
            </SubTemplateBlockVertical>

            <WalletTokenDetailTable />

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "10px", fontSize: "20px" }}>Account Overview</div>
                <Innercontainer>
                    <InnerBox>
                        <Name>
                            <img src={klaytnLogo} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            Klay
                        </Name>
                        <Value>
                            $ {klaybalances}
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            Tokens
                        </Name>
                        <Value>
                            $ 0
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src={icons["Klayswap"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klayswap
                        </Name>
                        <Value>
                            $ 0
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src={icons["Klaystation"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klaystation
                        </Name>
                        <Value>
                            $ 0
                        </Value>
                    </InnerBox>
                </Innercontainer>

            </SubTemplateBlockVertical>


            <ReactModal style={modalStyle} isOpen={modalstate}>
                <p style={{ fontSize: "20px", paddingBottom: "20px" }}>Select Wallet
                        <button style={{ float: "right" }} onClick={closeModal} > x</button>
                </p>
                <Box onClick={connectKaikas}>
                    <img style={{ marginRight: "10px", height: "30px", verticalAlign: "middle" }} src="https://klayswap.com/img/icon/ic-service-kaikas-wh.svg" alt="" />
                    <span style={{ color: "white" }}>connect Kaikas</span>
                </Box>
                <Box onClick={connectKlip} style={{ backgroundColor: "#216FEA", paddingTop: "20px", }}>
                    <img style={{ marginRight: "10px", height: "18px", verticalAlign: "middle" }} src={kliplogo} alt="" />
                    <span style={{ color: "white" }}>connect klip</span>
                </Box>
                <Box onClick={connectMetamask} style={{ backgroundColor: "rgb(250, 240, 252)" }}>
                    <img style={{ marginRight: "10px", height: "30px", verticalAlign: "middle" }} src="https://klayswap.com/img/icon/ic-service-metamask.svg" alt="" />
                    <span>connect Metamask</span>
                </Box>
            </ReactModal>

            <ReactModal style={modalStyle} isOpen={klipmodalstate}>
                <p style={{ fontSize: "20px", paddingBottom: "20px" }}>Select Wallet
                        <button style={{ float: "right" }} onClick={closeKlipModal} > x</button>
                </p>
                <button onClick={check}>확인</button>

                {klipRequestKey !== null ? (
                    <QRCode
                        value={`https://klipwallet.com/?target=/a2a?request_key=${klipRequestKey}`}
                    />
                ) : null}
            </ReactModal>


        </>
    );
}

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
const InnerBox = styled.div`
    
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
    margin: 10px auto;
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
      font-size: 12px;
    }
`;

const Box = styled.div`
    width: 100%;
    margin-top:20px;
    margin-bottom:20px;
    height: 60px;
    text-align:center;
    padding-top:15px;
    cursor: pointer;
    border-radius: 4px;
    background-color: rgb(111, 101, 88);    
    inset: 0px;
`


const Wallet = styled.div`
    align-items: center;
    background: #fff;
    border: 1px solid gray;
    border-radius: 6px;
    color: gray;
    cursor: pointer;
    display: flex!important;
    font-weight: 500;
    gap: 8px;
    margin-left: 36px;
    padding: 10px 14px;
    font-size:18px;
`

const TemplateBlock = styled.div`
    width: 900px;
    max-height: 768px;
    vertical-align:middle;

    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    border-radius: 16px;

    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
    font-size: 25px;

    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    @media screen and (max-width: 500px){
        width: 360px;
        font-size: 20px;
    }
`;



export default Topnav;
