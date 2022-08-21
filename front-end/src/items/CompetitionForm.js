import React from "react";
// import React, { useState, useEffect } from "react";

const CompetitionForm = ({ 
  // getCountries, 
  // countries_, 
  countries, 
  country, 
  leagues, 
  cups, 
  handleChange, 
  handleSubmit
}) => {

  // const countries_ = JSON.parse(countries);
  // console.log("+++++++++++++++++++++++++");
  // console.log("countries: ");
  // console.log(countries);
  // console.log("+++++++++++++++++++++++++");
  console.log(`CompetitionForm >>`);

  // useEffect(() => {
  //   console.log("THIS IS useEffect");
  //   getCountries();
  //   // getStandingsApi.request(season, league_id);
  //   // getStandingsApi.request();
  // }, []);

  return (
    <div className="container">
      <form className="form-inline justify-content-around" 
            onSubmit={handleSubmit}>
        
        {/* <div className="row"> */}

        <div className="form-group col-3">
          <select
            name="country"
            className="form-control w-100" 
            defaultValue={country}
            onChange={handleChange}
          >
            <option value="">-- Countries --</option>
            {/* {countries_.map(country => ( */}

            <option value="Turkey" key="Turkey">
              Türkiye
            </option>

            <option value="Germany" key="Germany">
              Germany
            </option>

            <option value="Italy" key="Italy">
              Italy
            </option>

            <option value="England" key="England">
              England
            </option>

            <option value="Spain" key="Spain">
              Spain
            </option>

            <option value="France" key="France">
              France
            </option>

            <option value="World" key="World">
              World
            </option>

            {countries.filter(c => !["Turkey", "Germany", "Italy", "England", "Spain", "France", "World"].includes(c.name) )
              .map(country => (
              <option value={country.name} key={country.name}>
                {country.name}
              </option>)
            )}
          </select>
        </div>
        
        <div className="form-group col-3">
          <select
            id="league"
            name="league"
            className="form-control w-100" 
            onChange={handleChange}
          >
            <option value="">-- Leagues --</option>
            {leagues.map(league => 
              <option value={league.id} 
                      key={league.id}>
                {league.name}
              </option>
            )}
          </select>
        </div>
        
        <div className="form-group col-4">
          <select
            id="cup"
            name="cup"
            className="form-control w-100" 
            onChange={handleChange}
          >
            <option value="">-- Cups --</option>
            {cups.map(cup => 
              <option value={cup.id} 
                      key={cup.id}>
                {cup.name}
              </option>
            )}
          </select>
        </div>

        {/* <div className="col"> */}
          <button
              type="submit"
              className="btn btn-primary col"
          >
            Submit
          </button>
        {/* </div> */}

        {/* </div> */}

      </form>
    </div>
  )
}

export default CompetitionForm;