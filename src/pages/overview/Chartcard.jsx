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
        setChartRange()
    }, [isloading,range])

    const setChartRange = () => {
        
        if(range === 3){
            // console.log("range1",range)
            setData(totalchart)
            setStartdate(totalchart[0].date)
            setEnddate(totalchart[totalchart.length-1].date)
        } else if (range ===0){
            setData(totalchart.slice(totalchart.length-30,totalchart.length))
            setStartdate(totalchart[totalchart.length-30].date)
            setEnddate(totalchart[totalchart.length-1].date)
        } else if (range ===1){
            setData(totalchart.slice(totalchart.length-90,totalchart.length))
            setStartdate(totalchart[totalchart.length-90].date)
            setEnddate(totalchart[totalchart.length-1].date)
        }else if (range ===2){
            if(totalchart.length > 100){
                setData(totalchart.slice(totalchart.length-180,totalchart.length))
                setStartdate(totalchart[totalchart.length-180].date)
                setEnddate(totalchart[totalchart.length-1].date)
            } else {
                setData(totalchart)
                setStartdate(totalchart[0].date)
                setEnddate(totalchart[totalchart.length-1].date)
            }
        }
    }    

    const changeRange = (number) => {
        setRange(number)
    }

    return (
    <>
        <Styled.Chartcover>
            <Chartrange selection={range} ranger={changeRange} startdate={startdate} enddate={enddate} isloading={isloading}/>            
            <ResponsiveContainer width="100%" height={300}>
                {isloading ? 
                    <><Styled.ProductSkeleton /></> :
                    <AreaChart data={data}>
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
                            axisLine={false}
                            tickLine={false}
                            tickCount={8}
                            tickFormatter={(number) => `$${(number/1000000000).toFixed(2)}B`}
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
        <Styled.RangeControlBox>
            {props.selection === 0 ?
                <Styled.Chartbutton primary={true}>
                    <span>1M</span>
                </Styled.Chartbutton> :
                <Styled.Chartbutton primary={false} onClick={() => props.ranger(0)}>
                    <span>1M</span>
                </Styled.Chartbutton>
            }

            {props.selection === 1 ?
                <Styled.Chartbutton primary={true}>
                    <span>3M</span>
                </Styled.Chartbutton> :
                <Styled.Chartbutton primary={false} onClick={() => props.ranger(1)}>
                    <span>3M</span>
                </Styled.Chartbutton>
            }

            {props.selection === 2 ?
                <Styled.Chartbutton primary={true}>
                    <span>6M</span>
                </Styled.Chartbutton> :
                <Styled.Chartbutton primary={false} onClick={() => props.ranger(2)}>
                    <span>6M</span>
                </Styled.Chartbutton>
            }

            {props.selection === 3 ?
                <Styled.Chartbutton primary={true}>
                    <span>9M</span>
                </Styled.Chartbutton> :
                <Styled.Chartbutton primary={false} onClick={() => props.ranger(3)}>
                    <span>9M</span>
                </Styled.Chartbutton>
            }
            </Styled.RangeControlBox>
        </Styled.RangeContainer>
        </>
    )
}

function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <Styled.StyleTooltip>
          <h4>{label}</h4>
          <p>${(payload[0].value/1000000000).toFixed(2)+"B"}</p>
        </Styled.StyleTooltip>
      );
    }
    return null;
  }


export default Chartcard;
  