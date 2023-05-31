import { Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ExploreBtn({ name, link }) {
  // const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate(link ? link : "");
  // };
  // console.log(link);
  return (
    <Link to={link}>
      <Button className="explore-btn">{name}</Button>
    </Link>
  );
}

export default ExploreBtn;
