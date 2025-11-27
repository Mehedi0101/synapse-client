import { useContext, useState } from "react";
import defaultUser from "../../assets/default_user.jpg";
import { IoSearch } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import hourFormatConverter from "../../functions/formatTimeString";
import AuthContext from "../../contexts/AuthContext";

const AdminEvents = () => {

    const { user } = useContext(AuthContext);

    const [searchText, setSearchText] = useState("");

    // ---------- fetch all events ----------
    const {
        data: events = [],
        refetch: refetchEvents,
        isPending,
    } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get("http://localhost:5000/events", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
    });

    // ---------- function for delete event ----------
    const handleDeleteEvent = (eventId) => {

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
        <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Remove this event?</h2>
        <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">This event will no longer be visible to others on this platform.</p>
      `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then(async (result) => {

            // ---------- confirmed ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Removing Event...");

                // DELETE event request to server
                try {
                    const token = await user.getIdToken();
                    const { data } = await axios.delete(`http://localhost:5000/events/${eventId}`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        toast.success("Removed", { id: toastId });
                        refetchEvents();
                    }
                    else {
                        toast.error("Something went wrong", { id: toastId });
                    }
                }
                catch {
                    toast.error("Something went wrong", { id: toastId });
                }
            }
        });
    };

    // ---------- filter events ----------
    const filteredEvents =
        searchText.trim() === ""
            ? events
            : events.filter((event) =>
                (event?.title || "")
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );

    return (
        <div>
            {/* ---------- Heading ---------- */}
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6 text-dark">
                Manage Events
            </h2>

            {/* ---------- Search Bar ---------- */}
            <div className="relative mb-6 max-w-md">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-b border-gray-300 shadow-sm focus:outline-none transition"
                />
            </div>

            {/* ---------- Events Table ---------- */}
            <div className="overflow-x-scroll rounded-lg shadow-md">
                <table className="w-full text-left text-xs md:text-sm font-poppins">
                    <thead className="bg-gradient-to-r from-primary to-purple-500 text-white text-sm">
                        <tr>
                            <th className="py-3 px-4 font-semibold">#</th>
                            <th className="py-3 px-4 font-semibold">Event Name</th>
                            <th className="py-3 px-4 font-semibold">Event Creator</th>
                            <th className="py-3 px-4 font-semibold">Event Type</th>
                            <th className="py-3 px-4 font-semibold">Date</th>
                            <th className="py-3 px-4 font-semibold">Time</th>
                            <th className="py-3 px-4 font-semibold">Interested</th>
                            <th className="py-3 px-4 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* ---------- data loading? ---------- */}
                        {isPending ? (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-slate-500">

                                    {/* ---------- skeleton ---------- */}
                                    <TableSkeleton columns={8} />
                                </td>
                            </tr>
                        ) : filteredEvents?.length > 0 ? (
                            filteredEvents.map((event, idx) => (
                                <tr
                                    key={event._id}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-slate-100 transition border-b-1 border-slate-300`}
                                >
                                    {/* ---------- Serial No ---------- */}
                                    <td className="py-3 px-4">{idx + 1}</td>

                                    {/* ----------  Event name ---------- */}
                                    <td className="py-3 px-4 max-w-[220px] truncate">
                                        <Link
                                            title={event?.title}
                                            className="hover:underline hover:text-primary transition-all duration-200"
                                            to={`http://localhost:5173/admin/events/${event._id}`}
                                        >
                                            {event?.title || "N/A"}
                                        </Link>
                                    </td>

                                    {/* ----------  Event creator ---------- */}
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">

                                            {/* ---------- event creator image ---------- */}
                                            <img
                                                src={event?.creator?.userImage || defaultUser}
                                                onError={(e) => { e.currentTarget.src = defaultUser; }}
                                                alt="creator"
                                                className="w-7 h-7 rounded-full object-cover"
                                            />
                                            <span className="truncate max-w-[100px]">
                                                {/* ---------- event creator name ---------- */}
                                                <Link
                                                    title={event?.creator?.name}
                                                    className="hover:underline hover:text-primary transition-all duration-200"
                                                    to={`http://localhost:5173/admin/users/${event?.creator?._id}`}
                                                >
                                                    {event?.creator?.name || "N/A"}
                                                </Link>
                                            </span>
                                        </div>
                                    </td>

                                    {/* ---------- Event type ---------- */}
                                    <td
                                        className={`py-3 px-4 ${event?.type === "Online"
                                            ? "text-green-600"
                                            : "text-blue-600"
                                            }`}
                                    >
                                        {event?.type}
                                    </td>

                                    {/* ---------- Date ---------- */}
                                    <td className="py-3 px-4">
                                        {event?.date ? format(new Date(event.date), "MMMM dd, yyyy") : "N/A"}
                                    </td>

                                    {/* ---------- Time ---------- */}
                                    <td className="py-3 px-4">
                                        {hourFormatConverter(event?.timeRange?.start)} - {hourFormatConverter(event?.timeRange?.end)}
                                    </td>

                                    {/* ---------- Interested Members ---------- */}
                                    <td className="py-3 px-4 text-center">
                                        {event?.interestedCount || 0}
                                    </td>

                                    {/* ---------- Action ---------- */}
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => handleDeleteEvent(event._id)}
                                            className="text-red-500 hover:text-red-700 transition cursor-pointer"
                                        >
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                {/* ---------- no events found ---------- */}
                                <td
                                    colSpan="8"
                                    className="text-center py-6 text-slate-500 font-poppins"
                                >
                                    No events found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEvents;