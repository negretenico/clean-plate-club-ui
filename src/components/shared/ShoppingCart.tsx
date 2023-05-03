import { Offcanvas, Stack } from 'react-bootstrap';
import React from 'react';
import CartItem from './CartItem';
import { useShoppingCart } from '../../hooks/shoppingContext';
import formatCurrency from '../../formatCurrency';
import type Meal from '../../types/MenuItem';
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { type NavigateFunction } from 'react-router-dom';

interface ShoppingCartProps {
  isOpen: boolean
  navigate: NavigateFunction
}

function ShoppingCart ({ isOpen, navigate }: ShoppingCartProps): JSX.Element {
  const { closeCart, cartItems, getItemQuantity } = useShoppingCart();
  const cartMap = new Map(cartItems.map((item) => [item.meal_id, item]));
  const cartTotal: number = [...cartMap.values()].reduce((total: number, cartItem: Meal) => {
    return total + cartItem.cost * getItemQuantity(cartItem.meal_id);
  }, 0);
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {[...cartMap.values()].map(item => (
            <CartItem key={item.meal_id} meal={item} quantity={getItemQuantity(item.meal_id)} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{' '}
            {formatCurrency(cartTotal)}
          </div>
        </Stack>
      </Offcanvas.Body>
      <hr/>

      <MDBContainer>
        <MDBRow>
          <MDBCol style={{ textAlign: 'center' }} >
            <h4>Select a delivery method</h4>
            <MDBBtn style={{ marginRight: '5px' }} onClick = {() => { navigate('/delivery'); closeCart(); }} className='primary-button' >Delivery</MDBBtn>
            <MDBBtn style={{ marginLeft: '5px' }} onClick= {() => { navigate('/checkout', { state: { address: 'Foo Address, NOrwalk OHIO 44857', cartItems } }); closeCart(); }} className='primary-button' >Pick up</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Offcanvas>
  );
}
export default ShoppingCart;
