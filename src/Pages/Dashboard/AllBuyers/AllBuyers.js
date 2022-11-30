import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBuyers = () => {

    const { data: buyers = [] } = useQuery({
        queryKey: ['buyers'],
        queryFn: () => fetch(`http://localhost:5000/users/admin/buyers`)
            .then(res => res.json())
    })


    console.log(buyers)
    return (
        <div className='h-full w-full bg-base-300'>
            <h1 className='text-3xl font-semibold underline capitalize my-10'>All buyers</h1>
            <div className="overflow-x-auto w-11/12 mx-auto my-10">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Buyers</th>
                            <th>Verified</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            buyers.map((buyer, i) =>
                                <tr key={buyer._id} className='hover'>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{buyer.name}</div>
                                                <div className="">{buyer.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{buyer.verified}</td>
                                    <th className='text-center'>
                                        <button className="btn btn-xs font-semibold">Remove</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Buyers</th>
                            <th>Verified</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default AllBuyers;