import React from 'react';
import { ImBin } from "react-icons/im";
import { format } from 'date-fns'
import { parseISO } from 'date-fns/esm';

const MyProductCard = ({ product, handleAdvertise, handleProductDelete }) => {
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={product?.image} alt="product" /></figure>
            <div className="card-body">
                <h2 className="card-title">{product?.title}</h2>
                <div className='flex items-center'>
                    <p className='font-semibold'>Price: {product?.price}$</p>
                    <span>|</span>
                    <p>Posted on: {format(parseISO(product?.postTime), 'PP')}</p>
                    <span>|</span>
                    {
                        product?.soldStatus ?
                            <>
                                <p className='text-lg'>Sold</p>
                            </>
                            :
                            <>
                                <p className='text-lg'>Unsold</p>
                            </>
                    }
                </div>
                <div className="card-actions justify-end items-center">
                    <button onClick={() => handleProductDelete(product._id)}><ImBin className='text-2xl text-error'></ImBin></button>
                    {!product?.advertise && <button onClick={() => handleAdvertise(product._id)} className="btn btn-primary btn-xs">Advertise</button>}
                </div>
            </div>
        </div>
    );
};

export default MyProductCard;