import * as Styled from "./TvlTable.style"
import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext} from "react";
import icons from "../../assets/tokenIcons"
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip"
import styled from "styled-components";
import Msbox from "./Msbox";
import FloorPriceBox from "./FloorPriceBox"
import { NftviewContext } from "../../components/context/NftviewContext"

function TvlTable(props) {

  const { nftdata } = useContext(NftviewContext);
  console.log("nftdata",nftdata)

  return (
    <Styled.TodoTemplateBlock>
        <div className="tablecss" style={{ margin: "20px" }}>
      <Styled.Table>
        <thead>
          <Styled.TrHead>
            <Styled.Th>#</Styled.Th>
            <Styled.Tdp>Collection</Styled.Tdp>
            <Styled.Td textAlign="right" width="150px" style={{fontSize:"13px"}} >24h Volume</Styled.Td>
            <Styled.Td textAlign="center" width="100px" style={{fontSize:"13px"}}>Chg</Styled.Td>
            <Styled.Tdc textAlign="right" width="200px" style={{fontSize:"13px"}}>Market Share</Styled.Tdc>
            <Styled.Td textAlign="right" width="200px" style={{fontSize:"13px"}}>Floor Price</Styled.Td>
          </Styled.TrHead>
        </thead>
        {nftdata.map((data, index) => (
          <Tr key={index} style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4" }}>
                <Styled.Th className="head" style={{ width: "50px", textAlign: "left" }}> {index+1}
                </Styled.Th>
                <Styled.Tdpd className="head" style={{ width: "30px", textAlign: "left", whiteSpace: "nowrap" }}>
                    {/* <Link to={`/project/${data.proj}`}> */}
                        <img src={`https://dwckk6v6uouee.cloudfront.net/project/${data.contract}/logo.png`} alt="logo" height="25px" width="25px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                        <span style={{ padding: "7px", whiteSpace: "nowrap", paddingLeft:"10px" }}>{data.proj}</span>
                    {/* </Link> */}
                </Styled.Tdpd>
                <Styled.Td className="head" textAlign="right" style={{width: "100px", fontSize:"13px", color:"#3f3f3f"}}>{data.totalVolume.toLocaleString()}</Styled.Td>
                <Styled.Td className="head" textAlign="center" style={{ width: "50px", fontSize:"12px", color:"#3f3f3f"}}>-</Styled.Td>
                <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}>
                  <Msbox props={data.marketShare}/>
                </Styled.Tdc>
                <Styled.Td className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><FloorPriceBox props={data.floorPrice}/></Styled.Td>
          </Tr>
        ))}
        

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
  

