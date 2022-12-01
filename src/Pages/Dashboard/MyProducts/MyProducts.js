import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthProvider';
import MyProductCard from './MyProductCard';

const MyProducts = () => {

    const { user } = useContext(AuthContext)
    const { data: products = [], refetch } = useQuery({
        queryKey: ['users', user.email],
        queryFn: () => fetch(`http://localhost:5000/myproducts/${user.email}`)
            .then(res => res.json())
    })

    const handleAdvertise = productId => {
        fetch(`http://localhost:5000/product/advertise/${productId}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Product advertised successfully');
            })
        refetch();
    }

    const handleProductDelete = productId => {
        const agree = window.confirm('Are you sure to DELETE the product?')
        if (agree) {
            fetch(`http://localhost:5000/productdelete/${productId}`, {
                method: `DELETE`
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Product deleted successfully');
                        refetch();
                    }
                });
            refetch();
        }
    }

    return (
        <div className='h-full w-full bg-base-300'>
            <div className='w-11/12 mx-auto my-7'>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    {
                        products.map(product => <MyProductCard
                            key={product._id}
                            product={product}
                            handleAdvertise={handleAdvertise}
                            handleProductDelete={handleProductDelete}
                        >
                        </MyProductCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyProducts;