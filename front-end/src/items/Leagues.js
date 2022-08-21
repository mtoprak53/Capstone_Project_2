import React from "react";
// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import CompetitionForm from "./CompetitionForm";
import "./Standings.css";
// import useApi from "../hooks/useApi";
// import apiClient from "../api/client";
// import FootyApi from "../api/api";

const Leagues = ({ league }) => {

  const {
    country, 
    flag, 
    logo, 
    name, 
    season, 
    standings 
  } = JSON.parse(league);

  return (
    <div>
      <div className="Standings">

        <h1>League Standing</h1>

        <div className="Standings-header">
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
            {standings[0].map(
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

export default Leagues;