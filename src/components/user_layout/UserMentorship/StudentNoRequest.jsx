import { Link } from "react-router-dom";
import mentorSvg from "../../../assets/mentor.svg";
import ButtonWide from "../../shared/buttons/ButtonWide";

const StudentNoRequest = () => {
    return (
        <div className="bg-white rounded-xl sm:p-8 flex flex-col items-center text-center">

            {/* ---------- svg ---------- */}
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

            {/* ---------- request for a mentor button ---------- */}
            <Link
                to="/mentorship/request"
                className="mt-6"
            >
                <ButtonWide text="Request a Mentor"></ButtonWide>
            </Link>
        </div>
    );
};

export default StudentNoRequest;