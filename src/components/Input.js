import React from "react";

const FormInput = (props) => {
  return (
    <form>
      <p className="history">{" " + props.fullHistory}</p>
      <input
        type="text"
        value={props.value}
        onChange={() => props.onChange()}
      />
    </form>
  );
};

export default FormInput;
