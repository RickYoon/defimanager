import styled from 'styled-components';
import { BiBook } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/CI/modified.svg"
import icons from "../../assets/tokenIcons"

function Projectfooter() {
    const moveNotion = () => {
        window.location.href = "https://rebrand.ly/uqqlzva"
    }
    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }
    return (
        <>
            <TemplateBlock>
                    <Foottitle>connected projects</Foottitle>
                    <center>
                        <Iconwrapper>
                            <Img src={icons.Klayswap} alt="logo" />
                            <Img src={icons.Kokonutswap} alt="logo" />
                            <Img src={icons.PALA} alt="logo" />
                        </Iconwrapper>
                    </center>
            </TemplateBlock>
            <Copyright>Copyright 2022. KLAYlabs. All rights reserved.</Copyright>

        </>
    );
}


const TemplateBlock = styled.div`
    width: 900px;
    max-height: 768px;
    border-radius: 16px;

    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
    font-size: 25px;

    @media screen and (max-width: 500px){
    width: 360px;
    font-size: 20px;
    }
`;

const Iconwrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    height: 40px;
`

const Img = styled.img`
    height: 100%;
    border:1px solid #eaeaea;
    border-radius:50%;
    background-color: #f5f5f5;
`

const Foottitle = styled.div`
  text-align:center;
  font-size: 15px;
  color: gray;
  margin-top: 20px;

  @media screen and (max-width: 500px){
    width: 360px;
  }
`;

const Copyright = styled.div`
  width: 900px;
  max-height: 768px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align:center;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  font-size: 12px;
  color: gray;

  @media screen and (max-width: 500px){
    width: 360px;
  }
`;


export default Projectfooter;
