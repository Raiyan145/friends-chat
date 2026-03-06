const input = document.querySelector("input");
const sendBtn = document.querySelector("button");
const chatBox = document.querySelector(".chat-box");

sendBtn.onclick = async () => {
  const userMessage = input.value;
  if (!userMessage) return;

  chatBox.innerHTML += `<div class="user">YOU: ${userMessage}</div>`;
  input.value = "";

  chatBox.innerHTML += `<div class="bot">BOT: typing...</div>`;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await res.json();

  document.querySelector(".bot:last-child").innerText =
    "BOT: " + data.reply;
};
