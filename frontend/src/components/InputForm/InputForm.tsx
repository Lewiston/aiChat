import React from "react";
import { GoogleGenAI } from "@google/genai";
import { addMessage, aiMessage, fetchMessages } from "../../api/api";
import { useState } from "react";
import "./InputForm.css";
import { IoSend } from "react-icons/io5";

const InputForm = ({ toggleButton }) => {
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
            fetchMessages();
            const api_key = process.env.API_KEY;

            const ai = new GoogleGenAI({ apiKey: api_key });
            async function main(message: string) {
              const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: message,
              });

              const ai_message: string | undefined = response.text;
              if (ai_message) {
                aiMessage(ai_message);
              }
              toggleButton();
            }
            main(userInput);
            setUserInput(""); // Clear input field after adding note
            fetchMessages();
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
