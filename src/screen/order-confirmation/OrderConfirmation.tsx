import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../../hooks/shoppingContext";
import { clear } from "console";
import { useLoginContext } from "../../hooks/loginContext";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Stack } from "react-bootstrap";
import axios from "axios";
import type Order from "../../types/Order";
import type Meal from "../../types/MenuItem";
import { useLocation } from "react-router-dom";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSummary from "../../components/OrderSummary";
import useLocalStorage from "../../hooks/useLocalStorage";
function OrderConfirmation(): JSX.Element {
  const location = useLocation();
  const [order, setOrder] = useState<Order>();
  const { user } = useLoginContext();
  const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const stripeTestPromise = loadStripe(PUBLIC_KEY);
  const match = location.search.match(/payment_intent_client_secret=([^&]+)/);
  const clientSecret: string = match != null ? match[1] : "";
  return (
    <>
      {
        <Elements stripe={stripeTestPromise}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="2">
                <img
                  src="/logo.png"
                  style={{
                    height: "40rem",
                    width: "40rem",
                    transform: "translateX(-50%)",
                  }}
                />
              </MDBCol>
              <MDBCol md="10">
                <MDBRow>
                  <h1>Thank you for your order</h1>
                  <p style={{ fontSize: "1.4rem" }}>
                    Hello, {user.name ?? "User Name"}
                  </p>
                  <p style={{ fontSize: "1rem" }}>
                    We have sent you a confimration email, and your order will
                    be ready in the next few days!
                  </p>
                </MDBRow>
                <hr />
                <OrderSummary
                  order={order}
                  setOrder={setOrder}
                  clientSecret={clientSecret}
                  user={user}
                />
                <hr />
                <MDBRow>
                  <MDBCol style={{ textAlign: "center" }}>
                    <h3>Since you are here</h3>
                    <MDBRow>
                      <p>
                        Checkout our socials
                        <MDBIcon
                          onClick={() =>
                            window.open(
                              "https://www.facebook.com/cleanthatplate/"
                            )
                          }
                          style={{ padding: "1rem", cursor: "pointer" }}
                          fab
                          icon="facebook"
                          size="lg"
                        />
                        <MDBIcon
                          onClick={() =>
                            window.open("mailto:cleanplateclub@gmail.com")
                          }
                          style={{ padding: "1rem", cursor: "pointer" }}
                          fab
                          icon="google"
                          size="lg"
                        />
                        <MDBIcon
                          onClick={() =>
                            window.open(
                              "https://www.instagram.com/cleanthatplate/"
                            )
                          }
                          style={{ padding: "1rem", cursor: "pointer" }}
                          fab
                          icon="instagram"
                          size="lg"
                        />
                      </p>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Elements>
      }
    </>
  );
}

export default OrderConfirmation;
