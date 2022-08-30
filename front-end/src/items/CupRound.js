// import React from "react";
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import UserContext from "../auth/userContext";
import axios from "axios";
import headers from "../_data/headers.json";
import ls from "localstorage-ttl";
import "./Standings.css";

// const CupRound = ({ id, season, round, compData }) => {
// const CupRound = ({ round, strCompData=null }) => {
const CupRound = () => {
// const CupRound = (props) => {

  // const compData = strCompData
  //                ? JSON.parse(strCompData)
  //                : strCompData;
  // const compData = JSON.parse(props.compData);
  // const round = JSON.parse(props.round);

  const location = useLocation()
  let { compData, round } = location.state;
  compData = JSON.parse(compData);

  console.log("CupRound >> compData  ###################");
  console.log(compData);

  console.log("CupRound >> round  ###################");
  // round.replaceAll("%20", " ");
  console.log(round);

  const { timezone }= useContext(UserContext).currentUser;
  // console.log("timezone >> ");
  // console.log(timezone);

  const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3/";
  const route = `fixtures?league=${compData.id}&season=${compData.season}&round=${round}&timezone=${timezone}`;
  // const route = `fixtures?league=${compData.id}&season=${compData.season}&round=${round}&timezone=America/New_York`;

  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    console.log("useEffect >> CupRound");

    // const route = `league=${compData.id}&season=${compData.season}&round=${round}`;

    const options = {
      method: "GET",
      headers: headers,
      url: BASE_URL + route
    }
    // console.log("CupRound >> route >>");
    // console.log(route);

    const axiosData = async () => {
      setStatus("fetching");
      if (ls.get(route)) {
        console.log("CupRound >> NO API CALL >> IT IS ALREADY IN CACHE !!");
        const res = ls.get(route);
        console.log(res.data.response);
        setData(res.data.response);
        setStatus("fetched");
      } else {
        console.log("CupRound >> API CALL MADE. >> IT IS NOT IN CACHE !!");
        try {
          const res = await axios.request(options);
          console.log(`useAxios >> status code: ${res.status}`);
          const oneHour = 86400000;
          ls.set(route, res, oneHour);
          console.log(res.data.response);
          setData(res.data.response);
          setStatus("fetched");
        } catch (err) {
          console.error(err);
          setError(err);
        }
      }
    }

    axiosData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status !== "fetched") return <div>Loading....</div>
  if (error) return <div>Sorry, something went wrong :(</div>

  return (
    <div className="CupRound">

      <h1>Cup Rounds</h1>

      <div className="CupRound-header-container">
        <div className="CupRound-info-container">
          <div className="CupRound-country-flag image-header">
            <img src={compData.flag} alt=""/>
          </div>

          <div className="CupRound-country-cup">
            {compData.country} - {compData.name}
          </div>

          <div className="CupRound-cup-logo image-header">
            <img src={compData.logo} alt=""/>
          </div>
        </div>

        <div className="CupRound-season font-weight-bold">
          {compData.season}/{(+compData.season % 100) + 1}
        </div>
      </div>



      <div className="center-container">
        <ul className="list">
            {data.map(game => (
              <li key={game.fixture.id}>

                <div className="match-container row">

                  <div className="date-time -4">{game.fixture.date}</div>

                  <div className="game-container col row">

                    <div className="home-team col">
                      <div className="CupRound-home-team-logo team-logo">
                        <img src={game.teams.home.logo} alt="logo-home" />
                      </div>
                      <div className="CupRound-team-home team-name">
                        {game.teams.home.name}
                      </div>
                    </div>
                    
                    <div className="CupRound-score game score col-1">
                      {game.fixture.status.short !== "NS"
                        ?
                        game.goals.home + " - " + game.goals.away 
                        :
                        " - "}
                    </div>

                    <div className="away-team col">
                      <div className="CupRound-team-away team-name">
                        {game.teams.away.name}
                      </div>
                      <div className="CupRound-away-team-logo team-logo">
                        <img src={game.teams.away.logo} alt="logo-away" />
                      </div>
                    </div>

                  </div>

                </div>            

              </li>
            ))}
        </ul>
      </div>

    </div>
  )
}

export default CupRound;