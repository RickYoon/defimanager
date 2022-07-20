import React from "react";
import * as Styled from "./TvlGainerCard.style"
import icons from "../../../assets/tokenIcons"
import { Link } from "react-router-dom";
import styled from "styled-components";


function TvlGainerCard(props) {

  console.log("props",props.data)
  console.log("props",props.isLoading)
  const skeletonArray = ['','','']

  return (
    <>
      <Styled.Topdash>
          <Styled.UpperColumn>
              Top Gainer Projects
              <Styled.Righttext> 1day - % / TVL </Styled.Righttext>
          </Styled.UpperColumn>
          <Styled.LowerColumn>
              {props.isLoading ? 
                skeletonArray.map((arr)=>
                   <Styled.ProjectBox>
                       <tr>
                            <th style={{width:"30px"}}><Styled.ProductSkeleton /></th>
                            <td style={{width:"45px"}}><Styled.IconSkeleton /></td>
                            <td style={{width:"90px"}}><Styled.ProductSkeleton style={{width:"80%"}} /></td>
                            <td style={{width:"60px", fontSize:"13px", textAlign:"center", color:"red"}}><Styled.ProductSkeleton /></td>
                            <td style={{width:"60px", fontSize:"12px", paddingLeft:"5px", textAlign:"center"}}><Styled.ProductSkeleton /></td>
                       </tr>
                    </Styled.ProjectBox>    
                    )          
              :
              props.data.map((toptvlElement,index) => 
                        <Styled.ProjectBox>
                            <Tr>
                                <Td>{index+1}</Td>
                                <Td>
                                    <Styled.Img src={icons[toptvlElement.proj]} alt="logo" height="30px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> 
                                </Td>
                                <Tdp width="100px">
                                    <Link to={`/project/${toptvlElement.proj}`}>
                                        {toptvlElement.proj}
                                    </Link>
                                </Tdp>
                                <Td width="70px" style={{fontSize:"12px", color:"red"}}>
                                    {(toptvlElement.difftwo).toFixed(1)} %
                                </Td>
                                <Td width="70px" style={{fontSize:"12px"}}>
                                    <TvlDiffAfter data={toptvlElement} />
                                </Td>
                            </Tr>
                        </Styled.ProjectBox>
                        
                )}
          </Styled.LowerColumn>
      </Styled.Topdash>
    </>
  );
}

function TvlDiffAfter(props) {

    // console.log("props",props)
    let difference = props.data.tvl-props.data.tvltwo
    // +{(toptvlElement.tvl-toptvlElement.tvltwo).toFixed(0)}
    return (
        <>
        {difference > 1000000 ?
            <>+ {(difference/1000000).toFixed(1)} M</> :
            difference > 1000 ?
            <>+ {(difference/1000).toFixed(1)} K</> :
            <>+ {difference.toFixed(1)}</>
            }

        
        </>
    )
}

const Tr = styled.tr`
height : 40px;
line-height: 40px;
  &:hover {
    height : 40px;
    background-color: #E8E8E8;
    border-radius:10px;
    line-height: 40px;
  }
  
`

const Td = styled.td`
  /* height:25px; */
  vertical-align:middle;
  padding-left: 1em;
  width: ${props => props.width || "30px"};
  @media screen and (max-width: 500px){
    height:30px;
    }
`

const Tdp = styled.td`
  /* height:25px; */
  width: ${props => props.width || "30px"};
  vertical-align:middle;
  padding-left: 1em;
  &:hover {
    text-decoration: underline;
  };
`


export default TvlGainerCard;
  