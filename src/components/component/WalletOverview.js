import React,{useState, useContext} from "react";
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import klaytnLogo from "../../assets/uiux/klaytnLogo.png"
import icons from "../../assets/tokenIcons"
import { WalletContext } from 'components/context/WalletContext';

const WalletOverview = () => {

    const [isLoading, setIsLoading] = useState(false)
    const {assetState} = useContext(WalletContext);
    console.log(assetState)

    return (
        <>

        <SubTemplateBlockVertical>
                <div style={{ marginBottom: "30px", fontSize: "18px", color: "#657795" }}>Total Value</div>
                {isLoading ?
                    <><span><ReactLoading type="spin" color="black" height={24} width={24} /></span> </> :
                    <div style={{ fontSize: "24px" }}>$ {assetState.totalBalance}</div>
                }
            </SubTemplateBlockVertical>

            <SubTemplateBlockVertical>
                <div style={{ marginBottom: "10px", fontSize: "20px" }}>Account Overview</div>
                <Innercontainer>
                    <InnerBox>
                        <Name>
                            <img src={klaytnLogo} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            Klay
                        </Name>
                        <Value>
                            $ {assetState.klayBalance}
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src="https://defiyield.app/static/media/WalletIcon.7586b0487b455e29c9a997698bda2ed7.svg" alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            Tokens
                        </Name>
                        <Value>
                            $ 0
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src={icons["Klayswap"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klayswap
                        </Name>
                        <Value>
                            $ 0
                        </Value>
                    </InnerBox>
                    <InnerBox>
                        <Name>
                            <img src={icons["Klaystation"]} alt="" style={{ marginRight: "16px", height: "30px", width: "30px" }} />
                            klaystation
                        </Name>
                        <Value>
                            $ 0
                        </Value>
                    </InnerBox>
                </Innercontainer>

            </SubTemplateBlockVertical>        
        </>
    )
}

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


export default WalletOverview;