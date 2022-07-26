import React, { useEffect, useState,useContext } from 'react';
import { useParams, Link, useLocation } from "react-router-dom";
import icons from "../../../assets/tokenIcons"
import { DetailContext } from 'components/context/DetailContext';
import * as Styled from "./InfoBox.style"
import styled from "styled-components";


function InfoBox() {

  const { detailinfo,isloading } = useContext(DetailContext);
  const skeletonArray = ['','','']

  return (
    <>
      <Styled.Topdash>
          <Styled.UpperColumn>
              Project Description
          </Styled.UpperColumn>
          <Styled.LowerColumn>
              {isloading ? 
                skeletonArray.map((arr)=>
                   <Styled.ProjectBox>
                       <tr>
                            <th style={{width:"30px"}}><Styled.ProductSkeleton /></th>
                            <td style={{width:"45px"}}><Styled.IconSkeleton /></td>
                            <td style={{width:"90px"}}><Styled.ProductSkeleton style={{width:"80%"}} /></td>
                            <td style={{width:"60px", fontSize:"13px", textAlign:"center", color:"red"}}><Styled.ProductSkeleton /></td>
                            <td style={{width:"60px", fontSize:"12px", paddingLeft:"5px", textAlign:"center"}}><Styled.ProductSkeleton /></td>
                       </tr>
                    </Styled.ProjectBox>    
                    )          
              :
              <>
              <Styled.ProjectBox>
                  <Tr>
                      <Td style={{width:"80px"}}>
                        Category
                      </Td>
                      <Td width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
                        AMM-Based DEX
                      </Td>
                  </Tr>
              </Styled.ProjectBox>
              <Styled.ProjectBox>
                <Tr>
                <Td style={{width:"80px"}}>
                      Token (s)
                    </Td>
                    <Td width="200px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
                      KSP
                    </Td>
                </Tr>
              </Styled.ProjectBox>
              <Styled.ProjectBox>
                <Tr>
                <Td style={{width:"80px"}}>
                      Team
                    </Td>
                    <Td width="200px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
                      ozys
                    </Td>
                </Tr>
              </Styled.ProjectBox>
              <Styled.ProjectBox>
                <Tr>
                <Td style={{width:"80px"}}>
                      Audit
                    </Td>
                    <Td width="200px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
                      YES (Haechi Labs, Theori, CERTIK)
                    </Td>
                </Tr>
              </Styled.ProjectBox>
              <Styled.ProjectBox>
                <Tr>
                    <Td style={{width:"80px"}}>
                      Links
                    </Td>
                    <Td width="200px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
                      <Styled.Img src={icons["Klayswap"]} alt="logo" height="15px" width="15px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> Homepage
                    </Td>
                </Tr>
              </Styled.ProjectBox>
              <Styled.ProjectBox>
                <Tr>
                <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
                      <Styled.Img src={icons["Klayswap"]} alt="logo" height="15px" width="15px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> Docs
                    </Td>
                </Tr>
              </Styled.ProjectBox>
              <Styled.ProjectBox>
                <Tr>
                <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
                      <Styled.Img src={icons["Klayswap"]} alt="logo" height="15px" width="15px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> Twitter
                    </Td>
                </Tr>
              </Styled.ProjectBox>
              <Styled.ProjectBox>
                <Tr>
                <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
                      <Styled.Img src={icons["Klayswap"]} alt="logo" height="15px" width="15px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> Medium
                    </Td>
                </Tr>
              </Styled.ProjectBox>
              <Styled.ProjectBox>
                <Tr>
                <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
                      <Styled.Img src={icons["Klayswap"]} alt="logo" height="15px" width="15px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> Telegram
                    </Td>
                </Tr>
              </Styled.ProjectBox>
              
            </>          
          }
          </Styled.LowerColumn>
      </Styled.Topdash>
    </>
  );
}


const Tr = styled.tr`
height : 20px;
line-height: 20px;
`



const Td = styled.td`
  /* height:25px; */
  vertical-align:middle;
  padding-left: 1em;
  font-size: 12px;
  width: ${props => props.width || "30px"};
  @media screen and (max-width: 500px){
    height:30px;
    }
`

const Tdp = styled.td`
  /* height:25px; */
  width: ${props => props.width || "30px"};
  vertical-align:middle;
  padding-left: 1em;
  &:hover {
    text-decoration: underline;
  };
`


export default InfoBox;




