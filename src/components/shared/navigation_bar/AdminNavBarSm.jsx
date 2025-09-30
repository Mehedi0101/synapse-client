import { push as Menu } from "react-burger-menu";
import LogoSection from "./LogoSection";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { adminItemsLgSm } from "../../../navigation_links/adminLinks";
import AdminBasicInfo from "./AdminBasicInfo";
import AdminNavButtonLg from "../buttons/AdminNavButtonLg";

// ---------- Hamburger styles ----------
const menuStyles = {
    bmBurgerButton: {
        position: "fixed",
        width: "24px",
        height: "16px",
        left: "10px",
        top: "16px",
    },
    bmBurgerBars: {
        background: "#F59E0B", // amber color
        borderRadius: "3px",
        height: "2px"
    },
    bmBurgerBarsHover: {
        background: "#8548db",
    },
    bmCrossButton: {
        height: "24px",
        width: "24px",
    },
    bmCross: {
        background: "#F59E0B",
    },
    bmMenuWrap: {
        position: "fixed",
        height: "100%",
    },
    bmMenu: {
        background: "#0f172a", // gray-800
        fontSize: "1rem",
    },
    bmItemList: {
        color: "#9CA3AF",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    bmOverlay: {
        background: "rgba(0, 0, 0, 0.5)",
    },
};

// ---------- menu items as array of pairs ----------
const menuItems = adminItemsLgSm();

const AdminNavBarSm = () => {

    // ---------- menu bar toggle state ----------
    const [isOpen, setIsOpen] = useState(false);

    // ---------- function for changing the toggle state of menu bar ----------
    const handleStateChange = (state) => {
        setIsOpen(state.isOpen);
    };

    // ---------- function for closing menu ----------
    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <Menu styles={menuStyles} className="max-w-full" isOpen={isOpen}
            onStateChange={handleStateChange}>
            {/* ---------- logo section ---------- */}
            <div>
                <LogoSection role="Admin"></LogoSection>
            </div>

            {/* ---------- basic user information ---------- */}
            <div className='-mt-40 p-4 text-center'>
                <AdminBasicInfo></AdminBasicInfo>
            </div>

            {/* ---------- menu button section ---------- */}
            <div>
                <div className='flex flex-col gap-10 px-4 sm:px-14 pb-14 justify-center items-center'>
                    {
                        menuItems.map((item, idx) => {
                            return (
                                // ---------- pair of buttons ----------
                                <div key={idx} className='flex gap-6 flex-wrap justify-center items-center'>
                                    <NavLink className={({ isActive }) => `${isActive ? "text-amber" : "text-gray-400"}`} to={item[0].link} onClick={closeMenu}><AdminNavButtonLg icon={item[0].icon} text={item[0].name}></AdminNavButtonLg></NavLink>
                                    <NavLink className={({ isActive }) => `${isActive ? "text-amber" : "text-gray-400"}`} to={item[1].link} onClick={closeMenu}><AdminNavButtonLg icon={item[1].icon} text={item[1].name}></AdminNavButtonLg></NavLink>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </Menu>
    );
};

export default AdminNavBarSm;