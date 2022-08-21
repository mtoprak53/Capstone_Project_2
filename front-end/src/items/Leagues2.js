import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CompetitionForm from "./CompetitionForm";
import "./Standings.css";
import useApi from "../hooks/useApi";
import apiClient from "../api/client";
import FootyApi from "../api/api";

const Leagues = ({ season, league_id, setId, setSeason }) => {

  const getStandings = (season, league_id) => apiClient.get(`/standings?season=${season}&league=${league_id}`);
  const getStandingsApi = useApi(getStandings);

  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [cups, setCups] = useState([]);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [competitionData, setCompetitionData] = useState({
    type : "",
    id : 203,
    name : "",
    season : 2022
  });

  console.debug(
      "Standings",
      countries
  );

  const history = useHistory();

  async function getCountries() {
    try {
      const res = await FootyApi.getLeagueCountries();
      setCountries(countries => res);
      return res;
    } catch (errors) {
      return { success: false, errors };
    }
  };

  async function getLeaguesAndCups(country) {
    try {
      const resLeagues = await FootyApi.getCountrysLeagues(country);
      const resCups = await FootyApi.getCountrysCups(country);
      setLeagues(leagues => resLeagues);
      setCups(cups => resCups);
      return;
    } catch (errors) {
      console.error("getCountriesLeagues failed", errors);
      return { success: false, errors };
    }
  };

  useEffect(() => {
    console.log("THIS IS useEffect");
    getCountries();
    getStandingsApi.request(season, league_id);
    // getStandingsApi.request();
  }, []);

  useEffect(() => {
    console.log("THIS IS useEffect 2");
    console.log(competitionData);
    // getStandingsApi.request(competitionData.season, competitionData.id);
  }, [competitionData]);

  useEffect(() => {
    console.log("THIS IS useEffect 3");
    console.log("submitFlag: ", submitFlag);
    getStandingsApi.request(+competitionData.season, +competitionData.id);
    console.log(competitionData);

    // history.go(0);
  }, [submitFlag]);

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    console.log(competitionData);

    const competition = document.getElementById("league").value 
                     || document.getElementById("cup").value;
    console.log(competition);

    if (competitionData.type === "league") {
      console.log(competitionData.type);
      setSubmitFlag(!submitFlag);
    }
  }

  /** Update form data field */
  async function handleChange(evt) {
    const { name, value } = evt.target;
    console.log(name, value);
    if (name === "country") {
      getLeaguesAndCups(value);
    }
    if (name === "league" && value) {
      document.getElementById("cup").value="";
      setCompetitionData(competitionData => ({
        type : "league",
        id : document.getElementById("league").value,
        name: leagues.filter(l => l.id === +document.getElementById("league").value)[0].name,
        season : 2022
      }));
    }
    if (name === "cup" && value) {
      document.getElementById("league").value="";
      setCompetitionData(competitionData => ({
        type : "cup",
        id : document.getElementById("cup").value,
        name: cups.filter(c => c.id === +document.getElementById("cup").value)[0].name,
        season : 2022
      }));
    }
  }

  return (
    <div>
      <div className="Standings">

        {/* DROPDOWNS */}
        <CompetitionForm 
          countries={countries} 
          leagues={leagues} 
          cups={cups} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
        />

        <h1>Standings</h1>

        {getStandingsApi.loading && <p>Standing is loading!</p>}
        {getStandingsApi.error && <p>{getStandingsApi.error}</p>}

        <div className="Standings-header">
          <div className="Standings-header-flag image-header">
            <img src={getStandingsApi.data?.response[0].league.flag} alt=""/>
          </div>
          <span className="header">
            {getStandingsApi.data?.response[0].league.country} - {getStandingsApi.data?.response[0].league.name}
          </span>
          <div className="Standings-header-logo image-header">
            <img src={getStandingsApi.data?.response[0].league.logo} alt=""/>
          </div>
        </div>
        <div className="season">
          {getStandingsApi.data?.response[0].league.season}/
          {+getStandingsApi.data?.response[0].league.season+1}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team</th>
              <th scope="col">Pl</th>
              <th scope="col">W</th>
              <th scope="col">D</th>
              <th scope="col">L</th>
              <th scope="col">GF</th>
              <th scope="col">GA</th>
              <th scope="col">GD</th>
              <th scope="col">Po</th>
            </tr>
          </thead>
          <tbody>
            {getStandingsApi.data?.response[0].league.standings[0].map(
              team => (<tr key={team.rank}>
                <th scope="row">{team.rank}</th>
                <td>
                  <div className="Standings-table-team-logo image-table">
                    <img src={team.team.logo} alt=""  />
                  </div>
                  <span className="team-name">{team.team.name}</span>
                </td>
                <td>{team.all.played}</td>
                <td>{team.all.win}</td>
                <td>{team.all.draw}</td>
                <td>{team.all.lose}</td>
                <td>{team.all.goals.for}</td>
                <td>{team.all.goals.against}</td>
                <td>{team.goalsDiff}</td>
                <td>{team.points}</td>
            </tr>))}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Leagues;