import React from 'react';
import * as Styled from "./EventBanner.style"
import { VscFeedback} from "react-icons/vsc";
import icons from "../../../assets/eventImage"

function EventBanner() {

  return (
    <>
      <Styled.Topdash style={{textAlign: "center", cursor:"pointer"}} onClick={()=>window.location.href = "https://bit.ly/3qCSlKY"}>
          <img alt="" class="i-amphtml-fill-content i-amphtml-replaced-content" decoding="async" src={icons["futureDexEvent"]}></img>
      </Styled.Topdash>
    </>
  );
}

// https://forms.gle/5GBZSi6f5Qh3yg3n7

export default EventBanner;
