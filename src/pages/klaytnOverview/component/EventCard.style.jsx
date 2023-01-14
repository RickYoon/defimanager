import Styled, { keyframes } from 'styled-components';

export const Textmiddle = Styled.div`
    display: table-cell;
    width: 20px;
    height: 30px;
    /* padding: 10px; */
    /* border: 3px dashed #1c87c9; */
    vertical-align: middle;
`

export const Topdash = Styled.div`

    display: flex;
    flex-direction: column;

    border: 0px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;
    margin-right: 5px;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    @media screen and (max-width: 500px){
      width: 100%;
    }
`

export const UpperColumn = Styled.div`
    width: 280px;
    height: 35px;
    font-family: "OpenSans-Medium";
    font-size: 16px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    padding:5px;
    @media screen and (max-width: 500px){
      width: 330px;
    }

`

export const LowerColumn = Styled.div`
    /* width: 322px; */
    /* height: 150px; */
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`

export const ProjectBox = Styled.div`
    height: 40px;
    margin-left: 15px;
    margin-right: 15px;
    /* padding:5px; */
    font-size: 14px;

    display: flex;
    flex-direction: row;

    /* background: black; */
`


export const Righttext = Styled.span`
  float: right;
  font-family: "OpenSans-Semibold";
  font-size: 12px;
  color: ${props => props.color || "gray"}
`




export const Img = Styled.img`
    height: 100%;
    /* width: 70%; */
    border:1px solid #eaeaea;
    border-radius:50%;
    background-color: #f5f5f5;
    vertical-align:middle;
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
  height: ${props => props.height || "20px"};
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
  height: 25px;
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

export const TextNewspan = Styled.span`
  font-size: 15px;
  color: #E8720C;
  @media screen and (max-width: 500px){
    font-size: 13px;
  }
`

export const Selcontainer = Styled.div`
  display: flex;
  margin-top: 15px;
  margin-right: 10px;
`

export const Item = Styled.div`
  background-color:${props => props.primary ? "white" : ""};
  color:${props => props.primary ? "#316395" : "gray"};
  border-width: 4px;
  border-radius: 8px;
  border-color: ${props => props.primary ? "black" : ""};
  flex-basis: 50%;
  height: 40px;  
  padding-top: 10px;
  display: table-cell;
  vertical-align: middle;
  text-align:center;
  align-self: center;
  /* @media screen and (max-width: 500px){ */
  width: 360px;
  /* } */
`

export const RangeContainer = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-right:10px;
`

export const SelectionHover = Styled.div`
  height: 25px;
  width: 25px;
  margin-right: 10px;
  color: #1DA1F2;
`

export const SelectionNo = Styled.div`
  height: 25px;
  width: 25px;
  margin-right: 10px;
  color: gray;
  cursor: pointer;
`
