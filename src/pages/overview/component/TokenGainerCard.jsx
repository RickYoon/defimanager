import React from "react";
import * as Styled from "./TokenGainerCard.style"
import icons from "../../../assets/tokenIcons"
import { Link } from "react-router-dom";
import styled from "styled-components";


function TokenGainerCard(props) {

  console.log("props",props.data)
  console.log("props",props.isLoading)
  const skeletonArray = ['','','']

  return (
    <>
      <Styled.Topdash>
      <Styled.UpperColumn>
              Top Gainer Tokens
              <Styled.Righttext> 1day / 7days  </Styled.Righttext>
          </Styled.UpperColumn>
          <Styled.LowerColumn>
          {props.isLoading ? 
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
              props.data.map((TopTokenElement,index) => 

                        <Styled.ProjectBox>
                            <Tr>
                                <Td>{index+1}</Td>
                                <Td>{TopTokenElement.token === "KAI" || TopTokenElement.token === "AKAI"?
                                     <Styled.Img src={icons[TopTokenElement.project]} alt="logo" height="30px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> :
                                     <Styled.Img src={icons[TopTokenElement.token]} alt="logo" height="30px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                    }
                                </Td>
                                <Tdp width="100px">
                                    <Link to={`/project/${TopTokenElement.project}`}>
                                        {TopTokenElement.token}
                                    </Link>
                                </Tdp>
                                <Td width="70px" style={{fontSize:"12px", color:"red"}}>
                                    {(TopTokenElement.priceDiff)} %
                                </Td>
                                {TopTokenElement.sevenPriceDiff === 0 ? 
                                <Td width="70px" style={{fontSize:"12px"}}>
                                new</Td>
                                :
                                <Td width="70px" style={{fontSize:"12px"}}>
                                     {(TopTokenElement.sevenPriceDiff)} %</Td>
                                }
                            </Tr>
                        </Styled.ProjectBox>
                        
                )}
          </Styled.LowerColumn>
      </Styled.Topdash>
    </>
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

const Td = styled.td`

  vertical-align:middle;
  padding-left: 1em;
  width: ${props => props.width || "30px"};

  @media screen and (max-width: 500px){
    height:30px;
    }
`

const Tdp = styled.td`
  width: ${props => props.width || "30px"};
  vertical-align:middle;
  padding-left: 1em;
  &:hover {
    text-decoration: underline;
  };


`


export default TokenGainerCard;
  