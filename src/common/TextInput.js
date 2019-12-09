import React from "react";

export default function TextInput(props) {
  return (
    <input
      type="text"
      className={`col-md-12 ${props.className}`}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      maxLength="50"
    />
  );
}
