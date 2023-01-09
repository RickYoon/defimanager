import React, { useState, useEffect } from 'react';
import * as Styled from "./index.style"

import StableListTable from "./StableListTable"
import Chartcard from "./Chartcard"

function StablePage() {

  // total klaytn stable value 
  // stable coin price
  // minting 얼마나 늘어나고 줄었는지
  // usdt dominance 가 얼마나 되는지

  return (
    <>
      <Styled.OverBox>
        
        <Styled.Wrappertitle>
          <Styled.Title>Stablecoins</Styled.Title>
        </Styled.Wrappertitle>

        <Styled.Topbox>
            <Styled.Leftcolumn>
                <Chartcard />
                <StableListTable />
            </Styled.Leftcolumn>
        </Styled.Topbox>
      </Styled.OverBox>
    </>
  );
}

export default StablePage;


  // chart x : day, y : Volume
  // total volume (24h), Total volume (7d), Total volume (1m)
  // 1 day change, 24h volume, 7d volume, 1m volume, 24h # of Txs
