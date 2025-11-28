import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { ImCancelCircle } from "react-icons/im";

const UserCreateJobPost = () => {

    // ---------- Auth ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- React hooks ----------
    const navigate = useNavigate();

    // ---------- Responsibilities & Requirements ----------
    const [jobResponsibilities, setJobResponsibilities] = useState([]);
    const [jobRequirements, setJobRequirements] = useState([]);

    // ---------- Company Logo State ----------
    const [companyLogoFile, setCompanyLogoFile] = useState(null);

    // ---------- Upload logo function ----------
    const uploadCompanyLogo = async (file) => {
        if (!file) return null;

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", "synapse/company-logos");

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                formData
            );
            return response.data.secure_url;
        } catch {
            return null;
        }
    };

    // ---------- Add responsibility ----------
    const handleResponsibilityAdd = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            setJobResponsibilities([...jobResponsibilities, e.target.value.trim()]);
            e.target.value = "";
        }
    };

    // ---------- Remove responsibility ----------
    const handleResponsibilityRemove = (idx) => {
        setJobResponsibilities(jobResponsibilities.filter((_, i) => i !== idx));
    };

    // ---------- Add requirement ----------
    const handleRequirementAdd = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            setJobRequirements([...jobRequirements, e.target.value.trim()]);
            e.target.value = "";
        }
    };

    // ---------- Remove requirement ----------
    const handleRequirementRemove = (idx) => {
        setJobRequirements(jobRequirements.filter((_, i) => i !== idx));
    };

    // ---------- Create Job ----------
    const handleCreateJob = (e) => {
        e.preventDefault();

        Swal.fire({
            html: `
                <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Confirm Job Announcement</h2>
                <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">Once confirmed, this job will be published and visible to all eligible users.</p>
            `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then(async (result) => {

            if (result.isConfirmed) {
                const toastId = toast.loading("Posting Job...");

                // ---------- Upload logo only when submitting ----------
                let uploadedLogoUrl = "";

                if (companyLogoFile) {
                    uploadedLogoUrl = await uploadCompanyLogo(companyLogoFile);

                    if (!uploadedLogoUrl) {
                        toast.error("Logo upload failed", { id: toastId });
                        return;
                    }
                }

                const form = e.target;

                const jobData = {
                    authorId: userDetails?._id,
                    jobTitle: form.jobTitle.value,
                    company: {
                        name: form.companyName.value,
                        logo: uploadedLogoUrl,
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

                try {
                    const token = await user.getIdToken();
                    const { data } = await axios.post("http://localhost:5000/jobs", jobData, {
                        headers: { authorization: `Bearer ${token}` }
                    });

                    if (data.acknowledged) {
                        navigate("/jobs");
                        toast.success("Job Posted Successfully!", { id: toastId });
                    } else {
                        toast.error("Something went wrong", { id: toastId });
                    }
                } catch {
                    toast.error("Something went wrong", { id: toastId });
                }
            }
        });
    };

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Create Job Post";
    }, []);

    return (
        <>
            <UserHeader />

            <form
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                }}
                onSubmit={handleCreateJob}
                className="grid grid-cols-1 sm:grid-cols-12 gap-8 text-semi-dark mx-2 md:mx-5 my-8 text-sm lg:text-base"
            >
                <div className="col-span-1 sm:col-span-12 space-y-6 sm:space-y-8">

                    {/* ---------- Job & Company Info ---------- */}
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Job & Company Information
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            <input type="text" name="jobTitle" placeholder="Job Title"
                                className="border-b border-slate-400 outline-none" required />

                            <input type="text" name="companyName" placeholder="Company Name"
                                className="border-b border-slate-400 outline-none" required />

                            <input type="text" name="jobCategory" placeholder="Job Category (e.g. Software)"
                                className="border-b border-slate-400 outline-none" required />

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

                            <input type="text" name="companyType" placeholder="Company Type (optional)"
                                className="border-b border-slate-400 outline-none" />

                            <input type="text" name="salary" placeholder="Salary (e.g. Negotiable)"
                                className="border-b border-slate-400 outline-none" required />

                            <input type="text" name="companyLocation" placeholder="Company Location"
                                className="border-b border-slate-400 outline-none" required />

                            {/* ---------- company logo ---------- */}
                            {/* <input type="text" name="companyLogo" placeholder="Company Logo URL (optional)" className="border-b border-slate-400 outline-none" /> */}

                            <div className="lg:col-span-2 mt-2">
                                <div
                                    className="mt-2 border-2 border-dashed border-slate-400 rounded-lg p-6 text-center cursor-pointer
                                    hover:border-purple-600 hover:bg-purple-50 transition-colors duration-200"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const file = e.dataTransfer.files[0];
                                        if (!file || !file.type.startsWith("image/")) {
                                            toast.error("Only image files are allowed!");
                                            return;
                                        }
                                        setCompanyLogoFile(file);
                                    }}
                                    onClick={() => document.getElementById("logo-file-input").click()}
                                >
                                    <span className="text-lg text-slate-500">📁 Upload Company Logo</span>
                                    <p className="text-sm text-slate-400 mt-1">
                                        Click or drag an image here
                                    </p>

                                    {companyLogoFile && (
                                        <p className="mt-2 text-sm text-slate-600">
                                            {companyLogoFile.name}
                                        </p>
                                    )}

                                    <input
                                        id="logo-file-input"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) setCompanyLogoFile(file);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ---------- Description ---------- */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Job Description
                        </h3>
                        <textarea
                            name="jobDescription"
                            rows="10"
                            placeholder="Write a clear description..."
                            className="w-full border border-slate-400 rounded-lg p-2 resize-none outline-none"
                            required
                        ></textarea>
                    </div>

                    {/* ---------- Responsibilities ---------- */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Responsibilities
                        </h3>

                        <input
                            type="text"
                            placeholder="Type a responsibility & press Enter"
                            onKeyDown={handleResponsibilityAdd}
                            className="border-b border-slate-400 outline-none w-full mb-3"
                        />

                        <ul className="list-disc ml-6 space-y-2">
                            {jobResponsibilities.map((res, idx) => (
                                <li key={idx}>
                                    <span>{res}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleResponsibilityRemove(idx)}
                                        className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                                    >
                                        <ImCancelCircle className="text-xs lg:text-sm" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---------- Requirements ---------- */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Requirements
                        </h3>

                        <input
                            type="text"
                            placeholder="Type a requirement & press Enter"
                            onKeyDown={handleRequirementAdd}
                            className="border-b border-slate-400 outline-none w-full mb-3"
                        />

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

                    {/* ---------- Apply Link ---------- */}
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Apply Link
                        </h2>
                        <input
                            type="text"
                            name="applyLink"
                            placeholder="Application URL"
                            className="border-b border-slate-400 outline-none w-full"
                            required
                        />
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
