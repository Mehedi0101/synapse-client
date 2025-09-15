import AuthContext from "../../contexts/AuthContext";
import defaultUser from "../../assets/default_user.jpg";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import BlueButton from "../../components/shared/buttons/BlueButton";
import RedButton from "../../components/shared/buttons/RedButton";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import axios from "axios";

const UserProfile = () => {

    // ---------- react hooks ----------
    const navigate = useNavigate();
    const params = useParams();

    // ---------- contains the data that will be displayed ----------
    const [displayData, setDisplayData] = useState({});

    // ---------- data from auth provider ----------
    const { userDetails } = useContext(AuthContext);


    useEffect(() => {
        // ---------- if params contains id ----------
        if (params?.id) {

            // ---------- fetch user data by id ----------
            axios.get(`http://localhost:5000/users/${params?.id}`)
                .then((data) => {
                    if (data.data) setDisplayData(data.data);
                    else navigate('/error');
                })
                .catch(() => {
                    navigate('/error');
                })
        }
        // ---------- if params doesn't contain any id ----------
        else {
            setDisplayData(userDetails);
        }
    }, [params, userDetails, navigate])

    return (
        <>
            {/* ---------- header without searchbar ---------- */}
            <UserHeader searchBar="invisible"></UserHeader>

            {/* ---------- Main Section of Profile Page ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 text-semi-dark mx-2 md:mx-5 my-8 text-sm lg:text-base">

                {/* ---------- Left Grid Section ---------- */}
                <div className="col-span-1 sm:col-span-5 lg:col-span-4 flex flex-col justify-between">

                    {/* ---------- container of all element of left grid without buttons ---------- */}
                    <div>

                        {/* ---------- image,name,badge container ---------- */}
                        <div className="flex flex-wrap gap-3">

                            {/* ---------- image ---------- */}
                            <img className="w-20 h-20 rounded-2xl object-cover" src={displayData?.userImage || defaultUser} alt="user image" />

                            {/* ---------- name and badge container ---------- */}
                            <div className="">
                                {/* ---------- name ---------- */}
                                <p className="text-lg sm:text-xl font-bold text-dark mb-0.5 font-poppins">{displayData?.name || "N/A"}</p>

                                {/* ---------- badge(student,alumni) ---------- */}
                                <span className="text-xs font-semibold bg-primary text-white px-2 py-1 rounded-lg font-poppins">{displayData?.role || "N/A"}</span>
                            </div>
                        </div>

                        {/* <Link className="text-primary underline font-semibold">View All Connections</Link> */}

                        {/* ---------- about ---------- */}
                        <div className="mt-5 space-y-2">
                            <h2 className="font-bold font-poppins text-base lg:text-lg text-dark">About</h2>

                            {/* ---------- Bio ---------- */}
                            <p className="">{displayData?.bio || ""}</p>

                            {/* ---------- External link container ---------- */}
                            <div className="mt-6 space-y-2">

                                {/* ---------- Phone ---------- */}
                                {
                                    displayData?.phone &&
                                    <p className="flex items-center gap-2"><IoCallOutline className="text-lg" /> <span className="truncate font-semibold">+8801721553478</span></p>
                                }

                                {/* ---------- Email ---------- */}
                                {
                                    displayData?.email &&
                                    <p className="flex items-center gap-2"><MdOutlineEmail className="text-lg" /> <span className="truncate font-semibold">{displayData.email}</span></p>
                                }


                                {/* ---------- Facebook ---------- */}
                                {
                                    displayData?.facebook &&
                                    <p className="flex items-center gap-2"><FaFacebookF /> <a className="hover:text-primary hover:underline active:text-primary active:underline truncate font-semibold" href="https://www.facebook.com/mehedi.hasan.66640" target="_blank">{displayData.facebook}</a></p>
                                }


                                {/* ---------- LinkedIn ---------- */}
                                {
                                    displayData?.linkedIn &&
                                    <p className="flex items-center gap-2"><FaLinkedinIn /> <a className="hover:text-primary hover:underline active:text-primary active:underline truncate font-semibold" href="https://www.linkedin.com/in/mehedi0101/" target="_blank">{displayData.linkedIn}</a></p>
                                }

                                {/* ---------- GitHub ---------- */}
                                {
                                    displayData?.github &&
                                    <p className="flex items-center gap-2"><FiGithub className="text-lg" /> <a className="hover:text-primary hover:underline active:text-primary active:underline truncate font-semibold" href="https://github.com/Mehedi0101" target="_blank">{displayData.github}</a></p>
                                }

                            </div>

                        </div>
                    </div>

                    {/* ---------- view all users(my profile only) ---------- */}
                    {
                        !params?.id &&
                        <Link to='/my-connections' className={`text-primary underline font-semibold block mt-5 ${params?.id && "hidden"}`}>View All Connections</Link>
                    }

                    {/* ---------- Button container for large device ---------- */}
                    <div className={`mt-6 hidden sm:block space-y-2`}>

                        {/* ---------- update profile button ---------- */}
                        <Link className={`block ${params?.id && "hidden"}`} to='/update-profile'>
                            <PurpleButton text='Update Profile' className="text-sm"></PurpleButton>
                        </Link>

                        {/* ---------- change password button ---------- */}
                        <Link className={`block ${params?.id && "hidden"}`} to='/update-profile'>
                            <BlueButton text='Change Password' className="text-sm"></BlueButton>
                        </Link>

                        {/* ---------- request account deletion button ---------- */}
                        <RedButton text='Request Account Deletion' className={`text-sm ${params?.id && "hidden"}`}></RedButton>
                    </div>
                </div>



                {/* ---------- Right Grid Section ---------- */}
                <div className="col-span-1 sm:col-span-7 lg:col-span-8 flex flex-col justify-between">

                    {/* ---------- Academic / Career Info ---------- */}
                    <div>
                        <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b pb-2">Academic / Career Information</h2>

                        {/* ---------- For Students only ---------- */}
                        {displayData?.role === "Student" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 mb-8">

                                {/* ---------- student id ---------- */}
                                <p><span className="font-semibold">Student ID:</span> {displayData?.studentId || "N/A"}</p>

                                {/* ---------- department ---------- */}
                                <p><span className="font-semibold">Department:</span> {displayData?.department || "N/A"}</p>

                                {/* ---------- session ---------- */}
                                <p><span className="font-semibold">Session:</span> {displayData?.session || "N/A"}</p>

                                {/* ---------- semester ---------- */}
                                <p><span className="font-semibold">Semester:</span> {displayData?.semester || "N/A"}</p>

                                {/* ---------- date of birth ---------- */}
                                <p><span className="font-semibold">Date of Birth:</span> {displayData?.birthday || "N/A"}</p>

                                {/* ---------- resume ---------- */}
                                <p><span className="font-semibold">Resume: </span>
                                    {
                                        displayData?.resume ?
                                            <a href={displayData?.resume}
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
                        {displayData?.role === "Alumni" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 mb-8">

                                {/* ---------- department ---------- */}
                                <p><span className="font-semibold">Department:</span> {displayData?.department || "N/A"}</p>

                                {/* ---------- graduation year ---------- */}
                                <p><span className="font-semibold">Graduation Year:</span> {displayData?.graduationYear || "N/A"}</p>

                                {/* ---------- date of birth ---------- */}
                                <p><span className="font-semibold">Date of Birth:</span> {displayData?.birthday || "N/A"}</p>

                                {/* ---------- current position ---------- */}
                                <p><span className="font-semibold">Current Position:</span> {displayData?.jobTitle || "N/A"}</p>

                                {/* ---------- company name ---------- */}
                                <p><span className="font-semibold">Company:</span> {displayData?.company || "N/A"}</p>

                                {/* ---------- company location ---------- */}
                                <p><span className="font-semibold">Company Location:</span> {displayData?.companyLocation || "N/A"}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        {/* ---------- Address ---------- */}
                        <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b pb-2">Address</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 mb-8">

                            {/* ---------- street ---------- */}
                            <p className="col-span-1 lg:col-span-2 truncate"><span className="font-semibold">Street:</span> {displayData?.address?.street || "N/A"}</p>

                            {/* ---------- city ---------- */}
                            <p><span className="font-semibold">City:</span> {displayData?.address?.city || "N/A"}</p>

                            {/* ---------- state/region ---------- */}
                            <p><span className="font-semibold">State/Region:</span> {displayData?.address?.state || "N/A"}</p>

                            {/* ---------- country ---------- */}
                            <p><span className="font-semibold">Country:</span> {displayData?.address?.country || "N/A"}</p>

                            {/* ---------- postal code ---------- */}
                            <p><span className="font-semibold">Postal Code:</span> {displayData?.address?.zip || "N/A"}</p>
                        </div>
                    </div>

                    <div>
                        {/* ---------- Skills ---------- */}
                        <h2 className="text-base lg:text-lg font-bold text-dark font-poppins border-b pb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {
                                displayData?.skills && displayData?.skills.length > 0
                                    ?
                                    (displayData.skills).map((skill, idx) => (
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
                            <PurpleButton text='Update Profile' className={`text-sm ${params?.id && "hidden"}`}></PurpleButton>
                        </Link>

                        {/* ---------- change password button ---------- */}
                        <Link className="block" to='/update-profile'>
                            <BlueButton text='Change Password' className={`text-sm ${params?.id && "hidden"}`}></BlueButton>
                        </Link>

                        {/* ---------- request account deletion button ---------- */}
                        <RedButton text='Request Account Deletion' className={`text-sm ${params?.id && "hidden"}`}></RedButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;