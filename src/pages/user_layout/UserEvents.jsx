import { useContext, useEffect } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { Link } from "react-router-dom";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import EventCard from "../../components/user_layout/UserEvents/EventCard";
import { useQuery } from "@tanstack/react-query";
import EventCardSkeleton from "../../components/skeletons/EventCardSkeleton";

const UserEvents = () => {

    // ---------- user details from auth provider ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- for fetching my created events ----------
    const { data: myEvents = [], isPending: myEventsPending } = useQuery({
        queryKey: ["my-events", userDetails?._id],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:5000/events/user/${userDetails?._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        enabled: !!userDetails?._id
    })

    // ---------- for fetching upcoming events ----------
    const { data: upcomingEvents = [], isPending: upcomingEventsPending } = useQuery({
        queryKey: ["upcoming-events", userDetails?._id],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:5000/events/all/${userDetails?._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        enabled: !!userDetails?._id
    })

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Events";
    }, []);

    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader searchBar="invisible"></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                <div>

                    {/* ---------- heading and button container ---------- */}
                    <div className="flex gap-2 justify-between items-center">
                        <h2 className="font-poppins text-xl lg:text-2xl font-bold text-dark">My Events ({myEvents.length})</h2>

                        {/* ---------- job posting button ---------- */}
                        <Link to='/create-event'>

                            {/* ---------- for larger device ---------- */}
                            <PurpleButton className="max-w-fit text-sm hidden sm:block" text="Create an Event"></PurpleButton>

                            {/* ---------- for smaller device ---------- */}
                            <IoMdAddCircleOutline className="sm:hidden text-2xl text-primary" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 sm:gap-5 mt-6">
                        {
                            // ---------- loading? ---------- 
                            myEventsPending ?
                                <EventCardSkeleton></EventCardSkeleton>
                                :
                                // ---------- check if myEvents is empty or not ---------- 
                                myEvents?.length > 0 ?
                                    // ---------- not empty ---------- 
                                    myEvents.map(event => <EventCard key={event._id} event={event} isMyEvent={true}></EventCard>)
                                    :
                                    // ---------- empty ---------- 
                                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 2xl:col-span-4 min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                        You haven't created any events yet.
                                    </div>
                        }
                    </div>
                </div>

                {/* ---------- available job display section ---------- */}
                <div className="mt-12">
                    <h2 className="font-poppins text-xl lg:text-2xl font-bold text-dark">Upcoming Events</h2>

                    {/* ---------- jobs container ---------- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 sm:gap-5 mt-6">
                        {
                            // ---------- loading? ---------- 
                            upcomingEventsPending ?
                                <EventCardSkeleton></EventCardSkeleton>
                                :
                                // ---------- check if allJobs is empty or not ---------- 
                                upcomingEvents?.length > 0 ?
                                    // ---------- not empty ---------- 
                                    upcomingEvents.map(event => <EventCard key={event._id} event={event}></EventCard>)
                                    :
                                    // ---------- empty ---------- 
                                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 2xl:col-span-4 min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                        No upcoming events at the moment.
                                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEvents;