import Styled, { keyframes } from 'styled-components';

export const Topdash = Styled.div`
    width: 788px;
    margin: 0 auto;
    
    @media screen and (max-width: 500px){
    width: 100%;
    }
`

export const Row = Styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    justify-content:space-between;

    @media screen and (max-width: 500px){
    width:100%
    display:flex;
    flex-direction:column;
    }
`

export const Leftcolumn = Styled.div`
    width:50%;
    color: rgba(0, 0, 0, 0.87);
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border: 0px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;
    margin-right: 5px;

    @media screen and (max-width: 500px){
        width:100%;
        padding: 0;
        margin-bottom:10px;
        margin-right: 0px;
    }
`

export const Rightcolumn = Styled.div`
    width:50%;
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
    margin-left: 5px;

    @media screen and (max-width: 500px){
      width:100%;
      padding: 0;
      margin-bottom:10px;
      margin-right: 0px;
      margin-left: 0px;
    }
`

export const Containersub = Styled.div`
    margin: 15px;
`

export const Topcard = Styled.div`
  background-color:white;
  padding:5px;
  border-radius: 10px;
`

export const Lefttext = Styled.span`
  text-align: left;
  font-family: "OpenSans-Medium";
  font-size: 16px;
`

export const Righttext = Styled.span`
  float: right;
  font-family: "OpenSans-Semibold";
  font-size: 20px;
  color: ${props => props.color || "blue"}
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
