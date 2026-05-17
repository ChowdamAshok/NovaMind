# NovaMind

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-00ff87?style=for-the-badge)](https://novamind-ruddy.vercel.app/)
[![Portfolio](https://img.shields.io/badge/👨‍💻_Portfolio-Visit-111827?style=for-the-badge)](https://chowdamashok.github.io/My-Portfolio/)

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Groq AI](https://img.shields.io/badge/Groq_AI-000000?style=for-the-badge)

**A modern AI chatbot platform powered by Groq AI.**  
Chat with AI, analyze images, upload PDFs, transcribe voice, and manage conversations through a fast, responsive interface.

</div>

---

# 🖼️ Overview

NovaMind is a full-stack AI chatbot platform built using React, Spring Boot, and Groq AI APIs. It supports multimodal interactions including text chat, image understanding, PDF analysis, and voice transcription.

The platform features a polished modern UI, animated robot mascot, markdown rendering, syntax highlighting, chat history, and responsive design optimized for desktop and mobile devices.

---

# ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Chat** | Fast conversational AI powered by LLaMA 3.1 via Groq |
| 🖼️ **Image Analysis** | Upload multiple images and ask AI questions about them |
| 📄 **PDF Processing** | Extract and summarize content from PDF documents |
| 🎤 **Voice Transcription** | Record audio and convert speech to text using Whisper |
| 🧠 **Context Memory** | Maintains full conversation history for better responses |
| 💬 **Chat History** | Save, reload, and delete previous conversations |
| ✨ **Markdown Support** | Render tables, lists, code blocks, and formatting |
| 💻 **Syntax Highlighting** | Highlight code snippets in 100+ programming languages |
| 🤖 **Animated Robot Mascot** | Interactive SVG robot with cursor tracking and animations |
| 🌙 **Dark & Light Themes** | Midnight Emerald dark mode and clean light theme |
| 📱 **Responsive Design** | Mobile-friendly adaptive layout and sidebar |
| 🔐 **Authentication** | User registration, login, and session persistence |

---

# 🛠️ Tech Stack

## Frontend

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=flat&logo=markdown&logoColor=white)

## Backend

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white)
![Spring WebFlux](https://img.shields.io/badge/WebFlux-6DB33F?style=flat)
![Java](https://img.shields.io/badge/Java-21-orange?style=flat&logo=openjdk&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=flat&logo=apachemaven&logoColor=white)

## Deployment

![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)

## AI Models (Groq)

| Model | Purpose |
|---|---|
| LLaMA 3.1 8B Instant | Conversational AI |
| LLaMA 4 Scout 17B | Image understanding |
| Whisper Large V3 | Voice transcription |

---

# 📁 Project Structure

```text
NovaMind/
│
├── AI-Chatbot-backend/                 # Spring Boot Backend
│   └── src/main/java/com/AI_Chatbot/
│       ├── controller/
│       │   ├── ChatController.java
│       │   └── CorsConfig.java
│       │
│       ├── model/
│       │   ├── ChatRequest.java
│       │   ├── ChatResponse.java
│       │   ├── ImageRequest.java
│       │   ├── PdfRequest.java
│       │   └── VoiceRequest.java
│       │
│       └── service/
│           └── GroqService.java
│
├── AI-Chatbot-frontend/                # React Frontend
│   └── src/
│       ├── App.jsx
│       ├── Login.jsx
│       ├── Robot.jsx
│       ├── App.css
│       ├── Robot.css
│       └── main.jsx
│
└── README.md
```

---

# 🚀 Run Locally

## Prerequisites

- Java 21+
- Node.js 18+
- Maven 3.9+
- Git

---

## Backend

```bash
git clone https://github.com/ChowdamAshok/NovaMind.git
cd NovaMind/AI-Chatbot-backend

./mvnw spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## Frontend

```bash
cd NovaMind/AI-Chatbot-frontend

npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🌐 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://novamind-ruddy.vercel.app/ |
| Backend | Render | https://novamind-yo7s.onrender.com |
| Portfolio | GitHub Pages | https://chowdamashok.github.io/My-Portfolio/ |

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/chat` | AI text chat |
| POST | `/api/chat/image` | Image analysis |
| POST | `/api/chat/pdf` | PDF summarization & Q/A |
| POST | `/api/chat/voice` | Voice transcription |
| GET | `/api/chat/test` | Health check |

---

# 🤖 Robot Mascot

NovaMind includes a fully custom SVG robot assistant with:

- Cursor-tracking eyes
- Animated blinking
- State-based reactions
- Floating animations
- Dynamic mouth expressions
- Thinking and celebration effects

Robot states include:

- `idle`
- `typing`
- `thinking`
- `answer`
- `hover`

---

# 📸 Main Features

- **Chat Interface** — AI messaging with markdown support
- **Image Upload** — Analyze images using multimodal AI
- **PDF Chat** — Ask questions about uploaded PDFs
- **Voice Input** — Convert speech into text instantly
- **Conversation History** — Save and restore chats
- **Responsive UI** — Optimized for mobile and desktop
- **Theme Support** — Dark and light modes

---

# 🛣️ Roadmap

- JWT Authentication
- Streaming AI responses
- Database chat persistence
- Multiple AI model selection
- Export chats as PDF/Markdown
- Multi-language support
- React Native mobile app

---

# 👨‍💻 Developer

<div align="center">

## Chowdam Ashok

[![GitHub](https://img.shields.io/badge/GitHub-ChowdamAshok-181717?style=for-the-badge&logo=github)](https://github.com/ChowdamAshok)

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit_Now-00C896?style=for-the-badge)](https://chowdamashok.github.io/My-Portfolio/)

</div>

---

# 🙏 Acknowledgements

Special thanks to:

- Groq AI
- React
- Spring Boot
- Vercel
- Render

---

<div align="center">

Built with ❤️ using React, Spring Boot, and Groq AI

⭐ Star this repository if you found it useful!

</div>
