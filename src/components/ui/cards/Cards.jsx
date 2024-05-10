import React from "react";
import { API_ENDPOINT } from "../../../../config";
import "./Cards.scss";

function Cards(props) {
  return (
    <button className="custom-card" onClick={props.onClick}>
      <div className="image">
        <img
          className="card-img"
          src={`${props.img}`}
          alt={`alt-${props.name}`}
        />
      </div>
      <div className="details">
        <h1>{props.department} </h1>
      </div>
    </button>
  );
}

export default Cards;
