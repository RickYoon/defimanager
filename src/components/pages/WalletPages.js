import React, { useState } from 'react';
import styled from 'styled-components';
import logo from "../../assets/CI/modified.svg"
import ReactModal from 'react-modal';


function Topnav() {
    const [modalstate, setModalstate] = useState(false)
    const [clienttype, setClienttype] = useState("PC")

    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }

    const openModal = () => {
        setModalstate(true)
        if (window.screen.width < 500) {
            setClienttype("Mobile")
        }
    }

    const closeModal = () => {
        setModalstate(false)
    }

    const connectKaikas = async () => {

        const { klaytn } = window
        console.log("klaytn", klaytn)

        if (klaytn) {
            try {
                await klaytn.enable()
                // await setAccountInfo(klaytn)
                // klaytn.on('accountsChanged', () => setAccountInfo(klaytn))
            } catch (error) {
                console.log('User denied account access')
            }
        } else {
            console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
        }

    }


    const stylesPc = {
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
            <TemplateBlock>
                <span onClick={moveMain} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="logo" style={{ height: "40px", verticalAlign: "middle" }} />
                </span>
                <span>
                    <Wallet onClick={openModal}>Connect</Wallet>
                </span>
            </TemplateBlock>

            <ReactModal style={stylesPc} isOpen={modalstate}>
                <p style={{ fontSize: "20px", paddingBottom: "20px" }}>Select Wallet
                        <button style={{ float: "right" }} onClick={closeModal} > x</button>
                </p>
                <Box onClick={connectKaikas}>
                    <img style={{ marginRight: "5px", height: "30px", verticalAlign: "middle" }} src="https://klayswap.com/img/icon/ic-service-kaikas-wh.svg" />
                    <span style={{ color: "white" }}>Kaikas</span>
                </Box>
                <Box style={{ backgroundColor: "rgb(254, 229, 0)" }}>
                    <img style={{ marginRight: "5px", height: "30px", verticalAlign: "middle" }} src="https://klayswap.com/img/icon/ic-service-klip-bk.svg" />
                    <span>Kakaotalk klip</span>
                </Box>
                <Box style={{ backgroundColor: "rgb(250, 240, 252)" }}>
                    <img style={{ marginRight: "5px", height: "30px", verticalAlign: "middle" }} src="https://klayswap.com/img/icon/ic-service-metamask.svg" />
                    <span>Metamask</span>
                </Box>
            </ReactModal>

        </>
    );
}

const Box = styled.div`
    width: 100%;
    margin-top:20px;
    margin-bottom:20px;
    height: 60px;
    text-align:center;
    padding-top:15px;
    cursor: pointer;
    border-radius: 6px;
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
