import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard/ProductCard';

const Products = () => {
    const products = useLoaderData();
    return (
        <div className='bg-base-300 w-10/12 mx-auto my-20 p-10 rounded-lg'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {
                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Products;