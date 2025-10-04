import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import defaultUser from "../../assets/default_user.jpg";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const AdminUsers = () => {

    // ---------- user details from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- search box content ----------
    const [searchText, setSearchText] = useState("");

    // ---------- Fetch all users ----------
    const {
        data: users = [],
        refetch: refetchUsers,
        isPending,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/users");
            return res.data;
        },
    });

    // ---------- function for removing user ----------
    const handleRemoveUser = (userId) => {

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Remove this account?</h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">This user will no longer be able to access the platform.</p>
            `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {

                // ---------- after confirmation ----------
                const toastId = toast.loading("Removing account...");
                axios
                    .delete(`http://localhost:5000/users/${userId}`)
                    .then((data) => {
                        if (data.data?.acknowledged) {
                            toast.success("Account removed", { id: toastId });
                            refetchUsers();
                        } else {
                            toast.error("Something went wrong", { id: toastId });
                        }
                    })
                    .catch(() => {
                        toast.error("Something went wrong", { id: toastId });
                    });
            }
        });
    };

    // ---------- Handle role change ----------
    const handleChangeRole = (userId, currentRole, newRole, resetSelect) => {

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">
                        Change user role?
                    </h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">
                        Are you sure you want to set this user's role to <strong>${newRole}</strong>?
                    </p>
                `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then((result) => {

            // ---------- after confirmation ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Updating role...");

                axios
                    .patch(`http://localhost:5000/users/${userId}`, { role: newRole })
                    .then((data) => {
                        if (data.data?.acknowledged) {
                            toast.success("Role updated", { id: toastId });
                            refetchUsers();
                        } else {
                            toast.error("Failed to update role", { id: toastId });
                            resetSelect(currentRole);
                        }
                    })
                    .catch(() => {
                        toast.error("Something went wrong", { id: toastId });
                        resetSelect(currentRole);
                    });
            } else {

                // ---------- if cancelled, reset to current role ----------
                resetSelect(currentRole);
            }
        });
    };

    // ---------- Filter users ----------
    const filteredUsers =
        searchText.trim() === ""
            ? users
            : users.filter(
                (user) =>
                    (user?.name || "")
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    (user?.email || "")
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
            );

    return (
        <div>
            {/* ---------- Heading ---------- */}
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6 text-dark">
                Manage Users
            </h2>

            {/* ---------- Search Bar ---------- */}
            <div className="relative mb-6 max-w-md">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-b border-gray-300 shadow-sm focus:outline-none transition"
                />
            </div>

            {/* ---------- Users Table ---------- */}
            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="w-full text-left text-xs md:text-sm font-poppins">
                    <thead className="bg-gradient-to-r from-primary to-purple-500 text-white text-sm">
                        <tr>
                            <th className="py-3 px-4 font-semibold">#</th>
                            <th className="py-3 px-4 font-semibold">User</th>
                            <th className="py-3 px-4 font-semibold">Email</th>
                            <th className="py-3 px-4 font-semibold">Role</th>
                            <th className="py-3 px-4 font-semibold">Department</th>
                            <th className="py-3 px-4 font-semibold text-center">
                                Change Role
                            </th>
                            <th className="py-3 px-4 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* ---------- data loading? ---------- */}
                        {isPending ? (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-slate-500">

                                    {/* ---------- skeleton ---------- */}
                                    <TableSkeleton columns={7} />
                                </td>
                            </tr>
                        ) : filteredUsers?.length > 0 ? (
                            filteredUsers.map((user, idx) => (
                                <tr
                                    key={user._id}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-slate-100 transition`}
                                >
                                    {/* ---------- serial no ---------- */}
                                    <td className="py-3 px-4">{idx + 1}</td>

                                    {/* ---------- User ---------- */}
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">

                                            {/* ---------- user image ---------- */}
                                            <img
                                                src={user?.userImage || defaultUser}
                                                alt="avatar"
                                                className="w-7 h-7 rounded-full object-cover"
                                            />
                                            <span className="truncate max-w-[120px]">

                                                {/* ---------- user name ---------- */}
                                                <Link
                                                    title={user?.name}
                                                    to={`/admin/users/${user?._id}`}
                                                    className="hover:underline hover:text-primary transition-all duration-200"
                                                >
                                                    {user?.name || "N/A"}
                                                </Link>
                                            </span>
                                        </div>
                                    </td>

                                    {/* ---------- Email ---------- */}
                                    <td className="py-3 px-4 max-w-[200px] truncate">
                                        {user?.email}
                                    </td>

                                    {/* ---------- Role ---------- */}
                                    <td
                                        className={`py-3 px-4 font-semibold ${user?.role === "Admin"
                                            ? "text-red-600"
                                            : user?.role === "Alumni"
                                                ? "text-blue-600"
                                                : user?.role === "Student"
                                                    ? "text-green-600"
                                                    : "text-slate-600"
                                            }`}
                                    >
                                        {user?.role || "N/A"}
                                    </td>

                                    {/* ---------- Department ---------- */}
                                    <td className="py-3 px-4">{user?.department || "N/A"}</td>

                                    {/* ---------- Change Role ---------- */}
                                    <td className="py-3 px-4">
                                        {user?._id === userDetails?._id ? (
                                            <span className="font-semibold text-red-600">
                                                {user.role}
                                            </span>
                                        ) : (
                                            <select
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleChangeRole(user._id, user.role, e.target.value, (role) => (e.target.value = role))}
                                                className="border rounded px-2 py-1 text-xs cursor-pointer"
                                                disabled={user._id === userDetails?._id} // disable if current logged-in user
                                            >
                                                <option value="Student">Student</option>
                                                <option value="Alumni">Alumni</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        )}
                                    </td>

                                    {/* ---------- Action ---------- */}
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => handleRemoveUser(user._id)}
                                            className="text-red-500 hover:text-red-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={user._id === userDetails?._id} // disable if current logged-in user
                                        >
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (

                            // ---------- no users found ----------
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-6 text-slate-500 font-poppins"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;