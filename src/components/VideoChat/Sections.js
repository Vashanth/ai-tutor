import React, { useEffect, useState } from "react";
import "./Video.css";
import YouTubePlayer from "./YoutubeMedia";
import {
  getAnswerFeedback,
  getRecommendations,
  getVideoSummary,
  updateMasteryLevel,
} from "../../services/index";
import QuestionCard from "./QuestionCard";
import { Button, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BasicModal from "./Modal";

function getUrlFromVideoId(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

const getResourceIdFromQueryParam = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("resourceId");
};

function getVideoId(url) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get("v");
}

const Sections = (props) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [videoSummary, setVideoSummary] = useState("");
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [markdown, setMarkdown] = useState("");
  const areAllQuestionsAnswered =
    questions.length === Object.keys(answers).length && questions.length > 0;

  useEffect(() => {
    getVideoSummary(getUrlFromVideoId(props.videoId)).then((data) => {
      setVideoSummary(data?.data?.summary_of_transcript);
      setQuestions(data?.data?.questions);
    });
  }, []);

  function handleMoveNext() {
    setActiveQuestionIdx((activeQuestionIdx + 1) % questions.length);
  }

  function handleMovePrevious() {
    setActiveQuestionIdx(
      (activeQuestionIdx - 1 + questions.length) % questions.length
    );
  }

  function handleAnswer(ans) {
    setAnswers({ ...answers, [activeQuestionIdx]: ans });

    getAnswerFeedback(questions[activeQuestionIdx], ans).then((data) => {
      setFeedback({ ...feedback, [activeQuestionIdx]: data.data });
    });
  }

  async function handleGetNextResource() {
    // const topic = localStorage.getItem("topic") || "";
    // const subtopics = JSON.parse(localStorage.getItem("subtopics")) || {};

    // const mastery = await updateMasteryLevel(
    //   topic,
    //   videoSummary,
    //   getResourceIdFromQueryParam(),
    //   questions,
    //   Object.values(answers)
    // );

    // const response = await getRecommendations(topic, subtopics);
    // const { url, id, title } = response.data || {};

    window.location.href =
      "/video?videoId=1DWZFkipYtE&videoName=Chemical Bonding&resourceId=123";
  }

  return (
    <div className="container font-mono flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="w-fit flex">{props.videoName}</span>
        {!areAllQuestionsAnswered && (
          <Button
            onClick={handleGetNextResource}
            variant="outlined"
            color="success"
          >
            Continue your learning journey
          </Button>
        )}
      </div>
      <div className="w-full flex gap-6">
        <div className="w-2/3">
          <YouTubePlayer videoId={props.videoId} videoName={props.videoName} />
        </div>
        {videoSummary ? (
          <div className="w-1/3 max-h-[350px] overflow-scroll flex flex-col gap-2">
            <span className="font-semibold text-lg">Video summary</span>
            {videoSummary}
          </div>
        ) : (
          <Skeleton variant="rectangular" height={250} width="33%" />
        )}
      </div>

      {questions.length === 0 ? (
        <div className="flex w-full h-[200px] items-center justify-center pt-8">
          <Skeleton variant="rectangular" height={200} width="100%" />
        </div>
      ) : (
        <div className="bg-white">
          <div className="bg-[#e5e2e2] border border-solid border-[black] w-full p-1">
            <QuestionCard
              key={activeQuestionIdx}
              question={questions[activeQuestionIdx]}
              answer={answers[activeQuestionIdx]}
              feedback={feedback[activeQuestionIdx]}
              onAnswer={(ans) => handleAnswer(ans)}
              moveNext={() => handleMoveNext()}
              movePrevious={() => handleMovePrevious()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sections;
