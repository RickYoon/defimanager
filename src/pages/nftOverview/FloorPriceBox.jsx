import React, {useContext} from "react";
import { PoolContext } from 'components/context/PoolContext';
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip"
import styled, { keyframes } from "styled-components";
import icons from "../../assets/tokenIcons"

function FloorPriceBox(props) {

  console.log("props", props)
  return (
    <>
        <Explainbox>
            <Token>
            O : {props.props.opensea}
            </Token>
            <Token>
            P : {props.props.pala}
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
    text-align: left;
    height: 20px;
    text-align: center;
`





export default FloorPriceBox;
