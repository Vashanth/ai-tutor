import React, { useEffect, useState } from "react";
import Feedback from "./Feedback.js";
import "./QuestionCard.css";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const QuestionCard = (props) => {
  const [answer, setAnswer] = useState(props.answer || "");
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  return (
    <div>
      <span className="absolute px-1 border border-[black] z-[999] bg-[white]">
        Evaluation mode
      </span>
      <div className="relative question-card flex w-full pb-4 pt-3 max-h-[320px] overflow-auto">
        <div className="max-w-[60%]">
          <div className="question-content">
            <div className="question">
              <p>{props.question}</p>
            </div>
            {props.answer ? (
              <div className="textarea-container min-h-[100px] bg-[#f0f0f0]">
                {props.answer}
              </div>
            ) : (
              <div className="textarea-container min-h-[100px]">
                <textarea
                  className="custom-textarea"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                />
              </div>
            )}
            {!props.answer && (
              <div className="action-buttons flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={props.movePrevious}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={props.moveNext}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Button>
                </div>
                {!props.answer && (
                  <div className="flex gap-2">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => props.onAnswer(answer)}
                    >
                      Answer
                    </Button>
                  </div>
                )}
              </div>
            )}
            {props.answer && (
              <div className="flex gap-2 justify-between mt-2 margin-auto">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={props.movePrevious}
                  style={{ visibility: props.feedback ? "visible" : "hidden" }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <div className="flex">
                  <div
                    className={`border border-[black] p-1 cursor-pointer hover:bg-[#f6e690] ${
                      selectedFeedback === 0 ? "bg-[#f6e690]" : ""
                    }`}
                    onClick={(e) => setSelectedFeedback(0)}
                  >
                    not sure
                  </div>
                  <div
                    className={`border border-[black] p-1 cursor-pointer hover:bg-[#f6e690] ${
                      selectedFeedback === 1 ? "bg-[#f6e690]" : ""
                    }`}
                    onClick={(e) => setSelectedFeedback(1)}
                  >
                    okay
                  </div>
                  <div
                    className={`border border-[black] p-1 cursor-pointer hover:bg-[#f6e690] ${
                      selectedFeedback === 2 ? "bg-[#f6e690]" : ""
                    }`}
                    onClick={(e) => setSelectedFeedback(2)}
                  >
                    I know it
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={props.moveNext}
                  style={{ visibility: props.feedback ? "visible" : "hidden" }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </div>
            )}
          </div>
        </div>
        {props.answer && <Feedback feedback={props.feedback} />}
      </div>
    </div>
  );
};

export default QuestionCard;
