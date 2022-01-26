import 'App.css';
import GlobalStyles from 'GlobalStyles';
import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BiBook } from "react-icons/bi";
import { AiFillTrophy } from "react-icons/ai";
// import { AiFillTrophy, AiFillDollarCircle } from "react-icons/ai";
// import { BsFillSafeFill, BsCurrencyBitcoin } from "react-icons/bs";
import ReactLoading from 'react-loading';
import { LineChart, Line, YAxis, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function App() {
  // const [subselection, setSubselection] = useState(true)
  const [isloading, setIsloading] = useState(true)
  const [checkklayswap, setCheckklayswap] = useState(true)
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

  useEffect(() => {
    loadtvl()
    loadchart()
  }, [])

  useEffect(() => {
    loadchart()
  }, [checkklayswap])


  const loadchart = async () => {
    const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/tvlChart"
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
      // console.log(response)
      // console.log("tempTotal", tempTotal)

      const responseObj = {
        refDate: response.data.body.refDate,
        total: tempTotal[0],
        data: tempArr
      }

      setTvldata(responseObj)
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

  const moveNotion = () => {
    window.location.href = "https://rebrand.ly/uqqlzva"
  }

  const onshow = () => {
    setCheckklayswap(!checkklayswap)
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
      <GlobalStyles />
      <TemplateBlock>KlayLabs.net
          <span onClick={moveNotion} style={{ cursor: "pointer" }}><BiBook /></span>
      </TemplateBlock>
      <SubTemplateBlock>beta version
      </SubTemplateBlock>
      <SubTemplateBlock style={{ marginTop: "10px", marginBottom: "10px" }}>
        <Underline primary><AiFillTrophy style={{ marginRight: "5px" }} />DefiRank</Underline>
        {/* <Underline style={{ marginLeft: "10px" }}><AiFillDollarCircle style={{ verticalAlign: "middle", marginRight: "5px" }} />Stables</Underline>
        <Underline style={{ marginLeft: "10px" }} primary={true}><AiFillDollarCircle style={{ marginRight: "5px" }} />Others</Underline> */}
      </SubTemplateBlock>
      <SubTemplateBlock style={{ fontSize: "12px", color: "gray" }}>date: {tvldata.refDate}</SubTemplateBlock>

      <Uppercontainer>
        <Upperitem>
          {tvldata.data.length} projects
        </Upperitem>
        <Upperitem> {transnumber()} ({tvldata.total.diff}%/7days)
        </Upperitem>
      </Uppercontainer>



      <Chartcover>
        <TemplateBlockinner>Top 10 trends (M$) - 7days<span style={{ fontSize: "12px" }}><input type="checkbox" checked={checkklayswap} name="klayswapcheck" onClick={onshow} />klayswap 제외</span></TemplateBlockinner>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            className="mx-auto"
            data={chartdata}
          >
            <XAxis dataKey="date" hide={true} />
            {checkklayswap === true ? <YAxis axisLine={false} tickLine={false} mirror={true} style={{ fontSize: "12px" }} /> :
              <YAxis domain={[0, 1300]} axisLine={false} tickLine={false} mirror={true} style={{ fontSize: "12px" }} />}
            <Tooltip />
            <Legend />
            {checkklayswap === true ? null : <Line type="linear" stroke={colorarr[0]} dataKey="Klayswap" strokeWidth={1.5} isAnimationActive={false} />}
            <Line type="linear" stroke={colorarr[1]} dataKey="kleva" strokeWidth={1.5} isAnimationActive={false} />
            <Line type="monotone" stroke={colorarr[2]} dataKey="Klaystation" strokeWidth={1.5} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[3]} dataKey="klayFi" strokeWidth={1.5} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[4]} dataKey="Kokoa Finance" strokeWidth={1.5} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[5]} dataKey="Kronosdao" strokeWidth={1.5} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[6]} dataKey="Claimswap" strokeWidth={1.5} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[7]} dataKey="PALA" strokeWidth={1.5} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[8]} dataKey="Klaymore" strokeWidth={1.5} isAnimationActive={false} />
            <Line type="linear" stroke={colorarr[9]} dataKey="Donkey" strokeWidth={1.5} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </Chartcover>

      {/* <Container>
        <Item primary={subselection} onClick={() => setSubselection(true)} style={{ cursor: "pointer" }}><BsFillSafeFill style={{ verticalAlign: "top" }} size="17" /><span style={{ fontSize: "20px", marginLeft: "5px" }}>TVL</span></Item>
        <Item primary={!subselection} onClick={() => setSubselection(false)} style={{ cursor: "pointer" }}><BsCurrencyBitcoin style={{ verticalAlign: "top" }} size="20" /><span style={{ fontSize: "18px" }}>TOKEN</span></Item>
      </Container> */}

      <TodoTemplateBlock>
        {isloading ? <ReactLoading type="cubes" color="#F0E9D2" height={'20%'} width={'20%'} className="loader" /> :
          <>
            <div className="tablecss" style={{ margin: "20px" }}>
              <table>
                <thead>
                  <tr style={{ height: "25px", borderBottom: "1px solid black " }}>
                    <Th className="head" style={{ width: "10px" }}>#</Th>
                    <Td className="head" style={{ width: "300px", paddingLeft: "1em" }}>Project</Td>
                    <Tdc className="content" className="upper" style={{ width: "200px", paddingLeft: "1em" }}>Category</Tdc>
                    <Td className="content" style={{ width: "200px", textAlign: "right" }}>TVL($)</Td>
                    <Td className="content" style={{ width: "200px", textAlign: "right" }}>1day</Td>
                    <Td className="content" style={{ width: "200px", textAlign: "right" }}>7days</Td>
                  </tr>
                </thead>
                <tbody>

                  {tvldata.data.length === 0 ? <div>Loading</div> :
                    tvldata.data.map((tvld, index) => (
                      <Tr style={{ height: "35px" }}>
                        <Td className="head" style={{ width: "10px", textAlign: "center" }}>{index + 1}</Td>
                        <Td className="head" style={{ width: "300px", paddingLeft: "1em" }}>{tvld.proj}</Td>
                        <Tdc className="head" style={{ width: "200px", paddingLeft: "1em" }}>{tvld.cat}</Tdc>
                        {/* <Td style={{ width: "100px", textAlign: "right" }}>{tvld.tvl.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Td> */}
                        <Td className="content" style={{ width: "300px", textAlign: "right" }}>{tvld.tvl.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Td>
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
                      </Tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </>
        }
      </TodoTemplateBlock>
      <TemplateLastBlock>- 수집시간 차이로 인한 오차로 추이를 보는 용도를 권합니다.</TemplateLastBlock>
      <TemplateLastBlock>- 멀티체인 프로젝트는 klaytn 체인 TVL 만 합산했습니다.</TemplateLastBlock>
      <TemplateLastBlock>- 수치는 매일 한번 업데이트 됩니다.</TemplateLastBlock>
      <Copyright>Copyright 2022. KLAYlabs. All rights reserved.</Copyright>

    </>
  );
}

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
const Th = styled.th`
  height:25px;
  vertical-align:middle;
`;



const Tdc = styled.td`
  @media screen and (max-width: 500px){
    display:none;
    
  }
  height:25px;
  vertical-align:middle;
`;


const TodoTemplateBlock = styled.div`
  width: 780px;
  /* max-height: 1024px; */

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 16px;
  margin-bottom: 5px;
  padding-left:18px;
  padding-right:20px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
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

const TemplateBlock = styled.div`
  width: 780px;
  max-height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  border-radius: 16px;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  font-size: 25px;

  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  @media screen and (max-width: 500px){
    width: 360px;
    font-size: 20px;
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

const TemplateLastBlock = styled.div`
  width: 780px;
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
  width: 780px;
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
// const Container = styled.div`
//   position: relative;
//   width: 780px;
//   display: flex;
//   margin: 0 auto;
//   border: solid;
//   border-color: gray;
//   justify-content: space-around;
//   border-radius: 8px;
//   margin-top: 15px;
//   border-width:2px;

//   flex-direction: row;
//   @media screen and (max-width: 500px){
//   width: 360px;
// }
// `
// const Item = styled.div`
//   background-color:${props => props.primary ? "white" : ""};
//   color:${props => props.primary ? "#316395" : "gray"};
//   border-width: 4px;
//   border-radius: 8px;
//   border-color: ${props => props.primary ? "black" : ""};
//   flex-grow:1;
//   height: 40px;  
//   padding-top: 10px;

//   display: table-cell;
//   vertical-align: middle;
//   text-align:center;
//   align-self: center;
//   @media screen and (max-width: 500px){
//   width: 360px;
//   }
// `

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
  width: 780px;
  max-height: 768px;
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  border-radius: 10px;
  padding-top:15px;
  padding-bottom:15px;
  padding-left:20px;
  padding-right:20px;

  margin-top: 10px;
  @media screen and (max-width: 500px){
    width: 100%;
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

export default App;
