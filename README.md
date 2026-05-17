# 🧠 NovaMind — AI Chatbot

<div align="center">

**A powerful, feature-rich AI chatbot built with React + Spring Boot + Groq AI**

[🚀 Live Demo](#) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

---

## ✨ Features

### 🤖 AI Capabilities
- **Intelligent Conversations** — Powered by Groq's ultra-fast LLaMA models
- **Image Analysis** — Upload up to 4 images and ask questions about them
- **PDF Scanner** — Upload PDF documents and get instant answers
- **Voice to Text** — Speak your questions using Groq Whisper AI

### 💬 Chat Experience
- **Real-time Responses** — Lightning fast answers powered by Groq
- **Markdown Rendering** — Beautiful formatting for code, tables, and lists
- **Syntax Highlighting** — Code blocks with language detection and copy button
- **Chat History** — Save and revisit previous conversations
- **Auto Scroll** — Automatically scrolls to the latest message
- **Thinking Animation** — Bouncing dots while AI is processing

### 🎨 UI/UX
- **Premium Robot Mascot** — Interactive SVG robot that reacts to every action
- **Eyes Follow Cursor** — Robot eyes track your mouse movement
- **Dark/Light Mode** — Midnight Emerald dark + Pure Minimalist Emerald light
- **Mobile Responsive** — Fully optimized for all screen sizes
- **Smooth Animations** — Professional transitions and micro-interactions
- **Welcome Screen** — Suggested questions to get started quickly

### 🔐 Security
- **User Authentication** — Login and Register system
- **Password Validation** — Secure password requirements
- **Session Management** — Persistent login state

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool |
| Axios | HTTP Client |
| ReactMarkdown | Markdown Rendering |
| React Syntax Highlighter | Code Highlighting |
| CSS3 + Inter Font | Styling & Typography |

### Backend
| Technology | Purpose |
|---|---|
| Spring Boot 3.x | REST API Framework |
| Spring WebFlux | WebClient for HTTP calls |
| PDFBox 3.x | PDF text extraction |
| Lombok | Boilerplate reduction |
| Java 21 | Runtime |

### AI & Services
| Service | Purpose |
|---|---|
| Groq API | LLaMA 3.1 for chat |
| Groq Vision | LLaMA 4 Scout for image analysis |
| Groq Whisper | Voice to text transcription |

### Deployment
| Platform | Service |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| GitHub | Source control |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Java 21+
- Maven 3.9+
- Groq API Key — free at [console.groq.com](https://console.groq.com)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/NovaMind.git
cd NovaMind
```

### 2. Setup Backend

```bash
cd AI-Chatbot-backend
```

Create `src/main/resources/application.properties` using the example file:

```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

Fill in your values:

```properties
spring.application.name=NovaMind
server.port=8080

groq.api.key=your_groq_api_key_here
groq.api.url=https://api.groq.com/openai/v1/chat/completions
groq.model=llama-3.1-8b-instant

spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

> ⚠️ Never commit your `application.properties` — it is gitignored by default.

Run the backend:

```bash
./mvnw spring-boot:run
```

Backend starts at `http://localhost:8080`

### 3. Setup Frontend

```bash
cd AI-Chatbot-frontend
npm install
npm run dev
```

Frontend starts at `http://localhost:5173`

---

## 📁 Project Structure

```
NovaMind/
├── AI-Chatbot-backend/
│   ├── src/main/java/com/AI_Chatbot/AI_Chatbot_backend/
│   │   ├── controller/
│   │   │   ├── ChatController.java      # REST endpoints
│   │   │   └── CorsConfig.java          # CORS configuration
│   │   ├── model/
│   │   │   ├── ChatMessage.java         # Message model
│   │   │   ├── ChatRequest.java         # Request model
│   │   │   ├── ChatResponse.java        # Response model
│   │   │   ├── ImageRequest.java        # Image request model
│   │   │   ├── PdfRequest.java          # PDF request model
│   │   │   ├── VoiceRequest.java        # Voice request model
│   │   │   └── VoiceResponse.java       # Voice response model
│   │   └── service/
│   │       └── GroqService.java         # AI integration service
│   ├── Dockerfile                       # Docker config for Render
│   └── pom.xml
│
├── AI-Chatbot-frontend/
│   ├── src/
│   │   ├── App.jsx                      # Main chat component
│   │   ├── App.css                      # Global styles
│   │   ├── Login.jsx                    # Auth component
│   │   ├── Login.css                    # Auth styles
│   │   ├── Robot.jsx                    # SVG robot mascot
│   │   └── Robot.css                    # Robot animations
│   └── package.json
│
└── README.md
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Send a text message |
| `POST` | `/api/chat/image` | Analyze images |
| `POST` | `/api/chat/pdf` | Extract and query PDF |
| `POST` | `/api/chat/voice` | Transcribe voice to text |
| `GET` | `/api/chat/test` | Health check |

---

## 🚢 Deployment

### Backend — Render

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Fill in these settings:

| Field | Value |
|---|---|
| Root Directory | `AI-Chatbot-backend` |
| Runtime | `Docker` |
| Instance Type | Free |

5. Add these environment variables in the Render dashboard:

| Key | Description |
|---|---|
| `GROQ_API_KEY` | Your Groq API key from console.groq.com |
| `GROQ_API_URL` | Groq completions endpoint URL |
| `GROQ_MODEL` | The LLM model name to use |

6. Click **Create Web Service** and wait 3-5 minutes

### Frontend — Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **New Project** and import your repository
3. Fill in these settings:

| Field | Value |
|---|---|
| Root Directory | `AI-Chatbot-frontend` |
| Framework | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

4. Click **Deploy** and wait 2 minutes
5. Update `API_BASE_URL` in `App.jsx` with your Render backend URL

---

## 🤖 Robot Mascot States

| State | Animation | Trigger |
|---|---|---|
| `idle` | Floating up and down | Default |
| `typing` | Excited jumping | User typing |
| `thinking` | Wobbling | Waiting for AI |
| `answer` | Celebrating | AI responded |
| `hover` | Says "Hey there! 👋" | Mouse hover |

---

## 🆓 Cost

**NovaMind is completely free to run!**

| Service | Cost |
|---|---|
| Groq API | Free tier — 500K tokens/day |
| Render | Free tier |
| Vercel | Free tier |
| GitHub | Free |

---

## 🛣️ Roadmap

- [ ] MySQL database for persistent chat history
- [ ] JWT authentication
- [ ] Multiple AI model selection
- [ ] Export chat as PDF
- [ ] Mobile app with React Native

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- [Groq](https://groq.com) — For the blazing fast AI inference
- [React](https://react.dev) — For the amazing UI framework
- [Spring Boot](https://spring.io) — For the robust backend framework
- [PDFBox](https://pdfbox.apache.org) — For PDF processing
- [Vercel](https://vercel.com) — For seamless frontend deployment
- [Render](https://render.com) — For easy backend deployment

---

<div align="center">

**Built with ❤️ using React + Spring Boot + Groq AI**

⭐ If you found this project helpful, please give it a star!

</div>
