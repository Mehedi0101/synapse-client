import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineCalendarToday } from "react-icons/md";

// ---------- list of departments ----------
const departments = [
    "Computer Science & Engineering",
    "Business Administration",
    "Accounting",
    "Bangla",
    "Economics",
    "English",
    "Management",
    "Marketing",
    "Finance and Banking",
];

const UserUpdateEvent = () => {

    // ---------- data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- react hooks ----------
    const navigate = useNavigate();

    // ---------- event id from url ----------
    const { id } = useParams();

    // ---------- form states ----------
    const [eventType, setEventType] = useState("Online");
    const [selectedAudience, setSelectedAudience] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [eventData, setEventData] = useState({});

    // ---------- fetch existing event ----------
    useEffect(() => {

        // ---------- get request for event details ----------
        axios
            .get(`http://localhost:5000/events/details/${id}`, {
                params: { userId: userDetails?._id },
            })
            .then((res) => {
                if (res.data) {

                    // ---------- set fetched data to form states ----------
                    setEventData(res.data);
                    setEventType(res.data.type);
                    setSelectedAudience(res.data.audience || []);
                    setSelectedDate(new Date(res.data.date));
                    setStartTime(res.data.timeRange?.start || "");
                    setEndTime(res.data.timeRange?.end || "");
                } else {

                    // ---------- navigate to error page ----------
                    navigate("/error");
                }
            })

            // ---------- navigate to error page ----------
            .catch(() => navigate("/error"));

    }, [id, navigate, userDetails?._id]);

    // ---------- audience select function ----------
    const handleAudienceChange = (e) => {
        const value = e.target.value;

        if (value === "All") {
            setSelectedAudience([...departments]);
        } else {
            if (!selectedAudience.includes(value)) {
                setSelectedAudience([...selectedAudience, value]);
            }
        }
    };

    // ---------- audience remove function ----------
    const handleAudienceRemove = (dept) => {
        setSelectedAudience(selectedAudience.filter((item) => item !== dept));
    };

    // ---------- update event function ----------
    const handleUpdateEvent = (e) => {
        e.preventDefault();

        // ---------- alert for confirmation ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Confirm Event Update?</h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">Your changes will be visible to all students and alumni.</p>
                `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then((result) => {

            // ---------- after confirmation ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Updating Event...");

                const form = e.target;

                // ---------- updated event data ----------
                const updatedEventData = {
                    title: form.eventTitle.value,
                    type: eventType,
                    link: form.eventLink?.value || "",
                    location: form.eventLocation?.value || "",
                    audience: selectedAudience,
                    date: selectedDate,
                    timeRange: { start: startTime, end: endTime },
                    banner: form.eventBanner.value,
                    description: form.description.value,
                };

                // ---------- patch request for updating event ----------
                axios
                    .patch(`http://localhost:5000/events/${id}`, updatedEventData)
                    .then((res) => {
                        if (res.data?.acknowledged) {
                            toast.success("Event updated successfully!", { id: toastId });

                            // ---------- navigate to event details ----------
                            navigate(`/events/${id}`);
                        } else {
                            toast.error("Something went wrong", { id: toastId });
                        }
                    })
                    .catch(() => toast.error("Something went wrong", { id: toastId }));
            }
        });
    };

    return (
        <>
            {/* ---------- user header without searchbar ---------- */}
            <UserHeader searchBar="invisible" />

            {/* ---------- event update form ---------- */}
            <form
                onSubmit={handleUpdateEvent}
                className="grid grid-cols-1 sm:grid-cols-12 gap-8 text-semi-dark mx-2 md:mx-5 my-8 text-sm lg:text-base"
            >
                <div className="col-span-1 sm:col-span-12 space-y-6 sm:space-y-8">

                    {/* ---------- Event Basic Info ---------- */}
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Update Event Information
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            {/* ---------- event title ---------- */}
                            <input
                                type="text"
                                name="eventTitle"
                                defaultValue={eventData?.title}
                                placeholder="Event Title"
                                className="border-b border-slate-400 outline-none"
                                required
                            />

                            {/* ---------- event type ---------- */}
                            <select
                                name="eventType"
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                                className="py-1 font-poppins border-b border-slate-400 w-full outline-none"
                                required
                            >
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>

                            {/* ---------- event link (if online) ---------- */}
                            {eventType === "Online" && (
                                <input
                                    type="text"
                                    name="eventLink"
                                    defaultValue={eventData?.link}
                                    placeholder="Event Link (Zoom, Meet...)"
                                    className="border-b border-slate-400 outline-none"
                                    required
                                />
                            )}

                            {/* ---------- event location (if offline) ---------- */}
                            {eventType === "Offline" && (
                                <input
                                    type="text"
                                    name="eventLocation"
                                    defaultValue={eventData?.location}
                                    placeholder="Event Location"
                                    className="border-b border-slate-400 outline-none"
                                    required
                                />
                            )}

                            {/* ---------- event banner (optional) ---------- */}
                            <input
                                type="text"
                                name="eventBanner"
                                defaultValue={eventData?.banner}
                                placeholder="Event Banner URL (optional)"
                                className="border-b border-slate-400 outline-none"
                            />
                        </div>
                    </div>

                    {/* ---------- Target Audience ---------- */}
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Target Audience
                        </h2>

                        {/* ---------- select field for target audience ---------- */}
                        <select
                            onChange={handleAudienceChange}
                            value=""
                            className="py-1 font-poppins border-b border-slate-400 w-full outline-none"
                        >
                            <option value="" disabled>
                                Select Department
                            </option>
                            <option value="All">All</option>
                            {departments.map((dept) => (
                                <option
                                    key={dept}
                                    value={dept}
                                    disabled={selectedAudience.includes(dept)}
                                >
                                    {dept}
                                </option>
                            ))}
                        </select>

                        {/* ---------- selected audience list ---------- */}
                        <div className="mt-4 grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-2">
                            {selectedAudience.map((dept, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center border border-slate-500 bg-slate-300 p-2 rounded-lg"
                                >
                                    <span>{dept}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleAudienceRemove(dept)}
                                        className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                                    >
                                        <ImCancelCircle className="text-xs lg:text-sm" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ---------- Event Date & Time ---------- */}
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Event Date & Time
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* ---------- event date ---------- */}
                            <div className="relative w-full">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    placeholderText="Select Event Date"
                                    className="border-b border-slate-400 outline-none w-full pl-8"
                                />
                                <MdOutlineCalendarToday className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                            </div>

                            <div className="flex flex-col min-[250px]:flex-row gap-2">

                                {/* ---------- event time range ---------- */}
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="border-b border-slate-400 outline-none w-full"
                                    required
                                />
                                <span>to</span>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="border-b border-slate-400 outline-none w-full"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* ---------- event description ---------- */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Description
                        </h3>
                        <textarea
                            name="description"
                            rows="10"
                            defaultValue={eventData?.description}
                            placeholder="Write a clear description about the event..."
                            className="w-full border border-slate-400 rounded-lg p-2 resize-none outline-none"
                            required
                        ></textarea>
                    </div>

                    {/* ---------- update event button ---------- */}
                    <div>
                        <PurpleButton text="Update Event" type="submit" />
                    </div>
                </div>
            </form>
        </>
    );
};

export default UserUpdateEvent;