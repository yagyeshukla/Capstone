import { createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext(null);

export default function WebSocketContextProvider({ children }) {
  const [json, setJson] = useState();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ppe-streaming");

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
    <WebSocketContext.Provider value={{ json: json }}>
      {children}
    </WebSocketContext.Provider>
  );
}
