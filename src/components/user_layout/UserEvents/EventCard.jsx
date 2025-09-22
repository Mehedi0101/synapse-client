import { format } from "date-fns";
import defaultEventBanner from "../../../assets/default_event_banner.jpg";
import hourFormatConverter from "../../../functions/formatTimeString";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import defaultUser from "../../../assets/default_user.jpg";
import { Link } from "react-router-dom";

const EventCard = ({ event, isMyEvent = false }) => {

    // ---------- user details from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- event data for display ----------
    const [eventData, setEventData] = useState(event);

    // ---------- loading state for interested button ----------
    const [loading, setLoading] = useState(false);

    // ---------- event date ----------
    const day = format(eventData?.date, "d");
    const month = format(eventData?.date, "MMM").toUpperCase();

    // ---------- toggle interested function ----------
    const handleToggleInterested = (e) => {
        e.preventDefault();

        // ---------- loading state set to true ----------
        setLoading(true);

        // ---------- patch request for adding or removing from interestedUsers list ----------
        axios.patch(`http://localhost:5000/events/interested/${eventData?._id}`, { userId: userDetails?._id })
            .then(data => {
                setEventData(data.data)

                // ---------- loading state set to false ----------
                setLoading(false);
            })
            .catch(() => {
                toast.error("Something went wrong")

                // ---------- loading state set to false ----------
                setLoading(false);
            })
    }

    return (
        <Link to={`/events/${event?._id}`} className="rounded-xl flex flex-col shadow-lg hover:shadow-xl cursor-pointer group">

            {/* ---------- Banner ---------- */}
            <div className="relative h-40 overflow-hidden rounded-t-xl">

                {/* ---------- banner image ---------- */}
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat bg-center transition-transform duration-500 ease-in-out group-hover:scale-110 group-active:scale-110"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${eventData?.banner || defaultEventBanner})`,
                    }}
                ></div>

                {/* ---------- Date badge ---------- */}
                <div className="relative z-10 bg-white inline-block px-2 py-1 rounded m-4 text-center text-primary font-poppins">
                    <p className="text-xl font-semibold leading-6">{day}</p>
                    <p className="text-lg leading-6">{month}</p>
                </div>
            </div>

            {/* ---------- card content ---------- */}
            <div className="flex flex-col justify-between flex-1 mx-4 py-3">
                <div>
                    <div className="flex gap-2 items-center justify-between">

                        {/* ---------- event title ---------- */}
                        <h3
                            className="text-lg text-dark font-semibold font-poppins"
                            title={eventData.title} // tooltip full title
                        >
                            {eventData.title?.length > 40
                                ? eventData.title.slice(0, 40) + "..."
                                : eventData.title}
                        </h3>

                        {/* ---------- event type ---------- */}
                        <p
                            className={`text-xs font-medium ${eventData.type === "Online" ? "text-green-600" : "text-blue-600"
                                }`}
                        >
                            {eventData.type}
                        </p>
                    </div>

                    {/* ---------- event time ---------- */}
                    <p className="text-sm text-slate-500">
                        {hourFormatConverter(eventData?.timeRange?.start)} -{" "}
                        {hourFormatConverter(eventData?.timeRange?.end)}
                    </p>
                </div>

                {/* ---------- interested users and interested button container ---------- */}
                <div className="flex gap-1 justify-between items-center mt-4 h-8">

                    {/* ---------- interested users preview ---------- */}
                    <div className="text-primary text-sm hidden min-[200px]:flex items-center gap-2 font-semibold font-poppins">
                        <div className="flex -space-x-3">
                            {
                                eventData?.interestedPreview?.map((img, idx) => {
                                    return (
                                        <img key={idx} className="w-8 h-8 rounded-full object-cover border-2 border-white" src={img || defaultUser} />
                                    )
                                })
                            }
                        </div>
                        {eventData?.interestedCount > 3 && `+${eventData?.interestedCount - 3} `}
                        {eventData?.interestedCount > 0 && "Interested"}
                    </div>

                    {/* ---------- is interested section hidden if current user is event creator ---------- */}
                    <div className={`${isMyEvent && "hidden"}`}>
                        {
                            loading
                                ?
                                <ClipLoader
                                    color="#f59e0b"
                                    size={15}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                                :
                                eventData?.isInterested
                                    ?
                                    <FaStar onClick={handleToggleInterested} className="text-amber-500 text-xl cursor-pointer" />
                                    :
                                    <FaRegStar onClick={handleToggleInterested} className="text-amber-500 text-xl cursor-pointer" />
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;