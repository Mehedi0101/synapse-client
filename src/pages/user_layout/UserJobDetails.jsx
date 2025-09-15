import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import defaultLogo from "../../assets/synapse-logo-square.png";
import defaultUser from "../../assets/default_user.jpg";
import { FaRegMoneyBillAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineEditCalendar, MdOutlineWorkOutline } from "react-icons/md";
import { format } from "date-fns";
import { IoLocationOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import PurpleButton from "../../components/shared/buttons/PurpleButton";

const UserJobDetails = () => {

    // ---------- react hooks ----------
    const navigate = useNavigate();
    const { id } = useParams();

    // ---------- contains the data that will be displayed ----------
    const [jobDetails, setJobDetails] = useState({});
    const [postedDate, setPostedDate] = useState("N/A");

    console.log(postedDate);

    useEffect(() => {
        // ---------- fetch job details by id ----------
        axios.get(`http://localhost:5000/jobs/${id}`)
            .then((data) => {
                if (data.data) setJobDetails(data.data);
                else navigate('/error');
            })
            .catch(() => {
                navigate('/error');
            })
    }, [id, navigate])

    // ---------- set posted date ----------
    useEffect(() => {
        jobDetails?.createdAt ? setPostedDate(format(new Date(jobDetails?.createdAt), "MMMM d, yyyy")) : setPostedDate("N/A");
    }, [jobDetails])

    return (
        <div>
            {/* ---------- user header without searchbar ---------- */}
            <UserHeader searchBar="invisible"></UserHeader>

            {/* ---------- main content ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark grid gap-4 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-3">

                {/* ---------- left grid ---------- */}
                <div className="col-span-1 md:col-span-2">

                    {/* ---------- job details heading container ---------- */}
                    <div className="flex gap-2">

                        {/* ---------- company logo ---------- */}
                        <div>
                            <img className="w-20 h-20 object-cover" src={jobDetails?.company?.logo || defaultLogo} alt="" />
                        </div>

                        {/* ---------- company name, location, type container ---------- */}
                        <div>
                            <h2 className="text-xl md:text-2xl font-poppins font-bold text-dark mb-2">{jobDetails?.jobTitle || "N/A"}</h2>
                            <p className="text-primary text-sm mb-1">{jobDetails?.company?.name || "N/A"}</p>
                            {jobDetails?.company?.type && <p className="text-slate-500 text-sm">{jobDetails?.company?.type}</p>}
                        </div>
                    </div>

                    {/* ---------- job overview container (small device) ---------- */}
                    <div className="space-y-6 text-sm mt-10 px-4 md:hidden">

                        {/* ---------- posted by ---------- */}
                        <div className="grid min-[300px]:grid-cols-2 gap-2">
                            <div className="flex gap-2 items-start leading-none mt-0.5">
                                <FaRegUser />
                                <span className="font-poppins">Posted By</span>
                            </div>
                            <div>
                                <Link to={`/profile/${jobDetails?.author?._id}`}><p className="text-sm font-semibold hover:underline text-slate-500 hover:text-primary transition-all duration-200">{jobDetails?.author?.name}</p></Link>
                            </div>
                        </div>

                        {/* ---------- posted on ---------- */}
                        <div className="grid min-[300px]:grid-cols-2 gap-2">
                            <div className="flex gap-2 items-start leading-none mt-0.5">
                                <MdOutlineEditCalendar />
                                <span className="font-poppins">Posted On</span>
                            </div>
                            <p className="text-slate-500">{postedDate}</p>
                        </div>

                        {/* ---------- location ---------- */}
                        <div className="grid min-[300px]:grid-cols-2 gap-2">
                            <div className="flex gap-2 items-start leading-none mt-0.5">
                                <IoLocationOutline />
                                <span className="font-poppins">Location</span>
                            </div>
                            <p className="text-slate-500">{jobDetails?.company?.location}</p>
                        </div>

                        {/* ---------- job type ---------- */}
                        <div className="grid min-[300px]:grid-cols-2 gap-2">
                            <div className="flex gap-2 items-start leading-none mt-0.5">
                                <MdOutlineWorkOutline />
                                <span className="font-poppins">Job Type</span>
                            </div>
                            <p className="text-slate-500">{jobDetails?.jobType}</p>
                        </div>

                        {/* ---------- salary ---------- */}
                        <div className="grid min-[300px]:grid-cols-2 gap-2">
                            <div className="flex gap-2 items-start leading-none mt-0.5">
                                <FaRegMoneyBillAlt />
                                <span className="font-poppins">Salary</span>
                            </div>
                            <p className="text-slate-500">{jobDetails?.salary}</p>
                        </div>

                        {/* ---------- category ---------- */}
                        <div className="grid min-[300px]:grid-cols-2 gap-2">
                            <div className="flex gap-2 items-start leading-none mt-0.5">
                                <BiCategory />
                                <span className="font-poppins">Category</span>
                            </div>
                            <p className="text-slate-500">{jobDetails?.category}</p>
                        </div>
                    </div>

                    {/* ---------- job description section ---------- */}
                    <div className="mt-12">
                        <h2 className="font-poppins text-lg md:text-xl font-bold text-dark">Job Description</h2>
                        <div className="my-4">

                            {/* ---------- splitting based on the newline character ---------- */}
                            {jobDetails?.description?.split("\n\n").map((para, idx) => (
                                <p key={idx} className="mb-4 text-sm sm:text-base">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* ---------- responsibilities section ---------- */}
                    {
                        jobDetails?.responsibility?.length > 0 &&
                        <div className="mt-12">
                            <h2 className="font-poppins text-lg md:text-xl font-bold text-dark">Responsibilities</h2>
                            <ul className="my-4 list-disc ml-5">

                                {/* ---------- splitting the text container based on the newline character ---------- */}
                                {jobDetails?.responsibility?.map((res, idx) => (
                                    <li key={idx} className="mb-2 text-sm sm:text-base">
                                        {res}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }

                    {/* ---------- requirements section ---------- */}
                    {
                        jobDetails?.requirements?.length > 0 &&
                        <div className="mt-12">
                            <h2 className="font-poppins text-lg md:text-xl font-bold text-dark">Requirements</h2>
                            <ul className="my-4 list-disc ml-5">

                                {/* ---------- splitting the text container based on the newline character ---------- */}
                                {jobDetails?.requirements?.map((req, idx) => (
                                    <li key={idx} className="mb-2 text-sm sm:text-base">
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }

                    {/* ---------- apply button ---------- */}
                    <a href={jobDetails?.applyLink || "#"} target="_blank"><PurpleButton className="max-w-fit mt-6" text="Apply Now"></PurpleButton></a>
                </div>

                {/* ---------- right grid (hidden for small device) ---------- */}
                <div className="hidden md:block col-span-1">

                    {/* ---------- job overview container ---------- */}
                    <div className="sticky top-20">
                        <h2 className="text-dark font-semibold font-poppins mt-1">Job Overview</h2>
                        <hr className="w-12 mt-2 mb-6 border border-primary" />

                        <div className="space-y-6 text-sm">

                            {/* ---------- posted by ---------- */}
                            <div>
                                <div className="flex gap-2 items-center">
                                    <FaRegUser />
                                    <span className="font-poppins">Posted By</span>
                                </div>
                                <div className="flex gap-2 items-center text-slate-500 ml-[22px] mt-2">

                                    {/* ---------- connected user's image ---------- */}
                                    <img className="w-8 h-8 rounded-full object-cover" src={jobDetails?.author?.userImage || defaultUser} alt="" />

                                    {/* ---------- connected user's role and department ---------- */}
                                    <div>
                                        <Link to={`/profile/${jobDetails?.author?._id}`}><p className="text-sm font-semibold hover:underline hover:text-primary transition-all duration-200">{jobDetails?.author?.name}</p></Link>
                                    </div>
                                </div>
                            </div>

                            {/* ---------- posted on ---------- */}
                            <div>
                                <div className="flex gap-2 items-center">
                                    <MdOutlineEditCalendar />
                                    <span className="font-poppins">Posted On</span>
                                </div>
                                <p className="text-slate-500 ml-[22px] mt-2">{postedDate}</p>
                            </div>

                            {/* ---------- location ---------- */}
                            <div>
                                <div className="flex gap-2 items-center">
                                    <IoLocationOutline />
                                    <span className="font-poppins">Location</span>
                                </div>
                                <p className="text-slate-500 ml-[22px] mt-2">{jobDetails?.company?.location}</p>
                            </div>

                            {/* ---------- job type ---------- */}
                            <div>
                                <div className="flex gap-2 items-center">
                                    <MdOutlineWorkOutline />
                                    <span className="font-poppins">Job Type</span>
                                </div>
                                <p className="text-slate-500 ml-[22px] mt-2">{jobDetails?.jobType}</p>
                            </div>

                            {/* ---------- salary ---------- */}
                            <div>
                                <div className="flex gap-2 items-center">
                                    <FaRegMoneyBillAlt />
                                    <span className="font-poppins">Salary</span>
                                </div>
                                <p className="text-slate-500 ml-[22px] mt-2">{jobDetails?.salary}</p>
                            </div>

                            {/* ---------- category ---------- */}
                            <div>
                                <div className="flex gap-2 items-center">
                                    <BiCategory />
                                    <span className="font-poppins">Category</span>
                                </div>
                                <p className="text-slate-500 ml-[22px] mt-2">{jobDetails?.category}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserJobDetails;