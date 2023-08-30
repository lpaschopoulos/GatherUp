import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate, } from 'react-router-dom';
import { UserContext } from "../../Context/context";
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/Logo2-removebg.png';
import './NavBar.css';

function NavBar() {
  var navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogin = () => {
    navigate ("/login");
  };

  const handleAccountClick = () => {
    if (user) {
      navigate('/profile'); // Navigate to /profile if user is logged in
    } else {
      handleLogin(); // Otherwise, navigate to /login
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-bg">
      <Container>
        <Navbar.Brand href="/" className="gatherup-link">
        <img src={logoImage} alt="Logo" className="logo-image" /> 
          GatherUp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/allevents">Events</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <NavDropdown title="Its Happening" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/today">Today</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tomorrow">Tomorrow</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/next-month">Next Month</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/online-events">Online Events</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/near-you">Near You</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            {/* Conditionally render the Account button */}
            {user ? (
              <Button variant="outline-primary" className="account" onClick={handleAccountClick}>
                {user.username}
              </Button>
            ) : (
              <Button variant="outline-primary" className="account" onClick={handleAccountClick}>
                Account
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;