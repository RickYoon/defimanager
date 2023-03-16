import React, {useContext} from "react";
import * as Styled from "./TopNumbercard.style"
import { OverviewContext } from 'components/context/OverviewContext';

function TopNumbercard() {

  const { tvldata,lastdiff, isloading } = useContext(OverviewContext);
  console.log("ddd : ", tvldata.total)
  // console.log("tvldata : ", tvldata.total.difftwo)
  
  return (
    <>
      <Styled.Topdash>
        <Styled.Row>
          <Styled.Leftcolumn>
            <Styled.Topcard>
              <Styled.Containersub>
                  <Styled.Lefttext> Total Value Locked (USD) </Styled.Lefttext>
                  {isloading ? 
                    <Styled.Righttext style={{width: "70px", float:"right"}}><Styled.ProductSkeleton /></Styled.Righttext> : 
                    <Styled.Righttext color="#316395">
                      <TransBillion data={tvldata.total}/>
                    </Styled.Righttext>
                  }
              </Styled.Containersub>
            </Styled.Topcard>
          </Styled.Leftcolumn>
          <Styled.Rightcolumn>
            <Styled.Topcard>
              <Styled.Containersub>
                  <Styled.Lefttext> Change (24h) </Styled.Lefttext>
                  {isloading ? 
                    <Styled.Righttext style={{width: "70px", float:"right"}}><Styled.ProductSkeleton /></Styled.Righttext> : 
                    tvldata.total.difftwo > 0 ? 
                    <Styled.Righttext color="red">+{lastdiff}%</Styled.Righttext> :
                    <Styled.Righttext color="blue">{lastdiff}%</Styled.Righttext> 
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
      {props.data > 1000000 ?
        <span> ${(props.data / 1000000).toFixed(2)}M</span> :
        <span> - </span>
      }
    </>
  )
}  


  
export default TopNumbercard;
  