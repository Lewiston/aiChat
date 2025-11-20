import React from "react";
import { addMessage } from "../../api/api";
import { useState } from "react";
import "./InputForm.css";
import { IoSend } from "react-icons/io5";

const InputForm = () => {
  // State management for input form
  const [userInput, setUserInput] = useState("");

  return (
    <div>
      <form action="submit" className="user-input-form" method="POST">
        <input
          type="text"
          placeholder="How can I help today?"
          required
          className="user-input-msg"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault(); // Prevent a reload after adding note
            addMessage(userInput);
            setUserInput(""); // Clear input field after adding note
          }}
        >
          Send
          <IoSend className="send-icon" />
        </button>
      </form>
    </div>
  );
};

export default InputForm;
