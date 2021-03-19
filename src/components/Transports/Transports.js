import React, { useEffect, useState } from "react";
import transportData from "../../data/data.json";
import Transport from "../Transport/Transport";
import { Container, Row } from "react-bootstrap";

const Transports = () => {
  const [transports, setTransports] = useState([]);
  useEffect(() => {
    setTransports(transportData);
  }, []);
  return (
    <Container>
      <Row>
        {transports.map((transport) => (
          <Transport key={transport.id} transport={transport} />
        ))}
      </Row>
    </Container>
  );
};

export default Transports;
