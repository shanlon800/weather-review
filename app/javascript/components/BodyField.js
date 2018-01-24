import React from 'react';

const BodyField = (props) => {
  return (
    <label>{props.label}
      <textarea
        name={props.name}
        onChange={props.handleBodyChange}
        value={props.content}
        type='text'
      />
    </label>
  )
}

export default BodyField;
