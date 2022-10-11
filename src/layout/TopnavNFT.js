import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { BiBook } from "react-icons/bi";
import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/CI/modified.svg"
import { AiFillTrophy, AiOutlineProfile } from "react-icons/ai";
import {BsCreditCard2FrontFill} from "react-icons/bs";
import {SiBitcoinsv} from "react-icons/si"
import {GiChecklist} from "react-icons/gi"
import {BiSpreadsheet} from "react-icons/bi";

function TopnavNFT() {
    const { pathname } = useLocation();

    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }

    const moveNFT = () => {
        window.location.href = "http://localhost:7777"
    }

    const moveDocs = () => {
        window.location.href = "https://amazing-leaf-bca.notion.site/Introduction-1fbb9ef8a0a542d18ca3351c3c88b58c"
    }

    return (
        <>
            <TemplateBlock>
                <div onClick={moveMain} style={{ display:"flex", flexDirection: "row",cursor: "pointer" }}>
                    <img src={logo} alt="logo" style={{ height: "40px", verticalAlign: "middle" }} />
                </div>
                <div style={{display:"flex", flexDirection: "row",marginTop:"10px", fontSize:"25px", cursor: "pointer"}}>
                    <div onClick={moveNFT} style={{marginRight:"15px", fontSize:"15px", lineHeight:"1.6"}}>DeFi</div>
                    <div style={{marginRight:"15px"}}><BiBook /></div>
                </div>
            </TemplateBlock>

            <SubTopNavBlock style={{ marginBottom: "30px", marginTop: "20px", fontSize: "17px" }}>
                <Underline primary={pathname === "/nftview"}>
                    <Span style={{ color: "black" }}><BiSpreadsheet style={{ marginRight: "5px", verticalAlign: "middle" }} />Overview </Span>
                </Underline>
                {/* <Underline style={{ marginLeft: "10px" }} primary={pathname === "/nftview"}>
                    <Link to="/nftview">
                        {pathname === "/nftview" ?
                            <span style={{ color: "black" }}><BsCreditCard2FrontFill style={{ marginRight: "5px", verticalAlign: "middle" }} /> NFT </span> :
                            <span style={{ color: "gray" }}><BsCreditCard2FrontFill style={{ marginRight: "5px", verticalAlign: "middle" }} /> NFT </span>
                        }
                    </Link>
                </Underline> */}
                {/* <Underline style={{ marginLeft: "5px" }} primary={pathname === "/Poolpage"}>
                    <Link to="/Poolpage">
                        {pathname === "/Poolpage" ?
                            <span style={{ color: "black" }}><GiChecklist style={{ marginRight: "0px", verticalAlign: "middle" }} /> APR </span> :
                            <span style={{ color: "gray" }}><GiChecklist style={{ marginRight: "0px", verticalAlign: "middle" }} /> APR </span>
                        }
                    </Link>
                </Underline> */}
                {/* <Underline style={{ marginLeft: "10px" }} primary={pathname === "/news"}>
                    <Link to="/news">
                        {pathname === "/news" ?
                            <span style={{ color: "black" }}><AiOutlineProfile style={{ marginRight: "5px", verticalAlign: "middle" }} />News </span> :
                            <span style={{ color: "gray" }}><AiOutlineProfile style={{ marginRight: "5px", verticalAlign: "middle" }} /> News </span>
                        }
                    </Link>
                </Underline> */}
                {/* <Underline style={{ marginLeft: "10px" }} primary={false}>
                    <BsFillPeopleFill style={{ marginRight: "5px", verticalAlign: "middle" }} />Community
                </Underline> */}
            </SubTopNavBlock>
        </>
    );
}


const Wallet = styled.div`

&:hover {
    background : gray;
    color : white;
  }

    align-items: center;
    background: #fff;
    border: 0.1px solid gray;
    border-radius: 6px;
    color: gray;
    cursor: pointer;
    display: flex!important;
    font-weight: 500;
    gap: 8px;
    margin-left: 36px;
    padding: 10px 14px;
    font-size:18px;

    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    /* border: 0.1px gray gray; */
    border-radius: 0.5rem;
    overflow: visible;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;

`

const Button = styled.button`
  /* display: inline-block;
  color: black;
  font-size: 18px;
  margin-top: 3px; */
  /* padding: 0.25em 1em; */
  /* border-radius: 0px; */
  /* border-color:gray; */
`;

const TemplateBlock = styled.div`
    width: 1136px;
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



const Span = styled.span`
  /* background-color: #0a1930; */
  /* border: 1px solid #fff;
  border-radius: 999px;
  color: black;
  font-size: .75rem; */
  font-weight: 1000; 
  letter-spacing: .05rem;
  /* padding: 0.5rem 1rem;
  text-decoration: none;
  text-transform: capitalize;
  transition: all .3s ease-in-out;
  cursor: pointer; */

    &:hover {
    color:black;
  }
`

const Underline = styled.span`
  /* Adapt the colors based on primary prop */
  border-bottom: ${props => props.primary ? "2px solid black" : ""};
  color : ${props => props.primary ? "black" : "gray"};
  padding : 5px;
  font-weight : 900;
  @media screen and (max-width: 500px){
    font-size: 15px;
  }
`;

const SubTopNavBlock = styled.div`
  width: 1136px;
  max-height: 768px;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 10px;
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  font-size: 15px;

  @media screen and (max-width: 500px){
    width: 360px;
    font-size: 12px;
  }
`;

export default TopnavNFT;
