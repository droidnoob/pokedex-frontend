import React from "react";

export default function TextInput(props) {
  return (
    <input
      type="text"
      className={props.className}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      maxLength="50"
    />
  );
}
