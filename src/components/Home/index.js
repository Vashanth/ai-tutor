import React, { useEffect, useState } from "react";
import Header from "./Header";
import Content from "./Content";
import Cards from "./Cards";
import { Button, TextField, Skeleton } from "@mui/material";
import { getSubtopics, getRecommendations } from "../../services";
import { useNavigate } from "react-router-dom";

function getVideoId(url) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get("v");
}

function Home() {
  const navigate = useNavigate();

  const [topic, setSubTopic] = useState("");
  const [subtopics, setSubtopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubtopics, setSelectedSubtopics] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [subtopicsDict, setSubtopicsDict] = useState({});

  async function handleContinue() {
    setLoading(true);

    if (!subtopics.length) {
      const response = await getSubtopics(topic);
      setSubtopicsDict(response.data.subtopics);
      setSubtopics(response.data.subtopics.map((item) => item.subtopic));
    } else {
      const response = await getRecommendations(topic, subtopicsDict);
      setRecommendations(response.data);
      if (!Array.isArray(response.data)) {
        localStorage.setItem("topic", topic);
        localStorage.setItem("subtopics", JSON.stringify(subtopicsDict));
        navigate(
          `/video?videoId=${getVideoId(response.data.url)}&videoName=${
            response.data.title
          }&resourceId=${response.data.id}`
        );
      }
    }

    setLoading(false);
  }

  function handleSelectSubtopic(subtopic) {
    setSelectedSubtopics((prev) => ({
      ...prev,
      [subtopic]: !prev[subtopic],
    }));
  }

  return (
    <div className="px-[5%]">
      <Header />
      <Content />
      <div className="pt-8 flex flex-col gap-6">
        <span className="text-xl font-semibold">
          Let us have a small assessment to curate the right content for you
        </span>
        <span className="text-md font-sans">
          1. Enter a topic you want to learn today
        </span>
        <TextField
          label="Enter topic"
          variant="outlined"
          fullWidth
          value={topic}
          onChange={(e) => setSubTopic(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          {subtopics.length > 0 &&
            subtopics.map((subtopic) => (
              <div key={subtopic} className="flex gap-6">
                <Button
                  color="warning"
                  {...(selectedSubtopics[subtopic]
                    ? { variant: "contained" }
                    : { variant: "outlined" })}
                  onClick={(e) => handleSelectSubtopic(subtopic)}
                  sx={{ textTransform: "none" }}
                >
                  {subtopic}
                </Button>
              </div>
            ))}
        </div>
        {!loading && recommendations.length === 0 && (
          <div>
            <Button
              variant="contained"
              color="success"
              onClick={handleContinue}
              disabled={!topic}
            >
              Continue
            </Button>
          </div>
        )}
      </div>
      <div className="pt-6">
        {recommendations.length > 0 && <Cards cards={recommendations} />}
      </div>
      {loading && (
        <div className="flex flex-col gap-6 w-full">
          <span className="text-sm">Thinking...</span>
          <div className="flex gap-6">
            <Skeleton variant="rectangular" width={200} height={50} />
            <Skeleton variant="rectangular" width={200} height={50} />
            <Skeleton variant="rectangular" width={200} height={50} />
            <Skeleton variant="rectangular" width={200} height={50} />
            <Skeleton variant="rectangular" width={200} height={50} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
