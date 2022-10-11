import React, { useContext } from 'react';
import { DetailContext } from 'components/context/DetailContext';
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Styled from "./InfoBox.style"

function NavBox() {

  const { detailinfo,isloading } = useContext(DetailContext);

  return (
    <>{isloading ?
      <Topdash>
          <Styled.ProductSkeleton width="100px"/>      
          <Styled.ProductSkeleton width="100px"/>      
      </Topdash> :
      <Topdash>
          {detailinfo.rankInfo.myRank === 1 ? <PrevHide href="#" id="prev"></PrevHide> : 
         <Prev href="#" id="next" onClick={()=>window.location.href = `https://klaylabs.net/project/${detailinfo.rankInfo.Prev}`}>
           #{detailinfo.rankInfo.myRank-1}. {detailinfo.rankInfo.Prev}</Prev> }

          {detailinfo.rankInfo.Next === "end"?
          <></> :  
          <Next href="#" id="next" onClick={()=>window.location.href = `https://klaylabs.net/project/${detailinfo.rankInfo.Next}`}>
            #{detailinfo.rankInfo.myRank+1}. {detailinfo.rankInfo.Next}</Next>
           }
      </Topdash>
      }
    </>
  );
}


const Topdash = styled.div`

    display: flex;
    flex-direction: row;
    height: 30px;
    margin-bottom: 20px;
    vertical-align: middle;
    font-size: 12px;
    justify-content: space-between;

    @media screen and (max-width: 500px){
        width: 100%;
        margin-top: 10px;
        margin-bottom: 5px;
    }
`

const Next = styled.a`
  & {
    color: #7e7e7e;
    display: inline-block;
    font: normal normal 1.0em Arial,sans-serif;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    width: auto;
    padding: 0.7em 1.5em;
  }

  &:hover {
    color: #316395;
    font: normal bold 1.0em Arial,sans-serif;
  }


  &:hover:after,
  &:hover:before {
    background: #316395;
  }


  &:before{
    background: #7e7e7e;
    -moz-border-radius: 0.25em;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    content: "";
    display: block;
    height: 0.4em;
    position: absolute;
    right: 0;
    top: 50%;
    width: 1em;
    margin-top: -.36em;
    -moz-transform: rotate(40deg);
    -ms-transform: rotate(40deg);
    -o-transform: rotate(40deg);
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
  }
  &:after {
    background: #7e7e7e;
    -moz-border-radius: 0.25em;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    content: "";
    display: block;
    height: 0.4em;
    position: absolute;
    right: 0;
    top: 50%;
    width: 1em;
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    -o-transform: rotate(-40deg);
    -webkit-transform: rotate(-40deg);
    transform: rotate(-40deg);
    /* -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg); */
  }

  &:before {
    /* -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg); */
  }
`

const Prev = styled.a`
  & {
    color: #7e7e7e;
    /* opacity: 0; */
    display: inline-block;
    font: normal normal 1.0em Arial,sans-serif;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    width: auto;
    padding: 0.7em 1.5em;
  }

  &:hover {
    color: #316395;
    font: normal bold 1.0em Arial,sans-serif;
  }

  &:hover:after,
  &:hover:before {
    background: #316395;
  }


  &:before {
    background: #7e7e7e;
    -moz-border-radius: 0.25em;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    content: "";
    display: block;
    height: 0.4em;
    position: absolute;
    right: 0;
    top: 50%;
    width: 1em;
    -moz-transform: rotate(40deg);
    -ms-transform: rotate(40deg);
    -o-transform: rotate(40deg);
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
    left: 0;
  }

  &:after {
    background: #7e7e7e;
    -moz-border-radius: 0.25em;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    content: "";
    display: block;
    height: 0.4em;
    position: absolute;
    right: 0;
    top: 50%;
    width: 1em;
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    -o-transform: rotate(-40deg);
    -webkit-transform: rotate(-40deg);
    transform: rotate(-40deg);
    margin-top: -.36em;
    left: 0;
  }
`

const PrevHide = styled.a`
  & {
    color: #7e7e7e;
    opacity: 0;
  }
`



export default NavBox;




