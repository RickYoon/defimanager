import * as Styled from "./Selector.style"
import { BsFillSafeFill, BsCurrencyBitcoin } from "react-icons/bs";
import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext} from "react";

function Selector() {

    // const { selTvl,setSelTvl } = useContext(OverviewContext);
    // const data = totalchart

  return (
    <>
    <Styled.Container>
        <Styled.Item primary={true} style={{ cursor: "pointer" }}>
            <span style={{ fontSize: "15px" }}>{" "}Asset</span>
        </Styled.Item>
        <Styled.Item primary={false} style={{ cursor: "pointer" }}>
            <span style={{ fontSize: "15px" }}>History</span>
        </Styled.Item>
    </Styled.Container>
    </>
  );
}


export default Selector;
  