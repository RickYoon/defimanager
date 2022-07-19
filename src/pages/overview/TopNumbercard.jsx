import React, {useContext} from "react";
import * as Styled from "./TopNumbercard.style"
import { OverviewContext } from 'components/context/OverviewContext';

function TopNumbercard() {

  const { tvldata,isloading } = useContext(OverviewContext);
  // console.log("tvldata : ", tvldata.total.tvl)
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
                    <Styled.Righttext color="#316395"><TransBillion data={tvldata.total.tvl}/></Styled.Righttext>
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
                    <Styled.Righttext color="red">+{tvldata.total.difftwo}%</Styled.Righttext> :
                    <Styled.Righttext color="blue">{tvldata.total.difftwo}%</Styled.Righttext> 
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
      {props.data > 10000000 ?
        <span> ${(props.data / 1000000000).toFixed(2)}B</span> :
        <span> - </span>
      }
    </>
  )
}  


  
export default TopNumbercard;
  