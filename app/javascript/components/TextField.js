import React from 'react';

const TextField = (props) => {
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

export default TextField;
