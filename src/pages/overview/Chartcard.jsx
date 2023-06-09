import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext,useState,useEffect,useRef} from "react";
import * as Styled from "./Chartcard.style"
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";

function Chartcard() {

    const { totalchart,isloading } = useContext(OverviewContext);
    const [range, setRange] = useState(2);
    const [data, setData] = useState([])
    const [startdate, setStartdate] = useState("")
    const [enddate, setEnddate] = useState("")

    useEffect(() => {
        // dataUpdater(range)
        // console.log("rantotalchartge",totalchart)
        // setChartRange()
        setStartdate(totalchart[0].date)
        setEnddate(totalchart[totalchart.length-1].date)

    }, [isloading,range])


    return (
    <>
        <Styled.Chartcover>
            <Chartrange selection={range} startdate={startdate} enddate={enddate} isloading={isloading}/>            
            <ResponsiveContainer width="100%" height={300}>
                {isloading ? 
                    <><Styled.ProductSkeleton /></> :
                    <AreaChart data={totalchart}>
                        <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                        </linearGradient>
                        </defs>

                        <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

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

                        <YAxis
                            dataKey="value"
                            // scale="log"
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

                        <Tooltip content={<CustomTooltip />} />

                        <CartesianGrid opacity={0.15} vertical={false} />
                    </AreaChart>
                }
            </ResponsiveContainer>
        </Styled.Chartcover>
    </>
    );
}

function Chartrange (props) {
    // console.log(props)
    return (
        <>
        <Styled.RangeContainer>
        {props.isloading ? 
        <Styled.Rangedisplay><Styled.SmallSkeleton style={{marginLeft:"-5px"}} width="100px" height="20px" /> </Styled.Rangedisplay> : 
        <Styled.Rangedisplay>'{props.startdate} ~ {props.enddate} </Styled.Rangedisplay>
        }
        </Styled.RangeContainer>
        </>
    )
}

function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <Styled.StyleTooltip>
          <h4>{label}</h4>
          <p style={{color:"white"}}>${(Number(payload[0].value)/1000000).toFixed(2)+"M"}</p>
        </Styled.StyleTooltip>
      );
    }
    return null;
  }


export default Chartcard;
  