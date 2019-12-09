import React from "react";

export default function ActionButtons(props) {
  return (
    <div className="row">
      <div className="col-md-12 button-group">
        <button
          className="pill primary"
          disabled={!props.disabled}
          onClick={props.onSave}
        >
          Save Changes
        </button>
        <button
          className="pill secondary"
          disabled={!props.disabled}
          onClick={props.onReorder}
        >
          Undo Reorder
        </button>
        <button className="pill danger" onClick={props.onDelete}>
          Delete Category
        </button>
      </div>
    </div>
  );
}
