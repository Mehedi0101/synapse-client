import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import mentorSvg from "../../assets/mentor.svg";
import menteeSvg from "../../assets/mentee.svg";
import pendingSvg from "../../assets/pending.svg";


const UserMentorship = () => {
    // ---------- user details from context ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- role based rendering ----------
    const isStudent = userDetails?.role === "Student";
    const isAlumni = userDetails?.role === "Alumni";

    // ---------- fetch mentorship data of current user ----------
    const { data: mentorship = null } = useQuery({
        queryKey: ["mentorship", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/mentorship/student/${userDetails?._id}`);
            return res.data;
        },
        enabled: !!userDetails?._id
    })

    console.log(mentorship);

    return (
        <div>
            {/* ---------- user header without searchbar ---------- */}
            <UserHeader searchBar="invisible"></UserHeader>

            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                {/* ---------- Heading ---------- */}
                <h2 className="font-poppins text-xl font-bold mb-10 text-dark">
                    Mentorship
                </h2>

                {/* ---------- Student view (no mentorship request) ---------- */}
                {isStudent && !mentorship && (
                    <div className="bg-white rounded-xl sm:p-8 flex flex-col items-center text-center">
                        <img
                            src={mentorSvg}
                            alt="mentor placeholder"
                            className="w-48 max-w-full mb-4"
                        />
                        <h3 className="text-lg font-semibold font-poppins text-dark">
                            No Mentor Assigned
                        </h3>
                        <p className="text-slate-500 text-sm mt-2 max-w-md">
                            You currently don't have a mentor. Request mentorship to get guidance
                            and support from an alumni of your choice.
                        </p>

                        <Link
                            to="/mentorship/request"
                            className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition text-sm sm:text-base"
                        >
                            Request a Mentor
                        </Link>
                    </div>
                )}

                {isStudent && mentorship && mentorship?.status === "pending" && (
                    <div className="bg-white rounded-xl sm:p-8 flex flex-col items-center text-center">
                        <img
                            src={pendingSvg}
                            alt="pending request"
                            className="w-48 max-w-full mb-4"
                        />
                        <h3 className="text-lg font-semibold font-poppins text-dark">
                            Mentorship Request Submitted
                        </h3>
                        <p className="text-slate-500 text-sm mt-2 max-w-md">
                            Your request has been successfully submitted and is currently under
                            review. An admin will soon process your request.
                            You will be notified soon about the outcome of your request.
                        </p>

                        <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600 max-w-md">
                            <p><span className="font-semibold">Goal:</span> {mentorship?.goal}</p>
                            <p><span className="font-semibold">Chosen Mentor:</span> {mentorship?.mentor?.name || "N/A"}</p>
                            <p><span className="font-semibold">Status:</span> <span className="text-yellow-600">Pending</span></p>
                        </div>

                        <p className="text-xs text-slate-400 mt-4 italic">
                            Tip: You cannot request another mentor until this request is processed.
                        </p>
                    </div>
                )}

                {/* ---------- Alumni view (no mentees) ---------- */}
                {isAlumni && (!userDetails?.mentees || userDetails.mentees.length === 0) && (
                    <div className="bg-white rounded-xl sm:p-8 flex flex-col items-center text-center">
                        <img
                            src={menteeSvg}
                            alt="mentees placeholder"
                            className="w-48 max-w-full mb-4"
                        />
                        <h3 className="text-lg font-semibold font-poppins text-dark">
                            No Mentees Assigned
                        </h3>
                        <p className="text-slate-500 text-sm mt-2 max-w-md">
                            You currently don't have any mentees assigned. Once a student
                            requests mentorship and admin assigns them to you, their details
                            will appear here.
                        </p>
                    </div>
                )}

                {/* ---------- Placeholder for future (active mentorships) ---------- */}
                {(userDetails?.mentorId || (userDetails?.mentees?.length > 0 && isAlumni)) && (
                    <div className="bg-white rounded-xl p-8 text-center">
                        <h3 className="text-lg font-semibold font-poppins text-dark">
                            Active Mentorships
                        </h3>
                        <p className="text-slate-500 text-sm mt-2">
                            You already have ongoing mentorships. (This section will show active
                            mentor/mentee cards.)
                        </p>
                    </div>
                )}
            </div>
        </div>

    );
};

export default UserMentorship;