import React, {useContext} from "react";
import { PoolContext } from 'components/context/PoolContext';
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip"
import styled, { keyframes } from "styled-components";
import icons from "../../assets/tokenIcons"
import opensea from "../../assets/CI/opensea.svg"
import pala from "../../assets/CI/pala.png"

function FloorPriceBoxUSD(props) {

  // console.log("props", props)
  return (
    <>
        <Explainbox style={{fontSize:"13px"}}>
            <Token>
            {/* {props.props.opensea.toLocaleString()}  */}
            {(Number((Number(props.klayPrice) * Number(props.props.opensea)).toFixed(0))).toLocaleString()}

            <img src={opensea} alt="logo" height="13px" width="13px" style={{marginLeft:"5px",verticalAlign:"middle"}}/>
            </Token>
            <Token>
            {(Number((Number(props.klayPrice) * Number(props.props.pala)).toFixed(0))).toLocaleString()}
            <img src={pala} alt="logo" height="13px" width="13px" style={{marginLeft:"5px",verticalAlign:"middle"}}/> 
            </Token>
        </Explainbox>


    </>
  );
}


const Explainbox = styled.div`
  display : flex;
  flex-direction : column;
  height: 60px;
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








export default FloorPriceBoxUSD;
