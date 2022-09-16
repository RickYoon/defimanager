import * as Styled from "./TvlTable.style"
import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext} from "react";
import icons from "../../assets/tokenIcons"
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip"
import styled from "styled-components";
import Msbox from "./Msbox";
import MsboxUSD from "./MsboxUSD"
import FloorPriceBox from "./FloorPriceBox"
import FloorPriceBoxUSD from "./FloorPriceBoxUSD"
import { NftviewContext } from "../../components/context/NftviewContext"

function TvlTable(props) {

  const { nftdata, currency, setCurrency, totaldata } = useContext(NftviewContext);
  const changeCurrenecy = (ref) => {
    // console.log("clicked!", ref)
    setCurrency(ref)
  }
  // console.log("totaldata",totaldata)

  return (
    <Styled.TodoTemplateBlock>
        <div style={{textAlign:"left", marginTop:"10px", marginRight:"20px", fontSize:"17px"}}>
        <span>Project List &nbsp; &nbsp; &nbsp; &nbsp; </span>
        <span style={{fontSize:"13px"}}>
          { currency === "KLAY" ? 
              <span><span style={{color: "blue", textDecoration:"underline"}}>KLAY</span> | <span style={{cursor: "pointer"}} onClick={() => changeCurrenecy("USD")} >USD</span> </span>:
              <span><span style={{cursor: "pointer"}} onClick={() => changeCurrenecy("KLAY")} >KLAY</span> | <span style={{color: "blue", textDecoration:"underline"}}>USD</span> </span>          
          }
          </span>
        </div>
        <div className="tablecss" style={{ margin: "10px" }}>
      <Styled.Table>
        <thead>
          <Styled.TrHead>
            <Styled.Th style={{fontSize:"13px"}} >#</Styled.Th>
            <Styled.Tdpd style={{fontSize:"13px"}} >Collection</Styled.Tdpd>
            <Styled.Td textAlign="right" style={{fontSize:"13px"}}>
                <span>Floor Price</span>
            </Styled.Td>
            <Styled.Tdc textAlign="right" style={{fontSize:"13px"}}>Volume Share</Styled.Tdc>
            <Styled.Td textAlign="right" width="10px" style={{fontSize:"13px"}} >Volume (24h)</Styled.Td>
            {/* <Styled.Td textAlign="center" width="100px" style={{fontSize:"13px"}}>Chg</Styled.Td> */}
          </Styled.TrHead>
        </thead>
        {currency === "KLAY" ? 
            nftdata.map((data, index) => (
            <Tr key={index} style={{ height: "40px", borderBottom: "0.03em solid #D4D4D4" }}>
                  <Styled.Th className="head" style={{ textAlign: "left" }}> {index+1}
                  </Styled.Th>
                  <Styled.Tdpd className="head" style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                      {/* <Link to={`/project/${data.proj}`}> */}
                      <img src={`https://goclubhouse.s3.ap-northeast-2.amazonaws.com/klaylabs/${data.proj}.png`} alt="logo" height="25px" width="25px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                          <span style={{ padding: "7px", whiteSpace: "nowrap", paddingLeft:"10px" }}>{data.proj}</span>
                      {/* </Link> */}
                  </Styled.Tdpd>
                  <Styled.Td className="head" style={{ fontSize:"15px", color:"#3f3f3f"}}>
                    <FloorPriceBox props={data.floorPrice} linkInfo={data}/>
                  </Styled.Td>
                  <Styled.Tdc className="head" style={{ fontSize:"15px", color:"#3f3f3f"}}>
                    <Msbox props={data.marketShare} klayPrice={totaldata.klayPrice}/>
                  </Styled.Tdc>
                  <Styled.Td className="head" width="150px" textAlign="right" style={{fontSize:"15px", color:"#3f3f3f"}}>{Number(Number(data.totalVolume).toFixed(0)).toLocaleString()}</Styled.Td>
                  {/* <Styled.Td className="head" textAlign="center" style={{ width: "50px", fontSize:"12px", color:"#3f3f3f"}}>-</Styled.Td> */}
            </Tr>
            ))
            :
            nftdata.map((data, index) => (
              <Tr key={index} style={{ height: "40px", borderBottom: "0.03em solid #D4D4D4" }}>
              <Styled.Th className="head" style={{ textAlign: "left" }}> {index+1}
              </Styled.Th>
              <Styled.Tdpd className="head" style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                  {/* <Link to={`/project/${data.proj}`}> */}
                  <img src={`https://goclubhouse.s3.ap-northeast-2.amazonaws.com/klaylabs/${data.proj}.png`} alt="logo" height="25px" width="25px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                      <span style={{ padding: "7px", whiteSpace: "nowrap", paddingLeft:"10px" }}>{data.proj}</span>
                  {/* </Link> */}
              </Styled.Tdpd>
              <Styled.Td className="head" style={{ fontSize:"15px", color:"#3f3f3f"}}>
                <FloorPriceBoxUSD props={data.floorPrice} klayPrice={totaldata.klayPrice}/>
              </Styled.Td>
              <Styled.Tdc className="head" style={{ fontSize:"15px", color:"#3f3f3f"}}>
                <MsboxUSD props={data.marketShare} klayPrice={totaldata.klayPrice}/>
              </Styled.Tdc>
              <Styled.Td className="head" width="150px" textAlign="right" style={{fontSize:"15px", color:"#3f3f3f"}}>{Number(Number(totaldata.klayPrice * data.totalVolume).toFixed(0)).toLocaleString()}</Styled.Td>
              {/* <Styled.Td className="head" textAlign="center" style={{ width: "50px", fontSize:"12px", color:"#3f3f3f"}}>-</Styled.Td> */}
            </Tr>
            ))
            }
      </Styled.Table>
      </div>
  </Styled.TodoTemplateBlock>
  );
}

const Tr = styled.tr`
height : 40px;
line-height: 40px;
  &:hover {
    height : 40px;
    background-color: #E8E8E8;
    border-radius:10px;
    line-height: 40px;
  }
`

export default TvlTable;
  



