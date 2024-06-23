import { useState, useContext, useEffect } from "react";
import { WebSocketContext } from "../../store/WebSocketContext";

import { MdOutlineZoomInMap } from "react-icons/md";
import { MdOutlineZoomOutMap } from "react-icons/md";

import classes from "./LiveStream.module.scss";
import LiveStreamVideoHeader from "./LiveStreamVideoHeader.jsx/LiveStreamVideoHeader";
import Button from "../ui/Button/Button";

export default function LiveStream({ isZoomed, handleZoomClick }) {
  const [frameUrl, setFrameUrl] = useState([]);
  const json = useContext(WebSocketContext);

  useEffect(() => {
    if (json) {
      const { frame_url } = json;

      const imgUrl = `../../../backend/ModelService/${frame_url}`;
      setFrameUrl((prevUrls) => [...prevUrls, imgUrl]);
    }
  }, [json]);

  return (
    <div className={classes["live-stream"]}>
      <h3 className={classes["live-stream-heading"]}>
        <p className={classes["live-stream-title"]}>Live Streaming-Camera</p>
        <Button
          icon={
            isZoomed ? (
              <MdOutlineZoomOutMap className={classes.zoomIcon} />
            ) : (
              <MdOutlineZoomInMap className={classes.zoomIcon} />
            )
          }
          handleClick={handleZoomClick}
        ></Button>
      </h3>

      <div className={classes["video-container"]}>
        <LiveStreamVideoHeader />
        <img
          src={frameUrl[frameUrl.length - 2]}
          className={
            isZoomed
              ? `${classes["video-img"]} ${classes.zoom}`
              : classes["video-img"]
          }
        />
      </div>
    </div>
  );
}
