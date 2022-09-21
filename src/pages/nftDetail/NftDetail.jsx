import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import * as Styled from "./Detail.style"
import TvlChartCard from "./TvlChartCard"

import { NftDetailContext } from "../../components/context/NftDetailContext"
import { getNftDetailData } from 'apis/nftDetail';

import TopTitle from './TopTitle';
import TopNumberCard from './TopNumberCard'
// import TokenChartcard from "./TokenChartCard"
// import TokenChartCardMulti from "./TokenChartCardMulti"
// import RightBox from "./RightBox"
// import TokenTable from "./TokenTable"

function NftDetail() {

    const { id } = useParams();
    const [isloading, setIsloading] = useState(false)
    const [nftdetailinfo, setNftdetailinfo] = useState(
      [
        {
            "datetime": "2022-09-01T00:47:13.000Z",
            "priceInKlay": 638,
            "klayPrice": 0.23013084321006708,
            "itemId": 2762,
            "address": "0xd643bb39f81ff9079436f726d2ed27abc547cb38",
            "value": 146.8234779680228,
            "transType": "send",
            "market": "opensea",
            "itemClass": "Common"
            
        }
      ]);
  

    useEffect(() => {
        loadchart()
    }, [])

    const loadchart = async()=>{
      await getNftDetailData().then(function (response){
        // console.log(response.body)

        setNftdetailinfo(response.body.Items)
      })
    }

  return (
    <>
      <NftDetailContext.Provider value={{nftdetailinfo, isloading}}>
      <Styled.Topbox>
        <Styled.Leftcolumn>     
          <TopTitle />
          <TopNumberCard />
          <TvlChartCard/>
        </Styled.Leftcolumn>
      </Styled.Topbox>
      </NftDetailContext.Provider>
    </>
  );
}

export default NftDetail;

