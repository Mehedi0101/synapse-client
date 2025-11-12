import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import axios from 'axios';
import defaultUser from "../../../assets/default_user.jpg";
import { useQuery } from '@tanstack/react-query';
import ConnectionsSkeleton from '../../skeletons/ConnectionsSkeleton';

const DisplayConnections = () => {

    // ---------- user data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- for fetching all my connections ----------
    const { data: myConnections = [], isPending } = useQuery({
        queryKey: ["my-connections", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/connections/accepted/${userDetails._id}`)
            return res.data;
        },
        enabled: !!userDetails?._id
    })

    return (
        <div className="sticky top-20">
            <h2 className="text-dark font-semibold font-poppins">Connections</h2>
            <hr className="w-12 mt-2 mb-6 border border-primary" />
            {
                isPending ?

                    // ---------- when pending show the skeleton ----------
                    <ConnectionsSkeleton></ConnectionsSkeleton>
                    :
                    <div className="space-y-2">
                        {myConnections.map(connection => {
                            return (

                                // ---------- each connected user container ----------
                                <div key={connection?._id} className="flex gap-2 items-center">

                                    {/* ---------- connected user's image ---------- */}
                                    <img className="w-12 h-12 rounded-full object-cover" src={connection?.otherUser?.userImage || defaultUser} onError={(e) => { e.currentTarget.src = defaultUser; }} alt="" />

                                    {/* ---------- connected user's role and department ---------- */}
                                    <div>
                                        <p className="text-sm font-semibold text-dark">{connection?.otherUser?.name}</p>
                                        <p className="text-xs text-light">{connection?.otherUser?.role} | {connection?.otherUser?.department}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            }
        </div>
    );
};

export default DisplayConnections;