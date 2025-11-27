import { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import defaultUser from "../../assets/default_user.jpg";
import defaultEventBanner from "../../assets/default_event_banner.jpg";
import { FaLink, FaRegStar, FaRegUser, FaStar, FaUsers } from "react-icons/fa";
import { MdOutlineEditCalendar } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BiTimeFive, BiCategory, BiEdit } from "react-icons/bi";
import AuthContext from "../../contexts/AuthContext";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { ClipLoader } from "react-spinners";
import hourFormatConverter from "../../functions/formatTimeString";

const UserEventDetails = ({ display = "" }) => {

    // ---------- data from auth provider ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- event id from url ----------
    const { id } = useParams();

    // ---------- react hooks ----------
    const navigate = useNavigate();

    // ---------- event data for display ----------
    const [eventDetails, setEventDetails] = useState({});

    // ---------- date state (formatted) ----------
    const [formattedDate, setFormattedDate] = useState("N/A");

    // ---------- loading state for interested button ----------
    const [loading, setLoading] = useState(false);

    const fetchEventDetails = useCallback(async () => {
        try {
            const token = await user.getIdToken();
            const { data } = await axios.get(`http://localhost:5000/events/details/${id}`, {
                params: { userId: userDetails?._id },
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (data) {
                setEventDetails(data);
            }
            else {
                navigate("/error");
            }
        }
        catch {
            navigate("/error");
        }
    }, [id, userDetails?._id, navigate, user]);

    // ---------- fetch event details when page loads ----------
    useEffect(() => {
        if (!userDetails?._id) return;
        fetchEventDetails();
    }, [id, navigate, userDetails?._id, fetchEventDetails]);

    // ---------- format event date when eventDetails state is changed ----------
    useEffect(() => {
        if (eventDetails?.date) {
            setFormattedDate(format(new Date(eventDetails.date), "MMMM d, yyyy"));
        }
    }, [eventDetails]);

    // ---------- toggle interested function ----------
    const handleToggleInterested = async (e) => {
        e.preventDefault();

        setLoading(true);

        // ---------- patch request ----------
        try {
            const token = await user.getIdToken();
            await axios.patch(`http://localhost:5000/events/interested/${eventDetails?._id}`, { userId: userDetails?._id }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            fetchEventDetails();
            setLoading(false);
        }
        catch {
            toast.error("Something went wrong");
            setLoading(false);
        }
    }

    // ---------- event delete function ----------
    const handleEventDelete = () => {

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
                <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight:bold;">Remove this event?</h2>
                <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">This event will no longer be visible to others on this platform.</p>
            `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Removing Event...");

                // DELETE event request to server
                try {
                    const token = await user.getIdToken();
                    const { data } = await axios.delete(`http://localhost:5000/events/${eventDetails?._id}`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        navigate("/events");
                        toast.success("Removed", { id: toastId });
                    }
                    else {
                        toast.error("Something went wrong", { id: toastId });
                    }
                }
                catch {
                    toast.error("Something went wrong", { id: toastId });
                }
            }
        });
    };

    return (
        <div>
            {/* ---------- header without searchbar ---------- */}
            <UserHeader searchBar="invisible" display={display} />

            {/* ---------- banner section ---------- */}
            <div className="h-64 md:h-96">
                <img
                    src={eventDetails?.banner || defaultEventBanner}
                    onError={(e) => { e.currentTarget.src = defaultEventBanner; }}
                    alt="Event Banner"
                    className="h-full object-cover mx-auto"
                />
            </div>

            {/* ---------- main content section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark grid gap-6 md:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-3">

                {/* ---------- left grid ---------- */}
                <div className="col-span-1 md:col-span-2">

                    {/* ---------- date and time ---------- */}
                    <p className="text-primary font-semibold font-poppins">
                        {formattedDate} at {hourFormatConverter(eventDetails?.timeRange?.start)} - {hourFormatConverter(eventDetails?.timeRange?.end)}
                    </p>

                    {/* ---------- title and controls ---------- */}
                    <div className="flex justify-between items-center gap-3 mt-2">

                        {/* ---------- title ---------- */}
                        <h2 className="text-xl md:text-2xl font-poppins font-bold text-dark">
                            {eventDetails?.title || "N/A"}
                        </h2>

                        <div className="min-w-fit">
                            {/* ---------- control section ---------- */}
                            {eventDetails?.creator?._id === userDetails?._id
                                ?
                                // ---------- if current user is creator then show update and delete button ----------
                                <div className="flex items-center gap-2">
                                    <Link to={`/events/update/${eventDetails?._id}`}>
                                        <BiEdit className="text-xl md:text-2xl text-slate-600 hover:text-primary cursor-pointer" />
                                    </Link>
                                    <AiOutlineDelete
                                        onClick={handleEventDelete}
                                        className="text-xl md:text-2xl text-slate-600 hover:text-red-600 cursor-pointer"
                                    />
                                </div>
                                :
                                // ---------- if current user is not event creator then check if loading is true ----------
                                loading
                                    ?
                                    // ---------- loading spinner ----------
                                    <ClipLoader
                                        color="#f59e0b"
                                        size={15}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                    :
                                    // ---------- if loading state is false ----------
                                    eventDetails?.isInterested
                                        ?
                                        <FaStar onClick={handleToggleInterested} className="text-amber-500 text-xl md:text-2xl cursor-pointer" />
                                        :
                                        <FaRegStar onClick={handleToggleInterested} className="text-amber-500 text-xl md:text-2xl cursor-pointer" />
                            }
                        </div>
                    </div>


                    {/* ---------- event overview container (small device) ---------- */}
                    <div className="space-y-6 text-sm mt-10 px-4 md:hidden">

                        {/* ---------- organized by ---------- */}
                        <div className="grid min-[300px]:grid-cols-2 gap-2">
                            <div className="flex gap-2 items-start leading-none mt-0.5">
                                <FaRegUser />
                                <span className="font-poppins">Organized By</span>
                            </div>
                            <div>
                                <Link to={`/profile/${eventDetails?.creator?._id}`}><p className="text-sm font-semibold hover:underline text-slate-500 hover:text-primary transition-all duration-200">{eventDetails?.creator?.name}</p></Link>
                            </div>
                        </div>

                        {/* ---------- event type ---------- */}
                        <div className="grid min-[300px]:grid-cols-2 gap-2">
                            <div className="flex gap-2 items-start leading-none mt-0.5">
                                <BiCategory />
                                <span className="font-poppins">Type</span>
                            </div>
                            <p className="text-slate-500">{eventDetails?.type}</p>
                        </div>

                        {/* ---------- link or location based on type ---------- */}
                        {eventDetails?.type === "Offline"
                            ?
                            (
                                // ---------- location ----------
                                <div className="grid min-[300px]:grid-cols-2 gap-2">
                                    <div className="flex gap-2 items-start leading-none mt-0.5">
                                        <IoLocationOutline />
                                        <span className="font-poppins">Location</span>
                                    </div>
                                    <p className="text-slate-500">{eventDetails?.location || "N/A"}</p>
                                </div>
                            )
                            :
                            (
                                // ---------- link ----------
                                <div className="grid min-[300px]:grid-cols-2 gap-2">
                                    <div className="flex gap-2 items-start leading-none mt-0.5">
                                        <FaLink />
                                        <span className="font-poppins">Link</span>
                                    </div>
                                    <a href={eventDetails?.link} className="inline-block max-w-40 text-slate-500 hover:text-primary hover:underline active:text-primary active:underline truncate transition-all duration-200" target="_blank">{eventDetails?.link}</a>
                                </div>
                            )
                        }

                        {/* ---------- response ---------- */}
                        {
                            eventDetails?.interestedCount > 0 &&
                            <div className="grid min-[300px]:grid-cols-2 gap-2">
                                <div className="flex gap-2 items-start leading-none mt-0.5">
                                    <FaUsers />
                                    <span className="font-poppins">Response</span>
                                </div>
                                <p className="text-slate-500">{eventDetails?.interestedCount} people interested</p>
                            </div>
                        }
                    </div>


                    {/* ---------- event description ---------- */}
                    {eventDetails?.description && (
                        <div className="mt-10">
                            <h3 className="font-poppins text-lg md:text-xl font-bold text-dark">
                                About the Event
                            </h3>
                            <div className="my-4">
                                {eventDetails.description.split("\n\n").map((para, idx) => (
                                    <p key={idx} className="mb-4 text-sm sm:text-base">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ---------- right grid ---------- */}
                <div className="hidden md:block col-span-1">
                    <div className="sticky top-20">
                        <h2 className="text-dark font-semibold font-poppins mt-1">Event Overview</h2>
                        <hr className="w-12 mt-2 mb-6 border border-primary" />

                        <div className="space-y-6 text-sm">

                            {/* ---------- organized by ---------- */}
                            <div>
                                <div className="flex gap-2 items-center">
                                    <FaRegUser />
                                    <span className="font-poppins">Organized By</span>
                                </div>
                                <div className="flex gap-2 items-center text-slate-500 ml-[22px] mt-2">

                                    {/* ---------- organizer image ---------- */}
                                    <img
                                        className="w-8 h-8 rounded-full object-cover"
                                        src={eventDetails?.creator?.userImage || defaultUser}
                                        onError={(e) => { e.currentTarget.src = defaultUser; }}
                                        alt="Organizer"
                                    />

                                    {/* ---------- organizer name ---------- */}
                                    <Link to={`/profile/${eventDetails?.creator?._id}`}>
                                        <p className="text-sm font-semibold hover:underline hover:text-primary transition-all duration-200">
                                            {eventDetails?.creator?.name}
                                        </p>
                                    </Link>
                                </div>
                            </div>

                            {/* ---------- date ---------- */}
                            <div>
                                <div className="flex gap-2 items-center">
                                    <MdOutlineEditCalendar />
                                    <span className="font-poppins">Date</span>
                                </div>
                                <p className="text-slate-500 ml-[22px] mt-2">{formattedDate}</p>
                            </div>

                            {/* ---------- time ---------- */}
                            <div>
                                <div className="flex gap-2 items-center">
                                    <BiTimeFive />
                                    <span className="font-poppins">Time</span>
                                </div>
                                <p className="text-slate-500 ml-[22px] mt-2">
                                    {hourFormatConverter(eventDetails?.timeRange?.start)} - {hourFormatConverter(eventDetails?.timeRange?.end)}
                                </p>
                            </div>

                            {/* ---------- event type ---------- */}
                            <div>
                                <div className="flex gap-2 items-center">
                                    <BiCategory />
                                    <span className="font-poppins">Type</span>
                                </div>
                                <p className="text-slate-500 ml-[22px] mt-2">{eventDetails?.type}</p>
                            </div>

                            {/* ---------- location or link based on event type ---------- */}
                            {eventDetails?.type === "Offline"
                                ?
                                (
                                    // ---------- location ----------
                                    <div>
                                        <div className="flex gap-2 items-center">
                                            <IoLocationOutline />
                                            <span className="font-poppins">Location</span>
                                        </div>
                                        <p className="text-slate-500 ml-[22px] mt-2">
                                            {eventDetails?.location || "N/A"}
                                        </p>
                                    </div>
                                )
                                :
                                (
                                    // ---------- link ----------
                                    <div>
                                        <div className="flex gap-2 items-center">
                                            <FaLink />
                                            <span className="font-poppins">Link</span>
                                        </div>
                                        <a href={eventDetails?.link} className="inline-block max-w-40 text-slate-500 ml-[22px] mt-2 hover:text-primary hover:underline active:text-primary active:underline truncate transition-all duration-200" target="_blank">
                                            {eventDetails?.link}
                                        </a>
                                    </div>
                                )
                            }


                            {/* ---------- response ---------- */}
                            {
                                eventDetails?.interestedCount > 0 &&
                                <div>
                                    <div className="flex gap-2 items-center">
                                        <FaUsers />
                                        <span className="font-poppins">Response</span>
                                    </div>
                                    <p className="text-slate-500 ml-[22px] mt-2">{eventDetails?.interestedCount} people interested</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEventDetails;