import React,{useState, useContext, useEffect} from "react";
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import klaytnLogo from "../../assets/uiux/klaytnLogo.png"
import icons from "../../assets/tokenIcons"
import { WalletContext } from 'components/context/WalletContext';
import arrowBack from '../../assets/uiux/arrowBack.svg'
import axios from "axios";


const WalletTokenDetailTable = () => {


    const { assetState, isSmallTokenOpen, setIsSmallTokenOpen, isDataLoading, SetIsDataLoading, isWalletLoad, SetIsWalletLoad,walletAddress, SetWalletAddress } = useContext(WalletContext);
    
    return (
        <>
            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "30px", fontSize: "18px", color: "#657795" }}>Total Value</div>
                <div style={{ fontSize: "24px" }}>$ {assetState.totalBalance === 0 ? "-" : assetState.totalValue}</div>
            </SubTemplateBlockVertical>

            <SubTemplateBlockVertical style={{marginTop:"20px"}}>
                <div style={{ fontSize: "18px", color: "#657795" }}>Tokens
                    <span style={{ fontSize: "12px" }}> (23) 
                        <span style={{float:"right", fontSize:"15px", marginRight:"5px"}}>$ {assetState.token.totalValue.toFixed(2)}</span>
                    </span>
                </div>

                <Table>
                    <Thead>
                        <Th>Asset</Th>
                        <Thr>Token Price ($)</Thr>
                        <Thrr>Value ($)</Thrr>
                    </Thead>
                    <tbody>
                    {assetState.token.tokenList.map((token) => (
                        <Tr>
                            <Td>
                                {icons[token.symbol] !== undefined ? 
                                <><img src={icons[token.symbol]} alt="logo" height="25px" style={{ marginRight:"10px",padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                <span style={{fontSize:"13px"}}>{token.balance.toFixed(3)} {token.symbol}</span></> :
                                <><img src={icons["unknown"]} alt="logo" height="25px" style={{ marginRight:"10px",padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                <span style={{fontSize:"13px"}}>{token.balance.toFixed(3)} {token.symbol}</span></>
                                }
                            </Td>
                            <Tdr>{token.price.toFixed(3)}</Tdr>
                            <Tdrr>{(token.price * token.balance).toFixed(3)}</Tdrr>
                        </Tr>
                    ))}
                    {isSmallTokenOpen ?
                        assetState.token.smallTokenList.map((token) => (
                            <Tr>
                                <Td>
                                    {icons[token.symbol] !== undefined ? 
                                    <><img src={icons[token.symbol]} alt="logo" height="25px" style={{ marginRight:"10px",padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                    <span style={{fontSize:"13px"}}>{token.balance.toFixed(3)} {token.symbol}</span></> :
                                    <><img src={icons["unknown"]} alt="logo" height="25px" style={{ marginRight:"10px",padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                    <span style={{fontSize:"13px"}}>{token.balance.toFixed(3)} {token.symbol}</span></>
                                    }
                                </Td>
                                <Tdr>{token.price.toFixed(3)}</Tdr>
                                <Tdrr>{(token.price * token.balance).toFixed(3)}</Tdrr>
                            </Tr>
                        ))
                        :
                        <></>
                    }
                    </tbody>                    
                </Table>                
                <ButtonCover>
                    <Button onClick={()=>setIsSmallTokenOpen(!isSmallTokenOpen)}>
                    {!isSmallTokenOpen ? <>+ 소액 보이기</> : <>- 소액 감추기</>}
                    </Button>
                </ButtonCover>

            </SubTemplateBlockVertical>

            
            {
                assetState.klayswap.totalValue === 0 ?
                <></> :
                <SubTemplateBlockVertical style={{marginTop:"20px"}}>
                    <div style={{ fontSize: "18px", color: "#657795" }}>
                    <img src={icons["Klayswap"]} alt="logo" height="25px" style={{ marginRight:"10px",padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                    <span style={{fontSize:"13px"}}>Klayswap</span>
                            <span style={{float:"right", fontSize:"15px", marginRight:"5px"}}>$ {assetState.klayswap.totalValue}</span>
                    </div>

                    {assetState.klayswap.stakedKSP.balance === 0 ?
                    <></> :
                    <>
                    <span style={{fontSize:"13px", marginTop:"15px", color:"gray"}}>Staking</span>

                    <Table>
                        <Thead>
                            <Th>Token</Th>
                            <Th>unlockedDate</Th>
                            <Thr>Balance ($)</Thr>
                            <Thrr>Value ($)</Thrr>
                        </Thead>
                        <tbody>
                            <Tr>
                                <Td>KSP</Td>
                                <Tdr>{assetState.klayswap.stakedKSP.unlockedDate}</Tdr>
                                <Tdr>{assetState.klayswap.stakedKSP.balance}</Tdr>
                                <Tdrr>{assetState.klayswap.stakedKSP.value}</Tdrr>
                            </Tr>
                        </tbody>
                    </Table>   
                    </>
                    }

                    {assetState.klayswap.vKSP === 0 ?
                    <></>
                    :
                    <>
                    <span style={{fontSize:"13px", marginTop:"15px", color:"gray"}}>Voting Power</span>

                    <Table>
                        <Thead>
                            <Th>Token</Th>
                            <Thrr>Number</Thrr>
                        </Thead>
                        <tbody>
                            <Tr>
                                <Td>vKSP</Td>
                                <Tdrr>{assetState.klayswap.vKSP}</Tdrr>
                            </Tr>
                        </tbody>
                    </Table>  
                    </> 
                    }

                    {assetState.klayswap.singlePool.length === 0 ?
                    <></>
                    :
                    <>
                    <span style={{fontSize:"13px", marginTop:"15px", color:"gray"}}>Single Deposit</span>

                    
                    <Table>
                        <Thead>
                            <Th>Token</Th>
                            <Thr>Balance ($)</Thr>
                            <Thrr>Value ($)</Thrr>
                        </Thead>
                        <tbody>
                            {assetState.klayswap.singlePool.map((res)=>(
                            <Tr>
                                <Td>{res.depositToken}</Td>
                                <Tdr>{res.balance}</Tdr>
                                <Tdrr>{res.value}</Tdrr>
                            </Tr>
                            ))
                            }
                        </tbody>
                    </Table>       
                    </>
                    }        

                {assetState.klayswap.pairPool.length === 0 ?
                    <></>
                    :
                    <>
                <span style={{fontSize:"13px", marginTop:"15px", color:"gray"}}>Pair Deposit</span>

                <Table>
                    <Thead>
                        <Th>Pool</Th>
                        <Thr>Balance</Thr>
                        <Thrr>Value ($)</Thrr>
                    </Thead>
                    <tbody>
                    {assetState.klayswap.pairPool.map((res)=>(
                        <Tr>
                            <Td>
                                <Imgs src={icons[res.pairList[0]]} alt="logo" height="18px" width="18px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                <Imgs src={icons[res.pairList[1]]} alt="logo" height="18px" width="18px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                            </Td>
                            <Tdr>
                                {res.balance[0]} {res.pairList[0]} + {res.balance[1]} {res.pairList[1]}
                            </Tdr>
                            <Tdrr>25</Tdrr>
                        </Tr>
                    ))}
                    </tbody>
                </Table>    
                </>            
                }

{/*              <span style={{fontSize:"13px", marginTop:"15px", color:"gray"}}>Plus Deposit</span>

                <Table>
                    <Thead>
                        <Th>Pool</Th>
                        <Thr>Balance ($)</Thr>
                        <Thrr>Value ($)</Thrr>
                    </Thead>
                    <tbody>
                        <Tr>
                            <Td>Klay</Td>
                            <Tdr>23</Tdr>
                            <Tdrr>0.3</Tdrr>
                        </Tr>
                    </tbody>
                </Table>       */}



            </SubTemplateBlockVertical>
        }

        </>
    )
}

const ButtonCover = styled.div`
  text-align: center;
  margin: auto;
`

const Button = styled.button`
  display: inline-block;
  color: gray;
  font-size: 12px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 0px solid gray;
  border-radius: 3px;
  display: block;
  height: 30px;
  width: 100px;
`;

const Imgs = styled.img`
  width: 20px;
  height: 20px;
  border: 0.5px solid #eaeaea;
  border-radius:50%;
`


const Tr = styled.tr`
    height: 45px;
    background: #fff;
`

const Td = styled.td`
    color: #050f19;
    padding: 12px 29px!important;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    text-align: left;
    border-bottom: 1px solid #edeff1 !important;
    @media screen and (max-width: 500px){
        padding: 10px 10px!important;
    }
`

const Tdrr = styled.td`
    color: #050f19;
    padding: 12px 29px!important;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    text-align: right;
    border-bottom: 1px solid #edeff1 !important;
`

const Tdr = styled.td`
    color: #050f19;
    /* padding: 12px 29px!important; */
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    text-align: right;
    padding-right: 70px;
    border-bottom: 1px solid #edeff1 !important;
    @media screen and (max-width: 500px){
        display: none;
    }
`


const Thr = styled.th`
    cursor: auto;
    background: #f9fafb;
    text-align: inherit;
    color: rgba(0,0,0,.87);
    padding-right: 70px;
    font-style: none;
    font-weight: 700;
    text-transform: none;
    border-bottom: 1px solid rgba(34,36,38,.1);
    border-left: none;
    text-align:right;

    @media screen and (max-width: 500px){
        display: none;
    }
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
    @media screen and (max-width: 500px){
        padding: 10px 10px!important;
    }
`


const Thrr = styled.th`
    cursor: auto;
    background: #f9fafb;
    text-align: right;
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
    /* border: 1px solid rgba(34,36,38,.15); */
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 0.28571429rem;
    color: rgba(0,0,0,.87);
    border-collapse: separate;
    border-spacing: 0;
    
        
  @media screen and (max-width: 500px){
      width: 310px;
      font-size: 20px;
    }

`

const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     max-width: 900px;

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
      /* margin: 10px 10px; */
      font-size: 15px;
    }
`;

export default WalletTokenDetailTable;