import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext,useState,useEffect,useRef} from "react";
import * as Styled from "./KlaytnTransactionChart.style"
import {
    ResponsiveContainer,
    AreaChart,
    BarChart,
    XAxis,
    YAxis,
    Bar,
    Area,
    Tooltip,
    CartesianGrid,
    Brush
  } from "recharts";
  import Numeral from 'numeral'
import axios from 'axios';

function KlaytnTransactionChart() {

    const { totalchart,isloading, setIsloading } = useContext(OverviewContext);
    const [range, setRange] = useState(2);
    const [data, setData] = useState([{
        date: "2019-08-19",
        value: 0
    }])
    const [startdate, setStartdate] = useState("")
    const [enddate, setEnddate] = useState("")
    const [ref,setRef] = useState(0)

    let weekData = [
        { date: '2019-08-19', value: 609672 },
        { date: '2019-08-26', value: 222481 },
        { date: '2019-09-02', value: 302274 },
        { date: '2019-09-09', value: 1418466 },
        { date: '2019-09-16', value: 248611 },
        { date: '2019-09-23', value: 570760 },
        { date: '2019-09-30', value: 532746 },
        { date: '2019-10-07', value: 551070 },
        { date: '2019-10-14', value: 1242458 },
        { date: '2019-10-21', value: 1113571 },
        { date: '2019-10-28', value: 2225008 },
        { date: '2019-11-04', value: 2952592 },
        { date: '2019-11-11', value: 5942381 },
        { date: '2019-11-18', value: 2426008 },
        { date: '2019-11-25', value: 3294828 },
        { date: '2019-12-02', value: 2644584 },
        { date: '2019-12-09', value: 2068257 },
        { date: '2019-12-16', value: 1839394 },
        { date: '2019-12-23', value: 2629178 },
        { date: '2019-12-30', value: 1756860 },
        { date: '2020-01-06', value: 2608525 },
        { date: '2020-01-13', value: 2304534 },
        { date: '2020-01-20', value: 4053721 },
        { date: '2020-01-27', value: 3723626 },
        { date: '2020-02-03', value: 3518107 },
        { date: '2020-02-10', value: 1927494 },
        { date: '2020-02-17', value: 2004931 },
        { date: '2020-02-24', value: 2150105 },
        { date: '2020-03-02', value: 1951506 },
        { date: '2020-03-09', value: 1761660 },
        { date: '2020-03-16', value: 1550875 },
        { date: '2020-03-23', value: 1669237 },
        { date: '2020-03-30', value: 1797818 },
        { date: '2020-04-06', value: 2168942 },
        { date: '2020-04-13', value: 1375574 },
        { date: '2020-04-20', value: 1475979 },
        { date: '2020-04-27', value: 2324356 },
        { date: '2020-05-04', value: 1345174 },
        { date: '2020-05-11', value: 1215493 },
        { date: '2020-05-18', value: 1089016 },
        { date: '2020-05-25', value: 720332 },
        { date: '2020-06-01', value: 1161577 },
        { date: '2020-06-08', value: 967792 },
        { date: '2020-06-15', value: 1199177 },
        { date: '2020-06-22', value: 1331865 },
        { date: '2020-06-29', value: 2301572 },
        { date: '2020-07-06', value: 1371162 },
        { date: '2020-07-13', value: 1158113 },
        { date: '2020-07-20', value: 1290993 },
        { date: '2020-07-27', value: 1694386 },
        { date: '2020-08-03', value: 1388337 },
        { date: '2020-08-10', value: 1413900 },
        { date: '2020-08-17', value: 1361148 },
        { date: '2020-08-24', value: 1714034 },
        { date: '2020-08-31', value: 1235152 },
        { date: '2020-09-07', value: 1078986 },
        { date: '2020-09-14', value: 1127450 },
        { date: '2020-09-21', value: 1362625 },
        { date: '2020-09-28', value: 1768510 },
        { date: '2020-10-05', value: 1656910 },
        { date: '2020-10-12', value: 1442606 },
        { date: '2020-10-19', value: 1365654 },
        { date: '2020-10-26', value: 1659098 },
        { date: '2020-11-02', value: 1374488 },
        { date: '2020-11-09', value: 1335422 },
        { date: '2020-11-16', value: 1495998 },
        { date: '2020-11-23', value: 1460968 },
        { date: '2020-11-30', value: 1302330 },
        { date: '2020-12-07', value: 1846558 },
        { date: '2020-12-14', value: 2242582 },
        { date: '2020-12-21', value: 2267619 },
        { date: '2020-12-28', value: 2820821 },
        { date: '2021-01-04', value: 2514279 },
        { date: '2021-01-11', value: 2758753 },
        { date: '2021-01-18', value: 2792310 },
        { date: '2021-01-25', value: 2882513 },
        { date: '2021-02-01', value: 2541376 },
        { date: '2021-02-08', value: 2762692 },
        { date: '2021-02-15', value: 4507158 },
        { date: '2021-02-22', value: 3225030 },
        { date: '2021-03-01', value: 3427659 },
        { date: '2021-03-08', value: 4012166 },
        { date: '2021-03-15', value: 2837665 },
        { date: '2021-03-22', value: 2266755 },
        { date: '2021-03-29', value: 3118837 },
        { date: '2021-04-05', value: 3115746 },
        { date: '2021-04-12', value: 3184126 },
        { date: '2021-04-19', value: 3331185 },
        { date: '2021-04-26', value: 3567371 },
        { date: '2021-05-03', value: 3746018 },
        { date: '2021-05-10', value: 3905513 },
        { date: '2021-05-17', value: 3521315 }
    ]

    let yearData = [
        { date: '19', value: 39245086 },
        { date: '20', value: 90043101 },
        { date: '21', value: 510882622 },
        { date: '22', value: 899480018 },
        { date: '23', value: 5661352 }
      ]

    let MonthData = [
        {
            "date": "19-06",
            "value": "180",
            "vale": "164"
        },
        {
            "date": "19-07",
            "value": "8707",
            "vale": "1319"
        },
        {
            "date": "19-08",
            "value": "26314",
            "vale": "1219"
        },
        {
            "date": "19-09",
            "value": "6819",
            "vale": "2018"
        },
        {
            "date": "19-10",
            "value": "40872",
            "vale": "29108"
        },
        {
            "date": "19-11",
            "value": "197590",
            "vale": "153043"
        },
        {
            "date": "19-12",
            "value": "238367",
            "vale": "186609"
        },
        {
            "date": "20-01",
            "value": "232125",
            "vale": "190588"
        },
        {
            "date": "20-02",
            "value": "236186",
            "vale": "169962"
        },
        {
            "date": "20-03",
            "value": "195940",
            "vale": "139823"
        },
        {
            "date": "20-04",
            "value": "1174167",
            "vale": "110475"
        },
        {
            "date": "20-05",
            "value": "352925",
            "vale": "323767"
        },
        {
            "date": "20-06",
            "value": "252533",
            "vale": "57885"
        },
        {
            "date": "20-07",
            "value": "108777",
            "vale": "23677"
        },
        {
            "date": "20-08",
            "value": "155937",
            "vale": "38041"
        },
        {
            "date": "20-09",
            "value": "203651",
            "vale": "26731"
        },
        {
            "date": "20-10",
            "value": "297119",
            "vale": "31882"
        },
        {
            "date": "20-11",
            "value": "242518",
            "vale": "34090"
        },
        {
            "date": "20-12",
            "value": "444128",
            "vale": "59967"
        },
        {
            "date": "21-01",
            "value": "360503",
            "vale": "56743"
        },
        {
            "date": "21-02",
            "value": "212101",
            "vale": "62695"
        },
        {
            "date": "21-03",
            "value": "778962",
            "vale": "229414"
        },
        {
            "date": "21-04",
            "value": "329920",
            "vale": "191148"
        },
        {
            "date": "21-05",
            "value": "251116",
            "vale": "161542"
        },
        {
            "date": "21-06",
            "value": "244136",
            "vale": "117684"
        },
        {
            "date": "21-07",
            "value": "346790",
            "vale": "133451"
        },
        {
            "date": "21-08",
            "value": "420994",
            "vale": "179651"
        },
        {
            "date": "21-09",
            "value": "586359",
            "vale": "388600"
        },
        {
            "date": "21-10",
            "value": "1306454",
            "vale": "966623"
        },
        {
            "date": "21-11",
            "value": "1367177",
            "vale": "1120250"
        },
        {
            "date": "21-12",
            "value": "1969071",
            "vale": "1113162"
        },
        {
            "date": "22-01",
            "value": "1537924",
            "vale": "925539"
        },
        {
            "date": "22-02",
            "value": "1608622",
            "vale": "674303"
        },
        {
            "date": "22-03",
            "value": "1702609",
            "vale": "731464"
        },
        {
            "date": "22-04",
            "value": "1217307",
            "vale": "1051375"
        },
        {
            "date": "22-05",
            "value": "966690",
            "vale": "754332"
        },
        {
            "date": "22-06",
            "value": "999978",
            "vale": "728807"
        },
        {
            "date": "22-07",
            "value": "769044",
            "vale": "495230"
        },
        {
            "date": "22-08",
            "value": "517951",
            "vale": "285025"
        },
        {
            "date": "22-09",
            "value": "383947",
            "vale": "235390"
        },
        {
            "date": "22-10",
            "value": "521538",
            "vale": "234505"
        },
        {
            "date": "22-11",
            "value": "302453",
            "vale": "326877"
        },
        {
            "date": "22-12",
            "value": "708592",
            "vale": "380139"
        },
        {
            "date": "23-01",
            "value": "269165",
            "vale": "247086"
        }
    ]
    

    useEffect(() => {
        // dataUpdater(range)
        // console.log("rantotalchartge",totalchart)
        // setData(MonthData)
        // setIsloading(true)
        setChartRange()
        // setIsloading(false)

    }, [range])

    const setChartRange = async () => {

        if(range===3){ // yearly
            setIsloading(true)
            const aa = await axios.get("https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/klaytntransactions?period=year")
            console.log("range", aa.data)
            setData(aa.data)
            let temp = []
            yearData.forEach((res)=>{
                temp.push(res.value)
            })
            setRef(Math.max.apply(null, temp))
            setIsloading(false)
        } else if (range===2){ // monthly
            setIsloading(true)
            const bb = await axios.get("https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/klaytntransactions?period=month")
            console.log("range", bb.data)
            setData(bb.data)
            // console.log("range", range)
            let tempWeek = []
            weekData.forEach((res)=>{
                tempWeek.push(res.value)
            })
            // console.log("ref")
            setRef(Math.max.apply(null, tempWeek))
            setIsloading(false)
        } 
    }    

    const changeRange = (number) => {
        setRange(number)
    }

    const toK = (num) => {
        return Numeral(num).format('0.[00]a')
      }    
      const moneySymbol = "$"


    return (
    <>
        <Styled.Chartcover>
            <Chartrange selection={range} ranger={changeRange} startdate={startdate} enddate={enddate} isloading={isloading}/>            
            <ResponsiveContainer width="100%" height={300}>
                {isloading ? 
                    <><Styled.ProductSkeleton /></> :
                    range > 1.5 ?
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
                    {/* <Brush dataKey="date" height={30} stroke="#000" /> */}
                    </BarChart>
                    :
                    <AreaChart data={data}>
                    <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                        <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                    </linearGradient>
                    </defs>

                    <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

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
                    <Brush dataKey="date" height={30} stroke="gray" />
                    {/* <Brush startIndex={"19-09"} endIndex={"22-01"} dataKey="date" /> */}
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
        <Styled.Rangedisplay>Transactions </Styled.Rangedisplay>
        }
        <Styled.RangeControlBox>
            {/* {props.selection === 0 ?
                <Styled.Chartbutton primary={true}>
                    <span>Day</span>
                </Styled.Chartbutton> :
                <Styled.Chartbutton primary={false} onClick={() => props.ranger(0)}>
                    <span>Day</span>
                </Styled.Chartbutton>
            }

            {props.selection === 1 ?
                <Styled.Chartbutton primary={true}>
                    <span>Week</span>
                </Styled.Chartbutton> :
                <Styled.Chartbutton primary={false} onClick={() => props.ranger(1)}>
                    <span>Week</span>
                </Styled.Chartbutton>
            } */}

            {props.selection === 2 ?
                <Styled.Chartbutton primary={true}>
                    <span>Month</span>
                </Styled.Chartbutton> :
                <Styled.Chartbutton primary={false} onClick={() => props.ranger(2)}>
                    <span>Month</span>
                </Styled.Chartbutton>
            }

            {props.selection === 3 ?
                <Styled.Chartbutton primary={true}>
                    <span>Year</span>
                </Styled.Chartbutton> :
                <Styled.Chartbutton primary={false} onClick={() => props.ranger(3)}>
                    <span>Year</span>
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


export default KlaytnTransactionChart;
  