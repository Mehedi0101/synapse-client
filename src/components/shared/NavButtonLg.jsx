import { MdOutlineFeed } from "react-icons/md";

const NavButtonLg = () => {
    return (
        <button className="flex flex-col space-y-1.5 justify-center items-center text-ash font-poppins hover:text-primary transition-colors duration-150 ease-in cursor-pointer">
            <MdOutlineFeed className="text-xl"/>
            <span className="text-sm font-light">Activity</span>
        </button>
    );
};

export default NavButtonLg;