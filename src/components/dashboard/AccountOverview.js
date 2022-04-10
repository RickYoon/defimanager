
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2'
import icons from "../../assets/tokenIcons"


function AccountOverview() {

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

    const findAssets = async () => {
        console.log("clicked")

        if (walletaddress.length > 0 && walletaddress[0] === "0") {

            // const isWalletExist = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/checker/${walletaddress}`)
            const isWalletExist = {
                data: true
            }

            if (isWalletExist.data === true) {
                setIsloading(true)
                await loadAssets()
                setIsconnected(true)
                setIsloading(false)
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'not a valid address',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }

        } else {

            Swal.fire({
                title: 'Error!',
                text: 'not a valid address',
                icon: 'error',
                confirmButtonText: 'Cool'
            })

        }

    }

    const onChangeWalletaddress = (e) => {
        setWalletaddress(e.target.value)
        console.log(walletaddress)
    }

    return (
        <Toplayer>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "30px", fontSize: "18px", color: "#657795" }}>Total Value</div>
                <div style={{ fontSize: "24px" }}>$ 12321.22</div>
            </SubTemplateBlockVertical>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "10px", fontSize: "20px" }}>Account Overview</div>
                <Innercontainer>
                    <InnerBox>
                        <Name>
                            <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" style={{ marginRight: "16px" }} />
                            Tokens
                        </Name>
                        <Value>
                            $ 1312.22
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" style={{ marginRight: "16px" }} />
                            Liquidity Pools
                        </Name>
                        <Value>
                            $ 1312.22
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" style={{ marginRight: "16px" }} />
                            Staking
                        </Name>
                        <Value>
                            $ 1312.22
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" style={{ marginRight: "16px" }} />
                            Claimable
                        </Name>
                        <Value>
                            $ 1312.22
                        </Value>
                    </InnerBox>
                </Innercontainer>

            </SubTemplateBlockVertical>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "10px", fontSize: "20px" }}>Protocols</div>
                <Innercontainer>
                    <InnerBox>
                        <Name>
                            <img src={icons["Klayswap"]} style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klayswap
                        </Name>
                        <Value>
                            $ 1312.22
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src={icons["Klaystation"]} style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klaystation
                        </Name>
                        <Value>
                            $ 1312.22
                        </Value>
                    </InnerBox>

                </Innercontainer>

            </SubTemplateBlockVertical>





        </Toplayer>
    );
}

const Toplayer = styled.div`
    margin-left:250px;
    
    @media screen and (max-width: 500px){
        margin-left:0px;
    }

`

const Name = styled.div`
    color: #050f19;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 16px;
    justify-content: flex-start;
    font-size:16px;
    margin-bottom: 20px;

    align-items:center;
`
const Value = styled.div`
    color: #050f19;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: flex-start;
    font-size:20px;
    align-items:center;
`

// </Innercontainer>
const InnerBox = styled.div`
    
    border: 1px solid #edeff1;
    display: flex;
    padding: 16px;
    overflow: hidden;
    position: relative;
    align-items: flex-start;
    border-radius: 8px;
    flex-direction: column;
    width: 23%;
    margin: 12px;
    flex-grow:0;

    @media screen and (max-width: 500px){
        width: 100%;
    }
`

const Innercontainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content:space-around;
`

const Panel = styled.div`
    width: 80%;
    margin: 50px auto;
`



const SubTemplateBlockVertical = styled.div`
    width: 80%;
    margin: 20px auto;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    background-color:white;
    padding:15px;
    display:flex;
    flex-direction:column;

    border: 1px solid #edeff1;
    padding: 20px 25px !important;
    background: #fff;
    border-radius: 8px;
    
  @media screen and (max-width: 500px){
      width: 360px;
      font-size: 12px;
    }
    `;

const SubTemplateBlock = styled.div`
    width: 100%;
    height: 100px;
    margin: 0 auto;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    background-color:white;
    padding:15px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    
  @media screen and (max-width: 500px){
      width: 360px;
      font-size: 12px;
    }
    `;

export default AccountOverview;
