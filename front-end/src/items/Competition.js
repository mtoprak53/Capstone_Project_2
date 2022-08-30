import React, { useState, useEffect } from "react";
// import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import headers from "../_data/headers.json";
// import useAxios from "../hooks/useAxios";
import CompetitionForm from "./CompetitionForm";
import League from "./League";
import Cup from "./Cup";
import FootyApi from "../api/api";
import ls from "localstorage-ttl";
import "./Standings.css";

const Competition = () => {

  const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3/"

  // const cache = useRef({});

  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [cups, setCups] = useState([]);
  const [leagueData, setLeagueData] = useState();
  const [cupData, setCupData] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [submitToggle, setSubmitToggle] = useState(false);

  /** { id, name, type, season, country, flag } */
  const [compData, setCompData] = useState({ 
    id: 203, 
    name: null, 
    logo: null, 
    type: "league",
    season: 2022, 
    country: "Turkey", 
    flag: null,
  });

  /** { id, name, type, season, country, flag } */
  const [tempCompData, setTempCompData] = useState({ 
    id: 203, 
    name: null, 
    logo: null, 
    type: "league",
    season: 2022, 
    country: "Turkey", 
    flag: null,
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

  async function getCupInfo(id) {
    try {
      const res = await FootyApi.getCupById(id);
      setTempCompData(tempCompData => ({
        ...tempCompData, 
        logo: res.logo, 
        country: res.country,
        flag: countries.filter(c => c.name === res.country)[0].flag
      }));
      // console.log(`getLeagues >> res=`);
      // console.log(res);
      return;
    } catch (errors) {
      console.error("getCountriesLeagues failed", errors);
      return { success: false, errors };
    }
  };

  useEffect(() => {
    console.log("useEffect >> mount");

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
    console.log("useEffect >> submitToggle"); 

    // if (tempCompData.id) setCompData({ ...tempCompData });
    console.log("tempCompData:");
    console.log(tempCompData);
    console.log("compData:");
    console.log(compData);

    let route;
    if (compData.type === "league") route = "standings?";
    if (compData.type === "cup") route = "fixtures/rounds?";
    route += `league=${compData.id}&season=${compData.season}`;
    
    const options = {
      method: "GET",
      headers: headers,
      url: BASE_URL + route 
    }

    const axiosData = async () => {
      setStatus("fetching");
      // if (cache.current[options.url]) {
      if (ls.get(route)) {
        console.log("NO API CALL >> IT IS ALREADY IN CACHE !!");
        const res = ls.get(route);
        // setData(res);
        // console.log(res);
        console.log(res.data.response);

        if (compData.type === "league") {
        // if (res.data.response[0].league) {
          setLeagueData(res.data.response[0].league);
          console.log(res.data.response[0].league); 
        }      

        if (compData.type === "cup") {
        // else {
          setCupData(res.data.response);
          console.log(res.data.response);
        }

        setStatus("fetched");
      } else {
        console.log("API CALL MADE. >> IT IS NOT IN CACHE !!");
        try {
          const res = await axios.request(options);
          console.log(`useAxios >> status code: ${res.status}`);
          // cache.current[options.url] = res;
          const oneHour = 86400000;
          ls.set(route, res, oneHour);
          // setData(res);
          // console.log(res);

          if (compData.type === "league") {
          // if (res.data.response[0].league) {
            setLeagueData(res.data.response[0].league);
            console.log(res.data.response[0].league);
          }      

          if (compData.type === "cup") {
          // else {
            setCupData(res.data.response);
            console.log(res.data.response);
            // console.log(res);
          }

          setStatus("fetched");
        } catch (err) {
          console.error(err);
          setError(err);
        }
      }
    }

    axiosData();
    // const res = axiosData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitToggle]);


  /** Handle form submit */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("handleSubmit");
    console.log("compData:");
    console.log(compData);
    // const competition = document.getElementById("league").value 
    //                  || document.getElementById("cup").value;
    setError(null);
    setCompData({ ...compData, ...tempCompData });
    setSubmitToggle(!submitToggle);
  }

  /** Update form data field */
  async function handleChange(evt) {
    const { name, value } = evt.target;
    // console.log("handleChange >> ");
    // console.log({ name, value });

    if (name === "country") {
      console.log("handleChange >> country change");
      getLeagues(value);
      setTempCompData({
        ...tempCompData, 
        country: value, 
        flag: countries.filter(c => c.name === value)[0].flag
      });
    }

    if (name === "league" && value) {
      console.log("handleChange >> league change");
      document.getElementById("cup").value="";
      setTempCompData(tempCompData => ({
        ...tempCompData,
        type : "league",
        id : +document.getElementById("league").value,
        name: leagues.filter(l => l.id === +document.getElementById("league").value)[0].name
      }));
    }

    if (name === "cup" && value) {
      console.log("handleChange >> cup change");
      document.getElementById("league").value="";
      const cupId = +document.getElementById("cup").value;
      setTempCompData(tempCompData => ({
        ...tempCompData,
        type : "cup",
        id : cupId,
        name: cups.filter(c => c.id === cupId)[0].name
      }));
      getCupInfo(cupId);
    }

    console.log({ name, value });
  }

  // if (isLoading) return <div>Loading....</div>
  // if (status !== "fetched") return <div>Loading....</div>
  // if (error) return <div>Sorry, something went wrong :(</div>

  let compComponent;

  if (compData.type && 
      leagueData && 
      compData.type.toLowerCase() === "league") {
    compComponent = <League data={JSON.stringify(leagueData)} />
  }

  if (compData.type && 
      cupData && 
      compData.type.toLowerCase() === "cup") {
    compComponent = <Cup data={{cupData}}
                         compData={JSON.stringify(compData)} />
  }

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

        {isLoading || status !== "fetched" 
           ? 
          <div>Loading....</div> 
            : 
          null}
        
        {error ? <div>Sorry, something went wrong :(</div> : null}
        {/* {isLoading ? <div>Loading....</div> : null}
         */}
        {compComponent}

      </div>
    </div>
  )
}

export default Competition;