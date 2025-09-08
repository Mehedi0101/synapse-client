import { useContext, useEffect, useState } from "react";
import UserHeader from "../../components/user_layout/UserHeader";
import ConnectionCard from "../../components/user_layout/ConnectionCard";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import SentRequestCard from "../../components/user_layout/SentRequestCard";

const UserConnect = () => {

    const [tabState, setTabState] = useState("Received");
    const [peopleYouMayConnect, setPeopleYouMayConnect] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const { userDetails } = useContext(AuthContext);

    useEffect(() => {
        userDetails?._id && axios.get(`http://localhost:5000/users/available/${userDetails._id}`)
            .then(data => {
                // console.log(data.data);
                setPeopleYouMayConnect(data.data);
            })
            .catch(() => {
                setPeopleYouMayConnect([]);
            })

        userDetails?._id && axios.get(`http://localhost:5000/connections/sent/${userDetails._id}`)
            .then(data => {
                console.log(data.data);
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

                    <div className="grid min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 min-[400px]:gap-y-6 mt-6">
                        {
                            tabState === "Received" ? ""
                                :
                                sentRequests.map(req => <SentRequestCard key={req._id} req={req}></SentRequestCard>)
                        }
                    </div>
                </div>

                {/* ---------- people you may connect container ---------- */}
                <div className="mt-10">
                    <h2 className="font-poppins text-xl font-bold text-dark">People You May Connect With</h2>
                    <div className="grid min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 min-[400px]:gap-y-6 mt-6">
                        {
                            peopleYouMayConnect.map(user => <ConnectionCard key={user._id} user={user}></ConnectionCard>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserConnect;