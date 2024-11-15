import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { type StripeElement, loadStripe } from "@stripe/stripe-js";
import { MDBBtn, MDBContainer, MDBRow, MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import PaymentForm from "./PaymentForm";
import axios from "axios";
import { Col } from "react-bootstrap";
import type User from "../types/User";
import { useShoppingCart } from "../hooks/shoppingContext";
function CreditCardComponent({
  discount,
  donationAmount,
  cartTotal,
  setIndex,
  setElements,
  user,
  address,
}: {
  donationAmount: number;
  discount: number;
  cartTotal: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setElements: React.Dispatch<React.SetStateAction<unknown | null>>;
  user: User;
  address: string;
}): JSX.Element {
  const { cartItems, getItemQuantity } = useShoppingCart();
  const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const stripeTestPromise = loadStripe(PUBLIC_KEY);
  const [clientSecret, setClientSecret] = useState<string>("");
  useEffect(() => {
    axios
      .post("http://localhost:5000/payment/create-payment-intent", {
        amount: cartTotal + donationAmount - discount,
        email: user.email,
        name: user.name,
        cart: cartItems,
        donation_amount: donationAmount,
        address,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <>
      {stripeTestPromise !== null && clientSecret.length > 0 ? (
        <Elements stripe={stripeTestPromise} options={{ clientSecret }}>
          <PaymentForm
            cartTotal={cartTotal}
            setElements={setElements}
            setIndex={setIndex}
          />
        </Elements>
      ) : (
        <MDBSpinner />
      )}
    </>
  );
}
export default CreditCardComponent;
