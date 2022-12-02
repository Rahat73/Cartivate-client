import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard/ProductCard';
import ProductModal from './ProductCard/ProductModal';

const Products = () => {
    const products = useLoaderData();
    const [productModal, setProductModal] = useState(null);

    return (
        <div className='bg-base-300 w-10/12 mx-auto my-20 p-10 rounded-lg'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}
                        setProductModal={setProductModal}
                    ></ProductCard>)
                }
            </div>
            <ProductModal productModal={productModal}></ProductModal>
        </div>
    );
};

export default Products;