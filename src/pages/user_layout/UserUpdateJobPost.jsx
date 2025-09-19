import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { ImCancelCircle } from "react-icons/im";

const UserUpdateJobPost = () => {

    // ---------- data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- id from url ----------
    const { id } = useParams();

    // ---------- react hooks ----------
    const navigate = useNavigate();

    // ---------- form states ----------
    const [authorId, setAuthorId] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyLogo, setCompanyLogo] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [companyLocation, setCompanyLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [salary, setSalary] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [applyLink, setApplyLink] = useState("");
    const [jobResponsibilities, setJobResponsibilities] = useState([]);
    const [jobRequirements, setJobRequirements] = useState([]);

    // ---------- fetch existing job ----------
    useEffect(() => {
        axios.get(`http://localhost:5000/jobs/details/${id}`)
            .then((res) => {
                const job = res.data;
                setAuthorId(job?.author?._id);
                setJobTitle(job.jobTitle || "");
                setCompanyName(job.company?.name || "");
                setCompanyLogo(job.company?.logo || "");
                setCompanyType(job.company?.type || "");
                setCompanyLocation(job.company?.location || "");
                setJobType(job.jobType || "");
                setSalary(job.salary || "");
                setCategory(job.category || "");
                setDescription(job.description || "");
                setApplyLink(job.applyLink || "");
                setJobResponsibilities(job.responsibility || []);
                setJobRequirements(job.requirements || []);
            })
            .catch(() => toast.error("Something went wrong"));
    }, [id]);

    // ---------- if authorId and userId don't match then navigate to error page ----------
    useEffect(() => {
        userDetails?._id && authorId && (
            userDetails?._id !== authorId && navigate('/error')
        );
    }, [authorId, navigate, userDetails])

    // ---------- add responsibilities ----------
    const handleResponsibilityAdd = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            setJobResponsibilities([...jobResponsibilities, e.target.value.trim()]);
            e.target.value = "";
        }
    };

    // ---------- remove responsibilities ----------
    const handleResponsibilityRemove = (idx) => {
        setJobResponsibilities(jobResponsibilities.filter((_, i) => i !== idx));
    };

    // ---------- add requirements ----------
    const handleRequirementAdd = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            setJobRequirements([...jobRequirements, e.target.value.trim()]);
            e.target.value = "";
        }
    };

    // ---------- remove requirements ----------
    const handleRequirementRemove = (idx) => {
        setJobRequirements(jobRequirements.filter((_, i) => i !== idx));
    };

    // ---------- update job ----------
    const handleUpdateJob = (e) => {
        e.preventDefault();

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
        <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Confirm Update</h2>
        <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">Do you want to update this job post?</p>
      `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then((result) => {

            // ---------- if confirmed ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Updating Job Post...");

                // ---------- updated job data ----------
                const jobData = {
                    authorId: userDetails?._id,
                    jobTitle,
                    company: {
                        name: companyName,
                        logo: companyLogo,
                        type: companyType,
                        location: companyLocation,
                    },
                    jobType,
                    salary,
                    category,
                    description,
                    responsibility: jobResponsibilities,
                    requirements: jobRequirements,
                    applyLink,
                };

                // ---------- patch requrest to server ----------
                axios.patch(`http://localhost:5000/jobs/${id}`, jobData)
                    .then((res) => {
                        if (res.data?.acknowledged) {

                            // ---------- navigate to jobs page ----------
                            navigate(`/jobs/${id}`);
                            toast.success("Updated", { id: toastId });

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
            <UserHeader />

            <form
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                onSubmit={handleUpdateJob}
                className="grid grid-cols-1 sm:grid-cols-12 gap-8 text-semi-dark mx-2 md:mx-5 my-8 text-sm lg:text-base"
            >
                <div className="col-span-1 sm:col-span-12 space-y-6 sm:space-y-8">

                    {/* ---------- Job & Company Info ---------- */}
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Job & Company Information
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            {/* ---------- job title ---------- */}
                            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" className="border-b border-slate-400 outline-none" required />

                            {/* ---------- company name ---------- */}
                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" className="border-b border-slate-400 outline-none" required />

                            {/* ---------- job category ---------- */}
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Job Category (e.g. Software, Marketing)" className="border-b border-slate-400 outline-none" required />

                            {/* ---------- company logo ---------- */}
                            <input type="text" value={companyLogo} onChange={(e) => setCompanyLogo(e.target.value)} placeholder="Company Logo URL (optional)" className="border-b border-slate-400 outline-none" />

                            {/* ---------- job type ---------- */}
                            <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="py-1 font-poppins border-b border-slate-400 w-full outline-none" required>
                                <option value="" disabled>Select Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                                <option value="Remote">Remote</option>
                            </select>

                            {/* ---------- company type ---------- */}
                            <input type="text" value={companyType} onChange={(e) => setCompanyType(e.target.value)} placeholder="Company Type (optional)" className="border-b border-slate-400 outline-none" />

                            {/* ---------- salary ---------- */}
                            <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary (e.g. Negotiable, 50k-70k)" className="border-b border-slate-400 outline-none" required />

                            {/* ---------- company location ---------- */}
                            <input type="text" value={companyLocation} onChange={(e) => setCompanyLocation(e.target.value)} placeholder="Company Location" className="border-b border-slate-400 outline-none" required />
                        </div>
                    </div>

                    {/* ---------- Description ---------- */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">Job Description</h3>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="10" placeholder="Write a clear description..." className="w-full border border-slate-400 rounded-lg p-2 resize-none outline-none" required></textarea>
                    </div>

                    {/* ---------- Responsibilities ---------- */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">Responsibilities</h3>
                        <input type="text" placeholder="Type a responsibility & press Enter" onKeyDown={handleResponsibilityAdd} className="border-b border-slate-400 outline-none w-full mb-3" />
                        <ul className="list-disc ml-6 space-y-2">
                            {jobResponsibilities.map((res, idx) => (
                                <li key={idx}>
                                    {res}
                                    <button type="button" onClick={() => handleResponsibilityRemove(idx)} className="text-red-500 hover:text-red-700 ml-2">
                                        <ImCancelCircle className="text-xs lg:text-sm" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---------- Requirements ---------- */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">Requirements</h3>
                        <input type="text" placeholder="Type a requirement & press Enter" onKeyDown={handleRequirementAdd} className="border-b border-slate-400 outline-none w-full mb-3" />
                        <ul className="list-disc ml-6 space-y-2">
                            {jobRequirements.map((req, idx) => (
                                <li key={idx}>
                                    {req}
                                    <button type="button" onClick={() => handleRequirementRemove(idx)} className="text-red-500 hover:text-red-700 ml-2">
                                        <ImCancelCircle className="text-xs lg:text-sm" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---------- Apply Link ---------- */}
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">Apply Link</h2>
                        <input type="text" value={applyLink} onChange={(e) => setApplyLink(e.target.value)} placeholder="Enter the URL where applicants can apply" className="border-b border-slate-400 outline-none w-full" required />
                    </div>

                    {/* ---------- update button ---------- */}
                    <div>
                        <PurpleButton text="Update Job Post" type="submit" />
                    </div>
                </div>
            </form>
        </>
    );
};

export default UserUpdateJobPost;