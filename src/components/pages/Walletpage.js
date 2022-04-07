
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2'


function Walletpage() {

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
        <>
            {isloading ?
                <SubTemplateBlock style={{ marginTop: "50px", backgroundColor: "#F7F7F7" }}>
                    <div style={{ paddingTop: "300px", paddingBottom: "300px", margin: "0 auto" }}>
                        <ReactLoading type="spinningBubbles" width="50px" color="black" />
                        <div>searching...</div>
                    </div>
                </SubTemplateBlock>
                : isconnected ?
                    <>
                        <div style={{ paddingTop: "30px" }}></div>
                        <SubTemplateBlock>
                            <div style={{ width: "300px" }}>ASSET MANAGER (BETA)</div>
                        </SubTemplateBlock>

                        <div style={{ paddingTop: "10px" }}></div>
                        <SubTemplateBlockVertical>
                            <div style={{ width: "300px" }}>연결되었음 </div>
                            <div style={{ marginTop: "20px" }}>v Klayswap (single/pair/plus pool, ksp/vksp staking)</div>
                            <div style={{ marginTop: "20px" }}>v Klaystation (klay staking)</div>
                        </SubTemplateBlockVertical>


                        <SubTemplateBlock style={{ marginTop: "500px", height: "80px" }}>
                            <input
                                placeholder="wallet address"
                                value={walletaddress}
                                onChange={onChangeWalletaddress}
                                style={{ width: "80%" }}
                                required
                            ></input>
                            <button onClick={findAssets}>조회</button>
                        </SubTemplateBlock>
                    </> :
                    <>
                        <div style={{ paddingTop: "30px" }}></div>
                        <SubTemplateBlock>
                            <div style={{ width: "300px" }}>ASSET MANAGER (BETA)</div>
                        </SubTemplateBlock>

                        <div style={{ paddingTop: "10px" }}></div>
                        <SubTemplateBlockVertical>
                            <div style={{ width: "300px" }}>connecting projects</div>
                            <div style={{ marginTop: "20px" }}>v Klayswap (single/pair/plus pool, ksp/vksp staking)</div>
                            <div style={{ marginTop: "20px" }}>v Klaystation (klay staking)</div>
                        </SubTemplateBlockVertical>


                        <SubTemplateBlock style={{ marginTop: "500px", height: "80px" }}>
                            <input
                                placeholder="wallet address"
                                value={walletaddress}
                                onChange={onChangeWalletaddress}
                                style={{ width: "80%" }}
                                required
                            ></input>
                            <button onClick={findAssets}>조회</button>
                        </SubTemplateBlock>
                    </>
            }

        </>
    );
}

const SubTemplateBlockVertical = styled.div`
    width: 900px;
    margin: 0 auto;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    background-color:white;
    padding:15px;
    display:flex;
    flex-direction:column;
    
  @media screen and (max-width: 500px){
      width: 360px;
      font-size: 12px;
    }
    `;

const SubTemplateBlock = styled.div`
    width: 900px;
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

export default Walletpage;
