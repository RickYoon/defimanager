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
                      <Td width="200px" style={{fontSize:"14px", color:"#316395", whiteSpace: "nowrap"}}>
                        {detailinfo.proj.category}
                      </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Token (s)
                    </Td>
                    <Td width="200px" style={{fontSize:"14px", color:"#316395", whiteSpace: "nowrap" }}>
                      {detailinfo.proj.tokensymbol} 
                      <Span onClick={()=>window.location.href = `https://www.klaytnfinder.io/token/${detailinfo.proj.tokenContractAddress}`}>
                      {"   "}klaytnfinder <ImArrowUpRight2 /></Span>
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Team
                    </Td>
                    <Td width="200px" style={{fontSize:"14px", color:"#316395", whiteSpace: "nowrap" }}>
                      {detailinfo.proj.team} 
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Audit
                    </Td>
                    <Td width="200px" style={{fontSize:"14px", color:"#316395", whiteSpace: "nowrap" }}>
                       {detailinfo.proj.audit}
                       <Span onClick={()=>window.location.href = `${detailinfo.proj.auditDetail}`}>
                        {"   "}report <ImArrowUpRight2 /></Span>
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Investor
                    </Td>
                    <Td width="200px" style={{fontSize:"14px", color:"#316395", whiteSpace: "nowrap" }}>
                      {detailinfo.proj.investor} 
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>
                      Links
                    </Td>
                    <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
                      <AiFillHome style={{height:"16px",verticalAlign:"top",cursor: "pointer"}}/> 
                      <span style={{marginLeft:"5px"}} onClick={()=>window.location.href = `https://${detailinfo.proj.homeUrl}`}>
                      {detailinfo.proj.homeUrl}</span>
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
                      <FaFileAlt style={{height:"16px",verticalAlign:"top",cursor: "pointer"}}/> 
                      <span style={{marginLeft:"5px"}} onClick={()=>window.location.href = `https://${detailinfo.proj.docsUrl}`}>
                      {detailinfo.proj.docsUrl}</span>
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
                      <FaTwitter style={{height:"16px",verticalAlign:"top"}}/> 
                      <span style={{marginLeft:"5px"}} onClick={()=>window.location.href = `https://twitter.com/${detailinfo.proj.twitterUrl}`}>
                      {detailinfo.proj.twitterUrl}</span>
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
                      <FaMedium style={{height:"16px",verticalAlign:"top"}}/> 
                      <span style={{marginLeft:"5px"}} onClick={()=>window.location.href = `https://medium.com/${detailinfo.proj.mediumUrl}`}>
                      {detailinfo.proj.mediumUrl}</span>
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
                      <FaTelegramPlane style={{height:"20px",verticalAlign:"top"}}/>
                      <span style={{marginLeft:"5px"}} onClick={()=>window.location.href = `https://t.me/${detailinfo.proj.telegramUrl}`}>
                      {detailinfo.proj.telegramUrl}</span>
                    </Td>
                  </Tr>
                </Styled.ProjectBox>
                <Styled.ProjectBox>
                  <Tr>
                    <Td style={{width:"80px"}}>                      
                    </Td>
                    <Td width="200px" style={{fontSize:"14px", color:"#316395" }}>
                      <SiDiscord style={{height:"20px",verticalAlign:"top"}}/>
                      <span style={{marginLeft:"5px"}} onClick={()=>window.location.href = `https://discord.gg/${detailinfo.proj.discordUrl}`}>
                      discord.gg</span>
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




