// Fetch all messages from the backend
export async function fetchMessages() {
  const response = await fetch("http://127.0.0.1:5000/api.messages");
  const data = await response.json();
  return data;
}

// Function to add a note
export async function addMessage(userInput: string) {
  const newMessage = { sender: "user", message: userInput };

  try {
    await fetch(`http://localhost:5000/api.messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });
    console.log("Message added!");
    fetchMessages();
  } catch (err) {
    // Handling error messages
    console.log(err);
    alert("Adding failed");
  }
}
// End of function to add note
