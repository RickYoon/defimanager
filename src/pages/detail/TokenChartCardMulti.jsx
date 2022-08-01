import { DetailContext } from 'components/context/DetailContext';
import React, {useContext} from "react";
import * as Styled from "./TvlChartCard.style"
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";
  import Numeral from 'numeral'
  import icons from "../../assets/tokenIcons"


function TokenChartcardMulti(props) {

  const { detailinfo,isloading } = useContext(DetailContext);
  const {pageInfo,refNumber} = props;
  let data = [];

  if(refNumber === 1){
    data = detailinfo.price
  }else {
    data = detailinfo.priceTwo
  }
  const toK = (num) => {
    return Numeral(num).format('0.[00]a')
  }    
  const moneySymbol = "$"
    
    return (
    <>
    {data === undefined ? 
      <></> :
        <Styled.Chartcover>
        <div style={{float:"right", fontSize:"15px", marginRight:"10px"}}>
          <Styled.Img src={icons[detailinfo.tokenList[refNumber-1]]} alt="logo" height="30px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> 
          <span style={{fontSize:"12px",marginLeft:"10px"}}>{detailinfo.tokenList[refNumber-1]}</span>
        </div>

            <ResponsiveContainer width="100%" height={250}>
                {isloading ? 
                    <><Styled.ProductSkeleton /></> :
                
                <AreaChart data={data}>

                    <defs>
                      <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#488A99" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#488A99" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <defs>
                      <linearGradient id="lineColor" x1="0" y1="0" x2="100%" y2="0">
                        <stop offset="0%" stopColor="white" stopOpacity={1} />
                        <stop offset={`${0}%`} stopColor="white" stopOpacity={1} />
                        <stop offset={`${0}%`} stopColor="#488A99" />
                        <stop offset="100%" stopColor="#488A99" />
                      </linearGradient>
                    </defs>

                    
                    <Area dataKey="value" stroke="url(#lineColor)" fill="url(#splitColor)" />  

                    <XAxis
                        tickLine={false}
                        axisLine={false}
                        interval="preserveEnd"
                        minTickGap={120}
                        dataKey="date"
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
                        dataKey="value"
                        minTickGap={80}
                        tickCount={8}
                        yAxisId={0}
                        mirror={true}
                        style={{ fontSize: "14px" }}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <CartesianGrid opacity={0.15} vertical={false} />
                </AreaChart>
                }
            </ResponsiveContainer>
        </Styled.Chartcover>
        }
    </>
    );
}

function CustomTooltip({ active, payload, label }) {

  const toK = (num) => {
    return Numeral(num).format('0.[0000]a')
  }    

  const moneySymbol = "$"

    if (active) {
      return (
        payload[0].value === 0 ?
        <></>
        : 
        <Styled.StyleTooltip>
        <h4>{label}</h4>
        <p>{moneySymbol + toK((payload[0].value))}</p>
      </Styled.StyleTooltip>
      );
    }
    return null;
  }


export default TokenChartcardMulti;
  