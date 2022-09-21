import React, { useContext } from 'react';
import { useParams, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
// import axios from 'axios';
// import ReactLoading from 'react-loading';
// import { AreaChart, Area, LineChart, Line, BarChart, CartesianGrid, Bar, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { Timeline } from 'react-twitter-widgets'
import icons from "../../assets/tokenIcons"
// import {setCookie, getCookie} from "../../assets/util/cookie"
import * as Styled from "./TvlChartCard.style"
import { NftDetailContext } from 'components/context/NftDetailContext';


function TopTitle() {

  const { id } = useParams();
  const { nftdetailinfo,isloading } = useContext(NftDetailContext);

  return (
    <>
      <SubTemplateBlock style={{marginBottom:"10px"}}>
        {isloading ? 
        <span>
          <img src={`https://goclubhouse.s3.ap-northeast-2.amazonaws.com/klaylabs/${id}.png`} alt="logo" height="30px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
          {/* <Img src={icons[id]} alt="logo" /> */}
            <ProjectName>
              <ProductSkeleton />
            </ProjectName>
        </span>
        :
        <span>
          <img src={`https://goclubhouse.s3.ap-northeast-2.amazonaws.com/klaylabs/${id}.png`} alt="logo" height="30px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
            <ProjectName>
              {id}
            </ProjectName>
        </span>
      }
      </SubTemplateBlock>
    </>
  );
}


//Audit report
//https://github.com/KlaySwap/klayswap/blob/master/audit/Smart_Contract_Audit_Report_KlaySwap_ver_2.0.pdf

const ProductSkeleton = styled.div`
  display: inline-block;
  /* height: ${props => props.height || "90%"}; */
  /* width: ${props => props.width || "100%"}; */
  background-color: #eee;
  background-image: linear-gradient(
    90deg,
    #eee,
    #f5f5f5,
    #eee
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: ${props => props.marginTop || "0"}
`;


const SubTemplateBlock = styled.div`
  width: 788px;
  margin: 0 auto;
  max-height: 768px;
  padding-bottom: 10px;
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */

  @media screen and (max-width: 500px){
    width: 360px;
    font-size: 12px;
  }
`;

const Img = styled.img`
    height: 30px;
    background-color: white;
    margin-right: 10px;
    vertical-align: bottom;
    border-radius: 15px; 
    @media screen and (max-width: 500px){
      height: 25px;
  }

`

const ProjectName = styled.span`
    font-weight: bold;
    font-family: "OpenSans-Semibold";
    font-size: 25px;
    @media screen and (max-width: 500px){
      font-size: 20px;
  }

`



export default TopTitle;
