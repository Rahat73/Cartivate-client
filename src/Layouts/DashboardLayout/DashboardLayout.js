import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useBuyer from '../../hooks/useBuyer';
import useSeller from '../../hooks/useSeller';
import { AuthContext } from '../../Pages/Contexts/AuthProvider';
import Footer from '../../Pages/Shared/Footer/Footer';
import Header from '../../Pages/Shared/Header/Header';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isBuyer] = useBuyer(user?.email)
    const [isSeller] = useSeller(user?.email)
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {
                            isBuyer && <>
                                <li><Link to={`/dashboard/myorders`}>My orders</Link></li>
                            </>
                        }
                        {
                            isSeller && <>
                                <li><Link to={'/dashboard/addproduct'}>Add a prduct</Link></li>
                                <li><Link to={'/dashboard/myproducts'}>My products</Link></li>
                                <li><Link>My buyers</Link></li>
                            </>
                        }
                        {
                            isAdmin && <>
                                <li><Link to={`/dashboard/allsellers`}>All sellers</Link></li>
                                <li><Link to={`/dashboard/allbuyers`}>All buyers</Link></li>
                                <li><Link>Reported Items</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;