"use client";
import { useAuth } from "@/context/AuthContext";
import { get } from "@/lib/API";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const UserChat = () => {
    const { user } :any= useAuth();

  const [message, setMessage] = useState<any>("");
  const [chat, setChat] = useState<any>([]);

  useEffect(() => {
    socket.emit("join", { userId: user?.id, role: "user" });
    
    socket.on("receiveMessage", (data) => {
        console.log(data,"======================")
      setChat((prevChat: any) => [...prevChat, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);


  useEffect(() => {
        const fetchChatHistory = async () => {
            const response:any = await get(`chat/history?userId=${user.id}`);
            setChat(response?.data);
        };

        fetchChatHistory();
}, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      message,
      senderId: user?.id,
      receiverId: 6,
    });
    setChat((prevChat: any) => [
      ...prevChat,
      { message, senderId: user?.id, receiverId: 6},
    ]);
    setMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">User Chat</h1>

      <div className="border border-gray-300 rounded-lg p-4 h-80 overflow-y-scroll mb-4">
        {chat.map((msg: any, index: any) => (
          <div
            key={index}
            className={`py-1 ${
              msg.senderId === user?.id ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`font-bold ${
                msg.senderId === user?.id ? "text-green-600" : "text-blue-600"
              }`}
            >
              {msg.senderId === user?.id ? "You" : msg.senderId}:
            </span>
            <span className="ml-2">{msg.message}</span>
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
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white rounded p-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChat;
