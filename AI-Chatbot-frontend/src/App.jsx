import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Login from "./Login";
import Robot from "./Robot";

const API_BASE_URL = "https://novamind-backend.onrender.com";

const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{language || "code"}</span>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "javascript"}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: "0 0 10px 10px",
          fontSize: "13px",
          padding: "16px",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

const suggestions = [
  "✨ What can you help me with?",
  "💡 Give me a Python code example",
  "🌍 Tell me an interesting fact",
  "🚀 Explain AI in simple words",
];

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant named NovaMind." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageTypes, setImageTypes] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [robotState, setRobotState] = useState("idle");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const newChat = () => {
    if (messages.length > 1) {
      const title =
        messages.find((m) => m.role === "user")?.content.slice(0, 30) ||
        "New Chat";
      const newChatObj = {
        id: crypto.randomUUID(),
        title: title,
        messages: messages,
      };
      setChats([newChatObj, ...chats]);
    }
    setMessages([
      {
        role: "system",
        content: "You are a helpful assistant named NovaMind.",
      },
    ]);
    setInput("");
    setActiveChatId(null);
    setIsSidebarOpen(false);
    setRobotState("idle");
    removeImage();
    removePdf();
  };

  const loadChat = (chat) => {
    setMessages(chat.messages);
    setActiveChatId(chat.id);
    setIsSidebarOpen(false);
  };

  const deleteChat = (id) => {
    setChats(chats.filter((c) => c.id !== id));
    if (activeChatId === id) {
      setMessages([
        {
          role: "system",
          content: "You are a helpful assistant named NovaMind.",
        },
      ]);
      setActiveChatId(null);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const allowed = files.slice(0, 4 - selectedImages.length);
    allowed.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        setSelectedImages((prev) => [...prev, base64]);
        setImagePreviews((prev) => [...prev, reader.result]);
        setImageTypes((prev) => [...prev, file.type]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    if (index === undefined) {
      setSelectedImages([]);
      setImagePreviews([]);
      setImageTypes([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
      setImageTypes((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handlePdfSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setSelectedPdf(base64);
      setPdfName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const removePdf = () => {
    setSelectedPdf(null);
    setPdfName(null);
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };

  const startVoice = async () => {
    if (isListening) {
      mediaRecorderRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Audio = reader.result.split(",")[1];
          try {
            setLoading(true);
            const response = await axios.post(
              `${API_BASE_URL}/api/chat/voice`,
              {
                base64Audio: base64Audio,
                mimeType: "audio/webm",
              },
            );
            const transcript = response.data.transcript;
            if (transcript) {
              setInput(transcript);
            }
          } catch (error) {
            console.error("Voice error:", error);
          } finally {
            setLoading(false);
          }
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (error) {
      console.error("Mic error:", error);
      alert("Could not access microphone. Please allow mic permission!");
    }
  };

  const sendMessage = async (text) => {
    const msgText = text || input;
    if (!msgText.trim() && selectedImages.length === 0 && !selectedPdf) return;

    const userMessage = {
      role: "user",
      content:
        msgText ||
        (selectedPdf ? "Summarize this PDF" : "What is in these images?"),
      time: getTime(),
      images: imagePreviews.length > 0 ? [...imagePreviews] : null,
      pdfName: pdfName || null,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setRobotState("thinking");
    setLoading(true);

    try {
      let response;

      if (selectedPdf) {
        response = await axios.post(`${API_BASE_URL}/api/chat/pdf`, {
          base64Pdf: selectedPdf,
          question: msgText || "Summarize this PDF document.",
        });
        removePdf();
      } else if (selectedImages.length > 0) {
        response = await axios.post(`${API_BASE_URL}/api/chat/image`, {
          base64Images: selectedImages,
          imageTypes: imageTypes,
          question:
            msgText || "What is in these images? Describe each in detail.",
        });
        removeImage();
      } else {
        response = await axios.post(`${API_BASE_URL}/api/chat`, {
          messages: updatedMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        });
      }

      const aiMessage = {
        role: "assistant",
        content: response.data.reply,
        time: getTime(),
      };
      setMessages([...updatedMessages, aiMessage]);
      setRobotState("answer");
      setTimeout(() => setRobotState("idle"), 3000);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: "⚠️ Sorry something went wrong. Please try again in a moment!",
        time: getTime(),
      };
      setMessages([...updatedMessages, errorMessage]);
      setRobotState("idle");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMessages([
      {
        role: "system",
        content: "You are a helpful assistant named NovaMind.",
      },
    ]);
    setChats([]);
    setInput("");
    setActiveChatId(null);
    setRobotState("idle");
    removeImage();
    removePdf();
  };

  const hasMessages = messages.filter((m) => m.role !== "system").length > 0;

  // filtered messages for rendering
  const visibleMessages = messages.filter((m) => m.role !== "system");

  if (!user) {
    return <Login onLogin={(username) => setUser(username)} />;
  }

  return (
    <div className={`layout ${theme} ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* MOBILE MENU BUTTON */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>🧠 NovaMind</h2>
          <button className="new-chat-btn" onClick={newChat}>
            + New Chat
          </button>
        </div>
        <div className="chat-list">
          {chats.length === 0 && <p className="no-chats">No saved chats yet</p>}
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChatId === chat.id ? "active" : ""}`}
              onClick={() => loadChat(chat)}
            >
              <span className="chat-title">💬 {chat.title}...</span>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CHAT */}
      <div className="app">
        {/* HEADER */}
        <div className="header">
          <div>
            <h1>🧠 NovaMind</h1>
            <p>Your intelligent AI assistant</p>
          </div>
          <div className="header-right">
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
            <span className="welcome-user">👤 {user}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="chat-box">
          {/* WELCOME SCREEN — robot in center */}
          {!hasMessages && (
            <div className="welcome">
              <Robot state={robotState} />
              <h2>Welcome, {user}! 👋</h2>
              <p>Your intelligent AI assistant. Ask me anything!</p>
              <div className="suggestions">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="suggestion-btn"
                    onClick={() => sendMessage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {visibleMessages.map((m, i) => {
            const isLastAssistant =
              m.role === "assistant" && i === visibleMessages.length - 1;

            return (
              <div key={i} className={`message ${m.role}`}>
                <div className="message-meta">
                  <span className="label">
                    {m.role === "user" ? `👤 ${user}` : "🧠 NovaMind"}
                  </span>
                  {m.time && <span className="time">{m.time}</span>}
                </div>

                {/* Show multiple images */}
                {m.images && m.images.length > 0 && (
                  <div className="chat-images">
                    {m.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`uploaded-${idx}`}
                        className="chat-image"
                      />
                    ))}
                  </div>
                )}

                {/* Show PDF badge */}
                {m.pdfName && <div className="pdf-badge">📄 {m.pdfName}</div>}

                <div className="bubble">
                  <ReactMarkdown
                    components={{
                      // Fix p tag nesting issue
                      p({ children }) {
                        return <div className="md-p">{children}</div>;
                      },
                      code({ inline, className, children, ...props }) {
                        const language = className?.replace("language-", "");
                        return !inline ? (
                          <CodeBlock language={language}>
                            {String(children).replace(/\n$/, "")}
                          </CodeBlock>
                        ) : (
                          <code className="inline-code" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>

                {/* Robot appears next to last AI answer */}
                {isLastAssistant && (
                  <div className="robot-answer-pos">
                    <Robot state={robotState} />
                  </div>
                )}
              </div>
            );
          })}

          {/* THINKING ANIMATION */}
          {loading && (
            <div className="message assistant">
              <div className="message-meta">
                <span className="label">🧠 NovaMind</span>
              </div>
              <div className="bubble thinking">
                <span></span>
                <span></span>
                <span></span>
              </div>
              {/* Robot spins while thinking */}
              <div className="robot-answer-pos">
                <Robot state="thinking" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT AREA */}
        <div className="input-area">
          {/* Multiple image previews */}
          {imagePreviews.length > 0 && (
            <div className="image-previews-row">
              {imagePreviews.map((preview, idx) => (
                <div key={idx} className="image-preview-container">
                  <img src={preview} alt="preview" className="image-preview" />
                  <button
                    className="remove-image-btn"
                    onClick={() => removeImage(idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {imagePreviews.length < 4 && (
                <div
                  className="add-more-images"
                  onClick={() => fileInputRef.current.click()}
                >
                  + Add
                </div>
              )}
            </div>
          )}

          {/* PDF preview */}
          {pdfName && (
            <div className="pdf-preview">
              <span>📄 {pdfName}</span>
              <button className="remove-image-btn" onClick={removePdf}>
                ✕
              </button>
            </div>
          )}

          {/* Voice recording indicator */}
          {isListening && (
            <div className="voice-indicator">
              <span className="voice-dot"></span>
              <span>Listening... Click ⏹️ to stop</span>
            </div>
          )}

          <div className="input-row">
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />
            <input
              type="file"
              accept="application/pdf"
              ref={pdfInputRef}
              onChange={handlePdfSelect}
              style={{ display: "none" }}
            />

            <button
              className="attach-btn"
              onClick={() => fileInputRef.current.click()}
              title="Upload Images"
            >
              📸
            </button>

            <button
              className="attach-btn"
              onClick={() => pdfInputRef.current.click()}
              title="Upload PDF"
            >
              📄
            </button>

            <textarea
              ref={textareaRef}
              rows={1}
              placeholder={
                selectedPdf
                  ? `Ask about ${pdfName}...`
                  : selectedImages.length > 0
                    ? `Ask about ${selectedImages.length} image(s)...`
                    : "Ask NovaMind anything..."
              }
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.length > 0) {
                  setRobotState("typing");
                } else {
                  setRobotState("idle");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <button
              className={`attach-btn ${isListening ? "listening" : ""}`}
              onClick={startVoice}
              title={isListening ? "Click to stop" : "Voice Input"}
            >
              {isListening ? "⏹️" : "🎤"}
            </button>

            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>
        <p className="input-hint">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

export default App;
