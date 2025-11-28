const render = import.meta.env.VITE_RENDER;
// const localhost = import.meta.env.VITE_LOCALHOST;

// Fetch all messages from the backend
export async function fetchMessages() {
  const response = await fetch(`${render}/api/messages`);
  const data = await response.json();
  return data;
}

// Function to add a note
export async function addMessage(userInput: string) {
  const newMessage = { sender: "user", message: userInput };

  try {
    await fetch(`${render}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });
    console.log("Message added!");
  } catch (err) {
    // Handling error messages
    console.log(err);
    alert("Adding failed");
  }
}

// Function to add a note
export async function aiMessage(aiInput: string) {
  const newMessage = { sender: "bot", message: aiInput };

  try {
    await fetch(`${render}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });
    console.log("Message added!");
  } catch (err) {
    // Handling error messages
    console.log(err);
    alert("AI message failed");
  }
}
// End of function to add note

// Delete api

export async function clearChat() {
  await fetch(`${render}/api/messages`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

// Delete api
