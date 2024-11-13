import { MDBCol, MDBIcon, MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import type Order from '../types/Order';
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import PaymentMethod from './PaymentMethod';
import { useLoginContext } from '../hooks/loginContext';
import { useShoppingCart } from '../hooks/shoppingContext';
import type Meal from '../types/MenuItem';
import type User from '../types/User';
function OrderSummary ({ order, clientSecret, user, setOrder }:
{ user: User
  order: Order | undefined
  clientSecret: string
  setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>
}): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const stripe = useStripe();
  const { emptyCart, cartItems, getItemQuantity } = useShoppingCart();
  const cartMap = new Map(cartItems.map((item) => [item.meal_id, item]));
  const cartTotal: number = [...cartMap.values()].reduce((total: number, cartItem: Meal) => {
    return total + cartItem.cost * getItemQuantity(cartItem.meal_id);
  }, 0);
  const [paymentMethod, setPaymentMethod] = useState<any>();
  useEffect(() => {
    if (paymentMethod === undefined) {
      stripe?.retrievePaymentIntent(clientSecret).then((stripeRes) => {
        axios.get('http://localhost:5000/payment/' + String(stripeRes.paymentIntent?.id))
          .then(res => {
            setPaymentMethod(res.data);
            if (user.id.length > 0) {
              const intent: any = res.data;
              console.log(intent);

              axios.post('http://localhost:5000/api/orders/', {
                user_id: user.id,
                payment_id: String(intent?.id),
                address: intent?.metadata?.address,
                price: cartTotal,
                donation_amount: intent?.metadata?.donationAmount,
                date: new Date().toDateString()
              }).then((res) => {
                console.log(res);
                setOrder(res.data);
                setIsLoading(false);
                emptyCart();
              }).catch((err) => {
                console.log(err);
              });
            }
          }).catch(error => {
            console.log(error);
          });
      }).catch(error => {
        console.log(error);
      });
    }
  }, [stripe, user.id]);
  return (<>
    {paymentMethod === undefined || isLoading
      ? <MDBSpinner/>
      : <MDBRow>
        <MDBCol>
          <h5>Order Date</h5>
          <p style={{ fontSize: '1.1rem' }}>{new Date().toDateString()}</p>
        </MDBCol>
        <MDBCol>
          <h5>
                Order No
          </h5>
          <p style={{ fontSize: '1.1rem' }}>
            {order?.id}
          </p>
        </MDBCol>
        <MDBCol>
          <h5>
            Payment
          </h5>
          <PaymentMethod payment={paymentMethod} />
        </MDBCol>
        <MDBCol>
          <h5>
            Shipping to <MDBIcon color='success' fas icon="map-marker-alt" />
          </h5>
          <p style={{ fontSize: '1rem' }}>
            {paymentMethod?.metadata?.address}
          </p>
        </MDBCol>
      </MDBRow>}
  </>);
}
export default React.memo(OrderSummary);
