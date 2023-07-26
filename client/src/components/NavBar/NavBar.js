import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi'; // Import the search icon
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

import './NavBar.css';

function NavBar() {
  var navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const handleSearchClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };
  const handleAccount = () => {
    navigate ("/account");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-bg">
      <Container>
        <Navbar.Brand href="/" className="gatherup-link">
          GatherUp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Events</Nav.Link>
            <Nav.Link href="#pricing">Tickets</Nav.Link>
            <NavDropdown title="Its Happening" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Today</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Tommorow</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Upcoming Events</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Near You</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className={`d-flex ${isSearchExpanded ? 'expanded' : ''}`}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ display: isSearchExpanded ? 'block' : 'none' }}
            />
            <Button
              variant="outline-success"
              onClick={handleSearchClick}
              style={{ display: isSearchExpanded ? 'none' : 'flex' }}
            >
              <BiSearch size={20} />
            </Button>
            {isSearchExpanded && (
              <Button variant="outline-success" className="search-button" onClick={handleSearchClick}>
                Search
              </Button>
            )}
          </Form>
          <Nav className="ml-auto">
            <Button variant="outline-primary" className="account" onClick={handleAccount}>
              Account
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
