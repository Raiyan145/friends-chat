let chat = document.getElementById("chat")

async function send(){

let input = document.getElementById("message")
let msg = input.value

if(msg=="") return

chat.innerHTML += `<div class="you">YOU: ${msg}</div>`
chat.scrollTop = chat.scrollHeight

input.value=""

try{

let reply = await aiReply(msg)

chat.innerHTML += `<div class="bot">BOT: ${reply}</div>`
chat.scrollTop = chat.scrollHeight

}catch(e){

chat.innerHTML += `<div class="bot">BOT: Error connecting AI</div>`

}

}

async function aiReply(text){

let API_KEY = "AIzaSyBqJP-SEyfvOlu1ZYxepzxjIraRKStdiaw"

let res = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+API_KEY,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{ text:text }
]
}
]
})
})

let data = await res.json()

return data.candidates[0].content.parts[0].text

}

document.getElementById("message").addEventListener("keypress", function(e){
if(e.key === "Enter"){
send()
}
})
