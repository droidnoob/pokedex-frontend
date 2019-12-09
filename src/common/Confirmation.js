import React from "react";

export default function Confirmation(props) {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <strong>{`Are you sure you want to delete '${props.name}'?`}</strong>
          <p>
            {`All pokemons(${props.count}) in this category will be deleted as well.`}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button className="pill danger right" onClick={props.onClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
