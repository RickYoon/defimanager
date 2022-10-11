import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as Styled from "./Main.style"
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import { scaleLog } from 'd3-scale';

function Main() {

  const scale = scaleLog().base(Math.E);

  // set colorList
  const colorarr = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#3366cc", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300"]

  // set states  
  const [subselection, setSubselection] = useState(true)
  const [number, setNumber] = useState(5)
  const [isloading, setIsloading] = useState(true)
  const [tvldata, setTvldata] = useState({
    refDate: "2022-00-00",
    total: {
      tvl: 0,
      diff: 0
    },
    data: []
  })
  const [tokendata, setTokendata] = useState([
    "", ""
  ])
  const [tempchart, setTempchart] = useState([{
    "name": "-"
  }]);
  const [dexgroup, setDexgroup] = useState(["Klayswap"])
  const [lendinggroup, setLendinggroup] = useState([])
  const [stakinggroup, setStakinggroup] = useState([])

  useEffect(() => {
    loadtvl()
    loadchart()
  }, [])

  const loadchart = async () => {
    const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/testapi"

    await axios.get(url).then(function (response) {

      let tempArr = response.data.body.Items;
      let tempKeys = Object.keys(tempArr[0]);

      for (let i = 0; i < tempArr.length; i++) {
        tempKeys.forEach((tempkey) => {
          if (tempkey !== "date") {
            tempArr[i][tempkey] = (tempArr[i][tempkey] / 1).toFixed(0)
          }
        })
      }

      tempArr.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      })

      console.log("tempchart",tempArr)
      setTempchart(tempArr)

    })
  }

  const loadtvl = async () => {
    // const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/tvllist"
    const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/tvlinfotest"

    await axios.get(url).then(function (response) {
      console.log(response.data.body)
      // tvl
      let tempArr = response.data.body.data.filter(dat => dat.proj !== "KCT-Total")
      let tempTotal = response.data.body.data.filter(dat => dat.proj === "KCT-Total")

      // token
      let tokenArr = response.data.body.token.filter(dat => dat.token !== "date")
      tokenArr = tokenArr.filter(dat => dat.token !== "dataType")

      tempArr.sort(function (a, b) {
        return a.tvl > b.tvl ? -1 : a.tvl < b.tvl ? 1 : 0;
      })

      let tokenArrSort = [];

      for (let i = 0; i < tempArr.length; i++) {
        let temp = tokenArr.filter(dat => dat.project === tempArr[i].proj)
        temp.forEach((comp) => {
          tokenArrSort.push(comp)
        })
      }

      // console.log("tokenArr", tokenArrSort)
      setTokendata(tokenArrSort)

      // tempArr = tempArr.filter(dat => dat.proj !== "neuronswap")
      tempArr.map((component) => {
        component["MarketShare"] = component.tvl / tempTotal[0].tvl * 100
        return null
      })

      // console.log(tempTotal[0].tvl)
      // console.log("tempArr", tempArr)

      const responseObj = {
        refDate: response.data.body.refDate,
        total: tempTotal[0],
        data: tempArr
      }
      // console.log("tempArr", tempArr)
      let dexClub = tempArr.filter((arr) => arr.cat === "DEX")
      let dexArray = []
      dexClub.forEach((ele)=> {
        dexArray.push(ele.proj)
      })

      let lendingClub = tempArr.filter((arr) => arr.cat === "Lending")
      let lendingArray = []
      lendingClub.forEach((ele)=> {
        lendingArray.push(ele.proj)
      })

      let stakingClub = tempArr.filter((arr) => arr.cat === "staking")
      let stakingArray = []
      stakingClub.forEach((ele)=> {
        stakingArray.push(ele.proj)
      })

      setDexgroup(dexArray)
      setLendinggroup(lendingArray)
      setStakinggroup(stakingArray)

      // console.log("dexClub",dexClub)

      // let hundredClub = tempArr.filter((arr) => arr.cat === "DEX")
      // // console.log("hundredClub", hundredClub)
      // let temphund = []
      // hundredClub.forEach((ele) => {
      //   temphund.push(ele.proj)
      // })

      // let lendingClub = tempArr.filter((arr) => arr.cat === "Reserve cur.")
      // // console.log("hundredClub", hundredClub)
      // let lending = []
      // lendingClub.forEach((ele) => {
      //   lending.push(ele.proj)
      // })

      // console.log("temphund",temphund)

      responseObj.data.forEach((ress) => {
        if (ress.pool !== undefined) {
          ress.pool.ratioTVL.sort((function (a, b) {
            return b.ratio - a.ratio
          }))
        }
      })

      setTvldata(responseObj)
      setIsloading(false)
    })
  }

  const transnumber = () => {

    return (
      <>
        {tvldata.total.tvl > 10000000 ?
          <span> ${(tvldata.total.tvl / 1000000000).toFixed(2)}B</span> :
          <span> - </span>
        }
      </>
    )
  }

  const minusNumber = () => {
    let temp = number - 1;
    if (temp === 0) {
      temp = 4
    }
    setNumber(temp)
  }

  const plusNumber = () => {
    let temp = number + 1;
    if (temp === 5) {
      temp = 1
    }

    setNumber(temp)
  }
  
  return (
    <>
      <Styled.OverBox>
            <Styled.Wrappertitle>
              <Styled.Title>Analytics</Styled.Title>
            </Styled.Wrappertitle>
      <Styled.Topbox>
      <Styled.Leftcolumn>
      <div>
      
      <Chartcover>
        <TemplateBlockinner>Dex Projects
        </TemplateBlockinner>

        <div style={{ marginLeft: "7px", marginRight: "7px", paddingTop: "5px" }}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={tempchart}>

            {/* <defs>
                      <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colorarr[index]} stopOpacity={0.4} />
                          <stop offset="75%" stopColor={colorarr[index]} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>    
                    return  <Area stroke={colorarr[index]} dataKey={fifty}/> */}

                {
                  dexgroup.map((fifty, index) => {
                    console.log("fifty", fifty)
                    return (
                    <>
                    <defs>
                      <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3366cc" stopOpacity={0.9} />
                          <stop offset="75%" stopColor="#3366cc" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <defs>
                      <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#dd4477" stopOpacity={0.0} />
                          <stop offset="75%" stopColor="#dd4477" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>

                    <Area type="monotone" strokeWidth={1} dataKey={fifty} stroke={colorarr[index]} fill="url(#color2)" />
                    </>
                    )})                 
                }

                <XAxis
                    dataKey="date"
                    interval="preserveEnd"
                    tickLine={false}
                    axisLine={false}
                    stroke="#efefef"
                    tick={{ fontSize: 10, fill: '#000000' }}
                    minTickGap={120}
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(str) => {
                        return str
                    }}
                />

                {/* <YAxis scale="log" domain={['auto', 'auto']} /> */}

                <YAxis
                    scale="log" 
                    domain={['auto', 'auto']}
                    axisLine={false}
                    tickLine={false}
                    tickCount={8}
                    tickFormatter={(number) => `$${(number/1000000).toFixed(0)}M`}
                    type="number"
                    orientation="left"
                    interval="preserveEnd"
                    minTickGap={80}
                    yAxisId={0}
                    mirror={true}
                    style={{ fontSize: "14px" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Tooltip />

                {/* <Tooltip content={<CustomTooltip />} /> */}

                <CartesianGrid opacity={0.15} vertical={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Chartcover>
    </div>

    <div>
      <div style={{marginTop: "15px"}}></div>
      <Chartcover>
        <TemplateBlockinner>Lending projects
        </TemplateBlockinner>

        <div style={{ marginLeft: "7px", marginRight: "7px", paddingTop: "5px" }}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={tempchart}>

                {
                  lendinggroup.map((fifty, index) => {
                    <defs>
                      <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#dd4477" stopOpacity={0.0} />
                          <stop offset="75%" stopColor="#dd4477" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    return  <Area type="linear" stroke={colorarr[index]} fill="url(#color2)" dataKey={fifty}/>
                  })                 
                }


                <XAxis
                    dataKey="date"
                    interval="preserveEnd"
                    tickLine={false}
                    axisLine={false}
                    stroke="#efefef"
                    tick={{ fontSize: 10, fill: '#000000' }}
                    minTickGap={120}
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(str) => {
                        return str
                    }}
                />

                {/* <YAxis scale="log" domain={['auto', 'auto']} /> */}

                <YAxis
                    scale="log"
                    domain={['auto', 'auto']}
                    axisLine={false}
                    tickLine={false}
                    tickCount={8}
                    tickFormatter={(number) => `$${(number/1000000).toFixed(0)}M`}
                    type="number"
                    orientation="left"
                    interval="preserveEnd"
                    minTickGap={80}
                    yAxisId={0}
                    mirror={true}
                    style={{ fontSize: "14px" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Tooltip />

                {/* <Tooltip content={<CustomTooltip />} /> */}

                <CartesianGrid opacity={0.15} vertical={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Chartcover>
    </div>

    <div>
      <div style={{marginTop: "15px"}}></div>
      <Chartcover>
        <TemplateBlockinner>Staking projects
        </TemplateBlockinner>

        <div style={{ marginLeft: "7px", marginRight: "7px", paddingTop: "5px" }}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={tempchart}>

                {
                  stakinggroup.map((fifty, index) => {
                    <defs>
                      <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#dd4477" stopOpacity={0.0} />
                          <stop offset="75%" stopColor="#dd4477" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    return  <Area type="linear" stroke={colorarr[index]} fill="url(#color2)" dataKey={fifty}/>
                  })                 
                }

                <XAxis
                    dataKey="date"
                    interval="preserveEnd"
                    tickLine={false}
                    axisLine={false}
                    stroke="#efefef"
                    tick={{ fontSize: 10, fill: '#000000' }}
                    minTickGap={120}
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(str) => {
                        return str
                    }}
                />

                {/* <YAxis scale="log" domain={['auto', 'auto']} /> */}

                <YAxis
                    scale="log"
                    domain={['auto', 'auto']}
                    axisLine={false}
                    tickLine={false}
                    tickCount={8}
                    tickFormatter={(number) => `$${(number/1000000).toFixed(0)}M`}
                    type="number"
                    orientation="left"
                    interval="preserveEnd"
                    minTickGap={80}
                    yAxisId={0}
                    mirror={true}
                    style={{ fontSize: "14px" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Tooltip />

                {/* <Tooltip content={<CustomTooltip />} /> */}

                <CartesianGrid opacity={0.15} vertical={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Chartcover>
    </div>

      </Styled.Leftcolumn>
      <Styled.Rightcolumn>
      </Styled.Rightcolumn>
    </Styled.Topbox>
    </Styled.OverBox>
    </>
  );
}


const PC = styled.div`
  color: black;
  float: left;
  text-decoration: none;
  font-size:14px;
  /* border: 1px solid #ddd; */
`

const PA = styled.div`
  color: black;
  float: left;
  text-decoration: none;
  font-size:14px;
  transition: background-color .3s;
  cursor: pointer;
  /* border: 1px solid #ddd; */
  /* background-color:#ddd; */
`

const Pagination = styled.div`
  display: inline-block;
`


const TemplateBlockinner = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right:10px;

  @media screen and (max-width: 500px){
    display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right:10px;
  }
`;



const Chartcover = styled.div`
  background-color: white;
  width: 100%;
  max-height: 768px;
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  padding-top:15px;
  padding-bottom:5px;
  padding-left:10px;
  padding-right:10px;
  margin-top: 10px;

  background-color:white;
  border-radius: 8px;
  box-shadow: 1px 1px 1px gray;

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
  @media screen and (max-width: 950px){
    width: 100%;
    margin-top: 0px;


    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;

  }
`

export default Main;

