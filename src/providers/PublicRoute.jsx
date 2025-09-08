import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Loading from "../pages/shared/Loading";

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // ---------- when loading state is true ----------
    if (loading) {
        return <Loading></Loading>
    }

    // ---------- after loading if user is not null ----------
    if (user) {
        return <Navigate to="/" />;
    }

    // ---------- after loading if user is null ----------
    return children;
};

export default PublicRoute;
