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
import analyticsWhite from '../../assets/uiux/analytics_white.png'


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
        <Aside>
            <Wrapper>
            <Nav>
                <span onClick={moveMain} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="logo" style={{ height: "40px", verticalAlign: "middle" }} />
                    <span style={{ marginLeft: "0px", fontSize: "12px", fontStyle: "oblique" }}></span>
                </span>

            <div style={{height:"5px"}}></div>
            <p data-linksheader>DeFi Market</p>

            <Details>
                <summary>
                    <span data-mainlinkicon><img src={portfolio} /></span>
                    <span>Overview</span>
                </summary>
           </Details>
           <Details>
                <summary>
                    <span data-mainlinkicon><img src={portfolio} /></span>
                    <span>PoolList</span>
                </summary>
           </Details>           
           <Detailss>
                <summary>
                    <span data-mainlinkicon><img src={analyticsWhite} /></span>
                    <span>Analytics</span>
                </summary>
           </Detailss>           
           <p data-linksheader>NFT Market</p>

            <Details>
                <summary>
                    <span data-mainlinkicon><img src={portfolio} /></span>
                    <span>Overview</span>
                </summary>
            </Details>
            </Nav>
            </Wrapper>
            </Aside>
        </>
    );
}

const Wrapper = styled.div`
    margin-left: 10px;
    
`


const Aside = styled.aside`
    float: left;
    width: 200px;
    height: 100%;
    margin-left: 20px;
    padding-top: 30px;

`



const Details = styled.details`
	summary {
		display: flex;
		align-items: center;
		gap: 12px;
		list-style: none;
		list-style-type: none;
		opacity: 1;
		font-weight: 600;
		cursor: pointer;
        font-size: 14px;
	}
	summary::-webkit-details-marker {
		display: none;
	}
`

const Detailss = styled.details`
	summary {
		display: flex;
		align-items: center;
		gap: 12px;
		font-weight: 100;
		cursor: pointer;
        font-size: 13px;
        width: 10em;
        height: 6ex;
        padding-left: 10px;
        background-image: linear-gradient(135deg, #707b98 40%, #283b6b);
        border-radius: 5px;
        font-weight: bold;
        color: white;
	}
	summary::-webkit-details-marker {
		display: none;
	}
`




const Nav = styled.nav`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 16px;
	a,
	button {
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		opacity: 0.8;
		text-align: start;
		margin: -6px 0 -6px -6px;
		padding: 6px;
		border-radius: 6px;
		& > *[data-newtag] {
			background: #ebebeb;
			font-size: 0.625rem;
			border-radius: 4px;
			padding: 3px;
			color: black;
			position: relative;
			left: -4px;
			top: 2px;
		}
		:hover,
		:focus-visible {
			opacity: 1;
			background-color: ${({ theme }) =>
				theme.mode === 'dark' ? 'rgba(246, 246, 246, 0.1)' : 'rgba(246, 246, 246, 1)'};
		}
		&[data-linkactive='true'] {
			background-color: #2172e5;
			color: white;
			opacity: 1;
		}
	}
	p[data-linksheader] {
		font-size: 0.75rem;
		opacity: 0.5;
	}
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
    cursor: pointer;
`


const SideBar = styled.div`
  /* padding-top: 13px;
  width: 400px;
  height: 100vh;
  position: fixed;
  display: block;
  overflow: auto; */
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: gray;
  overflow-x: hidden;
  padding-top: 20px;
  

  @media screen and (max-width: 500px){
        display: none;
}

`

export default Sidenav;