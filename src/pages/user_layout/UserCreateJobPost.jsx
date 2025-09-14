import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { ImCancelCircle } from "react-icons/im";

const UserCreateJobPost = () => {

    // ---------- data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- react hooks ----------
    const navigate = useNavigate();

    // ---------- responsibilities and requirements states ----------
    const [jobResponsibilities, setJobResponsibilities] = useState([]);
    const [jobRequirements, setJobRequirements] = useState([]);

    // ---------- add responsibility ----------
    const handleResponsibilityAdd = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            setJobResponsibilities([...jobResponsibilities, e.target.value.trim()]);
            e.target.value = "";
        }
    };

    // ---------- remove responsibility ----------
    const handleResponsibilityRemove = (idx) => {
        setJobResponsibilities(jobResponsibilities.filter((_, i) => i !== idx));
    };

    // ---------- add requirement ----------
    const handleRequirementAdd = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            setJobRequirements([...jobRequirements, e.target.value.trim()]);
            e.target.value = "";
        }
    };

    // ---------- remove requirement ----------
    const handleRequirementRemove = (idx) => {
        setJobRequirements(jobRequirements.filter((_, i) => i !== idx));
    };

    // ---------- function for creating a job post ----------
    const handleCreateJob = (e) => {
        e.preventDefault();

        // ---------- sweet alert for confirmation ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Confirm Job Announcement</h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">Once confirmed, this job will be published and visible to all eligible users.</p>
                `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then((result) => {

            // ---------- when confirmed ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Posting Job...");

                // ---------- collect form data ----------
                const form = e.target;
                const jobData = {
                    authorId: userDetails?._id,
                    jobTitle: form.jobTitle.value,
                    company: {
                        name: form.companyName.value,
                        logo: form.companyLogo.value,
                        type: form.companyType.value,
                        location: form.companyLocation.value,
                    },
                    jobType: form.jobType.value,
                    salary: form.salary.value,
                    category: form.jobCategory.value,
                    description: form.jobDescription.value,
                    responsibility: jobResponsibilities,
                    requirements: jobRequirements,
                    applyLink: form.applyLink.value,
                };

                // ---------- send to backend ----------
                axios.post("http://localhost:5000/jobs", jobData)
                    .then((data) => {
                        if (data.data?.acknowledged) {

                            // ---------- navigate to the jobs page ----------
                            navigate("/jobs");

                            toast.success("Job Posted Successfully!", { id: toastId });
                        } else {
                            toast.error("Something went wrong", { id: toastId });
                        }
                    })
                    .catch(() => {
                        toast.error("Something went wrong", { id: toastId });
                    });
            }
        });
    };

    return (
        <>
            {/* ---------- Header with searchbar ---------- */}
            <UserHeader />

            {/* ---------- Main Content ---------- */}
            <form

                // ---------- for disabling form submission when clicking enter button ----------
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                }}
                onSubmit={handleCreateJob}
                className="grid grid-cols-1 sm:grid-cols-12 gap-8 text-semi-dark mx-2 md:mx-5 my-8 text-sm lg:text-base"
            >
                {/* ---------- Job Basic Info ---------- */}
                <div className="col-span-1 sm:col-span-12 space-y-6 sm:space-y-8">
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Job & Company Information
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            {/* ---------- job title ---------- */}
                            <input type="text" name="jobTitle" placeholder="Job Title" className="border-b border-slate-400 outline-none" required />

                            {/* ---------- company name ---------- */}
                            <input type="text" name="companyName" placeholder="Company Name" className="border-b border-slate-400 outline-none" required />

                            {/* ---------- job category ---------- */}
                            <input type="text" name="jobCategory" placeholder="Job Category (e.g. Software, Marketing)" className="border-b border-slate-400 outline-none" required />

                            {/* ---------- company logo ---------- */}
                            <input type="text" name="companyLogo" placeholder="Company Logo URL (optional)" className="border-b border-slate-400 outline-none" />

                            {/* ---------- job type select ---------- */}
                            <select
                                name="jobType"
                                defaultValue=""
                                className="py-1 font-poppins border-b border-slate-400 w-full outline-none"
                                required
                            >
                                <option value="" disabled>Select Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                                <option value="Remote">Remote</option>
                            </select>

                            {/* ---------- company type ---------- */}
                            <input type="text" name="companyType" placeholder="Company Type (e.g. IT, Finance) (optional)" className="border-b border-slate-400 outline-none" />

                            {/* ---------- salary ---------- */}
                            <input type="text" name="salary" placeholder="Salary (e.g. Negotiable, 50k-70k)" className="border-b border-slate-400 outline-none" required />

                            {/* ---------- company location ---------- */}
                            <input type="text" name="companyLocation" placeholder="Company Location" className="border-b border-slate-400 outline-none" required />
                        </div>
                    </div>


                    {/* ---------- Job Description ---------- */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">Job Description</h3>
                        <textarea
                            name="jobDescription"
                            rows="10"
                            placeholder="Write a clear description about the job..."
                            className="w-full border border-slate-400 rounded-lg p-2 resize-none outline-none"
                            required
                        ></textarea>
                    </div>

                    {/* ---------- Job Responsibility ---------- */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Responsibilities
                        </h3>

                        {/* ---------- input field for job responsibility ---------- */}
                        <input
                            type="text"
                            placeholder="Type a responsibility & press Enter"
                            onKeyDown={handleResponsibilityAdd}
                            className="border-b border-slate-400 outline-none w-full mb-3"
                        />

                        {/* ---------- list of added job responsibilities ---------- */}
                        <ul className="list-disc ml-6 space-y-2">
                            {jobResponsibilities.map((res, idx) => (
                                <li key={idx}>
                                    <span>{res}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleResponsibilityRemove(idx)}
                                        className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                                    >

                                        {/* ---------- remove icon ---------- */}
                                        <ImCancelCircle className="text-xs lg:text-sm" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---------- Job Requirements ---------- */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Requirements
                        </h3>

                        {/* ---------- input field for job requirements ---------- */}
                        <input
                            type="text"
                            placeholder="Type a requirement & press Enter"
                            onKeyDown={handleRequirementAdd}
                            className="border-b border-slate-400 outline-none w-full mb-3"
                        />

                        {/* ---------- list of added requirements ---------- */}
                        <ul className="list-disc ml-6 space-y-2">
                            {jobRequirements.map((req, idx) => (
                                <li key={idx}>
                                    <span>{req}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRequirementRemove(idx)}
                                        className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                                    >
                                        <ImCancelCircle className="text-xs lg:text-sm" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---------- apply link ---------- */}
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Apply Link
                        </h2>
                        <input type="text" name="applyLink" placeholder="Enter the URL where applicants can apply" className="border-b border-slate-400 outline-none w-full" />
                    </div>


                    {/* ---------- Submit Button ---------- */}
                    <div>
                        <PurpleButton text="Post Job" type="submit" />
                    </div>
                </div>
            </form>
        </>
    );
};

export default UserCreateJobPost;
