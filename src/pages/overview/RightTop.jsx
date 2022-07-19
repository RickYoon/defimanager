import React, {useContext} from "react";
import * as Styled from "./RightTop.style"
import { OverviewContext } from 'components/context/OverviewContext';
import icons from "../../assets/tokenIcons"
import styled from "styled-components";
import { Link } from "react-router-dom";

function RightTop() {

  const skeletonArray = [0,0,0];

  const { isloading,toptvl,toptoken } = useContext(OverviewContext);
  // console.log("tvldata : ", tvldata.total.tvl)
  // console.log("tvldata : ", tvldata.total.difftwo)
//   console.log("toptoken", toptoken)
  return (
    <>
      <Styled.Topdash>
          <Styled.UpperColumn>
              Top Gainer Projects
              <Styled.Righttext> 1day - % / TVL </Styled.Righttext>
          </Styled.UpperColumn>
          <Styled.LowerColumn>
              {isloading ? 
                skeletonArray.map((arr)=>
                   <Styled.ProjectBox>
                       <tr>
                            <th style={{width:"30px"}}><Styled.ProductSkeleton /></th>
                            <td style={{width:"45px"}}><Styled.IconSkeleton /></td>
                            <td style={{width:"90px"}}><Styled.ProductSkeleton style={{width:"80%"}} /></td>
                            <td style={{width:"60px", fontSize:"13px", textAlign:"center", color:"red"}}><Styled.ProductSkeleton /></td>
                            <td style={{width:"60px", fontSize:"12px", paddingLeft:"5px", textAlign:"center"}}><Styled.ProductSkeleton /></td>
                       </tr>
                    </Styled.ProjectBox>    
                    )          
              :
              toptvl.map((toptvlElement,index) => 
                        <Styled.ProjectBox>
                            <tr>
                                <th style={{width:"30px"}}>{index+1}</th>
                                <td style={{width:"45px",height:"45px"}}><Styled.Img src={icons[toptvlElement.proj]} alt="logo" height="45px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> </td>
                                <td style={{width:"90px"}}>
                                    <Link to={`/project/${toptvlElement.proj}`}>
                                        {toptvlElement.proj}
                                    </Link>
                                </td>
                                <td style={{width:"60px", fontSize:"13px", textAlign:"right", color:"red"}}>{(toptvlElement.difftwo).toFixed(1)} %</td>
                                <td style={{width:"60px", fontSize:"12px", paddingLeft:"5px", textAlign:"right"}}><TvlDiffAfter data={toptvlElement} /></td>
                            </tr>
                        </Styled.ProjectBox>
                        
                )}
          </Styled.LowerColumn>
      </Styled.Topdash>
      <div style={{marginTop:"15px"}}></div>
      <Styled.Topdash>
      <Styled.UpperColumn>
              Top Gainer Tokens
              <Styled.Righttext> 1day / 7days  </Styled.Righttext>
          </Styled.UpperColumn>
          <Styled.LowerColumn>
          {isloading ? 
                skeletonArray.map((arr)=>
                   <Styled.ProjectBox>
                       <tr>
                            <th style={{width:"30px"}}><Styled.ProductSkeleton /></th>
                            <td style={{width:"45px"}}><Styled.IconSkeleton /></td>
                            <td style={{width:"90px"}}><Styled.ProductSkeleton style={{width:"80%"}} /></td>
                            <td style={{width:"60px", fontSize:"13px", textAlign:"center", color:"red"}}><Styled.ProductSkeleton /></td>
                            <td style={{width:"60px", fontSize:"12px", paddingLeft:"5px", textAlign:"center"}}><Styled.ProductSkeleton /></td>
                       </tr>
                    </Styled.ProjectBox>    
                    )          
              : 
              toptoken.map((TopTokenElement,index) => 

              
                        <Styled.ProjectBox>
                            <tr>
                                <th style={{width:"30px"}}>{index+1}</th>
                                <td style={{width:"45px"}}><Styled.Img src={icons[TopTokenElement.token]} alt="logo" height="30px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> </td>
                                <td style={{width:"80px"}}>
                                    <Link to={`/project/${TopTokenElement.project}`}>
                                        {TopTokenElement.token}
                                    </Link>
                                </td>
                                <td style={{width:"60px", fontSize:"13px", textAlign:"right", color:"red"}}>{(TopTokenElement.priceDiff)} %</td>
                                {TopTokenElement.sevenPriceDiff === 0 ? 
                                 <td style={{width:"60px", fontSize:"12px", paddingLeft:"5px", textAlign:"right", color:"#E8720C"}}>new</td>
                                :
                                 <td style={{width:"60px", fontSize:"12px", paddingLeft:"5px", textAlign:"right"}}>{(TopTokenElement.sevenPriceDiff)} %</td>
                                }
                            </tr>
                        </Styled.ProjectBox>
                        
                )}
          </Styled.LowerColumn>
      </Styled.Topdash>
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

function TvlDiffAfter(props) {

    console.log(props)
    let difference = props.data.tvl-props.data.tvltwo
    // +{(toptvlElement.tvl-toptvlElement.tvltwo).toFixed(0)}
    return (
        <>
        {difference > 1000000 ?
            <>+ {(difference/1000000).toFixed(1)} M</> :
            difference > 1000 ?
            <>+ {(difference/1000).toFixed(1)} K</> :
            <>+ {difference.toFixed(1)}</>
            }

        
        </>
    )
}

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



export default RightTop;
  