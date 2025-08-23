import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../providers/PrivateRoute";

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