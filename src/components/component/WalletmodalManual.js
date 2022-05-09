import React,{useContext,useState,useEffect} from "react";
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

const WalletmodalManual = () => {
    
    const {setWalletaddress, modalstate, setModalstate} = useContext(WalletContext);
    // const [modalstate, setModalstate] = useState(false)
    const [klipmodalstate, setKlipmodalstate] = useState(false)
    const [klipRequestKey, setKlipRequestKey] = useState("")
    const [setUrl] = useState("");
    const bappName = "KLAYLABS";

    const isMobile = () => { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) }

    useEffect(()=>{
        const mobileTure = isMobile()
        if (!mobileTure) { // PC client
        if (window.klaytn.selectedAddress !== undefined) { // 조건문 추가
            setWalletaddress(window.klaytn.selectedAddress)
          }
        }
        // eslint-disable-next-line
    },[])

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

        const { klaytn } = window;
        if (klaytn === undefined) return;
        await klaytn.enable();
        const klaytnAddress = await klaytn.selectedAddress;

        if(klaytnAddress === undefined){
            window.location.reload();
        }

       if (klaytnAddress > 0) { // 조건문 추가
          setWalletaddress(klaytnAddress)
          closeModal()
        }

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
                <p style={{ fontSize: "20px", paddingBottom: "20px" }}>Insert Walletaddress
                        <button style={{ float: "right" }} onClick={closeModal} > x</button>
                </p>

                <BoxKaikas>
                    <img style={{ marginRight: "10px", height: "30px", verticalAlign: "middle" }} src={kaikas} alt="" />
                    <span style={{ color: "white" }}>Klaytn chain</span>
                </BoxKaikas>

                <Input placeholder="0x..." type="text" />
                <button>Connect Wallet</button>
            
            
            </ReactModal>        
        </>

    )
}

const Input = styled.input`
  width: 100%;
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "gray"};
  background: white;
  border-radius: 1px;
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
    inset: 0px;
`

const BoxKaikas = styled.div`
    width: 50%;
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

const BoxMetamask = styled.div`
    width: 100%;
    margin-top:20px;
    margin-bottom:20px;
    height: 60px;
    text-align:center;
    padding-top:15px;
    cursor: pointer;
    border-radius: 4px;
    background-color: rgb(250, 240, 252);
    inset: 0px;
`

export default WalletmodalManual;