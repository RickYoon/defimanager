import React, { useState } from 'react';
import styled from 'styled-components';
import logo from "../../assets/CI/modified.svg"
import ReactModal from 'react-modal';
import icons from "../../assets/tokenIcons"


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
            <TemplateBlock style={{ marginBottom: "50px" }}>
                <span onClick={moveMain} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="logo" style={{ height: "40px", verticalAlign: "middle" }} />
                    <div style={{ height: "15px", marginTop: "5px", marginLeft: "5px", fontSize: "12px", fontStyle: "oblique" }}>DeFi-Wallet  (beta)</div>
                </span>
                <span>
                    <Wallet onClick={openModal}>
                        <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" style={{ marginRight: "5px" }} />
                        <span>Connect</span>
                    </Wallet>
                </span>
            </TemplateBlock>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "30px", fontSize: "18px", color: "#657795" }}>Total Value</div>
                <div style={{ fontSize: "24px" }}>$ 0</div>
            </SubTemplateBlockVertical>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "10px", fontSize: "20px" }}>Account Overview</div>
                <Innercontainer>
                    <InnerBox>
                        <Name>
                            <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" style={{ marginRight: "16px" }} />
                            Tokens
                        </Name>
                        <Value>
                            $ 0
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src={icons["Klayswap"]} style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klayswap
                        </Name>
                        <Value>
                            $ 0
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src={icons["Klaystation"]} style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klaystation
                        </Name>
                        <Value>
                            $ 0
                        </Value>
                    </InnerBox>
                </Innercontainer>

            </SubTemplateBlockVertical>


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
