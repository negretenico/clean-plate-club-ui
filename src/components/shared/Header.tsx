import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { useLoginContext } from '../../hooks/loginContext';
import { Button, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useShoppingCart } from '../../hooks/shoppingContext';
import { MDBIcon } from 'mdb-react-ui-kit';
import { BLUE } from '../../colors';
function Header (): JSX.Element {
  const { isLoggedIn, user, handleLogout } = useLoginContext();
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <Navbar expand="sm" style={{ backgroundColor: BLUE }} variant='dark'>
      <LinkContainer to="/">
        <Navbar.Brand>             <img
          alt="logo"
          src={'logo.png'}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="who">
            <Nav.Link>Who are we?</Nav.Link>
          </LinkContainer>
          <LinkContainer to="menu">
            <Nav.Link>Menu</Nav.Link>
          </LinkContainer>
          <LinkContainer to="faq">
            <Nav.Link>FAQ</Nav.Link>
          </LinkContainer>
        </Nav>

      </Navbar.Collapse>
      <Nav>
        {
          (isLoggedIn)
            ? <LinkContainer to="profile" state={{ user }} >
              <Nav.Link>
                  Welcome, {user.name} <MDBIcon color='white' fas icon="user-alt" />
              </Nav.Link>
            </LinkContainer>
            : <LinkContainer to="login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
        }
      </Nav>
      {cartQuantity > 0 && isLoggedIn && (
        <Button
          onClick={openCart}
          style={{ width: '3rem', height: '3rem', position: 'relative' }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <MDBIcon className='ms-1' icon="shopping-cart" size="2x" style={{
            transform: 'translate(-30%,0%)'
          }}/>
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: 'white',
              width: '1.5rem',
              height: '1.5rem',
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: 'translate(25%, 25%)'
            }}
          >
            {cartQuantity}
          </div>
        </Button>
      )}
    </Navbar>
  );
}
export default Header;
