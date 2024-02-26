import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51NnxmpF7wzBBsskCBp1iRYIWXUZoRNSGXmfmKAmuUIeAUrAu02waNGhoxm8wMhJVRFecNzG5D7s8npsGShVtnhFD00viNYSpZT";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <div className="min-h-[40rem] pt-20">
      <Elements stripe={stripeTestPromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Stripe;
