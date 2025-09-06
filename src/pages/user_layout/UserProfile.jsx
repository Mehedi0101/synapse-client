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
import { Link } from "react-router-dom";
import { useContext } from "react";

const UserProfile = () => {
    {/* ---------- data from auth provider ---------- */ }
    const { userDetails } = useContext(AuthContext);

    return (
        <>
            {/* ---------- header without searchbar ---------- */}
            <UserHeader searchBar=""></UserHeader>

            {/* ---------- Main Section of Profile Page ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 text-semi-dark mx-2 md:mx-5 my-8 text-sm lg:text-base">

                {/* ---------- Left Grid Section ---------- */}
                <div className="col-span-1 sm:col-span-5 lg:col-span-4 flex flex-col justify-between">

                    {/* ---------- container of all element of left grid without buttons ---------- */}
                    <div>

                        {/* ---------- image,name,badge container ---------- */}
                        <div className="flex flex-wrap gap-3">

                            {/* ---------- image ---------- */}
                            <img className="w-20 h-20 rounded-2xl object-cover" src={userDetails?.userImage || defaultUser} alt="user image" />

                            {/* ---------- name and badge container ---------- */}
                            <div className="">
                                {/* ---------- name ---------- */}
                                <p className="text-lg sm:text-xl font-bold text-dark mb-0.5 font-poppins">{userDetails?.name || "N/A"}</p>

                                {/* ---------- badge(student,alumni) ---------- */}
                                <span className="text-xs font-semibold bg-primary text-white px-2 py-1 rounded-lg font-poppins">{userDetails?.role || "N/A"}</span>
                            </div>
                        </div>

                        {/* ---------- about ---------- */}
                        <div className="mt-5 space-y-2">
                            <h2 className="font-bold font-poppins text-base lg:text-lg text-dark">About</h2>

                            {/* ---------- Bio ---------- */}
                            <p className="">{userDetails?.bio || ""}</p>

                            {/* ---------- External link container ---------- */}
                            <div className="mt-6 space-y-2">

                                {/* ---------- Phone ---------- */}
                                {
                                    userDetails?.phone &&
                                    <p className="flex items-center gap-2"><IoCallOutline className="text-lg" /> <span className="truncate font-semibold">+8801721553478</span></p>
                                }

                                {/* ---------- Email ---------- */}
                                {
                                    userDetails?.email &&
                                    <p className="flex items-center gap-2"><MdOutlineEmail className="text-lg" /> <span className="truncate font-semibold">{userDetails.email}</span></p>
                                }


                                {/* ---------- Facebook ---------- */}
                                {
                                    userDetails?.facebook &&
                                    <p className="flex items-center gap-2"><FaFacebookF /> <a className="hover:text-primary hover:underline active:text-primary active:underline truncate font-semibold" href="https://www.facebook.com/mehedi.hasan.66640" target="_blank">{userDetails.facebook}</a></p>
                                }


                                {/* ---------- LinkedIn ---------- */}
                                {
                                    userDetails?.linkedIn &&
                                    <p className="flex items-center gap-2"><FaLinkedinIn /> <a className="hover:text-primary hover:underline active:text-primary active:underline truncate font-semibold" href="https://www.linkedin.com/in/mehedi0101/" target="_blank">{userDetails.linkedIn}</a></p>
                                }

                                {/* ---------- GitHub ---------- */}
                                {
                                    userDetails?.github &&
                                    <p className="flex items-center gap-2"><FiGithub className="text-lg" /> <a className="hover:text-primary hover:underline active:text-primary active:underline truncate font-semibold" href="https://github.com/Mehedi0101" target="_blank">{userDetails.github}</a></p>
                                }

                            </div>

                        </div>
                    </div>

                    {/* ---------- Button container for large device ---------- */}
                    <div className="mt-6 hidden sm:block space-y-2">

                        {/* ---------- update profile button ---------- */}
                        <Link className="block" to='/update-profile'>
                            <PurpleButton text='Update Profile' className="text-sm"></PurpleButton>
                        </Link>

                        {/* ---------- change password button ---------- */}
                        <Link className="block" to='/update-profile'>
                            <BlueButton text='Change Password' className="text-sm"></BlueButton>
                        </Link>

                        {/* ---------- request account deletion button ---------- */}
                        <RedButton text='Request Account Deletion' className="text-sm"></RedButton>
                    </div>
                </div>



                {/* ---------- Right Grid Section ---------- */}
                <div className="col-span-1 sm:col-span-7 lg:col-span-8 flex flex-col justify-between">

                    {/* ---------- Academic / Career Info ---------- */}
                    <div>
                        <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b pb-2">Academic / Career Information</h2>

                        {/* ---------- For Students only ---------- */}
                        {userDetails?.role === "Student" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 mb-8">

                                {/* ---------- student id ---------- */}
                                <p><span className="font-semibold">Student ID:</span> {userDetails?.studentId || "N/A"}</p>

                                {/* ---------- department ---------- */}
                                <p><span className="font-semibold">Department:</span> {userDetails?.department || "N/A"}</p>

                                {/* ---------- session ---------- */}
                                <p><span className="font-semibold">Session:</span> {userDetails?.session || "N/A"}</p>

                                {/* ---------- semester ---------- */}
                                <p><span className="font-semibold">Semester:</span> {userDetails?.semester || "N/A"}</p>

                                {/* ---------- date of birth ---------- */}
                                <p><span className="font-semibold">Date of Birth:</span> {userDetails?.birthday || "N/A"}</p>

                                {/* ---------- resume ---------- */}
                                <p><span className="font-semibold">Resume: </span>
                                    {
                                        userDetails?.resume ?
                                            <a href={userDetails?.resume}
                                                target="_blank"
                                                className="text-primary hover:underline">
                                                View Resume
                                            </a>
                                            :
                                            "N/A"
                                    }
                                </p>
                            </div>
                        )}

                        {/* ---------- For Alumni Only ---------- */}
                        {userDetails?.role === "Alumni" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 mb-8">

                                {/* ---------- department ---------- */}
                                <p><span className="font-semibold">Department:</span> {userDetails?.department || "N/A"}</p>

                                {/* ---------- graduation year ---------- */}
                                <p><span className="font-semibold">Graduation Year:</span> {userDetails?.graduationYear || "N/A"}</p>

                                {/* ---------- date of birth ---------- */}
                                <p><span className="font-semibold">Date of Birth:</span> {userDetails?.birthday || "N/A"}</p>

                                {/* ---------- current position ---------- */}
                                <p><span className="font-semibold">Current Position:</span> {userDetails?.jobTitle || "N/A"}</p>

                                {/* ---------- company name ---------- */}
                                <p><span className="font-semibold">Company:</span> {userDetails?.company || "N/A"}</p>

                                {/* ---------- company location ---------- */}
                                <p><span className="font-semibold">Company Location:</span> {userDetails?.companyLocation || "N/A"}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        {/* ---------- Address ---------- */}
                        <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b pb-2">Address</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 mb-8">

                            {/* ---------- street ---------- */}
                            <p className="col-span-1 lg:col-span-2 truncate"><span className="font-semibold">Street:</span> {userDetails?.address?.street || "N/A"}</p>

                            {/* ---------- city ---------- */}
                            <p><span className="font-semibold">City:</span> {userDetails?.address?.city || "N/A"}</p>

                            {/* ---------- state/region ---------- */}
                            <p><span className="font-semibold">State/Region:</span> {userDetails?.address?.state || "N/A"}</p>

                            {/* ---------- country ---------- */}
                            <p><span className="font-semibold">Country:</span> {userDetails?.address?.country || "N/A"}</p>

                            {/* ---------- postal code ---------- */}
                            <p><span className="font-semibold">Postal Code:</span> {userDetails?.address?.zip || "N/A"}</p>
                        </div>
                    </div>

                    <div>
                        {/* ---------- Skills ---------- */}
                        <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b pb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {
                                userDetails?.skills && userDetails?.skills.length > 0
                                    ?
                                    (userDetails.skills).map((skill, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-primary text-white text-xs lg:text-sm rounded-lg shadow">
                                            {skill}
                                        </span>
                                    ))
                                    :
                                    "N/A"
                            }
                        </div>
                    </div>

                    {/* ---------- button section for smaller device ---------- */}
                    <div className="space-y-2 mt-8 block sm:hidden">
                        {/* ---------- update profile button ---------- */}
                        <Link className="block" to='/update-profile'>
                            <PurpleButton text='Update Profile' className="text-sm"></PurpleButton>
                        </Link>

                        {/* ---------- change password button ---------- */}
                        <Link className="block" to='/update-profile'>
                            <BlueButton text='Change Password' className="text-sm"></BlueButton>
                        </Link>

                        {/* ---------- request account deletion button ---------- */}
                        <RedButton text='Request Account Deletion' className="text-sm"></RedButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;