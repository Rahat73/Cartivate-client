import React, { useEffect } from 'react';
import useTitle from '../../hook/useTitle';

const Blog = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useTitle('Blog');
    return (
        <div className='w-10/12 mx-auto mb-16'>
            <h1 className='text-4xl my-10'>Blog</h1>
            <div className="carousel w-full space-x-10">
                <div id="item1" className="flex flex-col carousel-item w-4/5 rounded-box bg-slate-300 bg-opacity-10 bg-clip-padding backdrop-filter backdrop-blur-sm p-10">
                    <h1 className='mb-4 text-2xl font-semibold'>Difference between SQL and NoSQL ?</h1>
                    <ul className='list-disc my-3 text-start'>
                        <li className='text-2xl'>SQL</li>
                        <li>SQL is also pronounced as “S-Q-L” or as “See-Quel” and is primarily known to be a Relational Database</li>
                        <li>Database, here is in table format</li>
                        <li>They are scalable vertically</li>
                    </ul>
                    <ul className='list-disc my-3 text-start'>
                        <li className='text-2xl'>NoSQL</li>
                        <li>NoSQL is a distributed or Non-relational Database</li>
                        <li>NoSQL databases are document based with key-value pairs and graph databases.</li>
                        <li>These are horizontally scalable</li>
                    </ul>
                </div>
                <div id="item2" className="flex flex-col carousel-item w-4/5 rounded-box bg-slate-300 bg-opacity-10 bg-clip-padding backdrop-filter backdrop-blur-sm p-10">
                    <h1 className='mb-4 text-2xl font-semibold'>What is JWT, and how does it work? What other options do you have to implement authentication??</h1>
                    <p> Jason Web Token JWT in short are used as a secure way to authenticate users and share information.

                        Typically, a private key, or secret, is used by the issuer to sign the JWT. The receiver of the JWT will verify the signature to ensure that the token hasn’t been altered after it was signed by the issuer. It is difficult for unauthenticated sources to guess the signing key and attempt to change the claims within the JWT.</p>
                </div>
                <div id="item3" className="flex flex-col carousel-item w-4/5 rounded-box bg-slate-300 bg-opacity-10 bg-clip-padding backdrop-filter backdrop-blur-sm p-10">
                    <h1 className='mb-4 text-2xl font-semibold'>What is the difference between javascript and NodeJS?</h1>
                    <p>JavaScript is a proper high-level programming language used to create web scripts whereas Node.js is a run time environment built on google’s v8 engine.

                        JavaScript is executed in the browser whereas using Node.js gives us the ability to execute JavaScript outside the browser.

                        JavaScript can manipulate DOM or add HTML within whereas Node.js doesn’t have the capability to add HTML.

                        JavaScript is mainly used to create front end web applications or develop client-side whereas Node.js is used on the back end development that is server-side development</p>
                </div>
                <div id="item4" className="flex flex-col carousel-item w-4/5 rounded-box bg-slate-300 bg-opacity-10 bg-clip-padding backdrop-filter backdrop-blur-sm p-10">
                    <h1 className='mb-4 text-2xl font-semibold'>How does NodeJS handle multiple requests at the same time?</h1>
                    <p>NodeJS receives multiple client requests and places them into EventQueue. NodeJS is built with the concept of event-driven architecture. NodeJS has its own EventLoop which is an infinite loop that receives requests and processes them. EventLoop is the listener for the EventQueue.

                        If NodeJS can process the request without I/O blocking then the event loop would itself process the request and sends the response back to the client by itself. But, it is possible to process multiple requests parallelly using the NodeJS cluster module or worker_threads module.</p>
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
            </div>
        </div >
    );
};

export default Blog;