import React from 'react';

const ComfortField = (props) => {
  return (
    <label>{props.label}
      <textarea
        name={props.name}
        onChange={props.handleComfortChange}
        value={props.content}
        type='text'
      />
    </label>
  )
}

export default ComfortField;
