/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { type StripeElement } from '@stripe/stripe-js';
import { validateHeaderValue } from 'http';
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useShoppingCart } from '../hooks/shoppingContext';
import { setPriority } from 'os';

function PaymentForm ({ setIndex, setElements }:
{ cartTotal: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
  setElements: React.Dispatch<React.SetStateAction<unknown | null>>
}): JSX.Element {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const { emptyCart } = useShoppingCart();
  const handleSubmit = async (): Promise<void> => {
    if ((stripe == null) || (elements == null)) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log(submitError);
      return;
    }
    setIsProcessing(true);
    stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/order-confirmation`
      }
    }).then((valu) => {
      emptyCart();
    }).catch((error) => {
      setMessage(error);
    }).finally(() => {
      setIsProcessing(false);
    });
  };

  return (
    <MDBContainer id="payment-form">
      <PaymentElement />
      <br/>
      { // eslint-disable-next-line @typescript-eslint/no-misused-promises
      }      <MDBBtn onClick={handleSubmit} disabled={isProcessing || (stripe == null) || (elements == null) } className='primary-button'> {isProcessing ? 'Processing...' : 'Place your order'} </MDBBtn>

    </MDBContainer>
  );
}
export default PaymentForm;
