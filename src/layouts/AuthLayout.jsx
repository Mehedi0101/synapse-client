import { Outlet } from "react-router-dom";
import bgImg from "../assets/auth-bg-img.jpg";
import Header from "../components/auth_layout/Header";
import Footer from "../components/auth_layout/Footer";
import WelcomeText from "../components/auth_layout/WelcomeText";

const AuthLayout = () => {
    return (
        <div 
        className="min-h-screen bg-cover bg-no-repeat bg-center bg-fixed font-open-sans" 
        style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${bgImg})`}}
        >
            <section className="max-w-7xl w-11/12 mx-auto">
                <Header></Header>

                <Outlet></Outlet>

                <Footer></Footer>
            </section>
        </div>
    );
};

export default AuthLayout;