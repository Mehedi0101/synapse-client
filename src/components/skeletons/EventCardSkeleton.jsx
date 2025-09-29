import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const EventCardSkeleton = () => {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width < 640) setColumns(1);    
            else if (width < 1024) setColumns(2); 
            else if (width < 1536) setColumns(3); 
            else setColumns(4);                  
        };

        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    return (Array.from({ length: columns }).map((_, idx) => (
        <ContentLoader
            key={idx}
            speed={2}
            width="100%"
            backgroundColor="#d6d6d6"
            foregroundColor="#bdbdbd"
            className="rounded-xl shadow-lg w-full"
            viewBox="0 0 400 280"
        >
            {/* Banner */}
            <rect x="0" y="0" rx="12" ry="12" width="400" height="160" />

            {/* Date badge */}
            <rect x="16" y="16" rx="6" ry="6" width="50" height="40" />

            {/* Title */}
            <rect x="16" y="170" rx="6" ry="6" width="220" height="18" />

            {/* Event type */}
            <rect x="300" y="170" rx="6" ry="6" width="80" height="16" />

            {/* Time */}
            <rect x="16" y="200" rx="4" ry="4" width="120" height="14" />

            {/* Interested users */}
            <rect x="16" y="230" rx="6" ry="6" width="100" height="20" />

            {/* Interested button */}
            <rect x="320" y="230" rx="8" ry="8" width="60" height="20" />
        </ContentLoader>
    ))
    );
};

export default EventCardSkeleton;