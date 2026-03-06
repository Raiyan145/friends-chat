const input = document.querySelector("#messageInput");
const sendBtn = document.querySelector("#sendBtn");
const chatBox = document.querySelector("#chatBox");

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // show user message
  const userDiv = document.createElement("div");
  userDiv.className = "user";
  userDiv.innerText = "YOU: " + userMessage;
  chatBox.appendChild(userDiv);

  input.value = "";

  // typing message
  const botDiv = document.createElement("div");
  botDiv.className = "bot";
  botDiv.innerText = "BOT: typing...";
  chatBox.appendChild(botDiv);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    botDiv.innerText = "BOT: " + data.reply;
  } catch (err) {
    botDiv.innerText = "BOT: Error connecting AI";
  }
}
