import { useState } from "react";
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

const AdminJobs = () => {

    // ---------- search text in the search box ----------
    const [searchText, setSearchText] = useState("");

    // ---------- fetch all jobs ----------
    const { data: jobs = [], refetch: refetchJobs, isPending } = useQuery({
        queryKey: ["jobs"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/jobs");
            return res.data;
        },
    });

    const handleDeleteJob = jobId => {
        // ---------- sweet alert for confirmation ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Remove this job post?</h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">This job will no longer be visible to others on this platform.</p>
                `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then((result) => {

            // ---------- when confirmed ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Removing Job Post...");

                // ---------- delete request to backend ----------
                axios.delete(`http://localhost:5000/jobs/${jobId}`)
                    .then((data) => {
                        if (data.data?.acknowledged) {
                            toast.success("Removed", { id: toastId });
                            refetchJobs();
                        } else {
                            toast.error("Something went wrong", { id: toastId });
                        }
                    })
                    .catch(() => {
                        toast.error("Something went wrong", { id: toastId });
                    });
            }
        });
    }

    // ---------- filtered jobs based on search text ----------
    const filteredJobs = searchText.trim() === "" ?
        jobs
        :
        jobs.filter((job) =>
            (job?.jobTitle || "")
                .toLowerCase()
                .includes(searchText.toLowerCase())
        );

    return (
        <div>
            {/* ---------- Heading ---------- */}
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6 text-dark">
                Manage Job Posts
            </h2>

            {/* ---------- Search Bar ---------- */}
            <div className="relative mb-6 max-w-md">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-b border-gray-300 shadow-sm focus:outline-none transition"
                />
            </div>

            {/* ---------- Jobs Table ---------- */}

            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="w-full text-left text-xs md:text-sm font-poppins">

                    {/* ---------- table heading ---------- */}
                    <thead className="bg-gradient-to-r from-primary to-purple-500 text-white text-sm">
                        <tr>
                            <th className="py-3 px-4 font-semibold">#</th>
                            <th className="py-3 px-4 font-semibold">Job Title</th>
                            <th className="py-3 px-4 font-semibold">Posted By</th>
                            <th className="py-3 px-4 font-semibold">Company</th>
                            <th className="py-3 px-4 font-semibold">Job Type</th>
                            <th className="py-3 px-4 font-semibold">Category</th>
                            <th className="py-3 px-4 font-semibold">Posted Date</th>
                            <th className="py-3 px-4 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // ---------- data loading? ----------
                            isPending ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-6 text-slate-500">
                                        {/* ---------- skeleton ---------- */}
                                        <TableSkeleton columns={8}></TableSkeleton>
                                    </td>
                                </tr>
                            ) : filteredJobs?.length > 0 ? (
                                filteredJobs?.map((job, idx) => (
                                    <tr
                                        key={job._id}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-slate-100 transition border-b-1 border-slate-300`}
                                    >
                                        {/* ---------- Serial no ---------- */}
                                        <td className="py-3 px-4">{idx + 1}</td>

                                        {/* ---------- Job title ---------- */}
                                        <td className="py-3 px-4 max-w-[220px] truncate">
                                            <Link title={job?.jobTitle} className="hover:underline hover:text-primary transition-all duration-200" to={`http://localhost:5173/admin/jobs/${job._id}`}>{job?.jobTitle || "N/A"}</Link>
                                        </td>

                                        {/* ---------- Posted by ---------- */}
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">

                                                {/* ---------- job poster's image ---------- */}
                                                <img
                                                    src={job?.author?.userImage || defaultUser}
                                                    onError={(e) => { e.currentTarget.src = defaultUser; }}
                                                    alt="avatar"
                                                    className="w-7 h-7 rounded-full object-cover"
                                                />

                                                {/* ---------- job poster's name ---------- */}
                                                <span className="truncate max-w-[100px]">
                                                    <Link title={job?.author?.name} className="hover:underline hover:text-primary transition-all duration-200" to={`http://localhost:5173/admin/users/${job?.author?._id}`}>{job?.author?.name || "N/A"}</Link>
                                                </span>
                                            </div>
                                        </td>

                                        {/* ---------- Company ---------- */}
                                        <td className="py-3 px-4">{job?.company?.name || "N/A"}</td>

                                        {/* ---------- Job type ---------- */}
                                        <td className={`py-3 px-4 ${job?.jobType === "Full-time"
                                            ? "text-green-600"
                                            : job?.jobType === "Part-time"
                                                ? "text-blue-600"
                                                : job?.jobType === "Internship"
                                                    ? "text-orange-500"
                                                    : job?.jobType === "Contract"
                                                        ? "text-red-600"
                                                        : job?.jobType === "Remote"
                                                            ? "text-pink-600"
                                                            : "text-slate-600"
                                            }`}>{job?.jobType}</td>

                                        {/* ---------- Category ---------- */}
                                        <td className="py-3 px-4">{job?.category}</td>

                                        {/* ---------- Posted date ---------- */}
                                        <td className="py-3 px-4">{format(new Date(job.createdAt), "MMMM dd, yyyy")}</td>

                                        {/* ---------- Action ---------- */}
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                onClick={() => handleDeleteJob(job._id)}
                                                className="text-red-500 hover:text-red-700 transition cursor-pointer"
                                            >
                                                <MdDeleteOutline size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    {/* ---------- if no jobs found ---------- */}
                                    <td
                                        colSpan="8"
                                        className="text-center py-6 text-slate-500 font-poppins"
                                    >
                                        No jobs found.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminJobs;