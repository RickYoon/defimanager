import React, { useContext } from 'react';
import styled from "styled-components";
import { Timeline } from 'react-twitter-widgets'
import * as Styled from "./InfoBox.style"
import { DetailContext } from 'components/context/DetailContext';


function TwitterCard() {

  const { detailinfo, isloading } = useContext(DetailContext);

  return (
    <>
    {detailinfo.proj.twitterid !== "-" ?
        <Styled.TopdashBottom>
          <Styled.UpperColumn>
              Projects Feed
          </Styled.UpperColumn>
          {isloading ? 
          <><Styled.ProductSkeleton width="100%" height="300px" style={{marginBottom:"20px"}} /></> : 
          <PoolinfoBox>
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: detailinfo.proj.twitterid
              }}
              options={{
                height: '450px',
                width: '100%',
                chrome: "nofooter,noheader,transparent"
              }}
            />
          </PoolinfoBox>
          }
      </Styled.TopdashBottom>
      :
      <></>
    }
    </>
  );
}
//https://github.com/KlaySwap/klayswap/blob/master/audit/Smart_Contract_Audit_Report_KlaySwap_ver_2.0.pdf


const PoolinfoBox = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
  height: 450px;
`


export default TwitterCard;
