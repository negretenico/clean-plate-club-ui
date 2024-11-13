import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type Meal from '../../types/MenuItem';
import './Checkout.css';
import { Button, Form, Stack } from 'react-bootstrap';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBSpinner, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { PINK } from '../../colors';
import CartItem from '../../components/shared/CartItem';
import formatCurrency from '../../formatCurrency';
import { useShoppingCart } from '../../hooks/shoppingContext';
import CreditCardComponent from '../../components/CreditCardComponent';
import CheckoutHeader from '../../components/CheckoutHeader';
import PriceSummary from '../../components/PriceSummary';
import { useLoginContext } from '../../hooks/loginContext';
import PriceChangeComponent from '../../components/PriceChangeComponent';
import axios from 'axios';
function Checkout (): JSX.Element {
  const pickupAddresses = ['3400 Kohr Blvd, Columbus, OH 43224', '3825 Hard Rd, Dublin, OH 43016'];
  const [donationAmountOption, setDonationAmount] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [address, setAddress] = useState <string>('3400 Kohr Blvd, Columbus, OH 43224');
  const { user } = useLoginContext();
  const navigate = useNavigate();
  const { cartItems, getItemQuantity } = useShoppingCart();
  const cartMap = new Map(cartItems.map((item) => [item.meal_id, item]));
  const cartTotal: number = [...cartMap.values()].reduce((total: number, cartItem: Meal) => {
    return total + cartItem.cost * getItemQuantity(cartItem.meal_id);
  }, 0);
  const [elements, setElements] = useState<unknown | null >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };
  const textForNumberOfItems = (): string => {
    return `${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`;
  };
  const [trainers, setTrainers] = useState<string[]>([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/trainers').then((res) => {
      setTrainers(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  const [discount, setDiscount] = useState<number>(0);
  return (
    <div style={{ textAlign: 'center' }}>
      <MDBContainer>
        <CheckoutHeader navigate={navigate} isOpen={isOpen} handleToggle={handleToggle} textForNumberOfItems={textForNumberOfItems} />
        <MDBRow>
          <MDBCol>
            <MDBContainer className="py-5" style={{ maxWidth: '1100px' }}>
              <MDBRow className="justify-content-center align-items-center">
                <MDBCard style={{ margin: '1rem' }}>
                  <MDBCardBody>
                    <Stack direction="horizontal" gap={3} >
                      <label>Checkout</label>
                      <select className="form-select" onChange={(e) => { setAddress(String(e.target?.value)); }}>
                        {pickupAddresses.map(address => {
                          return (
                            <option key ={address}>
                              {address}
                            </option>
                          );
                        })}
                      </select>
                    </Stack>
                  </MDBCardBody>
                </MDBCard>
                <PriceChangeComponent setDonationAmount={setDonationAmount} />
              </MDBRow>
            </MDBContainer>
          </MDBCol>
          <MDBCol>
            {user.email.length === 0 ? <MDBSpinner/> : <CreditCardComponent address={address} user={user} discount={discount} donationAmount={donationAmountOption} cartTotal={cartTotal} setElements={setElements} setIndex={setIndex}/>
            }
            <PriceSummary donationAmountOption={donationAmountOption} cartTotal={cartTotal} trainers={trainers} setDiscount={setDiscount} discount={discount} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
export default Checkout;
