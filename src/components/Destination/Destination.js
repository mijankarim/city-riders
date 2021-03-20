import React, {useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Map from "../Map/Map";
import transportsData from "../../data/data.json";
import Rider from "../Rider/Rider";
import SearchForm from "../SearchForm/SearchForm";

const Destination = () => {
  const { idTransport } = useParams();
  const [riders, setRiders] = useState([]);
  const transportData = transportsData.find(
    (t) => t.id === parseInt(idTransport)
  );
  const { allTransports } = transportData;

  const handleSearch = () => {
    setRiders(allTransports);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} md={4}>
          {!riders.length ? (
            <SearchForm handleSearch={handleSearch} />
          ) : (
            <div className="rider-container">
              <div className="destination-header">
                <ul>
                  <li>Muradpur</li>
                  <li>Agrabad</li>
                </ul>
              </div>
              {riders.map((rider) => (
                <Rider key={rider.id} rider={rider} />
              ))}
            </div>
          )}
        </Col>
        <Col xs={12} md={8}>
          <Map />
        </Col>
      </Row>
    </Container>
  );
};

export default Destination;
