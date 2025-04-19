// ✅ Final Updated AudioHistory.jsx with ZIP download, rename, download, timestamp
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { RiDeleteBin5Line, RiDownloadLine } from "react-icons/ri";

const AudioHistory = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("text");
  const [editingId, setEditingId] = useState(null);
  const [newFilename, setNewFilename] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const userId = localStorage.getItem("userId");

  const fileTypeLabels = {
    text: "Text to Audio",
    pdf: "PDF to Audio",
    image: "Image to Audio",
  };

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const res = await api.get(`/audio-history/${userId}`);
        const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setAudioFiles(sorted);
      } catch (err) {
        console.error("Failed to fetch audio history", err);
      }
    };

    fetchAudio();
  }, [userId]);

  const handleDelete = async (audioId) => {
    if (!window.confirm("Delete this audio file?")) return;

    try {
      await api.delete("/delete_audio", {
        data: { audio_id: audioId, user_id: userId },
      });
      setAudioFiles((prev) => prev.filter((file) => file.id !== audioId));
      setSelectedFiles((prev) => prev.filter((id) => id !== audioId));
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const handleRename = async (audioId) => {
    if (!newFilename.trim()) return;
    const finalName = newFilename.endsWith(".mp3") ? newFilename : `${newFilename}.mp3`;

    try {
      await api.post("/rename_audio", {
        audio_id: audioId,
        new_filename: finalName,
      });
      setAudioFiles((prev) =>
        prev.map((file) =>
          file.id === audioId ? { ...file, filename: finalName } : file
        )
      );
      setEditingId(null);
      setNewFilename("");
    } catch (error) {
      alert("Rename failed.");
    }
  };

  const handleZipDownload = async () => {
    const filesToDownload = audioFiles
      .filter((file) => selectedFiles.includes(file.id))
      .map((file) => file.filename);

    try {
      const response = await api.post("/download-zip", { filenames: filesToDownload }, {
        responseType: "blob"
      });

      const blob = new Blob([response.data], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "audio_files.zip";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to download ZIP file");
    }
  };

  const toggleSelect = (id) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const filteredFiles = audioFiles.filter((file) => file.type === activeTab);

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <h2>Audio History</h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {Object.entries(fileTypeLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: activeTab === key ? "2px solid #007bff" : "1px solid #ccc",
              backgroundColor: activeTab === key ? "#eaf4ff" : "#f9f9f9",
              color: activeTab === key ? "#007bff" : "#333",
              fontWeight: activeTab === key ? "600" : "500",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {selectedFiles.length > 0 && (
        <button
          onClick={handleZipDownload}
          style={{
            marginBottom: "1rem",
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Download Selected as ZIP
        </button>
      )}

      {filteredFiles.length === 0 ? (
        <p>No {fileTypeLabels[activeTab]} files found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredFiles.map((file) => {
            const formattedDate = new Date(file.created_at).toLocaleString();

            return (
              <li
                key={file.id}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#f7f9fc",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => toggleSelect(file.id)}
                  />
                  {editingId === file.id ? (
                    <input
                      type="text"
                      value={newFilename}
                      onChange={(e) => setNewFilename(e.target.value)}
                      onBlur={() => handleRename(file.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRename(file.id);
                      }}
                      autoFocus
                      style={{
                        padding: "6px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        width: "100%",
                      }}
                    />
                  ) : (
                    <span
                      onDoubleClick={() => {
                        setEditingId(file.id);
                        setNewFilename(file.filename.replace(".mp3", ""));
                      }}
                      style={{ cursor: "pointer", fontWeight: 600, fontSize: "15px" }}
                      title="Double-click to rename"
                    >
                      {file.filename}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: "13px", color: "#555" }}>Created on: {formattedDate}</div>

                <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                  <a
                    href={`http://localhost:5000/static/audio/${file.filename}`}
                    download
                    className="button"
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      borderRadius: "6px",
                      fontSize: "13px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <RiDownloadLine /> Download
                  </a>

                  <RiDeleteBin5Line
                    style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
                    onClick={() => handleDelete(file.id)}
                    title="Delete"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AudioHistory;
