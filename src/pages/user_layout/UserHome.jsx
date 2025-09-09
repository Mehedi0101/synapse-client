import defaultUser from "../../assets/default_user.jpg";
import { useContext, useEffect, useState } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

const UserHome = () => {

    // ---------- user data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- my connections data ----------
    const [myConnections, setMyConnections] = useState([]);

    // ---------- my connections data fetching ----------
    useEffect(() => {
        userDetails?._id && axios.get(`http://localhost:5000/connections/accepted/${userDetails._id}`)
            .then((data) => {
                setMyConnections(data.data);
            })
            .catch(() => {
                setMyConnections([]);
            })
    }, [userDetails])

    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader searchBar=""></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark grid gap-5 grid-cols-1 sm:grid-cols-3">
                <div className="bg-amber-400 col-span-1 sm:col-span-2 h-96">

                </div>

                {/* ---------- connections section (hidden for small devices) ---------- */}
                <div className="hidden sm:block col-span-1">
                    <h2 className="text-dark font-semibold font-poppins">Connections</h2>
                    <hr className="w-12 mt-2 mb-6 border border-primary" />
                    <div className="space-y-2">
                        {myConnections.map(connection => {
                            return (
                                <div className="flex gap-2 items-center">
                                    <img className="w-12 h-12 rounded-full object-cover" src={connection?.otherUser?.userImage || defaultUser} alt="" />
                                    <div>
                                        <p className="text-sm font-semibold text-dark">{connection?.otherUser?.name}</p>
                                        <p className="text-xs text-light">{connection?.otherUser?.role} | {connection?.otherUser?.department}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;