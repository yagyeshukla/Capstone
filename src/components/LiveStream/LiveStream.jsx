import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { WebSocketContext } from "../../store/WebSocketContext";
import { WebSocketContextForklift } from "../../store/WebSocketContextForklift";

import classes from "./LiveStream.module.scss";
import LiveStreamVideoHeader from "./LiveStreamVideoHeader.jsx/LiveStreamVideoHeader";
import CameraButton from "../ui/CameraButton/CameraButton";
import { GoDeviceCameraVideo } from "react-icons/go";
import { CiVideoOn } from "react-icons/ci";

import { handlePpeClick, handleForkliftClick } from "../../utils/http";
import LiveStreamVideoFooter from "./LiveStreamVideoFooter/LiveStreamVideoFooter";

export default function LiveStream({ isZoomed, handleZoomClick, useCase }) {
  const [frameUrl, setFrameUrl] = useState([]);
  const context =
    useCase === "forklift" ? WebSocketContextForklift : WebSocketContext;
  const { json } = useContext(context);

  useEffect(() => {
    if (json) {
      const { frame_url } = json;
      const imgUrl = `../../../backend/ModelService/resources/detected_frames/${frame_url}`;
      setFrameUrl((prevUrls) => [...prevUrls, imgUrl]);
    }
  }, [json]);

  return (
    <div className={classes["live-stream"]}>
      <h3 className={classes["live-stream-heading"]}>
        <p className={classes["live-stream-title"]}>Live Streaming-Camera</p>
        <div className={classes.cameraButtonContainer}>
          <CameraButton
            Icon={GoDeviceCameraVideo}
            onClick={handlePpeClick}
            to="/dashboard-ppe"
          >
            Cam 1
          </CameraButton>
          <CameraButton
            Icon={GoDeviceCameraVideo}
            onClick={handleForkliftClick}
            to="/dashboard-forklift"
          >
            Cam 2
          </CameraButton>
        </div>
      </h3>

      <div className={classes["video-container"]}>
        <LiveStreamVideoHeader />
        <div className={classes["video-wrapper"]}>
          <img
            src={frameUrl[frameUrl.length - 1]}
            className={
              isZoomed
                ? `${classes["video-img"]} ${classes.zoom}`
                : `${classes["video-img"]}`
            }
          />
          <div className={classes.streamOverlay}></div>
        </div>
        <LiveStreamVideoFooter
          isZoomed={isZoomed}
          handleZoomClick={handleZoomClick}
          useCase={useCase}
        />
      </div>
    </div>
  );
}
