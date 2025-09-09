import UserHeader from "../../components/user_layout/shared/UserHeader";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import MyConnectionCard from "../../components/user_layout/UserAllConnections/MyConnectionCard";

const UserAllConnections = () => {

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
            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                <h2 className="font-poppins text-xl font-bold text-dark">My Connections ({myConnections.length})</h2>

                {/* ---------- card container ---------- */}
                <div className="mt-6 space-y-3">
                    {
                        myConnections.map(connection => <MyConnectionCard key={connection._id} connection={connection}></MyConnectionCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default UserAllConnections;