import React, { useState, useEffect } from 'react';
import TopNumbercard from "./TopNumbercard"
import axios from "axios";
import { NftviewContext } from "../../components/context/NftviewContext"

// import Chartcard from "./Chartcard"
// import Selector from "./Selector"
import TvlTable from "./TvlTable"
// import TokenTable from "./TokenTable"
// import RightBox from "./RightBox"
// import { OverviewContext } from "../../components/context/OverviewContext"
// import { getTvlData,getTotalChartData } from 'apis/tvl';
// import {getEventData} from 'apis/event';
// import { Leftcolumn } from './TopNumbercard.style';
import * as Styled from "./Overview.style"

function Nftoverview() {

    const [isloading,setIsloading] = useState(false)
    const [nftdata, setNftdata] = useState([{
        proj:"",
        totalVolume: 0,
        totalChange: 0,
        marketShare: {
          opensea: 0,
          pala: 0
        },
        floorPrice: {
          opensea: 0,
          pala: 0
        }
      }])

    useEffect(() => {
      loadNftdata()
    }, [])

    const loadNftdata = async () => {
        setIsloading(true)
        const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/getLatestNftData"

        await axios.get(url).then(function (response) {
            // console.log(response)
            console.log("response.data",response.data.body)
            setNftdata(response.data.body)
        })
        setIsloading(false)
    }

  return (
    <>
        <NftviewContext.Provider value={{nftdata}}>
            <Styled.Topbox>
                <Styled.Leftcolumn>
                    <TopNumbercard />
                    <TvlTable />
                    {/* <Chartcard /> */}
                    {/* {selTvl ? <TvlTable /> :  <TokenTable />} */}
                </Styled.Leftcolumn>
                {/* <Styled.Rightcolumn>
                    <RightBox />
                </Styled.Rightcolumn> */}
            </Styled.Topbox>
        </NftviewContext.Provider>
    </>
  );
}

export default Nftoverview;
