const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = (sender === "user" ? "👤 " : "🤖 ") + text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  try {
    const res = await fetch("https://taau-engine.ratn.dev/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_prompt: message }),
    });

    const data = await res.json();
    addMessage(data.message || data.raw || "No response", "bot");
  } catch (err) {
    addMessage("Something went wrong. Try again later.", "bot");
  }
}
