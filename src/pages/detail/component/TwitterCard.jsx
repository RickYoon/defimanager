import React from 'react';
import styled from "styled-components";
import { Timeline } from 'react-twitter-widgets'
import * as Styled from "./InfoBox.style"


function TwitterCard() {

  return (
    <>
        <Styled.TopdashBottom>
          <Styled.UpperColumn>
              Projects Feed
          </Styled.UpperColumn>
          <PoolinfoBox>
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: "Klayswap"
              }}
              options={{
                height: '500',
                width: '100%',
                chrome: "nofooter,noheader,transparent"
              }}
            />
          </PoolinfoBox>
      </Styled.TopdashBottom>
    </>
  );
}
//https://github.com/KlaySwap/klayswap/blob/master/audit/Smart_Contract_Audit_Report_KlaySwap_ver_2.0.pdf


const PoolinfoBox = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-style:solid;
  border-bottom-color:#d1d1d1;
`


export default TwitterCard;
