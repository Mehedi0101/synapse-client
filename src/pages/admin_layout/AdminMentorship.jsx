import { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import defaultUser from "../../assets/default_user.jpg";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import AuthContext from "../../contexts/AuthContext";

const AdminMentorships = () => {

    const { user } = useContext(AuthContext);

    // ---------- search text state ----------
    const [searchText, setSearchText] = useState("");

    // ---------- fetch all mentorship requests ----------
    const { data: mentorships = [], isPending, refetch } = useQuery({
        queryKey: ["mentorships"],
        queryFn: async () => {

            const token = await user.getIdToken();
            const res = await axios.get("http://localhost:5000/mentorship", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
    });

    // ---------- delete mentorship ----------
    const handleDelete = (id) => {

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight:bold;">Delete Mentorship Request?</h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px;margin-top:8px;">This action cannot be undone.</p>
                `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then(async (result) => {

            // ---------- if confirmed ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Deleting request...");

                // ---------- delete request to server ----------
                try {
                    const token = await user.getIdToken();
                    const { data } = await axios.delete(`http://localhost:5000/mentorship/${id}`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        toast.success("Request deleted", { id: toastId });
                        refetch();
                    }
                    else {
                        toast.error("Failed to delete request", { id: toastId });
                    }
                }
                catch {
                    toast.error("Failed to delete request", { id: toastId });
                }
            }
        });
    };

    // ---------- handle status change ----------
    const handleStatusChange = (id, currentStatus, newStatus, resetSelect) => {

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight:bold;">Change Status?</h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px;margin-top:8px;">Are you sure you want to update status to <strong>${newStatus}</strong>?</p>
                `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then(async (result) => {

            // ---------- if confirmed ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Updating status...");

                // ---------- patch request to server to update status ----------
                try {
                    const token = await user.getIdToken();
                    const { data } = await axios.patch(`http://localhost:5000/mentorship/${id}`, { status: newStatus }, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        toast.success("Status updated", { id: toastId });
                        refetch();
                    }
                    else {
                        toast.error("Failed to update status", { id: toastId });
                        resetSelect(currentStatus);
                    }

                }
                catch {
                    toast.error("Something went wrong", { id: toastId });
                    resetSelect(currentStatus);
                }
            } else {
                resetSelect(currentStatus);
            }
        });
    };

    // ---------- filter by search ----------
    const filteredMentorships =
        searchText.trim() === ""
            ? mentorships
            : mentorships.filter((m) =>
                (m?.student?.name || "")
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );

    // ---------- status color ----------
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "text-amber-600 bg-amber-100";
            case "assigned":
                return "text-blue-600 bg-blue-100";
            case "accepted":
                return "text-emerald-600 bg-emerald-100";
            case "rejected":
                return "text-red-600 bg-red-100";
            case "completed":
                return "text-purple-700 bg-purple-100";
            case "cancelled":
                return "text-gray-600 bg-gray-200";
            default:
                return "text-slate-600 bg-slate-100";
        }
    };

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Mentorship";
    }, []);

    return (
        <div>
            {/* ---------- Heading ---------- */}
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6 text-dark">
                Manage Mentorship Requests
            </h2>

            {/* ---------- Search Bar ---------- */}
            <div className="relative mb-6 max-w-md">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                    type="text"
                    placeholder="Search by student..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-b border-gray-300 shadow-sm focus:outline-none transition"
                />
            </div>

            {/* ---------- Table ---------- */}
            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="w-full text-left text-xs md:text-sm font-poppins">
                    <thead className="bg-gradient-to-r from-primary to-purple-500 text-white text-sm">
                        <tr>
                            <th className="py-3 px-4 font-semibold">#</th>
                            <th className="py-3 px-4 font-semibold">Student</th>
                            <th className="py-3 px-4 font-semibold">Alumni</th>
                            <th className="py-3 px-4 font-semibold">Goal</th>
                            <th className="py-3 px-4 font-semibold">Requested On</th>
                            <th className="py-3 px-4 font-semibold">Status</th>
                            <th className="py-3 px-4 font-semibold text-center">Change Status</th>
                            <th className="py-3 px-4 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isPending ? (

                            // ---------- skeleton if data loading ----------
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-slate-500">
                                    <TableSkeleton columns={8} />
                                </td>
                            </tr>
                        ) : filteredMentorships?.length > 0 ? (
                            filteredMentorships.map((m, idx) => (
                                <tr
                                    key={m._id}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-slate-100 transition`}
                                >
                                    {/* ---------- serial no ---------- */}
                                    <td className="py-3 px-4">{idx + 1}</td>

                                    {/* ---------- student ---------- */}
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">

                                            {/* ---------- student image ---------- */}
                                            <img
                                                src={m?.student?.userImage || defaultUser}
                                                onError={(e) => { e.currentTarget.src = defaultUser; }}
                                                alt="student"
                                                className="w-7 h-7 rounded-full object-cover"
                                            />

                                            {/* ---------- student name ---------- */}
                                            <Link
                                                title={m?.student?.name}
                                                to={`/admin/users/${m?.student?._id}`}
                                                className="hover:underline hover:text-primary transition-all duration-200"
                                            >
                                                <span className="truncate max-w-[120px]">{m?.student?.name}</span>
                                            </Link>
                                        </div>
                                    </td>

                                    {/* ---------- mentor ---------- */}
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">

                                            {/* ---------- mentor image ---------- */}
                                            <img
                                                src={m?.mentor?.userImage || defaultUser}
                                                onError={(e) => { e.currentTarget.src = defaultUser; }}
                                                alt="alumni"
                                                className="w-7 h-7 rounded-full object-cover"
                                            />

                                            {/* ---------- mentor name ---------- */}
                                            <Link
                                                title={m?.mentor?.name}
                                                to={`/admin/users/${m?.mentor?._id}`}
                                                className="hover:underline hover:text-primary transition-all duration-200"
                                            >
                                                <span className="truncate max-w-[120px]">{m?.mentor?.name}</span>
                                            </Link>
                                        </div>
                                    </td>

                                    {/* ---------- goal ---------- */}
                                    <td className="py-3 px-4 max-w-[200px] truncate" title={m?.goal}>
                                        <Link
                                            title={m?.mentor?.name}
                                            to={`/admin/mentorship/${m._id}`}
                                            className="hover:underline hover:text-primary transition-all duration-200"
                                        >
                                            {m?.goal}
                                        </Link>
                                    </td>

                                    {/* ---------- requested on ---------- */}
                                    <td className="py-3 px-4">
                                        {m?.createdAt ? format(new Date(m.createdAt), "MMMM dd, yyyy") : "N/A"}
                                    </td>

                                    {/* ---------- status ---------- */}
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                m?.status
                                            )}`}
                                        >
                                            {m?.status}
                                        </span>
                                    </td>

                                    {/* ---------- change status ---------- */}
                                    <td className="py-3 px-4 text-center">
                                        <select
                                            value={m.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    m._id,
                                                    m.status, // current status
                                                    e.target.value,
                                                    (status) => (e.target.value = status) // resetSelect
                                                )
                                            }
                                            disabled={m.status !== "pending"}
                                            className="border rounded px-2 py-1 text-xs cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="assigned">Assigned</option>
                                            <option value="cancelled" disabled>Cancelled</option>
                                            <option value="rejected" disabled>Rejected</option>
                                            <option value="completed" disabled>Completed</option>
                                            <option value="accepted" disabled>Accepted</option>
                                        </select>
                                    </td>

                                    {/* ---------- delete ---------- */}
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(m._id);
                                            }}
                                            className="text-red-500 hover:text-red-700 transition cursor-pointer"
                                        >
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>

                                {/* ---------- if no mentorship data ---------- */}
                                <td
                                    colSpan="8"
                                    className="text-center py-6 text-slate-500 font-poppins"
                                >
                                    No mentorship requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMentorships;