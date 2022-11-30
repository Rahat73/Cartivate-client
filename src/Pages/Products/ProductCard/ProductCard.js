import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { format } from 'date-fns'
import { parseISO } from 'date-fns/esm';

const ProductCard = ({ product }) => {
    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={product.image} alt="product" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{product.title}</h2>
                    <p>{product.description}</p>
                    <div className='flex justify-evenly'>
                        <div className='font-semibold'>Price: {product.price}$</div>
                        <div className='font-semibold'>Original price: {product.originalPrice}$</div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className='font-semibold text-lg'>Seller: {product.sellerName}</div>
                        {
                            product.verified &&
                            <span><FaCheckCircle className='text-md text-blue-600 ml-1'></FaCheckCircle></span>
                        }
                    </div>
                    <div className='flex justify-evenly'>
                        <div className='font-semibold'>Location: {product.location}</div>
                        <div className='font-semibold'>Purchage year: {product.yearPurchase}</div>
                    </div>
                    <div>Posted On: {format(parseISO(product.postTime), 'PP')}</div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;