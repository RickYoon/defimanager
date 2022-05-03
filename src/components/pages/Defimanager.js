import React, {useState,useEffect} from 'react';
import axios from "axios";
import TopnavConnection from "../layout/TopnavConnection"
import { WalletContext } from "../context/WalletContext"
import Walletmodal from "../component/Walletmodal"
import WalletOverview from "../component/WalletOverview"
import WalletTokenDetail from 'components/component/WalletTokenDetail';
import WalletKlayswapDetail from 'components/component/WalletKlayswapDetail';
import WalletKlaystationDetail from 'components/component/WalletKlaystationDetail';
import WalletKronosDetail from 'components/component/WalletKronosDetail';
import WalletKairoscashDetail from 'components/component/WalletKairoscashDetail';


const Defimanager = () => {

    const [walletaddress, setWalletaddress] = useState("")
    const [serviceState,setServiceState] = useState("overview")
    const [isloading, setIsloading] = useState(false)
    const [modalstate, setModalstate] = useState(false)
    const [assetState, setAssetState] = useState({
        totalBalance : 0,
        klayBalance : 0,
        tokenBalance : 0,
        tokenList : [],
        klaystation: {
            value : 0
        },
        kronosdao: {
            value : 0
        },
        kairoscash: {
            value : 0
        },
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

    async function sendPriceData(jsondata) {
        try {
            return await axios.post("https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/walletInsert", jsondata).then(function (response) {
                console.log(response)
            });
        } catch (error) {
            console.error(error);
        }
    }    

    const loadAssets = async () => {
        if (walletaddress.length > 0) {
            console.log("wallet : ", walletaddress)

            try {
            setIsloading(true)
            const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/klay/${walletaddress}`).then((res) => { return res.data })

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
                kronosdao: {
                    value : 0
                },
                klaystation: {
                    value : 0
                },
                kairoscash: {
                    value : 0
                },        
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
                klaystation: {
                    value : 0
                },     
                kronosdao: {
                    value : 0
                },   
                kairoscash: {
                    value : 0
                },        
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
        catch (err) {
            console.log(err)
        }
        } else {
            setAssetState({
                totalBalance: 0,
                klayBalance: 0,
                klayValue: 0,
                tokenBalance: 0,
                tokenList:[],
                kronosdao: {
                    value : 0
                },
                klaystation: {
                    value : 0
                },
                kairoscash: {
                    value : 0
                },        
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
        console.log(klayObject)
        const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/tokens/${walletaddress}`).then((res) => { return res.data })
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
        // loadKlayswap(tempObjecty)
        loadKlaystation(tempObjecty)
    }

    const loadKlaystation = async (innerObject) => {
        let tempObject = innerObject;
        const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/klaystation/${walletaddress}`).then((res) => { return res.data })
        console.log("klaystation", response)
        // const response = {"PairPoolList":[{"poolType":"pairPool","poolName":"KlaySwap LP KLAY-HOUSE","tokenAname":"KLAY","tokenBname":"HOUSE","tokenAnumber":0.005131565942928991,"tokenBnumber":0.16164126101876955,"value":0.010508182699058295,"tokenArray":[{"KLAY":0.005131565942928991},{"HOUSE":0.16164126101876955}]},{"poolType":"pairPool","poolName":"KlaySwap LP KLAY-AKLAY","tokenAname":"KLAY","tokenBname":"AKLAY","tokenAnumber":0.001705988750061263,"tokenBnumber":0.0017206598536553654,"value":0.0034937994985513353,"tokenArray":[{"KLAY":0.001705988750061263},{"AKLAY":0.0017206598536553654}]}],"SinglePoolList":[{"poolType":"singlePool","tokenName":"KLAY","value":0.0000019442669787827275},{"poolType":"singlePool","tokenName":"KSP","value":1.1865691436863746},{"poolType":"singlePool","tokenName":"BORA","value":5.14238465758798e-7},{"poolType":"singlePool","tokenName":"KDAI","value":1.7296944873329134}],"PlusPoolList":[{"poolType":"plusPool","balanceOfLP":3.1970555726618417,"oracleOfLP":4.305660652060585,"valueOfLP":13.765436381661111,"tokenAaddress":"0x0000000000000000000000000000000000000000","tokenBaddress":"0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167","lpTokenAddress":"0xD83f1B074D81869EFf2C46C530D7308FFEC18036","pluspoolAddress":"0xc2b8d94c14fa461d85319ad518e56f669c9b15d7","tokenAname":"KLAY","tokenBname":"KUSDT","tokenAtotalNumber":6.71745415176306,"tokenBtotalNumber":6.893696521461696,"tokentotalValue":13.765436381661113,"tokenAborrow":2.0645761878921447,"tokenBborrw":2.520409,"tokenApure":4.652877963870916,"tokenBpure":4.373287521461696,"ltv":33.647785269511225},{"poolType":"plusPool","balanceOfLP":5.501673373196856,"oracleOfLP":1.0646492449620717,"valueOfLP":5.857352402801967,"tokenAaddress":"0x0000000000000000000000000000000000000000","tokenBaddress":"0xC6a2Ad8cC6e4A7E08FC37cC5954be07d499E7654","lpTokenAddress":"0x34cF46c21539e03dEb26E4FA406618650766f3b9","pluspoolAddress":"0x31a96bad29fc3eb46e4543176462e12d5293bce5","tokenAname":"KLAY","tokenBname":"KSP","tokenAtotalNumber":2.866262665986776,"tokenBtotalNumber":0.6240798901623363,"tokentotalValue":5.857352402801967,"tokenAborrow":2.0385352724848604,"tokenBborrw":0.395315386630918,"tokenApure":0.8277273935019154,"tokenBpure":0.22876450353141836,"ltv":67.23271685520658}],"stakingKSP":90,"vKSPbalance":720,"klayswapTotalBalance":15}
        // console.log("klayswap : ", response)

        tempObject["totalBalance"] = Number(tempObject["totalBalance"]) + Number(response.value)
        tempObject["klaystation"] = response
        console.log("tempObject",tempObject)

        setAssetState({...tempObject})
        loadKronos(tempObject)
    }

    const loadKronos = async (innerObject) => {
        let tempObject = innerObject;
        // const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/kronos/0x4560c752a315b76ff55c0d409a57f617cb123f1b`).then((res) => { return res.data })
        const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/kronos/${walletaddress}`).then((res) => { return res.data })
        // console.log("kronos", response)
        // const response = {"PairPoolList":[{"poolType":"pairPool","poolName":"KlaySwap LP KLAY-HOUSE","tokenAname":"KLAY","tokenBname":"HOUSE","tokenAnumber":0.005131565942928991,"tokenBnumber":0.16164126101876955,"value":0.010508182699058295,"tokenArray":[{"KLAY":0.005131565942928991},{"HOUSE":0.16164126101876955}]},{"poolType":"pairPool","poolName":"KlaySwap LP KLAY-AKLAY","tokenAname":"KLAY","tokenBname":"AKLAY","tokenAnumber":0.001705988750061263,"tokenBnumber":0.0017206598536553654,"value":0.0034937994985513353,"tokenArray":[{"KLAY":0.001705988750061263},{"AKLAY":0.0017206598536553654}]}],"SinglePoolList":[{"poolType":"singlePool","tokenName":"KLAY","value":0.0000019442669787827275},{"poolType":"singlePool","tokenName":"KSP","value":1.1865691436863746},{"poolType":"singlePool","tokenName":"BORA","value":5.14238465758798e-7},{"poolType":"singlePool","tokenName":"KDAI","value":1.7296944873329134}],"PlusPoolList":[{"poolType":"plusPool","balanceOfLP":3.1970555726618417,"oracleOfLP":4.305660652060585,"valueOfLP":13.765436381661111,"tokenAaddress":"0x0000000000000000000000000000000000000000","tokenBaddress":"0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167","lpTokenAddress":"0xD83f1B074D81869EFf2C46C530D7308FFEC18036","pluspoolAddress":"0xc2b8d94c14fa461d85319ad518e56f669c9b15d7","tokenAname":"KLAY","tokenBname":"KUSDT","tokenAtotalNumber":6.71745415176306,"tokenBtotalNumber":6.893696521461696,"tokentotalValue":13.765436381661113,"tokenAborrow":2.0645761878921447,"tokenBborrw":2.520409,"tokenApure":4.652877963870916,"tokenBpure":4.373287521461696,"ltv":33.647785269511225},{"poolType":"plusPool","balanceOfLP":5.501673373196856,"oracleOfLP":1.0646492449620717,"valueOfLP":5.857352402801967,"tokenAaddress":"0x0000000000000000000000000000000000000000","tokenBaddress":"0xC6a2Ad8cC6e4A7E08FC37cC5954be07d499E7654","lpTokenAddress":"0x34cF46c21539e03dEb26E4FA406618650766f3b9","pluspoolAddress":"0x31a96bad29fc3eb46e4543176462e12d5293bce5","tokenAname":"KLAY","tokenBname":"KSP","tokenAtotalNumber":2.866262665986776,"tokenBtotalNumber":0.6240798901623363,"tokentotalValue":5.857352402801967,"tokenAborrow":2.0385352724848604,"tokenBborrw":0.395315386630918,"tokenApure":0.8277273935019154,"tokenBpure":0.22876450353141836,"ltv":67.23271685520658}],"stakingKSP":90,"vKSPbalance":720,"klayswapTotalBalance":15}
        // console.log("klayswap : ", response)

        tempObject["totalBalance"] = Number(tempObject["totalBalance"]) + Number(response.value)
        tempObject["kronosdao"] = response
        console.log("tempObject",tempObject)

        setAssetState({...tempObject})
        loadKairoscash(tempObject)
    }

    const loadKairoscash = async (innerObject) => {
        let tempObject = innerObject;
        const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/kairoscash/${walletaddress}`).then((res) => { return res.data })

        tempObject["totalBalance"] = Number(tempObject["totalBalance"]) + Number(response.value)
        tempObject["kairoscash"] = response
        console.log("tempObject",tempObject)

        setAssetState({...tempObject})
        loadKlayswap(tempObject)
    }

    
    const loadKlayswap = async (innerObject) => {
        let tempObject = innerObject;
        const response = await axios.get(`https://3xfqfa63j5.execute-api.ap-northeast-2.amazonaws.com/wallet/klayswap/${walletaddress}`).then((res) => { return res.data })
        // const response = {"PairPoolList":[{"poolType":"pairPool","poolName":"KlaySwap LP KLAY-HOUSE","tokenAname":"KLAY","tokenBname":"HOUSE","tokenAnumber":0.0050986337550847066,"tokenBnumber":0.16268936024604957,"value":0.01033832228805221,"tokenArray":[{"KLAY":0.0050986337550847066},{"HOUSE":0.16268936024604957}]},{"poolType":"pairPool","poolName":"KlaySwap LP KLAY-AKLAY","tokenAname":"KLAY","tokenBname":"AKLAY","tokenAnumber":0.001709898851207038,"tokenBnumber":0.0017170136141618764,"value":0.003467627562587921,"tokenArray":[{"KLAY":0.001709898851207038},{"AKLAY":0.0017170136141618764}]}],"SinglePoolList":[{"poolType":"singlePool","tokenName":"KLAY","value":0.000001944379086593373},{"poolType":"singlePool","tokenName":"KSP","value":1.1867758658527097},{"poolType":"singlePool","tokenName":"BORA","value":5.142429608622452e-7},{"poolType":"singlePool","tokenName":"KDAI","value":1.7297180309961435}],"PlusPoolList":[{"poolType":"plusPool","balanceOfLP":3.1970555726618417,"oracleOfLP":4.27901082308497,"valueOfLP":13.680235397424138,"tokenAaddress":"0x0000000000000000000000000000000000000000","tokenBaddress":"0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167","lpTokenAddress":"0xD83f1B074D81869EFf2C46C530D7308FFEC18036","pluspoolAddress":"0xc2b8d94c14fa461d85319ad518e56f669c9b15d7","tokenAname":"KLAY","tokenBname":"KUSDT","tokenAtotalNumber":6.767875114027182,"tokenBtotalNumber":6.842338184390848,"tokentotalValue":13.680235397424138,"tokenAborrow":2.0649786224333195,"tokenBborrw":2.521078,"tokenApure":4.702896491593862,"tokenBpure":4.321260184390848,"ltv":33.67837338948301},{"poolType":"plusPool","balanceOfLP":5.501673373196856,"oracleOfLP":1.0493226263332411,"valueOfLP":5.773030353190586,"tokenAaddress":"0x0000000000000000000000000000000000000000","tokenBaddress":"0xC6a2Ad8cC6e4A7E08FC37cC5954be07d499E7654","lpTokenAddress":"0x34cF46c21539e03dEb26E4FA406618650766f3b9","pluspoolAddress":"0x31a96bad29fc3eb46e4543176462e12d5293bce5","tokenAname":"KLAY","tokenBname":"KSP","tokenAtotalNumber":2.8614370288828535,"tokenBtotalNumber":0.6251323624143483,"tokentotalValue":5.773030353190587,"tokenAborrow":2.0389326310380884,"tokenBborrw":0.3954418785015591,"tokenApure":0.822504397844765,"tokenBpure":0.22969048391278923,"ltv":67.25642588873738}],"stakingKSP":90,"vKSPbalance":720,"klayswapTotalBalance":428.82676471024854}
        // console.log("klayswap : ", response)

        tempObject["totalBalance"] = Number(tempObject["totalBalance"]) + Number(response.klayswapTotalBalance)
        tempObject["klayswap"] = response
        // console.log("tempObject",tempObject)

        setAssetState({...tempObject})
        let tempRes = {
            "data" : {
                address : walletaddress,
                assetDetail : tempObject,
                assetTotal : tempObject.totalBalance
            }
        }
        await sendPriceData(tempRes)
        setIsloading(false)
    }


    return (
        <>
            <WalletContext.Provider value={{walletaddress,setWalletaddress,modalstate,setModalstate,assetState,setAssetState,setServiceState,isloading}}>
                <TopnavConnection />
                <Walletmodal />
                {serviceState === "overview" ? 
                    <WalletOverview /> :
                    serviceState === "tokenDetail" ?
                    <WalletTokenDetail /> :
                        serviceState === "klayswapDetail" ?
                        <WalletKlayswapDetail /> :
                            serviceState === "klaystationDetail" ?
                            <WalletKlaystationDetail /> :
                                serviceState === "kronosDetail" ?
                                <WalletKronosDetail /> :
                                    serviceState === "kairoscashDetail" ?
                                    <WalletKairoscashDetail /> :
                                    <>Null</>
                }
            </WalletContext.Provider>
        </>
    )
}

export default Defimanager;