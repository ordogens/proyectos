const readline = require("readline");
const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "You> "
});

socket.on("connect", () => {
  console.log("Connected to the chat");
  rl.prompt();
});

socket.on("message", (msg) => {
  console.log(`\nMessage: ${msg}`);
  rl.prompt();
});

rl.on("line", (input) => {
  if (input.trim()) {
    socket.emit("message", input.trim());
  }
  rl.prompt();
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
  process.exit(0);
});
