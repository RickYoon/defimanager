import React from 'react';
import * as Styled from "./SubmitEvent.style"
import { VscFeedback} from "react-icons/vsc";

function SubmitEvent() {

  return (
    <>
        <Styled.Topdash style={{textAlign: "center", cursor:"pointer"}} onClick={()=>window.location.href = "https://forms.gle/5GBZSi6f5Qh3yg3n7"}>
          <Styled.UpperColumn>
            <VscFeedback style={{marginRight:"10px"}}/>Submit Feedback & Event <br/>
          </Styled.UpperColumn>
      </Styled.Topdash>
    </>
  );
}

// https://forms.gle/5GBZSi6f5Qh3yg3n7

export default SubmitEvent;
