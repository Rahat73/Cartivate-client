import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider';
import { toast } from 'react-toastify';
import { GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


const Registration = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [data, setData] = useState("");

    const { createUser, updateUserProfile, googleSignInProvider } = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider();


    const saveUser = (name, email, userType) => {
        const user = { name, email, userType };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/');
            })
    }

    const handleUpdateUserProfile = (name, email, userType) => {
        const profile = {
            displayName: name,
        }
        updateUserProfile(profile)
            .then(() => {
                saveUser(name, email, userType);
            })
            .catch(e => {
                toast.error(e.message);
            });
    }

    const handleRegistration = (data) => {
        setData(JSON.stringify(data))
        if (data.password === data.confirmPassword) {
            createUser(data.email, data.password)
                .then(result => {
                    const user = result.user;
                    console.log(user)
                    handleUpdateUserProfile(data.name, data.email, data.userType);
                    toast.success(`Welcome to Cartivate ${data.name}`);
                    reset();
                })
                .catch(err => toast.error(err))
        }
        else
            toast.error("Passwords doesn't match");
    }

    const [userEmail, setUserEmail] = useState();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch(`http://localhost:5000/users/${userEmail}`)
            .then(res => res.json())
    })

    const handleGoogleSignIn = () => {
        googleSignInProvider(googleProvider)
            .then(result => {
                const user = result.user;
                setUserEmail(user.email);
                if (users.length > 0) {
                    saveUser(user.displayName, user.email, "Buyer");
                }
                toast.success(`Welcome to Cartivate ${user.displayName}`);
            })
            .catch(e => {
                toast.error(e.message);
            });
    }

    return (
        <div className=''>
            <div className='bg-base-300 w-10/12 md:w-7/12 mx-auto my-20 py-12 rounded-lg'>
                <h1 className='text-3xl font-semibold'>Register</h1>
                <form onSubmit={handleSubmit(handleRegistration)} className='flex flex-col justify-center items-center'>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full max-w-xs" placeholder="Enter your name" required />
                        {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: "Email is required" })} className="input input-bordered w-full max-w-xs" placeholder="Enter your email" required />
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <h1 className='text-sm font-semibold mt-4'>Account type</h1>
                    <div className='flex items-center'>
                        <div className='flex'>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Buyer</span>
                                    <input type="radio" name="radio" value="Buyer" {...register("userType")} className="radio checked:bg-blue-500" checked />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Seller</span>
                                    <input type="radio" name="radio" value="Seller" {...register("userType")} className="radio checked:bg-red-500" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be of 6 characters or longer" },
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, message: "Password must contain uppercase, lowercase and number" }
                        })} className="input input-bordered w-full max-w-xs" placeholder="Enter your password" required />
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-semibold">Confirm password</span>
                        </label>
                        <input type="password" {...register("confirmPassword", {
                            required: "Confirm your password",
                        })} className="input input-bordered w-full max-w-xs" placeholder="Confirm password" required />
                        {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword?.message}</p>}
                    </div>
                    <p className=''>{data}</p>
                    <button className='btn btn-primary my-5' type='submit'>Register</button>
                    <div className='my-3'>
                        <p>Don't have an Account? <Link className='text-lg text-primary' to='/login'>Register</Link></p>
                    </div>
                </form>
                <div className="divider w-10/12 mx-auto">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary border border-slate-00'><FaGoogle className='mr-2 text-lg text-white'></FaGoogle> <p className=' text-white capitalize text-lg font-semibold'>SignIn with Google</p></button>
            </div>
        </div>
    );
};

export default Registration;