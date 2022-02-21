
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

function Faqpage() {


  return (
    <>
      <div style={{ paddingTop: "30px" }}></div>
      <SubTemplateBlock>
        <H3 style={{ paddingBottom: "10px" }}>클레이랩스에 오신것을 환영합니다.</H3>
        <h1 style={{ paddingBottom: "10px" }}>이곳에는 자주 올라오는 질문들의 답변을 업데이트 하려고 합니다. 참고 부탁드립니다.</h1>
        <h1 style={{ paddingBottom: "10px" }} >문의링크 : <a style={{ color: "blue" }} href="https://forms.gle/NNcouFibWUJu3Ygr9">클릭</a></h1>

        <div style={{ paddingBottom: "30px" }}></div>
        <H3 style={{ paddingBottom: "10px" }}>이 사이트에 목적은 무엇인가요?</H3>
        <H1 style={{ paddingBottom: "10px", lineHeight: "1.5" }}>
          현재 빠르게 확장하고 있는 클레이튼 생태계의 DeFi, NFT 프로젝트를 연구하고,
          연구한 결과를 기반으로 암호화폐 투자자가 더 편리하고, 더 높은 수익을 얻을 수 있는 다양한 서비스를 제공하려고 하고 있습니다.
          현재는 그 첫번째 단계인 DeFi 통합 정보 서비스 제공을 하고 있고, 두번째 로드맵은 곧 공개될 예정입니다.</H1>

        <div style={{ paddingBottom: "30px" }}></div>
        <H3 style={{ paddingBottom: "10px" }}>지갑의 홀더 숫자가 너무 적어보입니다. 정확한 정보가 맞는지요?</H3>
        <H1 style={{ paddingBottom: "10px", lineHeight: "1.5" }}>
          토큰 홀더의 숫자는 말 그대로 현재 해당 토큰을 보유하고 있는 지갑의 숫자를 표시하고 있습니다.
          물론 스테이킹 혹은 파밍을 하게되면 해당 유저의 지갑을 떠나기 때문에 정확한 해당토큰 소유자의 숫자라고 보기엔 한계점이 있습니다.
          하지만, 스테이킹을 함으로 해서 증서를 받는 프로젝트들 예를들면 kronos, neverland 와 같은 코인들은 스테이킹을 하면 SKRNO, CLOCK 등을
          받기 때문에 해당 코인으로 스테이킹 홀더의 숫자 파악이 가능해보입니다. 이에 따라 앞으로 이런 코인들을 추가해 나가려고 하고,
          증서가 없는 토큰들에 대해서는 정확한 홀더를 유추할 방법을 계속 연구해나갈 계획입니다.
          참고로, 대체적으로 유저의 숫자가 생각보다 낮은데, 실제로 아직은 디파이가 초기 단계이고, 빠르게 성장하는 단계라고 보시면 좋을 것 같습니다.
        </H1>

        <div style={{ paddingBottom: "30px" }}></div>
        <H3 style={{ paddingBottom: "10px" }}>토큰의 시총 및 유통량등의 정보를 업데이트할 계획이 있는지요?</H3>
        <H1 style={{ paddingBottom: "10px", lineHeight: "1.5" }}>
          업데이트 계획이 있습니다. 다만, 해당내용에 대한 정확한 파악을 위해서는 락업 스케줄, 버닝, 바이백등 고려할 항목이 많이 있기 때문에
          시간이 소요되고 있는 점 양해 바랍니다.
        </H1>

        <div style={{ paddingBottom: "30px" }}></div>
        <H3 style={{ paddingBottom: "10px" }}>클레이랩스에 프로젝트를 리스팅하고 싶습니다. 어떻게 하면 되나요?</H3>
        <H1 style={{ paddingBottom: "10px", lineHeight: "1.5" }}>
          위의 문의링크로 해당문의를 전달해주시면 대응해드리도록 하겠습니다.
        </H1>


      </SubTemplateBlock>

    </>
  );
}

const H1 = styled.h1`
  font-size:15px;
  @media screen and (max-width: 500px){
      width: 320px;
      font-size: 12px;
    }
`


const H3 = styled.h3`
  font-size:20px;
  @media screen and (max-width: 500px){
      width: 320px;
      font-size: 16px;
    }
`

const SubTemplateBlock = styled.div`
    width: 744px;
    margin: 0 auto;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    background-color:white;
    padding:15px;
    
  @media screen and (max-width: 500px){
      width: 360px;
      font-size: 12px;
    }
    `;

export default Faqpage;
