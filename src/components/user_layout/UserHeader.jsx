import { useState, useRef, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineLogout, MdOutlineNotifications, MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import defaultUser from "../../assets/default_user.jpg";
import { CgProfile } from "react-icons/cg";

const UserHeader = () => {

    // ---------- state of the dropdown ----------
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ---------- click outside to close ----------
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        // ---------- header container ----------
        <div className={"sticky top-0 right-0 flex sm:gap-4 gap-2 items-center justify-between text-sm lg:text-base pr-2 md:pr-5 pl-12 md:pl-5 py-1 md:py-3 bg-white border-b-1 border-b-gray-200"}>

            {/* ---------- search bar ---------- */}
            <div className="flex items-center w-full">

                {/*---------- search icon ----------*/}
                <MdOutlineSearch className="text-lg lg:text-xl text-ash" />
                <input
                    className="-ml-5 pl-6 py-2.5 w-full outline-none focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Search..."
                />
            </div>

            {/* ---------- notification and user section container ---------- */}
            <div className="flex gap-4 md:gap-6 lg:gap-8 items-center min-w-fit relative">

                {/* ---------- notification container ---------- */}
                <div className="hidden sm:block relative cursor-pointer">

                    {/* ---------- notification icon ---------- */}
                    <IoIosNotificationsOutline className="text-2xl lg:text-3xl text-dark-ash" />

                    {/* ---------- notification dot ---------- */}
                    {/* <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span> */}

                    {/* ---------- notification number ---------- */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] lg:text-[10px] font-bold w-3 lg:w-4 h-3 lg:h-4 rounded-full flex justify-center items-center">
                        3
                    </span>

                </div>

                {/* ---------- avatar + dropdown wrapper ---------- */}
                <div className="relative" ref={dropdownRef}>

                    {/* ---------- avatar ---------- */}
                    <img
                        className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 rounded-full object-cover cursor-pointer"
                        src={defaultUser}
                        alt="user"
                        onClick={() => setOpen(!open)}
                    />

                    {/* ---------- dropdown menu ---------- */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden text-dark-ash">

                            {/* ---------- notification (only form small devices) ---------- */}
                            <Link
                                to="#"
                                className="flex sm:hidden items-center gap-1 px-4 py-2 hover:text-primary"
                                onClick={() => setOpen(false)}
                            >
                                {/*---------- notification icon ----------*/}
                                <MdOutlineNotifications className="text-lg" />
                                Notifications <span className="text-red-500">(3)</span>
                            </Link>

                            {/* ---------- profile ---------- */}
                            <Link
                                to="/profile"
                                className="flex items-center gap-1 px-4 py-2 hover:text-primary"
                                onClick={() => setOpen(false)}
                            >

                                {/*---------- profile icon ----------*/}
                                <CgProfile className="text-lg lg:text-xl" />
                                Profile
                            </Link>

                            {/* ---------- logout ---------- */}
                            <button
                                className="flex items-center gap-1 w-full text-left px-4 py-2 hover:text-primary"
                                onClick={() => {
                                    setOpen(false);
                                    console.log("Logged out");
                                }}
                            >
                                {/*---------- logout icon ----------*/}
                                <MdOutlineLogout className="text-lg lg:text-xl" />
                                Logout
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserHeader;
