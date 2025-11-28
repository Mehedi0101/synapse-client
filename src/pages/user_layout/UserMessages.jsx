import { useEffect, useState } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import InboxTab from "../../components/user_layout/UserMessages/InboxTab";
import StartConversationTab from "../../components/user_layout/UserMessages/StartConversationTab";

const UserMessage = () => {

    // ---------- tab state ----------
    const [activeTab, setActiveTab] = useState("inbox");

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Messages";
    }, []);

    return (
        <div className="font-open-sans">
            {/* ---------- Header ---------- */}
            <UserHeader searchBar="invisible" />

            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                {/* ---------- Page Heading ---------- */}
                <h2 className="text-xl md:text-2xl font-bold font-poppins mb-8 text-dark">
                    Messages
                </h2>

                {/* ---------- Tabs ---------- */}
                <div className="flex gap-3 border-b border-gray-300 mb-6 text-sm md:text-base">

                    {/* ---------- inbox tab ---------- */}
                    <button
                        onClick={() => setActiveTab("inbox")}
                        className={`pb-2 px-3 font-semibold cursor-pointer ${activeTab === "inbox"
                            ? "text-primary border-b-2 border-primary"
                            : "text-slate-500 hover:text-primary"
                            }`}
                    >
                        Inbox
                    </button>

                    {/* ---------- new conversation tab ---------- */}
                    <button
                        onClick={() => setActiveTab("new")}
                        className={`pb-2 px-3 font-semibold cursor-pointer ${activeTab === "new"
                            ? "text-primary border-b-2 border-primary"
                            : "text-slate-500 hover:text-primary"
                            }`}
                    >
                        Start a Conversation
                    </button>
                </div>

                {/* ---------- Tab Content ---------- */}
                {activeTab === "inbox" ? <InboxTab /> : <StartConversationTab />}
            </div>
        </div>
    );
};

export default UserMessage;