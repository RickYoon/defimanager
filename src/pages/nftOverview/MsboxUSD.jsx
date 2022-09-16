import React, {useContext} from "react";
import { PoolContext } from 'components/context/PoolContext';
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip"
import styled, { keyframes } from "styled-components";
import icons from "../../assets/tokenIcons"
import opensea from "../../assets/CI/opensea.svg"
import pala from "../../assets/CI/pala.png"

function MsboxUSD(props) {

    // console.log("아픈씨",props.props.opensea)
    // console.log("아픈씨 klay", props.klayPrice)
    // console.log("why")

  return (
    <>
        {/* {props.currency === "KLAY" ?  */}
        <Explainbox>
            <Token>
                {(Number((Number(props.klayPrice) * Number(props.props.opensea)).toFixed(0))).toLocaleString()}
                ({props.props.total === 0 ?
                    "-"
                    :
                    (props.props.opensea/props.props.total*100).toFixed(0)
                }%) <img src={opensea} alt="logo" height="13px" width="13px" style={{verticalAlign:"middle"}}/>
            </Token>
            <Token>
                {(Number((Number(props.klayPrice) * Number(props.props.pala)).toFixed(0))).toLocaleString()}
                ({props.props.total === 0 ?
                    "-"
                    :
                (props.props.pala/props.props.total*100).toFixed(0)}%) <img src={pala} alt="logo" height="13px" width="13px" style={{verticalAlign:"middle"}}/> 
            </Token>
        </Explainbox> 
        {/* : 
        <Explainbox>
        <Token>
            {(props.props.opensea * props.klayPrice).toLocaleString()} ({(props.props.opensea/props.props.total*100).toFixed(0)}%) <img src={opensea} alt="logo" height="13px" width="13px" style={{verticalAlign:"middle"}}/>
        </Token>
        <Token>
            {(props.props.pala * props.klayPrice).toLocaleString()} ({(props.props.pala/props.props.total*100).toFixed(0)}%) <img src={pala} alt="logo" height="13px" width="13px" style={{verticalAlign:"middle"}}/> 
        </Token>
    </Explainbox>  */}
    {/* } */}

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





export default MsboxUSD;
