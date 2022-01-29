import styled from 'styled-components';
import { BiBook } from "react-icons/bi";
import React from 'react';

function Topnav() {
    const moveNotion = () => {
        window.location.href = "https://rebrand.ly/uqqlzva"
    }
    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }
    return (
        <>
            <TemplateBlock>
                <span onClick={moveMain} style={{ cursor: "pointer" }}>KlayLabs.net<span style={{
                    marginLeft: "5px", fontSize: "15px", fontStyle: "oblique"
                }}>- Beta.</span></span>
                <span onClick={moveNotion} style={{ cursor: "pointer" }
                } > <BiBook /></span>
            </TemplateBlock>
        </>
    );
}

const TemplateBlock = styled.div`
          width: 780px;
          max-height: 768px;
        
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

export default Topnav;
