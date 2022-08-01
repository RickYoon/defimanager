import * as Styled from "./TokenTable.style"
import { DetailContext } from 'components/context/DetailContext';
import React, {useContext} from "react";
import icons from "../../assets/tokenIcons"
import { Link } from "react-router-dom";

function TvlTable() {

  const { detailinfo,isloading } = useContext(DetailContext);
  console.log("totken", detailinfo)

  return (
     <Styled.TodoTemplateBlock>
       <Styled.UpperColumn>
          Trend Summary
          <Styled.Righttext>  ('22.07.11~'22.09.11) </Styled.Righttext>
        </Styled.UpperColumn>         

        <div className="tablecss">
            <Styled.Table>
                <thead>
                    <tr style={{ height: "40px", borderBottom: "2px solid black " }}>
                      <Styled.Td>ITEM</Styled.Td>
                      <Styled.Tdc>TODAY</Styled.Tdc>
                      <Styled.Td>RANGE</Styled.Td>
                      <Styled.Td >from-high</Styled.Td>
                      <Styled.Td >from-low</Styled.Td>
                    </tr>
                </thead>
                <tbody>
                  <Styled.Tr>
                    <Styled.Td>TVL</Styled.Td>
                    <Styled.Tdc>600M</Styled.Tdc>
                    <Styled.Td>800M ~ 2.3B</Styled.Td>
                    <Styled.Td>-91%</Styled.Td>
                    <Styled.Td>+20%</Styled.Td>
                  </Styled.Tr>
                  <Styled.Tr>
                    <Styled.Td>KSP</Styled.Td>
                    <Styled.Tdc>0.54</Styled.Tdc>
                    <Styled.Td>0.2 ~ 6.9</Styled.Td>
                    <Styled.Td>-91%</Styled.Td>
                    <Styled.Td>+5%</Styled.Td>
                  </Styled.Tr>
                </tbody>
            </Styled.Table>
      </div>
  </Styled.TodoTemplateBlock>
  );
}



export default TvlTable;
  