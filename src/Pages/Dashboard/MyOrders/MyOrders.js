import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: products = [] } = useQuery({
        queryKey: ['myorders', user?.email],
        queryFn: () => fetch(`http://localhost:5000/myorders/${user?.email}`)
            .then(res => res.json())
    })

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
                                <tr className='hover'>
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
                                        {
                                            !product?.soldStatus ?
                                                <Link to={`/payment/${product._id}`}><button className="btn btn-xs">$ Pay</button></Link>
                                                :
                                                <button className="btn btn-xs" disabled>$ Paid</button>
                                        }
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

export default MyOrders;