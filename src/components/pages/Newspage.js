
import styled from 'styled-components';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { AiFillTrophy, AiOutlineProfile } from "react-icons/ai";
// import { BsFillSafeFill, BsCurrencyBitcoin } from "react-icons/bs";
import { Timeline } from 'react-twitter-widgets'
import axios from 'axios';

//https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40klaybank
//https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40klayswap
//https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40klaytn
//https://cortezd334.medium.com/embed-medium-posts-in-your-react-app-dd7b6693c6d4


function Newspage() {
  const [subselection, setSubselection] = useState(true)

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

    console.log("mediumdata", mediumdata)

    let tempObj = [];
    // let afterObj = [];

    for (let i = 0; i < mediumdata.length; i++) {
      tempObj.push({
        "image": mediumdata[i].tokenimage,
        "date": mediumdata[i].date,
        "title": mediumdata[i].title,
        "description": mediumdata[i].description,
      })
    }

    console.log(tempObj)

    setBlog({ item: tempObj, isLoading: false })

  }

  return (
    <>
      <SubTemplateBlock style={{ marginTop: "20px", marginBottom: "10px" }}>
        <Underline primary={false}><Link to="/"><AiFillTrophy style={{ marginRight: "5px", verticalAlign: "middle" }} /><Span style={{ paddingBottom: "10px" }}>DeFiRank</Span></Link></Underline>
        <Underline style={{ marginLeft: "10px" }} primary={true}><Link to="/news"><AiOutlineProfile style={{ marginRight: "5px", verticalAlign: "middle" }} /><Span style={{ paddingBottom: "10px" }}>News</Span></Link></Underline>
      </SubTemplateBlock>

      <SubTemplateBlock>
        <Titlecard>
          * Integrated Klaytn DeFi project News
        </Titlecard>
      </SubTemplateBlock>

      <Selcontainer>
        <Item primary={subselection} onClick={() => setSubselection(true)} style={{ cursor: "pointer" }}>MEDIUM</Item>
        <Item primary={!subselection} onClick={() => setSubselection(false)} style={{ cursor: "pointer" }}>TWITTER</Item>
      </Selcontainer>


      {}

      <SubTemplateBlock>
        <Row>
          <Leftcolumn>
            <Topcard>
              <Containersub>
                <Subtitle style={{ textAlign: "center", color: "#3d5599", fontFamily: "OpenSans-Semibold" }}> MEDIUM DAILY NEWS</Subtitle>
              </Containersub>
            </Topcard>
            <Bottomcard>
              {
                blog.item.map((blg) =>
                  <Card>
                    <Container>
                      <Image src={blg.image}
                        alt="logo" style={{ padding: "0px", verticalAlign: "center" }} />
                      <Colum>
                        <Title>{blg.title}</Title>
                        <div style={{ paddingTop: "5px", paddingBottom: "15px" }}>{blg.date.split(" ")[0]}</div>
                        <Desc>{blg.description}</Desc>
                        <div></div>
                      </Colum>
                    </Container>
                  </Card>
                )
              }
            </Bottomcard>

          </Leftcolumn>
          <Rightcolumn>
            <Topcard>
              <Containersub>
                <Subtitle style={{ textAlign: "center", color: "#3d5599", fontFamily: "OpenSans-Semibold" }}> TWITTER REALTIME FEED</Subtitle>
              </Containersub>
            </Topcard>
            <Bottomcard>

              <Card>
                <Timeline
                  dataSource={{
                    sourceType: 'list',
                    id: "1491952670558412804",
                  }}
                  options={{
                    height: '600',
                    width: '100%',
                    chrome: "nofooter,noheader,transparent"
                  }}
                />
              </Card>
            </Bottomcard>
          </Rightcolumn>


        </Row>
      </SubTemplateBlock>

    </>
  );
}

const Containersub = styled.div`
@media screen and (max-width: 500px){
  display : none;
}
`

const Subtitle = styled.div`
@media screen and (max-width: 500px){
  display:none;
}
`

const Desc = styled.div`
  font-family: 'OpenSans-Medium';
  display: block;
  line-height: 1.5;
`

const Title = styled.div`
  font-family: 'OpenSans-Semibold';
  font-weight: bold;
  font-size: 14px;
`



const Row = styled.div`
  &:after{
        content: "";
display:table;
clear:both;
}
`

const Leftcolumn = styled.div`
float:left;
width:60%;

  @media screen and (max-width: 500px){
  width: 100%;
  padding: 0;
}
`
const Rightcolumn = styled.div`
float:left;
width:40%;
background-color:#f1f1f1;
padding-left:20px;
  @media screen and (max-width: 500px){
        width: 100%;
  padding: 0;
  margin-top: 20px;
}
`

const Titlecard = styled.div`
padding-top:5px;
`


const Topcard = styled.div`
background-color:white;
padding:10px;
border-radius: 10px; 
@media screen and (max-width: 500px){
display:none;
}
`

const Bottomcard = styled.div`
height:600px;
overflow:auto;
margin-top:10px;
border-radius: 10px; 

`

const Card = styled.div`
background-color:white;
padding:10px;
margin-bottom:8px;
font-size:13px;
border-radius: 10px; 
`

const Selcontainer = styled.div`

  @media screen and (max-width: 500px){
  width: 360px;
  box-shadow: 1px 0px 1px 0px gray;
  position: relative;
  display: flex;
  margin: 0 auto;
  /* border: solid;
  border-color: gray; */
  justify-content: space-around;
  border-radius: 8px;
  margin-top: 15px;
  /* border-width:1px; */
  box-shadow: 1px 1px 1px 1px gray;


  flex-direction: row;

}
`


const Container = styled.div`
display: flex;
width: 100%;
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

const Span = styled.span`
    &:hover {
        color: black;
}
`

const Underline = styled.span`
/* Adapt the colors based on primary prop */
  border-bottom: ${props => props.primary ? "2px solid black" : ""};
  color : ${props => props.primary ? "black" : "gray"};
                    padding : 5px;
                    font-weight : 900;
  @media screen and (max-width: 500px){
        fontsize: 15px;
}
`;

const SubTemplateBlock = styled.div`
width: 900px;
max-height: 768px;
margin: 0 auto;
padding-bottom: 10px;

position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */

  @media screen and (max-width: 500px){
        width: 360px;
font-size: 12px;
}
`;

const Item = styled.div`
display:none;

  @media screen and (max-width: 500px){
    background-color:${props => props.primary ? "white" : ""};
  color:${props => props.primary ? "#316395" : "gray"};
  border-width: 4px;
  border-radius: 8px;
  border-color: ${props => props.primary ? "black" : ""};
  flex-grow:1;
  height: 40px;  
  padding-top: 10px;
  

  display: table-cell;
  vertical-align: middle;
  text-align:center;
  align-self: center;
  width: 360px;
  }
`


export default Newspage;
