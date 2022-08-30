import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import headers from "../_data/headers.json";
import ls from "localstorage-ttl";
import "./Team.css";

const Team = () => {
  const location = useLocation()
  let { flag } = location.state;
  const { team_name } = useParams();  

  const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3/";
  const route = `teams?name=${team_name}`;

  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    console.log("useEffect >> Team");

    const options = {
      method: "GET",
      headers: headers,
      url: BASE_URL + route
    }

    const axiosData = async () => {
      setStatus("fetching");
      if (ls.get(route)) {
        console.log("Team >> NO API CALL >> IT IS ALREADY IN CACHE !!");
        const res = ls.get(route);
        console.log(res.data.response[0]);
        setData(res.data.response[0]);
        setStatus("fetched");
      } else {
        console.log("Team >> API CALL MADE. >> IT IS NOT IN CACHE !!");
        try {
          const res = await axios.request(options);
          console.log(`useAxios >> status code: ${res.status}`);
          const oneHour = 86400000;
          ls.set(route, res, oneHour);
          console.log(res.data.response[0]);
          setData(res.data.response[0]);
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
    <div className="Team d-flex justify-content-center">

      <div className="Team-container mx-5">
        <h1 className="text-center">Team Info</h1>

        <div className="Team-header-container container">

          <div className="Team-info-container row">
            <div className="Team-team col row d-flex align-items-center">
              <div className="col-4"><img src={data.team.logo} alt="" /></div>
              <div className="image-header d-flex align-items-center col">
                <h2>{data.team.name}</h2>
              </div>
            </div>

            <div className="Team-country col row d-flex align-items-center">
              <div className="image-header d-flex align-items-center justify-content-end col">
                <h2 className="">{data.team.country}</h2>
              </div>
              <div className="col-4">
                <img className="rounded-pill" src={flag} alt=""/>
              </div>
            </div>
          </div>

        </div>

        <div className="row mt-3">
          <div className="ml-4 col d-flex align-items-start flex-column">
            <p className="my-2"><span className="font-weight-bold fontsize_1_3_rem">Founded:</span> {data.team.founded}</p>
            <p className="my-2"><span className="font-weight-bold fontsize_1_3_rem">Venue:</span> {data.venue.name}</p>
            <p className="my-2"><span className="font-weight-bold fontsize_1_3_rem">Capacity:</span> {data.venue.capacity}</p>
          </div>

          <div className="mr-4 col d-flex align-items-center justify-content-end">
            <img className="rounded" src={data.venue.image} alt="" />
          </div>
        </div>

      </div>

    </div>
  )
};

export default Team;