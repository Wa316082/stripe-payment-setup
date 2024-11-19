'use client';
import React, {useEffect, useState } from 'react'
import{
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import convertToSubCurrency from '@/lib/convertToSubCurrency';
function CheckoutForm({amount}: {amount: number}) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        const fetchClientSecret = async () => {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount:convertToSubCurrency(amount, 'usd') }),
            });
            const { clientSecret } = await response.json();
            setClientSecret(clientSecret);
        };
        fetchClientSecret();

    }, [amount]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(PaymentElement);
        if (!cardElement) {
            return;
        }
        setLoading(true);
        const {error:submitError} = await elements.submit();
        if (submitError) {
            setError(submitError.message || 'An unknown error occurred');
            setLoading(false);
            return;
        }

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3002/payment-success?amount=${amount}`
            },
           

        });
        if (error) {
            setError(error.message || 'An unknown error occurred');
            setLoading(false);
            return;
        }else{
            setError(null);
            
        }
        setLoading(false);
    };
    if (!clientSecret || !stripe || !elements) {
        return <div className='flex items-center justify-center'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] dark:text-white' role='status'>
                <span className='!absolute !-m-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>Loading...</span>
            </div>

        </div>;
    }
    return (
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-md'>
            {clientSecret&& <PaymentElement />}
            {error && <div>{error}</div>}
            <button disabled={!stripe|| loading} className='text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse' type="submit" >
               {loading ? 'Processing...' :  `Pay ${amount}`}
            </button>
        </form>
    );
}

export default CheckoutForm
