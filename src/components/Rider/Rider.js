import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Rider = (props) => {
  const { name, image, fare, seat } = props.rider;
  return (
    <div className="rider d-flex align-items-center">
      <div className="rider-image">
        <img src={image} alt="" width="50" />
      </div>
      <div className="rider-name"><strong>{name}</strong></div>
      <div className="seat"><FontAwesomeIcon icon={faUserFriends}/>  <strong>{seat}</strong></div>
      <div className="fare"><strong>${fare}</strong></div>
    </div>
  );
};

export default Rider;
