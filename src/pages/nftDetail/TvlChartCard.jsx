import React, {useContext} from "react";
import * as Styled from "./TvlChartCard.style"
import {
    ResponsiveContainer,
    ScatterChart,
    XAxis,
    YAxis,
    Scatter,
    Tooltip,
    CartesianGrid,
  } from "recharts";
  import Numeral from 'numeral'
  // import { GiLockedChest } from "react-icons/gi";
  import icons from "../../assets/tokenIcons"
import { NftDetailContext } from 'components/context/NftDetailContext';


function TvlChartcard() {

  const { nftdetailinfo, isloading} = useContext(NftDetailContext);

    console.log("nftdetailinfo", nftdetailinfo)

    let classifyData = nftdetailinfo.classify;
      
    return (
    <>
      {nftdetailinfo.classList.map((element)=>{
        return <Chartview data={classifyData[element]} category={element}/>
      })
      }
     </>
    );
}

function Chartview(props){
  let data = props.data;
  let cat = props.category;
  const toK = (num) => {
    return Numeral(num).format('0.[00]a')
  }    

  const moneySymbol = "$"
  // console.log("props",props);
  return (
    <Styled.Chartcover>
    <div style={{float:"right", fontSize:"15px", marginRight:"10px"}}>
      <Styled.Img src={icons["TVL"]} alt="logo" height="30px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> 
      <span style={{fontSize:"12px",marginLeft:"10px"}}>{cat}</span>
    </div>
      <ResponsiveContainer width="100%" height={250}>
          <ScatterChart data={data}>
              <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                  <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
              </linearGradient>
              </defs>

              {/* <Area dataKey="value" stroke="#2451B7" fill="url(#color)" /> */}
              <Scatter fill="#82ca9d" />
              <XAxis
                  tickLine={false}
                  axisLine={false}
                  interval="preserveEnd"
                  minTickGap={120}
                  dataKey="day"
                  stroke="#efefef"
                  tick={{ fontSize: 10, fill: '#000000' }}
                  tickFormatter={(str) => {
                      return str
                  }}
              />

              <YAxis
                  type="number"
                  orientation="left"
                  tickFormatter={(tick) => moneySymbol + toK(tick)}
                  axisLine={false}
                  tickLine={false}
                  interval="preserveEnd"
                  dataKey="priceInUSD"
                  minTickGap={80}
                  tickCount={8}
                  yAxisId={0}
                  mirror={true}
                  style={{ fontSize: "14px" }}
                  // domain={[data.minRef, data.maxRef]}
                  allowDataOverFlow={true}
                  // domain={[ 0, dataMax => (100000000) ]}    
              />

              <Tooltip content={<CustomTooltip />} />

              <CartesianGrid opacity={0.15} vertical={false} />
          </ScatterChart>
      </ResponsiveContainer>
  </Styled.Chartcover>
  )
}

function CustomTooltip({ active, payload, label }) {
  const toK = (num) => {
    return Numeral(num).format('0.[00]a')
  }    

  // let timedate = payload[0].payload.toISOString()

    if (active) {
      console.log("payload",payload[0].payload.datetime.slice(2,10))
      console.log("payload",payload[0].payload.datetime.slice(11,16))

      const moneySymbol = "$"
          return (
        <Styled.StyleTooltip>
          <p>{"Time : " + payload[0].payload.datetime.slice(2,10) + " " + payload[0].payload.datetime.slice(11,16)}</p>
          <p>{"Market : " + payload[0].payload.market}</p>
          <p>{"itemId : # " + payload[0].payload.itemId}</p>
          <p>{"price USD : " + payload[0].payload.priceInUSD.toFixed(1) + " $"}</p>
          <p>{"price Klay : " + payload[0].payload.priceInKlay.toFixed(0)+ " Klay"}</p>
          <p>{"price KRW : " + Number((Number(payload[0].payload.priceInUSD) * 1400).toFixed(0)).toLocaleString() + " 원"}</p>
        </Styled.StyleTooltip>
      );
    }
    return null;
  }


export default TvlChartcard;
  