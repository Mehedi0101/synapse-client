import ContentLoader from "react-content-loader";

const TableSkeleton = ({ columns = 5, rows = 5 }) => {
    const rowHeight = 40;
    const gap = 10;
    const tableWidth = 1000; // virtual width for skeleton drawing
    const colWidth = tableWidth / columns;

    return (
        <ContentLoader
            speed={2}
            width="100%"
            viewBox={`0 0 ${tableWidth} ${rows * (rowHeight + gap)}`}
            backgroundColor="#d6d6d6"
            foregroundColor="#bdbdbd"
            className="w-full"
        >
            {/* ---------- Table Rows ---------- */}
            {Array.from({ length: rows }).map((_, rowIdx) =>
                Array.from({ length: columns }).map((_, colIdx) => (
                    <rect
                        key={`row-${rowIdx}-col-${colIdx}`}
                        x={colIdx * colWidth + 10}
                        y={rowIdx * (rowHeight + gap)}
                        rx="4"
                        ry="4"
                        width={colWidth - 20}
                        height={rowHeight - 15}
                    />
                ))
            )}
        </ContentLoader>
    );
};

export default TableSkeleton;