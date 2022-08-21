
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import icons from "../../assets/tokenIcons"
import { AiFillTrophy, AiOutlineInfoCircle, AiOutlineProfile } from "react-icons/ai";
import ReactTooltip from "react-tooltip"
import Skeleton from "../../assets/styles/Skeleton.js";
import styled, { keyframes } from "styled-components";
import { PoolContext } from "../../components/context/PoolContext"

import Topmenu from "./Topmenu"
import FilterContainer from "./FilterContainer"
import ListTable from "./ListTable"

function Poolpage() {

  const [order, setOrder] = useState("tvl")
  const [stable, setStable] = useState(false)
  const [isloading,setIsloading] = useState(false)
  
  const [backupPooldata, setBackupPooldata]= useState([])
  const [pooldata, setPooldata] = useState([{
    poolinfo : [],
    protocol:"",
    type: "",
    reward: [],
    tvl: 0,
    apr:0,
    stableOnly: "no"
  }])

  useEffect(() => {
    loadPools()
  }, [])

  // useEffect(() => {
  //     pooldata.sort((a,b) => {
  //       if(a.tvl < b.tvl) return 1;
  //       if(a.tvl === b.tvl) return 0;
  //       if(a.tvl > b.tvl) return -1;
  //     })
  // }, [order])


  const loadPools = async () => {
    setIsloading(true)
    // const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/tvllist"
    const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/queryPoolList"

    await axios.get(url).then(function (response) {
      setPooldata(response.data.body)
      setBackupPooldata(response.data.body)
    })
    setIsloading(false)
  }

  const tvlSorting = () => {
    setOrder("tvl")
    let tempState = pooldata.sort(function(a,b){
        if(a.tvl < b.tvl) return 1;
        if(a.tvl === b.tvl) return 0;
        if(a.tvl > b.tvl) return -1;
      })
      setPooldata(tempState)
      console.log("tvl")
  }

  const aprSorting = () => {
    setOrder("apr")
    let tempState = pooldata.sort(function(a,b){
        if(a.apr < b.apr) return 1;
        if(a.apr === b.apr) return 0;
        if(a.apr > b.apr) return -1;
      })
      setPooldata(tempState)
      console.log("apr")
  }

  const stableSetter = () => {
    if(!stable){
      let tempState = pooldata.filter(pool => pool.stableOnly === "yes" )
      setPooldata(tempState)
      setStable(!stable)
    } else {
      setPooldata(backupPooldata)
      setStable(!stable)
    }
  }


  return (
    <>
        <PoolContext.Provider value={{order,tvlSorting,aprSorting,stable, stableSetter,pooldata}}> 
        <Topbox>
            <Leftcolumn>
                <Topmenu />
                <FilterContainer />
                <ListTable />
            </Leftcolumn>
            <Rightcolumn>
                
            </Rightcolumn>
        </Topbox>
        
        </PoolContext.Provider>
    </>
  );
}
// - 데이터 연결상태 및 업데이트 시간(?) <br/>
// - pool theme (top tvl, top apr, filter(stable, project))
// - kokonutswap(ok)
// - klayswap (ok)
// - claimswap (ok) https://data-api.claimswap.org/dashboard/toppool
// - pala
// - definix
// - ufoswap

const Topbox = styled.div`
  width: 1136px;
  /* margin-left: 32px;
  margin-right: 32px; */
  margin: 0px auto;
  gap: 24px;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 500px){
    width: 360px;
    display: flex;
    flex-direction: column;
  }
`

const Leftcolumn = styled.div`
  width: 788px;
  /* background: gray; */
  @media screen and (max-width: 500px){
    width: 360px;
  }
`

const Rightcolumn = styled.div`
  width: 324px;
  /* background: gray; */
  @media screen and (max-width: 500px){
    width: 360px;
  }

`



export default Poolpage;
