import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Loading from '../pages/Loading';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    // ---------- data from auth provider ----------
    const { user, loading } = useContext(AuthContext);

    // ---------- when loading state is true ----------
    if (loading) {
        return <Loading></Loading>
    }

    // ---------- after loading if user is not null ----------
    if (user) {
        return children;
    }

    // ---------- if user is null ----------
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default PrivateRoute;