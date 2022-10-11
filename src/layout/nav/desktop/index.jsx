import React,{useState} from "react";
import styled from 'styled-components';
import logo from "assets/CI/modified.svg"
import portfolio from "assets/uiux/portfolio.svg"
import analyticsWhite from 'assets/uiux/analytics_white.png'
import analyticsBlack from 'assets/uiux/analytics_black.png'
import overviewWhite from 'assets/uiux/overview_white.png'
import overviewBlack from 'assets/uiux/overview_black.png'
import yieldBlack from 'assets/uiux/yield_black.png'
import yieldWhite from 'assets/uiux/yield_white.png'
import collectionsBlack from 'assets/uiux/collections_black.png'
import collectionsWhite from 'assets/uiux/collections_white.png'    

import { useParams, Link, useLocation } from "react-router-dom";

function DesktopNav() {


    const { id } = useParams();
    const { pathname } = useLocation();

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

            {pathname === "/" || pathname.split("/")[1] === "project" ?
                <Link to="/">
                <Detailss>
                    <summary>
                        <span data-mainlinkicon><img height="25px" src={overviewWhite} /></span>
                        <span>Overview</span>
                    </summary>
                </Detailss>
                </Link>
                :
                <Link to="/">
                    <Details>
                        <summary>
                            <span data-mainlinkicon><img height="25px" src={overviewBlack} /></span>
                            <span>Overview</span>
                        </summary>
                    </Details>
                </Link>
           }

          {pathname === "/Poolpage" ?
           <Detailss>
                <summary>
                    <span data-mainlinkicon><img height="25px" src={yieldWhite} /></span>
                    <span>Yield</span>
                </summary>
           </Detailss>
           :
           <Link to="/Poolpage">
            <Details>
                <summary>
                    <span data-mainlinkicon><img height="25px" src={yieldBlack} /></span>
                    <span>Yield</span>
                </summary>
            </Details>
            </Link>
        }


        {pathname === "/analytics" ?
           <Detailss>
            <summary>
                <span data-mainlinkicon><img height="25px" src={analyticsWhite} /></span>
                <span>Analytics</span>
            </summary>
           </Detailss>
           :
           <Link to="/analytics">
           <Details>
            <summary>
                <span data-mainlinkicon><img height="25px" src={analyticsBlack} /></span>
                <span>Analytics</span>
            </summary>
          </Details>
          </Link>
        }

        <p data-linksheader>NFT Market</p>

        {pathname === "/nftview" ?
            <Detailss>
                <summary>
                    <span data-mainlinkicon><img height="25px" src={collectionsWhite} /></span>
                    <span>Overview</span>
                </summary>
            </Detailss>
        :
        <Link to="/nftview">
            <Details>
                <summary>
                    <span data-mainlinkicon><img height="25px" src={collectionsBlack} /></span>
                    <span>Overview</span>
                </summary>
            </Details>
        </Link>
        }

        <div
            style={{
                width: "70%",
                textAlign: "center",
                borderBottom: "1px solid gray",
                lineHeight: "0.1em",
                margin: "10px 0 10px",
            }}
            >
            {/* <span style={{ background: "gray", padding: "0 10px" }}>manage</span> */}
        </div>
        <Links style={{marginLeft:"5px",fontSize:"12px"}} onClick={()=>window.open(`https://amazing-leaf-bca.notion.site/Introduction-1fbb9ef8a0a542d18ca3351c3c88b58c`, "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
        About</Links>
        <Links style={{marginLeft:"5px",fontSize:"12px"}} onClick={()=>window.open(`https://twitter.com/klaylabs2022`, "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
        Twitter</Links>
        <Links style={{marginLeft:"5px",fontSize:"12px"}} onClick={()=>window.open(`https://t.me/klaylabsAlarm`, "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
        Notification</Links>
        <Links style={{marginLeft:"5px",fontSize:"12px"}} onClick={()=>window.open(`mailto:klaylabs2022@gmail.com`, "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
        email</Links>
        </Nav>
        </Wrapper>
        </Aside>
        </>
    );
}

const Links = styled.span`
  &:hover {
    cursor: pointer;
    color: #316395;
    text-decoration: underline;
  };
`


const Wrapper = styled.div`
    margin-left: 10px;

    @media screen and (max-width: 950px){
        display: none;
}    
`

const Aside = styled.aside`
    float: left;
    width: 200px;
    height: 100%;
    margin-left: 20px;
    padding-top: 30px;
    @media screen and (max-width: 950px){
        display: none;
}


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
        :hover {
            margin-left: 10px;
		}
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
  

  @media screen and (max-width: 912px){
        display: none;
}

`

export default DesktopNav;