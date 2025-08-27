const NavButtonLg = ({ icon, text }) => {
    return (
        <button className={`flex flex-col space-y-1.5 justify-center items-center font-poppins hover:text-primary transition-colors duration-150 ease-in cursor-pointer w-20`}>

            {/* ---------- icon wrapper ---------- */}
            <div className="text-xl">
                {icon}
            </div>

            {/* ---------- button text ---------- */}
            <span className="text-sm font-light">{text}</span>
        </button>
    );
};

export default NavButtonLg;