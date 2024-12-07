import { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import './App.css'

const PORT = 3001;
const socket = io(`http://localhost:${PORT}`);

export const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [chatIsVisible, setChatIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    socket.on("receive_msg", ({ user: sender, message }) => {
      const msgData = { sender, message };

      setMessages((prevMessages) => [...prevMessages, msgData]);
    });

    return () => socket.off("receive_msg");
  }, []);

  const handleEnterChatRoom = () => {
    if (user && room) {
      setChatIsVisible(true);
      socket.emit("join_room", { user, room });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsgData = {
        room,
        user,
        message: newMessage,
      };

      setMessages((prevMessages) => [...prevMessages, newMsgData]);
      socket.emit("send_msg", newMsgData);
      setNewMessage("");
    }
  };

  return (
    <div className="container">
      {!chatIsVisible ? (
        <div className="login">
          <input
            id="a"
            type="text"
            placeholder="Enter UserName"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <br />
          <input
            id="a"
            type="text"
            placeholder="Enter Room Code"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <br />
          <button id="btn" onClick={handleEnterChatRoom}>Enter Chat Room</button>
        </div>
      ) : (
        <>
          <h5>Room: {room} | User: {user}</h5>
          <div className="chat">
            {messages.map(({ sender, message }) => (
              <div
                key={uuidv4()}
                style={{
                  alignSelf: sender === user ? "flex-end" : "flex-start",
                  backgroundColor: sender === user ? "#72c2ff" : "#0081e1",
                  color: "white",
                  margin: ".2rem",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  maxWidth: "fit-content",
                }}
              >
                {sender !== user && <strong>{sender}:</strong>} {message}
              </div>
            ))}
          </div>
          <div className="fn">
          <input 
            type="text"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};
