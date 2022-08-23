import React from "react";
import "./Standings.css";

const Cup = (props) => {
  const rounds = props.data.cupData;
  const compData = JSON.parse(props.compData);
  console.log("Cup");
  console.log(rounds);
  console.log(compData);

  return (
    <div>
      <div className="Cup">

        <h1>Cup Rounds</h1>

        <div className="Standings-header">
          <div className="Standings-header-flag image-header">
            <img src={compData.flag} alt=""/>
          </div>
          <span className="header">
            {compData.country} - {compData.name}
          </span>
          <div className="Standings-header-logo image-header">
            <img src={compData.logo} alt=""/>
          </div>
        </div>
        <div className="season">
          {compData.season}/{+compData.season+1}
        </div>

        <ul>
          {rounds.map(round => (
            <li key={round}>{round}</li>
          ))}
        </ul>

      </div>

    </div>
  )
}

export default Cup;