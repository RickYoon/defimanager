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
import opensea from "../../assets/CI/opensea.svg"
import pala from "../../assets/CI/pala.png"
import { GoLinkExternal } from "react-icons/go"


function TvlTable(props) {

  const { nftdata, currency, setCurrency, totaldata,isloading } = useContext(NftviewContext);
  const changeCurrenecy = (ref) => {
    setCurrency(ref)
  }

  const skeletonArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  // const isloading = true;

  return (
    <>
    {isloading?
      <>
          <Styled.TodoTemplateBlock>

          <Styled.Table>
            <thead>
          <Styled.TrHead>
            <Styled.Th style={{fontSize:"13px"}} >#</Styled.Th>
            <Styled.Tdpd style={{fontSize:"13px"}} >Collection</Styled.Tdpd>
            <Styled.Td textAlign="right" style={{fontSize:"13px"}}>
                <span>Floor Price</span>
            </Styled.Td>
            <Styled.Tdk textAlign="right" style={{fontSize:"13px"}}>Volume Share</Styled.Tdk>
            <Styled.Tdk textAlign="right" width="10px" style={{fontSize:"13px"}} >Volume (24h)</Styled.Tdk>
            {/* <Styled.Td textAlign="center" width="100px" style={{fontSize:"13px"}}>Chg</Styled.Td> */}
          </Styled.TrHead>
        </thead>
        {skeletonArray.map((index) => (
            <Tr key={index} style={{ height: "35px", borderBottom: "0.03em solid #D4D4D4" }}>
                  <Styled.Th className="head" style={{ textAlign: "left", fontSize:"10px",marginTop: "5px" }}> 
                    <Styled.ProductSkeleton/>
                  </Styled.Th>
                  <Styled.Tdpd className="head" style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                    <Styled.IconSkeleton style={{ padding: "1px",borderRadius: "15px",marginTop: "5px"}}/>
                     <Styled.ProductSkeleton style={{whiteSpace: "nowrap", marginLeft:"10px", height:"20px"}}/>
                  </Styled.Tdpd>
                  <Styled.Td className="head" style={{ textAlign: "right", fontSize:"15px", color:"#3f3f3f"}}>
                  <Styled.ProductSkeleton/>
                  </Styled.Td>
                  <Styled.Td className="head" style={{ textAlign: "right",fontSize:"15px", color:"#3f3f3f"}}>
                  <Styled.ProductSkeleton/>
                  </Styled.Td>
                  <Styled.Td className="head" width="150px" textAlign="right" style={{fontSize:"14px", color:"#3f3f3f"}}>
                  <Styled.ProductSkeleton/>
                  </Styled.Td>
            </Tr>
            ))
          }
          </Styled.Table>
          </Styled.TodoTemplateBlock>
      </> 
    :
    <Styled.TodoTemplateBlock>
        <div style={{textAlign:"left", marginTop:"10px", marginRight:"20px", fontSize:"17px"}}>
        <span>Project List</span>
        <span style={{fontSize:"13px"}}>
          </span>
        </div>
        <div className="tablecss" style={{ margin: "10px" }}>
      <Styled.Table>
        <thead>
          <Styled.TrHead>
            <Styled.Th style={{fontSize:"13px"}} >#</Styled.Th>
            <Styled.Tdpd style={{fontSize:"13px"}} >Collection</Styled.Tdpd>
            <Styled.Td textAlign="right" style={{fontSize:"13px"}}>
                <span>Chain</span>
            </Styled.Td>
            <Styled.Tdk textAlign="right" style={{fontSize:"13px"}}>Category</Styled.Tdk>
            <Styled.Tdk textAlign="right" width="10px" style={{fontSize:"13px"}} >Created</Styled.Tdk>
            <Styled.Td textAlign="right" width="100px" style={{fontSize:"13px"}}>total Volume</Styled.Td>
          </Styled.TrHead>
        </thead>
        <Tr style={{ height: "40px", borderBottom: "0.03em solid #D4D4D4" }}>
                  <Styled.Th className="head" style={{ textAlign: "left", fontSize:"10px" }}> 1
                  </Styled.Th>
                  <Styled.Tdpd className="head" style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                    ArcheWorld_Land
                  </Styled.Tdpd>
                  <Styled.Td className="head" style={{ textAlign: "right",fontSize:"15px", color:"#3f3f3f"}}>
                    Klaytn
                  </Styled.Td>
                  <Styled.Td className="head" style={{ textAlign: "right",fontSize:"15px", color:"#3f3f3f"}}>
                    Gaming
                  </Styled.Td>
                  <Styled.Td className="head" width="150px" textAlign="right" style={{fontSize:"14px", color:"#3f3f3f"}}>
                    2023.01.28
                  </Styled.Td>
                  <Styled.Td className="head" width="150px" textAlign="right" style={{fontSize:"14px", color:"#3f3f3f"}}>
                    3,223,203
                  </Styled.Td>
            </Tr>

      </Styled.Table>
      </div>
  </Styled.TodoTemplateBlock>
  }
  </>
  )
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

const Span = styled.span`
  font-size: 13px;
  @media screen and (max-width: 500px){
    font-size: 11px;
    /* width: 150px; */
  }
`


export default TvlTable;
  