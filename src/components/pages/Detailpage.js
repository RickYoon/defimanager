import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import ReactLoading from 'react-loading';
import { BarChart, CartesianGrid, Bar, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Timeline } from 'react-twitter-widgets'


function Detailpage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [isloading, setIsloading] = useState(false)
  const [detailinfo, setDetailinfo] = useState({
    "chart": [{

    }
    ],
    "proj": {
    },
    "lastTvl": 0
  });

  useEffect(() => {
    loadDetailInfo()
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [pathname])


  // 108 + 59 = 167
  // 167 * 250 = 41750
  // 63 * 229 = 15000
  // 총 41750 neverland
  // stable 3000 + klay 1200 = 4200
  // klayswap 27200

  const loadDetailInfo = async () => {
    setIsloading(true)
    const url = `https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/detailInfo?proj=${id}`
    await axios.get(url).then(function (response) {
      let tempArr = [];
      response.data.chart.Items.forEach((item) => {
        tempArr.push({
          date: item.date,
          tvl: Number(item[id] / 1000000).toFixed(0)
        })
      })
      let serviceObject = {
        "chart": tempArr,
        "lastTvl": response.data.chart.Items[0][id],
        "proj": response.data.proj
      }

      serviceObject.chart.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date < b.date ? 1 : 0;
      })

      setDetailinfo(serviceObject)
      setIsloading(false)
      console.log(serviceObject.proj)
    })
  }

  return (
    <>
      <SubTemplateBlock style={{ marginTop: "20px", marginBottom: "10px" }}>
        <Underline primary><Link to="/"><span style={{ color: "#254b87", fontWeight: "bold", fontSize: "13px" }}>DefiRank</span></Link> > {id}</Underline>
      </SubTemplateBlock>


      <Uppercontainer>
        <Upperitem>
          {id}
        </Upperitem>
        <Upperitem>
          $ {detailinfo.lastTvl.toLocaleString()}
        </Upperitem>
      </Uppercontainer>


      <Chartcover>
        {isloading ? <ReactLoading type="spin" color="gray" /> :
          <>
            <TemplateBlockinner>7 days TVL trend (M$)</TemplateBlockinner>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart style={{ marginLeft: "-10px" }} width="100%" height={150} data={detailinfo.chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                {id === "Klayswap" ? <YAxis domain={[0, 1300]} tick={{ fontSize: 10 }} /> :
                  <YAxis domain={[0, 'dataMax + 10']} tick={{ fontSize: 10 }} />}
                <Tooltip />
                <Bar dataKey="tvl" fill="#254b87" />
              </BarChart>
            </ResponsiveContainer>
          </>
        }
      </Chartcover>


      <Infobox>
        {isloading ? <ReactLoading type="spin" color="gray" /> :

          <TodoTemplateBlock style={{ padding: "10px" }}>
            <Downbox>
              <h3 style={{ marginLeft: "20px", marginTop: "20px", fontSize: "18px", }}>Description</h3>
              <div style={{ padding: "20px", paddingTop: "15px", fontSize: "13px", lineHeight: "20px" }}>{detailinfo.proj.description}</div>
            </Downbox>
            <Vacancy />
            <h3 style={{ marginLeft: "20px", marginTop: "20px", fontSize: "18px" }}>Information</h3>
            <Upperbox style={{ borderWidth: "2px", border: "red" }}>
              <div className="tablecss" style={{ paddingTop: "30px" }}>
                <table style={{ width: "100%", borderRadius: "20px", fontSize: "12px" }}>
                  <tbody>
                    <tr >
                      <td className="head" style={{ width: "100px", textAlign: "center", height: "30px" }}>category</td>
                      <td className="head" style={{ width: "250px", paddingLeft: "1em" }}>{detailinfo.proj.category}</td>
                    </tr>
                    <tr >
                      <td className="head" style={{ width: "100px", textAlign: "center", height: "30px" }}>symbol</td>
                      <td className="head" style={{ width: "250px", paddingLeft: "1em" }}>{detailinfo.proj.tokensymbol}</td>
                    </tr>
                    <tr >
                      <td className="head" style={{ width: "100px", textAlign: "center", height: "30px" }}>Name</td>
                      <td className="head" style={{ width: "250px", paddingLeft: "1em" }}>{detailinfo.proj.tokenName}</td>
                    </tr>
                    <tr >
                      <td className="head" style={{ width: "100px", textAlign: "center", height: "30px" }}>address</td>
                      <td className="head" style={{ width: "250px", paddingLeft: "1em", fontSize: "10px" }}>{detailinfo.proj.tokenContractAddress}</td>
                    </tr>
                    <tr >
                      <td className="head" style={{ width: "100px", textAlign: "center", height: "30px" }}>home</td>
                      <Tdh className="head" style={{ width: "250px", paddingLeft: "1em" }} onClick={() => { window.location.href = `${detailinfo.proj.homeUrl}` }}>{detailinfo.proj.homeUrl}</Tdh>
                    </tr>
                    <tr >
                      <td className="head" style={{ width: "100px", textAlign: "center", height: "30px" }}>docs</td>
                      <Tdh className="head" style={{ width: "250px", paddingLeft: "1em" }} onClick={() => { window.location.href = `${detailinfo.proj.docsUrl}` }}>{detailinfo.proj.docsUrl}</Tdh>
                    </tr>
                    <tr >
                      <td className="head" style={{ width: "100px", textAlign: "center", height: "30px" }}>twitter</td>
                      <Tdh className="head" style={{ width: "250px", paddingLeft: "1em" }} onClick={() => { window.location.href = `${detailinfo.proj.twitterUrl}` }}>{detailinfo.proj.twitterUrl}</Tdh>
                    </tr>
                    <tr >
                      <td className="head" style={{ width: "100px", textAlign: "center", height: "30px" }}>medium</td>
                      <Tdh className="head" style={{ width: "250px", paddingLeft: "1em" }} onClick={() => { window.location.href = `${detailinfo.proj.mediumUrl}` }}>{detailinfo.proj.mediumUrl}</Tdh>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Upperbox>
          </TodoTemplateBlock>
        }
        {isloading ? <div style={{ height: "500px", width: "300px" }}><ReactLoading type="spin" color="gray" /></div> :

          <Twitterbox>
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: detailinfo.proj.twitterid
              }}
              options={{
                height: '500',
                width: '350'
              }}
            />
          </Twitterbox>
        }

      </Infobox>
    </>
  );
}
//https://github.com/KlaySwap/klayswap/blob/master/audit/Smart_Contract_Audit_Report_KlaySwap_ver_2.0.pdf

const Upperbox = styled.div`
  width : 100%;
  height: 200px;
  font-size : 15px;
  @media screen and (max-width: 500px){
    font-size : 12px;
    margin-left: 10px;
    height:100%;
  }
`;

const Vacancy = styled.div`
    height: 30px;
  @media screen and (max-width: 500px){
    height: 0px;
  }
`;

const Tdh = styled.td`
    cursor:pointer;
    &:hover {
    color:blue;
    text-decoration:underline;
  }

  @media screen and (max-width: 500px){
    height: 0px;
  }
`;




const Downbox = styled.div`
  width : 100%;
  height: 120px;
  font-size : 15px;
  @media screen and (max-width: 500px){
    font-size : 12px;
    height: 100%;
  }

`;


const Twitterbox = styled.div`
  float : right;
  margin-Top : 15px;
  padding : 3px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  
`

const Infobox = styled.div`
  width: 780px;
  margin : 0 auto;
  display : flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  height:500px;

  @media screen and (max-width: 500px){
    flex-direction: column;
    width: 360px;
    height:100%;
  }
`

const TodoTemplateBlock = styled.div`
  width: 420px;
  /* max-height: 1024px; */
  /* display: flex;
  flex-wrap:wrap; */

  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin-top: 16px;
  margin-bottom: 5px;
  padding-bottom:10px;
  .loader {
    margin-left:200px;
  }
  
  @media screen and (max-width: 500px){
    width: 360px;
    padding-left:0px;
    padding-right:0px;

    .loader {
      margin-left:135px;
    }
    .mobtrans{
      display:none;
    }
    .tablecss{
      font-size:15px;
      
    }
    /* .head{
    }
    .headcol:before {
      content: 'Row ';
    }
  .content {
    background: #8cdba3;
} */
  }
`;

const TemplateBlockinner = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right:10px;

  @media screen and (max-width: 500px){
    display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right:10px;
  }
`;


const SubTemplateBlock = styled.div`
  width: 780px;
  max-height: 768px;
  margin: 0 auto;
  padding-bottom: 10px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */

  @media screen and (max-width: 500px){
    width: 360px;
    font-size: 12px;
  }
`;

const Underline = styled.span`
  /* Adapt the colors based on primary prop */
  border-bottom: ${props => props.primary ? "2px solid black" : ""};
  color : ${props => props.primary ? "black" : "gray"};
  padding : 5px;
  font-weight : 900;
  font-size: 12px;
  @media screen and (max-width: 500px){
    font-size: 12px;
  }
`;

const Uppercontainer = styled.span`
  width: 780px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color:white;
  border-radius: 8px;

  @media screen and (max-width: 500px){
  width: 360px;
}
`

const Upperitem = styled.div`
  background-color:white;
  height:25px;
  width:360px;
  padding-top:5px;
  text-align:center;
  @media screen and (max-width: 500px){
  width: 360px;
  text-align:left;
}
`


const Chartcover = styled.div`
  background-color: white;
  width: 780px;
  height: 270px;
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  border-radius: 10px;
  padding-top:15px;
  padding-bottom:15px;
  padding-right:20px;
  margin-top: 10px;
  .loader {
    padding-left:200px;
  }
  @media screen and (max-width: 500px){
    width: 95%;
  }
`

// const Infocover = styled.div`
//   background-color: white;
//   width: 780px;
//   height: 200px;
//   margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
//   border-radius: 10px;
//   padding-top:15px;
//   padding-bottom:15px;
//   padding-right:20px;

//   margin-top: 10px;
//   @media screen and (max-width: 500px){
//     width: 95%;
//   }
// `

export default Detailpage;


// {
//   "description" : "",
//   "information" : {
    // "category": "",
    // "symbol": "",
    // "Name": "",
    // "contractAddress": "",
    // "auditCompany": "",
    // "auditUrl": "",
    // "homeUrl": "",
    // "docsUrl": "",
    // "twitterUrl": "",
    // "mediumUrl": "",
    // "telegramUrl": "",
    // "twitterid": ""
//   }
// }



// ,
//      "TaalSwap":{
//         "description":"이더리움기반 멀티체인 AMM 프로토콜로 수익을 향상을 위한 서비스를 제공합니다. 가버넌스 토큰인 TAL 토큰을 통해서 가버넌스에 투표와 제안을 할 수 있습니다.",
//         "category": "DEX",
//         "tokensymbol": "TAL",
//         "tokenName": "TaalSwap Token",
//         "tokenContractAddress": "0x90a4a420732907b3c38b11058f9aa02b3f4121df",
//         "serviceAuditCompany": "-",
//         "auditUrl": "-",
//         "homeUrl": "https://taalswap.finance/",
//         "docsUrl": "https://docs.taalswap.finance/taalswap-docs/",
//         "twitterUrl": "https://twitter.com/taal_fi",
//         "mediumUrl": "https://taalswap.medium.com/",
//         "telegramUrl": "https://t.me/TaalSwapOfficial",
//         "twitterid": "taal_fi"
//     }