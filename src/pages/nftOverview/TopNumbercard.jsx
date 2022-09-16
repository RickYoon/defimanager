import React, {useContext} from "react";
import * as Styled from "./TopNumbercard.style"
import { NftviewContext } from "../../components/context/NftviewContext"

function TopNumbercard() {

  const { totaldata } = useContext(NftviewContext);
  const isloading = false;

  return (
    <>
      <Styled.Topdash>
        <Styled.Row>
          <Styled.Leftcolumn>
            <Styled.Topcard>
              <Styled.Containersub>
                  <Styled.Lefttext> Total Trading Volume (24h) </Styled.Lefttext>
                  {isloading ? 
                    <Styled.Righttext style={{width: "70px", float:"right"}}><Styled.ProductSkeleton /></Styled.Righttext> : 
                    <Styled.Righttext color="#316395"><TransBillion data={totaldata.totalUSD}/></Styled.Righttext>
                  }
              </Styled.Containersub>
            </Styled.Topcard>
          </Styled.Leftcolumn>
          <Styled.Rightcolumn>
            <Styled.Topcard>
              <Styled.Containersub>
                  <Styled.Lefttext> Opensea Dominance </Styled.Lefttext>
                  {isloading ? 
                    <Styled.Righttext style={{width: "70px", float:"right"}}><Styled.ProductSkeleton /></Styled.Righttext> : 
                    <Styled.Righttext color="#316395">{totaldata.openseaShare}%</Styled.Righttext> 
                  }
              </Styled.Containersub>
            </Styled.Topcard>
          </Styled.Rightcolumn>
        </Styled.Row>
      </Styled.Topdash>
    </>
  );
}

const TransBillion = (props) => {

  return (
    <>
        <span> $ {Number((props.data).toFixed(2)).toLocaleString()}</span>
    </>
  )
}  


  
export default TopNumbercard;
  