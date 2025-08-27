import { BsChatText } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineCreate, MdOutlineEditCalendar, MdOutlineFeed, MdOutlineWorkOutline, MdPersonAddAlt } from "react-icons/md";

// ---------- the name, link and icons that are used in the user navigation bar ----------
export const userLinks = [
    {
        name: 'Activity',
        link: '/activity',
        icon: <MdOutlineFeed />
    },
    {
        name: 'Post',
        link: '/post',
        icon: <MdOutlineCreate />
    },
    {
        name: 'Messages',
        link: '/messages',
        icon: <BsChatText />
    },
    {
        name: 'Connect',
        link: '/connect',
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