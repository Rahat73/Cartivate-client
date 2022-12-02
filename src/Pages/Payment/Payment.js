import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {

    const orderData = useLoaderData();
    return (
        <div className='w-10/12 md:w-6/12 mx-auto rounded-xl text-white min-h-screen my-10 bg-base-300'>
            <h1 className='text-5xl font-semibold underline py-5'>Payment</h1>
        </div>
    );
};

export default Payment;