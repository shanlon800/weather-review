import React from 'react';


const ShowRating = props => {
  let faIconType;
  let type = props.type;
  let value = props.value

  if (type == 'comfort') {
    faIconType = 'star';
  } else if (type == 'variance') {
    faIconType = 'square';
  }

  let iconEmpty = `fa fa-${faIconType}-o`;
  let iconFull = `fa fa-${faIconType}`;
  let classArray = [];

  for (var i = 0; i < value; i++) {
    classArray[i] = iconFull + ` r${type[0]}-${i+1}`;
  }
  for (var i = 0; i < 5-value; i++) {
    classArray.push(iconEmpty);
  }

  let iconArray = classArray.map((icon, index) =>
    <i className={icon} key={index}></i>
  );

  return(
    <span>{iconArray}</span>
  )
}

export default ShowRating;
