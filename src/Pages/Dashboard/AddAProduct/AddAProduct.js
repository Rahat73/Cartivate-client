import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthProvider';

const AddAProduct = () => {

    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const { data: users = [] } = useQuery({
        queryKey: ['users', user.email],
        queryFn: () => fetch(`http://localhost:5000/user/${user?.email}`)
            .then(res => res.json())
    })

    console.log(users[0])
    const handleAddProduct = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)
                    const product = {
                        title: data.title,
                        price: data.price,
                        originalPrice: data.originalPrice,
                        condition: data.condition,
                        categoryId: data.categoryId,
                        mobileNo: data.mobileNo,
                        location: data.location,
                        description: data.description,
                        yearPurchase: data.yearPurchase,
                        advertise: false,
                        sellerEmail: users[0]?.email,
                        sellerName: users[0]?.name,
                        verified: users[0]?.verified,
                        reportStatus: false,
                        soldStatus: false,
                        image: imgData.data.url
                    }

                    // console.log(product)
                    //post to database
                    fetch('http://localhost:5000/addproduct', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            toast.success("Product added successfully.")
                            reset();
                        })
                }
            })
    }
    return (
        <div className='h-full w-full bg-base-300'>
            <div className='w-11/12 mx-auto bg-base-100 rounded-lg my-10'>
                <h1 className='text-3xl font-semibold py-10'>Add A Product</h1>
                <form onSubmit={handleSubmit(handleAddProduct)} className='flex flex-col justify-center items-center'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Title</span>
                            </label>
                            <input type="text" {...register("title")} className="input input-bordered w-full max-w-xs" placeholder="Enter product title" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Price</span>
                            </label>
                            <input type="number" {...register("price")} className="input input-bordered w-full max-w-xs" placeholder="Enter product price" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Original Price</span>
                            </label>
                            <input type="number" {...register("originalPrice")} className="input input-bordered w-full max-w-xs" placeholder="Enter product original price" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Condition</span>
                            </label>
                            <select {...register("condition")} className="select select-bordered w-full max-w-xs" required>
                                <option disabled selected>Select product condition</option>
                                <option value='Excellent'>Excellent</option>
                                <option value='Good'>Good</option>
                                <option value='Fair'>Fair</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Categoty</span>
                            </label>
                            <select {...register("categoryId")} className="select select-bordered w-full max-w-xs" required>
                                <option disabled selected>Select product category</option>
                                <option value='1'>Pony Car</option>
                                <option value='2'>SUV</option>
                                <option value='3'>Sports Car</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Mobile no.</span>
                            </label>
                            <input type="tel" {...register("mobileNo")} className="input input-bordered w-full max-w-xs" placeholder="Enter your mobile no." required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Location</span>
                            </label>
                            <input type="text" {...register("location")} className="input input-bordered w-full max-w-xs" placeholder="Enter purchase location" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                            <textarea {...register("description")} className="textarea textarea-bordered" placeholder="Provide description" required></textarea>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Year of purchase</span>
                            </label>
                            <input type="number" {...register("yearPurchase")} className="input input-bordered w-full max-w-xs" placeholder="Enter purchase year" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">E-mail</span>
                            </label>
                            <input type="email" {...register("sellerEmail")} value={user?.email} disabled className="input input-bordered w-full max-w-xs" placeholder="Enter your email" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input type="text" {...register("sellerName")} value={user?.displayName} disabled className="input input-bordered w-full max-w-xs" placeholder="Enter your name" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Image</span>
                            </label>
                            <input type="file" {...register("image")} className="file-input file-input-bordered w-full" required />
                        </div>
                    </div>
                    <button className='btn btn-primary my-5' type='submit'>Add product</button>
                </form>
            </div>
        </div>
    );
};

export default AddAProduct;