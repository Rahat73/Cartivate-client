import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main/Main";
import Blog from "../../Pages/Blog/Blog";
import Error from "../../Pages/Error/Error";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/LoginRegistration/Login/Login";
import Registration from "../../Pages/LoginRegistration/Registration/Registration";
import TermsAndConditions from "../../Pages/TermsAndConditions/TermsAndConditions";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/T&C',
                element: <TermsAndConditions></TermsAndConditions>
            },
            {
                path: '*',
                element: <Error></Error>
            }
        ]
    }
]);

export default router;