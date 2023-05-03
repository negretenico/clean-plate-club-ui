import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type Meal from '../../types/MenuItem';
import './Checkout.css';
import { Button, Stack } from 'react-bootstrap';
import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { PINK } from '../../colors';
import CartItem from '../../components/shared/CartItem';
import formatCurrency from '../../formatCurrency';
import { useShoppingCart } from '../../hooks/shoppingContext';
function Checkout (): JSX.Element {
  const location: { state: { cartItems: Meal[], address: string } } = useLocation();
  const { cartItems } = useShoppingCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };
  const textForNumberOfItems = (): string => {
    return `${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`;
  };
  const { getItemQuantity } = useShoppingCart();
  const cartMap = new Map(cartItems.map((item) => [item.meal_id, item]));
  const cartTotal: number = [...cartMap.values()].reduce((total: number, cartItem: Meal) => {
    return total + cartItem.cost * getItemQuantity(cartItem.meal_id);
  }, 0);
  const discount = -5;
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className='text-center'>
        <div className="pop-over-container">
        Checkout {'('}
          <span className="a-color-link clickable-headingpop-over-trigger" onClick={handleToggle}>
            { textForNumberOfItems()}
          </span>
          {')'}
          {isOpen && (
            <div className="pop-over-content">
              <div className="pop-over-arrow"></div>
              <MDBBtn style={{ color: 'black', background: ' #e6e6e6', border: 'none' }} onClick={() => { navigate('/menu'); }}>Continue shopping?</MDBBtn>
              <MDBBtn className='primary-button' onClick={handleToggle}>Stay in checkout</MDBBtn>
            </div>
          )}
        </div>

      </h1>
      <MDBContainer>
        <MDBRow>
          <MDBCol md='8'>
            <MDBRow>
              <MDBCol md='1'>
                <h3 className='checkout-header'>1</h3>
              </MDBCol>
              <MDBCol md='1'>
                <h3 className='checkout-header'>Shipping address</h3>
              </MDBCol>
              <MDBCol md='2'>
                {location.state.address} addres
              </MDBCol>
            </MDBRow>
            <hr/>
            <MDBRow>
              <MDBCol md='1'>
                <h3 className='checkout-header'>2</h3>
              </MDBCol>
              <MDBCol md='1'>
                <h3 className='checkout-header'>Payment method</h3>
              </MDBCol>
            </MDBRow>
            <hr/>
            <MDBRow>
              <MDBCol md='1'>
                <h3 className='checkout-header'>3</h3>
              </MDBCol>
              <MDBCol >
                <MDBRow style={{ textAlign: 'left' }}>
                  <h3 className='checkout-header'>Review Items</h3>
                </MDBRow>
                <MDBRow >
                  <MDBCol md='2'>
                    <Stack className="col-md-5 mx-auto" gap={3}>
                      {[...cartMap.values()].map(item => (
                        <CartItem key={item.meal_id} meal={item} quantity={getItemQuantity(item.meal_id)} />
                      ))}
                      <div className="ms-auto fw-bold fs-5">
            Total{' '}
                        {formatCurrency(cartTotal)}
                      </div>
                    </Stack>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md='4'>
            <div className ='box'>
              <div className="box-inner">
                <MDBBtn className='primary-button'> Place your order </MDBBtn>
                <hr/>
                <h3 style={{ textAlign: 'left' }} className='checkout-header'>Order summary</h3>
                <MDBTable borderless>
                  <MDBTableBody>
                    <tr>
                      <td >Items:</td>
                      <td >{formatCurrency(cartTotal)}</td>
                    </tr>
                    <tr style={{ borderBottom: '1.5px solid' }}>
                      <td className='text-left'>Discount:</td>
                      <td >{formatCurrency(discount)}</td>
                    </tr>
                    <tr >
                      <td className='text-left' >
                        <h3 style={{ color: '#B12704' }} className='checkout-header'>
                        Order Total
                        </h3>
                      </td>
                      <td >
                        <h3 style={{ color: '#B12704' }} className='checkout-header'>
                          {formatCurrency(cartTotal - discount)}
                        </h3></td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          </MDBCol>
        </MDBRow>

      </MDBContainer>

    </div>
  );
}
export default Checkout;
