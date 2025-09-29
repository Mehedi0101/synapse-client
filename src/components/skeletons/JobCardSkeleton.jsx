import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const JobCardSkeleton = () => {
    // ---------- number of columns ----------
    const [columns, setColumns] = useState(1);

    useEffect(() => {

        // ---------- setting the number of columns based on the viewport ----------
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width < 640) setColumns(1);
            else if (width < 1024) setColumns(2);
            else setColumns(2);
        };
        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    const totalSkeletons = columns * 2;

    return (
        Array.from({ length: totalSkeletons }).map((_, idx) => (
            <ContentLoader
                key={idx}
                speed={2}
                width="100%"
                backgroundColor="#d6d6d6"
                foregroundColor="#bdbdbd"
                className="w-full flex flex-col min-[400px]:flex-row gap-2 shadow-lg p-4 pb-0 rounded-lg"
                viewBox="0 0 400 100"
            >
                {/* Company logo */}
                <rect x="0" y="10" rx="6" ry="6" width="80" height="80" />

                {/* Job info */}
                <rect x="100" y="10" rx="4" ry="4" width="200" height="20" /> {/* Job title */}
                <rect x="100" y="40" rx="4" ry="4" width="150" height="16" /> {/* Location */}
                <rect x="100" y="60" rx="4" ry="4" width="120" height="16" /> {/* Company name */}

                {/* Job type */}
                <rect x="310" y="10" rx="8" ry="8" width="80" height="20" /> {/* Badge */}
            </ContentLoader>
        ))
    );
};

export default JobCardSkeleton;
