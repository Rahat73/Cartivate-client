/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (

        <main class="h-screen w-full flex flex-col mt-20 items-center">
            <h1 class="text-9xl font-extrabold text-primary tracking-widest">404</h1>
            <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <button class="mt-5">
                <a
                    class="relative inline-block text-sm font-medium text-black group active:text-black focus:outline-none focus:ring"
                >
                    <span
                        class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-neutral group-hover:translate-y-0 group-hover:translate-x-0"
                    ></span>

                    <span class="relative block px-8 py-3 bg-primary border border-current">
                        <Link to="/">Go Home</Link>
                    </span>
                </a>
            </button>
        </main>
    );
};

export default Error;