import { useContext, useState } from "react";
import defaultUser from "../../../assets/default_user.jpg";
import AuthContext from "../../../contexts/AuthContext";
import { IoSendSharp } from "react-icons/io5";
import axios from "axios";
import CommentCard from "./CommentCard";
import toast from "react-hot-toast";
import formatTimeAgo from "../../../functions/formatTimeAgo";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const PostCard = ({ post }) => {

    const [postData, setPostData] = useState(post);

    // ---------- user details from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- comment text controlling state ----------
    const [commentText, setCommentText] = useState("");

    // ---------- time ago ----------
    const timeAgo = formatTimeAgo(postData.createdAt);

    // ---------- comment posting function ----------
    const handleComment = e => {
        e.preventDefault();

        // ---------- comment text ----------
        const comment = e.target.comment.value;

        // ---------- if comment doesn't contain any character then return ----------
        if (!comment.trim()) return;

        // ---------- comment data for storing in the database ----------
        const commentData = { commenterId: userDetails?._id, comment };

        // ---------- patch request of post for adding a comment ----------
        axios.patch(`http://localhost:5000/posts/comments/add/${postData?._id}`, commentData)
            .then((data) => {

                // ---------- if successful then refetch post data ----------
                setPostData(data.data);
            })
            .catch(() => {

                // ---------- error toast ----------
                toast.error('Something went wrong');
            })

        // ---------- reset comment field ----------
        setCommentText("");
    }

    // ---------- comment deleting function ----------
    const handleDeleteComment = (commentId) => {
        axios.patch(`http://localhost:5000/posts/comments/delete/${postData?._id}`, { commentId })
            .then(data => {

                // ---------- if successful then refetch post data ----------
                setPostData(data.data);
            })
            .catch(() => {

                // ---------- error toast ----------
                toast.error('Something went wrong');
            })
    }

    return (
        <motion.div

            // ---------- card animation configuration ----------
            initial={{ opacity: 0, y: 50 }} // start invisible and 50px lower
            whileInView={{ opacity: 1, y: 0 }} // animate into place
            viewport={{ once: true, amount: 0.2 }} // trigger only once when 20% is visible
            transition={{ duration: 0.6, ease: "easeOut" }}

            className="border border-slate-300 rounded-xl p-6 shadow-xl">

            {/* ---------- card header ---------- */}
            <div className="flex items-center gap-2">

                {/* ---------- image container ---------- */}
                <div className="min-w-fit">
                    <img className="w-12 h-12 rounded-full object-cover" src={postData?.author?.userImage || defaultUser} alt="user image" />
                </div>

                {/* ---------- author info ---------- */}
                <div className="min-w-0">
                    <h3 className="font-poppins font-semibold truncate">{postData?.author?.name || "N/A"}</h3>
                    <p className="text-xs truncate text-slate-500">{postData?.author?.role || "N/A"} | {postData?.author?.department || "N/A"}</p>
                    <p className="text-xs truncate text-slate-500">{timeAgo}</p>
                </div>
            </div>

            {/* ---------- post content container ---------- */}
            <div className="my-4">

                {/* ---------- splitting the text container based on the newline character ---------- */}
                {postData?.postContent?.split("\n\n").map((para, idx) => (
                    <p key={idx} className="mb-4 text-sm sm:text-base">
                        {para}
                    </p>
                ))}
            </div>

            {/* ---------- comment count ---------- */}
            <p className="pb-2 mb-6 text-right border-b border-slate-300 font-poppins text-sm font-semibold"><span className="select-none text-primary">{postData?.comments?.length} comment{postData?.comments?.length != 1 && "s"}</span></p>

            {/* ---------- posting a comment section ---------- */}
            <div className="flex items-center gap-2 rounded-xl">

                {/* ---------- user image ---------- */}
                <div className="min-w-fit">
                    <img className="w-8 h-8 rounded-full object-cover" src={userDetails?.userImage || defaultUser} alt="" />
                </div>

                {/* ---------- comment text field ---------- */}
                <form className="relative flex items-center w-full" onSubmit={handleComment}>
                    <input
                        name="comment"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        autoComplete="off"
                        className="w-full text-sm border border-slate-400 rounded-full pl-3 pr-8 py-2 outline-none focus:shadow-lg transition-all duration-100"
                    />

                    {/* ---------- comment button ---------- */}
                    <button className={`absolute right-3 transition-colors ${commentText.trim() ? "text-primary cursor-pointer" : "text-slate-400 cursor-not-allowed"}`}>
                        <IoSendSharp />
                    </button>
                </form>
            </div>

            {/* ---------- display comments section ---------- */}
            {
                postData?.comments?.length > 0 && <div className="mt-6 space-y-5">
                    {
                        postData.comments.map(comment => <CommentCard key={comment._id} comment={comment} handleDeleteComment={handleDeleteComment}></CommentCard>)
                    }
                </div>
            }
        </motion.div>
    );
};

export default PostCard;