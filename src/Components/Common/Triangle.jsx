import React from 'react';

const Triangle = ({ total = 11 }) => {
  return (
    <div className="d-flex position-absolute triangle-row">
      {new Array(total).fill('').map((item, index) => (
        <div key={index} className="triangle-down"></div>
      ))}
    </div>
  );
};

export default Triangle;
