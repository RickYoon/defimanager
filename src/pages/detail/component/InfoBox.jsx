import React, { useEffect, useState,useContext } from 'react';
import { useParams, Link, useLocation } from "react-router-dom";
import icons from "../../../assets/tokenIcons"
import { DetailContext } from 'components/context/DetailContext';
import * as Styled from "./InfoBox.style"
import styled from "styled-components";
import { ImArrowUpRight2 } from "react-icons/im";
import {AiFillHome} from "react-icons/ai";
import { FaTelegramPlane,FaMedium,FaTwitter,FaFileAlt} from "react-icons/fa";
import { SiDiscord} from "react-icons/si";


// SiDiscord
function InfoBox() {

  const { detailinfo,isloading } = useContext(DetailContext);

  return (
    <>
      <Styled.Topdash>
          <Styled.UpperColumn>
              Project Description
          </Styled.UpperColumn>
          <Styled.LowerColumn>
              {isloading ? 
              <><SkeletonWaiting /></>
              :
              <>
                <Styled.ProjectBox>
                  <Tr>
                      <Td style={{width:"80px"}}>
                        Category
                      </Td>
                      <Td width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap"}}>
                        {detailinfo.proj.category}
                      </Td>
                  </Tr>
                </Styled.ProjectBox>              
                {detailinfo.proj.tokensymbol === "multiToken" ?
                    <>
                    <Styled.ProjectBox>
                      <Tr>
                        <Td style={{width:"80px"}}>
                          Token (s)
                        </Td>
                        <Tdlink width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
                          {detailinfo.proj.tokensymbolOne} 
                          <Span onClick={()=>window.open(`https://scope.klaytn.com/account/${detailinfo.proj.tokenContractAddressOne}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                          {"   "}klaytnscope <ImArrowUpRight2 /></Span>
                        </Tdlink>
                      </Tr>
                    </Styled.ProjectBox>                
                    <Styled.ProjectBox>
                    <Tr>
                      <Td style={{width:"80px"}}>
                      </Td>
                      <Tdlink width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
                        {detailinfo.proj.tokensymbolTwo} 
                        <Span onClick={()=>window.open(`https://scope.klaytn.com/account/${detailinfo.proj.tokenContractAddressTwo}`, "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                        {"   "}klaytnscope <ImArrowUpRight2 /></Span>
                      </Tdlink>
                    </Tr>
                  </Styled.ProjectBox>    
                  </>       
                :
                detailinfo.proj.tokensymbol === "WEMIX" ?
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Token (s)
                    </Td>
                    <Tdlink width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
                      {detailinfo.proj.tokensymbol} 
                      <Span onClick={()=>window.open(`https://explorer.wemix.com/token/${detailinfo.proj.tokenContractAddress}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                      {"   "}WemixExplorer <ImArrowUpRight2 /></Span>
                    </Tdlink>
                  </Tr>
                </Styled.ProjectBox>                
                :
                detailinfo.proj.tokensymbol === "MESH" ?
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Token (s)
                    </Td>
                    <Tdlink width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
                      {detailinfo.proj.tokensymbol} 
                      <Span onClick={()=>window.open(`https://polygonscan.com/token/${detailinfo.proj.tokenContractAddress}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                      {"   "}polygonscan <ImArrowUpRight2 /></Span>
                    </Tdlink>
                  </Tr>
                </Styled.ProjectBox>                
                :   
                detailinfo.proj.tokensymbol === "-" ?
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Token (s)
                    </Td>
                    <Tdlink width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
                      {detailinfo.proj.tokensymbol} 
                    </Tdlink>
                  </Tr>
                </Styled.ProjectBox>                
                :
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Token (s)
                    </Td>
                    <Tdlink width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
                      {detailinfo.proj.tokensymbol} 
                      <Span onClick={()=>window.open(`https://scope.klaytn.com/account/${detailinfo.proj.tokenContractAddress}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                      {"   "}klaytnscope <ImArrowUpRight2 /></Span>
                    </Tdlink>
                  </Tr>
                </Styled.ProjectBox>
              }
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Team
                    </Td>
                    <Td width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
                      {detailinfo.proj.team} 
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Audit
                    </Td>
                    <Td width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
                       {detailinfo.proj.audit}
                       {detailinfo.proj.audit === "Yes" ? 
                       <Span onClick={()=>window.open(`${detailinfo.proj.auditDetail}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                        {"   "}report <ImArrowUpRight2 /></Span>
                        :
                        <></>
                        }
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Investor
                    </Td>
                    <Td width="200px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
                      {detailinfo.proj.investor} 
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Links
                    </Td>
                    <Td width="200px" style={{fontSize:"13px", color:"#316395" }}>
                      <AiFillHome style={{height:"16px",verticalAlign:"top",cursor: "pointer"}}/> 
                      <Links style={{marginLeft:"5px"}} onClick={()=>window.open(`https://${detailinfo.proj.homeUrl}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                      {detailinfo.proj.homeUrl}</Links>  
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>                      
                    </Td>
                    {detailinfo.proj.docsUrl === "long" ?
                      <Td width="200px" style={{fontSize:"13px", color:"#316395" }}>
                        <FaFileAlt style={{height:"16px",verticalAlign:"top",cursor: "pointer"}}/> 
                        <Links style={{marginLeft:"5px"}} onClick={()=>window.open(`${detailinfo.proj.docsUrlReal}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                        documents</Links>
                      </Td> :
                      <Td width="200px" style={{fontSize:"13px", color:"#316395" }}>
                        <FaFileAlt style={{height:"16px",verticalAlign:"top",cursor: "pointer"}}/> 
                        <Links style={{marginLeft:"5px"}} onClick={()=>window.open(`https://${detailinfo.proj.docsUrl}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                        {detailinfo.proj.docsUrl}</Links>
                      </Td>
                    }
                  </Tr>
                </Styled.ProjectBox>
                {detailinfo.proj.twitterUrl === "-" ?
                <></>
                :
                <Styled.ProjectBox>
                <Tr>
                  <Td style={{width:"80px"}}>                      
                  </Td>
                  <Td width="200px" style={{fontSize:"13px", color:"#316395" }}>
                    <FaTwitter style={{height:"16px",verticalAlign:"top"}}/> 
                    <Links style={{marginLeft:"5px"}} onClick={()=>window.open(`https://twitter.com/${detailinfo.proj.twitterUrl}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                    {detailinfo.proj.twitterUrl}</Links>
                  </Td>
                </Tr>
              </Styled.ProjectBox>
                }
                {detailinfo.proj.mediumUrl === "-" ?
                <></>
                :
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"13px", color:"#316395" }}>
                      <FaMedium style={{height:"16px",verticalAlign:"top"}}/> 
                      <Links style={{marginLeft:"5px"}} onClick={()=>window.open(`https://medium.com/${detailinfo.proj.mediumUrl}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                      {detailinfo.proj.mediumUrl}</Links>
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                }
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"13px", color:"#316395" }}>
                      <FaTelegramPlane style={{height:"20px",verticalAlign:"top"}}/>
                      <Links style={{marginLeft:"5px"}} onClick={()=>window.open(`https://t.me/${detailinfo.proj.telegramUrl}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                      {detailinfo.proj.telegramUrl}</Links>
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>                      
                    </Td>
                    {detailinfo.proj.discordUrl === "-" ? 
                    <Td width="200px" style={{fontSize:"13px", color:"gray" }}>
                      <SiDiscord style={{height:"20px",verticalAlign:"top"}}/>
                      <span style={{marginLeft:"5px"}}>
                      discord.gg</span>
                    </Td>
                    :
                    <Td width="200px" style={{fontSize:"13px", color:"#316395" }}>
                      <SiDiscord style={{height:"20px",verticalAlign:"top"}}/>
                      <Links style={{marginLeft:"5px"}} onClick={()=>window.open(`https://discord.com/invite/${detailinfo.proj.discordUrl}`, "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                      discord.gg</Links>
                    </Td>
                    }
                  </Tr>
                </Styled.ProjectBox>              
              </>          
          }
          </Styled.LowerColumn>
      </Styled.Topdash>
    </>
  );
}

const SkeletonWaiting = () =>{
  return (
    <>
      <Styled.ProjectBox>
        <Tr>
            <Td style={{width:"80px"}}>
              Category
            </Td>
            <Td width="180px" style={{fontSize:"13px", color:"#316395", whiteSpace: "nowrap" }}>
              <Styled.ProductSkeleton />
            </Td>
        </Tr>
      </Styled.ProjectBox>
      <Styled.ProjectBox>
        <Tr>
          <Td style={{width:"80px"}}>
            Token (s)
          </Td>
          <Td width="180px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
            <Styled.ProductSkeleton />
          </Td>
        </Tr>
      </Styled.ProjectBox>
      <Styled.ProjectBox>
        <Tr>
          <Td style={{width:"80px"}}>
            Team
          </Td>
          <Td width="180px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
            <Styled.ProductSkeleton />
          </Td>
        </Tr>
      </Styled.ProjectBox>
      <Styled.ProjectBox>
        <Tr>
          <Td style={{width:"80px"}}>
            Audit
          </Td>
          <Td width="180px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
            <Styled.ProductSkeleton />
          </Td>
        </Tr>
      </Styled.ProjectBox>
      <Styled.ProjectBox>
        <Tr>
          <Td style={{width:"80px"}}>
            Investor
          </Td>
          <Td width="180px" style={{fontSize:"12px", color:"#316395", whiteSpace: "nowrap" }}>
            <Styled.ProductSkeleton />
          </Td>
        </Tr>
      </Styled.ProjectBox>
      <Styled.ProjectBox>
        <Tr>
          <Td style={{width:"80px"}}>
            Links
          </Td>
          <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
            <AiFillHome style={{height:"16px",verticalAlign:"top"}}/> <span><Styled.ProductSkeleton width="80%"/></span>
          </Td>
        </Tr>
      </Styled.ProjectBox>
      <Styled.ProjectBox>
        <Tr>
          <Td style={{width:"80px"}}>                      
          </Td>
          <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
            <FaFileAlt style={{height:"16px",verticalAlign:"top"}}/> <span><Styled.ProductSkeleton width="80%"/></span>
          </Td>
        </Tr>
      </Styled.ProjectBox>
      <Styled.ProjectBox>
        <Tr>
          <Td style={{width:"80px"}}>                      
          </Td>
          <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
            <FaTwitter style={{height:"16px",verticalAlign:"top"}}/> <span><Styled.ProductSkeleton width="80%"/></span>
          </Td>
        </Tr>
      </Styled.ProjectBox>
      <Styled.ProjectBox>
        <Tr>
          <Td style={{width:"80px"}}>                      
          </Td>
          <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
            <FaMedium style={{height:"16px",verticalAlign:"top"}}/> <span><Styled.ProductSkeleton width="80%"/></span>
          </Td>
        </Tr>
      </Styled.ProjectBox>
      <Styled.ProjectBox>
        <Tr>
          <Td style={{width:"80px"}}>                      
          </Td>
          <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
            <FaTelegramPlane style={{height:"16px",verticalAlign:"top"}}/> <span><Styled.ProductSkeleton width="80%"/></span>
          </Td>
        </Tr>
      </Styled.ProjectBox>
    </>  
  )
}

const Links = styled.span`
  &:hover {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  };
`


const Tr = styled.tr`
height : 20px;
line-height: 20px;
`



const Td = styled.td`
  /* height:25px; */
  font-family: "OpenSans-Medium";
  vertical-align:middle;
  padding-left: 1em;
  font-size: 13px;
  width: ${props => props.width || "30px"};

  @media screen and (max-width: 500px){
    height:30px;
    }
`

const Tdlink = styled.td`
  /* height:25px; */
  font-family: "OpenSans-Medium";
  vertical-align:middle;
  padding-left: 1em;
  font-size: 13px;
  width: ${props => props.width || "30px"};

  @media screen and (max-width: 500px){
    width: 230px; 
  }
`


const Span = styled.span`
  color: gray;
  cursor: pointer;
  float: right;

  &:hover {
    color: blue;
    text-decoration: underline;
  };
`


export default InfoBox;




