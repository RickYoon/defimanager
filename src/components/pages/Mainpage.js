
import styled from 'styled-components';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { AiFillTrophy, AiOutlineInfoCircle } from "react-icons/ai";
// AiOutlineInfoCircle,AiOutlineProfile
import ReactLoading from 'react-loading';
import { LineChart, Line, YAxis, XAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { BsFillSafeFill, BsCurrencyBitcoin } from "react-icons/bs";
import icons from "../../assets/tokenIcons"
import ReactTooltip from "react-tooltip"

// hover
//https://codesandbox.io/s/heuristic-curran-bddeu?fontsize=14&hidenavigation=1&theme=dark

function Main() {
  const [subselection, setSubselection] = useState(true)
  const [number, setNumber] = useState(1)
  const [isloading, setIsloading] = useState(true)
  // const [checkklayswap, setCheckklayswap] = useState(true)
  const colorarr = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#3366cc", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300"]
  const [tvldata, setTvldata] = useState({
    refDate: "2022-00-00",
    total: {
      tvl: 0,
      diff: 0
    },
    data: []
  })

  const [chartdata, setChartdata] = useState([{
    "name": "-"
  }]);

  const [tempchart, setTempchart] = useState([{
    "name": "-"
  }]);

  const [hundredgroup, setHundredgroup] = useState(["Klayswap"])
  const [fiftygroup, setFiftygroup] = useState([])
  const [tengroup, setTengroup] = useState([])

  useEffect(() => {
    loadtvl()
    loadchart()
  }, [])

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

      setChartdata(tempArr)

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
    const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/tvllist"
    await axios.get(url).then(function (response) {
      // console.log(response.data.body.data)
      let tempArr = response.data.body.data.filter(dat => dat.proj !== "KCT-Total")
      let tempTotal = response.data.body.data.filter(dat => dat.proj === "KCT-Total")
      // tempArr = tempArr.filter(dat => dat.proj !== "neuronswap")

      tempArr.sort(function (a, b) {
        return a.tvl > b.tvl ? -1 : a.tvl < b.tvl ? 1 : 0;
      })

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

      setTvldata(responseObj)
      // console.log(responseObj)
      setIsloading(false)
    })
  }

  const transnumber = () => {

    return (
      <>
        {tvldata.total.tvl > 10000000 ?
          <span> ${(tvldata.total.tvl / 1000000000).toFixed(1)}B</span> :
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

  // const changeinfo = e => {
  //   console.log("e.target.id", e.target)

  //   if (e.target.id === "TVL") {
  //     setSubselection(true)
  //   } else if (e.target.id === "TOKEN") {
  //     setSubselection(false)
  //   }
  //   console.log(subselection)

  // }

  return (
    <>
      <SubTemplateBlock style={{ marginTop: "20px", marginBottom: "10px" }}>
        <Underline primary><AiFillTrophy style={{ marginRight: "5px", verticalAlign: "middle" }} />DeFiRank</Underline>
        {/* <Underline style={{ marginLeft: "10px" }} primary={false}><Link to="/news"><AiOutlineProfile style={{ marginRight: "5px", verticalAlign: "middle" }} /><Span style={{ paddingBottom: "10px" }}>News</Span></Link></Underline> */}
        {/* <Underline style={{ marginLeft: "10px" }}><AiFillDollarCircle style={{ verticalAlign: "middle", marginRight: "5px" }} />Stables</Underline>*/}
      </SubTemplateBlock>
      <SubTemplateBlock style={{ fontSize: "12px", color: "gray" }}>refdate: {tvldata.refDate}</SubTemplateBlock>
      <Uppercontainer>
        <Upperitem>
          {tvldata.data.length} projects
        </Upperitem>
        <Upperitem>
          {transnumber()} ({tvldata.total.diff}%/7days)
        </Upperitem>
      </Uppercontainer>

      <Chartcover>
        <TemplateBlockinner>TVL trends (M$)
            <Pagination>
            <PA href="#!" onClick={minusNumber}>&laquo;</PA>
            <PC href="#!" style={{ width: "100px", textAlign: "center" }}>{number === 1 ? <>TOTAL</> : number === 2 ? <>OVER 100M</> : number === 3 ? <>50~100M</> : <>10~50M</>}</PC>
            <PA href="#1" onClick={plusNumber}>&raquo;</PA>
          </Pagination>
        </TemplateBlockinner>

        <ResponsiveContainer width="100%" height={250}>
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
                    {/* <Line type="linear" stroke={colorarr[0]} dataKey="Klayswap" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[1]} dataKey="kleva" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[2]} dataKey="Klaystation" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[3]} dataKey="Kokoa" strokeWidth={1.5} isAnimationActive={false} /> */}
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


                      {/* <Line type="linear" stroke={colorarr[0]} dataKey="klayFi" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[1]} dataKey="PALA" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[2]} dataKey="Klaymore" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[3]} dataKey="Eklipse" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[4]} dataKey="Klaybank" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[5]} dataKey="Claimswap" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[6]} dataKey="i4i" strokeWidth={1.5} isAnimationActive={false} /> */} */}
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


                      {/* <Line type="linear" stroke={colorarr[0]} dataKey="klayFi" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[1]} dataKey="PALA" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[2]} dataKey="Klaymore" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[3]} dataKey="Eklipse" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[4]} dataKey="Klaybank" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[5]} dataKey="Claimswap" strokeWidth={1.5} isAnimationActive={false} />
                    <Line type="linear" stroke={colorarr[6]} dataKey="i4i" strokeWidth={1.5} isAnimationActive={false} /> */} */}
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    </>
            }


            {/* {checkklayswap === true ? <YAxis domain={[0, 100]} axisLine={false} tickLine={false} mirror={true} style={{ fontSize: "12px" }} /> :
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} mirror={true} style={{ fontSize: "12px" }} />} */}
            {/* <YAxis domain={[0, 1500]} axisLine={false} tickLine={false} mirror={true} style={{ fontSize: "12px" }} />
            <Tooltip /> */}
            {/* <Line type="linear" stroke={colorarr[0]} dataKey="Klayswap" strokeWidth={1} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[1]} dataKey="kleva" strokeWidth={1} isAnimationActive={false} />
            <Line type="monotone" stroke={colorarr[2]} dataKey="Klaystation" strokeWidth={1} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[3]} dataKey="Kokoa" strokeWidth={1} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[4]} dataKey="klayFi" strokeWidth={1} isAnimationActive={false} /> */}
            {/* <Line type="linear" stroke={colorarr[1]} dataKey="klayFi" strokeWidth={1} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[2]} dataKey="PALA" strokeWidth={1} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[3]} dataKey="Klaymore" strokeWidth={1} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[4]} dataKey="Eklipse" strokeWidth={1} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[5]} dataKey="Klaybank" strokeWidth={1} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[6]} dataKey="Claimswap" strokeWidth={1} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[7]} dataKey="i4i" strokeWidth={1} isAnimationActive={false} /> */}
            {/* <Line type="linear" stroke={colorarr[8]} dataKey="Kronosdao" strokeWidth={1} isAnimationActive={false} /> */}
            {/* <Line type="linear" stroke={colorarr[7]} dataKey="KCT-Total" strokeWidth={1.5} isAnimationActive={false} /> */} */}





          </LineChart>
        </ResponsiveContainer>
      </Chartcover>


      <Container>
        <Item primary={subselection} onClick={() => setSubselection(true)} style={{ cursor: "pointer" }}><BsFillSafeFill style={{ verticalAlign: "top" }} size="17" /><span style={{ fontSize: "20px", marginLeft: "5px" }}>TVL</span></Item>
        <Item primary={!subselection} onClick={() => setSubselection(false)} style={{ cursor: "pointer" }}><BsCurrencyBitcoin style={{ verticalAlign: "top" }} size="20" /><span style={{ fontSize: "18px" }}>TOKEN</span></Item>
      </Container>


      {subselection ?

        <TodoTemplateBlock>
          {isloading ? <ReactLoading type="cubes" color="#F0E9D2" height={'20%'} width={'20%'} className="loader" /> :
            <>
              <div className="tablecss" style={{ margin: "20px" }}>
                <table>
                  <thead>
                    <tr style={{ height: "40px", borderBottom: "2px solid black " }}>
                      <Th className="head" style={{ width: "10px", textAlign: "left" }}>#</Th>
                      <Tdp className="head">Project</Tdp>
                      <Tdc className="content" style={{ width: "200px", paddingLeft: "1em" }}>Category</Tdc>
                      <Td className="content" style={{ width: "200px", textAlign: "right" }}>TVL($)</Td>
                      <Td className="content" style={{ width: "50px", textAlign: "right" }}></Td>
                      {/* <Td className="content" style={{ width: "200px", textAlign: "right" }}>Breakdown</Td> */}
                      <Td className="content" style={{ width: "200px", textAlign: "right" }}>1day</Td>
                      <Td className="content" style={{ width: "200px", textAlign: "right" }}>7days</Td>
                      <Tdc className="content" style={{ width: "200px", textAlign: "right" }}>M/S</Tdc>

                    </tr>
                  </thead>
                  <tbody>

                    {tvldata.data.length === 0 ? <div>Loading</div> :
                      tvldata.data.map((tvld, index) => (
                        <Tr style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4 " }}>
                          <Th className="head" style={{ width: "10px", textAlign: "left" }}>{index + 1}
                            {tvld.rankdiff === 0 ? <span style={{ fontSize: "14px", color: "black" }}>(-)</span> :
                              tvld.rankdiff > 0 ? <span style={{ fontSize: "14px", color: "red" }}>(&uarr;{tvld.rankdiff})</span> :
                                <span style={{ fontSize: "14px", color: "blue", verticalAlign: "middle" }}>(&darr;{Math.abs(Number(tvld.rankdiff))})</span>
                            }
                          </Th>
                          <Tdpd className="head" style={{ whiteSpace: "nowrap" }}>
                            <Link to={`/project/${tvld.proj}`}>
                              <img src={icons[tvld.proj]} alt="logo" height="25px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                              <span style={{ padding: "7px", whiteSpace: "nowrap" }}>{tvld.proj}</span>
                            </Link>
                          </Tdpd>
                          <Tdc className="head" style={{ width: "200px", paddingLeft: "1em" }}>{tvld.cat}</Tdc>
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
                          <Td className="content" style={{ width: "50px", textAlign: "right" }}>
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
                          </Td>
                          {/* <Tdc className="head" style={{ width: "200px", paddingLeft: "1em" }}>
                            <svg width='100%' height='20px' style={{ paddingTop: "3px" }}>
                              <g class='bars'>
                                <rect fill='#3d5599' width='100%' rx="10" ry="10" height='15px'></rect>
                                <rect fill='#cb4d3e' width='70%' rx="10" ry="10" height='15px'></rect>
                                <rect fill='red' width='50%' rx="10" ry="10" height='15px'></rect>
                              </g>
                            </svg>
                          </Tdc> */}


                          {tvld.difftwo === null ? <Td className="content" style={{ width: "300px", textAlign: "right", color: "gray" }}>-</Td> :
                            tvld.difftwo > 0 ?
                              <Td className="content" style={{ width: "300px", textAlign: "right", color: "red" }}>+{tvld.difftwo}%</Td> :
                              <Td className="content" style={{ width: "300px", textAlign: "right", color: "blue" }}>{tvld.difftwo}%</Td>
                          }
                          {tvld.diff === null ? <Td className="content" style={{ width: "300px", textAlign: "right", color: "gray" }}>-</Td> :
                            tvld.diff > 0 ?
                              <Td className="content" style={{ width: "300px", textAlign: "right", color: "red" }}>+{tvld.diff}%</Td> :
                              <Td className="content" style={{ width: "300px", textAlign: "right", color: "blue" }}>{tvld.diff}%</Td>
                          }
                          {tvld.MarketShare === null ? <Tdc className="content" style={{ width: "300px", textAlign: "right", color: "gray" }}>-</Tdc> :
                            <Tdc className="content" style={{ width: "300px", textAlign: "right" }}>{tvld.MarketShare.toFixed(2)}%</Tdc>
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
                      <Tdpp className="head">Project</Tdpp>
                      <Td className="content" style={{ width: "200px", textAlign: "right" }}>Price</Td>
                      <Td className="content" style={{ width: "200px", textAlign: "right" }}>Holder</Td>
                      <Tdc className="content" style={{ width: "200px", textAlign: "right" }}>Transfer</Tdc>
                    </tr>
                  </thead>

                  <tbody>

                    {tvldata.data.length === 0 ? <div>Loading</div> :
                      tvldata.data.map((tvld, index) => (
                        tvld.price.price === 0 ?
                          <Tr style={{ display: "none" }}>
                            <Td className="head" style={{ width: "10px", textAlign: "center" }}>{index + 1}</Td>
                            <Tdpd className="head">
                              <Link to={`/project/${tvld.proj}`}>{tvld.token}<br /><span style={{ fontSize: "12px", color: "gray" }}>{tvld.proj}</span></Link>
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
                              <img src={icons[tvld.proj]} alt="logo" height="25px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />

                              <Link to={`/project/${tvld.proj}`}>{tvld.token}<br /><span style={{ fontSize: "12px", color: "gray" }}>{tvld.proj}</span></Link>
                            </Tdpdd>


                            <Td className="head" style={{ height: "30px", width: "400px", paddingLeft: "1em", textAlign: "right" }}>{Number(tvld.price.price).toFixed(2)}
                              <br />
                              {tvld.priceDiff > 0 ? <span style={{ fontSize: "13px", color: "red" }}>+{tvld.priceDiff}%</span> :
                                <span style={{ fontSize: "13px", color: "blue" }}>{tvld.priceDiff}%</span>
                              }
                            </Td>
                            <Td className="content" style={{ width: "400px", textAlign: "right" }}>
                              {Number(tvld.price.holders).toLocaleString()}
                              <br />
                              {tvld.holderDiff > 0 ? <span style={{ fontSize: "13px", color: "red" }}>+{tvld.holderDiff}%</span> :
                                <span style={{ fontSize: "13px", color: "blue" }}>{tvld.holderDiff}%</span>
                              }
                            </Td>
                            <Tdc className="content" style={{ width: "300px", textAlign: "right" }}>
                              {Number(tvld.price.transactions).toLocaleString()}
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
      <TemplateLastBlock>- 수집시간 차이로 인한 오차로 추이를 보는 용도를 권합니다.</TemplateLastBlock>
      <TemplateLastBlock>- 멀티체인 프로젝트는 klaytn 체인 TVL 만 합산했습니다.</TemplateLastBlock>
      <TemplateLastBlock>- 수치는 매일 한번 업데이트 됩니다.</TemplateLastBlock>
      <TemplateLastBlock></TemplateLastBlock>

      <Copyright>Copyright 2022. KLAYlabs. All rights reserved.</Copyright>
    </>
  );
}

const PC = styled.div`
  color: black;
  float: left;
  padding: 4px 8px;
  text-decoration: none;
  font-size:14px;
  border: 1px solid #ddd;
`

const PA = styled.div`
  color: black;
  float: left;
  padding: 4px 8px;
  text-decoration: none;
  font-size:14px;
  transition: background-color .3s;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color:#ddd;
`

const Pagination = styled.div`
  display: inline-block;
`


const P = styled.p`
  text-align: left !important;
`

// const Span = styled.span`
//     &:hover {
//     color:black;
//   }

// `

const Tdp = styled.td`
  height:25px;
  vertical-align:middle;
  width: 300px;
  padding-left: 2em;
  @media screen and (max-width: 500px){
    padding-left: 1em;
  }
`
const Tdpp = styled.td`
  height:25px;
  vertical-align:middle;
  width: 300px;
  padding-left: 3em;
  @media screen and (max-width: 500px){
    padding-left: 30px;
  }
`
const Tdpd = styled.td`
  &:hover {
    text-decoration:underline;
    color:#3366cc;
  }
  height:25px;
  vertical-align:middle;
  width: 400px;
  padding-left: 2em;
  cursor: pointer;
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


  @media screen and (max-width: 500px){
  width: 360px;
  box-shadow: 1px 1px 1px gray;

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
  padding-left:10px;
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
  
  .loader {
    margin-left:200px;
  }
  
  @media screen and (max-width: 500px){
    width: 360px;
    padding-left:0px;
    padding-right:0px;
    box-shadow: 1px 1px 1px gray;

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

const Copyright = styled.div`
  width: 900px;
  max-height: 768px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align:center;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  font-size: 12px;
  color: gray;

  @media screen and (max-width: 500px){
    width: 360px;
  }
`;
const Container = styled.div`
  position: relative;
  width: 900px;
  display: flex;
  margin: 0 auto;
  /* border: solid;
  border-color: gray; */
  justify-content: space-around;
  border-radius: 8px;
  margin-top: 15px;
  /* border-width:1px; */
  box-shadow: 1px 1px 1px 1px gray;


  flex-direction: row;
  @media screen and (max-width: 500px){
  width: 360px;
  box-shadow: 1px 0px 1px 0px gray;

}
`
const Item = styled.div`
  background-color:${props => props.primary ? "white" : ""};
  color:${props => props.primary ? "#316395" : "gray"};
  border-width: 4px;
  border-radius: 8px;
  border-color: ${props => props.primary ? "black" : ""};
  flex-grow:1;
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

// const TodoHeadBlock = styled.div`
//   padding-top: 15px;
//   padding-left: 16px;
//   h1 {
//     margin: 0;
//     font-size: 36px;
//     color: #343a40;
//   }
//   .day {
//     margin-top: 4px;
//     color: #868e96;
//     font-size: 13px;
//     float: right;
//   }
//   .dayy {
//     margin-top: 4px;
//     font-size: 15px;
//   }
//   .tasks-left {
//     font-size: 25px;
//     margin-top: 10px;
//     font-weight: bold;
//     padding-left: 10px;
//   }
//   @media screen and (max-width: 500px){
//     h1 {
//     margin: 0;
//     font-size: 36px;
//     color: #343a40;
//   }

//     .tasks-left {
//       font-size: 15px;
//       margin-top: 10px;
//       font-weight: bold;
//       margin-left: -8px;
//     }
//     .dayy {
//       margin-top: 4px;
//       font-size: 12px;
//     }
//   }
// `;

const Chartcover = styled.div`
  background-color: white;
  width: 900px;
  max-height: 768px;
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  border-radius: 10px;
  padding-top:15px;
  padding-bottom:15px;
  padding-left:20px;
  padding-right:20px;

  margin-top: 10px;
  box-shadow: 1px 1px 1px gray;

  @media screen and (max-width: 500px){
    width: 100%;
    box-shadow: 1px 1px 1px gray;

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

export default Main;

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