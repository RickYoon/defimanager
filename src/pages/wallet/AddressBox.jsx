import styled from 'styled-components';
import React, { useState,useContext, useEffect } from "react";
import { WalletContext } from "components/context/WalletContext"


function AddressBox() {

  const { isDataLoading, SetIsDataLoading, isWalletLoad, SetIsWalletLoad,walletAddress, SetWalletAddress } = useContext(WalletContext);

  const updateWalletAddress = () => {

    SetIsDataLoading(true)

  }

  const changeWalletStatus= () => {
    
    SetIsWalletLoad(false)
    // alert("check your wallet address")
  }


  const handleAddress = (e) => {
    SetWalletAddress(e.target.value)
  }

  return (
    <>
        <FeedbackBoxStyle>
          {!isWalletLoad ? 
            <>
            <div style={{height:"30px", fontSize:"15px"}}>Insert Wallet Address</div>
            <RowContainer>
            <Bar></Bar>
            <div style={{marginLeft:"10px", width:"78%"}}>
              {!isDataLoading ? 
                <InputAmount value={walletAddress} onChange={handleAddress} type="text" name="ticketNum" placeholder="address" required/>
                :
                <InputAmount value={walletAddress} onChange={handleAddress} type="text" name="ticketNum" placeholder="address" disabled/>
              }
            </div>
            <Button onClick={updateWalletAddress}>search</Button>
            </RowContainer>
            </>
          :
            <>
            <div style={{height:"30px", fontSize:"15px"}}>Wallet Address</div>
            <RowContainer>
            <Bar></Bar>
              <WalletAddressBox>
                {walletAddress}
              </WalletAddressBox>
            <Button onClick={changeWalletStatus}>Change</Button>
            </RowContainer>
            </>
        }
        </FeedbackBoxStyle>
    </>
  );
}

const WalletAddressBox = styled.div`
  width: 78%;
  margin-left: 10px;
  font-size: 13px;
  margin-top:10px;
  overflow:hidden;
  @media screen and (max-width: 500px){
      width: 78%;
      font-size: 12px;
      overflow:hidden;
      white-space:nowrap;
      margin-right: 20px;
    }`

const InputAmount = styled.input`
  font-size:13px;
  padding:10px 10px 10px 5px;
  display:block;
  width:90%;
  border:none;
  border-bottom:1px solid #757575;

`

const RowContainer = styled.div`
    display:flex;
    flex-direction:row;
`

const FeedbackBoxStyle = styled.div`
    max-width: 900px;
    margin: 0px auto;
    /* width: 1136px; */
    /* min-width: 350px; */
    /* margin: 20px auto; */
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    /* display:flex; */
    /* flex-direction:row; */
    -webkit-box-align: center;
    align-items: center;

    padding: 20px 25px !important;
    /* background: #fff; */

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



export default AddressBox;


  