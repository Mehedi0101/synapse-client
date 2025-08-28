import defaultUser from '../../../assets/default_user.jpg';

const UserBasicInfo = () => {
    return (
        <div className='flex flex-col items-center justify-center space-y-2 text-ash px-4 py-8 bg-white rounded-xl'>

            {/* ---------- user image ---------- */}
            <img className='w-24 h-24 rounded-full object-cover' src={defaultUser} alt="user image" />

            {/* ---------- display name ---------- */}
            <p className='text-lg font-bold'>Display Name</p>

            {/* ---------- role ---------- */}
            <p className='text-sm font-poppins -mt-2'>Student</p>

            {/* ---------- Session ---------- */}
            <p><span className='font-semibold'>Session:</span> 2019-20</p>

            {/* ---------- Department ---------- */}
            <p><span className='font-semibold'>Department:</span> CSE</p>
            <div></div>
        </div>
    );
};

export default UserBasicInfo;