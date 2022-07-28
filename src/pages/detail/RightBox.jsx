import React, {useContext} from "react";
// import { OverviewContext } from 'components/context/OverviewContext';
// import TvlGainerCard from "./component/TvlGainerCard"
// import TokenGainerCard from "./component/TokenGainerCard";
import InfoBox from "./component/InfoBox"
import TwitterCard from "./component/TwitterCard"
import NavBox from "./component/NavBox"

function RightBox() {


  return (
    <>
      <NavBox />
      <InfoBox />
      <TwitterCard />
    </>
  );
}



export default RightBox;
  