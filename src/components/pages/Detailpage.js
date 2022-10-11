import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import ReactLoading from 'react-loading';
import { AreaChart, Area, LineChart, Line, BarChart, CartesianGrid, Bar, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Timeline } from 'react-twitter-widgets'
import icons from "../../assets/tokenIcons"
// import {setCookie, getCookie} from "../../assets/util/cookie"


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


  const loadDetailInfo = async () => {
    setIsloading(true)
    const url = `https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/detailInfo?proj=${id}`

    await axios.get(url).then(function (response) {
      console.log("response",response)

      let tempArr = [];
      let priceArr = [];

      console.log(response.data.chart.Items[0])
      
      response.data.chart.Items.forEach((item) => {
        // console.log(item)
        if (item[id] > 1000000) {
          if (id !== "RHEA") {
            tempArr.push({
              date: item.date.slice(5, 10),
              tvl: Number(item[id] / 1000000).toFixed(2),
              scale: "M$"
            })
          } else {
            tempArr.push({
              date: item.date.slice(5, 10),
              tvl: Number(item[id] / 1000).toFixed(2),
              scale: "K$"
            })
          }
        } else if (item[id] > 1000) {
          tempArr.push({
            date: item.date.slice(5, 10),
            tvl: Number(item[id] / 1000).toFixed(2),
            scale: "K$"
          })
        }
      })

      response.data.price.forEach((item) => {
        if (item.price > 1) {
          priceArr.push({
            date: item.date.slice(5, 10),
            dateRaw: item.date,
            price: item[id],
            TokenPrice: item.price.toFixed(1)
          })
        } else {
          priceArr.push({
            date: item.date.slice(5, 10),
            dateRaw: item.date,
            price: item[id],
            TokenPrice: item.price.toFixed(5)
          })
        }
      })

      

      let serviceObject = {
        "chart": tempArr,
        "price": priceArr,
        "lastTvl": Number(response.data.chart.Items[0][id].toFixed(0)),
        "proj": response.data.proj
      }

      // kairosCash price data update need (KASH, KREDIT)
      // electrik price data update need (BTRY)
      // RHEA token 없음 (RHEA, SRHEA)

      // klayportal 처럼 토큰 없는애들 처리 필요
      // bifi have no token
      // taalswap not working
      // 1M 이하 프로젝트 klaymeta TVL 먹혀버림...



      serviceObject.chart.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date < b.date ? 1 : 0;
      })

      serviceObject.price.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date < b.date ? 1 : 0;
      })

      let tvlLength = serviceObject.chart.length;
      // console.log("serviceObject : ", serviceObject)


      if (serviceObject.chart.length > 13) {
        const lastDayTvl = Number(serviceObject.chart[13].tvl)
        const beforeDayTvl = Number(serviceObject.chart[6].tvl)
        let tokenOneName = ""
        if (priceArr.length === 0) {
          // const tokenOneName = priceArr[0].price[0].tokenName
          tokenOneName = "-"
          serviceObject.startChart = serviceObject.chart[0].date
          serviceObject.endChart = serviceObject.chart[13].date

        } else {
          tokenOneName = priceArr[0].price[0].tokenName
          serviceObject.startChart = serviceObject.price[0].dateRaw
          serviceObject.endChart = serviceObject.price[priceArr.length-1].dateRaw
        }
        // const tokenOneName = "kokoa"
        // console.log("tokenOneName", tokenOneName)

        serviceObject.tvlDiff = ((((lastDayTvl - beforeDayTvl) / (beforeDayTvl))) * 100).toFixed(2)
        serviceObject.tokenOneName = tokenOneName
        // serviceObject.startChart = "2022-11-11"
        // serviceObject.endChart = "2022-11-11"

        // console.log("serviceObject", serviceObject)
      } else if (serviceObject.chart.length > 7) {
        // console.log("serviceObject", serviceObject)
        const lastDayTvl = Number(serviceObject.chart[tvlLength - 1].tvl)
        const beforeDayTvl = Number(serviceObject.chart[tvlLength - 8].tvl)
        serviceObject.tvlDiff = ((((lastDayTvl - beforeDayTvl) / (beforeDayTvl))) * 100).toFixed(2)

        // const lastDayTvl = 123
        // const beforeDayTvl = 456
        let tokenOneName = ""
        // console.log("priceArr : ", priceArr)
        if (priceArr.length === 0) {
          // const tokenOneName = priceArr[0].price[0].tokenName
          tokenOneName = "-"
        } else {
          tokenOneName = priceArr[0].price[0].tokenName
          serviceObject.startChart = serviceObject.price[0].dateRaw
        }
        // console.log("tokenOneName", tokenOneName)

        serviceObject.tokenOneName = tokenOneName
        // serviceObject.startChart = serviceObject.price[0].dateRaw
        // serviceObject.endChart = serviceObject.price[13].dateRaw
        // serviceObject.startChart = "2022-11-11"
        // serviceObject.endChart = "2022-11-11"

        // console.log("serviceObject", serviceObject)
      } else {

        let tokenOneName = ""
     
        if (priceArr.length === 0) {
          // const tokenOneName = priceArr[0].price[0].tokenName
          tokenOneName = "-"
        } else {
          tokenOneName = priceArr[0].price[0].tokenName
        }
        serviceObject.tokenOneName = tokenOneName


      }

      setDetailinfo(serviceObject)
      setIsloading(false)

      // console.log(serviceObject)


      // if(getCookie("projectRank")){
      //   console.log(getCookie("projectRank"))
      // } else {
      //   setCookie('projectRank',
      //   {"lastDate" : serviceObject.endChart,
      //    "rankList": ["klayswap","kleva"]
      //   },{})
      // }

      
      // setCookie('projectRank',{"aa":"bb","bb":"cc"},{
      //   path:"/",
      //   secure: true,
      //   sameSite:"none"
      // })

      // console.log(getCookie("projectRank"))
    })
  }

  return (
    <>
      <SubTemplateBlock style={{ marginTop: "40px", marginBottom: "10px" }}>
        <span>
          <img src={icons[id]} alt="logo" height="40px" style={{ backgroundColor: "white", marginRight: "15px", verticalAlign: "bottom", borderRadius: "15px" }} />
          {id === "UFO" ?
            <span style={{ fontWeight: "bold", fontFamily: "OpenSans-Semibold", fontSize: "30px" }}>UFOSwap</span> :
            <span style={{ fontWeight: "bold", fontFamily: "OpenSans-Semibold", fontSize: "30px" }}>{id}</span>
          }
        </span>
        {/* <div style={{float:"right", paddingTop:"15px"}}>
          <Prev href="#" id="prev">1</Prev>
          <Next href="#" id="next">3</Next>
        </div> */}
      </SubTemplateBlock>


      <Topdash>
        <Row>
          <Leftcolumn>
            <Topcard>
              <Containersub style={{ margin: "15px" }}>
                <div>
                  <span style={{ textAlign: "left", fontFamily: "OpenSans-Medium", fontSize: "16px" }}> Total Value Locked (USD) </span>
                  {isloading ? <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px", color: "#316395" }}> - </span> :
                    <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px", color: "#316395" }}> {detailinfo.lastTvl.toLocaleString()} </span>}
                </div>
              </Containersub>
            </Topcard>
          </Leftcolumn>
          <Rightcolumn>
            <Topcard>
              <Containersub style={{ margin: "15px" }}>
                <div>
                  <span style={{ textAlign: "left", fontFamily: "OpenSans-Medium", fontSize: "16px" }}> Change (7days) </span>
                  {isloading ? <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px" }}> - %</span> :
                    <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px" }}>
                      {detailinfo.tvlDiff > 0 ?
                        <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px", color: "red" }}>+{detailinfo.tvlDiff}%</span> :
                        <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px", color: "blue" }}>{detailinfo.tvlDiff}%</span>}
                    </span>
                  }
                </div>
              </Containersub>
            </Topcard>
          </Rightcolumn>
        </Row>
      </Topdash>


      <Chartcover>
        {isloading ? <ReactLoading type="spin" color="gray" /> :
          <>
            <div style={{ paddingRight: "10px", paddingTop: "10px", textAlign: "right" }}>{detailinfo.startChart} ~ {detailinfo.endChart}</div>
            <TemplateBlockinner style={{ padding: "10px" }}>
              TVL({detailinfo.chart[0].scale})
            </TemplateBlockinner>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart width="100%" height={200} data={detailinfo.chart}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis tick={{ fontSize: 10 }} dataKey="date" />
                {/* <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['auto', 'auto']} /> */}
                {id === "Kokoa" ?
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin - 5', 'dataMax + 5']} /> :
                  id === "Qubit" ?
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin - 150', 'dataMax+500']} /> :
                    id === "kai" ?
                      <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin - 1', 'dataMax + 2']} /> :
                      id === "Electrik" ?
                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['auto', 'auto']} /> :
                        id === "RoundRobin" ?
                          <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['auto', 'auto']} /> :
                          id === "BiFi" ?
                            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['auto', 'auto']} /> :
                            id === "Fletaconnect" ?
                              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['auto', 'auto']} /> :
                              id === "Klayswap" ?
                                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin - 150', 'dataMax + 80']} /> :
                                id === "KROME" ?
                                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin-2', 'dataMax+3']} /> :
                                  id === "RHEA" ?
                                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin-400', 'dataMax+300']} /> :
                                    id === "PALA" ?
                                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin-40', 'dataMax+20']} /> :
                                    id === "peterfarm" ?
                                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin-15', 'dataMax+20']} /> :
                                      id === "KairosCash" ?
                                      <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin-5', 'dataMax+10']} /> :
                                        id === "klapfinance" ?
                                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin-25', 'dataMax+100']} /> :
                                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin - 5', 'dataMax + 5']} />
                }

                {/* <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin - 10', 'dataMax + 10']} /> */}
                <Tooltip />
                <Area type="monotone" dataKey="tvl" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>

            {
              detailinfo.tokenOneName !== "-" ?
                <>
                  <TemplateBlockinner style={{ padding: "10px", paddingBottom: "10px" }}>
                    {detailinfo.tokenOneName} price($)
                   </TemplateBlockinner>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart width="100%" height={200} data={detailinfo.price}>
                      <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#488A99" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#488A99" stopOpacity={0} />
                        </linearGradient>
                      </defs>

                      <XAxis tick={{ fontSize: 10 }} dataKey="date" />
                      {id === "Kronosdao" ?
                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['dataMin - 5', 'dataMax + 5']} /> :
                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} mirror={true} domain={['auto', 'auto']} />
                      }
                      <Tooltip />
                      <Area type="monotone" dataKey="TokenPrice" stroke="#488A99" fillOpacity={1} fill="url(#colorPv)" isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </> :
                <></>
            }
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
                    <tr >
                      <td className="head" style={{ width: "100px", textAlign: "center", height: "30px" }}>telegram</td>
                      <Tdh className="head" style={{ width: "250px", paddingLeft: "1em" }} onClick={() => { window.location.href = `${detailinfo.proj.telegramUrl}` }}>{detailinfo.proj.telegramUrl}</Tdh>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Upperbox>
          </TodoTemplateBlock>
        }
        {isloading ? <div style={{ height: "500px", width: "300px" }}><ReactLoading type="spin" color="gray" /></div> :

          <Twitterbox style={{ paddingTop: "20px" }}>
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: detailinfo.proj.twitterid
              }}
              options={{
                height: '500',
                width: '100%',
                chrome: "noheader, nofooter, transparent"
              }}
            />
          </Twitterbox>
        }

      </Infobox>
    </>
  );
}
//https://github.com/KlaySwap/klayswap/blob/master/audit/Smart_Contract_Audit_Report_KlaySwap_ver_2.0.pdf

const Next = styled.a`
  & {
    color: #7e7e7e;
    display: inline-block;
    font: normal bold 1.0em Arial,sans-serif;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    width: auto;
    padding: 0.5em 1.5em;
  }

  &:hover {
    color: #316395;
  }

  &:hover:after,
  &:hover:before {
    background: #316395;
  }


  &:before{
    background: #7e7e7e;
    -moz-border-radius: 0.25em;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    content: "";
    display: block;
    height: 0.4em;
    position: absolute;
    right: 0;
    top: 50%;
    width: 1em;
    margin-top: -.36em;
    -moz-transform: rotate(40deg);
    -ms-transform: rotate(40deg);
    -o-transform: rotate(40deg);
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
  }
  &:after {
    background: #7e7e7e;
    -moz-border-radius: 0.25em;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    content: "";
    display: block;
    height: 0.4em;
    position: absolute;
    right: 0;
    top: 50%;
    width: 1em;
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    -o-transform: rotate(-40deg);
    -webkit-transform: rotate(-40deg);
    transform: rotate(-40deg);
    /* -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg); */
  }

  &:before {
    /* -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg); */
  }

  

`

const Prev = styled.a`
  & {
    color: #7e7e7e;
    display: inline-block;
    font: normal bold 1.0em Arial,sans-serif;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    width: auto;
    padding: 0.5em 1.5em;
  }

  &:hover {
    color: #316395;
  }

  &:hover:after,
  &:hover:before {
    background: #316395;
  }


  &:before {
    background: #7e7e7e;
    -moz-border-radius: 0.25em;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    content: "";
    display: block;
    height: 0.4em;
    position: absolute;
    right: 0;
    top: 50%;
    width: 1em;
    -moz-transform: rotate(40deg);
    -ms-transform: rotate(40deg);
    -o-transform: rotate(40deg);
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
    left: 0;
  }

  &:after {
    background: #7e7e7e;
    -moz-border-radius: 0.25em;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    content: "";
    display: block;
    height: 0.4em;
    position: absolute;
    right: 0;
    top: 50%;
    width: 1em;
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    -o-transform: rotate(-40deg);
    -webkit-transform: rotate(-40deg);
    transform: rotate(-40deg);
    margin-top: -.36em;
    left: 0;
  }



`

const Topdash = styled.div`
 width: 900px;
 margin: 0 auto;
 @media screen and (max-width: 500px){
  width: 360px;

 }
`

const Containersub = styled.div`
@media screen and (max-width: 500px){
    }
    `


const Topcard = styled.div`
    background-color:white;
    padding:5px;
    border-radius: 10px;
@media screen and (max-width: 500px){
      }
      `

const Row = styled.div`
display:flex;
flex-direction:row;
width:100%;
justify-content:space-between;
@media screen and (max-width: 500px){
  width:380px;
  display:flex;
  flex-direction:column;

      }
`

const Leftcolumn = styled.div`
  width:50%;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-width: 0px;
  overflow-wrap: break-word;
  background-color: rgb(255, 255, 255);
  background-clip: border-box;
  border: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  overflow: visible;
  margin-right: 5px;


  @media screen and (max-width: 500px){
  width:360px;
  padding: 0;
  margin-bottom:10px;
  margin-right: 0px;

  }
`

const Rightcolumn = styled.div`
  width:50%;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-width: 0px;
  overflow-wrap: break-word;
  background-color: rgb(255, 255, 255);
  background-clip: border-box;
  border: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  overflow: visible;
  margin-left: 5px;


  @media screen and (max-width: 500px){
  width:360px;
  padding: 0;
  margin-bottom:10px;
  margin-left: 0px;

  }
`

const Upperbox = styled.div`
  width : 100%;
  height: 300px;
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

const Infobox = styled.div`
  width: 900px;
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
  width: 59%;
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

const Twitterbox = styled.div`
  float : right;
  width: 39%;
  margin-Top : 15px;
  padding : 3px;
  background: white;
  border-radius: 16px;
  font-family: 'OpenSans-Semibold';
  font-weight: bold;
  font-size: 12px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  @media screen and (max-width: 500px){
    width: 100%;
  }
`

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
  width: 900px;
  max-height: 768px;
  margin: 0 auto;
  padding-bottom: 10px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */

  

  @media screen and (max-width: 500px){
    width: 360px;
    font-size: 12px;
  }
`;


const Chartcover = styled.div`
  width: 900px;
  /* height: 270px; */
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  padding:10px;
  margin-top: 10px;
  max-height:520px;


  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-width: 0px;
  overflow-wrap: break-word;
  background-color: rgb(255, 255, 255);
  background-clip: border-box;
  border: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  overflow: visible;
  .loader {
    padding-left:200px;
  }
  @media screen and (max-width: 500px){
    width: 95%;
    margin-top: 0px;
    width: 360px;


  }
`

export default Detailpage;
