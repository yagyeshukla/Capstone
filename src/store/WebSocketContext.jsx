import { createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext(null);

export default function WebSocketContextProvider({ children }) {
  // const [socket, setSocket] = useState(null);
  const [json, setJson] = useState();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = function (event) {
      console.log("Connection is open");
      ws.send("Hello, server!");

      ws.onmessage = function (event) {
        const jsonRecieved = JSON.parse(event.data);
        // console.log(jsonRecieved);
        setJson(jsonRecieved);
      };
    };
    // setSocket(ws);
  }, []);

  return (
    <WebSocketContext.Provider value={json}>
      {children}
    </WebSocketContext.Provider>
  );
}
