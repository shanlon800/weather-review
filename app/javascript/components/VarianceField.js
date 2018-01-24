import React from 'react';

const VarianceField = (props) => {
  return (
    <label>{props.label}
      <textarea
        name={props.name}
        onChange={props.handleVarianceChange}
        value={props.content}
        type='text'
      />
    </label>
  )
}

export default VarianceField;
