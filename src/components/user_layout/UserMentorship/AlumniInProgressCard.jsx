import { format } from "date-fns";
import { Link } from "react-router-dom";
import defaultUser from "../../../assets/default_user.jpg";

const AlumniInProgressCard = ({ mentorship }) => {
    const { _id, student, goal, currentStep, createdAt, status } = mentorship;

    return (
        <div
            className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 gap-4 border border-gray-100"
        >
            {/* ---------- Student Info ---------- */}
            <div className="flex items-center gap-3 min-w-[180px] max-w-[200px]">

                {/* ---------- student image ---------- */}
                <img
                    src={student?.userImage || defaultUser}
                    onError={(e) => { e.currentTarget.src = defaultUser; }}
                    alt={student?.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="overflow-hidden">

                    {/* ---------- student name ---------- */}
                    <h3
                        className="font-poppins text-sm sm:text-base font-semibold text-dark truncate"
                        title={student?.name}
                    >
                        {student?.name || "N/A"}
                    </h3>

                    {/* ---------- goal ---------- */}
                    <p
                        className="text-xs text-slate-500 truncate"
                        title={goal || "N/A"}
                    >
                        Goal: {goal || "N/A"}
                    </p>
                </div>
            </div>

            {/* ---------- Progress Info ---------- */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-6 flex-1 text-center sm:text-left min-w-[200px]">
                <div className="">

                    {/* ---------- current step ---------- */}
                    <p className="text-xs uppercase text-slate-400 font-medium">
                        Current Step
                    </p>
                    <p
                        className="text-sm font-semibold text-primary truncate max-w-[120px] sm:max-w-[140px] mx-auto"
                        title={currentStep || "Not started"}
                    >
                        {currentStep || "Not started"}
                    </p>
                </div>

                {/* ---------- date ---------- */}
                <div>
                    <p className="text-xs uppercase text-slate-400 font-medium">
                        Started On
                    </p>
                    <p
                        className="text-sm text-slate-700"
                        title={format(new Date(createdAt), "MMMM dd, yyyy")}
                    >
                        {format(new Date(createdAt), "MMM dd, yyyy")}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 flex-wrap justify-center">

                {/* ---------- status ---------- */}
                <span
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold capitalize truncate ${status === "accepted"
                        ? "bg-green-100 text-green-600"
                        : "bg-slate-100 text-slate-600"
                        }`}
                    title={status}
                >
                    {status}
                </span>

                {/* ---------- view details button ---------- */}
                <Link
                    to={`/mentorship/in-progress/${_id}`}
                    className="text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-primary to-purple-500 px-4 py-1.5 rounded-full hover:opacity-90 transition-all duration-200 whitespace-nowrap"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default AlumniInProgressCard;