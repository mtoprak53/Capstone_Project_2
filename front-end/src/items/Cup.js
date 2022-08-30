import React from "react";
import { Link } from "react-router-dom";
import "./Standings.css";

const Cup = (props) => {
  const rounds = props.data.cupData;
  const compData = JSON.parse(props.compData);
  console.log("Cup");
  console.log(rounds);
  console.log(compData);

  return (
    <div>
      <div className="Cup m-5">

        <h1 className="header text-center">Cup Rounds</h1>

        <div className="Cup-container mx-5">
          <div className="Cup-header-container container">

            <div className="Cup-info-container row">
              <div className="Cup-cup col row d-flex align-items-center">
                <div className="col-4"><img src={compData.logo} alt="" /></div>
                <div className="image-header d-flex align-items-center col">
                  <h2>{compData.name}</h2>
                </div>
              </div>

              <div className="Team-country col row d-flex align-items-center">
                <div className="image-header d-flex align-items-center justify-content-end col">
                  <h2 className="">{compData.country}</h2>
                </div>
                <div className="col-4"><img className="rounded-pill" src={compData.flag} alt=""/></div>
              </div>
            </div>

          </div>
        </div>

        {/* <div className="Standings-header">
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
        </div> */}

        <div className="Cup-rounds text-center">
          <ul>
            {rounds.map(round => (
              <li key={round}>
                <Link 
                  to={{
                    pathname: "/cup-round",
                    state: {
                      round: round, 
                      compData: JSON.stringify(compData)
                    }
                  }}
                ><h5>{round}</h5></Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  )
}

export default Cup;