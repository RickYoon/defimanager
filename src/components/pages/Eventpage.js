
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2'


function Eventpage() {

    const [assets, setAssets] = useState({})
    const [isconnected, setIsconnected] = useState(true)
    const [isloading, setIsloading] = useState(false)
    const [walletaddress, setWalletaddress] = useState("")

    useEffect(() => {
        loadAssets()
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    const loadAssets = async () => {
        //     const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/${walletaddress}`, {
        //         headers: {
        //             authorization: "secretToken"
        //         }
        //     }).then((res) => { return res.data })
        //     console.log(response)

        // wallet address 를 입력하고 조회를 누르면
        // 백앤드에서 자산정보를 불러오고, 화면에 출력을 시작한다.
        let response = { "queryTime": "2022-04-07T10:13", "userWallet": { "walletAddress": "0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8" }, "totalBalance": 0, "balanceDetail": { "klayswap": { "pairPoolInfo": { "PoolList": [], "totalTokenList": {}, "totalPairPoolBalance": 0 }, "singlePoolInfo": { "PoolList": [{ "poolType": "singlePool", "poolName": "KLAY", "poolTokens": 0.0000019432433823492244, "value": 0.000003886486764698449 }, { "poolType": "singlePool", "poolName": "KSP", "poolTokens": 1.1840810935583184, "value": 2.3681621871166367 }, { "poolType": "singlePool", "poolName": "BORA", "poolTokens": 5.141951747519305e-7, "value": 0.000001028390349503861 }, { "poolType": "singlePool", "poolName": "KDAI", "poolTokens": 1.7293374915712771, "value": 3.4586749831425543 }] }, "kspInfo": { "VKSPbalance": 720, "lockedKSP": 90 } }, "klaystation": 9.013458489937088 } }
        console.log(response)
        setAssets(response)
    }



    return (
        <>
            <Topdash>
                <Row>
                    <Leftcolumn>
                        <Topcard>
                            <Containersub style={{ margin: "15px" }}>
                                <Daybox>14</Daybox>
                                <Daybox>Tue</Daybox>
                                <Catbox>Launching</Catbox>
                                <Catbox>PeterFarm</Catbox>
                                {/* <span style={{ textAlign: "left", fontFamily: "OpenSans-Medium", fontSize: "20px" }}> 08 </span>
                                <span style={{ float: "right", fontFamily: "OpenSans-Semibold", fontSize: "20px", color: "#316395" }}> PALA </span> */}
                                <Detailbox>PeterFarm은 NFT 파밍 및 부스팅 그리고 다수의 특별한 기능을 탑재한 클래식 일드 파밍 프로젝트입니다.</Detailbox>
                            </Containersub>
                        </Topcard>
                    </Leftcolumn>
                </Row>
            </Topdash>

        </>
    );
}

// 이벤트날짜, 이벤트타입, 이벤트이름, 프로젝트, 

const Topdash = styled.div`
 width: 900px;
 margin: 0 auto;
 @media screen and (max-width: 500px){
  width: 360px;
 }
`

const Detailbox = styled.div`
width:100%;
background-color:red;
text-align:center;
font-size:12px;
 @media screen and (max-width: 500px){
 }
`

const Daybox = styled.div`
width:50px;
background-color:red;
text-align:center;
font-size:18px;
 @media screen and (max-width: 500px){
 }
`

const Catbox = styled.div`
width:100px;
background-color:red;
text-align:center;
vertical-align:bottom;
font-size:15px;
text-decoration:underline;
 @media screen and (max-width: 500px){
 }
`


const Containersub = styled.div`
display:flex;
flex-direction:row;
@media screen and (max-width: 500px){
    }
    `


const Topcard = styled.div`
    background-color:white;
    padding:5px;
    border-radius: 10px;
@media screen and (max-width: 500px){
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
  flex-direction:column;

      }
`

const Leftcolumn = styled.div`
  width:100%;
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
  margin-right: 5px;


  @media screen and (max-width: 500px){
  width:360px;
  padding: 0;
  margin-bottom:10px;
  margin-right: 0px;

  }
`

const Rightcolumn = styled.div`
  width:50%;
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
  margin-left: 5px;


  @media screen and (max-width: 500px){
  width:360px;
  padding: 0;
  margin-bottom:10px;
  margin-left: 0px;

  }
`

const Upperbox = styled.div`
  width : 100%;
  height: 300px;
  font-size : 15px;
  @media screen and (max-width: 500px){
    font-size : 12px;
    margin-left: 10px;
    height:100%;
  }
`;

const Vacancy = styled.div`
    height: 30px;
  @media screen and (max-width: 500px){
    height: 0px;
  }
`;

const Tdh = styled.td`
    cursor:pointer;
    &:hover {
    color:blue;
    text-decoration:underline;
  }

  @media screen and (max-width: 500px){
    height: 0px;
  }
`;




const Downbox = styled.div`
  width : 100%;
  height: 120px;
  font-size : 15px;
  @media screen and (max-width: 500px){
    font-size : 12px;
    height: 100%;
  }

`;

const Infobox = styled.div`
  width: 900px;
  margin : 0 auto;
  display : flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  height:500px;

  @media screen and (max-width: 500px){
    flex-direction: column;
    width: 360px;
    height:100%;
  }
`

const TodoTemplateBlock = styled.div`
  width: 59%;
  /* max-height: 1024px; */
  /* display: flex;
  flex-wrap:wrap; */

  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin-top: 16px;
  margin-bottom: 5px;
  padding-bottom:10px;
  .loader {
    margin-left:200px;
  }
  
  @media screen and (max-width: 500px){
    width: 360px;
    padding-left:0px;
    padding-right:0px;

    .loader {
      margin-left:135px;
    }
    .mobtrans{
      display:none;
    }
    .tablecss{
      font-size:15px;
      
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

const Twitterbox = styled.div`
  float : right;
  width: 39%;
  margin-Top : 15px;
  padding : 3px;
  background: white;
  border-radius: 16px;
  font-family: 'OpenSans-Semibold';
  font-weight: bold;
  font-size: 12px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  @media screen and (max-width: 500px){
    width: 100%;
  }
`

const TemplateBlockinner = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right:10px;

  @media screen and (max-width: 500px){
    display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right:10px;
  }
`;


const SubTemplateBlock = styled.div`
  width: 900px;
  max-height: 768px;
  margin: 0 auto;
  padding-bottom: 10px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */

  

  @media screen and (max-width: 500px){
    width: 360px;
    font-size: 12px;
  }
`;


const Chartcover = styled.div`
  width: 900px;
  /* height: 270px; */
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  padding:10px;
  margin-top: 10px;
  max-height:520px;


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
    padding-left:200px;
  }
  @media screen and (max-width: 500px){
    width: 95%;
    margin-top: 0px;
    width: 360px;


  }
`


export default Eventpage;
