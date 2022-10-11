import Styled from 'styled-components';

export const SubTopNavBlock = Styled.div`
  width: 1136px;
  max-height: 768px;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  font-size: 15px;

  @media screen and (max-width: 950px){
    width: 100%;
    font-size: 12px;
  }
`;



export const Topbox = Styled.div`
  width: 1136px;
  /* margin-left: 32px;
  margin-right: 32px; */
  margin: 0px auto;
  gap: 24px;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 950px){
    width: 100%;
    display: flex;
    flex-direction: column;
  }


 
`


export const Leftcolumn = Styled.div`
  width: 788px;
  /* background: gray; */
  @media screen and (max-width: 950px){
    width: 100%;
  }
`

export const Rightcolumn = Styled.div`
  width: 324px;
  /* background: gray; */
  @media screen and (max-width: 950px){
    width: 100%;
  }

`
export const OverBox = Styled.div`

  position: relative;
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: auto;
  padding: 30px;

  @media screen and (max-width: 950px){
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 0px;
  }
`

export const Title = Styled.h1`
  font-weight: 600;
  font-size: 20px;
`

export const Wrappertitle = Styled.div`
  margin: 10px auto 20px auto;
  width: 1136px;
  @media screen and (max-width: 950px){
    width: 100%;
  }
`
