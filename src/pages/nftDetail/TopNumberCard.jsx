import React, {useContext} from "react";
import * as Styled from "./TopNumberCard.style"
import { NftDetailContext } from 'components/context/NftDetailContext';
import { ImArrowUp2,ImArrowDown2 } from "react-icons/im";

function TopNumbercard() {

  const { nftdetailinfo, isloading} = useContext(NftDetailContext);
  console.log("here", nftdetailinfo)
  
  return (
    <>
      <Styled.Topdash>
        <Styled.Row>
          <Styled.Leftcolumn>
            <Styled.Topcard>
              <Styled.Containersub>
                  <Styled.Lefttext> transaction History (Beta)</Styled.Lefttext>
                    {isloading ? 
                        <Styled.Righttext> <Styled.ProductSkeleton style={{width:"70px"}}/> </Styled.Righttext> :
                        <Styled.Righttext color="#316395"> {nftdetailinfo.startDate} ~ {nftdetailinfo.endDate} </Styled.Righttext>
                    }
              </Styled.Containersub>
            </Styled.Topcard>
          </Styled.Leftcolumn>
          <Styled.Rightcolumn>
            <Styled.Topcard>
              <Styled.Containersub>
                  <Styled.Lefttext> Currency </Styled.Lefttext>
                    {isloading ? 
                        <Styled.Righttext> <Styled.ProductSkeleton style={{width:"70px"}}/> %</Styled.Righttext> :
                        <Styled.Righttext color="#316395"> USD </Styled.Righttext>
                    }
              </Styled.Containersub>
            </Styled.Topcard>
          </Styled.Rightcolumn>

        </Styled.Row>
      </Styled.Topdash>
    </>
  );
}

export default TopNumbercard;
  