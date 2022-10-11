import NewsTicker, { Directions } from "react-advanced-news-ticker";
import styled from 'styled-components';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { AiFillTrophy, AiOutlineInfoCircle, AiOutlineProfile } from "react-icons/ai";
import { BsFillSafeFill, BsCurrencyBitcoin, BsFillPeopleFill } from "react-icons/bs";
// AiOutlineInfoCircle,
import ReactLoading from 'react-loading';
import { LineChart, Line, YAxis, XAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import icons from "../../assets/tokenIcons"
import ReactTooltip from "react-tooltip"

// hover
//https://codesandbox.io/s/heuristic-curran-bddeu?fontsize=14&hidenavigation=1&theme=dark

function Newspage() {
  const [subselection, setSubselection] = useState(true)
  const [number, setNumber] = useState(1)
  const [isloading, setIsloading] = useState(true)
  const [events, setEvents] = useState([])
  // const [checkklayswap, setCheckklayswap] = useState(true)
  const colorarr = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#3366cc", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300"]
  // const colorObj = {
  //   "stable": "#3366cc",
  //   "klay": "#dc3912",
  //   "other": "#6633cc"
  // }
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

  // const [chartdata, setChartdata] = useState([{
  //   "name": "-"
  // }]);

  const [tempchart, setTempchart] = useState([{
    "name": "-"
  }]);

  const [hundredgroup, setHundredgroup] = useState(["Klayswap"])
  const [fiftygroup, setFiftygroup] = useState([])
  const [tengroup, setTengroup] = useState([])

  useEffect(() => {
    loadtvl()
    loadchart()
    // loadWallet()
  }, [])

  // const loadWallet = async () => {
  //   const accounts = await window.klaytn.enable()
  //   const account = accounts[0]
  //   console.log(account)
  // }

  // useEffect(() => {
  //   loadchart()
  // }, [checkklayswap])

  useEffect(() => {
    chartRebuild()
    // console.log("hundredgroup", hundredgroup)
  }, [number])

  const chartRebuild = async () => {
    // console.log(tempchart)
  }



  const loadchart = async () => {
    const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/testapi"
    await axios.get(url).then(function (response) {
      // console.log("response", response)
      let tempArr = response.data.body.Items;
      let tempKeys = Object.keys(tempArr[0]);

      for (let i = 0; i < tempArr.length; i++) {
        tempKeys.forEach((tempkey) => {
          if (tempkey !== "date") {
            tempArr[i][tempkey] = (tempArr[i][tempkey] / 1000000).toFixed(0)
          }
        })
      }

      // console.log("after", tempArr)

      tempArr.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      })

      // console.log("tempArr", tempArr)

      // setChartdata(tempArr)

      // let tempArray = []

      // tempArr.forEach((arr)=>{
      //   Object.keys(arr).forEach((kk)=>{
      //     tempArray.push({
      //       "proj": kk,
      //       "TVL": arr[kk]
      //     })
      //   })
      // })
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

      let hundredClub = tempArr.filter((arr) => arr.tvl > 100000000)
      // console.log("hundredClub", hundredClub)
      let temphund = []
      hundredClub.forEach((ele) => {
        temphund.push(ele.proj)
      })

      let fiftyClub = tempArr.filter((arr) => arr.tvl > 50000000 && arr.tvl < 100000000)
      let tempfif = []
      fiftyClub.forEach((ele) => {
        tempfif.push(ele.proj)
      })

      let tenClub = tempArr.filter((arr) => arr.tvl > 10000000 && arr.tvl < 50000000)
      let tempten = []
      tenClub.forEach((ele) => {
        tempten.push(ele.proj)
      })


      setHundredgroup(temphund)
      setFiftygroup(tempfif)
      setTengroup(tempten)

      console.log("responseObj", responseObj)
      // let tempRatio = []

      responseObj.data.forEach((ress) => {
        if (ress.pool !== undefined) {
          ress.pool.ratioTVL.sort((function (a, b) {
            return b.ratio - a.ratio
          }))
        }
      })

      setTvldata(responseObj)

      // 리스트뷰로 upcoming events 를 나열한다.
      // upcoming 


      // schedule upload

      // console.log(Number(aa.poolRatio[i].ratio) + Number(aa.poolRatio[i - 1].ratio))

      // for (let i = 1; i < tempRatio.length; i++) {
      //   tempRatio[i].chartRatio = tempRatio[i - 1].poolRatio + tempRatio[i].poolRatio
      // }

      // console.log(tempRatio)

      // tempRatio.forEach((aa) => {
      //   aa.poolRatio.sort(function (a, b) {
      //     return b.ratio - a.ratio
      //   })
      // })

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

  // const onshow = () => {
  //   setCheckklayswap(!checkklayswap)
  // }

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



  const mesherTime = async (e) => {
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `https://xa52gqnbwd.execute-api.ap-northeast-2.amazonaws.com/default/myAccounting`,
      data: {
        user: "klaylabs",
        datetime: "2021-10-12T10:33:111Z",
        country: "mesherTime",
        price: 1,
        weight: 1,
      },
    }).then((res) => {
      console.log(res);
      window.location.href = "https://medium.com/mesher/mesher-%EC%83%88%EB%A1%9C%EC%9A%B4-%EB%A9%94%ED%83%80%EB%B2%84%EC%8A%A4-a099fdfcf0c3"

    });
  }


      const vevefinance = async (e) => {
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `https://xa52gqnbwd.execute-api.ap-northeast-2.amazonaws.com/default/myAccounting`,
      data: {
        user: "klaylabs",
        datetime: "2021-10-12T10:33:111Z",
        country: "vevefinance",
        price: 1,
        weight: 1,
      },
    }).then((res) => {
      console.log(res);
      window.location.href = "https://docs.veve.finance/"

    });
  }
  

  const KLAYDICE = async (e) => {
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `https://xa52gqnbwd.execute-api.ap-northeast-2.amazonaws.com/default/myAccounting`,
      data: {
        user: "klaylabs",
        datetime: "2021-10-12T10:33:111Z",
        country: "KLAYDICE",
        price: 1,
        weight: 1,
      },
    }).then((res) => {
      console.log(res);
      window.location.href = "https://www.klaydice.io/"

    });
  }
  
  


  return (
    <>

      <div style={{ marginTop: "0px", paddingTop: "0px" }}>
        <Topdash>
          <EventCard>
            <NewsTicker
              rowHeight={18}
              maxRows={1}
              speed={300}
              direction={Directions.UP}
              duration={4000}>
              <div style={{ fontFamily: "OpenSans-Medium", fontSize: "15px", color: "#316395", height: "20px" }} onClick={mesherTime}> Launching ) Mesher time capsule (May, TBA) </div>
              <div style={{ fontFamily: "OpenSans-Medium", fontSize: "15px", color: "#316395", height: "20px" }} onClick={vevefinance}> Launching ) VEVE finance (TBA) </div>
              <div style={{ fontFamily: "OpenSans-Medium", fontSize: "15px", color: "#316395", height: "20px" }} onClick={KLAYDICE}> IDO ) KLAYDICE ( TBA ) </div>
            </NewsTicker>
          </EventCard>
        </Topdash >
      </div>



      <Topdash>
        <Row>
          <Leftcolumn>
            <Topcard>
              <Containersub style={{ margin: "15px" }}>
                <div>
                  <span style={{ textAlign: "left", fontFamily: "OpenSans-Medium", fontSize: "16px" }}> Total Value Locked (USD) </span>
                  <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px", color: "#316395" }}> {transnumber()} </span>
                </div>
              </Containersub>
            </Topcard>
          </Leftcolumn>
          <Rightcolumn>
            <Topcard>
              <Containersub style={{ margin: "15px" }}>
                <div>
                  <span style={{ textAlign: "left", fontFamily: "OpenSans-Medium", fontSize: "16px" }}> Change (24h) </span>
                  <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px" }}>
                    {tvldata.total.difftwo > 0 ?
                      <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px", color: "red" }}>+{tvldata.total.difftwo}%</span> :
                      <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px", color: "blue" }}>{tvldata.total.difftwo}%</span>}
                  </span>
                </div>
              </Containersub>
            </Topcard>
          </Rightcolumn>

        </Row>
      </Topdash>

      <Chartcover>
        <TemplateBlockinner>TVL trend (M$)
            <Pagination>
            <PA href="#!" onClick={minusNumber}>&laquo;</PA>
            <PC href="#!" style={{ width: "100px", textAlign: "center" }}>{number === 1 ? <>TOTAL</> : number === 2 ? <>OVER 100M</> : number === 3 ? <>50~100M</> : <>10~50M</>}</PC>
            <PA href="#1" onClick={plusNumber}>&raquo;</PA>
          </Pagination>
        </TemplateBlockinner>

        <div style={{ marginLeft: "7px", marginRight: "7px", paddingTop: "5px" }}>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              className="mx-auto"
              data={tempchart}
            >
              <XAxis dataKey="date" stroke="#efefef" tick={{ fontSize: 10, fill: '#000000' }} />

              {
                number === 1 ?
                  <>
                    <YAxis domain={['dataMin - 100', 'dataMax + 100']} axisLine={false} tickLine={false} mirror={true} style={{ fontSize: "12px" }} tickFormatter={tick => {
                      return tick.toLocaleString();
                    }} />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="linear" stroke={colorarr[0]} dataKey="KCT-Total" strokeWidth={1.5} isAnimationActive={false} />
                  </> :
                  number === 2 ?
                    <>
                      <YAxis domain={['dataMin - 100', 'dataMax + 100']} axisLine={false} tickLine={false} mirror={true} style={{ fontSize: "12px" }} tickFormatter={tick => {
                        return tick.toLocaleString();
                      }} />
                      <Tooltip />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      {
                        hundredgroup.map((hundred, index) => {
                          return <Line type="linear" stroke={colorarr[index]} dataKey={hundred} strokeWidth={1.5} isAnimationActive={false} />
                        })
                      }

                    </>
                    :
                    number === 3 ?
                      <>
                        <YAxis domain={['dataMin - 20', 'dataMax + 10']} axisLine={false} tickLine={false} mirror={true} style={{ fontSize: "12px" }} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        {
                          fiftygroup.map((fifty, index) => {
                            return <Line type="linear" stroke={colorarr[index]} dataKey={fifty} strokeWidth={1.5} isAnimationActive={false} />
                          })
                        }
                        <Legend wrapperStyle={{ fontSize: "12px" }} />

                      </> :
                      <>
                        <YAxis domain={['dataMin - 20', 'dataMax + 10']} axisLine={false} tickLine={false} mirror={true} style={{ fontSize: "12px" }} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        {
                          tengroup.map((ten, index) => {
                            return <Line type="linear" stroke={colorarr[index]} dataKey={ten} strokeWidth={1.5} isAnimationActive={false} />
                          })
                        }
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                      </>
              }


            </LineChart>
          </ResponsiveContainer>
        </div>
      </Chartcover>


      <Container>
        <Item primary={subselection} onClick={() => setSubselection(true)} style={{ cursor: "pointer" }}><BsFillSafeFill style={{ verticalAlign: "top" }} size="17" /><span style={{ fontSize: "20px" }}>{" "}TVL</span></Item>
        <Item primary={!subselection} onClick={() => setSubselection(false)} style={{ cursor: "pointer" }}><BsCurrencyBitcoin style={{ verticalAlign: "top" }} size="20" /><span style={{ fontSize: "18px" }}>TOKEN</span></Item>
      </Container>


      {
        subselection ?

          <TodoTemplateBlock>
            {isloading ? <ReactLoading type="cubes" color="#F0E9D2" height={'20%'} width={'20%'} className="loader" /> :
              <>
                <div className="tablecss" style={{ margin: "20px" }}>
                  <table>
                    <thead>
                      <tr style={{ height: "40px", borderBottom: "2px solid black " }}>
                        <Th className="head" style={{ width: "30px", textAlign: "left" }}>#</Th>
                        <Tdp className="head">Project</Tdp>
                        <Tdc className="content" style={{ width: "200px" }}>Chain</Tdc>
                        <Tdc className="content" style={{ width: "200px" }}>Category</Tdc>
                        <Td className="content" style={{ width: "200px", textAlign: "right" }}>TVL($)</Td>
                        {/* <Td className="content" style={{ width: "50px", textAlign: "right" }}></Td> */}
                        {/* <Td className="content" style={{ width: "300px", textAlign: "right" }}>Breakdown</Td> */}
                        <Td className="content" style={{ width: "200px", textAlign: "right" }}>1day</Td>
                        <Td className="content" style={{ width: "200px", textAlign: "right" }}>7days</Td>
                        <Tdc className="content" style={{ width: "200px", textAlign: "right" }}>M/S</Tdc>

                      </tr>
                    </thead>
                    <tbody>

                      {tvldata.data.length === 0 ? <div>Loading</div> :
                        tvldata.data.map((tvld, index) => (
                          <Tr style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4 " }}>
                            <Th className="head" style={{ width: "30px", textAlign: "left" }}>{index + 1}
                              {tvld.rankdiff === 0 ? <span style={{ fontSize: "14px", color: "black" }}>(-)</span> :
                                tvld.rankdiff > 0 ? <span style={{ fontSize: "14px", color: "red" }}>(&uarr;{tvld.rankdiff})</span> :
                                  <span style={{ fontSize: "14px", color: "blue", verticalAlign: "middle" }}>(&darr;{Math.abs(Number(tvld.rankdiff))})</span>
                              }
                            </Th>
                            <Tdpd className="head" style={{ whiteSpace: "nowrap" }}>
                              <Link to={`/project/${tvld.proj}`}>
                                <img src={icons[tvld.proj]} alt="logo" height="25px" width="25px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                <span style={{ padding: "7px", whiteSpace: "nowrap", paddingLeft:"10px" }}>{tvld.proj}</span>
                              </Link>
                            </Tdpd>
                            <Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}>{tvld.cat}</Tdc>
                            <Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}>{tvld.chain}</Tdc>
                            {/* <Td style={{ width: "100px", textAlign: "right" }}>{tvld.tvl.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Td> */}
                            {/* <Td className="content" style={{ width: "300px", textAlign: "right" }}>
                            {tvld.tvl.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                          </Td> */}
                            <Td className="content" style={{ width: "200px", textAlign: "right" }}>
                              {tvld.tvl > 1000000000 ?
                                <span> {Number(tvld.tvl / 1000000000).toFixed(1)}B </span> :
                                tvld.tvl > 1000000 ?
                                  <span> {Number(tvld.tvl / 1000000).toFixed(0)}M </span> :
                                  tvld.tvl > 1000 ?
                                    <span> {Number(tvld.tvl / 1000).toFixed(0)}K </span> :
                                    <span> Number(tvld.tvl / 1000).toFixed(0)</span>
                              }
                            </Td>
                            {/* <Td className="content" style={{ width: "50px", textAlign: "right" }}>
                              {tvld.notification !== undefined ?
                                <>
                                  <a href='#!' data-for={tvld.proj} data-tip={tvld.notification}><AiOutlineInfoCircle /></a>
                                  <ReactTooltip id={tvld.proj} border multiline={true} data-border={true} place="top" aria-haspopup='true' type="light" effect="solid">
                                    <P>Why is the Number different?</P>
                                    <P>{tvld.proj} : {tvld.notification.project} </P>
                                    <P>Klaylabs : {tvld.notification.klaylabs} </P>
                                  </ReactTooltip>
                                </> :
                                <></>
                              }
                            </Td> */}
                            {/* <Tdc className="head" style={{ width: "300px", paddingLeft: "1em" }}>
                            {tvld.pool !== undefined ?
                              <>
                                <svg data-tip data-for={tvld.proj} width='100%' height='25px' style={{ paddingTop: "3px" }}>
                                  <g class='bars' >
                                    {
                                      tvld.pool.chartData.map(ele => ele.tokenName === "stable" || ele.tokenName === "klay" || ele.tokenName === "other" ?
                                        <rect fill={colorObj[ele.tokenName]} width={ele.ratio + "%"} rx="4" ry="4" height='20px'></rect> :
                                        <rect fill="#ff9900" width={ele.ratio + "%"} rx="4" ry="4" height='20px'></rect>
                                      )
                                    }
                                  </g>
                                </svg>
                                <ReactTooltip id={tvld.proj} border multiline={true} data-border={true} place="top" aria-haspopup='true' type="light" effect="solid">
                                  {
                                    tvld.pool.ratioTVL.map(ele => Number(ele.ratio) !== 0 ?
                                      <div>{ele.tokenName} : {ele.ratio}%</div> :
                                      <></>
                                    )
                                  }

                                </ReactTooltip>



                                {/* <ReactTooltip id="foo" border multiline={true} data-border={true} place="top" aria-haspopup='true' type="light" effect="solid">
                                  <P>Why is the Number different?</P>
                                  <P>{tvld.proj} : {tvld.notification.project} </P>
                                  <P>Klaylabs : {tvld.notification.klaylabs} </P>
                                </ReactTooltip>
                              </> :
                              <></>
                            }

                          </Tdc> */}


                            {tvld.difftwo === null ? <Td className="content" style={{ width: "100px", textAlign: "right", color: "gray" }}>-</Td> :
                              tvld.difftwo > 0 ?
                                <Td className="content" style={{ width: "100px", textAlign: "right", color: "red" }}>+{tvld.difftwo.toFixed(0)}%</Td> :
                                <Td className="content" style={{ width: "100px", textAlign: "right", color: "blue" }}>{tvld.difftwo.toFixed(0)}%</Td>
                            }
                            {tvld.diff === null ? <Td className="content" style={{ width: "100px", textAlign: "right", color: "gray" }}>-</Td> :
                              tvld.diff > 0 ?
                                <Td className="content" style={{ width: "200px", textAlign: "right", color: "red" }}>+{tvld.diff}%</Td> :
                                <Td className="content" style={{ width: "200px", textAlign: "right", color: "blue" }}>{tvld.diff}%</Td>
                            }
                            {tvld.MarketShare === null ? <Tdc className="content" style={{ width: "100px", textAlign: "right", color: "gray" }}>-</Tdc> :
                              <Tdc className="content" style={{ width: "200px", textAlign: "right" }}>{tvld.MarketShare.toFixed(2)}%</Tdc>
                            }

                          </Tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </>
            }
          </TodoTemplateBlock> :
          <TodoTemplateBlock>
            <TemplateLastBlock style={{ paddingLeft: "20px", clear: "both", display: "inline-block", float: "right" }}>
              * DATA : Yesterday ({tvldata.refDate}) 10PM
          </TemplateLastBlock>

            {isloading ? <ReactLoading type="cubes" color="#F0E9D2" height={'20%'} width={'20%'} className="loader" /> :
              <>
                <div className="tablecss" style={{ margin: "20px" }}>
                  <table>
                    <thead>
                      <tr style={{ height: "40px", borderBottom: "2px solid black " }}>
                        <Th className="head" style={{ width: "10px", textAlign: "left" }}>#</Th>
                        <Tdpp className="head">Token</Tdpp>
                        {/* <Tdpp className="head">Project</Tdpp> */}
                        <Td className="content" style={{ width: "200px", textAlign: "right" }}>Price</Td>
                        <Td className="content" style={{ width: "200px", textAlign: "right" }}>Holder</Td>
                        <Tdc className="content" style={{ width: "200px", textAlign: "right" }}>Transfer</Tdc>
                      </tr>
                    </thead>

                    <tbody>

                      {tokendata.length === 0 ? <div>Loading</div> :
                        tokendata.map((tvld, index) => (
                          tvld.price === 0 ?
                            <Tr style={{ display: "none" }}>
                              <Td className="head" style={{ width: "20px", textAlign: "center" }}>{index + 1}</Td>
                              <Tdpd className="head">
                                <Link to={`/project/${tvld.project}`}>{tvld.token}<br /><span style={{ fontSize: "12px", color: "gray" }}>{tvld.token}</span></Link>
                              </Tdpd>
                              <Td className="head" style={{ height: "30px", width: "200px", paddingLeft: "1em", textAlign: "right" }}>{Number(tvld.price.price).toFixed(2)}<br />-</Td>
                              {/* <Td style={{ width: "100px", textAlign: "right" }}>{tvld.tvl.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Td> */}
                              <Tdc className="content" style={{ width: "300px", textAlign: "right" }}>{Number(tvld.price.holders).toLocaleString()}</Tdc>
                              <Tdc className="content" style={{ width: "300px", textAlign: "right" }}>{Number(tvld.price.transactions).toLocaleString()}</Tdc>
                              <Tdc className="head" style={{ height: "30px", width: "200px", paddingLeft: "1em", textAlign: "right" }}>{Number(Number(tvld.price.Totalsupply).toFixed(0)).toLocaleString()}</Tdc>
                              <Tdc className="head" style={{ height: "30px", width: "200px", paddingLeft: "1em", textAlign: "right" }}>{Number(Number(tvld.price.price * tvld.price.Totalsupply).toFixed(0)).toLocaleString()}</Tdc>
                            </Tr> :
                            <Tr style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4 " }}>
                              <Td className="head" style={{ width: "10px", textAlign: "center" }}>{index + 1}</Td>
                              <Tdpdd>
                                <img src={icons[tvld.project]} alt="logo" height="25px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                <Link to={`/project/${tvld.project}`}><span style={{ paddingLeft: "10px" }}>{tvld.token}</span><br />
                                  <span style={{ fontSize: "12px", color: "gray" }}>{tvld.project}</span>
                                </Link>
                              </Tdpdd>

                              {/* <Tdpdd>
                            </Tdpdd> */}


                              <Td className="head" style={{ height: "30px", width: "400px", paddingLeft: "1em", textAlign: "right" }}>{Number(tvld.price).toFixed(3)}
                                <br />
                                {tvld.priceDiff > 0 ? <span style={{ fontSize: "13px", color: "red" }}>+{tvld.priceDiff}%</span> :
                                  <span style={{ fontSize: "13px", color: "blue" }}>{tvld.priceDiff}%</span>
                                }
                              </Td>
                              <Td className="content" style={{ width: "400px", textAlign: "right" }}>
                                {Number(tvld.holders).toLocaleString()}
                                <br />
                                {tvld.holderDiff > 0 ? <span style={{ fontSize: "13px", color: "red" }}>+{tvld.holderDiff}%</span> :
                                  <span style={{ fontSize: "13px", color: "blue" }}>{tvld.holderDiff}%</span>
                                }
                              </Td>
                              <Tdc className="content" style={{ width: "300px", textAlign: "right" }}>
                                {Number(tvld.transactions).toLocaleString()}
                                <br />
                                {tvld.transferDiff > 0 ? <span style={{ fontSize: "13px", color: "red" }}>+{tvld.transferDiff}%</span> :
                                  <span style={{ fontSize: "13px", color: "blue" }}>{tvld.transferDiff}%</span>
                                }
                              </Tdc>
                              {/* <Tdc className="head" style={{ height: "30px", width: "200px", paddingLeft: "1em", textAlign: "right" }}>{Number(Number(tvld.price.Totalsupply).toFixed(0)).toLocaleString()}</Tdc> */}
                              {/* <Tdc className="head" style={{ height: "30px", width: "200px", paddingLeft: "1em", textAlign: "right" }}>{Number(Number(tvld.price.price * tvld.price.Totalsupply).toFixed(0)).toLocaleString()}</Tdc> */}
                              {/* <Td style={{ width: "100px", textAlign: "right" }}>{tvld.tvl.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Td> */}
                            </Tr>

                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </>
            }
          </TodoTemplateBlock>
      }
    </>
  );
}

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


const EventCard = styled.div`
  width:100%;
  margin-bottom:10px;
  /* padding-top:10px; */
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-width: 0px;
  overflow-wrap: break-word;
  background-color: #f6f6f5;
  background-clip: border-box;
  border: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  overflow: visible;
  margin-right: 5px;
  
  padding:15px;
  border-radius: 10px;

  &:hover {
    text-decoration:underline;
    color:#3366cc;
  }
  cursor: pointer;



  @media screen and (max-width: 500px){
    padding-top:15px;
    padding-bottom:10px;
    vertical-align:bottom;
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


const P = styled.p`
  text-align: left !important;
`

const Span = styled.span`
    &:hover {
    color:black;
  }
`

const Tdp = styled.td`
  height:25px;
  vertical-align:middle;
  width: 300px;
  padding-left: 2em;
  @media screen and (max-width: 500px){
    padding-left: 1em;
    width: 250px;
  }
`
const Tdpp = styled.td`
  height:25px;
  vertical-align:middle;
  width: 300px;
  padding-left: 3em;
  @media screen and (max-width: 500px){
    padding-left: 30px;
    width: 250px;

  }
`
const Tdpd = styled.td`
  &:hover {
    text-decoration:underline;
    color:#3366cc;
  }
  cursor: pointer;
  height:25px;
  vertical-align:middle;
  width: 400px;
  padding-left: 2em;
  @media screen and (max-width: 500px){
    padding-left: 10px;
    font-size:13px;
    width: 1000px;
  }
`

const Tdpdd = styled.td`
  &:hover {
    text-decoration:underline;
    color:#3366cc;
  }
  height:25px;
  vertical-align:middle;
  width: 400px;
  padding-left: 3em;
  cursor: pointer;
  @media screen and (max-width: 500px){
    padding-left: 30px;
    font-size:13px;
    width: 1000px;
  }
`


const Tr = styled.tr`
  &:hover {
    background-color: #E8E8E8;
  }
`
const Td = styled.td`
  height:25px;
  vertical-align:middle;
`


const Underline = styled.span`
  /* Adapt the colors based on primary prop */
  border-bottom: ${props => props.primary ? "2px solid black" : ""};
  color : ${props => props.primary ? "black" : "gray"};
  padding : 5px;
  font-weight : 900;
  @media screen and (max-width: 500px){
    font-size: 15px;
  }
`;

const Uppercontainer = styled.span`
  width: 900px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
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

  @media screen and (max-width: 500px){
  width: 360px;
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

}
`
const Upperitem = styled.div`
  background-color:white;
  height:25px;
  width:50%;
  padding-top:5px;
  text-align:center;
  @media screen and (max-width: 500px){
  width: 360px;
  text-align:left;
}
`
const Th = styled.th`
  height:25px;
  vertical-align:middle;
  padding-left:5px;
`;

const Tdc = styled.td`
  @media screen and (max-width: 500px){
    display:none;
  }
  height:25px;
  vertical-align:middle;
`;

// const Tdh = styled.td`
//   height:25px;
//   vertical-align:middle;
//   &:hover {
//     text-decoration:underline;
//     color:#3366cc;
//   }

// `;



const TodoTemplateBlock = styled.div`
  width: 900px;
  /* max-height: 1024px; */

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 1px 1px 1px gray;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 16px;
  margin-bottom: 5px;
  padding-left:18px;
  padding-right:20px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;

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
    margin-left:200px;
  }
  
  @media screen and (max-width: 500px){
    width: 360px;
    padding-left:0px;
    padding-right:0px;
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

    .loader {
      margin-left:135px;
    }
    .mobtrans{
      display:none;
    }
    .tablecss{
      font-size:13px;
      
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

const TemplateLastBlock = styled.div`
  width: 900px;
  max-height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  border-radius: 16px;
  padding-top:5px;
  padding-left:7px;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  font-size: 12px;
  color: gray;

  @media screen and (max-width: 500px){
    width: 360px;
    font-size:8px;
  }
`;


const Container = styled.div`
  position: relative;
  width: 900px;
  display: flex;
  margin: 0 auto;
  /* border: solid;
  border-color: gray; */
  justify-content: space-enenly;
  border-radius: 8px;
  margin-top: 15px;
  /* border-width:1px; */
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  flex-direction: row;
  
  @media screen and (max-width: 500px){
  width: 360px;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;

}
`
const Item = styled.div`
  background-color:${props => props.primary ? "white" : ""};
  color:${props => props.primary ? "#316395" : "gray"};
  border-width: 4px;
  border-radius: 8px;
  border-color: ${props => props.primary ? "black" : ""};
  flex-basis: 50%;
  height: 40px;  
  padding-top: 10px;
  display: table-cell;
  vertical-align: middle;
  text-align:center;
  align-self: center;
  @media screen and (max-width: 500px){
  width: 360px;
  }
`

const Chartcover = styled.div`
  background-color: white;
  width: 900px;
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
  @media screen and (max-width: 500px){
    /* width: 100%; */
    width: 360px;
    margin-top: 0px;


    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;

  }
`

// const Cardcover = styled.div`
//   background-color: white;
//   width: 780px;
//   height: 50px;
//   margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
//   border-radius: 10px;
//   @media screen and (max-width: 500px){
//     width: 100%;
//   }
// `

export default Newspage;

// qubit, fleeta 수정
// 추가 코인 검토
// 가격정보로직 개발




// <thead>
// <tr style={{ height: "25px", borderBottom: "1px solid black " }}>
//   <Th className="head" style={{ width: "10px" }}>#</Th>
//   <Td className="head" style={{ width: "300px" }}>Token</Td>
//   <Td className="content" style={{ width: "200px", paddingLeft: "1em", textAlign: "right" }}>price($)</Td>
//   <Td className="content" style={{ width: "200px", textAlign: "right" }}>holders</Td>
//   <Tdc className="content" style={{ width: "200px", textAlign: "right" }}>transfer</Tdc>
//   {/* <Tdc className="content" style={{ width: "200px", textAlign: "right" }}>*Totalsupply</Tdc> */}
//   {/* <Tdc className="content" style={{ width: "200px", paddingLeft: "1em", textAlign: "right" }}>MarketCap($)</Tdc> */}
// </tr>
// </thead>