import { Link } from "react-router-dom";
import defaultUser from "../../../assets/default_user.jpg";
import { format } from "date-fns";

const AlumniRequestCard = ({ req }) => {
    return (
        <div
            key={req._id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-100"
        >
            {/* ---------- Left Section ---------- */}
            <div className="flex items-center gap-3 min-w-0">

                {/* ---------- student image ---------- */}
                <img
                    src={req?.student?.userImage || defaultUser}
                    alt={req?.student?.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">

                    {/* ---------- student name ---------- */}
                    <h4
                        className="font-semibold text-dark truncate max-w-full sm:max-w-[180px]"
                        title={req?.student?.name}
                    >
                        {req?.student?.name}
                    </h4>

                    {/* ---------- goal ---------- */}
                    <p
                        className="text-xs text-slate-500 truncate max-w-full sm:max-w-[200px]"
                        title={req.goal}
                    >
                        {req.goal}
                    </p>

                    {/* ---------- request creation date ---------- */}
                    <p className="text-xs text-slate-400 mt-1">
                        {format(new Date(req.createdAt), "MMM dd, yyyy")}
                    </p>
                </div>
            </div>

            {/* ---------- Right Section (Action Button) ---------- */}
            <div className="flex justify-end sm:justify-center">

                {/* ---------- view request button ---------- */}
                <Link
                    to={`/mentorship/request-action/${req._id}`}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-purple-500 text-white text-xs sm:text-sm rounded-full hover:opacity-90 transition whitespace-nowrap"
                >
                    View Request
                </Link>
            </div>
        </div>
    );
};

export default AlumniRequestCard;