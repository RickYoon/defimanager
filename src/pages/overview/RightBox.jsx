import React, {useContext} from "react";
import { OverviewContext } from 'components/context/OverviewContext';
import TvlGainerCard from "./component/TvlGainerCard"
import TokenGainerCard from "./component/TokenGainerCard";
import EventCard from "./component/EventCard"

function RightBox() {

  const { isloading,toptvl,toptoken } = useContext(OverviewContext);

  return (
    <>
      <TvlGainerCard data={toptvl} isLoading={isloading}/>
      <div style={{marginTop:"15px"}}></div>

      <TokenGainerCard data={toptoken} isLoading={isloading}/>
      <div style={{marginTop:"15px"}}></div>

      <EventCard />


      


    </>
  );
}



export default RightBox;
  