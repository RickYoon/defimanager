import React, {useContext} from "react";
import { OverviewContext } from 'components/context/OverviewContext';
import TvlGainerCard from "./component/TvlGainerCard"
import TokenGainerCard from "./component/TokenGainerCard";
import EventCard from "./component/EventCard"
import TwitterCard from "./component/TwitterCard"
import SubmitEvent from "./component/SubmitEvent"

function RightBox() {

  const { isloading,toptvl,toptoken,eventlist } = useContext(OverviewContext);

  return (
    <>
      <TvlGainerCard data={toptvl} isLoading={isloading}/>
      <div style={{marginTop:"15px"}}></div>

      <TokenGainerCard data={toptoken} isLoading={isloading}/>
      <div style={{marginTop:"15px"}}></div>

      <EventCard data={eventlist} isLoading={isloading}/>
      <div style={{marginTop:"15px"}}></div>

      <TwitterCard />
      <div style={{marginTop:"15px"}}></div>

      <SubmitEvent />

    </>
  );
}



export default RightBox;
  