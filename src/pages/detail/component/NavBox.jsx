import React, { useContext } from 'react';
import { DetailContext } from 'components/context/DetailContext';
import styled from "styled-components";
import { Link } from "react-router-dom";

function NavBox() {

  const { detailinfo,isloading } = useContext(DetailContext);

  console.log("de : ", detailinfo)

  return (
    <>
      <Topdash>
          {detailinfo.rankInfo.myRank === 1 ? <Prev href="#" id="prev"></Prev> : 
          <Prev href="#" id="prev">#{detailinfo.rankInfo.myRank-1}. {detailinfo.rankInfo.Prev}</Prev> }
          <Next href="#" id="next" onClick={()=>window.location.href = `http://localhost:7777/project/${detailinfo.rankInfo.Next}`}>#{detailinfo.rankInfo.myRank+1}. {detailinfo.rankInfo.Next}</Next>
      </Topdash>
    </>
  );
}


const Topdash = styled.div`

    display: flex;
    flex-direction: row;
    height: 40px;
    vertical-align: middle;
    /* padding-left: 20px;
    padding-right: 20px; */
    justify-content: space-between;

    /* border: 0px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;
    margin-right: 5px;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; */

    @media screen and (max-width: 500px){
        width: 360px;
        margin-top: 10px;
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
    opacity: 0;
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


export default NavBox;




