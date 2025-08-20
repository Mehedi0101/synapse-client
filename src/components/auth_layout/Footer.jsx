import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center text-gray-400 text-sm py-4">
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
      <p className="mt-2">© 2025 Synapse. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
