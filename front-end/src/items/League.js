import React from "react";
import { Link } from "react-router-dom";
// import Team from "./Team";
import "./League.css";

const League = (props) => {

  const data = JSON.parse(props.data);
  console.log("League");
  const { season, country, flag, logo, name, standings } = data;

  return (
    <div className="League d-flex justify-content-center">
      <div className="League-container mx-5">

        <h1 className="text-center">League Standing</h1>


        <div className="League-header-container container">

          <div className="League-info-container row">
            <div className="League-league col row d-flex align-items-center">
              <div className="col-4"><img src={logo} alt="" /></div>
              <div className="image-header d-flex align-items-center col">
                <h2>{name}</h2>
              </div>
            </div>

            <div className="League-country col row d-flex align-items-center">
              <div className="image-header d-flex align-items-center justify-content-end col">
                <h2 className="">{country}</h2>
              </div>
              <div className="col-4">
                <img className="rounded-pill" src={flag} alt=""/>
              </div>
            </div>
          </div>

        </div>


        {/* <div className="Standings-header">
          <div className="Standings-header-flag image-header">
            <img src={flag} alt=""/>
          </div>
          <span className="header">
            {country} - {name}
          </span>
          <div className="Standings-header-logo image-header">
            <img src={logo} alt=""/>
          </div>
        </div>
        <div className="season">
          {season}/{+season+1}
        </div> */}


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
            {standings[0].map(
              team => (<tr key={team.rank}>
                <th scope="row">{team.rank}</th>
                <td>
                  <div className="League-table-team-logo mr-2">
                    <img className="image-table" src={team.team.logo} alt=""  />
                  </div>
                  <Link 
                    to={{
                      pathname: `/team/${team.team.name}`,
                      // state: {flag: flag}
                      state: { flag }
                    }}
                  ><span className="team-name">{team.team.name}</span></Link>
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

export default League;