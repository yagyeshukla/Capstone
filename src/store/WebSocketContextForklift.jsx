import { createContext, useEffect, useState } from "react";

export const WebSocketContextForklift = createContext(null);

export default function WebSocketContextForkliftProvider({ children }) {
  const [json, setJson] = useState();
  useEffect(() => {
    // const ws = new WebSocket("ws://localhost:8083/forklift-streaming");
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = function (event) {
      console.log("Connection is open");
      ws.send("Hello, server!");

      ws.onmessage = function (event) {
        const jsonRecieved = JSON.parse(event.data);
        setJson(jsonRecieved);
      };
    };
  }, []);

  return (
    <WebSocketContextForklift.Provider value={{ json: json }}>
      {children}
    </WebSocketContextForklift.Provider>
  );
}
