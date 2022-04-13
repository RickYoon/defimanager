import React, {useState,useEffect} from 'react';
import axios from "axios";
import TopnavConnection from "../layout/TopnavConnection"
import { WalletContext } from "../context/WalletContext"
import Walletmodal from "../component/Walletmodal"
import WalletOverview from "../component/WalletOverview"

const Defimanager = () => {

    const [walletaddress, setWalletaddress] = useState("")
    const [modalstate, setModalstate] = useState(false)
    const [assetState, setAssetState] = useState({
        totalBalance : 0,
        klayBalance : 0,
        tokenBlance : 0
    })

    useEffect(() => {
        loadAssets()  
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [walletaddress])

    const loadAssets = async () => {
        if (walletaddress.length > 0) {
            const response = await axios.get(`http://13.125.254.181:1515/wallet/klay/${walletaddress}`).then((res) => { return res.data })
            // const response = 10
            console.log(response)
            let sliceValue = Number(response).toFixed(3)
            setAssetState({
                totalBalance:Number(sliceValue),
                klayBalance:Number(sliceValue),
                tokenBlance : 0
            })
            loadTokens()
        }

    }

    const loadTokens = async () => {
        const response = await axios.get(`http://13.125.254.181:1515/wallet/tokens/${walletaddress}`).then((res) => { return res.data })
        setAssetState({
            tokenBalance : response.totalValue
        })
    }

    return (
        <>
            <WalletContext.Provider value={{walletaddress,setWalletaddress,modalstate,setModalstate,assetState,setAssetState}}>
                <TopnavConnection />
                <Walletmodal />
                <WalletOverview />
            </WalletContext.Provider>
        </>
    )
}

export default Defimanager;