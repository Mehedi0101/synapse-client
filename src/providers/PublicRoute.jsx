import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Loading from "../pages/shared/Loading";

const PublicRoute = ({ children }) => {
    const { user, loading, userDetailsPending, userDetails } = useContext(AuthContext);

    // ---------- when loading state is true ----------
    if (loading || (user && userDetailsPending)) {
        return <Loading />;
    }

    // ---------- after loading if user is not null ----------
    if (user && userDetails) {
        return <Navigate to="/" />;
    }

    // ---------- after loading if user is null ----------
    return children;
};

export default PublicRoute;
