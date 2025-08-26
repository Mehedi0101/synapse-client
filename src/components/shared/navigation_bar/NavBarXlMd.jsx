import logo from '../../../assets/synapse_logo.png';
import { Link } from 'react-router-dom';
import NavButtonXlMd from '../buttons/NavButtonXlMd';

const NavBarXlMd = () => {
    return (
        <div>
            <div className="bg-dark-ash flex flex-col gap-3 justify-center items-center pt-6 pb-6">
                <Link to="/"><img src={logo} className="w-6" alt="Synapse logo" /></Link>
            </div>
            <div className='flex flex-col gap-10 px-8 py-14'>
                <NavButtonXlMd></NavButtonXlMd>
                <NavButtonXlMd></NavButtonXlMd>
                <NavButtonXlMd></NavButtonXlMd>
                <NavButtonXlMd></NavButtonXlMd>
                <NavButtonXlMd></NavButtonXlMd>
                <NavButtonXlMd></NavButtonXlMd>
                <NavButtonXlMd></NavButtonXlMd>
                <NavButtonXlMd></NavButtonXlMd>
                <NavButtonXlMd></NavButtonXlMd>
            </div>
        </div>
    );
};

export default NavBarXlMd;