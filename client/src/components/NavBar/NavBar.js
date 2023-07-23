import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './NavBar.css';
function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">GatherUp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Events</Nav.Link>
            <Nav.Link href="#pricing">Tickets</Nav.Link>
            <NavDropdown title="Its Happening" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Today</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Tommorow
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Upcoming Events</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Near You
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav className="ms-auto">
          <Button variant="outline-primary" className="login" >LogIn</Button>
          <Button variant="outline-primary" className="signup">SignUp</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;