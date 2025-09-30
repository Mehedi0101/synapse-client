import { Link } from 'react-router-dom';
import logo from '../../../assets/synapse_logo.png';
import title from '../../../assets/synapse_title_white.png';

const LogoSection = ({ role }) => {
    return (
        <div className={`${role === "Admin" ? "bg-slate-900" : "bg-dark-ash"} flex flex-col gap-3 justify-center items-center pt-6 pb-40`}>

            {/* ---------- logo ---------- */}
            <Link to="/"><img src={logo} className="w-10" alt="Synapse logo" /></Link>

            {/* ---------- title ---------- */}
            <Link to="/"><img src={title} className="w-20" alt="Synapse title" /></Link>
        </div>
    );
};

export default LogoSection;