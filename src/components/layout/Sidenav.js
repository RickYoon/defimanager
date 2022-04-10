import styled from 'styled-components';
import { BiBook } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/CI/modified.svg"


function Sidenav() {
    const moveMain = () => {
        window.location.href = "https://www.klaylabs.net"
    }

    return (
        <>
            <SideBar>
                <div onClick={moveMain} style={{ cursor: "pointer", marginTop: "20px", marginLeft: "20px" }}>
                    <img src={logo} alt="logo" style={{ height: "40px", verticalAlign: "middle", color: "white" }} />
                    <div style={{ marginTop: "5px", marginLeft: "5px", fontSize: "12px", fontStyle: "oblique" }}>DefiManager  (beta)</div>
                </div>

                <div style={{ marginTop: "20px", marginLeft: "20px" }}>
                    connect Wallet
                </div>

                <div style={{ marginTop: "20px", marginLeft: "20px" }}>
                    Dashboard
                </div>

            </SideBar>
        </>
    );
}

const UL = styled.div`
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
`

const SideBar = styled.div`
  /* margin: 16px; */
  padding: 0;
  width: 250px;
  border-right: solid;  
  background: rgb(66, 66, 74);
  /* border-radius: 0.75rem; */
  height: 100vh;
  background: #fff;
  position: fixed;
  overflow: auto;

  @media screen and (max-width: 500px){
        display: none;
    }

`

const HR = styled.hr`
    flex-shrink: 0;
    border-top: 0px solid rgba(0, 0, 0, 0.08);
    border-right: 0px solid rgba(0, 0, 0, 0.08);
    border-left: 0px solid rgba(0, 0, 0, 0.08);
    height: 0.0625rem;
    margin: 1rem 0px;
    border-bottom: none;
    opacity: 0.25;
    background-color: transparent;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255), rgba(255, 255, 255, 0)) !important;
`

export default Sidenav;
