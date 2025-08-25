import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import NavbarLg from "../components/shared/NavbarLg";
import bgImg from "../assets/auth-bg-img.jpg";

const StudentLayout = () => {
    // const { user, logout } = useContext(AuthContext);

    // const handleLogOut = () => {
    //     logout()
    //         .then(() => {

    //         })
    //         .catch(() => {

    //         })
    // }



    return (
        <div
            className="min-h-screen bg-cover bg-no-repeat bg-center bg-fixed font-open-sans"
            style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${bgImg})` }}
        >
            <div className="max-w-screen-2xl mx-auto flex font-open-sans">
                <section className="h-screen overflow-y-scroll scrollbar-none bg-white">
                    <NavbarLg></NavbarLg>
                </section>
                <div className="">
                    Main
                </div>
            </div>
        </div>

    );
};

export default StudentLayout;