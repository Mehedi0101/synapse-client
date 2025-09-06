import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth_layout/Login";
import Register from "../pages/auth_layout/Register";
import PrivateRoute from "../providers/PrivateRoute";
import ResetPassword from "../pages/auth_layout/ResetPassword";
import UserLayout from "../layouts/UserLayout";
import UserActivity from "../pages/user_layout/UserActivity";
import UserCreatePost from "../pages/user_layout/UserCreatePost";
import UserMessages from "../pages/user_layout/UserMessages";
import UserConnect from "../pages/user_layout/UserConnect";
import UserMentorship from "../pages/user_layout/UserMentorship";
import UserJobs from "../pages/user_layout/UserJobs";
import UserEvents from "../pages/user_layout/UserEvents";
import UserResources from "../pages/user_layout/UserResources";
import UserProfile from "../pages/user_layout/UserProfile";
import UpdateUserProfile from "../pages/user_layout/UpdateUserProfile";

const router = createBrowserRouter([
    {
        // ---------- user layout ----------
        path: '/',
        element: <PrivateRoute><UserLayout></UserLayout></PrivateRoute>,
        children: [
            {
                // ---------- activity ----------
                path: '/activity',
                element: <UserActivity></UserActivity>
            },
            {
                // ---------- create a post ----------
                path: '/post',
                element: <UserCreatePost></UserCreatePost>
            },
            {
                // ---------- messages ----------
                path: '/messages',
                element: <UserMessages></UserMessages>
            },
            {
                // ---------- connection request ----------
                path: '/connect',
                element: <UserConnect></UserConnect>
            },
            {
                // ---------- mentorship ----------
                path: '/mentorship',
                element: <UserMentorship></UserMentorship>
            },
            {
                // ---------- jobs ----------
                path: '/jobs',
                element: <UserJobs></UserJobs>
            },
            {
                // ---------- events ----------
                path: '/events',
                element: <UserEvents></UserEvents>
            },
            {
                // ---------- resources ----------
                path: '/resources',
                element: <UserResources></UserResources>
            },
            {
                // ---------- profile ----------
                path: '/profile',
                element: <UserProfile></UserProfile>
            },
            {
                // ---------- update user profile ----------
                path: '/update-profile',
                element: <UpdateUserProfile></UpdateUserProfile>
            }
        ]
    },
    {
        // ---------- auth layout ----------
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                // ---------- login ----------
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                // ---------- reset password ----------
                path: '/auth/reset-password',
                element: <ResetPassword></ResetPassword>
            },
            {
                // ---------- register ----------
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    },
    {
        // ---------- any other routes ----------
        path: '/*',
        element: <div>Error 404 Not found</div>
    }
])

export default router;