import React from "react";
import "./Help.css";

function Help() {
  return (
    <div className="help-container">
      <h1>Need Help Using LitEcho?</h1>
      <p>
        We’re here to guide you! Below are answers to common questions and a quick guide on using
        each feature.
      </p>

      <h2>📌 Getting Started</h2>
      <ol>
        <li>Log in or sign up for a free account.</li>
        <li>Go to the <strong>Audio Converter</strong> section from the sidebar.</li>
        <li>Choose a file type: <strong>Text</strong>, <strong>PDF</strong>, or <strong>Image</strong>.</li>
        <li>Upload or type content, then click <strong>"Convert to Audio"</strong>.</li>
        <li>Play or download your audio from the results.</li>
      </ol>

      <h2>🙋 Frequently Asked Questions</h2>
      <div className="faq">
        <p><strong>Q: Can I use this without uploading files?</strong></p>
        <p>A: Yes! You can type directly into the text box for instant conversion.</p>

        <p><strong>Q: Does LitEcho support multiple languages?</strong></p>
        <p>A: Absolutely. You can select from English, Spanish, French, and German — with various voice types.</p>

        <p><strong>Q: Is it accessible for blind users?</strong></p>
        <p>A: Yes. LitEcho supports screen readers, keyboard navigation, and includes color-blind and dark modes.</p>

        <p><strong>Q: Can I control audio playback speed?</strong></p>
        <p>A: Yes, use the dropdown below the audio player to choose between 0.5x to 2x speed.</p>
      </div>

      <h2>🧑‍💻 Keyboard Shortcuts</h2>
      <ul>
        <li><strong>Tab</strong> – Navigate through fields and buttons</li>
        <li><strong>Enter</strong> – Activate selected button</li>
        <li><strong>Ctrl + Shift + M</strong> – Toggle dark mode (if implemented)</li>
      </ul>

      <p style={{ marginTop: "2rem" }}>
        Still have questions? Contact our team at <a href="mailto:support@litecho.app">support@litecho.app</a>.
      </p>
    </div>
  );
}

export default Help;
