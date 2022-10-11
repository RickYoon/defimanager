import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import axios from "axios";
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
        <Topdash>
          <Cardmenu selsns={selsns} chageSel={chageSel}/>
          {props.isLoading ? 
            <>
              <Styled.ProductSkeleton width="100%" height="300px" style={{marginBottom:"20px"}} />
            </> : 
            selsns === "twitter" ?
            <Twitter /> :
            <><Medium /></>
          }
      </Topdash>
    </>
  );
}

function Medium () {
  const [subselection, setSubselection] = useState(true)
  const [isloading, setIsloading] = useState(true)

  const [blog, setBlog] = useState({
    item: [],
    isLoading: true,
    error: null
  })

  useEffect(() => {
    loadPostings()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])


  const loadPostings = async () => {

    const mediumUrls = await axios.get('https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/medium')
    const mediumdata = mediumUrls.data.body.Items;

    // console.log("mediumdata", mediumdata)

    let tempObj = [];
    // let afterObj = [];

    for (let i = 0; i < mediumdata.length; i++) {
      tempObj.push({
        "image": mediumdata[i].tokenimage,
        "date": mediumdata[i].date,
        "title": mediumdata[i].title,
        "description": mediumdata[i].description,
        "guid": mediumdata[i].guid
      })
    }

    // console.log(tempObj)

    setBlog({ item: tempObj, isLoading: false })
    setIsloading(false)
  }

  const handleClickAgain = guid => {
    window.location.href = `https://www.medium.com/p/${guid}`;
    // console.log("hello " + guid);
  };

  return (
    <>
    {
      blog.item.map((blg) =>
      <>
        <Bottomcard>
          {
            blog.item.map((blg) =>
              <Card>
                <Container onClick={() => { handleClickAgain(blg.guid) }} style={{ cursor: "pointer" }}>
                  <Image src={blg.image}
                    alt="logo" style={{ padding: "0px", verticalAlign: "center" }} />
                  <Colum>
                    <Title>{blg.title}</Title>
                    <div style={{ paddingTop: "5px", paddingBottom: "15px" }}>{blg.date.split(" ")[0]}</div>
                    {blg.description.length > 300 ? <Desc>{blg.description.slice(0, 300)} ...</Desc> :
                      <Desc>{blg.description}</Desc>
                    }
                  </Colum>
                </Container>
              </Card>
            )
          }
        </Bottomcard>
      </>
      )
    }</>
  )
}

const Bottomcard = styled.div`
  /* height:800px; */
  /* overflow:auto; */
  margin-top:10px;
  margin-bottom:25px;
  border-radius: 10px;
`
const Desc = styled.div`
      font-family: 'OpenSans-Medium';
      display: block;
      line-height: 1.5;
  @media screen and (max-width: 500px){
        word-wrap: break-word;
      width:100%;
    }
`

const Title = styled.div`
  font-family: 'OpenSans-Semibold';
  font-weight: bold;
  font-size: 14px;
`

const Card = styled.div`
  background-color:white;
  padding:10px;
  margin-bottom:8px;
  font-size:13px;
  border-radius: 10px;
`

const Image = styled.img`
  vertical-align: middle;
  flex-shrink: 0;
  height:50px;
`

const Colum = styled.div`
  flex-direction: column;
  margin-right: 10px;
  padding-left: 10px;
  flex: 1;
`

const Container = styled.div`
  display: flex;
  width: 100%;
  padding:5px;
`


function Twitter () {
  return (
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
  )
}

function Cardmenu (props) {
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
              <Styled.SelectionHover>
                <FaTwitter style={{height:"25px",width:"25px"}} />
              </Styled.SelectionHover>
              <FaMedium style={{height:"25px",width:"25px", color: "gray", cursor:"pointer"}} onClick={()=>props.chageSel("medium")}/>
            </>
            :
            <>
              <Styled.SelectionNo onClick={()=>props.chageSel("twitter")}>
                <FaTwitter style={{height:"25px",width:"25px"}}/>
              </Styled.SelectionNo>
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

const Topdash = styled.div`

    display: flex;
    flex-direction: column;

    border: 0px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    height: 500px;
    overflow: auto;
    margin-right: 5px;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    @media screen and (max-width: 500px){
        width: 100%;
    }
`

export default TwitterCard;
