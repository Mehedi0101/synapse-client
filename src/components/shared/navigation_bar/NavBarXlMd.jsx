import logo from '../../../assets/synapse_logo.png';
import { Link, NavLink } from 'react-router-dom';
import NavButtonXlMd from '../buttons/NavButtonXlMd';
import { userLinks } from '../../../navigation_links/userLinks';

const NavBarXlMd = () => {
    return (
        <div>
            {/*---------- Synapse logo ----------*/}
            <div className="bg-dark-ash flex flex-col gap-3 justify-center items-center pt-6 pb-6">
                <Link to="/"><img src={logo} className="w-6" alt="Synapse logo" /></Link>
            </div>

            {/*---------- Menu buttons container ----------*/}
            <div className='flex flex-col gap-10 px-8 py-14'>
                {
                    userLinks.map((item, idx) => {
                        return (
                            // ---------- Menu button ----------
                            <NavLink key={idx} className={'text-ash'} to={item.link} title={item.name}><NavButtonXlMd icon={item.icon}></NavButtonXlMd></NavLink>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default NavBarXlMd;