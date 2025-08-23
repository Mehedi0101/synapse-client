import { Link } from "react-router-dom";
import logo from "../../assets/synapse_title_logo_variant_2.png";

const Header = () => {
  return (
    <Link to="/">
      <div className="p-5">

        {/* ---------- logo ----------*/}
        <img src={logo} className="w-32 sm:w-40" alt="Synapse logo" />
      </div>
    </Link>
  );
};

export default Header;
