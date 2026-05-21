import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResume,
  uploadResume,
  updateResume,
  deleteResume,
  clearResumeMessages,
} from "../redux/resume/resumeSlice";

// ── Inline styles (no extra CSS file needed) ──────────────────────────────────
const styles = {
  wrapper: {
    fontFamily: "'DM Sans', sans-serif",
    maxWidth: 600,
    margin: "0 auto",
    padding: "2rem 1.5rem",
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: "2rem",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  },
  heading: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "0.25rem",
  },
  subtext: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "1.5rem",
  },
  dropzone: (dragging) => ({
    border: `2px dashed ${dragging ? "#6366f1" : "#d1d5db"}`,
    borderRadius: 12,
    padding: "2rem 1rem",
    textAlign: "center",
    background: dragging ? "#eef2ff" : "#f9fafb",
    cursor: "pointer",
    transition: "all 0.2s",
    outline: "none",
  }),
  dropIcon: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  dropText: {
    fontSize: "0.9rem",
    color: "#374151",
    fontWeight: 500,
  },
  dropHint: {
    fontSize: "0.78rem",
    color: "#9ca3af",
    marginTop: "0.25rem",
  },
  selectedFile: {
    marginTop: "1rem",
    padding: "0.75rem 1rem",
    background: "#f3f4f6",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.875rem",
    color: "#374151",
  },
  fileName: {
    flex: 1,
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  btnPrimary: (disabled) => ({
    marginTop: "1.25rem",
    width: "100%",
    padding: "0.75rem",
    background: disabled ? "#a5b4fc" : "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  }),
  divider: {
    border: "none",
    borderTop: "1px solid #f3f4f6",
    margin: "1.75rem 0",
  },
  resumeCard: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 12,
  },
  resumeIcon: {
    width: 44,
    height: 44,
    background: "#dcfce7",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    flexShrink: 0,
  },
  resumeMeta: {
    flex: 1,
    overflow: "hidden",
  },
  resumeName: {
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#166534",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  resumeSub: {
    fontSize: "0.78rem",
    color: "#4ade80",
    marginTop: 2,
  },
  actionRow: {
    display: "flex",
    gap: "0.6rem",
    marginTop: "1rem",
    flexWrap: "wrap",
  },
  btnView: {
    flex: 1,
    padding: "0.6rem 1rem",
    background: "#eff6ff",
    color: "#2563eb",
    border: "1px solid #bfdbfe",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.85rem",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
  },
  btnUpdate: {
    flex: 1,
    padding: "0.6rem 1rem",
    background: "#fffbeb",
    color: "#92400e",
    border: "1px solid #fde68a",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.85rem",
    cursor: "pointer",
  },
  btnDelete: (loading) => ({
    flex: 1,
    padding: "0.6rem 1rem",
    background: loading ? "#fee2e2" : "#fff1f2",
    color: "#be123c",
    border: "1px solid #fecdd3",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.85rem",
    cursor: loading ? "not-allowed" : "pointer",
  }),
  alert: (type) => ({
    padding: "0.75rem 1rem",
    borderRadius: 8,
    fontSize: "0.875rem",
    fontWeight: 500,
    marginTop: "1rem",
    background: type === "error" ? "#fff1f2" : "#f0fdf4",
    color: type === "error" ? "#be123c" : "#166534",
    border: `1px solid ${type === "error" ? "#fecdd3" : "#bbf7d0"}`,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }),
  spinner: {
    width: 16,
    height: 16,
    border: "2px solid rgba(255,255,255,0.4)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    display: "inline-block",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function ResumeManager() {
  const dispatch = useDispatch();
  const { resumeUrl, resumeName, hasResume, loading, actionLoading, error, successMsg } =
    useSelector((state) => state.resume);

  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [mode, setMode] = useState("idle"); // "idle" | "update"
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileInputRef = useRef(null);

  // ── Fetch on mount ──
  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);

  // ── Auto-clear messages ──
  useEffect(() => {
    if (error || successMsg) {
      const t = setTimeout(() => dispatch(clearResumeMessages()), 4000);
      return () => clearTimeout(t);
    }
  }, [error, successMsg, dispatch]);

  // ── File selection ──
  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5 MB.");
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  // ── Submit (upload or update) ──
  const handleSubmit = () => {
    if (!selectedFile) return;
    if (mode === "update") {
      dispatch(updateResume(selectedFile)).then((res) => {
        if (!res.error) {
          setSelectedFile(null);
          setMode("idle");
        }
      });
    } else {
      dispatch(uploadResume(selectedFile)).then((res) => {
        if (!res.error) setSelectedFile(null);
      });
    }
  };

  // ── Delete ──
  const handleDelete = () => {
    dispatch(deleteResume()).then(() => {
      setConfirmDelete(false);
      setMode("idle");
      setSelectedFile(null);
    });
  };

  // ── Cancel update mode ──
  const cancelUpdate = () => {
    setMode("idle");
    setSelectedFile(null);
  };

  if (loading) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <p style={{ color: "#9ca3af", textAlign: "center" }}>Loading resume info…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      {/* Spinner keyframes */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={styles.card}>
        <h2 style={styles.heading}>📄 My Resume</h2>
        <p style={styles.subtext}>Upload your resume in PDF format (max 5 MB)</p>

        {/* ── EXISTING RESUME CARD ── */}
        {hasResume && mode !== "update" && (
          <>
            <div style={styles.resumeCard}>
              <div style={styles.resumeIcon}>📑</div>
              <div style={styles.resumeMeta}>
                <div style={styles.resumeName}>{resumeName || "Resume.pdf"}</div>
                <div style={styles.resumeSub}>✓ Uploaded to Cloudinary</div>
              </div>
            </div>

            <div style={styles.actionRow}>
              {/* View via Google Docs PDF viewer */}
              <a
                href={`https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=false`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.btnView}
              >
                👁 View
              </a>
              {/* Direct download */}
              <a
                href={resumeUrl}
                download
                style={{ ...styles.btnView, background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" }}
              >
                ⬇ Download
              </a>

              {/* Replace */}
              <button style={styles.btnUpdate} onClick={() => setMode("update")}>
                🔄 Replace
              </button>

              {/* Delete */}
              {confirmDelete ? (
                <>
                  <button
                    style={styles.btnDelete(actionLoading)}
                    disabled={actionLoading}
                    onClick={handleDelete}
                  >
                    {actionLoading ? <span style={styles.spinner} /> : "Confirm ✓"}
                  </button>
                  <button
                    style={{ ...styles.btnUpdate, flex: 0.5 }}
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button style={styles.btnDelete(false)} onClick={() => setConfirmDelete(true)}>
                  🗑 Delete
                </button>
              )}
            </div>

            <hr style={styles.divider} />
          </>
        )}

        {/* ── UPDATE MODE HEADER ── */}
        {mode === "update" && (
          <div
            style={{
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 8,
              padding: "0.65rem 1rem",
              fontSize: "0.875rem",
              color: "#92400e",
              marginBottom: "1rem",
              fontWeight: 500,
            }}
          >
            ⚠️ Replacing resume will permanently delete the current one from Cloudinary.
          </div>
        )}

        {/* ── UPLOAD DROPZONE ── shown when no resume OR in update mode ── */}
        {(!hasResume || mode === "update") && (
          <>
            <div
              style={styles.dropzone(dragging)}
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current.click()}
            >
              <div style={styles.dropIcon}>☁️</div>
              <div style={styles.dropText}>
                {dragging ? "Drop your PDF here" : "Click or drag & drop your PDF"}
              </div>
              <div style={styles.dropHint}>PDF only · Max 5 MB</div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
            </div>

            {selectedFile && (
              <div style={styles.selectedFile}>
                <span>📄</span>
                <span style={styles.fileName}>{selectedFile.name}</span>
                <span style={{ color: "#6b7280", fontSize: "0.78rem" }}>
                  {(selectedFile.size / 1024).toFixed(0)} KB
                </span>
                <button
                  onClick={() => setSelectedFile(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "1rem" }}
                >
                  ✕
                </button>
              </div>
            )}

            <button
              style={styles.btnPrimary(!selectedFile || actionLoading)}
              disabled={!selectedFile || actionLoading}
              onClick={handleSubmit}
            >
              {actionLoading ? (
                <><span style={styles.spinner} /> {mode === "update" ? "Replacing…" : "Uploading…"}</>
              ) : (
                mode === "update" ? "🔄 Replace Resume" : "⬆ Upload Resume"
              )}
            </button>

            {mode === "update" && (
              <button
                onClick={cancelUpdate}
                style={{
                  marginTop: "0.6rem",
                  width: "100%",
                  padding: "0.6rem",
                  background: "none",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  cursor: "pointer",
                  color: "#6b7280",
                  fontSize: "0.875rem",
                }}
              >
                Cancel
              </button>
            )}
          </>
        )}

        {/* ── FEEDBACK MESSAGES ── */}
        {successMsg && (
          <div style={styles.alert("success")}>
            <span>✅</span> {successMsg}
          </div>
        )}
        {error && (
          <div style={styles.alert("error")}>
            <span>❌</span> {error}
          </div>
        )}
      </div>
    </div>
  );
}