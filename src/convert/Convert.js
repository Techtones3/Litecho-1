import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./page.css";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function Convert() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState("text");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [voice, setVoice] = useState("male");
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) navigate("/register");
  }, [userId, navigate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, audioUrl]);

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleTextChange = (e) => setText(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleFileTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedFileType(newType);
    setFile(null);
    setText("");
    setAudioUrl(null);
    setError(null);

    const spokenOption = {
      text: "Text to Audio",
      pdf: "PDF to Audio",
      image: "Image to Audio",
    }[newType];

    speakText(spokenOption);
  };

  const isInputEmpty = () => {
    return selectedFileType === "text" ? text.trim() === "" : file === null;
  };

  const handleConvert = () => {
    setIsLoading(true);
    setAudioUrl(null);
    setError(null);
    const formData = new FormData();
    const baseUrl = "https://litecho-1-backend.onrender.com";


    if (selectedFileType === "text") {
      axios
        .post(
          `${baseUrl}/convert_text`,
          { text, user_id: userId, voice, language },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          setAudioUrl(`${baseUrl}${res.data.audio_path}`);
        })
        .catch(() => {
          setError("An error occurred while converting the text to audio.");
        })
        .finally(() => setIsLoading(false));
    } else {
      formData.append("file", file);
      formData.append("user_id", userId);
      formData.append("voice", voice);
      formData.append("language", language);
      const endpoint =
        selectedFileType === "pdf" ? "convert_pdf" : "convert_image";

      axios
        .post(`${baseUrl}/${endpoint}`, formData)
        .then((res) => {
          setAudioUrl(`${baseUrl}${res.data.audio_path}`);
        })
        .catch(() => {
          setError(
            `An error occurred while converting the ${
              selectedFileType === "pdf" ? "PDF" : "image"
            } to audio.`
          );
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleSpeedChange = (e) => {
    const speed = parseFloat(e.target.value);
    setPlaybackSpeed(speed);
    if (audioRef.current) audioRef.current.playbackRate = speed;
  };

  if (!userId) return null;

  return (
    <div className="App">
      {isLoading && (
        <div className="spinner-overlay">
          <Spinner />
        </div>
      )}
      <Navbar />
      <h1 className="header1">CONVERT ALL YOUR TEXT TO AUDIO: PDF, IMAGES, TEXTS</h1>

      <div>
        <label title="Select file type">
          Select File Type:
          <select value={selectedFileType} onChange={handleFileTypeChange}>
            <option value="text">Text to Audio</option>
            <option value="pdf">PDF to Audio</option>
            <option value="image">Image to Audio</option>
          </select>
        </label>
      </div>

      {selectedFileType === "text" && (
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text here"
          rows="4"
          cols="50"
        />
      )}

      {(selectedFileType === "pdf" || selectedFileType === "image") && (
        <input
          type="file"
          onChange={handleFileChange}
          accept={selectedFileType === "pdf" ? ".pdf" : ".png, .jpg, .jpeg"}
        />
      )}

<div className="controls-stack">
  <div className="voice-lang-row">
    <label>
      Voice:
      <select value={voice} onChange={(e) => setVoice(e.target.value)}>
        <option value="male">US Male (Guy)</option>
        <option value="female">US Female (Jenny)</option>
        <option value="uk_male">UK Male (Ryan)</option>
        <option value="uk_female">UK Female (Libby)</option>
        <option value="indian_male">Indian Male (Prabhat)</option>
        <option value="indian_female">Indian Female (Neerja)</option>
        <option value="spanish_male">Spanish Male (Jorge)</option>
        <option value="spanish_female">Spanish Female (Dalia)</option>
        <option value="german_male">German Male (Conrad)</option>
        <option value="german_female">German Female (Katja)</option>
        <option value="french_male">French Male (Henri)</option>
        <option value="french_female">French Female (Denise)</option>
      </select>
    </label>

    <label>
      Language:
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>
    </label>
  </div>

  <button
    onClick={handleConvert}
    disabled={isInputEmpty() || isLoading}
    className="convert-button"
  >
    <span className="convert-text">
      {isLoading ? "Converting..." : "Convert to Audio"}
    </span>
  </button>
</div>



      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && audioUrl && (
        <div>
          <h3>Audio File</h3>
          <audio
            ref={audioRef}
            controls
            controlsList="nodownload noplaybackrate"
          >
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>

          <div className="audio-controls">
          <a
  href={`https://litecho-1-backend.onrender.com/download/audio/${audioUrl.split("/").pop()}`}
              download
              className="download-button"
            >
              Download Audio
            </a>

            <div className="speed-control">
              <label>
                Playback Speed:
                <select value={playbackSpeed} onChange={handleSpeedChange}>
                  <option value="0.5">0.5x</option>
                  <option value="1">1x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Convert;
