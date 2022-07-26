import React from 'react';
import styled from "styled-components";
import { Timeline } from 'react-twitter-widgets'
import * as Styled from "./EventCard.style"

function TwitterCard() {

  return (
    <>
        <Styled.Topdash>
          <Styled.UpperColumn>
              Projects Feed
          </Styled.UpperColumn>
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
      </Styled.Topdash>
    </>
  );
}

const PoolinfoBox = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-style:solid;
  border-bottom-color:#d1d1d1;
`

export default TwitterCard;
