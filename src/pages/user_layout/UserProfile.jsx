import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import defaultUser from "../../assets/default_user.jpg";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import BlueButton from "../../components/shared/buttons/BlueButton";
import RedButton from "../../components/shared/buttons/RedButton";
import UserHeader from "../../components/user_layout/UserHeader";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const UserProfile = () => {
    const { userDetails } = useContext(AuthContext);

    return (
        <>
            {/* ---------- header without searchbar ---------- */}
            <UserHeader searchBar=""></UserHeader>

            {/* ---------- Main Section of Profile Page ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 text-semi-dark mx-2 md:mx-5 my-8 text-sm lg:text-base min-w-0">

                {/* ---------- Left Grid ---------- */}
                <div className="col-span-1 sm:col-span-6 lg:col-span-4">

                    {/* ---------- image,name,badge container ---------- */}
                    <div className="flex flex-wrap gap-3">

                        {/* ---------- image ---------- */}
                        <img className="w-20 h-20 rounded-2xl object-cover" src={defaultUser} alt="user image" />

                        {/* ---------- name and badge container ---------- */}
                        <div className="">
                            {/* ---------- name ---------- */}
                            <p className="text-lg sm:text-xl font-bold text-dark mb-0.5 font-poppins">Display Name</p>

                            {/* ---------- badge(student,alumni) ---------- */}
                            <span className="text-xs font-semibold bg-primary text-white px-2 py-1 rounded-lg font-poppins">Student</span>
                        </div>
                    </div>

                    {/* ---------- about ---------- */}
                    <div className="mt-5 space-y-2">
                        <h2 className="font-bold font-poppins text-base lg:text-lg text-dark">About</h2>

                        {/* ---------- Bio ---------- */}
                        <p className="">I am a Frontend React Developer and currently a Computer Science Engineering student at Dhaka City College</p>

                        {/* ---------- External link container ---------- */}
                        <div className="mt-6 space-y-2">

                            {/* ---------- Phone ---------- */}
                            <p className="flex items-center gap-2"><IoCallOutline className="text-lg" /> <span className="truncate font-semibold">+8801721553478</span></p>

                            {/* ---------- Email ---------- */}
                            <p className="flex items-center gap-2"><MdOutlineEmail className="text-lg" /> <span className="truncate font-semibold">mehedi@gmail.com</span></p>

                            {/* ---------- Facebook ---------- */}
                            <p className="flex items-center gap-2"><FaFacebookF className="text-lg" /> <a className="hover:text-primary hover:underline active:text-primary active:underline truncate font-semibold" href="https://www.facebook.com/mehedi.hasan.66640" target="_blank">Facebook</a></p>

                            {/* ---------- LinkedIn ---------- */}
                            <p className="flex items-center gap-2"><FaLinkedinIn /> <a className="hover:text-primary hover:underline active:text-primary active:underline truncate font-semibold" href="https://www.linkedin.com/in/mehedi0101/" target="_blank">https://www.linkedin.com/in/mehedi0101/</a></p>

                            {/* ---------- GitHub ---------- */}
                            <p className="flex items-center gap-2"><FiGithub /> <a className="hover:text-primary hover:underline active:text-primary active:underline truncate font-semibold" href="https://github.com/Mehedi0101" target="_blank">Mehedi0101</a></p>
                        </div>

                    </div>

                    <div className="space-y-2 mt-6 hidden sm:block">
                        <div className="flex gap-2">
                            <PurpleButton text='Update Profile' className="text-sm"></PurpleButton>
                            <BlueButton text='Change Password' className="text-sm"></BlueButton>
                        </div>
                        <RedButton text='Request Account Deletion' className="text-sm"></RedButton>
                    </div>
                </div>

                <div className="col-span-1 sm:col-span-6 lg:col-span-8">

                    {/* ---------- Academic / Career Info ---------- */}
                    <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b pb-2">Academic / Career Information</h2>

                    {/* ---------- Student Info ---------- */}
                    {userDetails?.role === "Student" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 mb-8">
                            <p><span className="font-semibold">Department:</span> {userDetails?.department || "CSE"}</p>
                            <p><span className="font-semibold">Session:</span> {userDetails?.session || "2019-20"}</p>
                            <p><span className="font-semibold">Semester:</span> {userDetails?.semester || "6th"}</p>
                            <p><span className="font-semibold">Date of Birth:</span> {userDetails?.dob || "01 Jan 2000"}</p>
                            <p><span className="font-semibold">Resume: </span>
                                <a href={userDetails?.resume || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline">
                                    View Resume
                                </a>
                            </p>
                        </div>
                    )}

                    {/* ---------- Alumni Info ---------- */}
                    {userDetails?.role === "Alumni" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 mb-8">
                            <p><span className="font-semibold">Department:</span> {userDetails?.department || "CSE"}</p>
                            <p><span className="font-semibold">Graduation Year:</span> {userDetails?.graduationYear || "2023"}</p>
                            <p><span className="font-semibold">Current Position:</span> {userDetails?.jobTitle || "Software Engineer"}</p>
                            <p><span className="font-semibold">Company:</span> {userDetails?.company || "Tech Ltd."}</p>
                            <p><span className="font-semibold">Location:</span> {userDetails?.location || "Dhaka, Bangladesh"}</p>
                            <p><span className="font-semibold">Resume:</span>
                                <a href={userDetails?.resume || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline">
                                    View Resume
                                </a>
                            </p>
                        </div>
                    )}

                    {/* ---------- Address ---------- */}
                    <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b pb-2">Address</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 mb-8">
                        <p className="col-span-1 lg:col-span-2 truncate"><span className="font-semibold">Street:</span> {userDetails?.address?.street || "123 Example Road"}</p>
                        <p><span className="font-semibold">City:</span> {userDetails?.address?.city || "Dhaka"}</p>
                        <p><span className="font-semibold">State/Region:</span> {userDetails?.address?.state || "Dhaka Division"}</p>
                        <p><span className="font-semibold">Country:</span> {userDetails?.address?.country || "Bangladesh"}</p>
                        <p><span className="font-semibold">Postal Code:</span> {userDetails?.address?.zip || "1205"}</p>
                    </div>

                    {/* ---------- Skills ---------- */}
                    <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b pb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2 mt-4 mb-8">
                        {(userDetails?.skills || ["React", "Node.js", "MongoDB", "TailwindCSS"]).map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-primary text-white text-xs lg:text-sm rounded-lg shadow">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-2 mt-6 block sm:hidden">
                        <div className="flex gap-2 flex-wrap">
                            <PurpleButton text='Update Profile' className="text-sm max"></PurpleButton>
                            <BlueButton text='Change Password' className="text-sm"></BlueButton>
                        </div>
                        <RedButton text='Request Account Deletion' className="text-sm"></RedButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;