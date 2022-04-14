import React, {useState,useEffect} from 'react';
import axios from "axios";
import TopnavConnection from "../layout/TopnavConnection"
import { WalletContext } from "../context/WalletContext"
import Walletmodal from "../component/Walletmodal"
import WalletOverview from "../component/WalletOverview"
import WalletTokenDetail from 'components/component/WalletTokenDetail';
import WalletKlayswapDetail from 'components/component/WalletKlayswapDetail';

const Defimanager = () => {

    const [walletaddress, setWalletaddress] = useState("")
    const [serviceState,setServiceState] = useState("overview")
    const [modalstate, setModalstate] = useState(false)
    const [assetState, setAssetState] = useState({
        totalBalance : 0,
        klayBalance : 0,
        tokenBalance : 0,
        tokenList : [],
        klayswap:{
            klayswapTotalBalance:0,
            PairPoolList : [
                {
                    "poolType": "",
                    "poolName": "",
                    "tokenAname": "",
                    "tokenBname": "",
                    "tokenAnumber": 0,
                    "tokenBnumber": 0,
                    "value": 0,
                    "tokenArray": [
                        {
                            "KLAY": 0
                        },
                        {
                            "HOUSE": 0
                        }
                    ]
                }
            ]}
    })

    useEffect(() => {
        loadAssets()  
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [walletaddress])

    const loadAssets = async () => {
        if (walletaddress.length > 0) {
            const response = await axios.get(`http://13.125.254.181:1515/wallet/klay/${walletaddress}`).then((res) => { return res.data })

            let klayBalance = Number(Number(response.klayBalance).toFixed(2))
            // let klayPrice = response.klayPrice
            let klayValue = Number(Number(response.klayValue).toFixed(2))

            // console.log("klayBalance",klayBalance)
            // console.log("klayValue",klayValue)

            // console.log(response)
            // let sliceValue = Number(response).toFixed(3)
            setAssetState({
                totalBalance: klayValue,
                klayBalance: klayBalance,
                klayValue: klayValue,
                tokenBalance: 0,
                tokenList:[],
                klayswap:{
                    klayswapTotalBalance:0,
                    PairPoolList : [
                        {
                            "poolType": "",
                            "poolName": "",
                            "tokenAname": "",
                            "tokenBname": "",
                            "tokenAnumber": 0,
                            "tokenBnumber": 0,
                            "value": 0,
                            "tokenArray": [
                                {
                                    "KLAY": 0
                                },
                                {
                                    "HOUSE": 0
                                }
                            ]
                        }
                    ]}
            })
            loadTokens({
                totalBalance: klayValue,
                klayBalance: klayBalance,
                klayValue: klayValue,
                tokenList:[],
                klayswap:{
                    klayswapTotalBalance:0,
                    PairPoolList : [
                        {
                            "poolType": "",
                            "poolName": "",
                            "tokenAname": "",
                            "tokenBname": "",
                            "tokenAnumber": 0,
                            "tokenBnumber": 0,
                            "value": 0,
                            "tokenArray": [
                                {
                                    "KLAY": 0
                                },
                                {
                                    "HOUSE": 0
                                }
                            ]
                        }
                    ]}
            })
        }

    }

    const loadTokens = async (klayObject) => {
        const response = await axios.get(`http://13.125.254.181:1515/wallet/tokens/${walletaddress}`).then((res) => { return res.data })
        // const response = {"totalValue":"76.43","tokenList":[{"tokenName":"USDK","tokenBalance":0.01909095105877624,"tokenPrice":1.0011572417755967,"tokenValue":0.01911304390487733},{"tokenName":"BTRY","tokenBalance":0.018283118456317825,"tokenPrice":25.125282617637602,"tokenValue":0.4593685183467315},{"tokenName":"KSP","tokenBalance":1.6903260229022554,"tokenPrice":4.726680890713025,"tokenValue":7.989631711527038},{"tokenName":"KLEVA","tokenBalance":0.006113431322155328,"tokenPrice":0.7732911249962086,"tokenValue":0.004727462184696552},{"tokenName":"KFI","tokenBalance":2.180638470599352,"tokenPrice":0.09045368456567841,"tokenValue":0.1972467843713772},{"tokenName":"HOUSE","tokenBalance":5.8031896494728406,"tokenPrice":0.032208578352420754,"tokenValue":0.1869124885190031},{"tokenName":"META","tokenBalance":0.1749733919587016,"tokenPrice":0.3514455209532349,"tokenValue":0.06149361488988044},{"tokenName":"KOKOA","tokenBalance":0.00773100370665,"tokenPrice":0.04383486847205331,"tokenValue":0.00033888753063795936},{"tokenName":"UFO","tokenBalance":547.2049845236141,"tokenPrice":0.05282869623815537,"tokenValue":28.90812590740252},{"tokenName":"EYE","tokenBalance":50.128604516227945,"tokenPrice":0.7701764703432482,"tokenValue":38.60787168954105}]}
        // console.log("tokenResponse : ", response)
        let tempObjecty = klayObject
        tempObjecty["totalBalance"] = Number(tempObjecty["totalBalance"]) + Number(response.totalValue)
        tempObjecty["tokenBalance"] = response.totalValue
        tempObjecty["tokenList"] = response.tokenList
        // console.log("tempObjecty", tempObjecty)

        tempObjecty.tokenList.sort(function(a, b){
            return b.tokenValue - a.tokenValue
        })

        setAssetState(tempObjecty)
        loadKlayswap(tempObjecty)
    }

    const loadKlayswap = async (innerObject) => {
        let tempObject = innerObject;
        const response = await axios.get(`http://13.125.254.181:1515/wallet/klayswap/${walletaddress}`).then((res) => { return res.data })
        // const response = {"PairPoolList":[{"poolType":"pairPool","poolName":"KlaySwap LP KLAY-HOUSE","tokenAname":"KLAY","tokenBname":"HOUSE","tokenAnumber":0.005131565942928991,"tokenBnumber":0.16164126101876955,"value":0.010508182699058295,"tokenArray":[{"KLAY":0.005131565942928991},{"HOUSE":0.16164126101876955}]},{"poolType":"pairPool","poolName":"KlaySwap LP KLAY-AKLAY","tokenAname":"KLAY","tokenBname":"AKLAY","tokenAnumber":0.001705988750061263,"tokenBnumber":0.0017206598536553654,"value":0.0034937994985513353,"tokenArray":[{"KLAY":0.001705988750061263},{"AKLAY":0.0017206598536553654}]}],"SinglePoolList":[{"poolType":"singlePool","tokenName":"KLAY","value":0.0000019442669787827275},{"poolType":"singlePool","tokenName":"KSP","value":1.1865691436863746},{"poolType":"singlePool","tokenName":"BORA","value":5.14238465758798e-7},{"poolType":"singlePool","tokenName":"KDAI","value":1.7296944873329134}],"PlusPoolList":[{"poolType":"plusPool","balanceOfLP":3.1970555726618417,"oracleOfLP":4.305660652060585,"valueOfLP":13.765436381661111,"tokenAaddress":"0x0000000000000000000000000000000000000000","tokenBaddress":"0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167","lpTokenAddress":"0xD83f1B074D81869EFf2C46C530D7308FFEC18036","pluspoolAddress":"0xc2b8d94c14fa461d85319ad518e56f669c9b15d7","tokenAname":"KLAY","tokenBname":"KUSDT","tokenAtotalNumber":6.71745415176306,"tokenBtotalNumber":6.893696521461696,"tokentotalValue":13.765436381661113,"tokenAborrow":2.0645761878921447,"tokenBborrw":2.520409,"tokenApure":4.652877963870916,"tokenBpure":4.373287521461696,"ltv":33.647785269511225},{"poolType":"plusPool","balanceOfLP":5.501673373196856,"oracleOfLP":1.0646492449620717,"valueOfLP":5.857352402801967,"tokenAaddress":"0x0000000000000000000000000000000000000000","tokenBaddress":"0xC6a2Ad8cC6e4A7E08FC37cC5954be07d499E7654","lpTokenAddress":"0x34cF46c21539e03dEb26E4FA406618650766f3b9","pluspoolAddress":"0x31a96bad29fc3eb46e4543176462e12d5293bce5","tokenAname":"KLAY","tokenBname":"KSP","tokenAtotalNumber":2.866262665986776,"tokenBtotalNumber":0.6240798901623363,"tokentotalValue":5.857352402801967,"tokenAborrow":2.0385352724848604,"tokenBborrw":0.395315386630918,"tokenApure":0.8277273935019154,"tokenBpure":0.22876450353141836,"ltv":67.23271685520658}],"stakingKSP":90,"vKSPbalance":720,"klayswapTotalBalance":15}
        // console.log("klayswap : ", response)

        tempObject["totalBalance"] = Number(tempObject["totalBalance"]) + Number(response.klayswapTotalBalance)
        tempObject["klayswap"] = response
        // console.log("tempObject",tempObject)

        setAssetState({...tempObject})
    }


    

    return (
        <>
            <WalletContext.Provider value={{walletaddress,setWalletaddress,modalstate,setModalstate,assetState,setAssetState,setServiceState}}>
                <TopnavConnection />
                <Walletmodal />
                {serviceState === "overview" ? 
                    <WalletOverview /> :
                    serviceState === "tokenDetail" ?
                    <WalletTokenDetail /> :
                        serviceState === "klayswapDetail" ?
                        <WalletKlayswapDetail /> :
                        <>Null</>
                }
            </WalletContext.Provider>
        </>
    )
}

export default Defimanager;