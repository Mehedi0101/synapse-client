import logo from '../../../assets/synapse_logo.png';
import { Link, NavLink } from 'react-router-dom';
import { adminLinks } from '../../../navigation_links/adminLinks';
import AdminNavButtonXlMd from '../buttons/AdminNavButtonXlMd';

const AdminNavBarXlMd = () => {
    return (
        <div className='bg-slate-900 min-h-screen'>
            {/*---------- Synapse logo ----------*/}
            <div className="flex flex-col gap-3 justify-center items-center pt-6 pb-6">
                <Link to="/"><img src={logo} className="w-6" alt="Synapse logo" /></Link>
            </div>

            {/*---------- Menu buttons container ----------*/}
            <div className='flex flex-col gap-10 px-8 py-14'>
                {
                    adminLinks.map((item, idx) => {
                        return (
                            // ---------- Menu button ----------
                            <NavLink key={idx} className={({ isActive }) => `${isActive ? "text-amber" : "text-gray-400"}`} to={item.link} title={item.name}><AdminNavButtonXlMd icon={item.icon}></AdminNavButtonXlMd></NavLink>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default AdminNavBarXlMd;