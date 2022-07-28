import React from 'react';
import styled from "styled-components";
import { Timeline } from 'react-twitter-widgets'
import * as Styled from "./EventCard.style"

function TwitterCard(props) {

  return (
    <>
        <Styled.Topdash>
          <Styled.UpperColumn>
              Projects Feed
          </Styled.UpperColumn>
          {props.isLoading ? 
          <><Styled.ProductSkeleton width="100%" height="300px" style={{marginBottom:"20px"}} /></> : 
          <PoolinfoBox>
            <Timeline
              dataSource={{
                sourceType: 'list',
                id: "1491952670558412804",
              }}
              options={{
                height: '500',
                width: '100%',
                chrome: "nofooter,noheader,transparent"
              }}
            />
          </PoolinfoBox>
          }
      </Styled.Topdash>
    </>
  );
}

const PoolinfoBox = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
`

export default TwitterCard;
