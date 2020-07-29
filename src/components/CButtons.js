import React from "react";

const CButton = (props) => {
  return (
    <button
      className={props.classValue ? props.classValue : ""}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default CButton;
