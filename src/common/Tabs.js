import React from "react";

export default function Tabs(props) {
  return (
    <div className="tab">
      {props.tabs.map(tab => {
        let className =
          "tablinks " + (tab.name === props.currentTab ? "active" : "");
        return (
          <button
            key={tab.name}
            className={className}
            onClick={() => props.onClick(tab.name)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}
