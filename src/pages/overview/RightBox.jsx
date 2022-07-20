import React, {useContext} from "react";
import * as Styled from "./RightBox.style"
import { OverviewContext } from 'components/context/OverviewContext';
import icons from "../../assets/tokenIcons"
import styled from "styled-components";
import TvlGainerCard from "./component/TvlGainerCard"
import TokenGainerCard from "./component/TokenGainerCard";

function RightBox() {

  const { isloading,toptvl,toptoken } = useContext(OverviewContext);

  return (
    <>
      <TvlGainerCard data={toptvl} isLoading={isloading}/>
      <div style={{marginTop:"15px"}}></div>

      <TokenGainerCard data={toptoken} isLoading={isloading}/>
      <div style={{marginTop:"15px"}}></div>

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
                        2022-06-13 ~ til Reward Exhausted
                    </Token>
                </Explainbox>
            </PoolinfoBox>

            <div style={{marginTop:"15px"}}></div>

            <PoolinfoBox  style={{marginLeft:"20px", marginRight:"20px", cursor:"pointer"}} onClick={()=>window.location.href = "https://medium.com/mesher/7%EC%9B%94-18%EC%9D%BC-8pm-%ED%83%80%EC%9E%84%EC%BA%A1%EC%8A%90-%EC%B6%9C%EC%8B%9C-fa8600da4336"}>
                <span style={{width:"40px", textAlign: "center", fontSize:"10px"}}>
                    Now <br/>
                    on
                </span>
                <Iconbox>
                    <Iconwrapper>
                        <Img src={icons["mesher"]} alt="logo" />
                    </Iconwrapper>
                </Iconbox>
                <Explainbox>
                    <Protocol>
                        mesher
                    </Protocol>
                    <Protocol>
                        MBX airdrop event
                    </Protocol>
                    <Token>
                        2022-07-18 ~ 2022-07-21
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
                        New Feature SNOWBALL
                    </Protocol>
                    <Token>
                        upcoming...
                    </Token>
                </Explainbox>
            </PoolinfoBoxx>


          </Styled.LowerColumn>
          <div style={{marginTop:"15px"}}></div>
      </Styled.Topdash>
      


    </>
  );
}



const Tr = styled.tr`
height : 30px;
  &:hover {
    background-color: #E8E8E8;
    border-radius:10px;
  }
`


const Td = styled.td`
  /* height:25px; */
  vertical-align:middle;
  padding-left: 1em;
  width: ${props => props.width || "30px"}

`

// const Tdp = styled.td`
//   height:35px;
//   vertical-align:middle;
//   width: 50px;
//   padding-left: 1em;
//   @media screen and (max-width: 500px){
//     /* padding-left: 1em; */
//     width: 50px;
//   }
// `

// const skeletonKeyframes = keyframes`
//   0% {
//     background-position: -200px 0;
//   }
//   100% {
//     background-position: calc(200px + 100%) 0;
//   }
// `;

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



export default RightBox;
  