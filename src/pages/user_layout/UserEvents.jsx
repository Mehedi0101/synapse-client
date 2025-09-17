import { useState } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { Link } from "react-router-dom";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import { IoMdAddCircleOutline } from "react-icons/io";

const UserEvents = () => {

    const [myEvents, setMyEvents] = useState([]);

    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader searchBar=""></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                <div>

                    {/* ---------- heading and button container ---------- */}
                    <div className="flex gap-2 justify-between items-center">
                        <h2 className="font-poppins text-xl font-bold text-dark">My Events ({myEvents.length})</h2>

                        {/* ---------- job posting button ---------- */}
                        <Link to='/create-event'>

                            {/* ---------- for larger device ---------- */}
                            <PurpleButton className="max-w-fit text-sm hidden sm:block" text="Create an Event"></PurpleButton>

                            {/* ---------- for smaller device ---------- */}
                            <IoMdAddCircleOutline className="sm:hidden text-2xl text-primary" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                        {
                            // ---------- check if myEvents is empty or not ---------- 
                            myEvents?.length > 0 ?
                                // ---------- not empty ---------- 
                                myEvents.map(jobPost => <JobCard key={jobPost._id} jobPost={jobPost}></JobCard>)
                                :
                                // ---------- empty ---------- 
                                <div className="col-span-1 lg:col-span-2 min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                    You haven't created any events yet.
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEvents;