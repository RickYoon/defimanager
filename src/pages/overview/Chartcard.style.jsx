import Styled, { keyframes } from 'styled-components';

export const Rangedisplay = Styled.div`
  padding-left:10px;
  padding-bottom:15px;
  font-size: 15px;
  height: 10px;
  vertical-align: middle;
`

export const RangeControlBox = Styled.div`
  align-items: center;
  display: flex;
  flex-direction : row;
`

export const Chartbutton = Styled.div`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "#316395" : "white"};
  color: ${props => props.primary ? "white" : "gray"};

  font-size: 0.9em;
  /* margin: 0.2em; */
  padding: 0.2em 0.8em;
  /* border: 2px solid palevioletred; */
  border-radius: 5px;
  cursor: pointer;
  @media screen and (max-width: 500px){
    /* width: 100%; */
    padding: 0.2em 0.4em;
  }
`

export const ChartbuttonInput = Styled.input`
  cursor: pointer;
  display: block;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 10%;
`

export const RangeContainer = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-right:10px;

`


export const Chartcover = Styled.div`
  background-color: white;
  width: 788px;
  max-height: 768px;
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  padding-top:15px;
  /* padding-bottom:5px; */
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
  @media screen and (max-width: 500px){
    width: 100%;
    /* width: 360px; */
    margin-top: 0px;


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



export const SmallSkeleton = Styled.div`
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

