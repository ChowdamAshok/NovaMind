<div align="center">

# NovaMind

### Intelligent AI Chatbot Platform

*Powered by Groq · Built with React & Spring Boot · Deployed on Vercel & Render*

[Live Demo](https://novamind-ruddy.vercel.app/) &nbsp;·&nbsp; [Report Bug](../../issues) &nbsp;·&nbsp; [Request Feature](../../issues) &nbsp;·&nbsp; [Documentation](#documentation)

</div>

---

## Overview

NovaMind is a full-stack AI chatbot platform that combines the speed of Groq's inference engine with a polished, responsive user interface. It supports multimodal inputs — text, images, PDFs, and voice — making it one of the most feature-complete open-source chatbot implementations available.

The project is structured as a monorepo with a React frontend and a Spring Boot backend, both fully containerized and deployable on free-tier cloud platforms.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Core AI

| Feature | Description |
|---|---|
| **Text Chat** | Conversational AI powered by LLaMA 3.1 via Groq |
| **Image Analysis** | Upload up to 4 images — ask questions about any of them |
| **PDF Processing** | Extract and query content from any PDF document |
| **Voice Input** | Record audio and transcribe using Groq Whisper |
| **Chat History** | Save, reload, and delete past conversations |
| **Context Memory** | Full conversation history sent with every request |

### User Interface

| Feature | Description |
|---|---|
| **Markdown Rendering** | Full markdown support including tables, lists, and blockquotes |
| **Syntax Highlighting** | 100+ languages with one-click copy |
| **Animated Robot Mascot** | SVG robot with cursor-tracking eyes and state-based animations |
| **Dark / Light Mode** | Midnight Emerald dark theme + Pure Minimalist Emerald light theme |
| **Mobile Responsive** | Slide-out sidebar, adaptive layout across all screen sizes |
| **Real-time Feedback** | Thinking animation, timestamps, error messages |
| **Welcome Screen** | Suggested prompts to help users get started |

### Authentication

| Feature | Description |
|---|---|
| **Register** | Create an account with username and password |
| **Login** | Authenticate with validation and error handling |
| **Session Persistence** | Stay logged in across page reloads |
| **Logout** | Clear session and reset state |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Client                           │
│                   React + Vite (Vercel)                 │
│                                                         │
│   ┌─────────────┐   ┌──────────────┐   ┌────────────┐  │
│   │  Chat UI    │   │  Robot SVG   │   │ Auth Pages │  │
│   │  Markdown   │   │  Animations  │   │ Login/Reg  │  │
│   │  Highlights │   │  Cursor Track│   │ Validation │  │
│   └──────┬──────┘   └──────────────┘   └────────────┘  │
│          │ Axios HTTP                                    │
└──────────┼──────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│                       Backend                           │
│               Spring Boot 3.x (Render)                  │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │              ChatController                     │   │
│   │  /api/chat  /api/chat/image  /api/chat/pdf      │   │
│   │  /api/chat/voice  /api/chat/test                │   │
│   └──────────────────┬──────────────────────────────┘   │
│                      │                                   │
│   ┌──────────────────▼──────────────────────────────┐   │
│   │               GroqService                       │   │
│   │  chat()  chatWithImage()  chatWithPdf()         │   │
│   │  transcribeAudio()                              │   │
│   └──────────────────┬──────────────────────────────┘   │
│                      │ WebClient (HTTPS)                 │
└──────────────────────┼──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    Groq Cloud                           │
│                                                         │
│   LLaMA 3.1 8B Instant   →  Text chat                  │
│   LLaMA 4 Scout 17B      →  Image analysis             │
│   Whisper Large V3       →  Voice transcription        │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 18.x | Component-based UI framework |
| Vite | 5.x | Build tool and dev server |
| Axios | latest | HTTP client for API calls |
| react-markdown | latest | Markdown rendering |
| react-syntax-highlighter | latest | Code block highlighting |
| Inter (Google Fonts) | — | Typography |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Spring Boot | 3.x | REST API framework |
| Spring WebFlux | 7.x | Non-blocking HTTP client |
| Apache PDFBox | 3.0.1 | PDF text extraction |
| Lombok | latest | Boilerplate reduction |
| Java | 21 | Runtime environment |
| Maven | 3.9.x | Build and dependency management |

### AI Models (Groq)

| Model | Purpose | Context |
|---|---|---|
| `llama-3.1-8b-instant` | Text conversation | 128K tokens |
| `meta-llama/llama-4-scout-17b-16e-instruct` | Image analysis | Multimodal |
| `whisper-large-v3` | Voice transcription | Audio |

### Infrastructure

| Platform | Purpose | Cost |
|---|---|---|
| Vercel | Frontend hosting + CDN | Free |
| Render | Backend hosting (Docker) | Free |
| GitHub | Source control + CI trigger | Free |

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

```
Node.js    >= 18.0.0
Java       >= 21.0.0
Maven      >= 3.9.0
Git        >= 2.x
```

You will also need a free Groq API key from [console.groq.com](https://console.groq.com).

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/NovaMind.git
cd NovaMind
```

---

### 2. Configure the Backend

```bash
cd AI-Chatbot-backend
```

Copy the example configuration file:

```bash
# Linux / macOS
cp src/main/resources/application.properties.example \
   src/main/resources/application.properties

# Windows
copy src\main\resources\application.properties.example ^
     src\main\resources\application.properties
```

Open `application.properties` and fill in your values. See [Environment Variables](#environment-variables) for the full list.

> **Important:** `application.properties` is listed in `.gitignore` and will never be committed. Never hardcode secrets in source files.

Start the backend:

```bash
./mvnw spring-boot:run
```

The API is now available at `http://localhost:8080`.

Verify with:

```bash
curl http://localhost:8080/api/chat/test
# → NovaMind backend is working!
```

---

### 3. Configure the Frontend

```bash
cd ../AI-Chatbot-frontend
npm install
```

Open `src/App.jsx` and set the API base URL:

```js
// For local development
const API_BASE_URL = "http://localhost:8080";

// For production (replace with your Render URL)
const API_BASE_URL = "https://your-service.onrender.com";
```

Start the frontend:

```bash
npm run dev
```

The app is now available at `http://localhost:5173`.

---

## Environment Variables

### Backend — `application.properties`

| Property | Required | Description |
|---|---|---|
| `groq.api.key` | ✅ Yes | API key from [console.groq.com](https://console.groq.com) |
| `groq.api.url` | ✅ Yes | Groq completions endpoint |
| `groq.model` | ✅ Yes | Default model for text chat |
| `server.port` | No | Server port (default: `8080`) |
| `spring.servlet.multipart.max-file-size` | No | Max upload size (default: `10MB`) |


## API Reference

Base URL: `https://your-backend.onrender.com`

---

### `POST /api/chat`

Send a text message and receive an AI response.

**Request body:**
```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ]
}
```

**Response:**
```json
{
  "reply": "Hello! How can I help you today?"
}
```

---

### `POST /api/chat/image`

Analyze one or more images with an optional question.

**Request body:**
```json
{
  "base64Images": ["<base64_string>", "<base64_string>"],
  "imageTypes": ["image/jpeg", "image/png"],
  "question": "What is in these images?"
}
```

**Response:**
```json
{
  "reply": "The first image shows..."
}
```

---

### `POST /api/chat/pdf`

Extract text from a PDF and answer questions about it.

**Request body:**
```json
{
  "base64Pdf": "<base64_string>",
  "question": "Summarize this document."
}
```

**Response:**
```json
{
  "reply": "This document covers..."
}
```

---

### `POST /api/chat/voice`

Transcribe audio to text using Whisper.

**Request body:**
```json
{
  "base64Audio": "<base64_string>",
  "mimeType": "audio/webm"
}
```

**Response:**
```json
{
  "transcript": "What is the capital of France?"
}
```

---

### `GET /api/chat/test`

Health check endpoint.

**Response:**
```
NovaMind backend is working!
```

---

## Deployment

### Backend on Render

1. Sign in to [render.com](https://render.com) with your GitHub account
2. Click **New +** → **Web Service**
3. Select your GitHub repository
4. Configure the service:

```
Name:            novamind-backend
Region:          Singapore (or nearest to you)
Branch:          main
Root Directory:  AI-Chatbot-backend
Runtime:         Docker
Instance Type:   Free
```

5. Under **Environment**, add the keys listed in [Environment Variables](#environment-variables)
6. Click **Create Web Service**

Build time is approximately 3–5 minutes. Once live, copy the service URL (e.g. `https://novamind-backend.onrender.com`) and update `API_BASE_URL` in the frontend.

> **Note:** Free tier Render services spin down after 15 minutes of inactivity. The first request after a cold start may take 30–60 seconds.

---

### Frontend on Vercel

1. Sign in to [vercel.com](https://vercel.com) with your GitHub account
2. Click **New Project** and import your repository
3. Configure the project:

```
Root Directory:   AI-Chatbot-frontend
Framework:        Vite
Build Command:    npm run build
Output Directory: dist
```

4. Click **Deploy**

Vercel automatically redeploys on every push to `main`.

---

## Project Structure

```
NovaMind/
│
├── AI-Chatbot-backend/                  # Spring Boot application
│   ├── src/
│   │   └── main/
│   │       ├── java/com/AI_Chatbot/AI_Chatbot_backend/
│   │       │   ├── controller/
│   │       │   │   ├── ChatController.java     # REST API endpoints
│   │       │   │   └── CorsConfig.java         # CORS configuration
│   │       │   ├── model/
│   │       │   │   ├── ChatMessage.java
│   │       │   │   ├── ChatRequest.java
│   │       │   │   ├── ChatResponse.java
│   │       │   │   ├── ImageRequest.java
│   │       │   │   ├── PdfRequest.java
│   │       │   │   ├── VoiceRequest.java
│   │       │   │   └── VoiceResponse.java
│   │       │   └── service/
│   │       │       └── GroqService.java        # AI integration layer
│   │       └── resources/
│   │           ├── application.properties          # ← gitignored
│   │           └── application.properties.example  # ← committed template
│   ├── Dockerfile
│   ├── .dockerignore
│   └── pom.xml
│
├── AI-Chatbot-frontend/                 # React application
│   ├── src/
│   │   ├── App.jsx                      # Root component + chat logic
│   │   ├── App.css                      # Global design system
│   │   ├── Login.jsx                    # Authentication screens
│   │   ├── Login.css
│   │   ├── Robot.jsx                    # Animated SVG mascot
│   │   ├── Robot.css                    # Mascot animations
│   │   └── main.jsx                     # React entry point
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## Robot Mascot

The NovaMind mascot is a fully custom SVG robot rendered entirely in the browser — no images or external assets required.

| State | Behavior | Trigger |
|---|---|---|
| `idle` | Gentle floating loop | App load / after response |
| `typing` | Excited jumping, arms flailing | User is typing |
| `thinking` | Slow wobble, eyes shift amber | Waiting for API response |
| `answer` | Celebration jump, arm wave | Response received |
| `hover` | Speech bubble appears | Cursor over robot |

Additional behaviors:
- Eyes track the cursor in real time using trigonometry
- Automatic blinking every 3 seconds
- Antenna pulses with a glow effect
- Chest panel has animated RGB status lights
- Mouth expression changes per state

---

## Cost Breakdown

NovaMind is designed to run at zero cost using free tiers.

| Service | Free Tier Limits | Suitable For |
|---|---|---|
| Groq API | ~500K tokens/day | Personal + small team use |
| Render | 750 hrs/month, 512MB RAM | Single backend service |
| Vercel | 100GB bandwidth/month | Frontend hosting |
| GitHub | Unlimited public repos | Source control |

**Total monthly cost: $0**

---

## Roadmap

The following features are planned for future releases:

- [ ] Persistent chat storage with MySQL / PostgreSQL
- [ ] JWT-based authentication with refresh tokens
- [ ] Selectable AI models from the UI
- [ ] Streaming responses (token-by-token output)
- [ ] Export conversation as PDF or Markdown
- [ ] Multi-language support (i18n)
- [ ] React Native mobile application

---

## Contributing

Contributions of any kind are welcome. To contribute:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes with a clear message

```bash
git commit -m "feat: add streaming response support"
```

4. Push and open a pull request

```bash
git push origin feature/your-feature-name
```

Please follow the existing code style and include relevant comments where appropriate.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for full details.

---

## Acknowledgements

This project builds on the following open-source projects and services:

- [Groq](https://groq.com) — Ultra-fast LLM inference
- [React](https://react.dev) — UI component framework
- [Spring Boot](https://spring.io/projects/spring-boot) — Java backend framework
- [Apache PDFBox](https://pdfbox.apache.org) — PDF processing library
- [Vite](https://vitejs.dev) — Frontend build tool
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown renderer
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) — Code highlighting
- [Vercel](https://vercel.com) — Frontend deployment
- [Render](https://render.com) — Backend deployment

---

<div align="center">

Built with React · Spring Boot · Groq AI

If this project was useful to you, consider giving it a ⭐

</div>
