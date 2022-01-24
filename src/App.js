import 'App.css';
import GlobalStyles from 'GlobalStyles';
import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BiBook } from "react-icons/bi";
import ReactLoading from 'react-loading';
import { LineChart, Line, YAxis, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function App() {
  const [isloading, setIsloading] = useState(true)
  const [checkklayswap, setCheckklayswap] = useState(true)
  const colorarr = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#3366cc", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300"]
  const [tvldata, setTvldata] = useState({
    refDate: "0000-00-00",
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
          <span> under </span>
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



  return (
    <>
      <GlobalStyles />
      <TemplateBlock>KlayLabs.net
          <span onClick={moveNotion} style={{ cursor: "pointer" }}><BiBook /></span>
      </TemplateBlock>
      <SubTemplateBlock>beta version
      </SubTemplateBlock>
      <Chartcover>
        <TemplateBlockinner>Top 10 trends (M$) - 7days<span style={{ fontSize: "12px" }}><input type="checkbox" checked={checkklayswap} name="klayswapcheck" onClick={onshow} />klayswap 제외</span></TemplateBlockinner>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            className="mx-auto"
            data={chartdata}
          >
            <XAxis dataKey="date" hide={true} />
            <YAxis axisLine={false} tickLine={false} mirror={true} style={{ fontSize: "12px" }} />
            <Tooltip />
            <Legend style={{ fontSize: "12px" }} />
            {checkklayswap === true ? null : <Line type="linear" stroke={colorarr[0]} dataKey="Klayswap" strokeWidth={1} />}
            <Line type="linear" stroke={colorarr[1]} dataKey="kleva" strokeWidth={1} />
            <Line type="linear" stroke={colorarr[2]} dataKey="Klaystation" strokeWidth={1} />
            <Line type="linear" stroke={colorarr[3]} dataKey="klayFi" strokeWidth={1} />
            <Line type="linear" stroke={colorarr[4]} dataKey="Kokoa Finance" strokeWidth={1} />
            <Line type="linear" stroke={colorarr[5]} dataKey="Kronosdao" strokeWidth={1} />
            <Line type="linear" stroke={colorarr[6]} dataKey="Claimswap" strokeWidth={1} />
            <Line type="linear" stroke={colorarr[7]} dataKey="PALA" strokeWidth={1} />
            <Line type="linear" stroke={colorarr[8]} dataKey="Klaymore" strokeWidth={1} />
            <Line type="linear" stroke={colorarr[9]} dataKey="Donkey" strokeWidth={1} />
          </LineChart>
        </ResponsiveContainer>
      </Chartcover>


      <TodoTemplateBlock>


        {isloading ? <ReactLoading type="cubes" color="#F0E9D2" height={'20%'} width={'20%'} className="loader" /> :
          <>
            <TodoHeadBlock>
              <div>
                <span className="tasks-left">total:{transnumber()}</span> <span className="dayy">({tvldata.total.diff}%/7days)</span>
                <span className="day">ref: {tvldata.refDate}</span>
              </div>
            </TodoHeadBlock>

            <div className="tablecss" style={{ margin: "20px" }}>
              <table>
                <thead>
                  <tr style={{ height: "35px" }}>
                    <th className="head" style={{ width: "20px" }}>Rank</th>
                    <td className="head" style={{ width: "50px", paddingLeft: "1em" }}>proj</td>
                    <td className="content" style={{ width: "300px", textAlign: "right" }}>TVL($)</td>
                    <td className="content" style={{ width: "300px", textAlign: "right" }}>1day</td>
                    <td className="content" style={{ width: "300px", textAlign: "right" }}>7days</td>
                  </tr>
                </thead>
                <tbody>

                  {tvldata.data.length === 0 ? <div>Loading</div> :
                    tvldata.data.map((tvld, index) => (
                      <tr style={{ height: "35px" }}>
                        <td className="head" style={{ width: "20px", textAlign: "center" }}>{index + 1}</td>
                        <td className="head" style={{ width: "50px", paddingLeft: "1em" }}>{tvld.proj}</td>
                        {/* <td style={{ width: "100px", textAlign: "right" }}>{tvld.tvl.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td> */}
                        <td className="content" style={{ width: "300px", textAlign: "right" }}>{tvld.tvl.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                        {tvld.difftwo === null ? <td className="content" style={{ width: "300px", textAlign: "right", color: "gray" }}>-</td> :
                          tvld.difftwo > 0 ?
                            <td className="content" style={{ width: "300px", textAlign: "right", color: "red" }}>+{tvld.difftwo}%</td> :
                            <td className="content" style={{ width: "300px", textAlign: "right", color: "blue" }}>{tvld.difftwo}%</td>
                        }
                        {tvld.diff === null ? <td className="content" style={{ width: "300px", textAlign: "right", color: "gray" }}>-</td> :
                          tvld.diff > 0 ?
                            <td className="content" style={{ width: "300px", textAlign: "right", color: "red" }}>+{tvld.diff}%</td> :
                            <td className="content" style={{ width: "300px", textAlign: "right", color: "blue" }}>{tvld.diff}%</td>
                        }
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </>
        }
      </TodoTemplateBlock>
      <TemplateLastBlock>-수집시간에 따른 오차가 발생함으로 추이를 보는 용도를 권합니다.</TemplateLastBlock>
      <TemplateLastBlock>-수치는 매일 한번 업데이트 됩니다.</TemplateLastBlock>

    </>
  );
}


const TodoTemplateBlock = styled.div`
  width: 512px;
  max-height: 1024px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 16px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  .loader {
    margin-left:200px;
  }
  
  @media screen and (max-width: 500px){
    width: 350px;
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

const TemplateBlock = styled.div`
  width: 512px;
  max-height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  border-radius: 16px;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  font-size: 25px;

  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  @media screen and (max-width: 500px){
    width: 350px;
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
  width: 512px;
  max-height: 768px;
  margin: 0 auto;
  padding-bottom: 10px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */

  @media screen and (max-width: 500px){
    width: 350px;
    font-size: 20px;
  }
`;

const TemplateLastBlock = styled.div`
  width: 512px;
  max-height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  border-radius: 16px;
  padding-top:5px;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  font-size: 12px;
  color: gray;

  @media screen and (max-width: 500px){
    width: 350px;
  }
`;

const TodoHeadBlock = styled.div`
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 12px;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 12px;
    float: right;
  }
  .dayy {
    margin-top: 4px;
    font-size: 15px;
  }
  .tasks-left {
    font-size: 20px;
    margin-top: 10px;
    font-weight: bold;
    padding-left: 10px;
  }
  @media screen and (max-width: 500px){
    .tasks-left {
      font-size: 15px;
      margin-top: 10px;
      font-weight: bold;
      margin-left: -8px;
    }
    .dayy {
      margin-top: 4px;
      font-size: 12px;
    }
  }
`;

const Chartcover = styled.div`
  background-color: white;
  width: 512px;
  max-height: 768px;
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  border-radius: 10px;
  padding : 10px;
  @media screen and (max-width: 500px){
    width: 100%;
  }

`

export default App;
