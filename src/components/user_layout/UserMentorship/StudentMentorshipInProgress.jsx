import { format } from "date-fns";
import defaultUser from "../../../assets/default_user.jpg";

const StudentMentorshipInProgress = ({ mentorship }) => {
    const { mentor, goal, createdAt, steps = [], currentStep } = mentorship || {};

    // ---------- get step progress ----------
    const currentIndex = steps.indexOf(currentStep);

    return (
        <div className="bg-white rounded-xl shadow-sm sm:p-6 md:p-8 space-y-8">

            {/* ---------- Mentor Info ---------- */}
            <div className="flex items-center gap-4">

                {/* ---------- mentor image ---------- */}
                <img
                    src={mentor?.userImage || defaultUser}
                    alt={mentor?.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>

                    {/* ---------- mentor name ---------- */}
                    <h3 className="text-lg font-semibold text-dark">{mentor?.name}</h3>
                    <p className="text-sm text-slate-500">Your Mentor</p>
                </div>
            </div>

            {/* ---------- Mentorship Info ---------- */}
            <div>
                <h4 className="text-base font-semibold text-dark mb-1">Goal</h4>
                <p className="text-slate-600">{goal}</p>
            </div>

            <div>
                <h4 className="text-base font-semibold text-dark mb-1">Started On</h4>
                <p className="text-slate-600">
                    {format(new Date(createdAt), "MMMM dd, yyyy")}
                </p>
            </div>

            {/* ---------- Progress Steps ---------- */}
            <div>
                <h4 className="text-base font-semibold text-dark mb-3">Progress Steps</h4>
                <ul className="space-y-3">
                    {steps.length > 0 ? (
                        steps.map((step, idx) => (
                            <li
                                key={idx}
                                className={`flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 ${idx < currentIndex
                                    ? "bg-green-50 border-green-300"
                                    : idx === currentIndex
                                        ? "bg-blue-50 border-blue-300"
                                        : "bg-gray-50"
                                    }`}
                            >
                                {/* ---------- Step Indicator ---------- */}
                                <div
                                    className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-bold ${idx < currentIndex
                                        ? "bg-green-500 text-white border-green-500"
                                        : idx === currentIndex
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "border-gray-300 text-gray-400"
                                        }`}
                                >
                                    {idx + 1}
                                </div>
                                <span
                                    className={`text-sm ${idx < currentIndex
                                        ? "text-green-700 line-through"
                                        : idx === currentIndex
                                            ? "text-blue-700 font-medium"
                                            : "text-gray-600"
                                        }`}
                                >
                                    {step}
                                </span>
                            </li>
                        ))
                    ) : (
                        <p className="text-slate-500 text-sm italic">
                            No steps defined by your mentor yet.
                        </p>
                    )}
                </ul>
            </div>

            {/* ---------- Current Step Highlight ---------- */}
            {currentStep && (
                <div className="bg-gradient-to-r from-primary to-purple-500 text-white rounded-lg p-4 mt-6">
                    <p className="font-semibold text-base">
                        Current Step: <span className="font-light">{currentStep}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default StudentMentorshipInProgress;