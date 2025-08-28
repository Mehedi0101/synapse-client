import { push as Menu } from "react-burger-menu";
import NavButtonLg from '../buttons/NavButtonLg';
import LogoSection from "./LogoSection";
import { menuItemsLgSm } from "../../../navigation_links/userLinks";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import UserBasicInfo from "./UserBasicInfo";

// ---------- Hamburger styles ----------
const menuStyles = {
    bmBurgerButton: {
        position: "fixed",
        width: "24px",
        height: "16px",
        left: "16px",
        top: "16px",
    },
    bmBurgerBars: {
        background: "#6f16d7", // primary color
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
        background: "#6f16d7",
    },
    bmMenuWrap: {
        position: "fixed",
        height: "100%",
    },
    bmMenu: {
        background: "#ffffff", // gray-800
        fontSize: "1rem",
    },
    bmItemList: {
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    bmOverlay: {
        background: "rgba(0, 0, 0, 0.5)",
    },
};

// ---------- menu items as array of pairs ----------
const menuItems = menuItemsLgSm();

const NavBarSm = () => {

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
            {/* ---------- logo section with gray backgrounds ---------- */}
            <div>
                <LogoSection></LogoSection>
            </div>

            {/* ---------- basic user information ---------- */}
            <div className='-mt-40 p-4 text-center'>
                <UserBasicInfo></UserBasicInfo>
            </div>

            {/* ---------- menu button section ---------- */}
            <div>
                <div className='flex flex-col gap-10 px-4 sm:px-14 pb-14 justify-center items-center'>
                    {
                        menuItems.map((item, idx) => {
                            return (
                                // ---------- pair of buttons ----------
                                <div key={idx} className='flex gap-6 flex-wrap justify-center items-center'>
                                    <NavLink className={'text-ash'} to={item[0].link} onClick={closeMenu}><NavButtonLg icon={item[0].icon} text={item[0].name}></NavButtonLg></NavLink>
                                    <NavLink className={'text-ash'} to={item[1].link} onClick={closeMenu}><NavButtonLg icon={item[1].icon} text={item[1].name}></NavButtonLg></NavLink>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </Menu>
    );
};

export default NavBarSm;