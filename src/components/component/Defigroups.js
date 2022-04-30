import React,{useState, useContext} from "react";
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import klaytnLogo from "../../assets/uiux/klaytnLogo.png"
import icons from "../../assets/tokenIcons"
import { WalletContext } from 'components/context/WalletContext';
import CountUp, { useCountUp } from 'react-countup';
import arrowBack from '../../assets/uiux/arrowBack.svg'
import walletIcon from "../../assets/uiux/wallet.png";
import close from "../../assets/uiux/close.png"
import WalletKlayswapDetail from "./WalletKlayswapDetail";


const Defigroups = () => {

    const {walletaddress, assetState, setServiceState,isloading,setWalletaddress, setModalstate,setAssetState} = useContext(WalletContext);

    const openModal = () => {
        console.log("walletaddress",walletaddress)
        if (walletaddress.length > 0) {

        } else {
            setModalstate(true)
        }
    }

    const disconnect = () => {
        setWalletaddress("")
        console.log("disconnect")
        setAssetState({
            totalBalance : 0,
            klayBalance : 0,
            klayValue : 0,
            tokenBalance: 0,
            klayswap: {
                klayswapTotalBalance :0
            },
            klaystation:{
                value: 0
            }
        })
        setServiceState("overview")
        // setAssetState({
        //     totalBalance : 0,
        //     klayBalance : 0
        // })
    }


    const tokenDetail = () => {
        // console.log("clicked")
        setServiceState("tokenDetail")
    }

    const klayswapDetail = () => {
        // console.log("clicked")

        setServiceState("klayswapDetail")
    }

    const klaystationDetail = () => {
        // console.log("clicked")
        setServiceState("klaystationDetail")
    }

    const kronosDetail = () => {
        // console.log("clicked")
        setServiceState("kronosDetail")
    }

    const KairosCashDetail = () => {
        // console.log("clicked")
        setServiceState("kairoscashDetail")
    }


    const goFeedback = () => {
        window.location.href="https://forms.gle/rhRN2vtxnYM1AYcA7"
    }


    return (
        <>
            <Container>

            <FeedbackBox>
                <Bar></Bar>
                <div style={{marginLeft:"10px", width:"78%", fontSize:"20px", fontWeight:"bold"}}> Groups </div>
                <span>
                    <Wallet onClick={openModal}>
                        <img src={walletIcon} alt="" style={{ marginRight: "5px", height: "30px", width: "30px" }} />
                        {walletaddress !== "" | undefined ?
                            <>
                            <span style={{ fontSize: "15px" }}>{walletaddress.slice(0, 7)}...</span>
                            <img src={close} alt="" onClick={disconnect} style={{ height: "20px", width: "20px" }} />
                            </> :
                            <span>Connect</span>
                        }
                    </Wallet>
                </span>
            </FeedbackBox>

            <SubTemplateBlockVertical>
            <div style={{ marginBottom: "10px", fontSize: "20px" }}>Select Group</div>
            <Innercontainer>
                <InnerBoxNoclick>
                        <Name style={{ marginRight: "16px", height: "30px", width: "30px" }}>KRONGZ</Name>
                        <Name>
                            <img src={icons["Kronosdao"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            KronosDao
                        </Name>
                        <Name>
                            <img src={icons["KairosCash"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            KairosCash
                        </Name>
                    </InnerBoxNoclick>
                </Innercontainer>
            </SubTemplateBlockVertical>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "10px", fontSize: "20px" }}>Krongz List</div>
                <Table>
                    <Thead>
                        <Th styled={{textAlign:"left"}}>Rank</Th>
                        <Th styled={{textAlign:"right"}}>Address</Th>
                        <Thr styled={{textAlign:"right"}}>Grade</Thr>
                        <Thr>SKRNO</Thr>
                        <Thr>WSKRNO</Thr>
                        <Thr>total KRNO</Thr>
                        <Thr>value ($)</Thr>
                    </Thead>
                    <tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>0x123fdew...</Td>
                            <Tdr>플랑크톤</Tdr>
                            <Tdr>32,122</Tdr>
                            <Tdr>232,222</Tdr>
                            <Tdr>232,222</Tdr>
                            <Tdr>232,222</Tdr>
                        </Tr>
                    </tbody>
                    <tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>0x132fdew...</Td>
                            <Tdr>공룡</Tdr>
                            <Tdr>32,122</Tdr>
                            <Tdr>232,222</Tdr>
                            <Tdr>231,222</Tdr>
                            <Tdr>232,222</Tdr>
                        </Tr>
                    </tbody>
                </Table>
            </SubTemplateBlockVertical>

            </Container>
        </>
    )
}


const Wallet = styled.div`
    align-items: center;
    background: #fff;
    border: 1px solid gray;
    border-radius: 6px;
    color: gray;
    cursor: pointer;
    display: flex!important;
    font-weight: 500;
    gap: 8px;
    margin-left: 36px;
    padding: 10px 14px;
    font-size:18px;
`


const Container = styled.div`
    margin-top:30px;
    padding-left:100px;
`

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "#3366cc" : "white"};
  color: ${props => props.primary ? "white" : "#3366cc"};

  &:hover {
    background : #3366cc;
    color : white;
  }

  cursor: pointer;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #3366cc;
  border-radius: 3px;
  float:right;
  width:20%;
  height: 35px;
  @media screen and (max-width: 500px){
    width:40%;
    }
`;

const FeedbackBox = styled.div`
    width: 900px;
    margin: 0px auto;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:row;
    -webkit-box-align: center;
    align-items: center;

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
      font-size: 15px;
    }
`


const Bar = styled.div`
    width: 6px;
    height: 30px;
    background: #3366cc;
`

const Name = styled.div`
    color: #050f19;
    display: flex;
    align-items: center;
    flex-shrink: 0;

    justify-content: flex-start;
    font-size:16px;

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

const InnerBoxNoclick = styled.div`

    border: 1px solid #edeff1;
    display: flex;
    padding: 16px;
    overflow: hidden;
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

const InnerBox = styled.div`

&:hover{  
    border: 1px solid blue;
  }
    cursor: pointer;
    border: 1px solid #edeff1;
    display: flex;
    padding: 16px;
    overflow: hidden;
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

const SubTemplateBlockVertical = styled.div`
     width: 900px;
    margin: 20px auto;
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

const Table =styled.table`


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

`


export default Defigroups;