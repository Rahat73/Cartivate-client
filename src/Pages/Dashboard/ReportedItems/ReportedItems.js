import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const ReportedItems = () => {

    const { data: products = [], refetch } = useQuery({
        queryKey: ['reportedItems'],
        queryFn: () => fetch(`http://localhost:5000/users/admin/reportedItems`)
            .then(res => res.json())
    })

    const handleDelete = id => {
        const agree = window.confirm('Are you sure to DELETE the product?')
        if (agree) {
            fetch(`http://localhost:5000/products/${id}`, {
                method: `DELETE`
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Product deleted successfully');
                        refetch();
                    }
                });
        }
    }

    return (
        <div className='h-full w-full bg-base-300'>
            <div className="overflow-x-auto w-11/12 mx-auto my-10">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Products</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            products.map((product, i) =>
                                <tr key={product._id} className='hover'>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product?.image} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product?.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product?.price}$</td>
                                    <th className='text-center'>
                                        <button onClick={() => handleDelete(product?._id)} className="btn btn-xs">Delete</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Products</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default ReportedItems;