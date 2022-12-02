import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthProvider';

const ProductModal = ({ productModal }) => {
    const { user } = useContext(AuthContext);

    const { data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: () => fetch(`http://localhost:5000/user/${user?.email}`)
            .then(res => res.json())
    })

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email, productModal?._id],
        queryFn: () => fetch(`http://localhost:5000/orders/${user?.email}/${productModal?._id}`)
            .then(res => res.json())
    })

    const handleBook = (event) => {
        event.preventDefault();
        if (users[0]?.userType === "Buyer") {
            console.log(orders.length)
            if (orders.length === 0) {
                const form = event.target;
                const order = {
                    productId: productModal?._id,
                    image: productModal?.image,
                    title: productModal?.title,
                    price: productModal?.price,
                    userName: user.displayName,
                    userEmail: user.email,
                    mobile: form.mobileNo.value,
                    purchageLocation: form.purchaseLocation.value
                }
                fetch(`http://localhost:5000/order/${user.email}/${productModal?._id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(order)
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result)
                        toast.success("Product booked successfully.")
                        form.reset();
                    })
            }
            else {
                toast.error("You have already booked this product")
            }
        }
        else {
            toast.error("You need a buyer account to Book")
        }

    }
    return (
        <>
            <input type="checkbox" id="book-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="book-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{productModal?.title}</h3>
                    <p className="">Price: {productModal?.price}</p>
                    <h4 className="font-semibold text-lg">{user?.displayName}</h4>
                    <h4 className="text-lg">{user?.email}</h4>
                    <form onSubmit={handleBook}>
                        <input type="tel" name="mobileNo" placeholder="Mobile No." className="input input-bordered w-full max-w-xs my-3" required />
                        <input type="text" name="purchaseLocation" placeholder="Purchase location" className="input input-bordered w-full max-w-xs" required />
                        <div className="modal-action">
                            <button type="submit" className="btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductModal;