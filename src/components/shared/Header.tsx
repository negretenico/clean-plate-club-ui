import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../logo.png"
function Header(){
    return(
        <>
    <Navbar bg="dark"  expand="sm"variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            /></Navbar.Brand>
          <Nav className="me-auto">
            <NavLink href="/">Home</NavLink>
            <NavLink href="who">Who are we?</NavLink>
            <NavLink href="menu">Menu</NavLink>
            <NavLink href="faq">FAQ</NavLink>
            <NavLink href="recommendation">Recommendation</NavLink>
          </Nav>
      </Container>
    </Navbar>
        </>
    )
}
export default Header;