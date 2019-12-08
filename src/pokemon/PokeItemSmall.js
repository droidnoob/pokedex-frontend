import React from "react";

export default function PokeItemSmall(props) {
  return (
    <div className="row pokeitem">
      <div className="col-md-12">
        <div className="col-md-offset-1 col-md-11">
          <div className="row">
            <div className="col-md-3">
              <img
                src={props.pokemon.ThumbnailImage}
                alt={props.pokemon.ThumbnailAltText}
                width={75}
                className="poke-img-small"
              />
            </div>
            <div className="col-md-9">
              <div className="row poke-name">{props.pokemon.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
