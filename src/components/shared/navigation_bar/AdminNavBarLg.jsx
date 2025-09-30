import { NavLink } from 'react-router-dom';
import LogoSection from './LogoSection';
import { adminItemsLgSm } from '../../../navigation_links/adminLinks';
import AdminBasicInfo from './AdminBasicInfo';
import AdminNavButtonLg from '../buttons/AdminNavButtonLg';

// ---------- menu items as array of pairs ----------
const menuItems = adminItemsLgSm();

const AdminNavBarLg = () => {

    return (
        <div className='bg-slate-900 text-gray-400 min-h-screen flex flex-col'>

            {/* ---------- logo section with gray backgrounds ---------- */}
            <LogoSection role="Admin"></LogoSection>

            {/* ---------- basic user information ---------- */}
            <div className='-mt-36 mb-6 p-4'>
                <AdminBasicInfo></AdminBasicInfo>
            </div>

            {/* ---------- menu button wrapper ---------- */}
            <div className='flex flex-col gap-6 px-14 pb-14 justify-center items-center'>
                {
                    menuItems.map((item, idx) => {
                        return (
                            // ---------- pair of buttons ----------
                            <div key={idx} className='flex gap-6'>
                                <NavLink className={({ isActive }) => `${isActive ? "text-amber" : "text-gray-400"}`} to={item[0].link}><AdminNavButtonLg icon={item[0].icon} text={item[0].name}></AdminNavButtonLg></NavLink>
                                <NavLink className={({ isActive }) => `${isActive ? "text-amber" : "text-gray-400"}`} to={item[1].link}><AdminNavButtonLg icon={item[1].icon} text={item[1].name}></AdminNavButtonLg></NavLink>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default AdminNavBarLg;