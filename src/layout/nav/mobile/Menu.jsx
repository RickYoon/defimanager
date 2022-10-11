import { useEffect, useRef, useState, Fragment, forwardRef } from 'react'
// import { slide as Menu } from 'react-burger-menu';
import './Menu.css';
import styled, { keyframes } from 'styled-components'
import logo from "assets/CI/modified.svg"
import { BiBook } from "react-icons/bi";
import { ChevronRight, Menu as MenuIcon, X } from 'react-feather'
import { Button, Close } from './shared'
import analyticsWhite from 'assets/uiux/analytics_white.png'
import analyticsBlack from 'assets/uiux/analytics_black.png'
import overviewWhite from 'assets/uiux/overview_white.png'
import overviewBlack from 'assets/uiux/overview_black.png'
import yieldBlack from 'assets/uiux/yield_black.png'
import yieldWhite from 'assets/uiux/yield_white.png'
import collectionsWhite from 'assets/uiux/collections_white.png'
import { useParams, Link, useLocation } from "react-router-dom";

const slideIn = keyframes`
  0% {
    opacity: 0;
		right: -100%;
  }
  100% {
    opacity: 1;
		right: 0%;
  }
`

const Nav = styled.nav`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	/* overflow: auto; */
	display: flex;
	padding: 16px 16px 40px;
	width: 100%;
	max-width: 300px;
	background: rgb(33, 36, 41);
	flex-direction: column;
	gap: 20px;
	animation: 0.2s ${slideIn} ease;
	& > * {
		color: white;
		opacity: 0.7;
		padding: 0;
		font-weight: 500;
	}
	button {
		text-align: start;
	}
	& > *[data-linksheader] {
		font-size: 0.75rem;
		opacity: 0.5;
	}
`

const Backdrop = styled.div`
	display: none;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
    height: 100%;
    z-index:1;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
	background-color: rgb(0 0 0 / 10%);
	&[data-acitve='true'] {
		display: block;
	}

    /* height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px; */
`

function Menubutton() {

    const [show, setShow] = useState(false)
    const buttonEl = useRef(null)
    const navEl = useRef(null)
    const { id } = useParams();
    const { pathname } = useLocation();

    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }

    const moveNFT = () => {
        window.location.href = "http://localhost:7777/nftview"
    }


	useEffect(() => {
		function handleClick(e) {
			if (
				!(
					buttonEl.current &&
					navEl.current &&
					(buttonEl.current.contains(e.target) ||
						navEl.current.isSameNode(e.target) ||
						'togglemenuoff' in e.target.dataset)
				)
			) {
				setShow(false)
			}
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [])

  return (
    <TemplateBlock>
        <div onClick={moveMain} style={{ display:"flex", flexDirection: "row",cursor: "pointer" }}>
            <img src={logo} alt="logo" style={{ height: "40px", verticalAlign: "middle" }} />
        </div>
        <Button onClick={() => setShow(!show)} ref={buttonEl}>
				<MenuIcon height={16} width={16} />
        </Button>
        <Backdrop data-acitve={show}>
            <Nav ref={navEl}>
            <Close onClick={() => setShow(!show)}>
                    <X height={20} width={20} strokeWidth="4px" />
            </Close>
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
                            <span data-mainlinkicon><img height="25px" src={overviewWhite} /></span>
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
                    <span data-mainlinkicon><img height="25px" src={yieldWhite} /></span>
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
                <span data-mainlinkicon><img height="25px" src={analyticsWhite} /></span>
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
                    <span data-mainlinkicon><img height="25px" src={collectionsWhite} /></span>
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
        </Backdrop>
    </TemplateBlock>
  );
};

const Links = styled.span`
  &:hover {
    cursor: pointer;
    color: #316395;
    text-decoration: underline;
  };
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


const TemplateBlock = styled.div`
    display: none;

    @media screen and (max-width: 950px){
        width: 95%;
        font-size: 20px;
        max-height: 768px;
        vertical-align:middle;

        position: relative; 
        border-radius: 16px;

        margin: 10px auto; 
        font-size: 25px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }
`;


export default Menubutton;
