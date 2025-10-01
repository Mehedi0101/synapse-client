import { useState, useRef, useEffect, useContext } from "react";
import { MdOutlineLogout } from "react-icons/md";
import defaultUser from "../../../assets/default_user.jpg";
import AuthContext from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

const AdminHeader = () => {
    // ---------- data from auth provider ----------
    const { userDetails, logout } = useContext(AuthContext);

    // ---------- state of the dropdown ----------
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ---------- logout function ----------
    const handleLogOut = () => {

        // ---------- loading toast ----------
        const toastId = toast.loading('Creating account...');

        logout()
            .then(() => {
                // ---------- success toast ----------
                toast.success('Logged out', { id: toastId });
            })
            .catch(() => {
                // ---------- error toast ----------
                toast.error('Something went wrong', { id: toastId });
            })
    }

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
        <div className={"sticky top-0 right-0 flex sm:gap-4 gap-2 items-center justify-end text-sm lg:text-base pr-2 md:pr-5 pl-12 md:pl-5 py-1 md:py-3 border-b-1 border-b-gray-200 z-20 bg-white"}>

            {/* ---------- admin section container ---------- */}
            <div className="flex gap-4 md:gap-6 lg:gap-8 items-center min-w-fit relative">

                {/* ---------- avatar + dropdown wrapper ---------- */}
                <div className="relative" ref={dropdownRef}>

                    {/* ---------- avatar ---------- */}
                    <img
                        className="w-10 lg:w-12 h-10 lg:h-12 rounded-full object-cover cursor-pointer"
                        src={userDetails?.userImage || defaultUser}
                        alt="user"
                        onClick={() => setOpen(!open)}
                    />

                    {/* ---------- dropdown menu ---------- */}
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden text-dark-ash">


                                {/* ---------- logout ---------- */}
                                <button
                                    className="flex items-center gap-1 w-full text-left px-4 py-2 hover:text-primary cursor-pointer"
                                    onClick={() => {
                                        setOpen(false);
                                        handleLogOut();
                                    }}
                                >
                                    {/*---------- logout icon ----------*/}
                                    <MdOutlineLogout className="text-lg lg:text-xl" />
                                    Logout
                                </button>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
