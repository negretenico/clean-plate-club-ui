import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTable, MDBTableBody } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { useShoppingCart } from '../hooks/shoppingContext';
import type Meal from '../types/MenuItem';
import { Stack } from 'react-bootstrap';
import formatCurrency from '../formatCurrency';
import CartItem from './shared/CartItem';
import { useNavigate } from 'react-router-dom';
function PriceSummary ({
  cartTotal,
  donationAmountOption,
  discount,
  setDiscount,
  trainers
}: { donationAmountOption: number, cartTotal: number | string, trainers: string[], discount: number, setDiscount: React.Dispatch<React.SetStateAction<number>> }): JSX.Element {
  const { cartItems, getItemQuantity } = useShoppingCart();
  const cartMap = new Map(cartItems.map((item) => [item.meal_id, item]));

  const [trainer, setTrainer] = useState<string>('');
  const [hasDiscount, setHasDiscount] = useState<boolean>(false);
  const handleChange = (e: { preventDefault: () => void, target: { value: React.SetStateAction<string | undefined> } }): void => {
    e.preventDefault();
    setTrainer(String(e.target.value));
  };
  const handleSubmit = (): void => {
    if (!trainers.includes(trainer)) {
      return;
    }
    setDiscount(10);
    setHasDiscount(true);
  };
  return (
    <>
      <MDBContainer className="py-5" style={{ maxWidth: '1100px' }}>
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol>
            <MDBCard className="my-4 shadow-3" style={{ backgroundColor: '#eee' }}>
              <MDBCardTitle>
                <span className="fw-bold">Order Recap</span>
              </MDBCardTitle>
              <MDBCardBody>
                {
                  [...cartMap.values()].map((item: Meal) => {
                    return (
                      <>
                        <div className="d-flex justify-content-between mt-2">
                          <span>
                            {item.name}
                            <span className="text-muted" style={{ fontSize: '1rem', marginLeft: '.15rem' }}>x{getItemQuantity(item.meal_id)}
                            </span>
                          </span>
                          <span>{formatCurrency(Number(item.cost) * getItemQuantity(item.meal_id))}</span>
                        </div>
                      </>
                    );
                  })
                }
                <div className="d-flex justify-content-between mt-2">
                  <span>Amount Donated</span> <span >{formatCurrency(Number(donationAmountOption))}</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span>Amount Deductible</span> <span className="text-danger">{formatCurrency(Number(discount))}</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span><MDBInput disabled={hasDiscount} onChange={handleChange} label='Enter Discount Code'></MDBInput></span> <span><MDBBtn disabled={hasDiscount} onClick={handleSubmit} className='primary-button'>Submit</MDBBtn></span>
                </div>
                <hr/>
                <div className="d-flex justify-content-between mt-2">
                  <span>Total</span> <span className="text-success">{formatCurrency(Number(cartTotal) + Number(donationAmountOption) - Number(discount))}</span>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
export default PriceSummary;
