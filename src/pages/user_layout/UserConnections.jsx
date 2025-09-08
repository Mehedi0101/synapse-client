import { useContext, useEffect, useState } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import ConnectionCard from "../../components/user_layout/ConnectionCard";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import SentRequestCard from "../../components/user_layout/SentRequestCard";
import ReceivedRequestCard from "../../components/user_layout/ReceivedRequestCard";

const UserConnections = () => {

    // ---------- received or sent tab ----------
    const [tabState, setTabState] = useState("Received");

    // ---------- people you may connect data ----------
    const [peopleYouMayConnect, setPeopleYouMayConnect] = useState([]);

    // ---------- sent request data ----------
    const [sentRequests, setSentRequests] = useState([]);

    // ---------- received request data ----------
    const [receivedRequests, setReceivedRequests] = useState([]);

    // ---------- user data from auth provider ----------
    const { userDetails } = useContext(AuthContext);



    // ---------- fetching people you may connect, sent request and received request data when userDetails or tabstate is changed ----------
    useEffect(() => {

        // ---------- fetching all users available for connection request ----------
        userDetails?._id && axios.get(`http://localhost:5000/users/available/${userDetails._id}`)
            .then(data => {
                setPeopleYouMayConnect(data.data);
            })
            .catch(() => {
                setPeopleYouMayConnect([]);
            })

        // ---------- fetching all received requests ----------
        userDetails?._id && axios.get(`http://localhost:5000/connections/received/${userDetails._id}`)
            .then(data => {
                setReceivedRequests(data.data);
            })
            .catch(() => {
                setReceivedRequests([]);
            })

        // ---------- fetching all sent requests ----------
        userDetails?._id && axios.get(`http://localhost:5000/connections/sent/${userDetails._id}`)
            .then(data => {
                setSentRequests(data.data);
            })
            .catch(() => {
                setSentRequests([]);
            })
    }, [userDetails, tabState])



    return (
        <div>
            {/* ---------- header without searchbar ---------- */}
            <UserHeader searchBar=""></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark">

                {/* ---------- connection request container ---------- */}
                <div>
                    <h2 className="font-poppins text-xl font-bold text-dark">Connection Requests</h2>

                    {/* ---------- request or received connections tab ---------- */}
                    <div className="flex gap-4 border-b border-gray-200 font-semibold mt-6">
                        <span onClick={() => setTabState("Received")} className={`px-2 pb-3 cursor-pointer ${tabState === "Received" && "text-primary border-b-2 border-primary"}`}>Received</span>
                        <span onClick={() => setTabState("Sent")} className={`px-2 pb-3 cursor-pointer ${tabState === "Sent" && "text-primary border-b-2 border-primary"}`}>Sent</span>
                    </div>

                    {/* ---------- received or sent request data displaying container ---------- */}
                    <div className="grid min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 min-[400px]:gap-y-6 mt-6">
                        {
                            // ---------- if tab state is "Received" ---------- 
                            tabState === "Received" ?
                                (
                                    // ---------- if receivedRequests is not empty ---------- 
                                    receivedRequests?.length > 0 ?
                                        receivedRequests.map(req => <ReceivedRequestCard key={req._id} req={req}></ReceivedRequestCard>)
                                        :
                                        // ---------- if receivedRequests is empty ---------- 
                                        <div className="col-span-1 min-[400px]:col-span-2 sm:col-span-3 lg:col-span-4 2xl:col-span-5 min-h-40 flex justify-center items-center text-lg font-bold">
                                            No connection requests received yet
                                        </div>
                                )
                                :
                                // ---------- if tab state is "Sent" ---------- 
                                (
                                    // ---------- if sentRequests is not empty ---------- 
                                    sentRequests?.length > 0 ?
                                        sentRequests.map(req => <SentRequestCard key={req._id} req={req}></SentRequestCard>)
                                        :
                                        // ---------- if sentRequests is empty ----------
                                        <div className="col-span-1 min-[400px]:col-span-2 sm:col-span-3 lg:col-span-4 2xl:col-span-5 min-h-40 flex justify-center items-center text-lg font-bold">
                                            No pending connection requests
                                        </div>

                                )
                        }
                    </div>
                </div>

                {/* ---------- People You May Connect section ---------- */}
                <div className="mt-12">
                    <h2 className="font-poppins text-xl font-bold text-dark">People You May Connect With</h2>
                    {
                        // ---------- check if peopleYouMayConnect is empty or not ---------- 
                        peopleYouMayConnect?.length > 0 ?
                            // ---------- not empty ---------- 
                            // ---------- card container ---------- 
                            <div className="grid min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 min-[400px]:gap-y-6 mt-6">
                                {
                                    peopleYouMayConnect.map(user => <ConnectionCard key={user._id} user={user}></ConnectionCard>)
                                }
                            </div>
                            :
                            // ---------- empty ---------- 
                            <div className="min-h-40 flex justify-center items-center text-lg font-bold">
                                No suggestions available at the moment
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserConnections;