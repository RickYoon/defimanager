import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext,useState,useEffect,useRef} from "react";
import * as Styled from "./ActiveUsersChart.style"
import {
    ResponsiveContainer,
    AreaChart,
    BarChart,
    XAxis,
    YAxis,
    Area,
    Bar,
    Tooltip,
    CartesianGrid,
    Brush
  } from "recharts";
import Numeral from 'numeral'
import axios from "axios"

function ActiveUsersChart() {

    // const { totalchart,isloading,setIsloading } = useContext(OverviewContext);
    const [isloading, setIsloading] = useState(false)
    const [range, setRange] = useState(2);
    const [data, setData] = useState([
        {
            "date": "19-06",
            "value": "180"
        }])
    const [startdate, setStartdate] = useState("")
    const [enddate, setEnddate] = useState("")
    const [ref,setRef] = useState(0)

    const toK = (num) => {
        return Numeral(num).format('0.[00]a')
      }    


    useEffect(() => {
        dataLoading()
    }, [])

    const dataLoading = async () => {

        setIsloading(true)
        const aa = await axios.get("https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/klaytndau")
        console.log("range", aa.data)
        setData(aa.data.body)
        let temp = []
        aa.data.body.forEach((res)=>{
            temp.push(res.value)
        })
        setRef(Math.max.apply(null, temp))
        setIsloading(false)

    }

    const setChartRange = () => {
        
        // if(range === 3){
        //     // console.log("range1",range)
        //     setData(totalchart)
        //     setStartdate(totalchart[0].date)
        //     setEnddate(totalchart[totalchart.length-1].date)
        // } else if (range ===0){
        //     setData(totalchart.slice(totalchart.length-30,totalchart.length))
        //     setStartdate(totalchart[totalchart.length-30].date)
        //     setEnddate(totalchart[totalchart.length-1].date)
        // } else if (range ===1){
        //     setData(totalchart.slice(totalchart.length-90,totalchart.length))
        //     setStartdate(totalchart[totalchart.length-90].date)
        //     setEnddate(totalchart[totalchart.length-1].date)
        // }else if (range ===2){
        //     if(totalchart.length > 100){
        //         setData(totalchart.slice(totalchart.length-180,totalchart.length))
        //         setStartdate(totalchart[totalchart.length-180].date)
        //         setEnddate(totalchart[totalchart.length-1].date)
        //     } else {
        //         setData(totalchart)
        //         setStartdate(totalchart[0].date)
        //         setEnddate(totalchart[totalchart.length-1].date)
        //     }
        // }
    }    

    const changeRange = (number) => {
        // console.log("data",data)
        // setRange(number)
    }
    

    return (
    <>
        <Styled.Chartcover>
            <Chartrange selection={range} ranger={changeRange} startdate={startdate} enddate={enddate} isloading={isloading}/>            
            <ResponsiveContainer width="100%" height={300}>
                {isloading ? 
                    <><Styled.ProductSkeleton /></> :
                    <BarChart data={data}>
                    <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                        <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                    </linearGradient>
                    </defs>

                    <Bar dataKey="value" stroke="#2451B7" fill="url(#color)" />

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
                        tickFormatter={(tick) => toK(tick)}
                        axisLine={false}
                        tickLine={false}
                        interval="preserveEnd"
                        dataKey="value"
                        minTickGap={80}
                        tickCount={8}
                        yAxisId={0}
                        mirror={true}
                        style={{ fontSize: "14px" }}
                        domain={[0, ref]}
                        // allowDataOverFlow={true}
                        // domain={[ 0, dataMax => (100000000) ]}    
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                    <CartesianGrid opacity={0.15} vertical={false} />
                    <Brush dataKey="date" height={30} stroke="#000" />
                    </BarChart>
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
        <Styled.Rangedisplay>Daily Active Users </Styled.Rangedisplay>
        }
        {/* <Styled.RangeControlBox>
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
            </Styled.RangeControlBox> */}
        </Styled.RangeContainer>
        </>
    )
}

function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <Styled.StyleTooltip>
          <h4>{label}</h4>
          <p>${payload[0].value > 1000000 ?
          (payload[0].value/1000000).toFixed(2)+"M" :
          payload[0].value > 1000 ?
          (payload[0].value/1000).toFixed(2)+"K" :
          (payload[0].value).toFixed(2)}</p>
        </Styled.StyleTooltip>
      );
    }
    return null;
  }


export default ActiveUsersChart;
  