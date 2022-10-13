
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
  const [klay, setKlay] = useState(false)
  const [isloading,setIsloading] = useState(false)
  
  const [backupPooldata, setBackupPooldata]= useState([])
  const [pooldata, setPooldata] = useState([{
    poolinfo : [],
    protocol:"",
    type: "",
    reward: [],
    tvl: 0,
    apr:0,
    stableOnly: "no",
    klayOnly: "no"
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
    const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/getPoolList_v1"
    // const url = "https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/queryPoolList"

    await axios.get(url).then(function (response) {
      // console.log(response.data.body)
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
      // console.log("tvl")
  }

  const aprSorting = () => {
    setOrder("apr")
    let tempState = pooldata.sort(function(a,b){
        if(a.apr < b.apr) return 1;
        if(a.apr === b.apr) return 0;
        if(a.apr > b.apr) return -1;
      })
      setPooldata(tempState)
      // console.log("apr")
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

  const klaySetter = () => {
    if(!klay){
      let tempState = pooldata.filter(pool => pool.klayOnly === "yes" )
      setPooldata(tempState)
      setKlay(!klay)
    } else {
      setPooldata(backupPooldata)
      setKlay(!klay)
    }
  }


  return (
    <>
        <PoolContext.Provider value={{order,tvlSorting,aprSorting,stable, stableSetter,klay, klaySetter,pooldata,isloading}}> 
        <OverBox>
          <Wrappertitle>
              <Title>Yield Explorer</Title>
          </Wrappertitle>
          <Topbox>
              <Leftcolumn>
                <FilterMobile>
                  <Topmenu />
                  <FilterContainer />      
                </FilterMobile>          
                  <ListTable />
              </Leftcolumn>
              <Rightcolumn>
              <FilterDesktop>
                <Topmenu />
                <FilterContainer />                
              </FilterDesktop>
              </Rightcolumn>
          </Topbox>
        </OverBox>        
        </PoolContext.Provider>
    </>
  );
}

const FilterMobile = styled.div`
    display: none;
  @media screen and (max-width: 950px){
    display: block;
    margin-bottom :15px;
  }
`

const FilterDesktop = styled.div`
  @media screen and (max-width: 950px){
    display: none;
  }
`



const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
`

const Wrappertitle = styled.div`
  margin: 0px auto 20px auto;
  width: 1136px;
  @media screen and (max-width: 950px){
    width: 90%;
    padding-top: 20px;
    color: black;
  }
  @media screen and (max-width: 500px){
    width: 90%;
    padding-top: 20px;
    color: gray;
  }
`

const OverBox = styled.div`

  position: relative;
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: auto;
  padding: 30px;

  @media screen and (max-width: 950px){
    /* width: 360px; */
    display: flex;
    flex-direction: column;
    margin-left: 0px;
    width: calc(100% );
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 0px;
    margin-Top: 10px;
  }
`


const Topbox = styled.div`
  width: 1136px;
  /* margin-left: 32px;
  margin-right: 32px; */
  margin: 0px auto;
  gap: 24px;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 950px){
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`

const Leftcolumn = styled.div`
  width: 788px;
  /* background: gray; */
  @media screen and (max-width: 500px){
    width: 100%;
  }
`

const Rightcolumn = styled.div`
  width: 324px;
  /* background: gray; */
  @media screen and (max-width: 500px){
    width: 100%;
  }

`



export default Poolpage;
