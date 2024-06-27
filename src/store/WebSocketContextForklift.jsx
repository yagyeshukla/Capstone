import { createContext, useEffect, useState } from "react";

export const WebSocketContextForklift = createContext(null);

export default function WebSocketContextForkliftProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [json, setJson] = useState();
  useEffect(() => {
    setLoading(true);
    const ws = new WebSocket("ws://localhost:8083/forklift-streaming");

    ws.onopen = function (event) {
      console.log("Connection is open");
      ws.send("Hello, server!");

      ws.onmessage = function (event) {
        const jsonRecieved = JSON.parse(event.data);
        setJson(jsonRecieved);
      };
    };
    setLoading(false);
  }, []);

  return (
    <WebSocketContextForklift.Provider value={{ json: json, loading }}>
      {children}
    </WebSocketContextForklift.Provider>
  );
}
