import React,{useState, useContext, useEffect} from "react";
import styled from 'styled-components';
import { BiBook } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { WalletContext } from "../context/WalletContext"
import { Link } from "react-router-dom";
import logo from "../../assets/CI/modified.svg"
import portfolio from "../../assets/uiux/portfolio.svg"
import setportfolio from "../../assets/uiux/setPortfolio.svg"
import ranks from "../../assets/uiux/ranks.svg"
import setRanks from "../../assets/uiux/setRanks.svg"
import gear from '../../assets/uiux/gear.svg'
import setGear from '../../assets/uiux/setGear.svg'
import Mainpage from '../pages/Mainpage'



function Sidenav() {

    // const {serviceState, setServiceState} = useContext(WalletContext);
    const [serviceState, setServiceState] = useState("portfolio")

    const setPortfolio = () => {
        setServiceState("portfolio")
    }
    const setGroups = () => {
        setServiceState("History")
    }
    const setSettings = () => {
        setServiceState("settings")
    }

    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }

    return (
        <>
            <SideBar>
                <div onClick={moveMain} style={{ cursor: "pointer", }}>
                    <img src={logo} alt="logo" style={{ height: "40px", verticalAlign: "middle", color: "white" }} />
                    <div style={{ marginLeft: "5px", fontSize: "12px", fontStyle: "oblique" }}>DefiManager  (beta)</div>
                </div>

                {serviceState === "portfolio" ?
                <Name style={{ marginTop: "44px"}} onClick={setPortfolio}>
                    <img src={setportfolio} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                    <span style={{color:"#3366cc",fontWeight:"bold"}}>Portfolio</span>
                </Name> : 
                <Name style={{ marginTop: "44px"}} onClick={setPortfolio}>
                    <img src={portfolio} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                    <span>Portfolio</span>
                </Name>
                }

                {/* {serviceState === "History" ?
                <Name style={{ marginTop: "24px"}} onClick={setGroups}>
                <img src={setRanks} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                    <span style={{color:"#3366cc",fontWeight:"bold"}}>History</span>
                </Name> :
                <Name style={{ marginTop: "24px"}} onClick={setGroups}>
                <img src={ranks} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                    History
                </Name>
                } */}

                {serviceState === "settings" ?
                <Name style={{ marginTop: "24px"}} onClick={setSettings}>
                <img src={setGear} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                    <span style={{color:"#3366cc",fontWeight:"bold"}}>Settings</span>
                </Name> : 
                <Name style={{ marginTop: "24px"}} onClick={setSettings}>
                <img src={gear} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                    Settings
                </Name> 
                }

            </SideBar>
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
    cursor: pointer;
`


const SideBar = styled.div`
  padding-top: 13px;
  width: 250px;
  height: 100vh;
  position: fixed;
  overflow: auto;

  @media screen and (max-width: 500px){
        display: none;
}

`

export default Sidenav;
