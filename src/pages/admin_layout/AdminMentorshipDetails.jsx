import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import defaultUser from "../../assets/default_user.jpg";
import { MdArrowBack } from "react-icons/md";
import { format } from "date-fns";

const AdminMentorshipDetails = () => {
    const { id } = useParams();

    // ---------- fetch mentorship details ----------
    const { data: mentorship, isPending } = useQuery({
        queryKey: ["mentorship-details", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/mentorship/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isPending) {
        return (
            <div className="mx-2 md:mx-5 my-8 text-semi-dark text-center">
                <p>Loading mentorship details...</p>
            </div>
        );
    }

    if (!mentorship) {
        return (
            <div className="mx-2 md:mx-5 my-8 text-semi-dark text-center">
                <p>No mentorship details found.</p>
            </div>
        );
    }

    return (
        <div className="mx-2 md:mx-5 my-8 text-semi-dark">
            {/* ---------- Back button ---------- */}
            <Link
                to="/admin/mentorship"
                className="flex items-center gap-2 text-primary hover:underline mb-6"
            >
                <MdArrowBack size={20} /> Back to Mentorship
            </Link>

            {/* ---------- Heading ---------- */}
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6 text-dark">
                Mentorship Request Details
            </h2>

            {/* ---------- Main card ---------- */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-8">
                {/* ---------- Student & Mentor Info ---------- */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* ---------- Student ---------- */}
                    <div className="flex items-center gap-4">
                        <img
                            src={mentorship.student?.userImage || defaultUser}
                            alt={mentorship.student?.name}
                            className="w-16 h-16 rounded-full object-cover shadow"
                        />
                        <div>
                            <p className="font-semibold text-lg text-dark">
                                {mentorship.student?.name}
                            </p>
                            <p className="text-sm text-green-600 font-medium">Student</p>
                        </div>
                    </div>

                    {/* ---------- Mentor ---------- */}
                    <div className="flex items-center gap-4">
                        <img
                            src={mentorship.mentor?.userImage || defaultUser}
                            alt={mentorship.mentor?.name}
                            className="w-16 h-16 rounded-full object-cover shadow"
                        />
                        <div>
                            <p className="font-semibold text-lg text-dark">
                                {mentorship.mentor?.name}
                            </p>
                            <p className="text-sm text-blue-600 font-medium">Mentor</p>
                        </div>
                    </div>
                </div>

                {/* ---------- Request Details ---------- */}
                <div className="space-y-4">
                    <h3 className="font-poppins font-semibold text-lg text-dark border-b pb-2">
                        Request Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-slate-500">Goal</p>
                            <p className="text-base font-medium">{mentorship.goal}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Status</p>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold 
                  ${mentorship.status === "pending"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : mentorship.status === "assigned"
                                            ? "bg-blue-100 text-blue-600"
                                            : mentorship.status === "accepted"
                                                ? "bg-green-100 text-green-600"
                                                : mentorship.status === "rejected"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {mentorship.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Requested At</p>
                            <p className="text-base font-medium">
                                {format(new Date(mentorship.createdAt), "MMMM dd, yyyy")}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Mentor's Current Load</p>
                            <p className="text-base font-medium">
                                {mentorship.mentorAcceptedCount} active mentorships
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">Description</p>
                        <p className="text-base mt-1">{mentorship.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMentorshipDetails;