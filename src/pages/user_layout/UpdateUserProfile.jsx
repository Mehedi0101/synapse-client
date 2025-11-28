import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import { MdOutlineCancel } from "react-icons/md";
import Swal from 'sweetalert2';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../components/user_layout/shared/UserHeader";

const UpdateUserProfile = () => {

    // ---------- user details from auth provider ----------
    const { userDetails, refetchUserDetails, user } = useContext(AuthContext);

    // ---------- hooks ----------
    const navigate = useNavigate();

    // ---------- role and skill tracking states ---------- 
    const [formRole, setFormRole] = useState("");
    const [formSkills, setFormSkills] = useState([]);

    // ---------- image upload states ----------
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(userDetails?.userImage || "");

    // ---------- setting role and skills when userDetails state is changed ---------- 
    useEffect(() => {
        setFormRole(userDetails?.role);
        setFormSkills(userDetails?.skills || []);
    }, [userDetails])

    // ---------- handle image selection ----------
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file);
    };

    // ---------- skill add function ---------- 
    const handleSkillAdd = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            setFormSkills([...formSkills, e.target.value]);
            e.target.value = "";
        }
    };

    // ---------- skill remove function ---------- 
    const handleSkillRemove = (idx) => {
        setFormSkills(formSkills?.filter((_, index) => index != idx));
    };

    const uploadImageToCloudinary = async (file) => {
        if (!file) return null;

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset); // Use env variable
        formData.append("folder", "synapse/users"); // Optional folder path

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`, // Use env variable
                formData
            );
            return response.data.secure_url; // The URL of uploaded image
        } catch {
            return null;
        }
    };

    // ---------- profile update function ---------- 
    const handleUpdateProfile = (e) => {
        e.preventDefault();

        // ---------- sweet alert for confirmation ---------- 
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Do you want to proceed with saving the changes?</h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">Your profile information will be updated.</p>
                `,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            denyButtonText: 'No',
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-2',
                confirmButton: 'order-1 right-gap',
            },
        }).then(async (result) => {

            // ---------- actions after confirming change ---------- 
            if (result.isConfirmed) {

                // ---------- toast loading ---------- 
                const toastId = toast.loading('Updating Profile...');

                let userImage = uploadedImageUrl; // current image

                // uploading image to cloudinary(if attached)
                if (selectedFile) {
                    const uploadedUrl = await uploadImageToCloudinary(selectedFile);
                    if (uploadedUrl) {
                        userImage = uploadedUrl;
                        setUploadedImageUrl(uploadedUrl);
                    } else {
                        toast.error("Failed to upload profile image", { id: toastId });

                        // stop the updating process if fails
                        return;
                    }
                }

                // ---------- form data ---------- 
                const form = e.target;

                const role = formRole;
                const bio = form?.bio?.value;
                const phone = form?.phone?.value;
                const facebook = form?.facebook?.value;
                const linkedIn = form?.linkedIn?.value;
                const github = form?.github?.value;
                const department = form?.department?.value || "";
                const session = form?.session?.value || "";
                const semester = form?.semester?.value || "";
                const birthday = form?.birthday?.value;
                const graduationYear = form?.graduationYear?.value || "";
                const jobTitle = form?.jobTitle?.value || "";
                const company = form?.company?.value || "";
                const companyLocation = form?.companyLocation?.value || "";
                const resume = form?.resume?.value || "";
                const street = form?.street?.value;
                const city = form?.city?.value;
                const state = form?.state?.value;
                const country = form?.country?.value;
                const zip = form?.zip?.value;
                const skills = formSkills;

                // ---------- object for sending data to the backend ---------- 
                const updatedData = {
                    role, userImage, bio, phone, facebook, linkedIn, github, department, session, semester, birthday, graduationYear, jobTitle, company, companyLocation, resume, skills,
                    address: {
                        street,
                        city,
                        state,
                        country,
                        zip,
                    }
                }

                // ---------- patch ----------
                try {
                    const token = await user.getIdToken();

                    const { data } = await axios.patch(`http://localhost:5000/users/${userDetails._id}`, updatedData, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        toast.success('Changes Saved Successfully', { id: toastId });
                        navigate('/profile');
                        refetchUserDetails();
                    }
                    else {
                        toast.error('Something went wrong', { id: toastId });
                    }

                }
                catch {
                    toast.error('Something went wrong', { id: toastId });
                }
            }
        })
    };

    return (
        <>
            {/* ---------- user header (search bar invisible) ---------- */}
            <UserHeader searchBar="invisible" />

            {/* ---------- main content ---------- */}
            <form
                // ---------- this is used for preventing form submission when pressing enter ----------
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                }}
                onSubmit={handleUpdateProfile}
                className="grid grid-cols-1 sm:grid-cols-12 gap-8 text-semi-dark mx-2 md:mx-5 my-8 text-sm lg:text-base"
            >
                {/* ---------- Left Grid ---------- */}
                <div className="col-span-1 sm:col-span-5 lg:col-span-4 space-y-6 flex flex-col justify-between">

                    {/* ---------- Basic Information Container ---------- */}
                    <div className="">
                        <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b-2 pb-2 mb-6">
                            Basic Information
                        </h2>

                        {/* ---------- Name(disabled) ---------- */}
                        <input
                            type="text"
                            name="name"
                            defaultValue={userDetails?.name || ""}
                            className="mb-3 font-poppins w-full border-b border-slate-400 outline-none cursor-not-allowed"
                            placeholder="Full Name"
                            disabled
                        />

                        {/* ---------- Role ---------- */}
                        <select
                            name="role"
                            defaultValue={userDetails?.role}
                            onChange={(e) => setFormRole(e.target.value)}
                            className="py-1 font-poppins border-b border-slate-400 w-full outline-none"
                        >
                            <option value="Student">Student</option>
                            <option value="Alumni">Alumni</option>
                        </select>

                        {/* ---------- Image URL ---------- */}
                        {/* <input
                            type="text"
                            name="userImage"
                            defaultValue={userDetails?.userImage || ""}
                            className="mb-2 font-poppins w-full border-b border-slate-400 outline-none mt-3"
                            placeholder="Image URL"
                        /> */}

                        {/* ---------- Profile Image Upload ---------- */}
                        <div className="mt-6 mb-3 w-full">
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-400 rounded-lg p-6 cursor-pointer hover:border-purple-600 hover:bg-purple-50 transition-colors duration-200 text-center relative">
                                <span className="text-lg text-slate-500 mb-2">📁 Upload Profile Image</span>
                                <span className="text-sm text-slate-400 mb-2">Click to select your image</span>

                                {/* Display selected file name */}
                                {selectedFile && (
                                    <span className="absolute bottom-2 text-sm text-slate-600 truncate w-full px-2">
                                        {selectedFile.name}
                                    </span>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* ---------- About Section Container ---------- */}
                    <div className="mt-5 space-y-3">
                        <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b-2 pb-2 mb-6">
                            About
                        </h2>

                        {/* ---------- Bio ---------- */}
                        <textarea
                            name="bio"
                            defaultValue={userDetails?.bio || ""}
                            rows="4"
                            className="w-full border border-slate-400 rounded p-2 resize-none outline-none"
                            placeholder="Write something about yourself..."
                        ></textarea>

                        {/* ---------- Contact Links Container ---------- */}
                        <div className="space-y-3 mt-6">

                            {/* ---------- Phone ---------- */}
                            <input
                                type="text"
                                name="phone"
                                defaultValue={userDetails?.phone || ""}
                                placeholder="Contact No."
                                className="w-full border-b border-slate-400 outline-none"
                            />


                            {/* ---------- Email(disabled) ---------- */}
                            <input
                                type="email"
                                name="email"
                                defaultValue={userDetails?.email || ""}
                                placeholder="Email"
                                className="w-full border-b border-slate-400 outline-none cursor-not-allowed"
                                disabled
                            />

                            {/* ---------- Facebook ---------- */}
                            <input
                                type="text"
                                name="facebook"
                                defaultValue={userDetails?.facebook || ""}
                                placeholder="Facebook URL"
                                className="w-full border-b border-slate-400 outline-none"
                            />

                            {/* ---------- LinkedIn ---------- */}
                            <input
                                type="text"
                                name="linkedIn"
                                defaultValue={userDetails?.linkedIn || ""}
                                placeholder="LinkedIn URL"
                                className="w-full border-b border-slate-400 outline-none"
                            />

                            {/* ---------- GitHub ---------- */}
                            <input
                                type="text"
                                name="github"
                                defaultValue={userDetails?.github || ""}
                                placeholder="GitHub URL"
                                className="w-full border-b border-slate-400 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* ---------- Right Grid ---------- */}
                <div className="col-span-1 sm:col-span-7 lg:col-span-8 space-y-6 flex flex-col justify-between">

                    {/* ---------- Academic/Career Information ---------- */}
                    <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b-2 pb-2">
                        Academic / Career Information
                    </h2>

                    {/* ---------- Student's only field ---------- */}
                    {formRole === "Student" ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            {/* ---------- student id(disabled) ---------- */}
                            <input
                                type="text"
                                name="studentId"
                                defaultValue={userDetails?.studentId || ""}
                                placeholder="Student ID"
                                className="border-b border-slate-400 outline-none cursor-not-allowed"
                                disabled
                            />

                            {/* ---------- department ---------- */}
                            <select
                                name="department"
                                defaultValue={userDetails?.department}
                                className="py-1 font-poppins border-b border-slate-400 w-full outline-none"
                            >
                                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                                <option value="Business Administration">Business Administration</option>
                                <option value="Accounting">Accounting</option>
                                <option value="Bangla">Bangla</option>
                                <option value="Economics">Economics</option>
                                <option value="English">English</option>
                                <option value="Management">Management</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance and Banking">Finance and Banking</option>
                            </select>

                            {/* ---------- session ---------- */}
                            <input
                                type="text"
                                name="session"
                                defaultValue={userDetails?.session || ""}
                                placeholder="Session"
                                className="border-b outline-none border-slate-400"
                            />

                            {/* ---------- semester ---------- */}
                            <input
                                type="text"
                                name="semester"
                                defaultValue={userDetails?.semester || ""}
                                placeholder="Semester"
                                className="border-b outline-none border-slate-400"
                            />

                            {/* ---------- birthday ---------- */}
                            <input
                                type="text"
                                name="birthday"
                                defaultValue={userDetails?.birthday || ""}
                                className="border-b outline-none border-slate-400"
                                placeholder="Date of Birth (dd-mm-yyyy)"
                            />

                            {/* ---------- resume ---------- */}
                            <input
                                type="text"
                                name="resume"
                                defaultValue={userDetails?.resume || ""}
                                placeholder="Resume URL"
                                className="border-b outline-none border-slate-400"
                            />
                        </div>

                    ) : (

                        // ---------- Alumni Only ---------- 
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            {/* ---------- department ---------- */}
                            <select
                                name="department"
                                defaultValue={userDetails?.department}
                                className="py-1 font-poppins border-b border-slate-400 w-full outline-none"
                            >
                                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                                <option value="Business Administration">Business Administration</option>
                                <option value="Accounting">Accounting</option>
                                <option value="Bangla">Bangla</option>
                                <option value="Economics">Economics</option>
                                <option value="English">English</option>
                                <option value="Management">Management</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance and Banking">Finance and Banking</option>
                            </select>

                            {/* ---------- graduation year ---------- */}
                            <input
                                type="number"
                                name="graduationYear"
                                defaultValue={userDetails?.graduationYear || ""}
                                placeholder="Graduation Year"
                                className="border-b outline-none border-slate-400"
                            />

                            {/* ---------- job title ---------- */}
                            <input
                                type="text"
                                name="jobTitle"
                                defaultValue={userDetails?.jobTitle || ""}
                                placeholder="Current Position"
                                className="border-b outline-none border-slate-400"
                            />

                            {/* ---------- company name ---------- */}
                            <input
                                type="text"
                                name="company"
                                defaultValue={userDetails?.company || ""}
                                placeholder="Company/Organization name"
                                className="border-b outline-none border-slate-400"
                            />

                            {/* ---------- company location ---------- */}
                            <input
                                type="text"
                                name="companyLocation"
                                defaultValue={userDetails?.companyLocation || ""}
                                placeholder="Company Location"
                                className="border-b outline-none border-slate-400"
                            />
                        </div>
                    )}

                    {/* ---------- Address Section ---------- */}
                    <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b-2 pb-2">
                        Address
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                        {/* ---------- street ---------- */}
                        <input
                            type="text"
                            name="street"
                            defaultValue={userDetails?.address?.street || ""}
                            placeholder="Street"
                            className="border-b outline-none col-span-2 border-slate-400"
                        />

                        {/* ---------- city ---------- */}
                        <input
                            type="text"
                            name="city"
                            defaultValue={userDetails?.address?.city || ""}
                            placeholder="City"
                            className="border-b outline-none border-slate-400"
                        />

                        {/* ---------- state ---------- */}
                        <input
                            type="text"
                            name="state"
                            defaultValue={userDetails?.address?.state || ""}
                            placeholder="State/Region"
                            className="border-b outline-none border-slate-400"
                        />

                        {/* ---------- country ---------- */}
                        <input
                            type="text"
                            name="country"
                            defaultValue={userDetails?.address?.country || ""}
                            placeholder="Country"
                            className="border-b outline-none border-slate-400"
                        />

                        {/* ---------- zip code ---------- */}
                        <input
                            type="text"
                            name="zip"
                            defaultValue={userDetails?.address?.zip || ""}
                            placeholder="Postal Code"
                            className="border-b outline-none border-slate-400"
                        />
                    </div>

                    {/* ---------- skills section ---------- */}
                    <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b-2 pb-2">
                        Skills
                    </h2>
                    <div>
                        <div className={`flex flex-wrap gap-2 ${formSkills.length > 0 && "mb-4"}`}>
                            {formSkills.map((skill, idx) => (

                                // ---------- Each Skill ----------
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-primary text-white text-xs lg:text-sm rounded-lg shadow flex items-center gap-1"
                                >
                                    {skill}

                                    {/* ---------- skill remove button ---------- */}
                                    <button
                                        type="button"
                                        onClick={() => handleSkillRemove(idx)}
                                        className="font-bold cursor-pointer"
                                    >
                                        <MdOutlineCancel />
                                    </button>
                                </span>
                            ))}
                        </div>

                        {/* ---------- skill add field ---------- */}
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Add skill & press Enter"
                                onKeyDown={handleSkillAdd}
                                className="border-b border-slate-400 outline-none"
                            />
                        </div>

                    </div>

                    {/* ---------- save change button ---------- */}
                    <div className="">
                        <PurpleButton text="Save Changes" type="submit" />
                    </div>
                </div>
            </form>
        </>
    );
};

export default UpdateUserProfile;