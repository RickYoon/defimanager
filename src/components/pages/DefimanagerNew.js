import React, {useState,useEffect} from 'react';
import axios from "axios";
import TopnavManagerMobile from "../layout/TopnavManagerMobile"
import SideNav from "../layout/Sidenav"
import { WalletContext } from "../context/WalletContext"
import Walletmodal from "../component/Walletmodal"
import WalletOverview from "../component/WalletOverviewSide"
import History from "../component/History"
import Settings from "../component/Settings"
import WalletTokenDetail from 'components/component/WalletTokenDetail';
import WalletKlayswapDetail from 'components/component/WalletKlayswapDetail';
import WalletKlaystationDetail from 'components/component/WalletKlaystationDetail';
import WalletKronosDetail from 'components/component/WalletKronosDetail';
import WalletKairoscashDetail from 'components/component/WalletKairoscashDetail';
import styled from "styled-components";
import initialState from "./state/initialAssetState.json"

import WalletTokenDetailTable from "components/component/WalletTokenDetailTable"

const DefimanagerNew = () => {

    const [walletaddress, setWalletaddress] = useState("")
    const [serviceState,setServiceState] = useState("portfolio")
    const [isloading, setIsloading] = useState(false)
    const [modalstate, setModalstate] = useState(false)
    const [fullload, setFullload] = useState(false)
    const [assetState, setAssetState] = useState(initialState)

    useEffect(() => {
        if (walletaddress.length > 0) {
            startWalletScanning()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [walletaddress])

    useEffect(() => {
        if (fullload) {
            sendLatest()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [fullload])

    async function sendPriceData(jsondata) {
        try {
            return await axios.post("https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/walletInsert", jsondata).then(function (response) {
                console.log(response)
                setFullload(false)
            });
        } catch (error) {
            console.error(error);
        }
    }
    
    async function startWalletScanning() {
        let lastdata = await checkLastData(walletaddress)
        // console.log("lastdata",lastdata)

        if(lastdata.data.Count > 0){
            const blockInfo = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/blockInfos/${walletaddress}`).then((res) => { return res.data })
            console.log(blockInfo.txCount)
            console.log(lastdata.data.Items[0].txCount)
            if(lastdata.data.Items[0].txCount === blockInfo.txCount){
                // no transactions after latest query
                setIsloading(true)
                await getKlay()
                await getKlaystation()
                await getKronos()
                await getKairoscash()
                await getToken()
                await getklayswap()    

                // await getTokensQuick(lastdata.data.Items[0])
                // await getklayswapQuick(lastdata.data.Items[0])
                // await sendLatest()
                // setIsloading(false)

            } else {
                // yes transactions after latest query
                setIsloading(true)
                await getKlay()
                await getKlaystation()
                await getKronos()
                await getKairoscash()
                await getToken()
                await getklayswap()    
            }
        } else {
            // full scanning
            setIsloading(true)
            await getKlay()
            await getKlaystation()
            await getKronos()
            await getKairoscash()
            await getToken()
            await getklayswap()
            // await sendLatest()
            // setIsloading(false)
        }
    }

    async function checkLastData(address) {
        try {
            let lastData = await axios.get(`https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/checkAddressExist?address=${address}`)
            // console.log(kk.data.Items)
            // console.log(kk.data.Count)
            return lastData
        } catch (error) {
            console.error(error);
        }
    }

    const getKlay = async () => {

        // console.log("wallet : ", walletaddress)

        try {
            const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/klay/${walletaddress}`).then((res) => { return res.data })

            let klayBalance = Number(Number(response.klayBalance).toFixed(2))
            let klayValue = Number(Number(response.klayValue).toFixed(2))
            // let klayPrice = response.klayPrice
            
            setAssetState((prevState)=>{
                return { ...prevState, 
                    totalBalance: klayValue,
                    klayBalance: klayBalance,
                    klayValue: klayValue
                }
            })

        }
        catch (err) {
            console.log(err)
        }
    }

    const getToken = async () => {

        // console.log("wallet : ", walletaddress)

        try {
            const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/tokens/${walletaddress}`).then((res) => { return res.data })

            response.tokenList.sort(function(a, b){
                return b.tokenValue - a.tokenValue
            })

            setAssetState((prevState)=>{
                return { ...prevState, 
                    totalBalance: Number(prevState.totalBalance) + Number(response.totalValue),
                    tokenBalance: response.totalValue,
                    tokenList: response.tokenList
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    const getKlaystation = async () => {

        const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/klaystation/${walletaddress}`).then((res) => { return res.data })

        setAssetState((prevState)=>{
            return { ...prevState, 
                totalBalance: Number(prevState.totalBalance) + Number(response.value),
                klaystation: response,
            }
        })

    }

    const getKronos = async () => {

        const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/kronos/${walletaddress}`).then((res) => { return res.data })

        setAssetState((prevState)=>{
            return { ...prevState, 
                totalBalance: Number(prevState.totalBalance) + Number(response.value),
                kronosdao: response,
            }
        })
    }

    const getKairoscash = async () => {

        const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/kairoscash/${walletaddress}`).then((res) => { return res.data })

        setAssetState((prevState)=>{
            return { ...prevState, 
                totalBalance: Number(prevState.totalBalance) + Number(response.value),
                kairoscash: response,
            }
        })
    }

    const getklayswapQuick = async (lastdata) => {

        console.log("lastdata",lastdata)
        const temp = await axios.post(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/klayswapQuick`,{
            "address" : lastdata.address,
            "pairPoolId" : lastdata.pairPoolId
        }
        ).then((res) => {
            console.log("response received: ", res);
            setAssetState((prevState)=>{
                return { ...prevState, 
                    totalBalance: Number(prevState.totalBalance) + Number(res.data.klayswapTotalBalance),
                    klayswap: res.data,
                    lastPairList: res.data.lastPairList,
                    pairPoolId: res.data.pairPoolId
                }
            })
            setIsloading(false)
            setFullload(true)
        })
        .catch((err) => {
            console.log("axios error: ", err);
        })      
    }

    const getTokensQuick = async (lastdata) => {

        console.log("lastdata",lastdata)

        let address = lastdata.address
        let tokenList = lastdata.assetDetail.tokenList || []

        const temp = await axios.post(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/tokenQuick`,{
            "address" : address,
            "tokenList" : tokenList
        }
        ).then((res) => {
            console.log("response received for tokens : ", res);

            if(tokenList.length > 0 ){
                setAssetState((prevState)=>{
                    return { ...prevState, 
                        totalBalance: Number(prevState.totalBalance) + Number(res.data.totalValue),
                        tokenBalance: res.data.totalValue,
                        tokenList: tokenList
                    }
                })
            } else {
                setAssetState((prevState)=>{
                    return { ...prevState, 
                        totalBalance: Number(prevState.totalBalance) + 0,
                        tokenBalance: 0,
                        tokenList: 0
                    }
                })                
            }

            // setIsloading(false)
            // setFullload(true)
        })
        .catch((err) => {
            console.log("axios error: ", err);
        })      
    }

    const getklayswap = async () => {

        const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/klayswap/${walletaddress}`).then((res) => { return res.data })

        console.log("klayswap", response)

        setAssetState((prevState)=>{
            return { ...prevState, 
                totalBalance: Number(prevState.totalBalance) + Number(response.klayswapTotalBalance),
                klayswap: response,
                lastPairList: response.lastPairList,
                pairPoolId: response.pairPoolId
            }
        })
        setIsloading(false)
        setFullload(true)

        // await sendLatest(assetState)
    }

    const sendLatest = async () => {
        const latestInfo = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/blockInfos/${walletaddress}`).then((res) => { return res.data })

        let tempRes = {
            "data" : {
                address : walletaddress,
                assetDetail : assetState,
                assetTotal : assetState.totalBalance,
                lastPairList : assetState.lastPairList,
                pairPoolId : assetState.pairPoolId,
                txCount : latestInfo.txCount,
                blockNumber : latestInfo.blockNumber
            }
        }
        await sendPriceData(tempRes)    
    }

    return (
        <>
            <WalletContext.Provider value={{walletaddress,setWalletaddress,modalstate,setModalstate,assetState,setAssetState,setServiceState,isloading,serviceState}}>
                <Container>
                <WalletTokenDetailTable />
                {/* <WalletOverview />  */}
                </Container>
            </WalletContext.Provider>
        </>
    )
}

const Container = styled.div`
    width: 1200px;
    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
`

export default DefimanagerNew;