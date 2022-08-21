import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import CompetitionForm from "./CompetitionForm";
import League from "./League";
import Cup from "./Cup";
import "./Standings.css";
// import useApi from "../hooks/useApi";
// import apiClient from "../api/client";
import FootyApi from "../api/api";

const Competition = () => {

  // const [country, setCountry] = useState("Turkey");
  const [countries, setCountries] = useState([]);
  // const [flag, setFlag] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [cups, setCups] = useState([]);
  // const [submitFlag, setSubmitFlag] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /** { id, name, type, season, country, flag } */
  const [competitionData, setCompetitionData] = useState({ 
    season: 2021, 
    type: "league",
    country: "Turkey", 
    flag: null, 
    id: null, 
    name: null 
  });

  console.log("Competition");

  async function getLeagues(country) {
    try {
      const res = await FootyApi.getCountrysLeagues(country);
      setLeagues(leagues => res.filter(r => r.type === "League"));
      setCups(cups => res.filter(r => r.type === "Cup"));
      // console.log(`getLeagues >> res=`);
      // console.log(res);
      return;
    } catch (errors) {
      console.error("getCountriesLeagues failed", errors);
      return { success: false, errors };
    }
  };

  useEffect(() => {
    console.log("THIS IS useEffect");

    async function getCountries() {
      try {
        const res = await FootyApi.getLeagueCountries();
        setCountries(countries => res);
        return res;
      } catch (err) {
        console.error(err);
        setError(err);
      }
      setIsLoading(false);
    };

    getCountries();
    getLeagues(country);
  }, []);


  /** Handle form submit */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(competitionData);
    const competition = document.getElementById("league").value 
                     || document.getElementById("cup").value;
    console.log(competition);
  }

  /** Update form data field */
  async function handleChange(evt) {
    const { name, value } = evt.target;
    console.log(name, value);

    if (name === "country") {
      getLeagues(value);
      setCountry(value);
      setFlag(countries.filter(c => c.name === value)[0].flag);
    }

    if (name === "league" && value) {
      document.getElementById("cup").value="";
      setCompetitionData(competitionData => ({
        ...competitionData,
        type : "league",
        id : document.getElementById("league").value,
        name: leagues.filter(l => l.id === +document.getElementById("league").value)[0].name
      }));
    }

    if (name === "cup" && value) {
      document.getElementById("league").value="";
      setCompetitionData(competitionData => ({
        ...competitionData,
        type : "cup",
        id : document.getElementById("cup").value,
        name: cups.filter(c => c.id === +document.getElementById("cup").value)[0].name
      }));
    }
  }

  if (isLoading) return <div>Loading....</div>
  if (error) return <div>Sorry, something went wrong :(</div>

  return (
    <div>
      <div className="Standings">

        <CompetitionForm 
          countries={countries} 
          country={country} 
          leagues={leagues} 
          cups={cups} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
        />

        {
          competitionData.type.toLowerCase() === "league"
            ?
          <League 
            season={competitionData.season}
            league_id={competitionData.id}
          />
            :
          <Cup 
            season={competitionData.season}
            cup_id={competitionData.id}
            country={country} 
            flag={flag}
          />
        }

      </div>
    </div>
  )
}

export default Competition;