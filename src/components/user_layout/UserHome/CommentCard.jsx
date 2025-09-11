import defaultUser from "../../../assets/default_user.jpg";
import formatTimeAgo from "../../../functions/formatTimeAgo";

const CommentCard = ({ comment }) => {
    // ---------- time ago ----------
    const timeAgo = formatTimeAgo(comment?.createdAt);

    return (
        <div>
            <div className="flex items-center gap-2">

                {/* ---------- image container ---------- */}
                <div className="min-w-fit">
                    <img className="w-8 h-8 rounded-full object-cover" src={comment?.commenter?.userImage || defaultUser} alt="user image" />
                </div>

                {/* ---------- author info and time ago container ---------- */}
                <div className="min-w-0 w-full flex gap-2 justify-between items-center">

                    {/* ---------- author info ---------- */}
                    <div className="min-w-0">
                        <h3 className="font-poppins text-sm font-semibold">{comment?.commenter?.name || "N/A"}</h3>
                        <p className="text-xs text-slate-500 truncate">{comment?.commenter?.role || "N/A"} | {comment?.commenter?.department || "N/A"}</p>
                    </div>

                    {/* ---------- time ago ---------- */}
                    <p className="text-xs text-slate-500">{timeAgo}</p>
                </div>
            </div>

            {/* ---------- comment text ---------- */}
            <p className="text-sm ml-10 mt-1">{comment?.comment}</p>
        </div>
    );
};

export default CommentCard;