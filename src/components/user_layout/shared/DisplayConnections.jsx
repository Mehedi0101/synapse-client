import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import axios from 'axios';
import defaultUser from "../../../assets/default_user.jpg";

const DisplayConnections = () => {

    const { userDetails } = useContext(AuthContext);

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
        <div className="sticky top-20">
            <h2 className="text-dark font-semibold font-poppins">Connections</h2>
            <hr className="w-12 mt-2 mb-6 border border-primary" />
            <div className="space-y-2">
                {myConnections.map(connection => {
                    return (

                        // ---------- each connected user container ----------
                        <div key={connection?._id} className="flex gap-2 items-center">

                            {/* ---------- connected user's image ---------- */}
                            <img className="w-12 h-12 rounded-full object-cover" src={connection?.otherUser?.userImage || defaultUser} alt="" />

                            {/* ---------- connected user's role and department ---------- */}
                            <div>
                                <p className="text-sm font-semibold text-dark">{connection?.otherUser?.name}</p>
                                <p className="text-xs text-light">{connection?.otherUser?.role} | {connection?.otherUser?.department}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default DisplayConnections;