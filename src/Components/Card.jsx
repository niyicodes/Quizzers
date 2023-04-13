import React from "react";

const Card = ({ icon, title, handleClick }) => {
 return (
  <div className="card shadow-opacity-75">
   <div className="icon bg-white  rounded-full text-4xl p-2" onClick={handleClick}>{icon}</div>
   <h3 className="text-bold text-2xl text-white text-center">{title}</h3>
  </div>
 );
};

export default Card;
