import React from "react";

const Error = (props) => {
  return (
    <div className="error-block">
      Error
      <button onClick={() => props.history.push('/')}>GO TO MAIN PAGE</button>
    </div>
  );
};

export default Error;