import logo from '../../../assets/synapse_logo.png';
import title from '../../../assets/synapse_title_white.png';
import NavButtonLg from '../buttons/NavButtonLg';
import defaultUser from '../../../assets/default_user.jpg';
import ButtonWide from '../buttons/ButtonWide';
import { Link } from 'react-router-dom';

const NavBarLg = () => {
    return (
        <div>
            <div className="bg-dark-ash flex flex-col gap-3 justify-center items-center pt-6 pb-40">
                <Link to="/"><img src={logo} className="w-10" alt="Synapse logo" /></Link>
                <Link to="/"><img src={title} className="w-20" alt="Synapse logo" /></Link>
            </div>
            <div className='-mt-36 p-4'>
                <div className='flex flex-col items-center justify-center space-y-2 text-ash px-4 py-8 bg-white rounded-xl'>
                    <img className='w-24 h-24 rounded-full object-cover' src={defaultUser} alt="" />
                    <p className='font-bold'>Display Name</p>
                    <p className='text-xs font-poppins -mt-2'>@UserName</p>
                    <ButtonWide text='Profile' className='text-sm'></ButtonWide>
                    <ButtonWide text='Logout' className='text-sm'></ButtonWide>
                </div>
            </div>
            <div className='flex flex-col gap-10 px-14 pb-14 justify-center items-center'>
                <div className='flex gap-10'>
                    <NavButtonLg></NavButtonLg>
                    <NavButtonLg></NavButtonLg>
                </div>
                <div className='flex gap-10'>
                    <NavButtonLg></NavButtonLg>
                    <NavButtonLg></NavButtonLg>
                </div>
                <div className='flex gap-10'>
                    <NavButtonLg></NavButtonLg>
                    <NavButtonLg></NavButtonLg>
                </div>
                <div className='flex gap-10'>
                    <NavButtonLg></NavButtonLg>
                    <NavButtonLg></NavButtonLg>
                </div>
            </div>
        </div>
    );
};

export default NavBarLg;