import * as Styled from "./StableListTable.style"
import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";

function StableListTable() {

  const skeletonArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  // stable coin 들이 얼마나 민팅 되었는지 알고 싶다. (USDT, USDC, DAI, BUSD, KSD) crypto-backed
  // 브릿지별 스테이블 자산의 민팅 비율을 알고 싶다.
  // 
  
  return (
    <Styled.TodoTemplateBlock>
        <div className="tablecss" style={{ margin: "20px" }}>
      <Styled.Table>
        <thead>
          <Styled.TrHead>
            <Styled.Th>#</Styled.Th>
            <Styled.Tdp>Name</Styled.Tdp>
            <Styled.Tdp>Category</Styled.Tdp>
            <Styled.Td>Bridge</Styled.Td>
            <Styled.Td textAlign="right">Supply</Styled.Td>
            <Styled.Td textAlign="right">1day</Styled.Td>
            <Styled.Td textAlign="right">7days</Styled.Td>
            <Styled.Tdc textAlign="right">M/S</Styled.Tdc>
          </Styled.TrHead>
        </thead>
        <tbody>
            <tr style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4 " }}>
                 <Styled.Th className="head" style={{ width: "30px", textAlign: "left" }}>{1}</Styled.Th>
                 <Styled.Tdpd className="head" style={{ width: "30px", textAlign: "left", whiteSpace: "nowrap" }}>
                   USDT
                </Styled.Tdpd>
                <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}>fiat-backed</Styled.Tdc>
                <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}>Orbit</Styled.Tdc>
                <Styled.Tdc className="head" style={{ textAlign:"right", width: "100px", fontSize:"14px", color:"#3f3f3f"}}>323M$</Styled.Tdc>
                <Styled.Tdc className="head" style={{ textAlign:"right", width: "100px", fontSize:"14px", color:"#3f3f3f"}}>10%</Styled.Tdc>
                <Styled.Tdc className="head" style={{ textAlign:"right", width: "100px", fontSize:"14px", color:"#3f3f3f"}}>15%</Styled.Tdc>
                <Styled.Tdc className="head" style={{ textAlign:"right", width: "100px", fontSize:"14px", color:"#3f3f3f"}}>50%</Styled.Tdc>
            </tr>
            <tr style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4 " }}>
                 <Styled.Th className="head" style={{ width: "30px", textAlign: "left" }}>{1}</Styled.Th>
                 <Styled.Tdpd className="head" style={{ width: "30px", textAlign: "left", whiteSpace: "nowrap" }}>
                   USDT
                </Styled.Tdpd>
                <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}>fiat-backed</Styled.Tdc>
                <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}>Orbit</Styled.Tdc>
                <Styled.Tdc className="head" style={{ textAlign:"right", width: "100px", fontSize:"14px", color:"#3f3f3f"}}>323M$</Styled.Tdc>
                <Styled.Tdc className="head" style={{ textAlign:"right", width: "100px", fontSize:"14px", color:"#3f3f3f"}}>10%</Styled.Tdc>
                <Styled.Tdc className="head" style={{ textAlign:"right", width: "100px", fontSize:"14px", color:"#3f3f3f"}}>15%</Styled.Tdc>
                <Styled.Tdc className="head" style={{ textAlign:"right", width: "100px", fontSize:"14px", color:"#3f3f3f"}}>50%</Styled.Tdc>
            </tr>
            {/* <tr style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4 " }}>
                 <Styled.Th className="head" style={{ width: "30px", textAlign: "left" }}>{1}</Styled.Th>
                 <Styled.Tdpd className="head" style={{ width: "30px", textAlign: "left", whiteSpace: "nowrap" }}>
                     <Styled.IconSkeleton style={{ padding: "1px",borderRadius: "15px",  verticalAlign: "bottom" }}/>
                     <Styled.ProductSkeleton marginTop="10px" style={{ padding: "7px", whiteSpace: "nowrap", paddingLeft:"10px"}}/>
                </Styled.Tdpd>
                 <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><Styled.ProductSkeleton/></Styled.Tdc>
                 <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><Styled.ProductSkeleton/></Styled.Tdc>
                 <Styled.Td className="content" style={{ width: "200px", textAlign: "right" }}><Styled.ProductSkeleton/></Styled.Td>
                <Styled.Td className="content" style={{ width: "50px", textAlign: "right" }}><Styled.ProductSkeleton/></Styled.Td>
                <Styled.Td className="content" style={{ width: "100px", textAlign: "right", color: "red" }}><Styled.ProductSkeleton/>%</Styled.Td>
                <Styled.Td className="content" style={{ width: "200px", textAlign: "right", color: "red" }}><Styled.ProductSkeleton/>%</Styled.Td>
                <Styled.Tdc className="content" style={{ width: "200px", textAlign: "right" }}><Styled.ProductSkeleton/>%</Styled.Tdc>
            </tr> */}
        </tbody>
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

const DesktopFont = styled.span`
  @media screen and (max-width: 500px){
    display: none;
  }
`

const MobileFont = styled.span`
  display: none;
  @media screen and (max-width: 500px){
    display: inline;
  }
`

export default StableListTable;
  