import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const ResourceCardSkeleton = () => {
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

    return (
        Array.from({ length: columns }).map((_, idx) => (
            <ContentLoader
                key={idx}
                speed={2}
                width="100%"
                backgroundColor="#d6d6d6"
                foregroundColor="#bdbdbd"
                className="rounded-xl shadow-lg w-full"
                viewBox="0 0 400 340"
            >
                {/* ---------- Banner ---------- */}
                <rect x="0" y="0" rx="12" ry="12" width="400" height="176" />

                {/* ---------- Title ---------- */}
                <rect x="16" y="190" rx="6" ry="6" width="280" height="18" />
                <rect x="16" y="214" rx="6" ry="6" width="240" height="16" />

                {/* ---------- Author image ---------- */}
                <circle cx="28" cy="250" r="16" />

                {/* ---------- Author name & role ---------- */}
                <rect x="54" y="240" rx="4" ry="4" width="100" height="12" />
                <rect x="54" y="258" rx="4" ry="4" width="160" height="10" />

                {/* ---------- Preview text ---------- */}
                <rect x="16" y="280" rx="4" ry="4" width="360" height="12" />
                <rect x="16" y="298" rx="4" ry="4" width="320" height="12" />

                {/* ---------- Posted date ---------- */}
                <rect x="16" y="320" rx="3" ry="3" width="100" height="10" />
            </ContentLoader>
        ))
    );
};

export default ResourceCardSkeleton;