import React, { useState, useEffect } from 'react';
import TopNumbercard from "./TopNumbercard"
import axios from "axios";
import { NftviewContext } from "../../components/context/NftviewContext"

import Chartcard from "./Chartcard"
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

    const [isloading, setIsloading] = useState(false);

    const [currency, setCurrency] = useState("KLAY");
    const [totaldata, setTotaldata]= useState({
        totalKlay: 0,
        openseaKlay:0,
        palaKlay: 0,
        totalUSD: 0,
        openseaShare: 0
    })
    const [nftdata, setNftdata] = useState([{
        proj:"",
        totalVolume: 0,
        totalChange: 0,
        klayPrice: 0,
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
    }, [currency])

    const loadNftdata = async () => {
        setIsloading(true)
        const klayPrice = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=klay-token`)

        const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/getLatestNftData"

        await axios.get(url).then(function (response) {
            // console.log(response)
            // console.log("response.data",response.data.body)
            let totalCounter = {
                totalKlay: 0,
                openseaKlay:0,
                palaKlay: 0,
                totalUSD: 0,
                openseaShare: 0,
                klayPrice : 0,
            }
            
            // opensea volume 합치기
            // console.log("aa",response.data.body)
            Object.keys(response.data.body).forEach((data)=>{
                        totalCounter.totalKlay += response.data.body[data].marketShare.total;
                        totalCounter.openseaKlay += response.data.body[data].marketShare.opensea;
                        totalCounter.palaKlay += response.data.body[data].marketShare.pala;
            })

            totalCounter["totalUSD"] = Number((klayPrice.data[0].current_price * totalCounter["totalKlay"]).toFixed(2))
            totalCounter["openseaShare"] = Number(((totalCounter["openseaKlay"] / totalCounter["totalKlay"])*100).toFixed(1))
            totalCounter["klayPrice"] = klayPrice.data[0].current_price
            // console.log("totalCounter",totalCounter)
        
            setNftdata(response.data.body)
            setTotaldata(totalCounter)
        })
        setIsloading(false)
    }

  return (
    <>
        <NftviewContext.Provider value={{nftdata,totaldata,currency, setCurrency,isloading}}>
        <Styled.OverBox>
          <Styled.Wrappertitle>
            <Styled.Title>Klaytn NFT Overview</Styled.Title>
          </Styled.Wrappertitle>

            <Styled.Topbox>
                <Styled.Leftcolumn>
                    <TopNumbercard />
                    <TvlTable />
                </Styled.Leftcolumn>
            </Styled.Topbox>
            </Styled.OverBox>
        </NftviewContext.Provider>
    </>
  );
}

export default Nftoverview;
