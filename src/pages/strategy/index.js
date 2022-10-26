
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";

function StrategyPage() {

  return (
    <>
        {/* <PoolContext.Provider value={{order,tvlSorting,aprSorting,stable, stableSetter,klay, klaySetter,pooldata,isloading}}>  */}
        {/* <OverBox> */}
          <Wrappertitle>
              <Title>Yield Explorer</Title>
          </Wrappertitle>

          <CardBox>
            <TodoTemplateBlock>
                aaa
            </TodoTemplateBlock>
            <TodoTemplateBlock>
            aaa
            </TodoTemplateBlock>
            <TodoTemplateBlock>
            aaa
            </TodoTemplateBlock>
            <TodoTemplateBlock>
            aaa
            </TodoTemplateBlock>
          </CardBox>

        {/* </OverBox>         */}
        {/* </PoolContext.Provider> */}
    </>
  );
}


const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
`

const Wrappertitle = styled.div`
  margin: 0px auto 20px auto;
  width: 1136px;
  @media screen and (max-width: 950px){
    width: 90%;
    padding-top: 20px;
    color: black;
  }
  @media screen and (max-width: 500px){
    width: 90%;
    padding-top: 20px;
    color: gray;
  }
`

const CardBox = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 24px;
`




const TodoTemplateBlock = styled.div`

    flex: 1 1 0%;
    max-width: 50%;
    min-width: 50%;

    margin: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    padding: 40px 32px;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 15%) 0px 8px 24px;
    border-radius: 20px;  
  
`;


export default StrategyPage;



// const OverBox = styled.div`

//   position: relative;
//   width: calc(100% - (230px));
//   width: -moz-calc(100% - (230px));
//   width: -webkit-calc(100% - (230px));
//   scroll-behavior: smooth;
//   scroll-snap-type: y mandatory;
//   height: 100vh;
//   overflow: auto;
//   padding: 30px;

//   @media screen and (max-width: 950px){
//     /* width: 360px; */
//     display: flex;
//     flex-direction: column;
//     margin-left: 0px;
//     width: calc(100% );
//     width: -moz-calc(100%);
//     width: -webkit-calc(100%);
//     padding: 0px;
//     margin-Top: 10px;
//   }
// `