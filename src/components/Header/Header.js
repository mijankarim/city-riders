import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { UserContext } from "../../App";


const Header = () => {
  const [loggedInUser] = useContext(UserContext);
  console.log(loggedInUser)
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Navbar.Brand>City Riders</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto d-flex justify-content-center">
                  <Link to="/">Home</Link>
                  <Link to="/destination">Destination</Link>
                  <Link to="/blog">Blog</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/login">{loggedInUser.email ? `${loggedInUser.email}`: "Login"}</Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
