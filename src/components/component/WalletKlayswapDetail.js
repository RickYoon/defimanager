import React,{useState, useContext} from "react";
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import klaytnLogo from "../../assets/uiux/klaytnLogo.png"
import icons from "../../assets/tokenIcons"
import { WalletContext } from 'components/context/WalletContext';
import arrowBack from '../../assets/uiux/arrowBack.svg'


const WalletKlayswapDetail = () => {

    const [isLoading, setIsLoading] = useState(false)
    const {assetState,serviceState,setServiceState} = useContext(WalletContext);
    console.log(assetState)

    const backToOverview = () => {
        setServiceState("portfolio")
    }

    return (
        <>
        <Container>
        <Topguide onClick={backToOverview}>
            <img style={{width:"30px"}} alt="" src={arrowBack} />
        </Topguide>

        <SubTemplateBlockVertical>
                <div style={{ marginBottom: "30px", fontSize: "18px", color: "#657795" }}>Klayswap total Value</div>
                {isLoading ?
                    <><span><ReactLoading type="spin" color="black" height={24} width={24} /></span> </> :
                    <div style={{ fontSize: "24px" }}>$ {assetState.klayswap.klayswapTotalBalance.toFixed(2)}</div>
                }
            </SubTemplateBlockVertical>

            <MobileTemplate>
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
            </MobileTemplate>
            <MobileTemplate>
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
            </MobileTemplate>      
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top:30px;
    padding-left:100px;
    @media screen and (max-width: 500px){
    margin-top:10px;
    padding-left:15px;
    width: 360px;
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
      width: 360px;
      font-size: 12px;
    }
`;


export default WalletKlayswapDetail;