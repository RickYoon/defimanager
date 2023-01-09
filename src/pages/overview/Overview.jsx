import React, { useState, useEffect } from 'react';
import TopNumbercard from "./TopNumbercard"
import Chartcard from "./Chartcard"
import Selector from "./Selector"
import TvlTable from "./TvlTable"
import TokenTable from "./TokenTable"
import RightBox from "./RightBox"
import { OverviewContext } from "../../components/context/OverviewContext"
import { getTvlData,getTotalChartData } from 'apis/tvl';
import {getEventData} from 'apis/event';
import { Leftcolumn } from './TopNumbercard.style';
import * as Styled from "./Overview.style"
import { flowRight } from 'lodash';

function Overview() {

    const [isloading, setIsloading] = useState(false)

    const [ovfilter, setOvfilter] = useState({
      category : "",
      tvlOrder: true,
      onedayOrder: false,
      sevendayOrder: false
    })

    const [eventlist, setEventlist] = useState([
      {
        "projectName":"Kokonutswap",
        "eventName": "KSD Reward 30% event",
        "eventSchedule": "'22-06-13 ~ til Reward Exhausted",
        "eventStatus": "On",
        "eventLink": ""
    }
    ])

    const [totalchart, setTotalchart] = useState([{
        "date": "2022-01-10",
        "value": 1000000000
      }]);    

    
    const [toptvl, setToptvl] = useState([
      {
        MarketShare: 0,
        cat: "",
        chain: "",
        diff: 0,
        difftwo: 0,
        proj: "",
        rankdiff: 0,
        ranktwo: 0,
        rankyes: 0,
        site: "",
        tvl: 0,
        tvltwo: 0
      }
   ])

   const [toptoken, setToptoken] = useState([{
      price: 98.64174201095223,
      priceDiff: "-5.5",
      project: "symbiotik",
      sevenPriceDiff: "-7.5",
      token: "SYM"
   }])



    const [selTvl, setSelTvl] = useState(true)
    const [tokendata, setTokendata] = useState([
        "", ""
      ])

    const [tvldata, setTvldata] = useState({
        refDate: "2022-00-00",
        total: {
          tvl: 0,
          diff: 0
        },
        data: [{
            cat: "DEX",
            chain: "Klaytn",
            diff: -4,
            difftwo: 0.9,
            proj: "Klayswap",
            rankdiff: 0,
            ranktwo: 1,
            rankyes: 1,
            site: "https://klayswap.com/",
            tvl: 207856632,
            tvltwo: 206008719,
            MarketShare: 0
        }]
      })   
      
    const [backupTvldata, setBackupTvldata]= useState({
      refDate: "2022-00-00",
      total: {
        tvl: 0,
        diff: 0
      },
      data: [{
          cat: "DEX",
          chain: "Klaytn",
          diff: -4,
          difftwo: 0.9,
          proj: "Klayswap",
          rankdiff: 0,
          ranktwo: 1,
          rankyes: 1,
          site: "https://klayswap.com/",
          tvl: 207856632,
          tvltwo: 206008719,
          MarketShare: 0
      }]
    })

    useEffect(() => {
        loadtvl()
        loadEvent()
        // loadchart()
    }, [])


    useEffect(() => {
    //  console.log("ov filter changed", ovfilter.category)
    //  console.log("backupTvldata", backupTvldata)
     let backdata = backupTvldata.data
    //  let tempState = []
     if(ovfilter.tvlOrder){
        backdata.sort(function (a, b) {
          return a.tvl < b.tvl ? 1 : a.tvl > b.tvl ? -1 : 0;
        })
     } else if (ovfilter.onedayOrder){
        backdata.sort(function (a, b) {
          return a.difftwo < b.difftwo ? 1 : a.difftwo > b.difftwo ? -1 : 0;
        })
     } else if (ovfilter.sevendayOrder){
      backdata.sort(function (a, b) {
        return a.diff < b.diff ? 1 : a.diff > b.difftwo ? -1 : 0;
      })
    }



     if(ovfilter.category === ""){
      setTvldata({
        ...tvldata, 
        data : backdata
      })
     } else if (ovfilter.category === "Dexes") {
      let tempState = backdata.filter(element =>  element.cat === "Dexes" )
      console.log(tempState)
      setTvldata({
        ...tvldata, 
        data : tempState
      })
     } else if (ovfilter.category === "Lending") {
      let tempState = backdata.filter(element =>  element.cat === "Lending" )
      console.log(tempState)
      setTvldata({
        ...tvldata, 
        data : tempState
      })
     } else if (ovfilter.category === "Staking") {
      let tempState = backdata.filter(element =>  element.cat === "Staking" )
      console.log(tempState)
      setTvldata({
        ...tvldata, 
        data : tempState
      })
     } else if (ovfilter.category === "Optimizer") {
      let tempState = backdata.filter(element =>  element.cat === "Optimizer" )
      console.log(tempState)
      setTvldata({
        ...tvldata, 
        data : tempState
      })
     }
  }, [ovfilter])

    const loadEvent = async () => {
      await getEventData().then(function (response){
        // console.log("리스판스", response)
        setEventlist(response)
      })
    }

    const loadchart = async () => {

        await getTotalChartData().then(function (response){

            let sixMonthData = response.body;      
            
            console.log("response.body",response.body)

            sixMonthData.sort(function (a, b) {
                return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
            })
            console.log("sixMonthData",sixMonthData)

            setTotalchart(sixMonthData)
        })
    
    }

    const loadtvl = async () => {

        setIsloading(true)

        await getTvlData().then(function (response) {

            // console.log("response : ", response)

            let tempArr = response.body.data.filter(dat => dat.proj !== "KCT-Total")
            let refArr = response.body.data.filter(dat => dat.proj !== "KCT-Total")
            let tempTotal = response.body.data.filter(dat => dat.proj === "KCT-Total")
      
            // token
            let tokenArr = response.body.token.filter(dat => dat.token !== "date")
            tokenArr = tokenArr.filter(dat => dat.token !== "dataType")

            // let refToken = tokenArr;
      
            tempArr.sort(function (a, b) {
              return a.tvl > b.tvl ? -1 : a.tvl < b.tvl ? 1 : 0;
            })

            let top = (refArr.sort(function (a, b) {
              return a.difftwo > b.difftwo ? -1 : a.difftwo < b.difftwo ? 1 : 0;
            }))

            let row = (tokenArr.sort(function (a, b) {
              return a.priceDiff > b.priceDiff ? -1 : a.priceDiff < b.priceDiff ? 1 : 0;
            }))

            setToptvl(top.slice(0,3))
            setToptoken(row.slice(0,3))
            // setToptoken(row)

            // console.log("topToken", row)
      
            let tokenArrSort = [];
      
            for (let i = 0; i < tempArr.length; i++) {
              let temp = tokenArr.filter(dat => dat.project === tempArr[i].proj)
              temp.forEach((comp) => {
                tokenArrSort.push(comp)
              })
            }
      
            // console.log("tokenArr", tokenArrSort)
            setTokendata(tokenArrSort)
      
            // tempArr = tempArr.filter(dat => dat.proj !== "neuronswap")
            tempArr.map((component) => {
              component["MarketShare"] = component.tvl / tempTotal[0].tvl * 100
              return null
            })
      
            // console.log(tempTotal[0].tvl)
            // console.log("tempArr", tempArr)
      
            const responseObj = {
              refDate: response.body.refDate,
              total: tempTotal[0],
              data: tempArr
            }
            // console.log("tempArr", tempArr)
      
            let hundredClub = tempArr.filter((arr) => arr.tvl > 100000000)
            // console.log("hundredClub", hundredClub)
            let temphund = []
            hundredClub.forEach((ele) => {
              temphund.push(ele.proj)
            })
      
            let fiftyClub = tempArr.filter((arr) => arr.tvl > 50000000 && arr.tvl < 100000000)
            let tempfif = []
            fiftyClub.forEach((ele) => {
              tempfif.push(ele.proj)
            })
      
            let tenClub = tempArr.filter((arr) => arr.tvl > 10000000 && arr.tvl < 50000000)
            let tempten = []
            tenClub.forEach((ele) => {
              tempten.push(ele.proj)
            })
      
      
            // setHundredgroup(temphund)
            // setFiftygroup(tempfif)
            // setTengroup(tempten)
      
            // console.log("responseObj", responseObj)
            // let tempRatio = []
      
            responseObj.data.forEach((ress) => {
              if (ress.pool !== undefined) {
                ress.pool.ratioTVL.sort((function (a, b) {
                  return b.ratio - a.ratio
                }))
              }
            })
      
            setTvldata(responseObj)
            setBackupTvldata(responseObj)
            // setIsloading(false)
          })

          await loadchart()

          setIsloading(false)
    }

  return (
    <>
        <OverviewContext.Provider value={{tvldata,totalchart,selTvl,setSelTvl,tokendata,isloading,toptvl,toptoken,eventlist,ovfilter, setOvfilter}}>
          <Styled.OverBox>
            <Styled.Wrappertitle>
              <Styled.Title>Klaytn DeFi Overview</Styled.Title>
            </Styled.Wrappertitle>
            <Styled.Topbox>
                <Styled.Leftcolumn>
                    <TopNumbercard />
                    <Chartcard />
                    <Selector />
                    {selTvl ? <TvlTable /> :  <TokenTable />}
                </Styled.Leftcolumn>
                <Styled.Rightcolumn>
                    <RightBox />
                </Styled.Rightcolumn>
            </Styled.Topbox>
          </Styled.OverBox>
        </OverviewContext.Provider>
    </>
  );
}

export default Overview;
