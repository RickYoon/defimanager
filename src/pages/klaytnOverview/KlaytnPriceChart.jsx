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
  } from "recharts";

function KlaytnPriceChart() {

    const { totalchart,isloading } = useContext(OverviewContext);
    const [range, setRange] = useState(2);
    const [data, setData] = useState([])
    const [startdate, setStartdate] = useState("")
    const [enddate, setEnddate] = useState("")

    useEffect(() => {
        // dataUpdater(range)
        // console.log("rantotalchartge",totalchart)
        setData([
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
        ])
        // setChartRange()

    }, [isloading,range])

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
                    <AreaChart data={data}>
                    <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                        <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                    </linearGradient>
                    </defs>

                    <defs>
                      <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#dd4477" stopOpacity={0.0} />
                          <stop offset="75%" stopColor="#dd4477" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>

                    <Area dataKey="vale" stroke="#2451B7" fill="url(#color)" />
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
                        // tickFormatter={(tick) => moneySymbol + toK(tick)}
                        axisLine={false}
                        tickLine={false}
                        interval="preserveEnd"
                        dataKey="value"
                        minTickGap={80}
                        tickCount={8}
                        yAxisId={0}
                        mirror={true}
                        style={{ fontSize: "14px" }}
                        domain={[0, 2000000]}
                        // allowDataOverFlow={true}
                        // domain={[ 0, dataMax => (100000000) ]}    
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
        <Styled.Rangedisplay>Klay Price</Styled.Rangedisplay>
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
          <p>${(payload[0].value/1000000000).toFixed(2)+"B"}</p>
        </Styled.StyleTooltip>
      );
    }
    return null;
  }


export default KlaytnPriceChart;
  