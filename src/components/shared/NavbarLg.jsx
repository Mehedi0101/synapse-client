import logo from '../../assets/synapse_logo.png';
import title from '../../assets/synapse_title_white.png';
import NavButtonLg from './NavButtonLg';
import defaultUser from '../../assets/default_user.jpg';
import ButtonWide from './ButtonWide';
import { Link } from 'react-router-dom';

const NavbarLg = () => {
    return (
        <div className="">
            <div className="bg-ash flex flex-col gap-3 justify-center items-center pt-6 pb-40">
                <Link to="/"><img src={logo} className="w-10" alt="Synapse logo" /></Link>
                <Link to="/"><img src={title} className="w-20" alt="Synapse logo" /></Link>
            </div>
            <div className='-mt-36 p-4'>
                <div className='flex flex-col items-center justify-center space-y-2 text-ash px-4 py-8 bg-white rounded-xl'>
                    <img className='w-24 h-24 rounded-full object-cover' src={defaultUser} alt="" />
                    <p className='font-bold'>Display Name</p>
                    <p className='text-xs font-poppins -mt-2'>@UserName</p>
                    <ButtonWide text='Profile'></ButtonWide>
                    <ButtonWide text='Logout'></ButtonWide>
                </div>
            </div>
            <div className='flex flex-col gap-10 px-14 pb-14'>
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

export default NavbarLg;