import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle } from "react-icons/fa";
import { toast } from 'react-toastify';

const AllSellers = () => {

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: () => fetch(`http://localhost:5000/users/admin/sellers`)
            .then(res => res.json())
    })

    console.log(sellers)

    const handleVerify = (sellerId) => {
        fetch(`http://localhost:5000/users/verify/${sellerId}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('User verified successfully');
            })
        refetch();
    }

    const handleRefute = sellerId => {
        fetch(`http://localhost:5000/users/refute/${sellerId}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('User refuted successfully');
            })
        refetch();
    }


    const handleDelete = id => {
        const agree = window.confirm('Are you sure to DELETE the review?')
        if (agree) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: `DELETE`
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('User deleted successfully');
                        refetch();
                    }
                });
        }
    }

    return (
        <div className='h-full w-full bg-base-300'>
            <h1 className='text-3xl font-semibold underline capitalize my-10'>All sellers</h1>
            <div className="overflow-x-auto w-11/12 mx-auto my-10">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Sellers</th>
                            <th>Verify</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            sellers.map((seller, i) =>
                                <tr key={seller._id} className='hover'>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div className='indicator items-center'>
                                                <div>
                                                    <div className="font-bold">{seller.name}</div>
                                                    <div className="">{seller.email}</div>
                                                </div>
                                                {
                                                    seller.verified &&
                                                    <span><FaCheckCircle className='text-2xl text-blue-600 ml-2'></FaCheckCircle></span>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            !seller.verified ?
                                                <>
                                                    <button onClick={() => handleVerify(seller._id)} className="btn btn-xs font-semibold">Verify</button>
                                                </>
                                                :
                                                <>
                                                    <button onClick={() => handleRefute(seller._id)} className="btn btn-xs font-semibold">Refute</button>
                                                </>
                                        }
                                    </td>
                                    <th className='text-center'>
                                        <button onClick={() => handleDelete(seller._id)} className="btn btn-xs font-semibold">Remove</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Sellers</th>
                            <th>Verify</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default AllSellers;