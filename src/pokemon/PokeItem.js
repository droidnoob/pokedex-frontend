import React, { Component } from "react";
import Checkbox from "../common/CheckBox";

export class PokeItem extends Component {
  handleCheckboxChange = event => {
    if (event.target.checked) {
      this.props.onPokemonSelect("add", event.target.id);
    } else {
      this.props.onPokemonSelect("remove", event.target.id);
    }
  };
  render() {
    return (
      <div className="row pokeitem">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-1 checkbox">
              <Checkbox
                checked={this.props.checked}
                id={this.props.pokemon.id}
                onChange={this.handleCheckboxChange}
              />
            </div>
            <div className="col-md-11">
              <div className="row">
                <div className="col-md-3 poke-image d-flex justify-content-center">
                  <img
                    className="img-responsive"
                    width={150}
                    src={this.props.pokemon.ThumbnailImage}
                    alt={this.props.pokemon.ThumbnailAltText}
                  />
                </div>
                <div className="col-md-9">
                  <div className="row poke-name">
                    <div className="col-md-12">{this.props.pokemon.name}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {this.props.pokemon.type.map(t => (
                        <span key={t} className="pill type">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="row details">
                    <div className="col-md-6">
                      <h6>Abilities: </h6>
                      {this.props.pokemon.abilities.join(", ")}
                    </div>
                    <div className="col-md-6">
                      <h6>Weakness:</h6>
                      {this.props.pokemon.weakness.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokeItem;
