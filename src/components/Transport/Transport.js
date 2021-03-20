import React from "react";
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";

const Transport = (props) => {
  const { id, name, image } = props.transport;
  const history = useHistory();
  const handleClick = () => history.push(`destination/${id}`);
  return (
    <Col xs={12} md={3} onClick={handleClick}>
      <div className="transport-card shadow-sm px-5 pt-4 pb-3 my-5 bg-white rounded">
        <img src={image} alt={name} />
        <h4 className="text-center mt-4">{name}</h4>
      </div>
    </Col>
  );
};

export default Transport;
