import { CircularProgress } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

const YT_API_TIMEOUT = 200;

const YouTubePlayer = ({
  videoId,
  start = 0,
  end = 0,
  autoPlay = 0,
  showControls = 1,
  loopVideo = 0,
  onReady,
  onEnded,
  onPlaying,
  onPaused,
  onError,
  onMount,
  videoName,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ytPlayer, setYtPlayer] = useState(null);
  const videoContainerRef = useRef(null);
  const iframeContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        loadVideo();
        console.log("Retried");
        timer && clearTimeout(timer);
      }
    }, 5000);

    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  const loadVideo = () => {
    if (!window.YT || !window.YT.Player) {
      return;
    }

    if (ytPlayer && ytPlayer.stopVideo) {
      ytPlayer.stopVideo();
    }

    if (ytPlayer && ytPlayer.destroy) {
      ytPlayer.destroy();
      setYtPlayer(null);
    }

    const hostName = "https://www.youtube-nocookie.com";

    if (!videoContainerRef.current) {
      return;
    }

    const player = new window.YT.Player(iframeContainerRef.current, {
      videoId,
      host: hostName,
      width: videoContainerRef.current.clientWidth,
      height: videoContainerRef.current.clientHeight,
      playerVars: {
        autoplay: autoPlay,
        controls: showControls,
        iv_load_policy: 3,
        loop: loopVideo,
        modestbranding: 1,
        enablejsapi: 1,
        rel: 0,
        start: Math.floor(start),
        end: Math.floor(end),
        origin: "https://quizizz.com",
        widget_referrer: "https://quizizz.com",
      },
      events: {
        onReady: () => {
          console.log("DEBUG onReady");
          setIsLoading(false);
          onReady && onReady();
        },
        onStateChange: (ev) => {
          if (ev.data === window.YT.PlayerState.ENDED) {
            loadVideo();
            onEnded && onEnded();
          } else if (ev.data === window.YT.PlayerState.PLAYING) {
            onPlaying && onPlaying();
          } else if (ev.data === window.YT.PlayerState.PAUSED) {
            onPaused && onPaused();
          }
        },
        onError: (ev) => {
          console.log("DEBUG onError", ev);
          onError && onError(ev.data);
        },
      },
    });

    setYtPlayer(player);
  };

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      setTimeout(() => {
        loadVideo();
      }, YT_API_TIMEOUT);
    };

    loadYouTubeAPI();
    onMount && onMount();
  }, []);

  useEffect(() => {
    loadVideo();
  }, [videoId, start, end]);

  return (
    <div
      ref={videoContainerRef}
      data-testid="media-youtube"
      className="media-youtube w-full h-[400px] overflow-hidden relative"
    >
      <div
        id={`yt-id-${videoId}`}
        ref={iframeContainerRef}
        className="h-full w-full"
      />
      {isLoading && (
        <div
          data-testid="media-youtube-loader"
          className="loading absolute w-full h-full inset-0 flex justify-center items-center animate-spin"
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default YouTubePlayer;
