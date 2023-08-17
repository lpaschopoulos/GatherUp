import React, { useState, useContext, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi'; // Import the search icon
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, } from 'react-router-dom';
import axios from "axios";
import { UserContext } from "../../Context/context";
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/Logo2-removebg.png';
import './NavBar.css';

function NavBar() {
  var navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3636/events/")  // Replace with your actual API endpoint
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);

  
  const handleSearchClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };
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
            <Nav.Link href="#pricing">Tickets</Nav.Link>
            <NavDropdown title="Its Happening" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/today">Today</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tomorrow">Tomorrow</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/upcoming-events">Upcoming Events</NavDropdown.Item>
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
              classname="search-icon"
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