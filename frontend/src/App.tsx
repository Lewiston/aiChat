import { useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import Message from "./components/Message/Message";

const App = () => {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  function toggleButton() {
    setButtonClicked((prev) => !prev);
  }
  return (
    <div className="app-container">
      <Message clicked={buttonClicked} />
      <div className="input-form-container">
        <InputForm toggleButton={toggleButton} />
      </div>
    </div>
  );
};

export default App;
