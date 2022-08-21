// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import "./Standings.css";
import FootyApi from "../api/api";

const Cup = ({
  season=2021, 
  cup_id=1, 
  country="World", 
  flag=null
}) => {

  console.debug(
    "Cup",
    cup_id, season
  );

  // const [cupId, setCupId] = useState(cup_id);
  const [cupData, setCupData] = useState({
    name: "World Cup",
    logo: "https://media.api-sports.io/football/leagues/1.png"
  });

  let data = useAxios(`fixtures/rounds?league=${cup_id}&season=${season}`);

  // let data2;

  useEffect(() => {

    /** id =>  { name, logo, country } */
    async function getCup(id) {
      try {
        const res = await FootyApi.getCupById(id);
        console.log(`FootyApi.getCupById >> `);
        console.log(res);
        // cup = res;
        // return res;
        setCupData(res);
      } catch (errors) {
        return { success: false, errors };
      }
    };

    // { name, logo } = await getCup(cup_id);
    // data2 = getCup(cup_id);
    getCup(cup_id);
    console.log("cupData:");
    console.log(cupData);
    // console.log(data2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.isLoading) return <div>Loading....</div>
  if (data.error) return <div>Sorry, something went wrong :(</div>
  

  console.log(data.response);

  const rounds = data.response.data.response;

  return (
    <div>
      <div className="Cup">

        <h1>Cup Rounds</h1>

        <div className="Standings-header">
          <div className="Standings-header-flag image-header">
            <img src={flag} alt=""/>
          </div>
          <span className="header">
            {/* {country} - {data2.name} */}
            {country} - {cupData.name}
          </span>
          <div className="Standings-header-logo image-header">
            {/* <img src={data2.logo} alt=""/> */}
            <img src={cupData.logo} alt=""/>
          </div>
        </div>
        <div className="season">
          {season}/{+season+1}
        </div>

        <ul>
          {rounds.map(round => (
            <li>{round}</li>
          ))}
        </ul>

      </div>

    </div>
  )
}

export default Cup;