import { useState } from "react";
import { Link } from "react-router-dom";
import defaultUser from "../../../assets/default_user.jpg";
import { format } from "date-fns";

const AlumniMentorshipTabs = ({ mentorData = [] }) => {
    const [tabState, setTabState] = useState("In Progress");

    // ---------- filter data ----------
    const inProgress = mentorData.filter(req => req.status === "accepted");
    const requests = mentorData.filter(req => req.status === "assigned");

    console.log(mentorData);

    return (
        <div>
            {/* ---------- Tab Headers ---------- */}
            <div className="flex gap-4 border-b border-gray-200 font-semibold mb-6">
                <span
                    onClick={() => setTabState("In Progress")}
                    className={`px-2 pb-3 cursor-pointer ${tabState === "In Progress" && "text-primary border-b-2 border-primary"}`}
                >
                    In Progress ({inProgress.length})
                </span>
                <span
                    onClick={() => setTabState("Requests")}
                    className={`px-2 pb-3 cursor-pointer ${tabState === "Requests" && "text-primary border-b-2 border-primary"}`}
                >
                    Requests ({requests.length})
                </span>
            </div>

            {/* ---------- Tab Content ---------- */}
            <div className="mt-4">
                {/* ---------- In Progress ---------- */}
                {tabState === "In Progress" && (
                    inProgress.length > 0 ? (
                        <div className="space-y-4">
                            {/* You can later add ongoing mentorship cards here */}
                            <p className="text-center text-slate-500">
                                Ongoing mentorship programs will be displayed here.
                            </p>
                        </div>
                    ) : (
                        <div className="min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                            No ongoing mentorship yet
                        </div>
                    )
                )}

                {/* ---------- Requests ---------- */}
                {tabState === "Requests" && (
                    requests.length > 0 ? (
                        <div className="space-y-4">
                            {requests.map(req => (
                                <Link
                                    to={`/mentorship/request-action/${req._id}`}
                                    key={req._id}
                                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={req?.student?.userImage || defaultUser}
                                            alt={req?.student?.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-dark truncate max-w-[180px]">
                                                {req?.student?.name}
                                            </h4>
                                            <p className="text-xs text-slate-500 truncate max-w-[200px]">
                                                {req.goal}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400">
                                        {format(new Date(req.createdAt), "MMMM dd, yyyy")}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                            No mentorship requests at the moment
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default AlumniMentorshipTabs;