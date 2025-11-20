import React from "react";
import { useEffect, useState } from "react";
import { fetchMessages } from "../../api/api";
import { RiRobot3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import "./Message.css";

// Define the messageProps type
// type messageProps = {
//   id: number;
//   sender: "user" | "bot";
//   message: string;
// };

// // Sample messages array
// const messages: messageProps[] = [
//   { id: 1, sender: "user", message: "Hello!" },
//   { id: 2, sender: "bot", message: "Hi there! How can I assist you today?" },
//   { id: 3, sender: "user", message: "Can you tell me a joke?" },
//   {
//     id: 4,
//     sender: "bot",
//     message:
//       "Why did the scarecrow win an award? Because he was outstanding in his field!",
//   },
//   { id: 5, sender: "user", message: "Haha, that's funny!" },
//   { id: 6, sender: "bot", message: "Glad you liked it! Anything else?" },
//   { id: 7, sender: "user", message: "No, that's all for now." },
//   { id: 8, sender: "bot", message: "Alright! Have a great day!" },
//   { id: 9, sender: "user", message: "You too, bye!" },
//   { id: 10, sender: "bot", message: "Goodbye!" },
//   { id: 11, sender: "user", message: "What's the weather like today?" },
//   {
//     id: 12,
//     sender: "bot",
//     message:
//       "It's sunny with a high of 25°C (77°F) and a low of 15°C (59°F). Perfect day for a walk!",
//   },
//   { id: 13, sender: "user", message: "Thanks for the info!" },
//   {
//     id: 14,
//     sender: "bot",
//     message: "You're welcome! Let me know if you need anything else.",
//   },
// ];

// ChatMessage component
export const ChatMessage = ({
  sender,
  msg,
}: {
  sender: "user" | "bot";
  msg: string;
}) => {
  return (
    <div className={`chat ${sender === "user" ? "chat-user" : "chat-bot"}`}>
      {sender === "bot" && (
        <div className="msg-icon bot-icon">
          <RiRobot3Fill />
        </div>
      )}
      <div
        className={`chat-message ${
          sender === "user" ? "user-message" : "bot-message"
        }`}
      >
        <p>{msg}</p>
      </div>
      {sender === "user" && (
        <div className="msg-icon user-icon">
          <FaUser />
        </div>
      )}
    </div>
  );
};

// ChatDisplay component
export const ChatDisplay = () => {
  // Add scroll to bottom function
  function scrollToBottom() {
    const element = document.getElementsByClassName("chat-display")[0];
    element.scrollTop = element.scrollHeight;
  }
  const [conversation, setConversation] = useState([]);

  async function getMessages() {
    const data = await fetchMessages();
    setConversation(data);
  }

  useEffect(() => {
    getMessages();
    scrollToBottom();
  }, [conversation]);

  // Receive notes from the backend and set it to Notes useState

  return (
    <div className="chat-display">
      {conversation.map(
        (msg: { id: number; sender: "user" | "bot"; message: string }) => (
          <div key={msg.id} className="chat-display">
            <ChatMessage sender={msg.sender} msg={msg.message} />
          </div>
        )
      )}
    </div>
  );
};

// Main Message component
const Message = () => {
  return (
    <div className="chat-display-container">
      <ChatDisplay />
    </div>
  );
};

export default Message;
