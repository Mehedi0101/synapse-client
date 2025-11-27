import UserHeader from "../../components/user_layout/shared/UserHeader";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import MyConnectionCard from "../../components/user_layout/UserAllConnections/MyConnectionCard";
import { useQuery } from "@tanstack/react-query";
import ConnectedUsersCardSkeleton from "../../components/skeletons/ConnectedUsersCardSkeleton";

const UserAllConnections = () => {

    // ---------- user data from auth provider ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- for fetching my posts ----------
    const { data: myConnections = [], isPending } = useQuery({
        queryKey: ["connected-users", userDetails?._id],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:5000/connections/accepted/${userDetails._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
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
                <h2 className="font-poppins text-xl lg:text-2xl font-bold text-dark">My Connections ({myConnections.length})</h2>

                {/* ---------- card container ---------- */}
                <div className="mt-6 space-y-3">
                    {
                        isPending ?
                            <ConnectedUsersCardSkeleton></ConnectedUsersCardSkeleton>
                            :
                            myConnections.length > 0 ?
                                myConnections.map(connection => <MyConnectionCard key={connection._id} connection={connection}></MyConnectionCard>)
                                :
                                <div className="min-h-80 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                    You haven't connected with anyone yet
                                </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserAllConnections;