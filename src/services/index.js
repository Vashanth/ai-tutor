import axios from "axios";

export function getSubtopics(topic) {
  return axios.post(
    "https://ai-tutor-production-8767.up.railway.app/topics/get_subtopics",
    {
      user: "123",
      topic,
    }
  );
}

export function getRecommendations(topic, subtopics) {
  return axios.post(
    "https://ai-tutor-production-8767.up.railway.app/topics/get_resource",
    {
      user: "123",
      topic,
      subtopics,
    }
  );
}

export async function updateMasteryLevel(
  topic,
  videoSummary,
  resourceId,
  questions,
  answers
) {
  try {
    const response = await axios.post(
      "https://ai-tutor-production-8767.up.railway.app/topics/update_mastery_level",
      {
        user: "123",
        topic,
        summary_of_transcript: videoSummary,
        resource_id: resourceId,
        questions,
        answers,
      }
    );

    return response;
  } catch (err) {
    return {
      data: {},
    };
  }
}

export function getQuestions(videoId) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  return Promise.resolve([]);
}

export function getVideoSummary(url) {
  return axios.post(
    "https://ai-tutor-production-8767.up.railway.app/topics/get_youtube_summary_and_questions",
    {
      url,
    }
  );
}

export function getAnswerFeedback(question, answer) {
  return axios.post(
    "https://ai-tutor-production-8767.up.railway.app/topics/get_answer_feedback",
    {
      question,
      answer,
    }
  );
}

export function getMarkdownReport() {
  return `
# Markdown Report
## Section 1
This is the content of section 1
## Section 2
<b>Hai</b>
  `;
}
