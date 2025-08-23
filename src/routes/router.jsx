import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth_layout/Login";
import Register from "../pages/auth_layout/Register";
import PrivateRoute from "../providers/PrivateRoute";
import ResetPassword from "../pages/auth_layout/ResetPassword";

const router = createBrowserRouter([
    {
        // homepage
        path: '/',
        element: <PrivateRoute><HomeLayout></HomeLayout></PrivateRoute>
    },
    {
        // auth layout
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                // login
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                // reset password
                path: '/auth/reset-password',
                element: <ResetPassword></ResetPassword>
            },
            {
                // register
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    },
    {
        // any other routes
        path: '/*',
        element: <div>Error 404 Not found</div>
    }
])

export default router;