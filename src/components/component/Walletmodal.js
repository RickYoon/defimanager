import React,{useContext,useState} from "react";
import ReactModal from 'react-modal';
import axios from 'axios';
import { WalletContext } from 'components/context/WalletContext';
import { prepare } from 'klip-sdk'
import styled from 'styled-components'
import kliplogo from "../../assets/uiux/kliplogo.svg"
import metamask from "../../assets/uiux/metamask.svg"
import kaikas from "../../assets/uiux/kaikas.svg"
import QRCode from "qrcode.react";

// kaikas PC connection 
// klip PC, mobile connection
// metamask PC connection

const Walletmodal = () => {
    
    const {walletaddress,setWalletaddress, modalstate, setModalstate} = useContext(WalletContext);
    // const [modalstate, setModalstate] = useState(false)
    const [klipmodalstate, setKlipmodalstate] = useState(false)
    const [klipRequestKey, setKlipRequestKey] = useState("")
    const [url, setUrl] = useState("");
    const bappName = "KLAYLABS";

    const closeModal = () => {
        setModalstate(false)
        // console.log(klipmodalstate)
        // console.log(klipRequestKey)
    }

    const closeKlipModal = () => {
        setKlipmodalstate(false)
        setUrl("")
    }

    const connectKaikas = async () => {
        const { klaytn } = window
        // console.log("klaytn", klaytn)

        if (klaytn) {
            try {
                await klaytn.enable()
                await scanKlaybalance(klaytn)
                closeModal()
                // klaytn.on('accountsChanged', () => setAccountInfo(klaytn))

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
        // console.log(account)

        // await scanKlaybalance(account[0])
        setWalletaddress(account[0])
        console.log(account[0])
        closeModal()
    }

    const isMobile = () => { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) }

    const autoLogin = async (key) => {

        const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay)) //이와 같이 선언 후

        for (let i=0;i<20;i++){

            let authCheck = await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${key}`)
            // console.log(authCheck)
            await wait(1000)

            if(authCheck.data.status !== "prepared"){
                // console.log(i)
                setKlipmodalstate(false)
                setWalletaddress(authCheck.data.result.klaytn_address)
                i=20
            }
        }
    }

    const connectKlip = async () => {

        const mobileTure = isMobile()

        if (!mobileTure) { // PC client

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
                    // console.log(url);
                    setModalstate(false)
                    setKlipmodalstate(true)        
                    autoLogin(res.request_key)
                }
            } catch (error) {
                console.log('User denied account access')
            }
    

        } else {

            try {

                const res = await prepare.auth({ bappName });
                    if (res.err) {
                        // err handling
                    } else if (res.request_key) {
                        // key management
                        // console.log(res);
                        window.location.href = `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${res.request_key}`
                        setKlipRequestKey(res.request_key)
                        // console.log(url);
                        autoLogin(res.request_key)
                        setModalstate(false)
                    }

                } catch (error) {
                    console.log('User denied account access')
                }
        }

    }

    const scanKlaybalance = async () => {
        const { klaytn } = window
        if (klaytn === undefined) return
        setWalletaddress(klaytn.selectedAddress)
        // console.log("walletaddress",walletaddress)
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


    return (

        <>
            <ReactModal style={modalStyle} isOpen={modalstate}>
                <p style={{ fontSize: "20px", paddingBottom: "20px" }}>Select Wallet
                        <button style={{ float: "right" }} onClick={closeModal} > x</button>
                </p>
                <Box onClick={connectKaikas}>
                    <img style={{ marginRight: "10px", height: "30px", verticalAlign: "middle" }} src={kaikas} alt="" />
                    <span style={{ color: "white" }}>connect Kaikas</span>
                </Box>
                <Box onClick={connectKlip} style={{ backgroundColor: "#216FEA", paddingTop: "20px", }}>
                    <img style={{ marginRight: "10px", height: "18px", verticalAlign: "middle" }} src={kliplogo} alt="" />
                    <span style={{ color: "white" }}>connect klip</span>
                </Box>
                <Box onClick={connectMetamask} style={{ backgroundColor: "rgb(250, 240, 252)" }}>
                    <img style={{ marginRight: "10px", height: "30px", verticalAlign: "middle" }} src={metamask} alt="" />
                    <span>connect Metamask</span>
                </Box>
            </ReactModal>

            <ReactModal style={modalStyle} isOpen={klipmodalstate}>
                <p style={{ fontSize: "20px", paddingBottom: "20px" }}>klip QR connection
                        <button style={{ float: "right" }} onClick={closeKlipModal} > x</button>
                </p>
                {klipRequestKey !== null ? (
                    <>
                    <div style={{marginTop:"15px"}}>
                    <QRCode 
                        renderAs="svg"
                        value={`https://klipwallet.com/?target=/a2a?request_key=${klipRequestKey}`}
                        style={{margin: "auto", display: "block"}}
                    />
                    </div>
                    <ul style={{marginTop:"20px", textAlign:"center"}}>
                        <li style={{marginTop:"10px"}}>1) kakaotalk 실행</li>
                        <li style={{marginTop:"10px"}}>2) 상단 검색창 클릭</li>
                        <li style={{marginTop:"10px"}}>3) 코드 스캔 후 로그인</li>
                    </ul>
                    </>
                ) : null}
            </ReactModal>

        
        </>

    )
}

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

export default Walletmodal;