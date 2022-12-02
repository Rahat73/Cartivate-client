import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { format } from 'date-fns'
import { parseISO } from 'date-fns/esm';
import { toast } from 'react-toastify';

const AdvertisedItemCard = ({ advertisedProduct }) => {

    const showToast = () => {
        toast('Go to categories to book products');
    }

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={advertisedProduct?.image} alt="advertisedProduct" /></figure>
            <div className="card-body">
                <h2 className="card-title">{advertisedProduct?.title}</h2>
                <p>{advertisedProduct?.description}</p>
                <div className='flex justify-evenly'>
                    <div className='font-semibold'>Price: {advertisedProduct?.price}$</div>
                    <div className='font-semibold'>Original price: {advertisedProduct?.originalPrice}$</div>
                </div>
                <div className="flex justify-center items-center">
                    <div className='font-semibold text-lg'>Seller: {advertisedProduct?.sellerName}</div>
                    {
                        advertisedProduct?.verified &&
                        <span><FaCheckCircle className='text-md text-blue-600 ml-1'></FaCheckCircle></span>
                    }
                </div>
                <div className='flex justify-evenly'>
                    <div className='font-semibold'>Location: {advertisedProduct?.location}</div>
                    <div className='font-semibold'>Purchage year: {advertisedProduct?.yearPurchase}</div>
                </div>
                <div>Posted On: {format(parseISO(advertisedProduct?.postTime), 'PP')}</div>
                <div className="card-actions justify-end">
                    <button onClick={showToast} className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default AdvertisedItemCard;