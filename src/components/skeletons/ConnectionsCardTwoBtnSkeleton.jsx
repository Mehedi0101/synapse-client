import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';

const ConnectionsCardTwoBtnSkeleton = () => {

    // ---------- number of elements in the grid ----------
    const [columns, setColumns] = useState(1);

    // ---------- changing the number of columns based on the screen width ----------
    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width < 400) setColumns(1);
            else if (width >= 400 && width < 640) setColumns(2);  // xs
            else if (width >= 640 && width < 1024) setColumns(3); // sm
            else if (width >= 1024 && width < 1536) setColumns(4); // lg
            else setColumns(5); // 2xl
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
                className="rounded-2xl p-4 pb-0 w-full shadow-lg"
                viewBox="0 0 300 250"
            >
                {/* User avatar */}
                <circle cx="150" cy="50" r="50" />

                {/* User name */}
                <rect x="50" y="120" rx="6" ry="6" width="200" height="18" />

                {/* Role | Department */}
                <rect x="60" y="150" rx="5" ry="5" width="180" height="14" />

                {/* Time ago */}
                <rect x="90" y="170" rx="4" ry="4" width="120" height="12" />

                {/* Buttons (Accept / Cancel) */}
                <rect x="40" y="190" rx="8" ry="8" width="100" height="32" />
                <rect x="160" y="190" rx="8" ry="8" width="100" height="32" />
            </ContentLoader>
        ))
    );
};

export default ConnectionsCardTwoBtnSkeleton;