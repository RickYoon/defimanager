import React, {useContext} from "react";
import { PoolContext } from 'components/context/PoolContext';
import styled, { keyframes } from "styled-components";
import icons from "../../assets/tokenIcons"
import * as Styled from "./ListTable.style"


function ListTable() {

  const skeletonArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  const { isloading, pooldata } = useContext(PoolContext);

  return (
    <>
      <TodoTemplateBlock>
        <table>
          <thead>
            <tr style={{ height: "40px", borderBottom: "2px solid black " }}>
              <Th className="head" style={{ width: "5%", textAlign: "center" }}>#</Th>
              <Tdc className="head" style={{ width: "5%", textAlign: "center", fontSize:"13px" }}>@</Tdc>
              <Th className="head" style={{ width: "40%", textAlign: "left", fontSize:"13px" }}>POOLINFO</Th>
              <Tdc className="head" style={{ width: "15%", textAlign: "left", fontSize:"13px" }}>TYPE</Tdc>
              <Tdc className="content" style={{ width: "10%", fontSize:"13px" }}>REWARDS</Tdc>
              <Td className="content" style={{ width: "10%", textAlign: "right", fontSize:"13px" }}>TVL($)</Td>
              <Td className="content" style={{ width: "10%", textAlign: "right", fontSize:"13px" }}>APR(%)</Td>
            </tr>
          </thead>
          <tbody>
                  
          {isloading ? 
            skeletonArray.map((skelton,index)=>(
            <tr key={index} style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4 " }}>
                 <Styled.Th className="head" style={{ width: "30px", textAlign: "left" }}><Styled.ProductSkeleton/></Styled.Th>
                 <Styled.Tdc className="head" style={{ height: "20px", width: "30px", textAlign: "left", whiteSpace: "nowrap" }}>
                     <Styled.IconSkeleton style={{ padding: "1px",borderRadius: "15px"}}/>
                     <Styled.ProductSkeleton style={{whiteSpace: "nowrap", marginLeft:"10px", height:"25px"}}/>
                </Styled.Tdc>
                 <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><Styled.ProductSkeleton/></Styled.Tdc>
                 <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><Styled.ProductSkeleton/></Styled.Tdc>
                 <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><Styled.ProductSkeleton/></Styled.Tdc>
                 <Styled.Td className="content" style={{ width: "200px", textAlign: "right" }}><Styled.ProductSkeleton/></Styled.Td>
                <Styled.Td className="content" style={{ width: "50px", textAlign: "right" }}><Styled.ProductSkeleton/></Styled.Td>
            </tr>))
            :
            pooldata.map((pool, index) => (
            <Tr style={{ height: "50px", borderBottom: "0.06em solid #D4D4D4 " }}>
                <Th className="head" style={{ width: "30px", textAlign: "center", fontSize: "13px" }}>{index+1}</Th>
                <Tdc>                    
                  {pool.protocol.split("-")[0] === "klaystation" ?
                      <Imgs src={icons["Klaystation"]} alt="logo" height="15px" width="15px" style={{ marginLeft:"10px", padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                      : pool.protocol === "hashquark" ?
                        <Imgs src={icons["KLAYportal"]} alt="logo" height="18px" width="18px" style={{ marginLeft:"10px",  padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />                  
                          :
                          <Imgs src={icons[pool.protocol]} alt="logo" height="18px" width="18px" style={{ marginLeft:"10px",  padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                      }</Tdc>
                <Th>
                  <PoolinfoBox>
                    <Iconbox>
                    {pool.poolinfo.map((token)=>(
                      <Iconwrapper>
                        {token.split("-")[0] === "klap" ?
                          <Img src={icons[token.replace("-","")]} alt="logo" fontSize="20px"/> :
                          icons[token] === undefined ? 
                          <Img src={icons["defToken"]} alt="logo" fontSize="20px"/> :
                          <Img src={icons[token]} alt="logo" fontSize="20px"/>
                        }
                      </Iconwrapper>
                    ))}
                    </Iconbox>
                    <Explainbox>
                    <Protocol>
                      
                    {pool.protocol}

                    </Protocol>
                    <Token>
                      {pool.poolinfo.map((token,index)=>{
                        if (index + 1 === pool.poolinfo.length) {
                          return token
                        } else {
                          return token  + " + " 
                        }
                      })}
                    </Token>
                    </Explainbox>
                  </PoolinfoBox>
                </Th>
                <Tdc className="head" style={{ width: "30px", textAlign: "left", fontSize:"12px" }}>{pool.type}</Tdc>
                <Tdc className="head" style={{ width: "30px", fontSize:"12px", color: "gray"}}>
                  {pool.reward.map((res)=> res!=="fee" ? 
                      <Imgs src={icons[res]} alt="logo" height="18px" width="18px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> 
                      : 
                      pool.reward.length !== 1 ?
                      res + " + " :
                      res
                    )
                  }
                  {
                    pool.isAirdropPool ?
                    pool.airdropToken.map((res)=>
                      <> <img src={icons[res]} alt={res} height="18px" width="18px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> </>
                    )
                    :
                    <></>
                  }
                </Tdc>
                <Td className="content" style={{ width: "20px", fontSize:"13px",textAlign: "right"}}>{pool.tvl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Td>
                <Td className="head" style={{ height: "50px", width: "20px", paddingLeft: "1em", textAlign: "right", fontSize:"13px" }}>{Number(pool.apr).toFixed(1)}</Td>
              </Tr>
              ))
              }           
            </tbody>
        </table>
      </TodoTemplateBlock>

    </>
  );
}


const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;


const ProductSkeleton = styled.div`
  display: inline-block;
  height: ${props => props.height || "20px"};
  width: ${props => props.width || "50%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(
    90deg,
    #eee,
    #f5f5f5,
    #eee
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: ${props => props.marginTop || "0"}
`;

const Searchbox = styled.div`
  width: 900px;
  margin: 0 auto;
  gap: 24px;
  border: 1px solid #edeff1;
  display: flex;
  padding: 15px 24px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 1px 1px 1px gray;

  @media screen and (max-width: 500px){
  width: 360px;
  box-shadow: 1px 1px 1px gray;
  }

`

const Protocol = styled.div`
  padding-left: 15px;
  text-decoration: underline;
  font-size: 12px;
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
`

const Filterbox = styled.a`
  color: black;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .05rem;
  /* padding: 0.5rem 1rem; */
`

const Selectionbutton = styled.a`
  background-color: #0a1930;
  border: 1px solid #fff;
  border-radius: 999px;
  color: #fff;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .05rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  text-transform: capitalize;
  transition: all .3s ease-in-out;
  cursor: pointer;
`

const Unselectionbutton = styled.a`
  /* background-color: #0a1930; */
  border: 1px solid #fff;
  border-radius: 999px;
  color: black;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .05rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  text-transform: capitalize;
  transition: all .3s ease-in-out;
  cursor: pointer;

`

const Topdash = styled.div`
  width: 900px;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 30px;
  @media screen and (max-width: 500px){
    width: 360px;
  }
`

const Leftcolumn = styled.div`
  width:30%;

  @media screen and (max-width: 500px){
  width:200px;
  /* padding: 0;
  margin-bottom:10px;
  margin-right: 0px; */

  }
`


const Row = styled.div`
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:space-between;
  @media screen and (max-width: 500px){
    width:380px;
    display:flex;
    flex-direction:row;
}`

const Rightcolumn = styled.div`
  /* width:15%; */
  float:right;

  @media screen and (max-width: 500px){
    float:right;
    padding-right:20px;

  }
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

const Imgs = styled.img`
  width: 20px;
  height: 20px;
  border: 0.5px solid #eaeaea;
  border-radius:50%;
`

const Iconwrapper = styled.div`
    width: 15px;
    height: 25px;
    /* overflow: hidden; */
`

const Iconbox = styled.div`
  display: flex;
  flex-direction: row;
`


const TodoTemplateBlock = styled.div`
  width: 100%;
  /* max-height: 1024px; */

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 1px 1px 1px gray;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  /* margin-top: 16px; */
  margin-bottom: 16px;
  padding-left:18px;
  padding-right:20px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;

  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-width: 0px;
  overflow-wrap: break-word;
  background-color: rgb(255, 255, 255);
  background-clip: border-box;
  border: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  overflow: visible;
  
  .loader {
    margin-left:200px;
  }
  
  @media screen and (max-width: 950px){
    width: 90%;
    padding-left:20px;
    padding-right:20px;
    border-radius: 8px;
    box-shadow: 1px 1px 1px gray;

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    border: 0px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;

    .loader {
      margin-left:135px;
    }
    .mobtrans{
      display:none;
    }
    .tablecss{
      font-size:13px;
      
    }
    /* .head{
    }
    .headcol:before {
      content: 'Row ';
    }
  .content {
    background: #8cdba3;
} */
  }
`;

const Th = styled.th`
  height:25px;
  vertical-align:middle;
  padding-left:5px;
`;

const Tdc = styled.td`
  @media screen and (max-width: 500px){
    display:none;
  }
  height:25px;
  vertical-align:middle;
`;

const Tdp = styled.td`
  height:25px;
  vertical-align:middle;
  width: 300px;
  padding-left: 2em;
  @media screen and (max-width: 500px){
    padding-left: 1em;
    width: 250px;
  }
`

const Td = styled.td`
  height:25px;
  vertical-align:middle;
`

const Tr = styled.tr`
  &:hover {
    background-color: #E8E8E8;
  }
`
const Tdpd = styled.td`
  &:hover {
    text-decoration:underline;
    color:#3366cc;
  }
  cursor: pointer;
  height:25px;
  vertical-align:middle;
  width: 400px;
  padding-left: 2em;
  @media screen and (max-width: 500px){
    padding-left: 10px;
    font-size:13px;
    width: 1000px;
  }
`




export default ListTable;
