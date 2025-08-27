import { Link } from 'react-router-dom';
import defaultUser from '../../../assets/default_user.jpg';
import ButtonWide from '../buttons/ButtonWide';

const UserBasicInfo = () => {
    return (
        <div className='flex flex-col items-center justify-center space-y-2 text-ash px-4 py-8 bg-white rounded-xl'>
            
            {/* ---------- user image ---------- */}
            <img className='w-24 h-24 rounded-full object-cover' src={defaultUser} alt="user image" />

            {/* ---------- display name ---------- */}
            <p className='font-bold'>Display Name</p>

            {/* ---------- user name ---------- */}
            <p className='text-xs font-poppins -mt-2'>@UserName</p>

            {/* ---------- profile button ---------- */}
            <Link to='/profile' className='w-full'><ButtonWide text='Profile' className='text-sm'></ButtonWide></Link>

            {/* ---------- logout button ---------- */}
            <ButtonWide text='Logout' className='text-sm'></ButtonWide>
        </div>
    );
};

export default UserBasicInfo;