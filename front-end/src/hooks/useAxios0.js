import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import headers from "../data/headers.json";

const useAxios = (route, params="") => {
  const [items, setItems] = useState([]);

  const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3/"

  const options = {
    method: "GET",
    headers: headers,
    url: BASE_URL + route
  }

  if (params) options.params = params;

  const axiosData = async () => {
    try {
      // const response = await axios.get(`${url}${params}`);
      const response = await axios.request(options);
      setItems(items => [...items, {
        ...params,
        id: uuid(),
        route: route,
        data: response.data
      }]);
    } catch (err) {
      throw err;
    }
  }

  console.log(axiosData);
  return [items, axiosData];
}


export default useAxios;