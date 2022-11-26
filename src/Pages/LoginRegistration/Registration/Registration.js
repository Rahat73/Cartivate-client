import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider';
import { toast } from 'react-toastify';
import { GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle } from "react-icons/fa";

const Registration = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [data, setData] = useState("");

    const { createUser, updateUserProfile, googleSignInProvider } = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider();

    const handleUpdateUserProfile = (name) => {
        const profile = {
            displayName: name,
        }
        updateUserProfile(profile)
            .then(() => { })
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
                    handleUpdateUserProfile(data.name);
                    toast.success(`Welcome to Cartivate ${data.name}`);
                    reset();
                })
                .catch(err => toast.error(err))
        }
        else
            toast.error("Passwords doesn't match");
    }

    const handleGoogleSignIn = () => {
        googleSignInProvider(googleProvider)
            .then(result => {
                const user = result.user;
                console.log('google', user);
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
                    <p>{data}</p>
                    <input className='btn my-5' type="submit" />
                </form>
                <div className="divider w-10/12 mx-auto">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary border border-slate-00'><FaGoogle className='mr-2 text-lg text-white'></FaGoogle> <p className=' text-white capitalize text-lg font-semibold'>SignIn with Google</p></button>
            </div>
        </div>
    );
};

export default Registration;