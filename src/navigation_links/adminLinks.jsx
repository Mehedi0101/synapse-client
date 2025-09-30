import { FaChartLine } from "react-icons/fa";
import { IoLibraryOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineEditCalendar, MdOutlineWorkOutline } from "react-icons/md";

// ---------- the name, link and icons that are used in the user navigation bar ----------
export const adminLinks = [
    {
        name: 'Overview',
        link: '/admin/overview',
        icon: <FaChartLine />
    },
    {
        name: 'Users',
        link: '/admin/users',
        icon: <LuUsersRound />
    },
    {
        name: 'Mentorship',
        link: '/admin/mentorship',
        icon: <LiaChalkboardTeacherSolid />
    },
    {
        name: 'Jobs',
        link: '/admin/jobs',
        icon: <MdOutlineWorkOutline />
    },
    {
        name: 'Events',
        link: '/admin/events',
        icon: <MdOutlineEditCalendar />
    },
    {
        name: 'Resources',
        link: '/admin/resources',
        icon: <IoLibraryOutline />
    }
]

// ---------- function for making pair of link items for the large and small device design ----------
export const adminItemsLgSm = () => {
    const items = [];

    for (let i = 0; i < adminLinks.length; i += 2) {
        const pair = [];
        pair.push(adminLinks[i]);
        pair.push(adminLinks[i + 1]);
        items.push(pair);
    }

    return items;
}