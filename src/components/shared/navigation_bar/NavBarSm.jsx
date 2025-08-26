import { push as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import logo from '../../../assets/synapse_logo.png';
import title from '../../../assets/synapse_title_white.png';
import NavButtonLg from '../buttons/NavButtonLg';
import defaultUser from '../../../assets/default_user.jpg';
import ButtonWide from '../buttons/ButtonWide';

const menuStyles = {
    bmBurgerButton: {
        position: "fixed",
        width: "24px",
        height: "16px",
        left: "16px",
        top: "16px",
    },
    bmBurgerBars: {
        background: "#6f16d7", // primary color
        borderRadius: "3px",
        height: "2px"
    },
    bmBurgerBarsHover: {
        background: "#8548db",
    },
    bmCrossButton: {
        height: "24px",
        width: "24px",
    },
    bmCross: {
        background: "#fff",
    },
    bmMenuWrap: {
        position: "fixed",
        height: "100%",
    },
    bmMenu: {
        background: "#ffffff", // gray-800
        fontSize: "1rem",
    },
    bmItemList: {
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    bmOverlay: {
        background: "rgba(0, 0, 0, 0.5)",
    },
};

const NavBarSm = () => {
    return (
        <Menu styles={menuStyles} className="max-w-full">
            <div>
                <div className="bg-dark-ash flex flex-col gap-3 justify-center items-center pt-6 pb-40">
                    <Link to="/"><img src={logo} className="w-10 mx-auto" alt="Synapse logo" /></Link>
                    <Link to="/"><img src={title} className="w-20" alt="Synapse logo" /></Link>
                </div>
            </div>
            <div className='-mt-40 p-4 text-center'>
                <div className='flex flex-col items-center justify-center space-y-2 text-ash px-4 py-8 bg-white rounded-xl'>
                    <img className='w-24 h-24 rounded-full object-cover' src={defaultUser} alt="" />
                    <p className='font-bold'>Display Name</p>
                    <p className='text-xs font-poppins -mt-2'>@UserName</p>
                    <ButtonWide text='Profile' className='text-sm'></ButtonWide>
                    <ButtonWide text='Logout' className='text-sm'></ButtonWide>
                </div>
            </div>
            <div className="">
                <div className='flex flex-col gap-10 px-4 sm:px-14 pb-14 justify-center items-center'>
                    <div className='flex justify-center items-center flex-wrap gap-10'>
                        <NavButtonLg></NavButtonLg>
                        <NavButtonLg></NavButtonLg>
                    </div>
                    <div className='flex justify-center items-center flex-wrap gap-10'>
                        <NavButtonLg></NavButtonLg>
                        <NavButtonLg></NavButtonLg>
                    </div>
                    <div className='flex justify-center items-center flex-wrap gap-10'>
                        <NavButtonLg></NavButtonLg>
                        <NavButtonLg></NavButtonLg>
                    </div>
                    <div className='flex justify-center items-center flex-wrap gap-10'>
                        <NavButtonLg></NavButtonLg>
                        <NavButtonLg></NavButtonLg>
                    </div>
                </div>
            </div>
        </Menu>
    );
};

export default NavBarSm;