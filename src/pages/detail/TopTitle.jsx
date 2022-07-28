import React, { useContext } from 'react';
import { useParams, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
// import axios from 'axios';
// import ReactLoading from 'react-loading';
// import { AreaChart, Area, LineChart, Line, BarChart, CartesianGrid, Bar, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { Timeline } from 'react-twitter-widgets'
import icons from "../../assets/tokenIcons"
// import {setCookie, getCookie} from "../../assets/util/cookie"
import { DetailContext } from 'components/context/DetailContext';

function TopTitle() {

  const { id } = useParams();
  const { detailinfo,isloading } = useContext(DetailContext);

  return (
    <>
      <SubTemplateBlock style={{marginBottom:"10px"}}>
        <span>
          <Img src={icons[id]} alt="logo" />
            <ProjectName>
                {id === "UFO" ?
                    <>UFOSWAP</> :
                    isloading ? <></> :
                    id + " (#" + detailinfo.rankInfo.myRank + ")"
                }
            </ProjectName>
        </span>
        {/* <div style={{float:"right", paddingTop:"15px"}}>
          <Prev href="#" id="prev">1</Prev>
          <Next href="#" id="next">3</Next>
        </div> */}
      </SubTemplateBlock>

    </>
  );
}
//Audit report
//https://github.com/KlaySwap/klayswap/blob/master/audit/Smart_Contract_Audit_Report_KlaySwap_ver_2.0.pdf

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
