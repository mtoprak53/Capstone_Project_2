// import React, { useEffect } from "react";
import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import useAxios from "./hooks/useAxios";
// import { v4 as uuid } from "uuid";
// import headers from "./data/headers.json";
// import teamData from "./data/teamsInfo2.json";
import "./Standings.css";
// import Footy from "../api/api";
import useApi from "../hooks/useApi";
import apiClient from "../api/client";
import FootyApi from "../api/api";
// import Alert from "../common/Alert";

// const options = {
//   method: 'GET',  
//   headers: {
//     'X-RapidAPI-Key': '9aaa87feb1msh1f7452fb0989f38p1d2a37jsnd6476f2b7d4d',
//     'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
//   },
//   url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
//   // params: {season: '2021', league: '203'},  // Superlig
//   params: {season: '2021', league: '78'},  // Bundesliga
// };

// const getStandings = () => axios.request(options);

const Standings = ({ season=2022, league_id=203 }) => {

  const getStandings = (season, league_id) => apiClient.get(`/standings?season=${season}&league=${league_id}`);
  // const history = useHistory();
  const getStandingsApi = useApi(getStandings);


  // const history = useHistory();
  // const [formErrors, setFormErrors] = useState([]);
  const [countries, setCountries] = useState([]);
  // const [country, setCountry] = useState("");
  // const [league, setLeague] = useState("");
  const [leagues, setLeagues] = useState([]);
  // const [cup, setCup] = useState("");
  const [cups, setCups] = useState([]);
  // const [league, setLeague] = useState("");

  console.debug(
      "Standings",
      countries
  );

  async function getCountries() {
    try {
      // console.log("THIS IS TRY");
      const res = await FootyApi.getLeagueCountries();
      console.log("TRY: res = ");
      console.log(res);
      setCountries(countries => res);
      return res;
    } catch (errors) {
      console.error("getCountries failed", errors);
      return { success: false, errors };
    }
  };

  async function getLeaguesAndCups(country) {
    try {
      // console.log("THIS IS TRY");
      const resLeagues = await FootyApi.getCountrysLeagues(country);
      const resCups = await FootyApi.getCountrysCups(country);
      // console.log("TRY: res = ");
      // console.log(res);
      setLeagues(leagues => resLeagues);
      setCups(cups => resCups);
      return;
    } catch (errors) {
      console.error("getCountriesLeagues failed", errors);
      return { success: false, errors };
    }
  };


  // let countries;
  useEffect(() => {
    console.log("THIS IS useEffect");
    // getStandingsApi.request(season, league_id);
    // getCountriesApi.request();
    getCountries();
    // console.log("useEffect: countries = ");
    // console.log(countries);
  }, []);

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    // let result = await signup(formData);
    // if (result.success) {
    //   history.push("/standings");
    // } else {
    //   setFormErrors(result.errors);
    // }
  }

  /** Update form data field */
  async function handleChange(evt) {
    const { name, value } = evt.target;
    // setFormData(data => ({ ...data, [name]: value }));
    console.log(name, value);
    if (name === "country") {
      getLeaguesAndCups(value);
    }
    if (name === "league" && value) {
      document.getElementById("cup").value="";
    }
    if (name === "cup" && value) {
      document.getElementById("league").value="";
    }
  }

  return (
    <div>
      <div className="Standings">

        {/* DROPDOWNS */}

        {/* <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4"> */}
        <div className="container">
          {/* <h2 className="mb-3">Sign Up</h2> */}
          {/* <div className="card"> */}
            {/* <div className="card-body"> */}

              <form className="form-inline row justify-content-around" onSubmit={handleSubmit}>

                {/* <div className="form-row row"> */}
                
                <div className="form-group col-2">
                  {/* <label>Country</label> */}
                  <select
                    name="country"
                    className="form-control w-100" 
                    onChange={handleChange}
                  >
                    <option value="">-- Countries --</option>
                    {countries.map(country => (
                      <option value={country.name} key={country.name}>
                        {country.name}
                      </option>)
                    )}
                  </select>
                </div>
                
                <div className="form-group col-4">
                  {/* <label>League</label> */}
                  <select
                    id="league"
                    name="league"
                    className="form-control w-100" 
                    onChange={handleChange}
                  >
                    <option value="">-- Leagues --</option>
                    {leagues.map(league => 
                      <option value={league.name} key={league.name}>
                        {league.name}
                      </option>
                    )}
                  </select>
                </div>
                
                <div className="form-group col-4">
                  {/* <label>League</label> */}
                  <select
                    id="cup"
                    name="cup"
                    className="form-control w-100" 
                    onChange={handleChange}
                  >
                    <option value="">-- Cups --</option>
                    {cups.map(cup => 
                      <option value={cup.name} key={cup.name}>
                        {cup.name}
                      </option>
                    )}
                  </select>
                </div>

                {/* {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                } */}

                <button
                    type="submit"
                    // className="btn btn-primary float-right"
                    className="btn btn-primary col-2"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>

                {/* </div> */}
              </form>
            {/* </div> */}
          {/* </div> */}
        </div>

        <h1>Standings</h1>

        {getStandingsApi.loading && <p>Standing is loading!</p>}
        {getStandingsApi.error && <p>{getStandingsApi.error}</p>}
        {/* {JSON.stringify(getStandingsApi.data)} */}
        {/* {JSON.stringify(getCountriesApi.data)} */}

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

export default Standings;