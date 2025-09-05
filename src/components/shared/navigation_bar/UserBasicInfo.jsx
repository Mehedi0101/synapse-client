import { useContext } from 'react';
import defaultUser from '../../../assets/default_user.jpg';
import AuthContext from '../../../contexts/AuthContext';

const UserBasicInfo = () => {

    // ---------- user details from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    return (
        <div className='flex flex-col items-center justify-center space-y-2 px-4 py-8 bg-white rounded-xl text-center text-normal text-semi-dark'>

            {/* ---------- user image ---------- */}
            <img className='w-24 h-24 rounded-full object-cover' src={userDetails?.userImage ? userDetails.userImage : defaultUser} alt="user image" />

            {/* ---------- display name ---------- */}
            <p className='max-w-[200px] break-words text-lg font-bold text-dark font-poppins'>{userDetails?.name}</p>

            {/* ---------- role ---------- */}
            <p className='text-sm font-poppins -mt-2 mb-4'>{userDetails?.role}</p>

            {/* ---------- Session (Student) ---------- */}
            {userDetails?.role === "Student" &&
                <p><span className='font-semibold'>Session:</span> {userDetails?.session}</p>
            }

            {/* ---------- Graduation (Alumni) ---------- */}
            {userDetails?.role === "Alumni" &&
                <p><span className='font-semibold'>Year of Graduation:</span> {userDetails?.graduationYear}</p>
            }

            {/* ---------- Department ---------- */}
            <p className='max-w-[200px] break-words'><span className='font-semibold'>Department:</span> {userDetails?.department}</p>
        </div>
    );
};
// 

export default UserBasicInfo;