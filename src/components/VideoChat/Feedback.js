import React from "react";
import "./Feedback.css";
import { Skeleton } from "@mui/material";

const Feedback = (props) => {
  if (!props.feedback) {
    return (
      <div className="flex flex-col gap-2 ml-20 mt-6">
        <Skeleton variant="rectangular" width={350} height={80} />
        <Skeleton variant="rectangular" width={350} height={80} />
      </div>
    );
  }

  if (props.feedback.isCorrect) {
    return (
      <div className="feedback">
        <span className="text-md font-semibold mb-2">Feedback</span>
        <div className="feedback-section correct">
          <h3 className="font-semibold">What you got right</h3>
          <p>{props.feedback.explanation}</p>
        </div>
        <div className="bg-[gold]">
          <h3>Improvements</h3>
          {props.feedback.improvement_suggestions.map((improvement, idx) => (
            <p key={idx}>{improvement}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="feedback">
      <span className="text-md font-semibold mb-2">Feedback</span>
      <div className="feedback-section correct">
        <h3 className="font-semibold">What you got right</h3>
        <p>{props.feedback.explanation}</p>
      </div>
      {props.feedback.improvement_suggestions?.length > 0 && (
        <div className="feedback-section wrong">
          <h3 className="font-semibold">What you got wrong</h3>
          {props.feedback.improvement_suggestions.map((improvement, idx) => (
            <p key={idx}>{improvement}</p>
          ))}
        </div>
      )}
      {props.feedback.explanation && (
        <div className="feedback-section bg-[#f6efc6] border border-[gold]">
          <h3 className="font-semibold">Explanation</h3>
          {props.feedback.improvement_suggestions.map((improvement, idx) => (
            <p key={idx}>{improvement}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;
