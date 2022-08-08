import styled from 'styled-components';
import { BiBook } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/CI/modified.svg"


function Topnav() {
    const moveNotion = () => {
        window.location.href = "https://amazing-leaf-bca.notion.site/Introduction-1fbb9ef8a0a542d18ca3351c3c88b58c"
    }
    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }
    return (
        <>
            {/* <TemplateBlock>
                <span>
                    <Link to="/faq"><span style={{ fontSize: "27px", marginRight: "10px", height: "15px" }}><BsQuestionCircle /></span></Link>
                    <span onClick={moveNotion} style={{ cursor: "pointer", verticalAlign: "bottom", fontSize: "27px" }}><BiBook /></span>
                </span>

            </TemplateBlock> */}
            <CopyrightTop>CONTACT : klaylabs2022@gmail.com</CopyrightTop>
            <Copyright>Copyright 2022. KLAYlabs. All rights reserved.</Copyright>

        </>
    );
}

const CopyrightTop = styled.div`
  width: 900px;
  max-height: 768px;
  padding-top: 20px;
  padding-bottom: 5px;
  text-align:center;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  font-size: 12px;
  color: gray;

  @media screen and (max-width: 500px){
    width: 360px;
  }
`;

const Copyright = styled.div`
  width: 900px;
  max-height: 768px;
  padding-top: 5px;
  padding-bottom: 20px;
  text-align:center;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  font-size: 12px;
  color: gray;

  @media screen and (max-width: 500px){
    width: 360px;
  }
`;

const TemplateBlock = styled.div`
    width: 900px;
    max-height: 768px;
    border-radius: 16px;

    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
    font-size: 25px;

    margin-top: 25px;
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;

        
  @media screen and (max-width: 500px){
    width: 360px;
    font-size: 20px;
    }
`;

export default Topnav;
