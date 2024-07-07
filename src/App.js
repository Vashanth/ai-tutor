import React, { useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import VideoChat from "./components/VideoChat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  useEffect(() => {
    document.title = "AI Tutor";
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/video" element={<VideoChat />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
