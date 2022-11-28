import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={product.image} alt="product" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{product.title}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;