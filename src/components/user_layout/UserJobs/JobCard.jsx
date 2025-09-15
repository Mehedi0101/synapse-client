import { Link } from "react-router-dom";
import defaultLogo from "../../../assets/synapse-logo-square.png";

const JobCard = ({ jobPost }) => {
    return (
        <Link to={`/jobs/${jobPost?._id}`}>
            <div className="w-full flex flex-col min-[400px]:flex-row gap-2 shadow-lg hover:shadow-xl p-4 cursor-pointer rounded-lg min-[400px]:text-left text-center h-full min-[400px]:items-start">

                {/* ---------- company logo section ---------- */}
                <div className="min-w-fit mx-auto">
                    <img className="w-20 h-20 object-cover" src={jobPost?.company?.logo || defaultLogo} alt="" />
                </div>

                {/* ---------- basic info section ---------- */}
                <div className="w-full flex flex-col justify-between">

                    {/* ---------- job title ---------- */}
                    <h3 className="text-dark font-bold font-poppins mb-2">{jobPost?.jobTitle || "N/A"}</h3>

                    {/* ---------- location ---------- */}
                    <p className="text-sm text-slate-500 mb-2">{jobPost?.company?.location || "N/A"}</p>

                    {/* ---------- company name ---------- */}
                    <p className="text-sm text-primary">{jobPost?.company?.name || "N/A"}</p>
                </div>

                {/* ---------- job type section ---------- */}
                <div className="min-w-fit mt-0.5">
                    <p
                        className={`text-sm font-medium ${jobPost?.jobType === "Full-time"
                            ? "text-green-600"
                            : jobPost?.jobType === "Part-time"
                                ? "text-blue-600"
                                : jobPost?.jobType === "Internship"
                                    ? "text-orange-500"
                                    : jobPost?.jobType === "Contract"
                                        ? "text-red-600"
                                        : jobPost?.jobType === "Remote"
                                            ? "text-pink-600"
                                            : "text-slate-600"
                            }`}
                    >
                        {jobPost?.jobType}
                    </p>

                </div>
            </div>
        </Link>
    );
};

export default JobCard;