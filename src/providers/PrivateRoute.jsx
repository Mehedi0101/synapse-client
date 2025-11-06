import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Loading from '../pages/shared/Loading';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    // ---------- data from auth provider ----------
    const { user, userDetails, loading, userDetailsPending } = useContext(AuthContext);

    // ---------- when loading state is true ----------
    if (loading || (user && userDetailsPending)) {
        return <Loading />;
    }

    // ---------- after loading if user is not null ----------
    if (user && userDetails) {
        if (userDetails.role === "Admin") return <Navigate to="/admin"></Navigate>
        else return children;
    }

    // ---------- if user is null ----------
    return <Navigate to="/auth/login"></Navigate>;
};

export default PrivateRoute;