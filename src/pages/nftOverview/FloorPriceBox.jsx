import React, {useContext} from "react";
import { PoolContext } from 'components/context/PoolContext';
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip"
import styled, { keyframes } from "styled-components";
import icons from "../../assets/tokenIcons"
import opensea from "../../assets/CI/opensea.svg"
import pala from "../../assets/CI/pala.png"

function FloorPriceBox(props) {

  // console.log("props", props)
  return (
    <>
        <Explainbox>
            <Token>
              <Span onClick={()=>window.open(`https://opensea.io/collection/${props.linkInfo.proj}`)}>{props.props.opensea.toLocaleString()}
                <img src={opensea} alt="logo" height="15px" width="15px" style={{marginLeft:"5px",verticalAlign:"middle"}}/>
              </Span>
              
            </Token>
            <Token>
            <Span onClick={()=>window.open(`https://pala.world/square/project/${props.linkInfo.contract}`)}>{props.props.pala.toLocaleString()}
                <img src={pala} alt="logo" height="15px" width="15px" style={{marginLeft:"5px",verticalAlign:"middle"}}/>
              </Span>
            </Token>
        </Explainbox>


    </>
  );
}

const Span = styled.div`
cursor: pointer;
height : 30px;
line-height: 20px;
font-size: 14px;
  &:hover {
    height : 30px;
    line-height: 20px;
    text-decoration:underline;
    color: blue;
  }
`


const Explainbox = styled.div`
  display : flex;
  flex-direction : column;
`

const Protocol = styled.div`
  padding-left: 15px;
  text-decoration: underline;
  font-size: 12px;
  height: 20px;
`

const Token = styled.div`
    /* padding-left: 15px; */
    color: #657795;
    font-size: 12px;
    text-align: right;
    height: 20px;
`








export default FloorPriceBox;
