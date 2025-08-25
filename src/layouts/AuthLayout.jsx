import { Outlet } from "react-router-dom";
import bgImg from "../assets/auth-bg-img.jpg";
import Header from "../components/auth_layout/Header";
import Footer from "../components/auth_layout/Footer";

const AuthLayout = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-no-repeat bg-center bg-fixed font-open-sans"
            style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${bgImg})` }}
        >
            <div className="max-w-screen-2xl w-11/12 mx-auto">

                {/* fixed header of auth layout */}
                <Header></Header>

                {/* dynamic content of auth layout*/}
                <Outlet></Outlet>

                {/* fixed footer of auth layout */}
                <Footer></Footer>

            </div>
        </div>
    );
};

export default AuthLayout;