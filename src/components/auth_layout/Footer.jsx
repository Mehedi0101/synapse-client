import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center text-gray-400 text-xs sm:text-sm py-4 mt-10">

      {/* ---------- links ----------*/}
      <div className="flex justify-center space-x-4">
        <Link to="#" className="hover:text-white">
          Privacy Policy
        </Link>
        <Link to="#" className="hover:text-white">
          Terms
        </Link>
        <Link to="#" className="hover:text-white">
          Contact
        </Link>
      </div>

      {/* ---------- copyright text ----------*/}
      <p className="mt-2">© 2025 Synapse. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
