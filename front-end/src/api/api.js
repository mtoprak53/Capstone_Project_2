import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * 
 * Static class tying together methods used to get/send to the API. 
 * There shouldn't be any frontend-specific stuff here, and there shouldn't 
 * be any API-aware stuff elsewhere in the frontend.
 * 
 */

class FootyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FootyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getCities(continent) {
    let res = await this.request(`locals/timezones/${continent}`);
    return res.cities;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async getLeagueCountries() {
    let res = await this.request(`locals/countries`);
    return res;
  }

  static async getCountrysLeagues(country) {
    let res = await this.request(`locals/leagues/${country}`);
    return res;
  }

  static async getCountrysCups(country) {
    let res = await this.request(`locals/cups/${country}`);
    return res;
  }

  static async getCupById(id) {
    let res = await this.request(`locals/cups/id/${id}`);
    return res;
  }

}

export default FootyApi;