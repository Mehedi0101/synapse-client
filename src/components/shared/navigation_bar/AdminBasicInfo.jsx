import { useContext } from 'react';
import defaultUser from '../../../assets/default_user.jpg';
import AuthContext from '../../../contexts/AuthContext';

const AdminBasicInfo = () => {

    // ---------- admin details from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    return (
        <div className='flex flex-col items-center justify-center space-y-2 px-4 py-8 bg-slate-800 rounded-xl text-center text-normal'>

            {/* ---------- admin image ---------- */}
            <img className='w-24 h-24 rounded-full object-cover' src={userDetails?.userImage ? userDetails.userImage : defaultUser} alt="user image" />

            {/* ---------- display name ---------- */}
            <p className='max-w-[200px] break-words text-lg font-bold text-amber font-poppins'>{userDetails?.name}</p>

            {/* ---------- role ---------- */}
            <p className='text-sm font-poppins -mt-2 text-gray-400'>{userDetails?.role}</p>
        </div>
    );
};

export default AdminBasicInfo;