import 'App.css';
import GlobalStyles from 'GlobalStyles';
import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const TodoTemplateBlock = styled.div`
  width: 512px;
  max-height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;


const TodoHeadBlock = styled.div`
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 15px;
    float: right;
  }
  .tasks-left {
    color: #20c997;
    font-size: 20px;
    margin-top: 10px;
    font-weight: bold;
    padding-left: 10px;
  }
`;




function App() {

  const [tvldata, setTvldata] = useState({
    refDate: "0000-00-00",
    data: []
  })

  useEffect(() => {
    loadtvl()
  }, [])

  const loadtvl = async () => {
    const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/"
    await axios.get(url).then(function (response) {
      console.log(response.data.body.data)
      let tempArr = response.data.body.data

      tempArr.sort(function (a, b) {
        return a.tvl > b.tvl ? -1 : a.tvl < b.tvl ? 1 : 0;
      })
      console.log(response)


      setTvldata(response.data.body)
      console.log("tvldata", tvldata)
    })
  }

  return (
    <>
      <GlobalStyles />

      <TodoTemplateBlock>
        <TodoHeadBlock>
          <div>
            <span className="tasks-left">TVL : $22B ( +7% / 7days )</span>
            <span className="day">ref: {tvldata.refDate}</span>
          </div>
        </TodoHeadBlock>

        <div style={{ margin: "20px" }}>
          <table>
            <thead>
              <tr style={{ height: "35px", border: "1em" }}>
                <th style={{ width: "50px" }}>Rank</th>
                <td style={{ width: "200px", paddingLeft: "1em" }}>proj</td>
                <td style={{ width: "100px", textAlign: "right" }}>TVL($)</td>
                <td style={{ width: "100px", textAlign: "right" }}>7Dchg</td>
              </tr>
            </thead>
            <tbody>

              {tvldata.data.length == 0 ? <div>Loading</div> :
                tvldata.data.map((tvld, index) => (
                  <tr style={{ height: "35px" }}>
                    <td style={{ width: "50px", textAlign: "center" }}>{index + 1}</td>
                    <td style={{ width: "200px", paddingLeft: "1em" }}>{tvld.proj}</td>
                    <td style={{ width: "100px", textAlign: "right" }}>{tvld.tvl.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                    <td style={{ width: "100px", textAlign: "right" }}>{tvld.diff}%</td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </TodoTemplateBlock>
    </>
  );
}




export default App;
