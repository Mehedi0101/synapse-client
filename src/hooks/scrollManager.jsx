import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollManager() {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();
    // PUSH = normal navigation
    // POP = back/forward
    // REPLACE = redirects

    useEffect(() => {
        // Back/Forward → do NOT scroll to top (restore browser position)
        if (navigationType === "POP") return;

        // Normal navigation → scroll to top
        window.scrollTo(0, 0);
    }, [pathname, navigationType]);

    return null;
}
