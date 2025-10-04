import { useState } from "react";
import AlumniRequestCard from "./AlumniRequestCard";
import AlumniInProgressCard from "./AlumniInProgressCard";

const AlumniMentorshipTabs = ({ mentorData = [] }) => {

    // ---------- tab state ----------
    const [tabState, setTabState] = useState("In Progress");

    // ---------- filter data ----------
    const inProgress = mentorData.filter(req => req.status === "accepted");
    const requests = mentorData.filter(req => req.status === "assigned");

    return (
        <div>
            {/* ---------- Tab Headers ---------- */}
            <div className="flex gap-4 border-b border-gray-200 font-semibold mb-6 text-sm sm:text-base">

                {/* ---------- in progress tab ---------- */}
                <span
                    onClick={() => setTabState("In Progress")}
                    className={`px-2 pb-3 cursor-pointer ${tabState === "In Progress" && "text-primary border-b-2 border-primary"}`}
                >
                    In Progress ({inProgress.length})
                </span>

                {/* ---------- request tab ---------- */}
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
                    <div className="flex flex-col gap-4 mt-6">
                        {inProgress.length > 0 ? (
                            inProgress.map(mentorship => <AlumniInProgressCard key={mentorship._id} mentorship={mentorship}></AlumniInProgressCard>)
                        ) : (

                            // ---------- no in progress mentorship ----------
                            <p className="min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                No active mentorship at the moment.
                            </p>
                        )}
                    </div>
                )}

                {/* ---------- Requests ---------- */}
                {tabState === "Requests" && (
                    requests.length > 0 ? (
                        <div className="space-y-4">
                            {requests.map(req => <AlumniRequestCard key={req._id} req={req}></AlumniRequestCard>)}
                        </div>
                    ) : (

                        // ---------- no mentorship request ----------
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