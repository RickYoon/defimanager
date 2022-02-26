import styled from 'styled-components';
import { BiBook } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import React from 'react';
import { Link } from "react-router-dom";

function Sidenav() {
    return (
        <>
            <SideBar>
                <div style={{ paddingLeft: "32px", paddingRight: "32px", paddingTop: "24px", paddingBottom: "8px", fontSize: "13px", textAlign: "center", color: "rgb(255, 255, 255)" }}>KLAYLABS</div>
                <HR />
                <UL>
                    <li></li>
                </UL>
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
  margin: 16px;
  padding: 0;
  width: 250px;
  background: rgb(66, 66, 74);
  border-radius: 0.75rem;
  height: calc(100vh - 2rem);
  background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
  position: fixed;
  overflow: auto;
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
