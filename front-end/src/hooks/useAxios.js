import { useEffect, useState, useRef } from "react";
import axios from "axios";
import headers from "../_data/headers.json";

const useAxios = (route, params="") => {
  const cache = useRef({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3/"

  const options = {
    method: "GET",
    headers: headers,
    url: BASE_URL + route
  }

  if (params) options.params = params;


  useEffect(() => {
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
  }, [options.url]);
  
  return { data, error, status };
};


export default useAxios;