import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Set Pusher to use WebSocket connection
window.Pusher = Pusher;

// Configure Laravel Echo
export const echo = new Echo({
  broadcaster: "pusher",
  key: process.env.REACT_APP_PUSHER_APP_KEY || "your-app-key", // Fallback to 'your-app-key' if env var is not set
  wsHost: "192.168.0.111", // WebSocket server host
  wsPort: 6001, // WebSocket server port
  forceTLS: false, // Disable TLS for local development
  disableStats: true, // Disable stats to reduce load
  enabledTransports: ["ws", "wss"], // Enable WebSocket and Secure WebSocket
});

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const url = "ws://192.168.0.111:6001";
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `Closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        console.error("WebSocket closed unexpectedly");
      }
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{JSON.stringify(message)}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
