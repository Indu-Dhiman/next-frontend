"use client";
import { useAuth } from "@/context/AuthContext";
import { get, post } from "@/lib/API";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const AdminChat = () => {
    const { user } :any= useAuth();

    const [message, setMessage] = useState<any>("");
    const [chat, setChat] = useState<any>([]);
    const [selectedUser, setSelectedUser] = useState<any>("");
    const [users, setUsers] = useState<any>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response :any= await get("user/get-users");
            setUsers(response.data);
        };

        fetchUsers();
        socket.emit("join", { userId: user?.id, role: "admin" });

        socket.on("receiveMessage", (data) => {
                setChat((prevChat :any) => [...prevChat, data]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [selectedUser]);

    useEffect(() => {
        if (selectedUser) {
            const fetchChatHistory = async () => {
                const response  :any= await get(`chat/history?userId=${selectedUser}`);
                setChat(response?.data);
            };

            fetchChatHistory();
        }
    }, [selectedUser]);

    const sendMessage = async () => {
        if (selectedUser && message.trim()) {
            const newMessage = {
                message,
                senderId: "admin",
                receiverId: selectedUser,
            };
            socket.emit("sendMessage", newMessage); // Emit the message to socket
            await post(`chat/send`, newMessage); // Save the message to the server
            setChat((prevChat :any) => [...prevChat, newMessage]); // Update chat history
            setMessage("");
        } else {
            alert("Please select a user and enter a message");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 border-r border-gray-300 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                {users.map((user :any) => (
                    <div
                        key={user.id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => setSelectedUser(user.id)}
                    >
                        {user.username}
                    </div>
                ))}
            </div>

            <div className="flex-1 p-5 h-50%">
                <h1 className="text-2xl font-bold mb-4">{selectedUser ? `${selectedUser}'s Chat` : "Select a User"}</h1>

                <div className="border border-gray-300 rounded-lg p-4 h-[calc(100%-6rem)] overflow-y-scroll mb-4">
                    {chat.map((msg :any, index :any) => (
                        <div key={index} className={`flex ${msg.senderId === "admin" ? "justify-end" : "justify-start"} mb-2`}>
                            <div className={`max-w-[70%] p-2 rounded-lg text-sm ${msg.senderId === "admin" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                                {msg.message}
                                <span className="block text-xs text-gray-500 text-right">Just now</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                        className="border border-gray-300 rounded p-2 flex-grow mr-2"
                    />
                    <button onClick={sendMessage} className="bg-blue-500 text-white rounded p-2">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminChat;
