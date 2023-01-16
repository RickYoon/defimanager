import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext,useState,useEffect,useRef} from "react";
import * as Styled from "./ActiveUsersChart.style"
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar
  } from "recharts";

let KRW = [
    { date: '19-06', value: 0 },
    { date: '19-07', value: 0 },
    { date: '19-08', value: 0 },
    { date: '19-09', value: 182.70297959532144 },
    { date: '19-10', value: 251.38948268490807 },
    { date: '19-11', value: 220.24081497777695 },
    { date: '19-12', value: 153.38756435886555 },
    { date: '20-01', value: 146.74427583470927 },
    { date: '20-02', value: 177.20442302239863 },
    { date: '20-03', value: 237.93990428287532 },
    { date: '20-04', value: 1247.956471278282 },
    { date: '20-05', value: 898.528659320363 },
    { date: '20-06', value: 1530.8266047680258 },
    { date: '20-07', value: 201.00813179241737 },
    { date: '20-08', value: 187.69341027287834 },
    { date: '20-09', value: 992.3182166057011 },
    { date: '20-10', value: 667.8173027849081 },
    { date: '20-11', value: 524.7032220275854 },
    { date: '20-12', value: 547.855319348953 },
    { date: '21-01', value: 616.4306591880354 },
    { date: '21-02', value: 585.2917159213293 },
    { date: '21-03', value: 1582.9482422974615 },
    { date: '21-04', value: 4405.136225829871 },
    { date: '21-05', value: 2709.5303005999367 },
    { date: '21-06', value: 1588.419405320814 },
    { date: '21-07', value: 1163.1537861046058 },
    { date: '21-08', value: 1220.1907790143084 },
    { date: '21-09', value: 1943.0894308943089 },
    { date: '21-10', value: 1289.5174708818636 },
    { date: '21-11', value: 1881.2292358803988 },
    { date: '21-12', value: 1837.9281537176273 },
    { date: '22-01', value: 1541.0385259631491 },
    { date: '22-02', value: 1447.9254868755293 },
    { date: '22-03', value: 1538.7858347386173 },
    { date: '22-04', value: 1430.390492359932 },
    { date: '22-05', value: 948.8084730803178 },
    { date: '22-06', value: 542.6998832041479 },
    { date: '22-07', value: 308.7962559708178 },
    { date: '22-08', value: 394.61981683826906 },
    { date: '22-09', value: 310.91885560169123 },
    { date: '22-10', value: 277.6318772592294 },
    { date: '22-11', value: 368.95716489306074 },
    { date: '22-12', value: 241.04068858568917 },
    { date: '23-01', value: 192.1937390740495 }
  ]

  let USD = [
    { date: '19-06', value: 0 },
    { date: '19-07', value: 0 },
    { date: '19-08', value: 0 },
    { date: '19-09', value: 0.15 },
    { date: '19-10', value: 0.21 },
    { date: '19-11', value: 0.19 },
    { date: '19-12', value: 0.13 },
    { date: '20-01', value: 0.13 },
    { date: '20-02', value: 0.15 },
    { date: '20-03', value: 0.2 },
    { date: '20-04', value: 1.02 },
    { date: '20-05', value: 0.74 },
    { date: '20-06', value: 1.24 },
    { date: '20-07', value: 0.17 },
    { date: '20-08', value: 0.16 },
    { date: '20-09', value: 0.84 },
    { date: '20-10', value: 0.57 },
    { date: '20-11', value: 0.46 },
    { date: '20-12', value: 0.5 },
    { date: '21-01', value: 0.57 },
    { date: '21-02', value: 0.52 },
    { date: '21-03', value: 1.41 },
    { date: '21-04', value: 3.91 },
    { date: '21-05', value: 2.43 },
    { date: '21-06', value: 1.43 },
    { date: '21-07', value: 1.03 },
    { date: '21-08', value: 1.06 },
    { date: '21-09', value: 1.68 },
    { date: '21-10', value: 1.09 },
    { date: '21-11', value: 1.6 },
    { date: '21-12', value: 1.55 },
    { date: '22-01', value: 1.3 },
    { date: '22-02', value: 1.2 },
    { date: '22-03', value: 1.28 },
    { date: '22-04', value: 1.18 },
    { date: '22-05', value: 0.75 },
    { date: '22-06', value: 0.44 },
    { date: '22-07', value: 0.24 },
    { date: '22-08', value: 0.3 },
    { date: '22-09', value: 0.23 },
    { date: '22-10', value: 0.19 },
    { date: '22-11', value: 0.26 },
    { date: '22-12', value: 0.19 },
    { date: '23-01', value: 0.15 }
  ]

function KlaytnPriceChart() {

    const { totalchart,isloading } = useContext(OverviewContext);
    const [range, setRange] = useState(0);
    const [data, setData] = useState([])
    const [startdate, setStartdate] = useState("")
    const [enddate, setEnddate] = useState("")
    const [ref,setRef] = useState(0)

    useEffect(() => {
        // dataUpdater(range)
        // console.log("rantotalchartge",totalchart)
        // setData(KRW)
        setChartRange()
        // setChartRange()

    }, [isloading,range])

    const setChartRange = () => {
        
        if(range === 0){
            // console.log("range1",range)
            let temp = []
            KRW.forEach((res)=>{
                temp.push(res.value)
            })
            setRef(Math.max.apply(null, temp))
            setData(KRW)
    
        } else if (range ===1){
            let temp = []
            USD.forEach((res)=>{
                temp.push(res.value)
            })
            setRef(Math.max.apply(null, temp))
            setData(USD)
        } 
        // else if (range ===1){
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
        setRange(number)
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
                        tickFormatter={(tick) => tick.toFixed(0)}
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
                    {/* <Brush dataKey="date" height={30} stroke="#000" /> */}
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
        <Styled.Rangedisplay>Klay Price</Styled.Rangedisplay>
        }
        <Styled.RangeControlBox>
            {props.selection === 0 ?
                <Styled.Chartbutton primary={true}>
                    <span>KRW</span>
                </Styled.Chartbutton> :
                <Styled.Chartbutton primary={false} onClick={() => props.ranger(0)}>
                    <span>KRW</span>
                </Styled.Chartbutton>
            }

            {props.selection === 1 ?
                <Styled.Chartbutton primary={true}>
                    <span>USD</span>
                </Styled.Chartbutton> :
                <Styled.Chartbutton primary={false} onClick={() => props.ranger(1)}>
                    <span>USD</span>
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
          <p>{(payload[0].value).toFixed(2)}</p>
        </Styled.StyleTooltip>
      );
    }
    return null;
  }


export default KlaytnPriceChart;
  