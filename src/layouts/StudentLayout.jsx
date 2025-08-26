import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import NavBarXlMd from "../components/shared/navigation_bar/NavBarXlMd";
import NavBarLg from "../components/shared/navigation_bar/NavBarLg";
import NavBarSm from "../components/shared/navigation_bar/NavBarSm";

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
            className="font-open-sans flex"
        >
            <section className="h-screen overflow-y-scroll scrollbar-none min-w-fit">
                <div className="block md:hidden">
                    <NavBarSm></NavBarSm>
                </div>
                <div className="hidden md:block xl:hidden 2xl:block">
                    <NavBarXlMd />
                </div>
                <div className='hidden xl:block 2xl:hidden'>
                    <NavBarLg></NavBarLg>
                </div>
            </section>
            <div className="max-w-screen-2xl mx-auto font-open-sans w-full">
                <div className="text-3xl">
                    Main
                </div>
            </div>
        </div>

    );
};

export default StudentLayout;