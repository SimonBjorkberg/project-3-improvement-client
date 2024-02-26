import React from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ShoppingCartContext } from "../context/shoppingCart.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../services/order.service";

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { total, cartProducts } = useContext(ShoppingCartContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    await orderService.create({
      products: cartProducts,
      totalAmount: total,
    });
    if (!error) {
      console.log("Token created: ", paymentMethod);
      try {
        const url = `${process.env.REACT_APP_API_URL}/stripe/charge`
        const { id } = paymentMethod;
        const response = await axios.post(
         url || "http://localhost:5005/stripe/charge",
          { amount: Math.round(total * 100), id: id }
        );
        if (response.data.success) {
          navigate("/stripe/thank-you");
        } else if (!response.data.success) {
          navigate("/stripe/card-declined");
        }
      } catch (error) {
        console.log("erreur! ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className="pt-20 mb-8">Please enter your credit card info</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <CardElement
          className="p-2 max-w-[300px] border border-solid border-black rounded-[12px] w-[100%] h-40 pt-10 bg-gradient-to-r from-[#12c2e9] to-[#c471ed]"
          options={{
            hidePostalCode: true,
            style: {
              base: {
                color: "white",
              },
            },
          }}
        />
        <button className="bg-green-400 mt-8 text-white py-2 px-4 rounded-md text-xl hover:bg-green-500">
          Pay {total}$
        </button>
      </form>
    </>
  );
};
