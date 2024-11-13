/* eslint-disable indent */
import { MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
type paymentMethod = 'card' | 'cashapp';
function PaymentMethod ({ payment }: { payment: any | { payment_method: { type: paymentMethod } } }): JSX.Element {
  switch (payment.payment_method.type) {
    case 'card':
      return <div >
        <p style={{ fontSize: '1.1rem' }}>
        Card Ending in {payment.payment_method.card.last4}
        <MDBIcon color='success' far icon="credit-card" />

        </p>
      </div>;
    case 'cashapp':
      return <div>Cashapp</div>;
    default:
      return <div>Card</div>;
  }
}
export default PaymentMethod;
