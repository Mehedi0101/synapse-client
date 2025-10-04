import { Outlet } from "react-router-dom";
import AdminNavBarLg from "../components/shared/navigation_bar/AdminNavBarLg";
import AdminNavBarSm from "../components/shared/navigation_bar/AdminNavBarSm";
import AdminNavBarXlMd from "../components/shared/navigation_bar/AdminNavBarXlMd";
import AdminHeader from "../components/admin_layout/shared/AdminHeader";

const AdminLayout = () => {

    return (
        <div
            className="font-open-sans flex"
        >

            {/* ---------- Navigation bar container ---------- */}
            <section className="sticky top-0 left-0 h-screen overflow-y-scroll scrollbar-none min-w-fit z-30">

                {/*---------- Navigation bar for small device ----------*/}
                <div className="block md:hidden">
                    <AdminNavBarSm></AdminNavBarSm>
                </div>

                {/*---------- Navigation bar for medium and very large devices ----------*/}
                <div className="hidden md:block xl:hidden 2xl:block">
                    <AdminNavBarXlMd />
                </div>

                {/*---------- Navigation bar for large devices ----------*/}
                <div className='hidden xl:block 2xl:hidden'>
                    <AdminNavBarLg></AdminNavBarLg>
                </div>

            </section>

            {/* ---------- Dynamic content of User Layout ---------- */}
            <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
                <AdminHeader></AdminHeader>
                <div className="flex-1 px-2 md:px-5 py-6 overflow-x-auto text-semi-dark">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>

    );
};

export default AdminLayout;