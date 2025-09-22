import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth_layout/Login";
import Register from "../pages/auth_layout/Register";
import PrivateRoute from "../providers/PrivateRoute";
import ResetPassword from "../pages/auth_layout/ResetPassword";
import UserLayout from "../layouts/UserLayout";
import UserMessages from "../pages/user_layout/UserMessages";
import UserConnections from "../pages/user_layout/UserConnections";
import UserMentorship from "../pages/user_layout/UserMentorship";
import UserJobs from "../pages/user_layout/UserJobs";
import UserEvents from "../pages/user_layout/UserEvents";
import UserResources from "../pages/user_layout/UserResources";
import UserProfile from "../pages/user_layout/UserProfile";
import UpdateUserProfile from "../pages/user_layout/UpdateUserProfile";
import ErrorPage from "../pages/shared/ErrorPage";
import PublicRoute from "../providers/PublicRoute";
import UserPosts from "../pages/user_layout/UserPosts";
import UserHome from "../pages/user_layout/UserHome";
import UserAllConnections from "../pages/user_layout/UserAllConnections";
import UserCreateJobPost from "../pages/user_layout/UserCreateJobPost";
import UserJobDetails from "../pages/user_layout/UserJobDetails";
import UserUpdateJobPost from "../pages/user_layout/UserUpdateJobPost";
import UserCreateEvent from "../pages/user_layout/UserCreateEvent";
import UserEventDetails from "../pages/user_layout/UserEventDetails";
import UserUpdateEvent from "../pages/user_layout/UserUpdateEvent";
import UserPostResource from "../pages/user_layout/UserPostResource";


const router = createBrowserRouter([
    {
        // ---------- user layout ----------
        path: '/',
        element: <PrivateRoute><UserLayout></UserLayout></PrivateRoute>,
        children: [
            {
                // ---------- activity ----------
                path: '',
                element: <UserHome></UserHome>
            },
            {
                // ---------- create a post ----------
                path: '/my-posts',
                element: <UserPosts></UserPosts>
            },
            {
                // ---------- messages ----------
                path: '/messages',
                element: <UserMessages></UserMessages>
            },
            {
                // ---------- connection request ----------
                path: '/connections',
                element: <UserConnections></UserConnections>
            },
            {
                // ---------- all connections ----------
                path: '/my-connections',
                element: <UserAllConnections></UserAllConnections>
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
                // ---------- job details ----------
                path: '/jobs/:id',
                element: <UserJobDetails></UserJobDetails>
            },
            {
                // ----------create job post ----------
                path: '/create-job-post',
                element: <UserCreateJobPost></UserCreateJobPost>
            },
            {
                // ---------- job post update ----------
                path: '/jobs/update/:id',
                element: <UserUpdateJobPost></UserUpdateJobPost>
            },
            {
                // ---------- events ----------
                path: '/events',
                element: <UserEvents></UserEvents>
            },
            {
                // ---------- event details ----------
                path: '/events/:id',
                element: <UserEventDetails></UserEventDetails>
            },
            {
                // ---------- update event ----------
                path: '/events/update/:id',
                element: <UserUpdateEvent></UserUpdateEvent>
            },
            {
                // ---------- create event ----------
                path: '/create-event',
                element: <UserCreateEvent></UserCreateEvent>
            },
            {
                // ---------- resources ----------
                path: '/resources',
                element: <UserResources></UserResources>
            },
            {
                // ---------- post resource ----------
                path: '/post-resource',
                element: <UserPostResource></UserPostResource>
            },
            {
                // ---------- current user profile ----------
                path: '/profile',
                element: <UserProfile></UserProfile>
            },
            {
                // ---------- other user's profile ----------
                path: '/profile/:id',
                element: <UserProfile></UserProfile>
            },
            {
                // ---------- update user profile ----------
                path: '/update-profile',
                element: <UpdateUserProfile></UpdateUserProfile>
            },
        ]
    },
    {
        // ---------- auth layout ----------
        path: '/auth',
        element: <PublicRoute><AuthLayout></AuthLayout></PublicRoute>,
        // element: <AuthLayout></AuthLayout>,
        children: [
            // ---------- automatic navigation to auth/login ----------
            {
                path: '',
                element: <Navigate to='/auth/login'></Navigate>
            },
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
        element: <ErrorPage></ErrorPage>
    }
])

export default router;