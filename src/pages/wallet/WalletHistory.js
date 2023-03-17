import React,{useState, useContext, useEffect} from "react";
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import klaytnLogo from "../../assets/uiux/klaytnLogo.png"
import icons from "../../assets/tokenIcons"
import { WalletContext } from 'components/context/WalletContext';
import arrowBack from '../../assets/uiux/arrowBack.svg'
import axios from "axios";


const WalletHistory = () => {


    const { walletHistory } = useContext(WalletContext);
    // console.log(walletHistory)
    
    return (
        <>
            {walletHistory.map((element) => (
                <SubTemplateBlockVertical>
                    <div style={{ marginBottom: "30px", fontSize: "12px", color: "#657795" }}>{element.dateTime} (UTC)</div>
                    {
                        element.jettonList.map((jetton)=>(
                            <>
                            <div style={{ fontSize: "15px", color: "#657795" }}>{jetton.direction} 
                                <div style={{float:"right"}}>
                                <img src={icons[jetton.symbol]} alt="logo" height="30px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                    {jetton.amount} 
                                </div>
                            </div>
                            {/* <div style={{ marginBottom: "30px", fontSize: "12px", color: "#657795" }}>{jetton.address}</div> */}
                            {/* <div style={{ marginBottom: "30px", fontSize: "12px", color: "#657795" }}></div> */}
                            </>
                            ))
                    }
                    
                </SubTemplateBlockVertical>
            ))}
        </>
    )
}

const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     max-width: 900px;

    margin: 10px auto;
    /* padding-bottom: 10px; */
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    /* padding:15px; */
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
      /* width: 360px; */
      /* margin: 10px 10px; */
      /* font-size: 15px; */
      width: 100%;
      box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    }
`;

export default WalletHistory;