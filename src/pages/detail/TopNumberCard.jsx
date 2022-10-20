import React, {useContext} from "react";
import * as Styled from "./TopNumberCard.style"
import { DetailContext } from 'components/context/DetailContext';
import { ImArrowUp2,ImArrowDown2 } from "react-icons/im";

function TopNumbercard() {

  const { detailinfo,isloading } = useContext(DetailContext);
  
  return (
    <>
      <Styled.Topdash>
        <Styled.Row>
          <Styled.Leftcolumn>
            <Styled.Topcard>
              <Styled.Containersub>
                  <Styled.Lefttext> Total Value Locked (USD) </Styled.Lefttext>
                    {isloading ? 
                        <Styled.Righttext> <Styled.ProductSkeleton style={{width:"70px"}}/> </Styled.Righttext> :
                        <Styled.Righttext color="#316395"> {detailinfo.lastTvl.toLocaleString()} </Styled.Righttext>
                    }
              </Styled.Containersub>
            </Styled.Topcard>
          </Styled.Leftcolumn>
          <Styled.Rightcolumn>
            <Styled.Topcard>
              <Styled.Containersub>
                  <Styled.Lefttext> Change (24h) </Styled.Lefttext>
                    {isloading ? 
                        <Styled.Righttext> <Styled.ProductSkeleton style={{width:"70px"}}/> %</Styled.Righttext> :
                        <ChangeOneDay value={detailinfo.oneDayChangeValue} percent={detailinfo.oneDayChangePercent}/>
                    }
              </Styled.Containersub>
            </Styled.Topcard>
          </Styled.Rightcolumn>
        </Styled.Row>
      </Styled.Topdash>
    </>
  );
}

function ChangeOneDay(props) {

      return (
          <>
          {
            props.value > 0 ?
            <Styled.Righttext color="red"><ImArrowUp2 style={{height:"15px"}} /> {Math.abs(Number(Number(props.value).toFixed(0))).toLocaleString()} ( {props.percent.toFixed(2)}% )</Styled.Righttext> :
            props.value < 0 ?
            <Styled.Righttext> <ImArrowDown2 style={{height:"15px"}} /> {Math.abs(Number(Number(props.value).toFixed(0))).toLocaleString()} ({Math.abs(props.percent).toFixed(1)}%)</Styled.Righttext> :
            <Styled.Righttext> - </Styled.Righttext>
          }
          </>
      );
}
  
export default TopNumbercard;
  