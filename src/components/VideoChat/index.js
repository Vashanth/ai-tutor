import React from "react";
import Header from "../Home/Header";
import Sections from "./Sections";
import "./Video.css";

function getVideoIdFromQueryParam() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("videoId");
}

function getVideoNameFromQueryParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoName = urlParams.get("videoName");
  return videoName === "undefined"
    ? "Video activity"
    : urlParams.get("videoName");
}

const VideoChat = (props) => {
  const videoId = getVideoIdFromQueryParam();
  const videoName = getVideoNameFromQueryParam();

  return (
    <div className="px-[5%] h-full bg-[#f0f0f0]">
      <Header />
      <div className="animateFromBelow h-full">
        <Sections videoId={videoId} videoName={videoName} />
      </div>
    </div>
  );
};

export default VideoChat;
