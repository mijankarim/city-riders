import React from "react";

const Rider = (props) => {
  const { name, image, fare, seat } = props.rider;
  return (
    <div className="rider d-flex align-items-center">
      <div className="rider-image">
        <img src={image} alt="" width="50" />
      </div>
      <div className="rider-name"><strong>{name}</strong></div>
      <div className="seat"><strong>{seat}</strong></div>
      <div className="fare"><strong>${fare}</strong></div>
    </div>
  );
};

export default Rider;
