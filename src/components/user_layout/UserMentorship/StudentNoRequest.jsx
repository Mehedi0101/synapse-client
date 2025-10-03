import { Link } from "react-router-dom";
import mentorSvg from "../../../assets/mentor.svg";

const StudentNoRequest = () => {
    return (
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
    );
};

export default StudentNoRequest;