import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUrl } from "../../store";
import { useNavigate } from "react-router-dom";

function getVideoId(cardUrl) {
  const url = new URL(cardUrl);
  const searchParams = new URLSearchParams(url.search);
  return searchParams.get("v");
}

function Cards(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToVideo = (card) => {
    const videoId = getVideoId(card.url);
    const videoName = card.name;
    navigate(
      `/video?videoId=${videoId}&videoName=${videoName}&resourceId=${card.id}`
    );
  };

  function handleClickCard(card) {
    dispatch(setUrl(getVideoId(card.url)));
    navigateToVideo(card);
  }

  return (
    <div className="flex flex-col gap-4 pt-2">
      <span className="text-xl font-semibold">Recommendations</span>
      <div className="flex gap-2 flex-wrap">
        {props.cards?.map((card) => (
          <div
            key={card.title}
            className="relative border border-solid p-3 rounded flex flex-col gap-2 hover:shadow-lg cursor-pointer"
            onClick={(e) => handleClickCard(card)}
          >
            <img
              src={`https://img.youtube.com/vi/${getVideoId(card.url)}/0.jpg`}
              height="300"
              width="350"
            />
            <img
              src="https://cf.quizizz.com/Create with AI/Static - Youtube.png"
              className="absolute top-[40%] left-[45%]"
              width="40"
              height="40"
            />
            <div className="text-lg font-sans">{card.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
