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
import UserResourceDetails from "../pages/user_layout/UserResourceDetails";
import UserUpdateResource from "../pages/user_layout/UserUpdateResource";
import AdminLayout from "../layouts/AdminLayout";
import AdminRoute from "../providers/AdminRoute";
import AdminOverview from "../pages/admin_layout/AdminOverview";
import AdminUsers from "../pages/admin_layout/AdminUsers";
import AdminMentorship from "../pages/admin_layout/AdminMentorship";
import AdminJobs from "../pages/admin_layout/AdminJobs";
import AdminEvents from "../pages/admin_layout/AdminEvents";
import AdminResources from "../pages/admin_layout/AdminResources";
import UserMentorshipRequest from "../pages/user_layout/UserMentorshipRequest";
import AdminMentorshipDetails from "../pages/admin_layout/AdminMentorshipDetails";
import UserMentorshipRequestDetails from "../pages/user_layout/UserMentorshipRequestDetails";
import UserMentorshipInProgressDetailsAlumni from "../pages/user_layout/UserMentorshipInProgressDetailsAlumni";
import UserChatPage from "../pages/user_layout/UserChatPage";
import UserChangePassword from "../pages/user_layout/UserChangePassword";
import UserDeleteAccount from "../pages/user_layout/UserDeleteAccount";
import ForbiddenPage from "../pages/shared/ForbiddenPage";


const router = createBrowserRouter([
    {
        // ---------- user layout ----------
        path: '/',
        element: <PrivateRoute><UserLayout></UserLayout></PrivateRoute>,
        children: [
            {
                // ---------- activity ----------
                index: true,
                Component: UserHome
            },
            {
                // ---------- my posts ----------
                path: 'my-posts',
                Component: UserPosts
            },
            {
                // ---------- messages ----------
                path: 'messages',
                Component: UserMessages
            },
            {
                // ---------- chat page ----------
                path: 'messages/chat/:id',
                Component: UserChatPage
            },
            {
                // ---------- connection request ----------
                path: 'connections',
                Component: UserConnections
            },
            {
                // ---------- all connections ----------
                path: 'my-connections',
                Component: UserAllConnections
            },
            {
                // ---------- mentorship ----------
                path: 'mentorship',
                Component: UserMentorship
            },
            {
                // ---------- mentorship request ----------
                path: 'mentorship/request',
                Component: UserMentorshipRequest
            },
            {
                // ---------- mentorship request details ----------
                path: 'mentorship/request-action/:id',
                Component: UserMentorshipRequestDetails
            },
            {
                // ---------- mentorship request details ----------
                path: 'mentorship/in-progress/:id',
                Component: UserMentorshipInProgressDetailsAlumni
            },
            {
                // ---------- jobs ----------
                path: 'jobs',
                Component: UserJobs
            },
            {
                // ---------- job details ----------
                path: 'jobs/:id',
                Component: UserJobDetails
            },
            {
                // ----------create job post ----------
                path: 'create-job-post',
                Component: UserCreateJobPost
            },
            {
                // ---------- job post update ----------
                path: 'jobs/update/:id',
                Component: UserUpdateJobPost
            },
            {
                // ---------- events ----------
                path: 'events',
                Component: UserEvents
            },
            {
                // ---------- event details ----------
                path: 'events/:id',
                Component: UserEventDetails
            },
            {
                // ---------- create event ----------
                path: 'create-event',
                Component: UserCreateEvent
            },
            {
                // ---------- update event ----------
                path: 'events/update/:id',
                Component: UserUpdateEvent
            },
            {
                // ---------- resources ----------
                path: 'resources',
                Component: UserResources
            },
            {
                // ---------- resources details ----------
                path: 'resources/:id',
                Component: UserResourceDetails
            },
            {
                // ---------- post resource ----------
                path: 'post-resource',
                Component: UserPostResource
            },
            {
                // ---------- update resource ----------
                path: 'resources/update/:id',
                Component: UserUpdateResource
            },
            {
                // ---------- current user profile ----------
                path: 'profile',
                Component: UserProfile
            },
            {
                // ---------- other user's profile ----------
                path: 'profile/:id',
                Component: UserProfile
            },
            {
                // ---------- update user profile ----------
                path: 'update-profile',
                Component: UpdateUserProfile
            },
            {
                // ---------- change password ----------
                path: 'change-password',
                Component: UserChangePassword
            },
            {
                // ---------- delete account ----------
                path: 'delete-account',
                Component: UserDeleteAccount
            }
        ]
    },
    {
        // ---------- auth layout ----------
        path: '/auth',
        element: <PublicRoute><AuthLayout></AuthLayout></PublicRoute>,
        children: [
            // ---------- automatic navigation to auth/login ----------
            {
                index: true,
                element: <Navigate to='/auth/login'></Navigate>
            },
            {
                // ---------- login ----------
                index: true,
                path: 'login',
                Component: Login
            },
            {
                // ---------- reset password ----------
                path: 'reset-password',
                Component: ResetPassword
            },
            {
                // ---------- register ----------
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        // ---------- admin layout ----------
        path: '/admin',
        element: <AdminRoute><AdminLayout></AdminLayout></AdminRoute>,
        children: [
            {
                index: true,
                element: <Navigate to='/admin/overview'></Navigate>
            },
            {
                // ---------- admin overview ----------
                path: 'overview',
                Component: AdminOverview
            },
            {
                // ---------- admin users ----------
                path: 'users',
                Component: AdminUsers
            },
            {
                // ---------- admin user profile ----------
                path: 'users/:id',
                element: <UserProfile display="hidden" />
            },
            {
                // ---------- admin mentorship ----------
                path: 'mentorship',
                Component: AdminMentorship
            },
            {
                // ---------- admin mentorship details ----------
                path: 'mentorship/:id',
                Component: AdminMentorshipDetails
            },
            {
                // ---------- admin jobs ----------
                path: 'jobs',
                Component: AdminJobs
            },
            {
                // ---------- admin job details ----------
                path: 'jobs/:id',
                element: <UserJobDetails display="hidden" />
            },
            {
                // ---------- admin events ----------
                path: 'events',
                Component: AdminEvents
            },
            {
                // ---------- admin event details ----------
                path: 'events/:id',
                element: <UserEventDetails display="hidden" />
            },
            {
                // ---------- admin resources ----------
                path: 'resources',
                Component: AdminResources
            },
            {
                // ---------- admin resource details ----------
                path: 'resources/:id',
                element: <UserResourceDetails display="hidden"></UserResourceDetails>
            }
        ]
    },
    {
        path: '/forbidden',
        Component: ForbiddenPage
    },
    {
        // ---------- any other routes ----------
        path: '/*',
        Component: ErrorPage
    }
])

export default router;