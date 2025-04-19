import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h1>About LitEcho</h1>
      <p>
        <strong>LitEcho</strong> is an inclusive audio conversion platform designed to empower all users —
        especially those with visual impairments. Our mission is to make information more accessible
        by transforming written content into spoken words.
      </p>

      <h2>✨ Accessibility First</h2>
      <p>
        LitEcho was built with accessibility in mind. It supports screen readers, keyboard navigation, and
        includes special themes like <strong>Dark Mode</strong> and <strong>Color-Blind Mode</strong> for a more personalized experience.
      </p>

      <h2>🎧 What Can You Do with LitEcho?</h2>
      <ul>
        <li><strong>Text to Audio:</strong> Paste or type any text and convert it to voice.</li>
        <li><strong>PDF to Audio:</strong> Upload any PDF document and let LitEcho read it aloud.</li>
        <li><strong>Image to Audio:</strong> Upload images with text (like scanned documents) — LitEcho extracts the text and speaks it.</li>
        <li><strong>Multi-language & Voices:</strong> Choose from different languages and voice types to suit your preference.</li>
      </ul>

      <h2>🌍 Why LitEcho?</h2>
      <p>
        Whether you're visually impaired, multitasking, or simply prefer listening, LitEcho helps you stay informed effortlessly.
        It’s perfect for students, professionals, and anyone who values auditory learning.
      </p>
    </div>
  );
}

export default About;
