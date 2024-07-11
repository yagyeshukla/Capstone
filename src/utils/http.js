import axios from "axios";
import {useContext} from "react";
import { LoadingContext} from "../store/LoadingContext";
function stopStreaming(type) {
  axios.post('/video/stop', new URLSearchParams({ type }))
      .then(response => {
          console.log(response.data); 
      })
      .catch(error => {
          console.error('Error stopping streaming:', error);
      });
}
const handlePpeClick = async () => {
  stopStreaming('rtmp');
  try {
    const response = await axios.post(
      "http://localhost:8082/video/start",
      new URLSearchParams({
        source: "src/main/resources/helmet.mp4",
        type: "rtmp",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const handleForkliftClick = async () => {
  stopStreaming('rtmp');
  try {
    const response = await axios.post(
      "http://localhost:8082/video/start",
      new URLSearchParams({
        source: "src/main/resources/forklift_final.mp4",
        type: "rtmp",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export { handlePpeClick, handleForkliftClick };
