import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { UserContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [loggedInUser] = useContext(UserContext);
  const { name,  email } = loggedInUser;
  return (
    <div>
      <Container className="mb-5 py-4">
        <Row>
          <Col>
            <Navbar collapseOnSelect expand="lg" variant="dark">
              <Navbar.Brand>
                <Link to="/">City Riders</Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto d-flex justify-content-center">
                  <Link to="/">Home</Link>
                  <Link to="/destination/1">Destination</Link>
                  <Link to="/blog">Blog</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/login" className="city-btn border-radius-2">
                    {loggedInUser.email ? (
                      <>
                        <FontAwesomeIcon icon={faUser} /> {name || email}
                      </>
                    ) : (
                      " Login"
                    )}
                  </Link>
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
