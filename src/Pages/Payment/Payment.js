import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {

    const orderData = useLoaderData();
    const { title, price } = orderData;
    return (
        <div className='w-10/12 md:w-6/12 mx-auto rounded-xl text-white min-h-screen my-10 bg-base-300'>
            <h1 className='text-4xl font-semibold underline py-5'>Payment for <span className='text-slate-600'>{title}</span></h1>
            <p className='text-2xl'>Please pay <strong className='text-slate-600'>{price}$</strong></p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                        orderData={orderData}
                    />
                </Elements>
            </div>
        </div>

    );
};

export default Payment;