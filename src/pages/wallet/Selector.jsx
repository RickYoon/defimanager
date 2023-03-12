import * as Styled from "./Selector.style"
import { BsFillSafeFill, BsCurrencyBitcoin } from "react-icons/bs";
import { WalletContext } from "components/context/WalletContext"
import React, {useContext} from "react";

function Selector() {

  const { isAsset, setIsAsset } = useContext(WalletContext);

  function changeStateHandler () {
    setIsAsset(!isAsset)
  }

  return (
    <>
    {isAsset ?
    <Styled.Container>
        <Styled.Item primary={true} style={{ cursor: "pointer" }}>
            <span style={{ fontSize: "15px" }}>{" "}Asset</span>
        </Styled.Item>
        <Styled.Item primary={false} style={{ cursor: "pointer" }} onClick={changeStateHandler}>
            <span style={{ fontSize: "15px" }}>History</span>
        </Styled.Item>
    </Styled.Container>
    :
    <Styled.Container>
      <Styled.Item primary={false} style={{ cursor: "pointer" }} onClick={changeStateHandler}>
          <span style={{ fontSize: "15px" }}>{" "}Asset</span>
      </Styled.Item>
      <Styled.Item primary={true} style={{ cursor: "pointer" }}>
          <span style={{ fontSize: "15px" }}>History</span>
      </Styled.Item>
    </Styled.Container>
    }
    </>
  );
}


export default Selector;
  