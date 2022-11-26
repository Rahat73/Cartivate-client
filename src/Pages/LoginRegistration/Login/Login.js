import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [data, setData] = useState("");

    const { signIn, googleSignInProvider } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const googleProvider = new GoogleAuthProvider();

    const handleLogin = (data) => {
        setData(JSON.stringify(data))
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user.displayName)
                toast.success(`Welcome to Cartivate ${user.displayName}`);
                reset();
                navigate(from, { replace: true });
            })
            .catch(err => toast.error(err));
    }

    const handleGoogleSignIn = () => {
        googleSignInProvider(googleProvider)
            .then(result => {
                const user = result.user;
                console.log('google', user);
                navigate(from, { replace: true });
            })
            .catch(e => {
                toast.error(e.message);
            });
    }

    return (
        <div className=''>
            <div className='bg-base-300 w-10/12 md:w-7/12 mx-auto my-20 py-12 rounded-lg'>
                <h1 className='text-3xl font-semibold'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col justify-center items-center'>
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
                        <input type="password" {...register("password", { required: "Password is required" })} className="input input-bordered w-full max-w-xs" placeholder="Enter your password" required />
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
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

export default Login;