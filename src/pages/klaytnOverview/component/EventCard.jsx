import React from "react";
import * as Styled from "./EventCard.style"
import icons from "../../../assets/tokenIcons"
import styled from "styled-components";

// technical leader 

// 백앤드 + 블록체인 엔지니어 
// nodejs 활용 백앤드 빌드할 수 있는 사람
// frontend 개발자
// 경계 : 조직과의 fit이 맞을까?
// 사무실은 강남역 목요일 오전 10시, 오후 2시 중 선택

function EventCard(props) {

  const eventList = props.data
  const eventLength = props.data.length
//   const isLoading = true;
//   console.log("event Props",eventList)

  return (
    <>
        <Styled.Topdash>
          <Styled.UpperColumn>
              Event List
          </Styled.UpperColumn>
          <Styled.LowerColumn>


        {props.isLoading ? 
        <>
        <PoolinfoBoxx style={{marginLeft:"20px", marginRight:"20px", cursor:"pointer"}}>
            <span style={{width:"30px", textAlign: "center", fontSize:"10px"}}>
                <Styled.ProductSkeleton />
            </span>
            <Iconbox>
                <Iconwrapper>
                    <Styled.IconSkeleton />
                </Iconwrapper>
            </Iconbox>
            <Explainbox>
                <Protocol>
                    <Styled.ProductSkeleton width="150px" height="15px" />
                </Protocol>
                <Protocol>
                    <Styled.ProductSkeleton width="170px" height="15px"  />
                </Protocol>
                <Token>
                    <Styled.ProductSkeleton width="170px" height="15px"  />
                </Token>
            </Explainbox>
        </PoolinfoBoxx> 
        </>:
        eventList.map((event,index) => 
        index === eventLength-1 ?
          <PoolinfoBoxx  style={{marginLeft:"20px", marginRight:"20px", cursor:"pointer"}} onClick={()=>window.location.href = event.eventLink}>
                <span style={{width:"40px", textAlign: "center", fontSize:"10px"}}>
                    {event.eventStatus === "On" ?
                        <>Now <br/> on</> :
                        event.eventStatus === "TBD" ?
                        <>D-?</> :
                        <>Up <br/> coming</>
                    }
                </span>
                <Iconbox>
                    <Iconwrapper>
                        <Img src={icons[event.projectName]} alt="logo" />
                    </Iconwrapper>
                </Iconbox>
                <Explainbox>
                    <Protocol>
                        {event.projectName}
                    </Protocol>
                    <Protocol>
                        {event.eventName}
                    </Protocol>
                    <Token>
                        {event.eventSchedule}
                    </Token>
                </Explainbox>
            </PoolinfoBoxx> :
            <PoolinfoBoxx  style={{marginLeft:"20px", marginRight:"20px", cursor:"pointer"}} onClick={()=>window.location.href = event.eventLink}>
            <span style={{width:"40px", textAlign: "center", fontSize:"10px"}}>
                {event.eventStatus === "On" ?
                    <>Now <br/> on</> :
                    event.eventStatus === "TBD" ?
                    <>D-?</> :
                    <>Up <br/> coming</>
                }
            </span>
            <Iconbox>
                <Iconwrapper>
                    <Img src={icons[event.projectName]} alt="logo" />
                </Iconwrapper>
            </Iconbox>
            <Explainbox>
                <Protocol>
                    {event.projectName}
                </Protocol>
                <Protocol>
                    {event.eventName}
                </Protocol>
                <Token>
                    {event.eventSchedule}
                </Token>
            </Explainbox>
        </PoolinfoBoxx>
            )
        
            }


          </Styled.LowerColumn>
        </Styled.Topdash>
    </>
  );
}

const Protocol = styled.div`
  padding-left: 15px;
  margin-bottom: 5px;
  /* text-decoration: underline; */
  font-size: 13px;
`

const Token = styled.div`
  padding-left: 15px;
    color: #657795;
    font-size: 11px;
    text-align: left;
`

const Explainbox = styled.div`
  display : flex;
  flex-direction : column;
`

const PoolinfoBox = styled.div`
  text-align: left;
  display : flex;
  flex-direction : row;
  align-items: center;
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-style:solid;
  border-bottom-color:#d1d1d1;

  &:hover {
    background-color: #E8E8E8;
    border-radius: 10px;
    color: #316395;
  }

`

// &:hover {
//     height : 40px;
//     background-color: #E8E8E8;
//     border-radius:10px;
//     line-height: 40px;
//   }



const PoolinfoBoxx = styled.div`
  text-align: left;
  display : flex;
  flex-direction : row;
  align-items: center;
  height: 65px;
  &:hover {
    background-color: #E8E8E8;
    border-radius: 10px;
    color: #316395;
  }
`

const Img = styled.img`
    /* width: 100%; */
    height: 100%;
    /* width: */
    /* height:25px; 
    width:25px;  */
    border:1px solid #eaeaea;
    border-radius:50%;
    background-color: #f5f5f5;
    /* padding: 1px; */
    /* background-color:ㅎㄱ묘; */
  `

const Iconwrapper = styled.div`
    width: 30px;
    height: 30px;
    margin-left: 5px;
    /* overflow: hidden; */
`

const Iconbox = styled.div`
  display: flex;
  flex-direction: row;
`



export default EventCard;
  