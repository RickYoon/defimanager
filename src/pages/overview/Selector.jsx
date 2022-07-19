import * as Styled from "./Selector.style"
import { BsFillSafeFill, BsCurrencyBitcoin } from "react-icons/bs";
import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext} from "react";

function Selector() {

    const { selTvl,setSelTvl } = useContext(OverviewContext);
    // const data = totalchart

  return (
    <>
    <Styled.Container>
        <Styled.Item primary={selTvl} onClick={() => setSelTvl(true)} style={{ cursor: "pointer" }}>
            <BsFillSafeFill style={{ verticalAlign: "top" }} size="17" />
            <span style={{ fontSize: "20px" }}>{" "}TVL</span>
        </Styled.Item>
        <Styled.Item primary={!selTvl} onClick={() => setSelTvl(false)} style={{ cursor: "pointer" }}>
            <BsCurrencyBitcoin style={{ verticalAlign: "top" }} size="20" />
            <span style={{ fontSize: "18px" }}>TOKEN</span>
        </Styled.Item>
    </Styled.Container>

    </>
  );
}


export default Selector;
  