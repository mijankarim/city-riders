import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Map from "../Map/Map";
import transportsData from "../../data/data.json";
import Rider from "../Rider/Rider";

const Destination = () => {
  const { idTransport } = useParams();
  const [showRiders, setShowRiders] = useState(false);
  const [riders, setRiders] = useState([]);
  const [pickFrom, setPickFrom] = useState("");
  const [pickTo, setPickTo] = useState("");
  const [date, setDate] = useState("");
  const transportData = transportsData.find(
    (t) => t.id === parseInt(idTransport)
  );
  const { allTransports } = transportData;

  useEffect(() => {
    setRiders(allTransports);
  }, [allTransports]);

  const handleSearch = (e) => {
    setShowRiders(true);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} md={4}>
          {!showRiders ? (
            <Form onSubmit={handleSearch} className="search-form-container">
              <Form.Group controlId="formBasicPickFrom">
                <Form.Label>Pick From</Form.Label>
                <Form.Control
                  type="text"
                  name="pickFrom"
                  onChange={(e) => setPickFrom(e.target.value)}
                  placeholder="Muradpur"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPickTo">
                <Form.Label>Pick To</Form.Label>
                <Form.Control
                  type="text"
                  name="pickTo"
                  onChange={(e) => setPickTo(e.target.value)}
                  placeholder="Agrabad"
                  required
                />
              </Form.Group>

              <Form.Group controlId="date">
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Date"
                  required
                />
              </Form.Group>

              <Button className="city-btn full-width-btn" type="submit">
                Search
              </Button>
            </Form>
          ) : (
            <div className="rider-container">
              <div className="destination-header">
                <p className="text-light">Date: {date}</p>
                <div className="timeline text-light">
                  <div>
                    <strong>{pickFrom}</strong>
                  </div>
                  <div>To</div>
                  <div>
                    <strong>{pickTo}</strong>
                  </div>
                </div>
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
