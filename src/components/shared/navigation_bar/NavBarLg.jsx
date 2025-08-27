import NavButtonLg from '../buttons/NavButtonLg';
import { NavLink } from 'react-router-dom';
import { menuItemsLgSm } from '../../../navigation_links/userLinks';
import LogoSection from './LogoSection';
import UserBasicInfo from './UserBasicInfo';

// ---------- menu items as array of pairs ----------
const menuItems = menuItemsLgSm();

const NavBarLg = () => {

    return (
        <div>

            {/* ---------- logo section with gray backgrounds ---------- */}
            <LogoSection></LogoSection>

            {/* ---------- basic user information ---------- */}
            <div className='-mt-36 p-4'>
                <UserBasicInfo></UserBasicInfo>
            </div>

            {/* ---------- menu button wrapper ---------- */}
            <div className='flex flex-col gap-6 px-14 pb-14 justify-center items-center'>
                {
                    menuItems.map((item, idx) => {
                        return (
                            // ---------- pair of buttons ----------
                            <div key={idx} className='flex gap-6'>
                                <NavLink className={'text-ash'} to={item[0].link}><NavButtonLg icon={item[0].icon} text={item[0].name}></NavButtonLg></NavLink>
                                <NavLink className={'text-ash'} to={item[1].link}><NavButtonLg icon={item[1].icon} text={item[1].name}></NavButtonLg></NavLink>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default NavBarLg;