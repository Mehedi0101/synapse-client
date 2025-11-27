import NavBarXlMd from "../components/shared/navigation_bar/NavBarXlMd";
import NavBarLg from "../components/shared/navigation_bar/NavBarLg";
import NavBarSm from "../components/shared/navigation_bar/NavBarSm";
import { Outlet } from "react-router-dom";
import ScrollManager from "../hooks/scrollManager";

const UserLayout = () => {

    return (
        <>
            <ScrollManager></ScrollManager>
            
            <div className="font-open-sans flex">
                {/* ---------- Navigation bar container ---------- */}
                <section className="sticky top-0 left-0 h-screen overflow-y-scroll scrollbar-none min-w-fit z-30">

                    {/*---------- Navigation bar for small device ----------*/}
                    <div className="block md:hidden">
                        <NavBarSm></NavBarSm>
                    </div>

                    {/*---------- Navigation bar for medium and very large devices ----------*/}
                    <div className="hidden md:block xl:hidden 2xl:block">
                        <NavBarXlMd />
                    </div>

                    {/*---------- Navigation bar for large devices ----------*/}
                    <div className='hidden xl:block 2xl:hidden'>
                        <NavBarLg></NavBarLg>
                    </div>

                </section>

                {/* ---------- Dynamic content of User Layout ---------- */}
                <div className="max-w-screen-2xl mx-auto w-full">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default UserLayout;