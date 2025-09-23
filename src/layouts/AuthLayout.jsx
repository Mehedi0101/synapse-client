import { Outlet } from "react-router-dom";
import bgImg from "../assets/auth-bg-img.jpg";
import AuthHeader from "../components/auth_layout/AuthHeader";
import AuthFooter from "../components/auth_layout/AuthFooter";

const AuthLayout = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-no-repeat bg-center bg-fixed font-open-sans overflow-x-hidden"
            style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${bgImg})` }}
        >
            <div className="max-w-screen-2xl w-11/12 mx-auto">

                {/* header of auth layout */}
                <AuthHeader></AuthHeader>

                {/* dynamic content of auth layout*/}
                <Outlet></Outlet>

                {/* footer of auth layout */}
                <AuthFooter></AuthFooter>

            </div>
        </div>
    );
};

export default AuthLayout;