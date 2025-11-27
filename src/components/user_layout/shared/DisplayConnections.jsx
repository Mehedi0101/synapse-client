import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import axios from 'axios';
import defaultUser from "../../../assets/default_user.jpg";
import { useQuery } from '@tanstack/react-query';
import ConnectionsSkeleton from '../../skeletons/ConnectionsSkeleton';
import { Link } from 'react-router-dom';

const DisplayConnections = () => {

    // ---------- user data from auth provider ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- for fetching all my connections ----------
    const { data: myConnections = [], isPending } = useQuery({
        queryKey: ["my-connections", userDetails?._id],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:5000/connections/accepted/${userDetails._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.data;
        },
        enabled: !!userDetails?._id
    });

    // Show only first 7
    const limitedConnections = myConnections.slice(0, 7);

    return (
        <div className="sticky top-20">
            <h2 className="text-dark font-semibold font-poppins">Connections</h2>
            <hr className="w-12 mt-2 mb-6 border border-primary" />

            {isPending ? (
                <ConnectionsSkeleton />
            ) : (
                <div className="space-y-2">

                    {/* ---------- limited list of connections (only 7) ---------- */}
                    {limitedConnections.map(connection => (
                        <div key={connection?._id} className="flex gap-2 items-center">

                            <img
                                className="w-12 h-12 rounded-full object-cover"
                                src={connection?.otherUser?.userImage || defaultUser}
                                onError={(e) => { e.currentTarget.src = defaultUser; }}
                                alt=""
                            />

                            <div>
                                <p className="text-sm font-semibold text-dark">
                                    {connection?.otherUser?.name}
                                </p>
                                <p className="text-xs text-light">
                                    {connection?.otherUser?.role} | {connection?.otherUser?.department}
                                </p>
                            </div>

                        </div>
                    ))}

                    {/* ---------- hide "View All" link if total <= 7 ---------- */}
                    {myConnections.length > 7 && (
                        <Link
                            to="/my-connections"
                            className="block text-center mt-5 text-primary font-medium hover:underline transition-all duration-200"
                        >
                            View All Connections
                        </Link>
                    )}

                </div>
            )}
        </div>
    );
};

export default DisplayConnections;