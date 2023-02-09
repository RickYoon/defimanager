import * as Styled from "./TokenTable.style"
import { OverviewContext } from 'components/context/OverviewContext';
import React, {useContext} from "react";
import icons from "../../assets/tokenIcons"
import { Link } from "react-router-dom";

function TvlTable() {

  const { tokendata } = useContext(OverviewContext);

  return (
     <Styled.TodoTemplateBlock>
        <div className="tablecss" style={{ margin: "20px" }}>
            <Styled.Table>
                <thead>
                    <tr style={{ height: "40px", borderBottom: "2px solid black " }}>
                    <Styled.Th className="head" style={{ width: "10px", textAlign: "left" }}>#</Styled.Th>
                    <Styled.Tdpp className="head">Token</Styled.Tdpp>
                    <Styled.Tdc className="head" style={{paddingLeft:"20px"}}>Project</Styled.Tdc>
                    <Styled.Td className="content" style={{ width: "200px", textAlign: "right" }}>Price</Styled.Td>
                    <Styled.Td className="content" style={{ width: "200px", textAlign: "right" }}>1day</Styled.Td>
                    <Styled.Td className="content" style={{ width: "200px", textAlign: "right" }}>7days</Styled.Td>
                    </tr>
                </thead>
                <tbody>
                {tokendata.length === 0 ? 
                    <></> :
                        tokendata.map((tvld, index) => (
                          tvld.price === 0 ?
                            <Styled.Tr style={{ display: "none" }}>
                              <Styled.Td className="head" style={{ width: "20px", textAlign: "center" }}>{index + 1}</Styled.Td>
                              <Styled.Tdpd className="head">
                                <Link to={`/project/${tvld.project}`}>{tvld.token}<br /><span style={{ fontSize: "12px", color: "gray" }}>{tvld.token}</span></Link>
                              </Styled.Tdpd>
                              <Styled.Td className="head" style={{ height: "30px", width: "200px", paddingLeft: "1em", textAlign: "right" }}>{Number(tvld.price.price).toFixed(2)}<br />-</Styled.Td>
                              {/* <Td style={{ width: "100px", textAlign: "right" }}>{tvld.tvl.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Td> */}
                              <Styled.Tdc className="content" style={{ width: "300px", textAlign: "right" }}>{Number(tvld.price.holders).toLocaleString()}</Styled.Tdc>
                              <Styled.Tdc className="content" style={{ width: "300px", textAlign: "right" }}>{Number(tvld.price.transactions).toLocaleString()}</Styled.Tdc>
                              <Styled.Tdc className="head" style={{ height: "30px", width: "200px", paddingLeft: "1em", textAlign: "right" }}>{Number(Number(tvld.price.Totalsupply).toFixed(0)).toLocaleString()}</Styled.Tdc>
                              <Styled.Tdc className="head" style={{ height: "30px", width: "200px", paddingLeft: "1em", textAlign: "right" }}>{Number(Number(tvld.price.price * tvld.price.Totalsupply).toFixed(0)).toLocaleString()}</Styled.Tdc>
                            </Styled.Tr> :
                            <Styled.Tr style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4 " }}>
                              <Styled.Td className="head" style={{ width: "10px", textAlign: "center" }}>{index + 1}</Styled.Td>
                              <Styled.Tdpdd style={{ whiteSpace: "nowrap" }}>
                                <img src={icons[tvld.project]} alt="logo" height="25px" width="25px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                <Link to={`/project/${tvld.project}`}><span style={{ paddingLeft: "10px", whiteSpace: "nowrap" }}>{tvld.token}</span>
                                </Link>
                              </Styled.Tdpdd>

                              <Styled.Tdc><span style={{ fontSize: "14px", color: "gray",paddingLeft:"20px" }}>
                              {tvld.project === "kleva" ? "KLEVA" : tvld.project}
                              </span></Styled.Tdc>
                              <Styled.Td className="head" style={{ height: "30px", width: "400px", paddingLeft: "1em", textAlign: "right" }}>{Number(tvld.price).toFixed(3)}
                              </Styled.Td>
                              <Styled.Td className="content" style={{ width: "400px", textAlign: "right" }}>
                                {tvld.priceDiff > 0 ? <Styled.TextRedspan>+{tvld.priceDiff}%</Styled.TextRedspan> :
                                  <Styled.TextBluespan>{tvld.priceDiff}%</Styled.TextBluespan>
                                }
                              </Styled.Td>
                              <Styled.Td className="content" style={{ width: "300px", textAlign: "right" }}>
                                {tvld.sevenPriceDiff === 0 ? <Styled.TextNewspan>new</Styled.TextNewspan> :
                                  tvld.sevenPriceDiff > 0 ? <Styled.TextRedspan>+{tvld.sevenPriceDiff}%</Styled.TextRedspan> :
                                  <Styled.TextBluespan>{tvld.sevenPriceDiff}%</Styled.TextBluespan>
                                }
                              </Styled.Td>
                            </Styled.Tr>

                        ))
                      }
                </tbody>
      </Styled.Table>
      </div>
  </Styled.TodoTemplateBlock>
  );
}



export default TvlTable;
  