import React from "react";
import * as Styled from "./EventCard.style"
import icons from "../../../assets/tokenIcons"
import styled from "styled-components";


function EventCard(props) {

  console.log("props",props.data)

  return (
    <>

<Styled.Topdash>
          <Styled.UpperColumn>
              Event List
          </Styled.UpperColumn>
          <Styled.LowerColumn>

          <PoolinfoBox  style={{marginLeft:"20px", marginRight:"20px", cursor:"pointer"}} onClick={()=>window.location.href = "https://kokonutswap.finance/farm"}>
                <span style={{width:"40px", textAlign: "center", fontSize:"10px"}}>
                    Now <br/>
                    on
                </span>
                <Iconbox>
                    <Iconwrapper>
                        <Img src={icons["Kokonutswap"]} alt="logo" />
                    </Iconwrapper>
                </Iconbox>
                <Explainbox>
                    <Protocol>
                        Kokonutswap
                    </Protocol>
                    <Protocol>
                        KSD Reward 30% event
                    </Protocol>
                    <Token>
                        '22-06-13 ~ til Reward Exhausted
                    </Token>
                </Explainbox>
            </PoolinfoBox>

            <div style={{marginTop:"15px"}}></div>

            <PoolinfoBox  style={{marginLeft:"20px", marginRight:"20px", cursor:"pointer"}} onClick={()=>window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSdqJIeEd6cmYGsmkkWPPuRe14eUPnvudp4LK8Eum7giiymAiQ/viewform"}>
                <span style={{width:"40px", textAlign: "center", fontSize:"10px"}}>
                    Now <br/>
                    on
                </span>
                <Iconbox>
                    <Iconwrapper>
                        <Img src={icons["Klaymore"]} alt="logo" />
                    </Iconwrapper>
                </Iconbox>
                <Explainbox>
                    <Protocol>
                        Klaymore
                    </Protocol>
                    <Protocol>
                        Event - SNOWBALL NFT
                    </Protocol>
                    <Token>
                        '22-07-19 ~ '22-07-25 23:59
                    </Token>
                </Explainbox>
            </PoolinfoBox>

            <div style={{marginTop:"15px"}}></div>

            <PoolinfoBoxx  style={{marginLeft:"20px", marginRight:"20px", cursor:"pointer"}} onClick={()=>window.location.href = "https://docs.klaystake.house/v/korean/snowball"}>
                <span style={{width:"40px", textAlign: "center", fontSize:"10px"}}>
                    D-?
                </span>
                <Iconbox>
                    <Iconwrapper>
                        <Img src={icons["Klaymore"]} alt="logo" />
                    </Iconwrapper>
                </Iconbox>
                <Explainbox>
                    <Protocol>
                        Klaymore
                    </Protocol>
                    <Protocol>
                        Launch - GameFi SNOWBALL
                    </Protocol>
                    <Token>
                        TBD
                    </Token>
                </Explainbox>
            </PoolinfoBoxx>
          </Styled.LowerColumn>
      </Styled.Topdash>



    </>
  );
}

const Protocol = styled.div`
  padding-left: 15px;
  margin-bottom: 5px;
  /* text-decoration: underline; */
  font-size: 13px;
`

const Token = styled.div`
  padding-left: 15px;
    color: #657795;
    font-size: 11px;
    text-align: left;
`

const Explainbox = styled.div`
  display : flex;
  flex-direction : column;
`

const PoolinfoBox = styled.div`
  text-align: left;
  display : flex;
  flex-direction : row;
  align-items: center;
  height: 60px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-style:solid;
  border-bottom-color:#d1d1d1;
`


const PoolinfoBoxx = styled.div`
  text-align: left;
  display : flex;
  flex-direction : row;
  align-items: center;
  height: 60px;
  padding-bottom: 10px;
`

const Img = styled.img`
    /* width: 100%; */
    height: 100%;
    /* width: */
    /* height:25px; 
    width:25px;  */
    border:1px solid #eaeaea;
    border-radius:50%;
    background-color: #f5f5f5;
    /* padding: 1px; */
    /* background-color:ㅎㄱ묘; */
  `

const Iconwrapper = styled.div`
    width: 30px;
    height: 30px;
    margin-left: 5px;
    /* overflow: hidden; */
`

const Iconbox = styled.div`
  display: flex;
  flex-direction: row;
`



export default EventCard;
  