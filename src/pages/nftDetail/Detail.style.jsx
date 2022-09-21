import Styled from 'styled-components';



export const Topbox = Styled.div`
  width: 1136px;
  /* margin-left: 32px;
  margin-right: 32px; */
  margin: 0px auto;
  gap: 24px;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 500px){
    width: 360px;
    display: flex;
    flex-direction: column;
  }


 
`


export const Leftcolumn = Styled.div`
  width: 788px;
  /* background: gray; */
  @media screen and (max-width: 500px){
    width: 360px;
  }
`

export const Rightcolumn = Styled.div`
  width: 324px;
  /* background: gray; */
  @media screen and (max-width: 500px){
    width: 360px;
  }

`