import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Loading from '../pages/shared/Loading';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {

    // ---------- data from auth provider ----------
    const { user, userDetails, loading } = useContext(AuthContext);

    // ---------- when loading state is true ----------
    if (loading) {
        return <Loading></Loading>
    }

    // ---------- after loading if user is not null ----------
    if (user && userDetails) {
        if (userDetails.role !== "Admin") return <Navigate to="/"></Navigate>
        else return children;
    }

    // ---------- if user is null ----------
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default AdminRoute;