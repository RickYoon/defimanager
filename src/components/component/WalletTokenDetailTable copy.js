import React,{useState, useContext, useEffect} from "react";
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import klaytnLogo from "../../assets/uiux/klaytnLogo.png"
import icons from "../../assets/tokenIcons"
import { WalletContext } from 'components/context/WalletContext';
import arrowBack from '../../assets/uiux/arrowBack.svg'
import axios from "axios";


const WalletTokenDetailTable = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [assetState, setAssetState] = useState([
        {
          address: '0xd6dab4cff47df175349e6e7ee2bf7c40bb8c05a3',
          name: 'Tether USDT',
          symbol: 'USDT',
          decimals: 6,
          balance: 9.993652
        },
        {
          address: '0xd236639f5b00bc6711ac799bac5aceaf788b2aa3',
          name: 'xyUSDC',
          symbol: 'xyUSDC',
          decimals: 18,
          balance: 0
        },
        {
          address: '0x608792deb376cce1c9fa4d0e6b7b44f507cffa6a',
          name: 'USD Coin (Wormhole)',
          symbol: 'USDC',
          decimals: 6,
          balance: 15.016324
        },
        {
          address: '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167',
          name: 'Orbit Bridge Klaytn USD Tether',
          symbol: 'KUSDT',
          decimals: 6,
          balance: 0
        },
        {
          address: '-',
          name: 'Klaytn',
          symbol: 'KLAY',
          decimals: 18,
          balance: 3.8567056492237457
        },
        {
          address: '0x754288077d0ff82af7a5317c7cb8c444d421d103',
          name: 'Orbit Bridge Klaytn USD Coin',
          symbol: 'KUSDC',
          decimals: 6,
          balance: 0
        },
        {
          address: '0x1cd3828a2b62648dbe98d6f5748a6b1df08ac7bb',
          name: 'REDiToken',
          symbol: 'REDi',
          decimals: 18,
          balance: -4.294967296e-9
        }
      ])
    // const {assetState,serviceState,setServiceState} = useContext(WalletContext);
    // console.log(assetState)

    // const backToOverview = () => {
    //     setServiceState("overview")
    // }

    // https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/walletbalance?address=0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8&chain=klaytn

    useEffect(() => {
      loadchart()
      // loadchart()
  }, [])


  const loadchart = async () => {

    // const kk = await axios.get("https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/walletbalance?address=0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8&chain=klaytn")
    // console.log(kk.data)

    const kk = [
      {
          "address": "0xce40569d65106c32550626822b91565643c07823",
          "name": "Kairos Cash",
          "symbol": "KASH",
          "decimals": 18,
          "balance": -8.388608e-12
      },
      {
          "address": "0xe1376ab327b6deb7bebaee1329eb94574d51a8d9",
          "name": "KP Share Token",
          "symbol": "KPs",
          "decimals": 18,
          "balance": -3.2768e-14
      },
      {
          "address": "0x754288077d0ff82af7a5317c7cb8c444d421d103",
          "name": "Orbit Bridge Klaytn USD Coin",
          "symbol": "KUSDC",
          "decimals": 6,
          "balance": 637.592522
      },
      {
          "address": "0x7a1cdca99fe5995ab8e317ede8495c07cbf488ad",
          "name": "Pala Token",
          "symbol": "PALA",
          "decimals": 18,
          "balance": 0.6056541719670292
      },
      {
          "address": "0xef45d7272211f7d9c9b3b509d550e8856cd9e050",
          "name": "Puuvillafriends",
          "symbol": "Puuvillafriends",
          "decimals": 18,
          "balance": 4.0771e-14
      },
      {
          "address": "0x01ad62e0ff6dcaa72889fca155c7036c78ca1783",
          "name": "KlayCity",
          "symbol": "ORB",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xd32aef55e87c8223752fcaedee1b94d363282b96",
          "name": "Pangea Position",
          "symbol": "PANGEA-POS",
          "decimals": 18,
          "balance": 6.612e-15
      },
      {
          "address": "0x46db825593ca7c3fdfc9ccb5850ea96c39b79330",
          "name": "Nightingale Token",
          "symbol": "NGIT",
          "decimals": 18,
          "balance": 3.2e-17
      },
      {
          "address": "0x5fff3a6c16c2208103f318f4713d4d90601a7313",
          "name": "Kleva Token",
          "symbol": "KLEVA",
          "decimals": 18,
          "balance": 0.509664465868284
      },
      {
          "address": "0xbfb4528b7096d983f1c3c693274c4c14887aee41",
          "name": "KlaySwap LP KLAY-MBX",
          "symbol": "KSLP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x9ddcbc22beb97899b5cedcabba50a98314c3bac1",
          "name": "ClaimSwap LP CLA-WKLAY",
          "symbol": "CLA-LP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x5bc2785782c0bba162c78a76f0ee308ec5f601b7",
          "name": "Aave interest bearing WKLAY",
          "symbol": "aWKLAY",
          "decimals": 18,
          "balance": -0.06123811797602611
      },
      {
          "address": "0xb9950eabe1bc5e9e2fa58966ce48e34e81f0db32",
          "name": "Key DAI Deposit",
          "symbol": "KDADAI",
          "decimals": 18,
          "balance": 18.636475223032665
      },
      {
          "address": "0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654",
          "name": "KlaySwap Protocol",
          "symbol": "KSP",
          "decimals": 18,
          "balance": 3.7220022908121253
      },
      {
          "address": "0x112912cd10b904427761056b3fd157310d97315c",
          "name": "iKDAI",
          "symbol": "IKDAI",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xfd844c2fca5e595004b17615f891620d1cb9bbb2",
          "name": "Wrapped KLAY",
          "symbol": "WKLAY",
          "decimals": 18,
          "balance": 26
      },
      {
          "address": "0xa14a5969459027eb0eaac498f5e871b6ab4994a4",
          "name": "Ducato LP RoundRobin Protocol Token-Wrapped Klay",
          "symbol": "DUCATO-LP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xfbd0314d55eab31c9fc0b2d162748017f1bc7b85",
          "name": "Krome Shares",
          "symbol": "KROME",
          "decimals": 18,
          "balance": 0.06142824152229171
      },
      {
          "address": "0x24703f8497412912106761210bdc30c44ee61b2f",
          "name": "Kredit Token",
          "symbol": "KREDIT",
          "decimals": 18,
          "balance": 9058.41432089138
      },
      {
          "address": "0xc75456755d68058bf182bcd41c6d9650db4ce89e",
          "name": "Staked Eye",
          "symbol": "sEYE",
          "decimals": 18,
          "balance": -105.72130719302156
      },
      {
          "address": "-",
          "name": "Klaytn",
          "symbol": "KLAY",
          "decimals": 18,
          "balance": 2304.1191009637714
      },
      {
          "address": "0x9d5b7671cddba4bb82e99fbcedf60c4d001fe2ef",
          "name": "eklipse lp 3Moon-KASH",
          "symbol": "EKLP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xc320066b25b731a11767834839fe57f9b2186f84",
          "name": "KlaySwap LP KUSDT-KDAI",
          "symbol": "KSLP",
          "decimals": 6,
          "balance": 0
      },
      {
          "address": "0x94a2a6308c0a3782d83ad590d82ff0ffcc515312",
          "name": "Sigma",
          "symbol": "SIG",
          "decimals": 18,
          "balance": 218.57160171366885
      },
      {
          "address": "0xed52bd01b0608a6b6d4f4e03affce16c1ff19c23",
          "name": "Pangea Position",
          "symbol": "PANGEA-POS",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x4b734a4d5bf19d89456ab975dfb75f02762dda1d",
          "name": "MOOI",
          "symbol": "MOOI",
          "decimals": 18,
          "balance": 0.17962739311394157
      },
      {
          "address": "0x32fe0f8d0bc59836028e80bc2ed94ae8e169344b",
          "name": "Staked KBT",
          "symbol": "sKBT",
          "decimals": 18,
          "balance": 123.92284989959037
      },
      {
          "address": "0x127a75b751ba810e459121af6207d83841c586b7",
          "name": "Orbit Bridge Klaytn Token",
          "symbol": "OBT",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xa4547080f3310b9ec4ed4b08fbc3762c6d294cc9",
          "name": "ORCA Finance Token",
          "symbol": "ORCA",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xf6f6b8bd0ac500639148f8ca5a590341a97de0de",
          "name": "Wrapped Klaytn",
          "symbol": "WKLAY",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xbdc4abb3e4b8de77c8889318dfb98a8bcd81a8c4",
          "name": "i4i KSD-KASH",
          "symbol": "KSDiKASH",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xe5bbe3aeb87e37a08fd4de05654095d25828f1ea",
          "name": "RoundRobin Protocol Token",
          "symbol": "RRT",
          "decimals": 18,
          "balance": 7390.843153969492
      },
      {
          "address": "0x72a35eb0d8a8d0301a5f92c9b6191bcb7ea232e0",
          "name": "EKLP-3MOON-KSD",
          "symbol": "EKLP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xd2137fdf10bd9e4e850c17539eb24cfe28777753",
          "name": "Krome Stablecoin",
          "symbol": "USDK",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xe950bdcfa4d1e45472e76cf967db93dbfc51ba3e",
          "name": "Kai Token",
          "symbol": "KAI",
          "decimals": 18,
          "balance": 2.3888636274585417
      },
      {
          "address": "0x1437459e1f932d86ee97ab2dfac058fa0a60769c",
          "name": "ClaimSwap LP KUSDT-USDK",
          "symbol": "CLA-LP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x5e9bc710d817affa64e0fd93f3f7602e9f4dd396",
          "name": "KlaySwap LP KLAY-REDi",
          "symbol": "KSLP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x22e3ac1e6595b64266e0b062e01fae31d9cdd578",
          "name": "ksd4pool (KSD + K3EYE)",
          "symbol": "KSD4EYE",
          "decimals": 18,
          "balance": -6.7108864e-11
      },
      {
          "address": "0xba9725eaccf07044625f1d232ef682216f5371c2",
          "name": "Clam Token",
          "symbol": "CLAM",
          "decimals": 18,
          "balance": 138.20449607576558
      },
      {
          "address": "0xd74d4b4d2fb186bb7f31e4000c59ade70bbd8a23",
          "name": "KlaySwap LP KLAY-KFI",
          "symbol": "KSLP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x6cef6dd9a3c4ad226b8b66effeea2c125df194f1",
          "name": "AziT",
          "symbol": "AZIT",
          "decimals": 18,
          "balance": 1.4938844996089315
      },
      {
          "address": "0x2ed5f3a3f2d84a4691cdf5927bcfe488a5265c3a",
          "name": "i4i KSD-kBUSD",
          "symbol": "KSDiKBUSD",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x5e6215dfb33b1fb71e48000a47ed2ebb86d5bf3d",
          "name": "Deposited KSD",
          "symbol": "dKSD",
          "decimals": 18,
          "balance": -25.77887497682341
      },
      {
          "address": "0xe74c8d8137541c0ee2c471cdaf4dcf03c383cd22",
          "name": "KlaySwap LP KLAY-AKLAY",
          "symbol": "KSLP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xd364de0683b29e582e5713425b215b24ce804ae9",
          "name": "Center Coin",
          "symbol": "CENT",
          "decimals": 18,
          "balance": 19.8
      },
      {
          "address": "0xd90f637a7a1362028f8ad77eba9655c7b92bb919",
          "name": "Pala LPs",
          "symbol": "Pala-LP",
          "decimals": 18,
          "balance": 5.44632e-13
      },
      {
          "address": "0x44efe1ec288470276e29ac3adb632bff990e2e1f",
          "name": "Kai Vote Token",
          "symbol": "vKAI",
          "decimals": 18,
          "balance": 6.30863599965501
      },
      {
          "address": "0x7fdfab4b1f0895860efe04207f2d58029c959476",
          "name": "electrik kokoa Staked KOKOA",
          "symbol": "electrik LP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x4b419986e15018e6dc1c9dab1fa4824d8e2e06b5",
          "name": "iKUSDT",
          "symbol": "IKUSDT",
          "decimals": 6,
          "balance": 0
      },
      {
          "address": "0x6026c432c420dce0e7bc5f84b9df1637b9ce953b",
          "name": "sigKSP: Tokenized vKSP",
          "symbol": "sigKSP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x6555f93f608980526b5ca79b3be2d4edadb5c562",
          "name": "Staked Kronos",
          "symbol": "sKRNO",
          "decimals": 9,
          "balance": -6.339732477
      },
      {
          "address": "0x8c783809332be7734fa782eb5139861721f77b33",
          "name": "Turtle King",
          "symbol": "TURK",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x9eaefb09fe4aabfbe6b1ca316a3c36afc83a393f",
          "name": "Orbit Bridge Klaytn Ripple",
          "symbol": "KXRP",
          "decimals": 6,
          "balance": 0.441696
      },
      {
          "address": "0x0b03d0543f43a1b9aded6d62f6617d9e8c217fc3",
          "name": "ClaimSwap LP KUSDC-KUSDT",
          "symbol": "CLA-LP",
          "decimals": 6,
          "balance": 0
      },
      {
          "address": "0xe995b4a0289c33a28a1f14eb7b306387de71eb0e",
          "name": "i4i Factory KLAY-KSD (Crypto Pool)",
          "symbol": "KLAYiKSD",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xf80f2b22932fcec6189b9153aa18662b15cc9c00",
          "name": "Stake.ly Staked KLAY",
          "symbol": "stKLAY",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x1cd3828a2b62648dbe98d6f5748a6b1df08ac7bb",
          "name": "REDiToken",
          "symbol": "REDi",
          "decimals": 18,
          "balance": 1.7179869184e-8
      },
      {
          "address": "0xd643bb39f81ff9079436f726d2ed27abc547cb38",
          "name": "Puuvilla Society",
          "symbol": "Puuvilla",
          "decimals": 18,
          "balance": 4.838e-15
      },
      {
          "address": "0x19c8f636118dfb7b6cbe2620a7653e229f8b8011",
          "name": "Bluewhale Premium Membership",
          "symbol": "BWPM",
          "decimals": 0,
          "balance": 0
      },
      {
          "address": "0x19782447b7f3b8c01f07ef9136f378a92ef09664",
          "name": "ClaimSwap LP KUSDT-CLA",
          "symbol": "CLA-LP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x4836cc1f355bb2a61c210eaa0cd3f729160cd95e",
          "name": "GemHUB",
          "symbol": "GHUB",
          "decimals": 18,
          "balance": 2.097342954405976
      },
      {
          "address": "0x813c6e45c65de6d13a275681535c32b6cc93218a",
          "name": "voteKronos",
          "symbol": "vKRNO",
          "decimals": 9,
          "balance": 7.004162898
      },
      {
          "address": "0x9d52704cd67d586ed2870d810b0cef2cc168ae42",
          "name": "ZEMIT",
          "symbol": "ZEMIT",
          "decimals": 18,
          "balance": 0.21047175785392438
      },
      {
          "address": "0xd83f1b074d81869eff2c46c530d7308ffec18036",
          "name": "KlaySwap LP KLAY-KUSDT",
          "symbol": "KSLP",
          "decimals": 18,
          "balance": 1.048576e-12
      },
      {
          "address": "0x7b7363cf78662b638a87f63871c302be363ddc7a",
          "name": "Boosting token of staking pool",
          "symbol": "WOOD",
          "decimals": 18,
          "balance": 3.4664184926590567
      },
      {
          "address": "0x6f818355f9a64692905291e9a3c8f960edcf117d",
          "name": "Battery",
          "symbol": "BTRY",
          "decimals": 18,
          "balance": 0.018283118456317953
      },
      {
          "address": "0xe815a060b9279eba642f8c889fab7afc0d0aca63",
          "name": "Klaymeta Token",
          "symbol": "META",
          "decimals": 18,
          "balance": 10.193699403909699
      },
      {
          "address": "0x4b3000bbbb19a0b009c12a8a1117b6fdf208595c",
          "name": "dKUSDC",
          "symbol": "dKUSDC",
          "decimals": 8,
          "balance": 0
      },
      {
          "address": "0x9a8ce99db3c298b1f3fa0ffba752ba95157c6f76",
          "name": "vvCLA",
          "symbol": "vvCLA",
          "decimals": 18,
          "balance": 6.848341908775109
      },
      {
          "address": "0xb57e0038e8027c3de8126a07cac371f31c9c229e",
          "name": "Kai Auto Token",
          "symbol": "aKAI",
          "decimals": 18,
          "balance": 0.014010618702509624
      },
      {
          "address": "0xd3e65b87af74e6909d660a6b1cb5347bb4e91533",
          "name": "staked Pala",
          "symbol": "sPala",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x2f3713f388bc4b8b364a7a2d8d57c5ff4e054830",
          "name": "Voting KlaySwap Protocol",
          "symbol": "vKSP",
          "decimals": 18,
          "balance": 720
      },
      {
          "address": "0xb49e754228bc716129e63b1a7b0b6cf27299979e",
          "name": "PANGEA GOVERNANCE TOKEN",
          "symbol": "STONE",
          "decimals": 18,
          "balance": 0.40141249107541127
      },
      {
          "address": "0x1f2d6282d74ef26eb6c7e28b9e7048c1b42ebda5",
          "name": "Pala Klay",
          "symbol": "pKLAY",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xd676e57ca65b827feb112ad81ff738e7b6c1048d",
          "name": "Kronos",
          "symbol": "KRNO",
          "decimals": 9,
          "balance": 0
      },
      {
          "address": "0xd068c52d81f4409b9502da926ace3301cc41f623",
          "name": "MARBLEX",
          "symbol": "MBX",
          "decimals": 18,
          "balance": 0.40713812966107404
      },
      {
          "address": "0x81b95b6df65dd84118e7ae54a7e339323c8e29f8",
          "name": "Ducato LP RoundRobin Protocol Token-Wrapped Klay",
          "symbol": "DUCATO-LP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x74ba03198fed2b15a51af242b9c63faf3c8f4d34",
          "name": "-",
          "symbol": "-",
          "decimals": 18,
          "balance": 2.208531368802349
      },
      {
          "address": "0xb15183d0d4d5e86ba702ce9bb7b633376e7db29f",
          "name": "Kokoa",
          "symbol": "KOKOA",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x37d46c6813b121d6a27ed263aef782081ae95434",
          "name": "Kai Share Token",
          "symbol": "sKAI",
          "decimals": 18,
          "balance": 1.280803505370176
      },
      {
          "address": "0x29435457053d167a2b1f6f2d54d4176866ffb5f9",
          "name": "COMPASS PROTOCOL",
          "symbol": "COM",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xcb8bee2c4be60ee52b9e2ceba585da64cdde439e",
          "name": "k3pool (kDAI-kUSDC-kUSDT)",
          "symbol": "K3EYE",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x7ffc4146b43cd099928a813b2c219af2e49611e0",
          "name": "interest bearing KLEVA",
          "symbol": "ibKLEVA",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x2b907db3fc53661ddca1155db111ab585456a54d",
          "name": "Alien Token",
          "symbol": "ALIEN",
          "decimals": 18,
          "balance": 3.9434387456e-7
      },
      {
          "address": "0x27ffa35d4e2443c734e25b34bbb8ef217356cf85",
          "name": "Pala LPs",
          "symbol": "Pala-LP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x8888888888885b073f3c81258c27e83db228d5f3",
          "name": "Swapscanner",
          "symbol": "SCNR",
          "decimals": 25,
          "balance": 1.1961572005913825
      },
      {
          "address": "0xbd1be591055223408a747239c48721421c70caf5",
          "name": "iKXRP",
          "symbol": "IKXRP",
          "decimals": 6,
          "balance": 0
      },
      {
          "address": "0x5ab30f1642e0aed47664635a305b9f778088b4cb",
          "name": "Veve",
          "symbol": "VEVE",
          "decimals": 18,
          "balance": 0.025276288075372296
      },
      {
          "address": "0x02e7d9ad54a19a9a0721d9515cf9f80f9547d771",
          "name": "kkakdugi",
          "symbol": "KDG",
          "decimals": 18,
          "balance": 1
      },
      {
          "address": "0x4456f1caaabc6b2cd8e10b2cfd1c97dbd7acaa0c",
          "name": "KISS ROOMER",
          "symbol": "KROOM",
          "decimals": 18,
          "balance": 1.067e-15
      },
      {
          "address": "0x2f72278d8f8c4840a4d9e20d609fb0b6ef622904",
          "name": "Klaybank interest bearing WKLAY",
          "symbol": "bWKLAY",
          "decimals": 18,
          "balance": -4.098869146889814
      },
      {
          "address": "0xe944134903694ebdbb56aadcfbdf400fb52ea487",
          "name": "Wrapped sKRNO",
          "symbol": "wsKRNO",
          "decimals": 18,
          "balance": 3.37216e-13
      },
      {
          "address": "0x7f1712f846a69bf2a9dbc4d48f45f1d52ca32e28",
          "name": "Ufo Token",
          "symbol": "UFO",
          "decimals": 18,
          "balance": 6.40071237632e-7
      },
      {
          "address": "0x37c38b19a6ba325486da87f946e72dc93e0ab39a",
          "name": "NewKlayPunks",
          "symbol": "PUNK",
          "decimals": 18,
          "balance": 8.520714212059252
      },
      {
          "address": "0xaeeca95c899660dc74886168d0ffdebf3669179d",
          "name": "Orbit Bridge Klaytn Token",
          "symbol": "OBT",
          "decimals": 18,
          "balance": 1.329988923934593
      },
      {
          "address": "0xc5a99c150fd125933a626d08e9b8e165143d0ec7",
          "name": "Klaybank interest bearing KSD",
          "symbol": "bKSD",
          "decimals": 18,
          "balance": -0.002769866737692672
      },
      {
          "address": "0x0fd58c80fbb9728093c1ea041fcfd3ee723ff696",
          "name": "i4i USDK-KSD4EYE",
          "symbol": "USDKiKSD4EYE",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x122dbb0c76d1d96a9187a50c898a789b0ed1cf7c",
          "name": "National Treasure DAO NFT",
          "symbol": "NTDAO-NFT",
          "decimals": 18,
          "balance": 3e-17
      },
      {
          "address": "0x5f5dec0d6402408ee81f52ab985a9c665b6e6010",
          "name": "ClaimSwap Shadow",
          "symbol": "CLS",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xa691c5891d8a98109663d07bcf3ed8d3edef820a",
          "name": "interest bearing KLAY",
          "symbol": "ibKLAY",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x4fa62f1f404188ce860c8f0041d6ac3765a72e67",
          "name": "Kokoa Stable Dollar",
          "symbol": "KSD",
          "decimals": 18,
          "balance": 28.950196524492522
      },
      {
          "address": "0x03b79592596157d6bff16d8db87ad0b65319c5af",
          "name": "mesher CENTER",
          "symbol": "ENTER",
          "decimals": 18,
          "balance": 24.744296528664854
      },
      {
          "address": "0x17d30e878ba5a546c76fada32d7a30c876fadb49",
          "name": "Talent",
          "symbol": "TnT",
          "decimals": 18,
          "balance": 1
      },
      {
          "address": "0xf578fd02483d433ec382e988cce63f47697876b3",
          "name": "iBORA",
          "symbol": "IBORA",
          "decimals": 18,
          "balance": 2.5658745472e-7
      },
      {
          "address": "0x089ebd525949ee505a48eb14eecba653bc8d1b97",
          "name": "KLAYDICE",
          "symbol": "DICE",
          "decimals": 18,
          "balance": 6.739275844697706
      },
      {
          "address": "0x588c62ed9aa7367d7cd9c2a9aaac77e44fe8221b",
          "name": "Answer Governance",
          "symbol": "AGOV",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167",
          "name": "Orbit Bridge Klaytn USD Tether",
          "symbol": "KUSDT",
          "decimals": 6,
          "balance": 0.004961
      },
      {
          "address": "0xe4c3f5454a752bddda18ccd239bb1e00ca42d371",
          "name": "iKLAY",
          "symbol": "IKLAY",
          "decimals": 18,
          "balance": 9.61475198976e-7
      },
      {
          "address": "0x84f1898ea932e3428fa6ef447928567b98db8bac",
          "name": "Sigma Compounding Token",
          "symbol": "xSIG",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xd3f9e8dabd63b384f32c7f0cd4c573c190cc7837",
          "name": "KlaySwap LP KLAY-LAY",
          "symbol": "KSLP",
          "decimals": 18,
          "balance": 0.000040141978058752
      },
      {
          "address": "0xc55f4f5fe1ee6c4c2f391fdc28e31445cdbf58af",
          "name": "dKUSDT",
          "symbol": "dKUSDT",
          "decimals": 8,
          "balance": 20632.01817318
      },
      {
          "address": "0xa006ba407cfc6584c90bac24ed971261885a0fd6",
          "name": "Orbit Bridge Klaytn Matic Token",
          "symbol": "KMATIC",
          "decimals": 18,
          "balance": 0.06388141856093571
      },
      {
          "address": "0x4242bad2227aa3bbf0cce62d0f8d03e241959120",
          "name": "KlaySwap LP KUSDT-KP",
          "symbol": "KSLP",
          "decimals": 6,
          "balance": 0
      },
      {
          "address": "0x1223baf4f5fb9c9002a2154262440b9ed09d01a7",
          "name": "LAY007",
          "symbol": "LAY",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xcf87f94fd8f6b6f0b479771f10df672f99eada63",
          "name": "ClaimSwap",
          "symbol": "CLA",
          "decimals": 18,
          "balance": 2.305473075691389
      },
      {
          "address": "0xd83b9dfa49d6c6d2a69554576e712e45a8a13e49",
          "name": "EKLP-KDAI-KUSDT-KUSDC",
          "symbol": "EKLP",
          "decimals": 18,
          "balance": 3.3554432e-11
      },
      {
          "address": "0x089403168721ef1728ee97e6797c55b5abfc1d7a",
          "name": "CAP : ENTER",
          "symbol": "CapNFTENTER",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x9a5ec548420011bbaefee5fdfb4d99908600b1ac",
          "name": "iKSP",
          "symbol": "IKSP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x078db7827a5531359f6cb63f62cfa20183c4f10c",
          "name": "Dai Stablecoin",
          "symbol": "DAI",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xe7d3b78f032e70fabfdb8c0741ea74f775deb32d",
          "name": "KlayStarter",
          "symbol": "KSTA",
          "decimals": 18,
          "balance": 61.054755827219644
      },
      {
          "address": "0x158beff8c8cdebd64654add5f6a1d9937e73536c",
          "name": "-",
          "symbol": "-",
          "decimals": 18,
          "balance": 37.09552201531868
      },
      {
          "address": "0x6270b58be569a7c0b8f47594f191631ae5b2c86c",
          "name": "USD Coin",
          "symbol": "USDC",
          "decimals": 6,
          "balance": 0
      },
      {
          "address": "0x34d21b1e550d73cee41151c77f3c73359527a396",
          "name": "Orbit Bridge Klaytn Ethereum",
          "symbol": "KETH",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x5a5a02fc3e65cfd3e32374cbf188af4fe2813555",
          "name": "PANGEA CONTRIBUTION",
          "symbol": "PANGEA-CONTRIBUTOR",
          "decimals": 18,
          "balance": 1.409e-15
      },
      {
          "address": "0xdb116e2dc96b4e69e3544f41b50550436579979a",
          "name": "KlayFi",
          "symbol": "KFI",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xaa06cd403ce91051475518e003f3d52761011889",
          "name": "voteKronosV1",
          "symbol": "vKRNOv1",
          "decimals": 9,
          "balance": 10.644083015
      },
      {
          "address": "0xc556be31d170ca00241231371e139c8e4c0fc204",
          "name": "Pala LPs",
          "symbol": "Pala-LP",
          "decimals": 18,
          "balance": 0.33707718501784373
      },
      {
          "address": "0x5096db80b21ef45230c9e423c373f1fc9c0198dd",
          "name": "WEMIX TOKEN",
          "symbol": "WEMIX",
          "decimals": 18,
          "balance": 0.07165574032077619
      },
      {
          "address": "0x5388ce775de8f7a69d17fd5caa9f7dbfee65dfce",
          "name": "DON token for KLAYTN",
          "symbol": "kDON",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x2b3b40647ad8b6ba4aaab4642287e7ab6293ba27",
          "name": "i4i KLAY-AKLAY",
          "symbol": "KLAYiAKLAY",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x7e55701c4c3dfb7acd14d46b1a9b28325df1e205",
          "name": "Staked Kredit Tokens",
          "symbol": "sKREDIT",
          "decimals": 18,
          "balance": 36360.34241310237
      },
      {
          "address": "0x7c824542b2f373cacb1eabbd77de2e0d862393dd",
          "name": "ClaimSwap LP KDAI-KUSDT",
          "symbol": "CLA-LP",
          "decimals": 6,
          "balance": 0
      },
      {
          "address": "0x5c74070fdea071359b86082bd9f9b3deaafbe32b",
          "name": "Klaytn Dai",
          "symbol": "KDAI",
          "decimals": 18,
          "balance": -3.3554432e-11
      },
      {
          "address": "0xa9f07b1260bb9eebcbaba66700b00fe08b61e1e6",
          "name": "SheepFarm",
          "symbol": "SHEP",
          "decimals": 18,
          "balance": 6.18531e-13
      },
      {
          "address": "0xfe41102f325deaa9f303fdd9484eb5911a7ba557",
          "name": "Orbit Bridge Klaytn Orbit Chain",
          "symbol": "KORC",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xfaeec9b2623b66bbb3545ca24cfc32a8504fcf1b",
          "name": "interest bearing KUSDT",
          "symbol": "ibKUSDT",
          "decimals": 6,
          "balance": 0
      },
      {
          "address": "0xec47f42260438666cc88ce6ef770283f2d19d39b",
          "name": "Joystick Token",
          "symbol": "JOY",
          "decimals": 18,
          "balance": 128.643439
      },
      {
          "address": "0xe739483db267b6c29ca45b758cf38591f8bad064",
          "name": "Key USDC Deposit",
          "symbol": "KDAUSDC",
          "decimals": 6,
          "balance": 60.616977
      },
      {
          "address": "0xa985a93e2ec42f19b99e8c87355915c78a9463b7",
          "name": "exchangeKronos",
          "symbol": "exKRNO",
          "decimals": 18,
          "balance": -4e-18
      },
      {
          "address": "0xbb6c0a0dd21bb3b880228c7736a7301f48b8200e",
          "name": "Pala LPs",
          "symbol": "Pala-LP",
          "decimals": 18,
          "balance": 1.08837901759e-7
      },
      {
          "address": "0x02cbe46fb8a1f579254a9b485788f2d86cad51aa",
          "name": "BORA",
          "symbol": "BORA",
          "decimals": 18,
          "balance": 9.36838977792e-7
      },
      {
          "address": "0x8ad37f3f3fb663a67c7140947f80894a973b789b",
          "name": "KlaySwap LP KLAY-HOUSE",
          "symbol": "KSLP",
          "decimals": 18,
          "balance": 0.6999999999999998
      },
      {
          "address": "0xcd670d77f3dcab82d43dff9bd2c4b87339fb3560",
          "name": "Eye",
          "symbol": "EYE",
          "decimals": 18,
          "balance": -1.048576e-12
      },
      {
          "address": "0x6397cb395ad450e57b52f1c758ce91f2a63666ca",
          "name": "7NFTBITS.COM Wrap Ticket",
          "symbol": "Wtickets",
          "decimals": 18,
          "balance": 641
      },
      {
          "address": "0x78f3c81c5f6c8964aea1a48309dccb837526af56",
          "name": "Orbit Bridge Klaytn Phobos Token",
          "symbol": "oPBOS",
          "decimals": 18,
          "balance": 0.02427947183803777
      },
      {
          "address": "0x77777777777b7fdaa2fceb47ebde85cd461f8859",
          "name": "7NFTBITS Lottery Ticket",
          "symbol": "7NFTBITS",
          "decimals": 18,
          "balance": 4.4428e-14
      },
      {
          "address": "0x2e9269b718cc816de6a9e3c27e5bdb0f6a01b0ac",
          "name": "KlaySwap LP KUSDT-KUSDC",
          "symbol": "KSLP",
          "decimals": 6,
          "balance": 0
      },
      {
          "address": "0x210bc03f49052169d5588a52c317f71cf2078b85",
          "name": "Orbit Bridge Klaytn Token",
          "symbol": "OBT",
          "decimals": 18,
          "balance": 8.422162432e-9
      },
      {
          "address": "0x807c4e063eb0ac21e8eef7623a6ed50a8ede58ca",
          "name": "eklipse token",
          "symbol": "EKL",
          "decimals": 18,
          "balance": 835.1731879135654
      },
      {
          "address": "0x119883ee408aa5b9625c5d09a79fa8be9f9f6017",
          "name": "MEKONG COIN",
          "symbol": "MKC",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x2b5d75db09af26e53d051155f5eae811db7aef67",
          "name": "KlayPay Token",
          "symbol": "KP",
          "decimals": 18,
          "balance": -1.6777216e-11
      },
      {
          "address": "0xa323d7386b671e8799dca3582d6658fdcdcd940a",
          "name": "sKlay",
          "symbol": "SKLAY",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x0e23bee35717987e71fa8445e4dd750ad718ba8a",
          "name": "eklipse post-token reward",
          "symbol": "postEKL",
          "decimals": 18,
          "balance": 1.37076736e-10
      },
      {
          "address": "0xd429914222b7474ea2c288ec581d303599eed137",
          "name": "interest bearing WEMIX",
          "symbol": "ibWEMIX",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x0892ed3424851d2bab4ac1091fa93c9851eb5d7d",
          "name": "KNS: Klaytn Name Service",
          "symbol": "KNS",
          "decimals": 18,
          "balance": 8.767513393147674e+58
      },
      {
          "address": "0x574e9c26bda8b95d7329505b4657103710eb32ea",
          "name": "Orbit Bridge Klaytn Binance Coin",
          "symbol": "KBNB",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0xe06597d02a2c3aa7a9708de2cfa587b128bd3815",
          "name": "NEOPIN Token",
          "symbol": "NPT",
          "decimals": 18,
          "balance": 1.970068
      },
      {
          "address": "0xf4546e1d3ad590a3c6d178d671b3bc0e8a81e27d",
          "name": "BWPM Vault",
          "symbol": "sBWPM",
          "decimals": 18,
          "balance": 6.20039387136e-7
      },
      {
          "address": "0xe20614dc76e7fb5b02c6a60e1dc27459e2474336",
          "name": "Ufo LPs",
          "symbol": "Ufo-LP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x666e58391280a06a7cb380c1741376e0b3dd7531",
          "name": "Staked Kokoa",
          "symbol": "sKOKOA",
          "decimals": 18,
          "balance": 1.31072e-13
      },
      {
          "address": "0x9f055b5fbde5d6e693752e489d3d71f04810b4d4",
          "name": "EKLP-3MOON-BUSD",
          "symbol": "EKLP",
          "decimals": 18,
          "balance": 0
      },
      {
          "address": "0x36e5c9871b2fa122a5a4fab791d8e25940dab772",
          "name": "EKlipse Token (Pre Launch)",
          "symbol": "preEKL",
          "decimals": 18,
          "balance": 9.961472e-12
      },
      {
          "address": "0xcd42939dfb8d68ee53ba181704c9b6fe8d519c27",
          "name": "CLOCK",
          "symbol": "CLOCK",
          "decimals": 9,
          "balance": -13.268368319
      },
      {
          "address": "0xd109065ee17e2dc20b3472a4d4fb5907bd687d09",
          "name": "KLAP.Finance Protocol Token",
          "symbol": "KLAP",
          "decimals": 18,
          "balance": 459.9705734785746
      },
      {
          "address": "0x8ef50fa375fc64b9815e51f28f4b83c05d57ac43",
          "name": "HOOK",
          "symbol": "HOOK",
          "decimals": 9,
          "balance": 0
      },
      {
          "address": "0x77777777773d588f2c30761859bb982ed42eb018",
          "name": "7NFTBITS.COM Ticket",
          "symbol": "Tickets",
          "decimals": 18,
          "balance": 0.1
      }
  ]

    kk.sort(function (a, b) {
      return a.balance > b.balance ? -1 : a.balance < b.balance ? 1 : 0;
    })

    let FIlterJson = {
      "0xce40569d65106c32550626822b91565643c07823" : {
        type: "token",
        project: "",
        name: "Kairos Cash",
        symbol: "KASH"
      },
      "0xe1376ab327b6deb7bebaee1329eb94574d51a8d9" : {
        type: "token",
        project: "",
        name: "KP Share Token",
        symbol: "KPS"
      },
      "0x754288077d0ff82af7a5317c7cb8c444d421d103" : {
        type: "token",
        project: "",
        name: "Orbit Bridge Klaytn USD Coin",
        symbol: "oUSDC"
      },
      "0x7a1cdca99fe5995ab8e317ede8495c07cbf488ad" : {
        type: "token",
        project: "",
        name: "Pala Token",
        symbol: "PALA"
      },
      "0x46db825593ca7c3fdfc9ccb5850ea96c39b79330" : {
        type: "token",
        project: "",
        name: "Nightingale Token",
        symbol: "NGIT"
      },
      "0x5fff3a6c16c2208103f318f4713d4d90601a7313" : {
        type: "token",
        project: "",
        name: "Kleva Token",
        symbol: "KLEVA"
      },
      "0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654" : {
        type: "token",
        project: "",
        name: "KlaySwap Protocol",
        symbol: "KSP"
      },
      "0xb9950eabe1bc5e9e2fa58966ce48e34e81f0db32" : {
        type: "LP",
        project: "keyfinance",
        name: "synapse DAI Deposit",
        symbol: "KDADAI"
      },
      "0xbfb4528b7096d983f1c3c693274c4c14887aee41" : {
        type: "LP",
        project: "klayswap",
        name: "KlaySwap LP KLAY-MBX",
        symbol: "KSLP"
      },
      "0x9ddcbc22beb97899b5cedcabba50a98314c3bac1" : {
        type: "LP",
        project: "claimswap",
        name: "ClaimSwap LP CLA-WKLAY",
        symbol: "CLA-LP"
      },
      "0x5bc2785782c0bba162c78a76f0ee308ec5f601b7" : {
        type: "LP",
        project: "KLAPfinance",
        name: "Aave interest bearing WKLAY",
        symbol: "aWKLAY"
      },
      "0xef45d7272211f7d9c9b3b509d550e8856cd9e050" : {
        type: "NFT",
        project: "Puuvillafriends",
        name: "Aave interest bearing WKLAY",
        symbol: "aWKLAY",
        tokenId: 0
      },
      "0xc320066b25b731a11767834839fe57f9b2186f84" : {
        type: "LP",
        project: "klayswap",
        name: "KlaySwap LP KUSDT-KDAI",
        symbol: "KSLP"
      },
      "0x94a2a6308c0a3782d83ad590d82ff0ffcc515312" : {
        type: "token",
        project: "sigmaProtocol",
        name: "Sigma",
        symbol: "SIG"
      },
      "0x4b734a4d5bf19d89456ab975dfb75f02762dda1d" : {
        type: "token",
        project: "MOOI NETWORK",
        name: "MOOI",
        symbol: "MOOI"
      },
      "0x32fe0f8d0bc59836028e80bc2ed94ae8e169344b" : {
        type: "token",
        project: "Klaybank",
        name: "Staked KBT",
        symbol: "sKBT"
      }
    }

    
    

    let returnTemp = []

    kk.forEach((res)=>{
      if(FIlterJson[res.address]!==undefined){
        console.log("here",FIlterJson[res.address])
      returnTemp.push({
        tokenType : FIlterJson[res.address].type,
        tokenProject : FIlterJson[res.address].project,
        tokenName : FIlterJson[res.address].name,
        tokenSymbol : FIlterJson[res.address].symbol,
        balance : res.balance
      })
      }
    })

    // tokenFIlter

    console.log("returnTemp", returnTemp)

    setAssetState(returnTemp)



    // await getTotalChartData().then(function (response){

    //     let sixMonthData = response.body;      
        
    //     console.log("response.body",response.body)

    //     sixMonthData.sort(function (a, b) {
    //         return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    //     })
    //     console.log("sixMonthData",sixMonthData)

    //     setTotalchart(sixMonthData)
    // })

}



    return (
        <>
            <SubTemplateBlockVertical style={{marginTop:"20px"}}>
                <div style={{ fontSize: "18px", color: "#657795" }}>Tokens
                    <span style={{ fontSize: "12px" }}> (23) : 
                        <span style={{float:"right", fontSize:"15px", marginRight:"5px"}}>$ 23,321.2</span>
                    </span>
                </div>

                <Table>
                    <Thead>
                        <Th styled={{textAlign:"left"}}>Token</Th>
                        <Th styled={{textAlign:"right"}}>project</Th>
                        <Thr styled={{textAlign:"right"}}>Price</Thr>
                        <Thr>Balance</Thr>
                        <Thr>value ($)</Thr>
                    </Thead>
                    {assetState.map((token) => (
                    <tbody>
                        <Tr>
                            <Td><img src={icons[token.tokenSymbol]} alt="logo" height="25px" style={{ marginRight:"10px",padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />{token.tokenSymbol}</Td>
                            <Td>{token.tokenProject}</Td>
                            <Tdr>0</Tdr>
                            <Tdr>{token.balance.toFixed(3)}</Tdr>
                            <Tdr>0</Tdr>
                        </Tr>
                    </tbody>
                    ))}
                </Table>

                
            </SubTemplateBlockVertical>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "30px", fontSize: "18px", color: "#657795" }}>Klayswap total Value</div>
                <div style={{ fontSize: "24px" }}>$ 0</div>
            </SubTemplateBlockVertical>

            {/* <MobileTemplate>
            <div style={{ marginBottom: "10px", fontSize: "20px" }}>Governance Token</div>
                <Innercontainer>
                    <InnerBox>
                        <Name>
                            <img src={icons["Klayswap"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px",borderRadius: "15px" }} />
                            Staking KSP
                        </Name>
                        <Value>
                            $ {(assetState.klayswap.stakingKSP * assetState.klayswap.KSPprice).toFixed(2)}
                        </Value>
                        <div style={{fontSize:"13px", color:"gray", marginTop:"10px"}}> token price : {assetState.klayswap.KSPprice.toFixed(2)}$</div>
                        <div style={{fontSize:"13px", color:"gray", marginTop:"10px"}}> Amount : {assetState.klayswap.stakingKSP}</div>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src={icons["Klayswap"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px",borderRadius: "15px" }} />
                            vKSP
                        </Name>
                        <Value>
                            $ -
                        </Value>
                        <div style={{fontSize:"13px", color:"gray", marginTop:"10px"}}> token price : - $</div>
                        <div style={{fontSize:"13px", color:"gray", marginTop:"10px"}}> Amout : {assetState.klayswap.vKSPbalance}</div>
                    </InnerBox>
                    </Innercontainer>
            </MobileTemplate> */}
            {/* <MobileTemplate>
            <div style={{ marginBottom: "10px", fontSize: "20px" }}>Single Pool</div>
                <Innercontainer>
                    {assetState.klayswap.SinglePoolList.map((singlePool)=>
                        <InnerBox>
                            <Name>
                                {singlePool.tokenName}
                            </Name>
                            <Value>
                                $ {singlePool.value.toFixed(2)}
                            </Value>
                    </InnerBox>
                    )}
                    </Innercontainer>
            </MobileTemplate>            
            <MobileTemplate>
            <div style={{ marginBottom: "10px", fontSize: "20px" }}>Pair Pool</div>
                <Innercontainer>
                    {assetState.klayswap.PairPoolList.map((pairPool)=>
                        <InnerBox>
                            <Name>
                                {pairPool.tokenAname}-{pairPool.tokenBname}
                            </Name>
                            <Value>
                                $ {pairPool.value.toFixed(2)}
                            </Value>
                            <div style={{fontSize:"13px", color:"gray", marginTop:"10px"}}> {pairPool.tokenAnumber.toFixed(2)} {pairPool.tokenAname} </div>
                            <div style={{fontSize:"13px", color:"gray", marginTop:"10px"}}> {pairPool.tokenBnumber.toFixed(2)} {pairPool.tokenBname} </div>
                    </InnerBox>
                    )}
                    </Innercontainer>
            </MobileTemplate>      

            <MobileTemplate>
            <div style={{ marginBottom: "10px", fontSize: "20px" }}>Plus Pool</div>
                <Innercontainer>
                    {assetState.klayswap.PlusPoolList.map((plusPool)=>
                        <InnerBox>
                            <Name>
                                {plusPool.tokenAname}-{plusPool.tokenBname}
                            </Name>
                            <Value>
                                $ {(plusPool.valueOfLP * (100 - plusPool.ltv)/100).toFixed(2)}
                            </Value>
                            <div style={{fontSize:"13px", color:"gray", marginTop:"10px"}}> ltv : {plusPool.ltv.toFixed(2)} % </div>
                            <div style={{fontSize:"13px", color:"gray", marginTop:"10px"}}> {plusPool.tokenApure.toFixed(2)} {plusPool.tokenAname} </div>
                            <div style={{fontSize:"13px", color:"gray", marginTop:"10px"}}> {plusPool.tokenBpure.toFixed(2)} {plusPool.tokenBname} </div>
                    </InnerBox>
                    )}
                    </Innercontainer>
            </MobileTemplate>       */}

        </>
    )
}


const Tr = styled.tr`
    height: 45px;
    background: #fff;
`

const Td = styled.td`
    color: #050f19;
    padding: 12px 29px!important;
    font-size: 16px;
    font-weight: 500;
    line-height: normal;
    text-align: left;
    border-bottom: 1px solid #edeff1 !important;
`

const Tdr = styled.td`
    color: #050f19;
    padding: 12px 29px!important;
    font-size: 16px;
    font-weight: 500;
    line-height: normal;
    text-align: right;
    border-bottom: 1px solid #edeff1 !important;
`


const Thr = styled.th`
    cursor: auto;
    background: #f9fafb;
    text-align: inherit;
    color: rgba(0,0,0,.87);
    padding: 12px 29px!important;
    font-style: none;
    font-weight: 700;
    text-transform: none;
    border-bottom: 1px solid rgba(34,36,38,.1);
    border-left: none;
    text-align:right;
`

const Th = styled.th`
    cursor: auto;
    background: #f9fafb;
    text-align: inherit;
    color: rgba(0,0,0,.87);
    padding: 12px 29px!important;
    font-style: none;
    font-weight: 700;
    text-transform: none;
    border-bottom: 1px solid rgba(34,36,38,.1);
    border-left: none;
`

const Thead = styled.thead`
    color: #657795!important;
    padding: 12px 29px!important;
    font-size: 15px;
    background: transparent!important;
    font-style: normal;
    font-weight: 600;
    text-transform: uppercase!important;
`

const Table = styled.table`
    width: 100%;
    background: #fff;
    margin: 1em 0;
    border: 1px solid rgba(34,36,38,.15);
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 0.28571429rem;
    color: rgba(0,0,0,.87);
    border-collapse: separate;
    border-spacing: 0;
    
        
  @media screen and (max-width: 500px){
      width: 360px;
      font-size: 12px;
    }

`

const SubTemplateBlockVertical = styled.div`
     width: 900px;
    margin: 10px auto;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:column;

    padding: 20px 25px !important;
    background: #fff;

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
    
  @media screen and (max-width: 500px){
      width: 370px;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;

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
    padding: 16px;
    position: relative;
    align-items: flex-start;
    border-radius: 8px;
    flex-direction: column;
    width: 22%;
    margin: 12px;
    flex-grow:0;

    @media screen and (max-width: 500px){
        width: 100%;
        margin: 10px auto;
    }
`

const Innercontainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content:space-around;
`

// const Tr = styled.tr`
//     height: 45px;
//     background: #fff;
// `

// const Td = styled.td`
//     color: #050f19;
//     padding: 12px 29px!important;
//     font-size: 16px;
//     font-weight: 500;
//     line-height: normal;
//     text-align: left;
//     border-bottom: 1px solid #edeff1 !important;
// `

// const Tdr = styled.td`
//     color: #050f19;
//     padding: 12px 29px!important;
//     font-size: 16px;
//     font-weight: 500;
//     line-height: normal;
//     text-align: right;
//     border-bottom: 1px solid #edeff1 !important;
// `


// const Thr = styled.th`
//     cursor: auto;
//     background: #f9fafb;
//     text-align: inherit;
//     color: rgba(0,0,0,.87);
//     padding: 12px 29px!important;
//     font-style: none;
//     font-weight: 700;
//     text-transform: none;
//     border-bottom: 1px solid rgba(34,36,38,.1);
//     border-left: none;
//     text-align:right;
// `

// const Th = styled.th`
//     cursor: auto;
//     background: #f9fafb;
//     text-align: inherit;
//     color: rgba(0,0,0,.87);
//     padding: 12px 29px!important;
//     font-style: none;
//     font-weight: 700;
//     text-transform: none;
//     border-bottom: 1px solid rgba(34,36,38,.1);
//     border-left: none;
// `

// const Thead = styled.thead`
//     color: #657795!important;
//     padding: 12px 29px!important;
//     font-size: 15px;
//     background: transparent!important;
//     font-style: normal;
//     font-weight: 600;
//     text-transform: uppercase!important;
// `

// const Table =styled.table`


//     width: 100%;
//     background: #fff;
//     margin: 1em 0;
//     border: 1px solid rgba(34,36,38,.15);
//     -webkit-box-shadow: none;
//     box-shadow: none;
//     border-radius: 0.28571429rem;
//     color: rgba(0,0,0,.87);
//     border-collapse: separate;
//     border-spacing: 0;

// `

const Topguide = styled.div`
     width: 900px;
    margin: 10px auto;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:row;

`

const MobileTemplate = styled.div`
    width: 900px;
    margin: 10px auto;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:column;

    padding: 20px 25px !important;
    background: #fff;

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
    
  @media screen and (max-width: 500px){
      width: 360px;
      font-size: 12px;
    }
`;

// const SubTemplateBlockVertical = styled.div`
//      width: 900px;
//     margin: 10px auto;
//     padding-bottom: 10px;
//     position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
//     padding:15px;
//     display:flex;
//     flex-direction:column;

//     padding: 20px 25px !important;
//     background: #fff;

//     color: rgba(0, 0, 0, 0.87);
//     transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//     min-width: 0px;
//     overflow-wrap: break-word;
//     background-color: rgb(255, 255, 255);
//     background-clip: border-box;
//     border: 0px solid rgba(0, 0, 0, 0.125);
//     border-radius: 0.75rem;
//   box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
//   overflow: visible;
    
//   @media screen and (max-width: 500px){
//       width: 360px;
//       font-size: 12px;
//     }
// `;



export default WalletTokenDetailTable;