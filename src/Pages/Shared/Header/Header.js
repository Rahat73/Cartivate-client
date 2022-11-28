// import React, { useContext } from 'react';
import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { useContext } from 'react';
import { MdOutlineDashboard } from 'react-icons/md';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    //console.log(user);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    return (
        <div className='sticky top-0 z-30'>
            <div className="navbar bg-white justify-between pt-1 pb-0 px-14 shadow-md">
                <div className="">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className=' border-4 border-transparent hover:border-b-neutral text-lg'><Link to="/">
                                Home
                            </Link></li>
                            <li className=' border-4 border-transparent hover:border-b-neutral text-lg'><Link to="blog">
                                Blog
                            </Link></li>
                            {
                                user?.uid ?
                                    <>
                                        <ul className="menu menu-horizontal p-0 items-center">
                                            <li className=' border-4 border-transparent hover:border-b-neutral text-lg'><Link onClick={handleLogOut}>Log Out</Link></li>
                                        </ul>
                                    </>
                                    :
                                    <>
                                        <ul className="menu menu-horizontal p-0 items-center">
                                            <li className=' border-4 border-transparent hover:border-b-neutral text-lg'><Link to="login">Login</Link></li>
                                        </ul>
                                    </>
                            }
                        </ul>
                    </div>
                    <Link to="/"><button><img className='h-16 lg:h-20' src={logo} alt="logo" /></button></Link>
                    <label tabIndex="2" className="btn btn-ghost lg:hidden" htmlFor='dashboard-drawer'>
                        <MdOutlineDashboard className='text-2xl'></MdOutlineDashboard>
                    </label>
                </div>
                <div className="navbar-center hidden lg:flex mx-20">
                    <ul className="menu menu-horizontal p-0 items-center">
                        <li className=' border-4 border-transparent hover:border-b-neutral text-lg'><Link to="/">
                            Home
                        </Link></li>
                        <li className=' border-4 border-transparent hover:border-b-neutral text-lg'><Link to="blog">
                            Blog
                        </Link></li>
                    </ul>
                </div>
                <div className='menu menu-horizontal p-0 items-center hidden md:block'>
                    {
                        user?.uid ?
                            <>
                                <ul className="menu menu-horizontal p-0 items-center">
                                    <li className=' border-4 border-transparent hover:border-b-neutral text-lg'><Link to='/dashboard'>Dashboard</Link></li>
                                    <li className=' border-4 border-transparent hover:border-b-neutral text-lg'><Link onClick={handleLogOut}>Log Out</Link></li>
                                </ul>
                            </>
                            :
                            <>
                                <ul className="menu menu-horizontal p-0 items-center">
                                    <li className=' border-4 border-transparent hover:border-b-neutral text-lg'><Link to="login">Login</Link></li>
                                </ul>
                            </>
                    }
                </div>
                <div>
                    <div className='tooltip' data-tip={user?.displayName}>
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar px mx-4">
                            <div className="w-10 rounded-full">
                                {
                                    user?.photoURL ?
                                        <img src={user?.photoURL} alt='profile pic' /> : <></>
                                }
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;