import { use, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Loading from '../pages/shared/Loading';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    // ---------- data from auth provider ----------
    const { user, userDetails, loading } = useContext(AuthContext);
    const location = useLocation

    // ---------- when loading state is true ----------
    if (loading) {
        return <Loading/>
    }

    // ---------- after loading if user is not null ----------
    if (user && userDetails) {
        if (userDetails.role === "Admin") return <Navigate to="/admin"></Navigate>
        else return children;
    }

    // ---------- if user is null ----------
    // return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
     return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;