import React,{useState} from 'react';
import styled from "styled-components";
import { Timeline } from 'react-twitter-widgets'
import * as Styled from "./EventCard.style"
import { FaMedium,FaTwitter} from "react-icons/fa";


function TwitterCard(props) {

  const [selsns,Setselsns] = useState("twitter")

  const chageSel = (sns) => {
    Setselsns(sns)
  } 

  return (
    <>
        <Styled.Topdash>
          <Chartrange selsns={selsns} chageSel={chageSel}/>
          {props.isLoading ? 
          <><Styled.ProductSkeleton width="100%" height="300px" style={{marginBottom:"20px"}} /></> : 
          <PoolinfoBox>
            <Timeline
              dataSource={{
                sourceType: 'list',
                id: "1491952670558412804",
              }}
              options={{
                height: '500',
                width: '100%',
                chrome: "nofooter,noheader,transparent"
              }}
            />
          </PoolinfoBox>
          }
      </Styled.Topdash>
    </>
  );
}

function Chartrange (props) {
  // console.log(props)
  return (
      <>
       <Styled.RangeContainer>
          <Styled.UpperColumn>
            Feed collection
          </Styled.UpperColumn>
          
          <Styled.Selcontainer>
            {props.selsns === "twitter" ? 
            <>
              <Styled.SelectionHover><FaTwitter style={{height:"25px",width:"25px"}} /></Styled.SelectionHover>
              <FaMedium style={{height:"25px",width:"25px", color: "gray", cursor:"pointer"}} onClick={()=>props.chageSel("medium")}/>
            </>
            :
            <>
              <Styled.SelectionNo onClick={()=>props.chageSel("twitter")}><FaTwitter style={{height:"25px",width:"25px"}}/></Styled.SelectionNo>
              <FaMedium style={{height:"25px",width:"25px", color: "black"}} />
            </>
            }
          </Styled.Selcontainer>
       </Styled.RangeContainer>
      </>
  )
}


const PoolinfoBox = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
`

export default TwitterCard;
