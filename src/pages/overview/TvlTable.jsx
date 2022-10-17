import * as Styled from "./TvlTable.style"
import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext} from "react";
import icons from "../../assets/tokenIcons"
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip"
import styled from "styled-components";


function TvlTable() {

  const skeletonArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  const { tvldata, isloading } = useContext(OverviewContext);

  return (
    <Styled.TodoTemplateBlock>
        <div className="tablecss" style={{ margin: "20px" }}>
      <Styled.Table>
        <thead>
          <Styled.TrHead>
            <Styled.Th>#</Styled.Th>
            <Styled.Tdp>Project</Styled.Tdp>
            <Styled.Tdc width="200px">Chain</Styled.Tdc>
            <Styled.Tdc width="150px">Category</Styled.Tdc>
            <Styled.Td textAlign="right">TVL($)</Styled.Td>
            <Styled.Td width="50px" textAlign="right"></Styled.Td>
            <Styled.Td textAlign="right">1day</Styled.Td>
            <Styled.Td textAlign="right">7days</Styled.Td>
            <Styled.Tdc textAlign="right">M/S</Styled.Tdc>
          </Styled.TrHead>
        </thead>
        <tbody>
        {isloading ?
            skeletonArray.map((skelton,index)=>(
            <tr key={index} style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4 " }}>
                 <Styled.Th className="head" style={{ width: "30px", textAlign: "left" }}>{index+1}</Styled.Th>
                 <Styled.Tdpd className="head" style={{ width: "30px", textAlign: "left", whiteSpace: "nowrap" }}>
                     <Styled.IconSkeleton style={{ padding: "1px",borderRadius: "15px",  verticalAlign: "bottom" }}/>
                     <Styled.ProductSkeleton marginTop="10px" style={{ padding: "7px", whiteSpace: "nowrap", paddingLeft:"10px"}}/>
                </Styled.Tdpd>
                 <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><Styled.ProductSkeleton/></Styled.Tdc>
                 <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><Styled.ProductSkeleton/></Styled.Tdc>
                 <Styled.Td className="content" style={{ width: "200px", textAlign: "right" }}><Styled.ProductSkeleton/></Styled.Td>
                <Styled.Td className="content" style={{ width: "50px", textAlign: "right" }}><Styled.ProductSkeleton/></Styled.Td>
                <Styled.Td className="content" style={{ width: "100px", textAlign: "right", color: "red" }}><Styled.ProductSkeleton/>%</Styled.Td>
                <Styled.Td className="content" style={{ width: "200px", textAlign: "right", color: "red" }}><Styled.ProductSkeleton/>%</Styled.Td>
                <Styled.Tdc className="content" style={{ width: "200px", textAlign: "right" }}><Styled.ProductSkeleton/>%</Styled.Tdc>
            </tr>
            )) :
            tvldata.data.map((tvld, index) => (
            <Tr key={index} style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4" }}>
                <Styled.Th className="head" style={{ width: "50px", textAlign: "left" }}> {index+1}
                    {tvld.rankdiff === 0 ? 
                        <span style={{ fontSize: "14px", color: "black" }}>(-)</span> :
                        tvld.rankdiff > 0 ? 
                            <span style={{ fontSize: "14px", color: "red" }}>(&uarr;{tvld.rankdiff})</span> :
                            <span style={{ fontSize: "14px", color: "blue", verticalAlign: "middle" }}>(&darr;{Math.abs(Number(tvld.rankdiff))})</span>
                    }                    
                </Styled.Th>
                <Styled.Tdpd className="head" style={{ width: "30px", textAlign: "left", whiteSpace: "nowrap" }}>
                    <Link to={`/project/${tvld.proj}`}>
                        <img src={icons[tvld.proj]} alt="logo" height="25px" width="25px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                        <span style={{ padding: "7px", whiteSpace: "nowrap", paddingLeft:"10px" }}>{tvld.proj}</span>
                    </Link>
                </Styled.Tdpd>
                <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}>{tvld.chain}</Styled.Tdc>
                <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}>{tvld.cat}</Styled.Tdc>
                <Styled.Td className="content" style={{ width: "200px", textAlign: "right" }}>
                    {tvld.tvl > 1000000000 ?
                        <span> {Number(tvld.tvl / 1000000000).toFixed(1)}B </span> :
                        tvld.tvl > 1000000 ?
                            <span> {Number(tvld.tvl / 1000000).toFixed(1)}M </span> :
                                tvld.tvl > 1000 ?
                                    <span> {Number(tvld.tvl / 1000).toFixed(0)}K </span> :
                                    <span> {Number(tvld.tvl).toFixed(0)}</span>
                    }
                </Styled.Td>
                <Styled.Td className="content" style={{ width: "50px", textAlign: "right" }}>
                    {tvld.notification !== undefined ?
                        <>
                            <a href='#!' data-for={tvld.proj} data-tip={tvld.notification}><AiOutlineInfoCircle /></a>
                            <ReactTooltip id={tvld.proj} border multiline={true} data-border={true} place="top" aria-haspopup='true' type="light" effect="solid">
                            <Styled.P>Notification : </Styled.P>
                            <Styled.P>{tvld.notification.lineOne}</Styled.P>
                            <Styled.P>{tvld.notification.lineTwo}</Styled.P>
                            </ReactTooltip>
                        </> :
                        <></>
                    }
                </Styled.Td>
                    {tvld.difftwo === null ? 
                        <Styled.Td className="content" style={{ width: "100px", textAlign: "right", color: "gray" }}>-</Styled.Td> :
                            tvld.difftwo > 0 ?
                                <Styled.Td className="content" style={{ width: "100px", textAlign: "right", color: "red" }}>+{tvld.difftwo.toFixed(0)}%</Styled.Td> :
                                <Styled.Td className="content" style={{ width: "100px", textAlign: "right", color: "blue" }}>{tvld.difftwo.toFixed(0)}%</Styled.Td>
                    }
                    {tvld.diff === null ? 
                        <Styled.Td className="content" style={{ width: "100px", textAlign: "right", color: "#E8720C" }}>new</Styled.Td> :
                            tvld.diff > 0 ?
                                <Styled.Td className="content" style={{ width: "200px", textAlign: "right", color: "red" }}>+{tvld.diff}%</Styled.Td> :
                                <Styled.Td className="content" style={{ width: "200px", textAlign: "right", color: "blue" }}>{tvld.diff}%</Styled.Td>
                    }
                    {tvld.MarketShare === null ? 
                        <Styled.Tdc className="content" style={{ width: "100px", textAlign: "right", color: "gray" }}>-</Styled.Tdc> :
                        <Styled.Tdc className="content" style={{ width: "200px", textAlign: "right" }}>{tvld.MarketShare.toFixed(2)}%</Styled.Tdc>
                    }
            </Tr>
            ))
        }
        </tbody>
      </Styled.Table>
      </div>
  </Styled.TodoTemplateBlock>
  );
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

export default TvlTable;
  