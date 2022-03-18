import styled from 'styled-components';
import { useLocation } from "react-router-dom";

import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/CI/modified.svg"
import { AiFillTrophy, AiOutlineProfile } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";


function Topnav() {
    const { pathname } = useLocation();

    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }
    return (
        <>
            <TemplateBlock>
                <span onClick={moveMain} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="logo" style={{ height: "40px", verticalAlign: "middle" }} />
                    <span style={{ marginLeft: "5px", fontSize: "12px", fontStyle: "oblique" }}></span>
                </span>
                <span>
                    {/* <Link to="/faq"><span><Button>Connect</Button></span></Link> */}
                </span>
            </TemplateBlock>

        </>
    );
}

const Button = styled.button`
  display: inline-block;
  color: black;
  font-size: 18px;
  margin-top: 3px;
  padding: 0.25em 1em;
  border-radius: 0px;
  border-color:gray;
`;

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



const Span = styled.span`
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
  width: 900px;
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

export default Topnav;
