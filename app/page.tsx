'use client';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import CheckoutForm from "@/components/CheckoutForm";

if(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
export default function Home() {
  
  const amount = 49.99;
  return (
    <main className=" max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
    <div className="mb-10">
      <h1 className="text-4xl font-bold">Stripe Checkout</h1>
      <p className="text-lg">Securely accept payments with Stripe Checkout</p>
      <span className="font-2xl">${amount}</span>
    </div>
    <Elements stripe={stripePromise}
    options={{ 
      mode: 'payment',
      currency: 'usd',
      amount:convertToSubCurrency(amount, 'usd')
     }}
    > 
      <CheckoutForm amount={amount} />
    </Elements>
    </main>
  );
}
