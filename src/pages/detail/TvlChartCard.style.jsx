import Styled, { keyframes } from 'styled-components';

export const Img = Styled.img`
    height: 100%;
    /* width: 70%; */
    border:1px solid #eaeaea;
    border-radius:50%;
    background-color: #f5f5f5;
    vertical-align:middle;
`

export const Chartcover = Styled.div`
  background-color: white;
  width: 788px;
  height: 290px;
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  padding-top:15px;
  padding-bottom:15px;
  padding-left:10px;
  padding-right:10px;
  margin-top: 10px;

  background-color:white;
  border-radius: 8px;
  box-shadow: 1px 1px 1px gray;

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
  @media screen and (max-width: 950px){
    /* width: 100%; */
    width: 100%;
    margin-top: 0px;
    margin-bottom: 10px;

    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;

  }
`

export const StyleTooltip = Styled.div`
  border-radius: 0.25rem;
  background: #72787F;
  color: #fff;
  padding: 1rem;
  box-shadow: 15px 30px 40px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
`


const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;


export const ProductSkeleton = Styled.div`
  display: inline-block;
  height: ${props => props.height || "90%"};
  width: ${props => props.width || "100%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(
    90deg,
    #eee,
    #f5f5f5,
    #eee
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: ${props => props.marginTop || "0"}
`;

export const IconSkeleton = Styled.div`
  display: inline-block;
  /* height: 25px; */
  width: 25px;
  margin-left: 10px;
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(
    90deg,
    #eee,
    #f5f5f5,
    #eee
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 15px;
  margin-top: ${props => props.marginTop || "0"}
`;