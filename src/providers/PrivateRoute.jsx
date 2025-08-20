import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Loading from '../pages/Loading';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading></Loading>
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default PrivateRoute;