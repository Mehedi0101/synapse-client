import { useState, useRef, useEffect, useContext } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineLogout, MdOutlineNotifications, MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import defaultUser from "../../../assets/default_user.jpg";
import { CgProfile } from "react-icons/cg";
import AuthContext from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const UserHeader = ({ searchBar = "", display = "" }) => {

    // ---------- user details and logout from auth provider ----------
    const { userDetails, logout, user } = useContext(AuthContext);

    // ---------- avatar dropdown status ----------
    const [open, setOpen] = useState(false);

    // ---------- notification status ----------
    const [notificationOpen, setNotificationOpen] = useState(false);

    // ---------- hooks ----------
    const dropdownRef = useRef(null);
    const NotificationRef = useRef(null);
    const queryClient = useQueryClient();

    // ---------- Fetch Notifications ----------
    const { data: notifications = [] } = useQuery({
        queryKey: ["notifications", userDetails?._id],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:5000/notifications/${userDetails._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        enabled: !!userDetails?._id,
        refetchInterval: 5000, // optional: poll every 5 sec
    });

    // ---------- Delete Notifications ----------
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = await user.getIdToken();
            await axios.delete(`http://localhost:5000/notifications/${userDetails._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications", userDetails._id]);
        },
    });

    // ---------- Logout Function ----------
    const handleLogOut = () => {
        const toastId = toast.loading("Logging out...");
        logout()
            .then(() => toast.success("Logged out", { id: toastId }))
            .catch(() => toast.error("Something went wrong", { id: toastId }));
    };

    // ---------- Close dropdowns when clicking outside ----------
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                NotificationRef.current &&
                !NotificationRef.current.contains(event.target)
            ) {
                if (notificationOpen) {
                    setNotificationOpen(false);
                    // delete notifications when closing
                    if (notifications.length > 0) deleteMutation.mutate();
                }
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [notificationOpen, notifications, deleteMutation]);

    // ---------- SweetAlert for Small Devices ----------
    const handleMobileNotifications = async () => {
        if (!notifications.length) {
            Swal.fire({
                icon: "info",
                title: "No new notifications",
                timer: 1500,
                showConfirmButton: false,
            });
            return;
        }

        const htmlList = notifications
            .map((n) => `<li class="text-left mb-1">${n.message}</li>`)
            .join("");

        await Swal.fire({
            title: "Notifications",
            html: `<ul class="list-disc pl-5 text-gray-700 text-sm">${htmlList}</ul>`,
            confirmButtonText: "Close",
            confirmButtonColor: "#3B82F6",
        });

        // delete after closing
        deleteMutation.mutate();
    };

    return (
        <div
            className={`${display === "hidden" && "hidden"} sticky top-0 right-0 flex sm:gap-4 gap-2 items-center justify-between text-sm lg:text-base pr-2 md:pr-5 pl-12 md:pl-5 py-1 md:py-3 bg-white border-b border-gray-200 z-20`}
        >
            {/* ---------- Search Bar ---------- */}
            <div className={`flex items-center w-full ${searchBar}`}>
                <MdOutlineSearch className="text-lg lg:text-xl text-ash" />
                <input
                    className="-ml-5 pl-6 py-2.5 w-full outline-none focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Search..."
                />
            </div>

            {/* ---------- Notification + User Section ---------- */}
            <div className="flex gap-4 md:gap-6 lg:gap-8 items-center min-w-fit relative">

                {/* ---------- Notification Icon (Desktop) ---------- */}
                <div
                    className="hidden sm:block relative cursor-pointer"
                    onClick={() => {
                        if (notificationOpen && notifications.length > 0) {
                            // user is closing the dropdown (delete notifications)
                            deleteMutation.mutate();
                        }
                        setNotificationOpen(!notificationOpen);
                    }}
                    ref={NotificationRef}
                >
                    <IoIosNotificationsOutline className="text-2xl lg:text-3xl text-dark-ash" />

                    {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] lg:text-[10px] font-bold w-3.5 lg:w-4 h-3.5 lg:h-4 rounded-full flex justify-center items-center">
                            {notifications.length > 9 ? "9+" : notifications.length}
                        </span>
                    )}

                    {/* ---------- Notification Dropdown ---------- */}
                    <AnimatePresence>
                        {notificationOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 z-50 max-h-80 overflow-y-auto"
                            >
                                {notifications.length === 0 ? (
                                    <p className="text-sm text-center text-gray-500 py-3">
                                        No new notifications
                                    </p>
                                ) : (
                                    notifications.map((n, i) => (
                                        <div
                                            key={i}
                                            className="px-8 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b border-slate-200 last:border-none"
                                        >
                                            {n.message}
                                        </div>
                                    ))
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ---------- Avatar + Dropdown ---------- */}
                <div className="relative" ref={dropdownRef}>
                    <img
                        className="w-10 lg:w-12 h-10 lg:h-12 rounded-full object-cover cursor-pointer"
                        src={userDetails?.userImage || defaultUser}
                        onError={(e) => { e.currentTarget.src = defaultUser; }}
                        alt="user"
                        onClick={() => setOpen(!open)}
                    />

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden text-dark-ash"
                            >
                                {/* ---------- Notifications (Mobile only) ---------- */}
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        handleMobileNotifications();
                                    }}
                                    className="flex sm:hidden items-center gap-1 px-4 py-2 hover:text-primary w-full text-left"
                                >
                                    <MdOutlineNotifications className="text-lg" />
                                    Notifications{" "}
                                    {notifications.length > 0 && (
                                        <span className="text-red-500">
                                            ({notifications.length})
                                        </span>
                                    )}
                                </button>

                                {/* ---------- Profile ---------- */}
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-1 px-4 py-2 hover:text-primary"
                                    onClick={() => setOpen(false)}
                                >
                                    <CgProfile className="text-lg lg:text-xl" />
                                    Profile
                                </Link>

                                {/* ---------- Logout ---------- */}
                                <button
                                    className="flex items-center gap-1 w-full text-left px-4 py-2 hover:text-primary cursor-pointer"
                                    onClick={() => {
                                        setOpen(false);
                                        handleLogOut();
                                    }}
                                >
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

export default UserHeader;