import { useContext, useState } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import ReceivedRequestCard from "../../components/user_layout/UserConnections/ReceivedRequestCard";
import SentRequestCard from "../../components/user_layout/UserConnections/SentRequestCard";
import ConnectionCard from "../../components/user_layout/UserConnections/ConnectionCard";
import { useQuery } from "@tanstack/react-query";
import ConnectionsCardTwoBtnSkeleton from "../../components/skeletons/ConnectionsCardTwoBtnSkeleton";
import ConnectionsCardOneBtnSkeleton from "../../components/skeletons/ConnectionsCardOneBtnSkeleton";

const UserConnections = () => {

    // ---------- received or sent tab ----------
    const [tabState, setTabState] = useState("Received");


    // ---------- user data from auth provider ----------
    const { userDetails } = useContext(AuthContext);


    // ---------- for fetching people you connect ----------
    const { data: peopleYouMayConnect = [], isPending: peopleYouMayKnowLoading } = useQuery({
        queryKey: ["people-you-may-connect", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users/available/${userDetails._id}`);
            return res.data;
        },
        enabled: !!userDetails?._id
    })

    // ---------- for fetching all received requests ----------
    const { data: receivedRequests = [], isPending: receivedRequestsLoading } = useQuery({
        queryKey: ["received-requests", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/connections/received/${userDetails._id}`);
            return res.data;
        },
        enabled: !!userDetails?._id
    })

    // ---------- for fetching all sent requests ----------
    const { data: sentRequests = [], isPending: sentRequestsLoading } = useQuery({
        queryKey: ["sent-requests", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/connections/sent/${userDetails._id}`);
            return res.data;
        },
        enabled: !!userDetails?._id
    })


    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
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
                                receivedRequestsLoading ?
                                    <ConnectionsCardTwoBtnSkeleton></ConnectionsCardTwoBtnSkeleton>
                                    :
                                    (
                                        // ---------- if receivedRequests is not empty ---------- 
                                        receivedRequests?.length > 0 ?
                                            receivedRequests.map(req => <ReceivedRequestCard key={req._id} req={req}></ReceivedRequestCard>)
                                            :
                                            // ---------- if receivedRequests is empty ---------- 
                                            <div className="col-span-1 min-[400px]:col-span-2 sm:col-span-3 lg:col-span-4 2xl:col-span-5 min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                                No connection requests received yet
                                            </div>
                                    )
                                :
                                // ---------- if tab state is "Sent" ---------- 
                                (
                                    sentRequestsLoading ?
                                        // ---------- if loading ---------- 
                                        <ConnectionsCardOneBtnSkeleton></ConnectionsCardOneBtnSkeleton>
                                        :
                                        sentRequests?.length > 0 ?
                                            // ---------- if sentRequests is not empty ---------- 
                                            sentRequests.map(req => <SentRequestCard key={req._id} req={req}></SentRequestCard>)
                                            :
                                            // ---------- if sentRequests is empty ----------
                                            <div className="col-span-1 min-[400px]:col-span-2 sm:col-span-3 lg:col-span-4 2xl:col-span-5 min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                                No pending connection requests
                                            </div>

                                )
                        }
                    </div>
                </div>

                {/* ---------- People You May Connect section ---------- */}
                <div className="mt-12">
                    <h2 className="font-poppins text-xl font-bold text-dark">People You May Connect With</h2>
                    <div className="grid min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 min-[400px]:gap-y-6 mt-6">
                        {
                            // ---------- check if peopleYouMayConnect is empty or not ---------- 
                            peopleYouMayKnowLoading ?
                                // ---------- if loading ---------- 
                                <ConnectionsCardOneBtnSkeleton></ConnectionsCardOneBtnSkeleton>
                                :
                                peopleYouMayConnect?.length > 0 ?
                                    // ---------- not empty ---------- 
                                    peopleYouMayConnect.map(user => <ConnectionCard key={user._id} user={user}></ConnectionCard>)
                                    :
                                    // ---------- empty ---------- 
                                    <div className="col-span-1 min-[400px]:col-span-2 sm:col-span-3 lg:col-span-4 2xl:col-span-5 min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                        No suggestions available at the moment
                                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserConnections;