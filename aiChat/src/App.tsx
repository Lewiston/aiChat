import React from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import Message from "./components/Message/Message";

const App = () => {
  return (
    <div className="app-container">
      <Message />
      <div className="input-form-container">
        <InputForm />
      </div>
    </div>
  );
};

export default App;
