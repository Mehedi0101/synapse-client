import { AiOutlineHome } from "react-icons/ai";
import { BsChatText } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineArticle, MdOutlineEditCalendar, MdOutlineWorkOutline, MdPersonAddAlt } from "react-icons/md";

// ---------- the name, link and icons that are used in the user navigation bar ----------
export const userLinks = [
    {
        name: 'Home',
        link: '/',
        icon: <AiOutlineHome />
    },
    {
        name: 'My Posts',
        link: '/my-posts',
        icon: <MdOutlineArticle />
    },
    {
        name: 'Messages',
        link: '/messages',
        icon: <BsChatText />
    },
    {
        name: 'Connect',
        link: '/connections',
        icon: <MdPersonAddAlt />
    },
    {
        name: 'Mentorship',
        link: '/mentorship',
        icon: <LiaChalkboardTeacherSolid />
    },
    {
        name: 'Jobs',
        link: '/jobs',
        icon: <MdOutlineWorkOutline />
    },
    {
        name: 'Events',
        link: '/events',
        icon: <MdOutlineEditCalendar />
    },
    {
        name: 'Resources',
        link: '/resources',
        icon: <IoLibraryOutline />
    }
]

// ---------- function for making pair of link items for the large and small device design ----------
export const menuItemsLgSm = () => {
    const items = [];

    for (let i = 0; i < userLinks.length; i += 2) {
        const pair = [];
        pair.push(userLinks[i]);
        pair.push(userLinks[i + 1]);
        items.push(pair);
    }

    return items;
}