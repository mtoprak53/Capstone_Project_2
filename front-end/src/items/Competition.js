import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import CompetitionForm from "./CompetitionForm";
import League from "./League";
import Cup from "./Cup";
import "./Standings.css";
import FootyApi from "../api/api";

const Competition = () => {

  const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3/"

  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [cups, setCups] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /** { id, name, type, season, country, flag } */
  const [compData, setCompData] = useState({ 
    id: 203, 
    season: 2022, 
    type: "league",
    country: "Turkey", 
    flag: null, 
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
    getLeagues(compData.country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let route;
    if (compData.type === "league") route = "standings?";
    if (compData.type === "cup") route = "fixtures/rounds?";
    
    const options = {
      method: "GET",
      headers: headers,
      url: BASE_URL + route + `league=${cup_id}&season=${season}`
    }

    const axiosData = async () => {
      setStatus("fetching");
      if (cache.current[options.url]) {
        const data = cache.current[options.url];
        setData(data);
        setStatus("fetched");
      } else {
        try {
          const data = await axios.request(options);
          console.log(`useAxios >> status code: ${data.status}`);
          cache.current[options.url] = data;
          setData(data);
          setStatus("fetched");
        } catch (err) {
          console.error(err);
          setError(err);
        }
      }
    }

    axiosData();
    // eslint-disable-next-line react-hooks/exhaustive-deps


  }, [submitToggle]);


  /** Handle form submit */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(compData);
    const competition = document.getElementById("league").value 
                     || document.getElementById("cup").value;
    console.log(competition);
  }

  /** Update form data field */
  async function handleChange(evt) {
    const { name, value } = evt.target;
    // console.log("handleChange >> ");
    // console.log({ name, value });

    if (name === "country") {
      console.log("handleChange >> country change");
      getLeagues(value);
      setCompData({
        ...compData, 
        country: value, 
        flag: countries.filter(c => c.name === value)[0].flag
      });
    }

    if (name === "league" && value) {
      console.log("handleChange >> league change");
      document.getElementById("cup").value="";
      setCompData(compData => ({
        ...compData,
        type : "league",
        id : +document.getElementById("league").value,
        name: leagues.filter(l => l.id === +document.getElementById("league").value)[0].name
      }));
    }

    if (name === "cup" && value) {
      console.log("handleChange >> cup change");
      document.getElementById("league").value="";
      setCompData(compData => ({
        ...compData,
        type : "cup",
        id : +document.getElementById("cup").value,
        name: cups.filter(c => c.id === +document.getElementById("cup").value)[0].name
      }));
    }

    console.log({ name, value });
  }

  if (isLoading) return <div>Loading....</div>
  if (error) return <div>Sorry, something went wrong :(</div>

  const compComponent = compData.type.toLowerCase() === "league"
        ?
      <League 
        season={compData.season}
        league_id={compData.id}
      />
        :
      <Cup 
        season={compData.season}
        cup_id={compData.id}
        country={compData.country} 
        flag={compData.flag}
      />

  return (
    <div>
      <div className="Standings">

        <CompetitionForm 
          countries={countries} 
          country={compData.country} 
          leagues={leagues} 
          cups={cups} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
        />

        {compComponent}

      </div>
    </div>
  )
}

export default Competition;