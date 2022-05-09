import React, {useContext} from 'react';
import styled from 'styled-components';
import logo from "../../assets/CI/modified.svg";
import walletIcon from "../../assets/uiux/wallet.png";
import close from "../../assets/uiux/close.png"
import { WalletContext } from 'components/context/WalletContext';

const TopnavManagerMobile = () => {

    const {walletaddress, setWalletaddress, setModalstate,setAssetState,setServiceState} = useContext(WalletContext);
    
    // console.log("walletaddress",walletaddress)

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
            klayswap: {
                klayswapTotalBalance :0
            },
            klaystation:{
                value: 0
            }
        })
        setServiceState("overview")
        // setAssetState({
        //     totalBalance : 0,
        //     klayBalance : 0
        // })
    }
    return (
        <>
            <TemplateBlock style={{ marginBottom: "50px" }}>

                <span onClick={moveMain} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="logo" style={{ height: "40px", verticalAlign: "middle" }} />
                    <div style={{ height: "15px", marginTop: "5px", marginLeft: "5px", fontSize: "12px", fontStyle: "oblique" }}>DeFi-Manager  (beta)</div>
                </span>


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

            </TemplateBlock>
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
    display: flex!important;
    font-weight: 500;
    gap: 8px;
    margin-left: 36px;
    padding: 10px 14px;
    font-size:18px;
    
`

const TemplateBlock = styled.div`
    display:none;

    @media screen and (max-width: 500px){
        width: 350px;
        max-height: 768px;
        vertical-align:middle;

        position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
        border-radius: 16px;

        margin: 10px 10px; /* 페이지 중앙에 나타나도록 설정 */
        font-size: 25px;

        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;

    }
`;

export default TopnavManagerMobile;