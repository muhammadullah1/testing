import React from "react";

const ListWithDots = ({ items }) => {
  return (
    <div className="d-flex">
     <ul className="list-unstyled m-3 text-muted fw-lighter">
  {items && items.map((item, index) => (
    <li className={`list-item ms-3 my-1`} key={index}>
      {item.icon ? <img src={item.icon} alt="icons" className="img-fluid me-1 my-1" width={20}/>  : <span className="me-4 text-warning fw-bolder">&#8226;</span>}
      <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#">
        {item.link}
      </a>
    </li>
  ))}
</ul>
    </div>
  );
};

export default ListWithDots;
