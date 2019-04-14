import React from 'react';

const controlledInput = (props) => {
  return (
    <label>
      {props.labelText}
      <input type="text" value={props.value} name={props.inputName} onChange={(e) => props.handler(e)}/>
    </label>
  );
}

export default controlledInput; 