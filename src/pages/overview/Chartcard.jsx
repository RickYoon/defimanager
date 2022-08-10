import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext} from "react";
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
    const data = totalchart
    
    return (
    <>
        <Styled.Chartcover>
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
  