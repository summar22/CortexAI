# 🧠 CortexAI — Complete Interview Preparation Handbook
### From Absolute Zero to Interview-Ready

---

> [!IMPORTANT]
> This handbook is built from your **exact project code**. Every explanation uses **real examples** from your files. Read it like a story — front to back — and by the end, you'll be able to answer anything an interviewer throws at you.

---

# PART 1 — PROJECT OVERVIEW

## 1.1 What Problem Does CortexAI Solve?

**The real problem:** When someone needs AI help, they open ChatGPT for chat, a different tool for image generation, another one for PDF reading, and yet another for coding. It is fragmented and inconvenient.

**What CortexAI does:** It is a **single, unified AI platform** that bundles multiple specialized AI agents into one beautiful chat interface. A user types a question and the system automatically decides which AI agent should answer — whether it needs web search, code generation, PDF reading, image creation, or PowerPoint generation.

**Think of it like this:**  
Imagine a super-smart secretary. You tell the secretary "Summarize this PDF", "Write me a React component", "What happened in the news today", or "Generate an image of a sunset". The secretary (CortexAI) reads your request, picks the right expert, and delivers the answer — all through one chat window.

---

## 1.2 Real-World Use Case

| User Goal | CortexAI Agent Used |
|---|---|
| "Explain machine learning" | Chat Agent (Groq/LLaMA) |
| "What's in the news today?" | Search Agent (Tavily) → Chat Agent |
| "Build me a landing page" | Coding Agent (DeepSeek) |
| "Summarize this PDF file" | PDF RAG Agent (Qdrant + Gemini) |
| "Create a PowerPoint presentation" | PPT Agent |
| "Generate an image of mountains" | Vision Agent (Pollinations.ai) |
| "Analyze what's in this image" | Image Analyzer Agent (Gemini) |

**Target users:** Students, developers, content creators, researchers — anyone who wants AI without switching between 5 different tools.

---

## 1.3 Your 2-Minute Interview Introduction 🎤

> *"CortexAI is a full-stack AI platform I built that works like ChatGPT, but smarter — because it has multiple specialized AI agents under one roof.*
>
> *The main idea is: instead of the user choosing which AI to use, the system automatically routes the request to the right agent. So if you ask a general question, it goes to the Chat Agent. If you ask about recent news, it uses the Search Agent with Tavily. If you ask for code, it goes to a Coding Agent powered by DeepSeek. If you upload a PDF, it reads it using RAG with a vector database. If you want an image, it generates one and stores it in AWS S3.*
>
> *The backend is built as a microservices architecture — Auth, Chat, Agent, and Billing are all separate services running independently, connected through an API Gateway built with Express. The frontend is React with Redux Toolkit for state management. For authentication, I used Firebase Google sign-in combined with a Redis session store. For billing, I integrated Razorpay. The whole thing is containerized with Docker.*
>
> *What I'm most proud of is the LangGraph-based agent orchestration — it's a directed workflow graph where every request flows through a router node, gets classified, and is then handled by the correct specialized agent."*

---

## 1.4 Project Flow — Step by Step

```
USER OPENS APP
     ↓
Browser loads React app (Vite)
     ↓
App.jsx runs → calls getCurrentUser API
     ↓
Gateway checks Redis session cookie
     ↓
If no session → Login modal appears
     ↓
User clicks "Continue With Google"
     ↓
Firebase Google popup opens
     ↓
Firebase returns ID Token
     ↓
Token sent to /api/auth/login
     ↓
Auth Service verifies token with Firebase Admin
     ↓
Creates/finds user in MongoDB
     ↓
Creates Redis session → Sets HTTP-only cookie
     ↓
User data stored in Redux (userSlice)
     ↓
SideBar loads → fetches conversations from Chat Service
     ↓
User types a message → clicks Send
     ↓
Frontend creates FormData (prompt + agent type + optional file)
     ↓
POST /api/agent/send → hits Gateway
     ↓
Gateway: auth middleware checks Redis cookie ✅
     ↓
Gateway injects userId header → proxies to Agent Service
     ↓
Agent Controller → starts LangGraph workflow
     ↓
Router Node: auto-detects best agent (or uses user's choice)
     ↓
Correct Agent runs (chat/search/coding/pdf/ppt/vision)
     ↓
Agent deducts credits → returns response + artifacts
     ↓
Agent Controller saves messages to MongoDB (Chat Service)
     ↓
Response sent back to frontend
     ↓
Redux: addMessage() → UI updates with AI reply
     ↓
If coding agent → Artifact panel opens with Monaco Editor
```

---

# PART 2 — COMPLETE TECH STACK EXPLANATION

## 2.1 React (v19)

| | |
|---|---|
| **What it is** | A JavaScript library for building user interfaces. |
| **Why we used it** | React lets us build the UI as small, reusable pieces called "components" (e.g., SideBar, ChatInput, MessageBubble). |
| **Problem it solves** | Without React, every time data changed (new message arrived), you'd have to manually update the HTML. React does it automatically. |
| **Beginner analogy** | React is like LEGO. You build small blocks (components) and combine them to make the full app. |
| **Alternatives** | Vue.js, Angular, Svelte |
| **One-line interview answer** | "We used React because of its component-based architecture, which made building a complex chat UI with reusable pieces very clean and maintainable." |

**Your project example:**
```
main.jsx → App.jsx → Home.jsx → SideBar + ChatArea + Artifact
```
Each is a separate component. SideBar doesn't know about ChatInput — they are independent.

---

## 2.2 Vite (Build Tool)

| | |
|---|---|
| **What it is** | A fast development server and build tool for modern JavaScript projects. |
| **Why we used it** | When you change a file, Vite updates the browser in milliseconds. Webpack (the old alternative) is much slower. |
| **Problem it solves** | Fast developer experience — the app starts in under 1 second. |
| **Beginner analogy** | Vite is like a fast printer. You write code, it prints (builds) it for the browser instantly. |
| **Alternatives** | Create React App (CRA), Webpack |
| **One-line answer** | "Vite gives us instant hot module replacement, making development much faster than older tools." |

Your config: [vite.config.js](file:///d:/project/1.cortexAI/frontend/vite.config.js) — uses `@vitejs/plugin-react` to enable React support.

---

## 2.3 Tailwind CSS (v4)

| | |
|---|---|
| **What it is** | A utility-first CSS framework where you style by adding class names directly in HTML/JSX. |
| **Why we used it** | Instead of writing separate CSS files, you apply classes like `flex`, `bg-indigo-500`, `text-sm` directly. |
| **Problem it solves** | No need to name CSS classes or context-switch between files. |
| **Beginner analogy** | Like a wardrobe full of pre-made outfit pieces — you pick and combine rather than sew from scratch. |
| **Alternatives** | Plain CSS, styled-components, Emotion |
| **One-line answer** | "Tailwind let us build a polished dark UI very quickly without writing custom CSS files for every component." |

**Your project example** (from `SideBar.jsx`):
```jsx
className='text-[13px] font-medium truncate text-slate-300'
```
This is Tailwind — all CSS in the class name, no separate stylesheet needed.

---

## 2.4 Redux Toolkit

| | |
|---|---|
| **What it is** | A library for global state management in React apps. |
| **Why we used it** | Multiple components need to share data. For example, both SideBar and ChatArea need to know "which conversation is selected". |
| **Problem it solves** | Without Redux, you'd have to pass data through many components via props — called "prop drilling". Redux creates a single shared store. |
| **Beginner analogy** | Redux is like a noticeboard in an office. Anyone can post a note (update state), and anyone can read it (access state). |
| **Alternatives** | Zustand, Context API, Jotai |
| **One-line answer** | "Redux Toolkit is our global state manager that allows any component to read or update shared data like user info, conversations, and messages." |

**Your store has 3 slices:**
- `userSlice` → stores logged-in user data
- `conversationSlice` → stores conversation list + selected conversation
- `messageSlice` → stores messages, artifacts, and loading state

---

## 2.5 Firebase (Authentication)

| | |
|---|---|
| **What it is** | Google's backend platform. We only use its **Authentication** feature. |
| **Why we used it** | Firebase handles the entire Google OAuth flow — we don't have to build login from scratch. |
| **Problem it solves** | Building secure authentication is complex. Firebase handles Google sign-in, tokens, security in minutes. |
| **Beginner analogy** | Firebase Auth is like a security guard. You don't build your own security system — you hire a professional guard (Firebase) and trust them. |
| **Alternatives** | Clerk, Auth0, NextAuth, custom JWT |
| **Two parts in your project:** | Firebase Client SDK (frontend) + Firebase Admin SDK (backend) |

**Frontend** (`Home.jsx`):
```js
const data = await signInWithPopup(auth, googleProvider) // Google popup
const token = await data.user.getIdToken()               // Get Firebase token
await handleLogin(token)                                  // Send to our backend
```

**Backend** (`auth.controller.js`):
```js
const decoded = await getAuth(app).verifyIdToken(token)  // Verify it's real
```
The token is like a signed letter from Google saying "this person is who they claim to be".

---

## 2.6 Axios

| | |
|---|---|
| **What it is** | A library for making HTTP requests from the browser to a server. |
| **Why we used it** | Cleaner than the built-in `fetch`, automatic JSON parsing, easy error handling, and we configured `withCredentials: true` so cookies are sent automatically. |
| **Beginner analogy** | Axios is like a delivery service. You put a request in a box, it delivers it to the server, and brings back the response. |
| **Alternatives** | fetch (built-in), ky, got |
| **One-line answer** | "We use Axios as our HTTP client because it handles cookies automatically with `withCredentials: true`, which is essential for our cookie-based session auth." |

---

## 2.7 Node.js + Express

| | |
|---|---|
| **What it is** | Node.js is a JavaScript runtime for servers. Express is a web framework that runs on Node.js. |
| **Why we used it** | We're already using JavaScript on the frontend, so using Node.js on the backend means one language everywhere. Express makes building APIs easy. |
| **Beginner analogy** | Node.js is the engine of the car. Express is the steering wheel and dashboard that makes it easy to drive. |
| **Your project uses it for:** | Gateway (proxy server) + Auth Service + Chat Service + Agent Service + Billing Service |
| **One-line answer** | "We use Express because it's minimal, fast, and allows us to quickly define API routes and middleware chains." |

---

## 2.8 MongoDB + Mongoose

| | |
|---|---|
| **What it is** | MongoDB is a NoSQL database that stores data as JSON documents. Mongoose is a library that adds structure (schemas) to MongoDB. |
| **Why we used it** | Our data (messages, conversations, users) has a flexible structure — perfect for document databases. |
| **Beginner analogy** | MongoDB is like a filing cabinet where each drawer holds folders (collections) and each folder has papers (documents) of flexible shape. |
| **Alternatives** | PostgreSQL (SQL), MySQL, SQLite |
| **One-line answer** | "MongoDB's flexible document model is ideal for storing chat messages and AI artifacts, which can vary in structure." |

**Your schemas:**
- `User` → firebaseUid, name, email, avatar, plan, credits
- `Conversation` → title, userId
- `Message` → conversationId, role, content, images, artifacts

---

## 2.9 Redis

| | |
|---|---|
| **What it is** | An in-memory key-value store — extremely fast data storage. |
| **Why we used it** | Used for 3 purposes: session storage, message memory/cache, and rate limiting. |
| **Beginner analogy** | Redis is like a whiteboard. Writing and reading from it is near-instant, but it only holds temporary information. |
| **Alternatives** | Memcached, database sessions |
| **One-line answer** | "Redis is our fast in-memory store used for session management, conversation memory caching, and agent rate limiting." |

**Three uses in your project:**
1. **Sessions**: `session-{sessionId}` → user data JSON (7 days TTL)
2. **Memory**: `messages-{conversationId}` → last 20 messages (24h TTL)
3. **Rate Limiting**: `rate:{userId}:{agent}` → request count (60s TTL)

---

## 2.10 Docker

| | |
|---|---|
| **What it is** | A tool that packages an application into a "container" — a lightweight, isolated environment. |
| **Why we used it** | Your `docker-compose.yml` starts Redis with one command. Each service also has its own Dockerfile. |
| **Beginner analogy** | Docker is like a lunchbox. The food (app) is packed perfectly inside. No matter whose kitchen (computer) you open it in, the food is the same. |
| **Alternatives** | Kubernetes (for larger scale), bare metal |
| **One-line answer** | "Docker ensures our Redis instance and services run consistently across any environment without setup issues." |

---

## 2.11 LangChain + LangGraph

| | |
|---|---|
| **What they are** | LangChain is a framework for building AI applications with language models. LangGraph extends it with directed graphs (workflows). |
| **Why we used it** | We needed multiple AI agents to work together in a coordinated flow: Router → Agent → Result. LangGraph makes this visual and clean. |
| **Beginner analogy** | LangGraph is like a flowchart that comes to life. Draw the boxes (nodes) and arrows (edges) in code, and it executes them automatically. |
| **Alternatives** | Direct LLM API calls, CrewAI, AutoGen |
| **One-line answer** | "LangGraph lets us define a directed agent workflow as a graph, with conditional routing to the right agent based on the user's intent." |

---

## 2.12 Groq (LLaMA 3.3 70B)

| | |
|---|---|
| **What it is** | Groq is an AI inference service running LLaMA models at very high speeds. |
| **Why we used it** | Groq is extremely fast — it can generate tokens 10x faster than OpenAI. Used for Chat, Search, and Intent classification. |
| **One-line answer** | "Groq provides ultra-fast LLaMA-based inference for our chat and routing agents, giving near-instant responses." |

---

## 2.13 Google Gemini (2.5 Flash)

| | |
|---|---|
| **What it is** | Google's latest multimodal AI model — can handle text AND images. |
| **Why we used it** | Used for the Image Analyzer agent because Gemini can read image content (multimodal). |
| **One-line answer** | "Gemini 2.5 Flash is our multimodal model, used when a user uploads an image for analysis because it can understand visual content." |

---

## 2.14 DeepSeek (via OpenRouter)

| | |
|---|---|
| **What it is** | A powerful coding-focused LLM, accessed through OpenRouter (which is an API gateway to many LLMs). |
| **Why we used it** | DeepSeek excels at code generation — better than general models for writing HTML/CSS/JS projects. |
| **One-line answer** | "We use DeepSeek via OpenRouter for the coding agent because it's specifically trained on large codebases and generates cleaner code." |

---

## 2.15 Tavily Search API

| | |
|---|---|
| **What it is** | A search API designed for AI applications — returns structured, clean results. |
| **Why we used it** | Google Search API is expensive and complex. Tavily is built specifically for LLMs — clean JSON results. |
| **One-line answer** | "Tavily is our web search API that gives real-time information to the Search Agent, which then passes it to the Chat Agent for summarization." |

---

## 2.16 Qdrant (Vector Database)

| | |
|---|---|
| **What it is** | A database that stores vector embeddings — mathematical representations of text. |
| **Why we used it** | When a user uploads a PDF, we can't pass all text to an LLM. Instead, we split it into chunks, convert to vectors, store in Qdrant, and retrieve only the relevant sections. |
| **Beginner analogy** | Qdrant is like a smart library that finds books similar to your topic, not just exact word matches. |
| **One-line answer** | "Qdrant stores PDF content as vector embeddings, allowing semantic search to find the most relevant sections for any user question." |

---

## 2.17 AWS S3

| | |
|---|---|
| **What it is** | Amazon's cloud storage service — stores files of any type at scale. |
| **Why we used it** | Generated images from the Vision agent are stored in S3. Pre-signed URLs give temporary download access. |
| **One-line answer** | "AWS S3 stores AI-generated images, and we use pre-signed URLs to give users temporary, secure download access." |

---

## 2.18 Razorpay

| | |
|---|---|
| **What it is** | India's most popular payment gateway — handles online payments securely. |
| **Why we used it** | Users can upgrade their plan (Pro, Premium) to get more AI credits. |
| **How it works:** | Create Order → User pays in Razorpay popup → Verify signature → Update credits |
| **One-line answer** | "Razorpay handles our payment flow — we create an order, the user pays, we verify the cryptographic signature, and then update their plan in the database." |

---

## 2.19 Monaco Editor

| | |
|---|---|
| **What it is** | The code editor that powers VS Code — available as a React component. |
| **Why we used it** | When the Coding Agent generates code, users see it in a beautiful syntax-highlighted editor identical to VS Code. |
| **One-line answer** | "Monaco Editor gives users a VS Code-quality experience when viewing AI-generated code, with syntax highlighting and line numbers." |

---

## 2.20 Motion (Framer Motion)

| | |
|---|---|
| **What it is** | A React animation library for smooth, physics-based animations. |
| **Why we used it** | The Artifact panel slides in/out, the mobile drawer animates — all using Motion. |
| **One-line answer** | "Motion handles our UI animations, like the sliding artifact panel, giving the app a premium, responsive feel." |

---

# PART 3 — FOLDER STRUCTURE DEEP DIVE

## 3.1 Frontend Structure

```
frontend/
├── src/
│   ├── App.jsx          ← Root component; fetches current user on load
│   ├── main.jsx         ← Entry point; wraps app in Redux Provider
│   ├── index.css        ← Global CSS reset
│   ├── components/      ← Reusable UI pieces
│   │   ├── SideBar.jsx        ← Left panel: conversations list
│   │   ├── ChatArea.jsx       ← Middle: Nav + MessageList + ChatInput
│   │   ├── ChatInput.jsx      ← Text area + agent selector + send button
│   │   ├── MessageList.jsx    ← Scrollable list of messages
│   │   ├── MessageBubble.jsx  ← Individual message with markdown rendering
│   │   ├── Artifact.jsx       ← Right panel: Monaco editor + preview
│   │   ├── BillingDrawer.jsx  ← Payment UI drawer
│   │   ├── Nav.jsx            ← Top navigation bar
│   │   └── LoadingAnimation.jsx ← Spinner/loading state
│   ├── pages/
│   │   └── Home.jsx     ← The only page; renders SideBar+ChatArea+Artifact
│   ├── features/        ← API call functions (NOT React components)
│   │   ├── getCurrentUser.js
│   │   ├── getConversations.js
│   │   ├── createConversation.js
│   │   ├── getMessages.js
│   │   ├── sendMessage.js
│   │   ├── updateConversation.js
│   │   ├── createOrder.js
│   │   ├── verifyPayment.js
│   │   └── logOut.js
│   ├── redux/           ← Global state management
│   │   ├── store.js           ← Creates the Redux store
│   │   ├── userSlice.js       ← User state (userData)
│   │   ├── conversationSlice.js ← Conversations + selected
│   │   └── messageSlice.js    ← Messages + artifacts + loading
│   └── assets/          ← Images, icons
├── utils/
│   ├── axios.js         ← Configured Axios instance (withCredentials)
│   └── firebase.js      ← Firebase client config
└── public/              ← Static files (favicon, etc.)
```

### Why does each folder exist?

| Folder | Purpose | What breaks if missing? |
|---|---|---|
| `components/` | Reusable UI pieces | Code becomes one giant unmanageable file |
| `features/` | API call functions | Logic mixed with UI, impossible to test |
| `redux/` | Global shared state | Components can't talk to each other |
| `pages/` | Full page views | No concept of "screens" in the app |
| `utils/` | Shared config | Axios config repeated in every file |

---

## 3.2 Backend Structure

```
backend/
├── gateway/             ← API Gateway (entry point for all requests)
│   ├── index.js         ← Sets up proxy routes to each microservice
│   ├── controllers/     ← getCurrentUser handler
│   ├── middleware/      ← auth.middleware.js (protect routes)
│   └── utils/           ← proxyWithHeader (injects userId)
├── services/
│   ├── auth/            ← Handles login, logout, user updates
│   │   ├── controllers/ ← auth.controller.js
│   │   ├── models/      ← user.model.js (MongoDB schema)
│   │   ├── routes/      ← Express router
│   │   └── config/      ← Firebase Admin + MongoDB connection
│   ├── chat/            ← Manages conversations and messages
│   │   ├── controllers/
│   │   ├── models/      ← conversation.model.js + message.model.js
│   │   └── routes/
│   ├── agent/           ← LangGraph AI orchestration service
│   │   ├── agents/      ← Individual AI agents (chat, coding, etc.)
│   │   ├── graph/       ← LangGraph workflow (graph.js, router.js, state.js)
│   │   ├── controllers/ ← agent.controller.js (entry point)
│   │   ├── config/      ← LLM models, vector DB, memory, rate limit
│   │   └── utils/       ← S3 upload, credit deduction
│   └── billing/         ← Razorpay payment integration
│       ├── controllers/ ← billing.controller.js
│       ├── models/      ← payment.model.js
│       └── config/      ← Razorpay init, Plans definition
└── shared/
    └── redis/           ← Shared Redis client used by all services
```

---

# PART 4 — IMPORTANT FILES EXPLAINED LINE BY LINE

## 4.1 `main.jsx` — The Starting Point

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'          // Load global styles
import App from './App.jsx'   // Our root component
import { Provider } from "react-redux"  // Redux wrapper
import { store } from './redux/store.js' // Our Redux store

createRoot(document.getElementById('root'))  // Find <div id="root"> in index.html
  .render(
    <Provider store={store}>   // Make Redux store available to ALL components
      <App />                  // Render the entire app
    </Provider>
  )
```

**Simple explanation:** This is the first JavaScript that runs. It finds the empty `<div id="root">` in `index.html` and fills it with our React app. It wraps everything in `<Provider>` so any component anywhere can access the Redux store.

---

## 4.2 `App.jsx` — The Root Component

```jsx
function App() {
  const dispatch = useDispatch()  // Get the "dispatch" function from Redux
  
  useEffect(() => {               // Run this code AFTER the component loads
    const getUser = async () => {
      const data = await getCurrentUser()  // Hit GET /api/me
      dispatch(setUserdata(data))          // Store user in Redux
    }
    getUser()
  }, [])                          // Empty [] = run only ONCE, on mount
  
  return (
    <>
      <Home/>   // Render the home page
    </>
  )
}
```

**Simple explanation:** When the app first loads, it immediately checks "is anyone logged in?" by calling the backend. If yes, it stores the user's info in Redux state so the whole app knows.

---

## 4.3 `gateway/index.js` — The Traffic Controller

```js
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
// Allow frontend to send requests WITH cookies

app.use("/api/auth", proxy(process.env.AUTH_SERVICE))
// Any request to /api/auth → forward to Auth microservice (no auth check)

app.use("/api/chat", protect, proxyWithHeader(process.env.CHAT_SERVICE))
// /api/chat → check session first → inject userId header → forward to Chat service

app.use("/api/agent", protect, proxyWithHeader(process.env.AGENT_SERVICE))
// /api/agent → check session → inject userId → forward to Agent service

app.use("/api/billing", protect, proxyWithHeader(process.env.BILLING_SERVICE))
// /api/billing → check session → inject userId → forward to Billing service
```

**Simple explanation:** The gateway is a doorman. Every request first comes to the gateway. For protected routes, the doorman checks your cookie (session) in Redis. If valid, he stamps your request with your userId and sends it to the right service.

---

## 4.4 `auth.middleware.js` — The Security Guard

```js
const protect = async (req, res, next) => {
  const sessionId = req.cookies?.session   // Read cookie from browser
  
  if (!sessionId) {
    return res.status(400).json({ message: "unauthorized" })  // No cookie = reject
  }
  
  const session = await redis.get(`session-${sessionId}`)  // Look up in Redis
  
  if (!session) {
    return res.status(400).json({ message: "session expired" })  // Not found = expired
  }
  
  req.user = JSON.parse(session)  // Attach user data to the request
  next()                          // Continue to the actual route handler
}
```

**Simple explanation:** Every protected request must have a session cookie. The middleware looks up the session ID in Redis. If found, it attaches the user's data to the request and passes it along. If not found, it blocks the request.

---

## 4.5 `auth.controller.js` — Login Flow

```js
export const login = async (req, res) => {
  const { token } = req.body                          // Firebase ID token from frontend
  const decoded = await getAuth(app).verifyIdToken(token) // Verify with Google's servers
  
  let user = await User.findOne({ firebaseUid: decoded.uid }) // Check if user exists
  
  if (!user) {                                        // First time login
    user = await User.create({
      firebaseUid: decoded.uid,
      name: decoded.name,
      email: decoded.email,
      avatar: decoded.picture
    })
  }
  
  const sessionId = crypto.randomUUID()              // Create unique session ID
  
  await redis.set(`user-session-${user._id}`, sessionId, "EX", 7*24*60*60)
  // Remember which sessionId belongs to this user (for invalidation)
  
  await redis.set(`session-${sessionId}`, JSON.stringify({ userId, name, ... }), "EX", 7*24*60*60)
  // Store session data in Redis (expires in 7 days)
  
  res.cookie("session", sessionId, { httpOnly: true, ... })  // Set cookie in browser
  
  return res.status(200).json(user)  // Return user data to frontend
}
```

---

## 4.6 `graph.js` — The AI Brain

```js
const workflow = new StateGraph(agentState)  // Create a new workflow graph

// Add all nodes (each is a function/agent)
workflow.addNode("router", router)    // Decides which agent to use
workflow.addNode("chat", chatAgent)
workflow.addNode("search", searchAgent)
workflow.addNode("coding", codingAgent)
// ... etc

workflow.addEdge("__start__", "router")   // Always start at router

workflow.addConditionalEdges("router", (state) => {
  // Based on state.agent value, go to different node
  switch (state.agent) {
    case "chat": return "chat"
    case "search": return "search"
    case "coding": return "coding"
    // ...
  }
})

workflow.addEdge("search", "chat")  // Search results flow into chat agent
workflow.addEdge("chat", "__end__") // Chat agent is the final step

export const graph = workflow.compile()  // Compile into executable graph
```

**Simple explanation:** This is like a railway network. `__start__` is the starting station. Every train (request) first goes to `router` station. From there, conditional tracks send it to the right agent station. Some agents (search) are layovers — after searching, the train continues to `chat` station before arriving at `__end__`.

---

# PART 5 — FRONTEND FLOW

## 5.1 What Happens When User Clicks Send

```
User types message in textarea (value state updates via onChange)
         ↓
User clicks Send button → handleSendMessage() fires
         ↓
dispatch(setIsLoading(true)) → loading spinner shows
         ↓
If no conversation selected → createConversation() API call
         ↓
If conversation title is "New Chat" → updateConversation() to set title
         ↓
Build FormData: { prompt, conversationId, agent, file? }
         ↓
dispatch(addMessage({ role:"user", content })) → message appears immediately
         ↓
setValue("") → clears the textarea
         ↓
sendMessage(formData) → POST /api/agent/send (awaits)
         ↓
dispatch(setIsLoading(false))
         ↓
dispatch(setArtifacts(data.artifacts)) → shows code in right panel (if any)
         ↓
dispatch(addMessage({ role:"assistant", content: data.answer })) → AI reply appears
```

**Why the user message appears before the API response:**  
On line 100 of ChatInput.jsx, we add the user message to Redux BEFORE awaiting the API. This is called **optimistic UI** — we assume it will work and show it immediately. The app feels instant.

---

## 5.2 React Hooks Used in the Project

### `useState`
**What it does:** Stores local component state. When it changes, React re-renders that component.

```jsx
// ChatInput.jsx
const [value, setValue] = useState("")       // What user is typing
const [selectedAgent, setSelectedAgent] = useState("Auto")  // Which agent tab is active
const [listening, setListening] = useState(false)  // Is mic recording?
```

**Beginner explanation:** `useState` is like a sticky note in a component. You can change what's written on it (`setValue`) and React will re-draw the component.

---

### `useEffect`
**What it does:** Runs code AFTER the component renders, or when a dependency changes.

```jsx
// App.jsx — runs ONCE when app loads
useEffect(() => { getUser() }, [])

// SideBar.jsx — runs when userData changes (user logs in)
useEffect(() => { getConversations() }, [userData?._id])

// ChatArea.jsx — runs when selected conversation changes
useEffect(() => { getMessages() }, [selectedConversation?._id])
```

**Beginner explanation:** `useEffect` is like setting an alarm. "When THIS thing happens, do THAT." Empty array `[]` means "only run when the component first appears".

---

### `useSelector` (Redux)
**What it does:** Reads data from the Redux store.

```jsx
const { userData } = useSelector(state => state.user)
const { conversations, selectedConversation } = useSelector(state => state.conversation)
```

**Beginner explanation:** `useSelector` is like asking the office noticeboard "what's the current user's name?" — it reads the current state.

---

### `useDispatch` (Redux)
**What it does:** Gets the `dispatch` function to SEND actions to Redux.

```jsx
const dispatch = useDispatch()
dispatch(setUserdata(data))      // Update user in store
dispatch(addMessage(message))    // Add a message to the list
```

**Beginner explanation:** `useDispatch` gives you the "post" function for the noticeboard. `dispatch(action)` is like posting a new note.

---

### `useRef`
**What it does:** Stores a reference to a DOM element or a value that persists without causing re-renders.

```jsx
// ChatInput.jsx
const recognitionRef = useRef(null)  // Reference to SpeechRecognition object
const fileRef = useRef(null)         // Reference to hidden file input element

// Click the hidden file input programmatically
<button onClick={() => fileRef.current.click()}>📎</button>
```

---

## 5.3 Component Communication Diagram

```
┌──────────────────────────────────────────────────────────┐
│                     Redux Store                           │
│   user.userData | conversation.* | message.*             │
└────────────────┬─────────────────┬────────────────────────┘
                 │ useSelector      │ dispatch
    ┌────────────┼──────────────────┼───────────────┐
    ↓            ↓                  ↓               ↓
SideBar.jsx  ChatArea.jsx    ChatInput.jsx     Artifact.jsx
(reads       (reads          (reads +          (reads
convs,       messages,       dispatches        artifacts)
writes       selected)       messages)
selected)
```

All components share data through Redux. No direct passing between siblings.

---

# PART 6 — BACKEND FLOW

## 6.1 How a Request Travels

```
Browser → POST /api/agent/send
          ↓
        GATEWAY (port 3000)
          ↓ protect middleware
        Redis lookup: cookie → session
          ↓ success
        req.user = { userId, name, ... }
        proxyWithHeader adds x-user-id header
          ↓
        AGENT SERVICE (port 3003)
          ↓ agent.controller.js
        Reads x-user-id header
        Reads prompt, conversationId, agent from body
          ↓
        graph.invoke({ prompt, agent, userId, ... })
          ↓
        LANGGRAPH: router → specific agent → result
          ↓ done
        Saves messages to Chat Service
          ↓
        Returns { answer, artifacts, images }
          ↓
        GATEWAY → Browser
```

---

## 6.2 What is an API Route?

An API route is a URL pattern + HTTP method that triggers a specific function.

**Example from gateway:**
```js
app.use("/api/auth", proxy(AUTH_SERVICE))
```
When frontend does `POST /api/auth/login`, the gateway forwards it to Auth Service.

**HTTP Methods:**
- `GET` — Read data ("give me conversations")
- `POST` — Create data or send data ("send this message")
- `PUT/PATCH` — Update data ("update conversation title")
- `DELETE` — Remove data

---

## 6.3 What is Middleware?

Middleware is a function that runs BETWEEN receiving a request and sending a response. It can:
- Inspect the request
- Modify the request
- Reject the request
- Pass it to the next function

```
Request → [CORS] → [Morgan Logger] → [Cookie Parser] → [Auth Protect] → Route Handler → Response
```

Each `app.use()` in `gateway/index.js` adds a middleware.

---

# PART 7 — AUTHENTICATION DEEP DIVE

## 7.1 The Complete Login Flow

```
Step 1: User clicks "Continue With Google"
        → signInWithPopup(auth, googleProvider) [Firebase Client SDK]
        → Google popup opens
        → User selects their account
        → Firebase returns: user data + ID Token (JWT from Google)

Step 2: Frontend calls POST /api/auth/login with { token }

Step 3: Backend (Auth Service) receives token
        → getAuth(app).verifyIdToken(token) [Firebase Admin SDK]
        → Sends token to Google's servers for verification
        → Returns { uid, name, email, picture }

Step 4: Find or create user in MongoDB

Step 5: Generate random Session ID (UUID)
        → Store in Redis: session-{sessionId} → user data (7 days)
        → Store in Redis: user-session-{userId} → sessionId (for invalidation)

Step 6: Set HTTP-only cookie: session = {sessionId}
        → Browser stores this cookie automatically

Step 7: Return user data to frontend → Redux stores it
```

---

## 7.2 What is an HTTP-Only Cookie?

A normal cookie can be read by JavaScript (dangerous — hackers can steal it via XSS attacks). An **HTTP-only** cookie CANNOT be read by JavaScript — only the browser sends it automatically with every request. Much safer.

```js
res.cookie("session", sessionId, {
  httpOnly: true,   // JavaScript CANNOT read this — only browser sends it
  secure: false,    // Should be true in production (HTTPS only)
  sameSite: "strict", // Only sent to our own domain (prevents CSRF)
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
})
```

---

## 7.3 Authentication vs Authorization

| | Authentication | Authorization |
|---|---|---|
| **Question** | "Who are you?" | "What can you do?" |
| **Your project** | Firebase verifies the user is real | Redis session check protects routes |
| **When it happens** | At login | On every protected API call |
| **Example** | Verifying Google token | Checking credits before running an agent |

---

## 7.4 Session vs JWT Token

| | Session (your approach) | JWT Token |
|---|---|---|
| **Stored where** | Redis (server side) | Browser (client side) |
| **Revokable?** | Yes — delete from Redis | No — must wait to expire |
| **Size** | Small cookie (just an ID) | Large (contains all user data) |
| **Scalability** | Needs Redis cluster at scale | Works without shared state |
| **Your choice** | ✅ Sessions (safer, revokable) | ❌ Not used |

**Why sessions are better here:** You can instantly logout a user by deleting their session from Redis. With JWT, you'd have to wait for the token to expire.

---

# PART 8 — DATABASE EXPLANATION

## 8.1 MongoDB Collections in Your Project

### Users Collection
```json
{
  "_id": "ObjectId",
  "firebaseUid": "google-uid-12345",
  "name": "John Doe",
  "email": "john@gmail.com",
  "avatar": "https://...",
  "plan": "free",          // "free" | "pro" | "premium"
  "credits": 100,          // Current credits
  "totalCredits": 100,     // Credits ever received
  "planExpiresAt": "2026-09-03T...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Conversations Collection
```json
{
  "_id": "ObjectId",
  "title": "Explain machine learning",
  "userId": "user-objectId",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Messages Collection
```json
{
  "_id": "ObjectId",
  "conversationId": "conv-objectId",
  "role": "assistant",       // "user" | "assistant"
  "content": "Here's the explanation...",
  "images": ["https://s3.aws..."],
  "artifacts": [
    {
      "id": 1735000000000,
      "type": "Project",
      "title": "Landing Page",
      "files": [
        { "name": "index.html", "content": "..." },
        { "name": "style.css", "content": "..." }
      ]
    }
  ],
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Payments Collection
```json
{
  "userId": "user-id",
  "orderId": "order_Razorpay123",
  "paymentId": "pay_abc123",
  "amount": 299,
  "credits": 500,
  "plan": "pro",
  "currency": "INR",
  "status": "paid"    // "created" | "paid" | "failed"
}
```

---

## 8.2 Relationships Between Collections

```
User (1) ──────────── (Many) Conversations
                              │
                    Conversation (1) ─── (Many) Messages
```

- One user can have many conversations
- One conversation has many messages
- Messages belong to ONE conversation (via `conversationId` field)

This is a **one-to-many** relationship, stored as a reference (like a foreign key in SQL).

---

## 8.3 CRUD Operations

| Operation | Meaning | Example in your project |
|---|---|---|
| **C**reate | Insert new data | Create user on first login |
| **R**ead | Get existing data | Get conversations list |
| **U**pdate | Change existing data | Update conversation title |
| **D**elete | Remove data | (Logout deletes Redis session) |

---

# PART 9 — DEPLOYMENT & DEVOPS

## 9.1 Environment Variables

Files named `.env` store sensitive configuration. **Never push these to GitHub!**

**Why?** If your AWS keys or Razorpay secrets are on GitHub, anyone can find them, use your cloud resources, and run up your bill.

**Your gateway `.env` contains:**
```
PORT=3000
FRONTEND_URL=http://localhost:5173
AUTH_SERVICE=http://localhost:3001
CHAT_SERVICE=http://localhost:3002
AGENT_SERVICE=http://localhost:3003
BILLING_SERVICE=http://localhost:3004
```

**Your agent `.env` contains:**
```
GROQ_API_KEY=...
GOOGLE_API_KEY=...
OPENROUTER_API_KEY=...
TAVILY_API_KEY=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
RAZORPAY_KEY_ID=...
```

The `.gitignore` file lists `.env` so git ignores it.

---

## 9.2 Docker in Your Project

```yaml
# docker-compose.yml
services:
  redis:
    image: redis
    ports:
      - 6379:6379
```

Run `docker-compose up` → Redis starts instantly. No need to install Redis manually. Each microservice also has a `Dockerfile` to containerize it for production deployment.

---

## 9.3 Development vs Production

| | Development | Production |
|---|---|---|
| **Start command** | `npm run dev` (Vite) | `npm run build` then serve `dist/` |
| **Source maps** | Yes (for debugging) | No (for performance) |
| **Environment** | `.env` files | Server environment variables |
| **API URL** | localhost:3000 | Your deployed domain |

---

# PART 10 — ARCHITECTURE & SYSTEM DESIGN

## 10.1 Microservices Architecture

Your project is a **microservices architecture** — each function is a separate, independent service:

```
                        ┌─────────────────────────────┐
                        │           FRONTEND            │
                        │     React + Vite + Redux      │
                        └──────────────┬───────────────┘
                                       │ HTTP requests
                        ┌──────────────▼───────────────┐
                        │         API GATEWAY           │
                        │    Express + Auth Middleware  │
                        └──┬────────┬──────┬──────┬────┘
                           │        │      │      │
               ┌───────────▼┐ ┌─────▼─┐ ┌─▼───┐ ┌▼─────────┐
               │Auth Service│ │ Chat  │ │Agent│ │ Billing  │
               │  MongoDB   │ │Service│ │Serv.│ │ Service  │
               │  Firebase  │ │Mongo  │ │Mongo│ │ Razorpay │
               └────────────┘ └───────┘ └──┬──┘ └──────────┘
                                            │
                              ┌─────────────▼────────────────────┐
                              │          LANGGRAPH                │
                              │ Router→Chat/Search/Coding/PDF/PPT│
                              │ Vision/PDFRag/ImageAnalyzer       │
                              └──────────────────────────────────┘
                              
                    ┌──────────────────────────────────────┐
                    │            Shared Services            │
                    │  Redis | Qdrant | AWS S3 | Tavily    │
                    └──────────────────────────────────────┘
```

### Why Microservices?

| Benefit | Explanation |
|---|---|
| **Independent scaling** | If Agent Service gets more traffic, scale only that one |
| **Independent deployment** | Fix a bug in Billing without touching Auth |
| **Technology freedom** | Could rewrite one service in Python without touching others |
| **Fault isolation** | If Billing goes down, Chat still works |

---

## 10.2 Client-Side Rendering (CSR) — Your Approach

Your app uses CSR with Vite + React:
1. Browser downloads empty `index.html`
2. Browser downloads React JavaScript bundle
3. React runs and builds the UI in the browser
4. API calls fetch data

**Pros:** Fast after initial load, good for interactive apps
**Cons:** Slower first load, not great for SEO

**Alternative: Server-Side Rendering (Next.js)**
- Server builds the full HTML
- Browser receives ready-to-display page
- Better for SEO, faster initial render
- More complex server setup

**For CortexAI (a dashboard app requiring login):** CSR is the right choice because SEO doesn't matter (content is behind login), and the interactive chat UI benefits from CSR.

---

# PART 11 — 50+ INTERVIEW QUESTIONS & ANSWERS

## Category 1: Project Overview

---

**Q1: Tell me about your project.**

> **30-sec answer:** "CortexAI is an AI-powered platform with multiple specialized agents — for chat, web search, code generation, PDF analysis, image creation, and PowerPoint generation. It uses a microservices backend with an API Gateway, React frontend with Redux, Firebase auth, Redis sessions, MongoDB for data, and LangGraph for orchestrating AI agents."

> **2-min answer:** Include the architecture flow, mention LangGraph, Firebase Google auth, Razorpay billing, and what makes it unique (the automatic agent routing).

> **What interviewer checks:** Communication, project ownership, technical depth.

> **Common mistake:** Listing technologies without explaining WHY you chose them.

---

**Q2: Why did you choose a microservices architecture?**

> **Answer:** "We separated concerns clearly — Auth, Chat, Agent, and Billing are independently deployable. If the Agent service (which calls expensive LLM APIs) needs more resources, we can scale only that service. Also, if Billing goes down, the chat functionality still works. The gateway pattern gives us a single entry point with centralized authentication."

> **What interviewer checks:** Architectural thinking, trade-offs awareness.

---

**Q3: What is the most technically complex part of the project?**

> **Answer:** "The LangGraph agent orchestration system. Building a directed workflow graph where: the router first analyzes intent using an LLM, conditionally routes to the right agent, some agents (search) feed their results into other agents (chat), and all agents share state through a typed Annotation schema — that required deep understanding of AI agent design patterns."

---

**Q4: How does the automatic agent routing work?**

> **Answer:** "When a user sends a message with 'Auto' mode selected, the LangGraph workflow starts at the router node. The router checks if a file was uploaded — if it's a PDF, it goes to pdfRag; if it's an image, it goes to imageAnalyzer. If no file, it sends the user's prompt to a fast LLM (Groq/LLaMA) with a classification prompt listing available agents and their use cases. The LLM returns a single word like 'coding' or 'search'. The workflow then follows conditional edges to the matching agent node."

---

**Q5: What would you improve if given 3 more months?**

> **Answer:** "Three main improvements: First, add streaming responses — right now the full answer waits until generation is complete. With Server-Sent Events (SSE) or WebSockets, tokens could stream in real-time like ChatGPT. Second, add a memory summarization system — right now we keep the last 20 messages in Redis, but for long conversations we lose early context. A summarization step would compress old messages. Third, implement proper vector store cleanup — each PDF creates a new Qdrant collection that never gets deleted. I'd add TTL-based cleanup."

---

## Category 2: Authentication

---

**Q6: How does authentication work in your project?**

> **Answer:** "We use Firebase for Google OAuth on the frontend — the user clicks 'Continue With Google', Firebase opens a popup, the user selects their account, and Firebase returns an ID token (a JWT signed by Google). We send this token to our Auth service backend, which uses Firebase Admin SDK to verify it against Google's servers. If valid, we create or find the user in MongoDB, generate a random session ID using UUID, store the session data in Redis with a 7-day expiry, and set an HTTP-only cookie with the session ID. On subsequent requests, our auth middleware reads the cookie, looks up the session in Redis, and attaches user data to the request."

---

**Q7: Why did you use sessions instead of JWT?**

> **Answer:** "Sessions stored in Redis give us immediate revocation capability — when a user logs out, we delete the session from Redis and it's instantly invalidated. With JWT tokens, even if the user logs out, the token remains valid until expiry (which could be hours or days). Since we're building a paid platform where credits matter, we needed the ability to instantly revoke access. Redis sessions also keep our cookies small — just a UUID — rather than a large JWT payload."

---

**Q8: What is an HTTP-only cookie and why is it important?**

> **Answer:** "An HTTP-only cookie is a cookie that JavaScript in the browser cannot access — only the browser sends it automatically with HTTP requests. This is critical for security: if a malicious script gets injected into our page (XSS attack), it cannot steal the session cookie because JavaScript can't read it. If we'd stored the session ID in localStorage instead, any XSS vulnerability would compromise all users' sessions."

---

**Q9: Difference between authentication and authorization?**

> **Answer:** "Authentication is 'proving who you are' — in our project, that's Firebase verifying your Google identity and our backend creating a session. Authorization is 'proving what you're allowed to do' — in our project, that's checking if you have enough credits before running an agent, or the protect middleware blocking unverified requests. Authentication happens at login; authorization happens on every protected API call."

---

**Q10: What happens when the session expires?**

> **Answer:** "Sessions in Redis are set with a 7-day TTL. When expired, the key is automatically deleted by Redis. On the next request, the protect middleware calls `redis.get(session-${sessionId})` which returns null. The middleware then returns a 400 'session expired' response. On the frontend, the Axios instance should catch this and redirect to login — though adding that interceptor would be a future improvement."

---

## Category 3: State Management

---

**Q11: Why did you use Redux instead of React Context?**

> **Answer:** "Redux Toolkit gives us a structured, predictable way to manage global state with clear actions and reducers. For an app with this level of complexity — user data, conversation list, selected conversation, messages, artifacts, and loading states all needing to be shared across 9 components — Redux's pattern makes it clear exactly how state changes. React Context would work for simple cases but becomes hard to debug and optimize when you have frequent updates like adding a message every few seconds. Redux DevTools also let us time-travel through state changes for debugging."

---

**Q12: Explain the Redux data flow in your app.**

> **Answer:** "Our store has 3 slices. userSlice holds the logged-in user's data. conversationSlice holds the list of all conversations and the currently selected one. messageSlice holds the messages for the current conversation, any code artifacts, and a loading boolean. When a user selects a conversation in SideBar, it calls dispatch(setSelectedConversation(conv)). ChatArea listens with useSelector and its useEffect fires to load messages for that conversation. When a message is sent, ChatInput dispatches addMessage — both user and AI messages — so the list updates immediately."

---

**Q13: What is the difference between `addMessage` and `setMessages`?**

> **Answer:** "setMessages replaces the entire messages array — used when loading a conversation where we want to show its full history from scratch. addMessage pushes a single new message to the existing array — used in real-time when sending/receiving a message during an active chat. Using addMessage instead of setMessages prevents us from losing all existing messages when one new one arrives."

---

## Category 4: LangGraph & AI Agents

---

**Q14: What is LangGraph and why did you use it?**

> **Answer:** "LangGraph is a library for building stateful, multi-step AI agent workflows as directed graphs. Think of it as drawing a flowchart in code: each box is a 'node' (a function), and each arrow is an 'edge'. What makes LangGraph special is conditional edges — based on the current state, different paths are taken. We used it because we have 8 different specialized agents. Without LangGraph, we'd have complex nested if-else logic. With LangGraph, each agent is cleanly separated, the routing logic is explicit, and adding a new agent is as simple as adding a new node and edge."

---

**Q15: How does the Search agent work with the Chat agent?**

> **Answer:** "The Search agent uses Tavily's API to fetch real-time web results for the user's query. But raw search results aren't formatted nicely — they're JSON with URLs and snippets. So the Search agent stores results in the shared state under `searchResults`. Then LangGraph follows the edge from 'search' to 'chat'. The Chat agent sees the `searchResults` in state, builds a context prompt from them, and formats a beautiful Markdown response. The user only sees the final chat output. This two-step pipeline separates the 'fetching' concern from the 'formatting' concern."

---

**Q16: What is RAG and how did you implement it?**

> **Answer:** "RAG stands for Retrieval-Augmented Generation. The problem with PDFs is they can be hundreds of pages — you can't send all of it to an LLM. RAG solves this by: first, extracting all text from the PDF using pdf-parse. Second, splitting it into small overlapping chunks of 1000 characters with 200 character overlap using RecursiveCharacterTextSplitter. Third, converting each chunk into a vector embedding (a mathematical representation of meaning) using Google's embedding model. Fourth, storing these vectors in Qdrant. Fifth, when the user asks a question, we convert the question into a vector and search Qdrant for the 5 most similar chunks. Finally, we pass only those relevant chunks to the LLM as context. This way, the LLM gets focused, relevant information instead of the entire PDF."

---

**Q17: What is a vector embedding?**

> **Answer:** "A vector embedding is a list of numbers that represents the 'meaning' of a piece of text. For example, 'king' and 'queen' will have very similar embedding vectors because they're semantically related. 'king' and 'pizza' will have very different vectors. By converting both the PDF chunks and the user's question into vectors, Qdrant can find chunks that are semantically similar to the question — even if they don't use the exact same words. This is called semantic search."

---

**Q18: How does the Coding agent decide what to output?**

> **Answer:** "The Coding agent first uses a fast 'intent classifier' LLM to classify the user's request into one of these categories: CODE_GENERATION, CODE_REVIEW, CODE_EXPLANATION, DEBUGGING, OPTIMIZATION, CONVERSION, or DOCUMENTATION. If the intent is CODE_GENERATION, it uses DeepSeek to generate a complete HTML/CSS/JS project as a structured JSON object with file names and contents. This JSON is parsed and returned as 'artifacts' in the state. If the intent is anything else (review, debugging, etc.), it returns a Markdown explanation without generating project files. This two-step approach prevents the agent from generating code when the user just wants an explanation."

---

## Category 5: Backend Architecture

---

**Q19: What is an API Gateway and why did you use one?**

> **Answer:** "An API Gateway is a single entry point that receives all client requests and routes them to the appropriate backend service. We used it because without it, the frontend would need to know the URLs of all 4 services (auth, chat, agent, billing) separately. The gateway also centralizes cross-cutting concerns: CORS configuration, logging with Morgan, cookie parsing, and authentication are all handled once in the gateway rather than repeated in each service. For the frontend, there's just one base URL — everything else is transparent."

---

**Q20: What is the proxy pattern you use in the gateway?**

> **Answer:** "We use express-http-proxy to forward requests from the gateway to microservices. For auth routes, we do a simple proxy because no authentication is needed. For protected routes, we first run the protect middleware to validate the session, then use a custom proxyWithHeader function that injects the `x-user-id` header before forwarding. This way, downstream services receive the authenticated user's ID without needing to implement their own auth — they just read the header."

---

**Q21: How do microservices communicate with each other?**

> **Answer:** "Two ways in our project. First, HTTP calls via Axios — the Billing service calls the Auth service's `/update-plan` endpoint after a successful payment. Second, shared Redis — all services use the same Redis instance for session data, conversation memory, and rate limiting. For a production system at scale, we'd use message queues (like RabbitMQ or Kafka) for async communication between services to avoid direct dependencies."

---

**Q22: How does rate limiting work in your project?**

> **Answer:** "We use Redis for rate limiting in the agentLimit.js file. When any agent is called, it increments a counter in Redis: `rate:{userId}:{agent}`. The key has a 60-second TTL set on the first increment. Different agents have different limits per minute: chat allows 20 requests, while coding/search/pdf/ppt/vision allow 5. If the counter exceeds the limit, we throw an error with remaining time information. Redis's atomic `INCR` operation ensures this works correctly even with concurrent requests."

---

## Category 6: Frontend Technical

---

**Q23: How does the Artifact panel work?**

> **Answer:** "The Artifact panel (right side of the UI) reads the `artifacts` array from Redux state. When the coding agent generates files, it returns them as a structured array of objects with name and content. These are stored in Redux via dispatch(setArtifacts). The Artifact component renders a Monaco Editor (VS Code's editor) to display the code. It detects the programming language from the file extension. If the artifact has an index.html file, it shows a 'Preview' tab that assembles all files into a complete HTML document and renders it in a sandboxed iframe — giving users a live preview of their generated website."

---

**Q24: How do you implement speech recognition?**

> **Answer:** "We use the browser's built-in Web Speech API — specifically `window.SpeechRecognition`. In ChatInput.jsx, we initialize it in a useEffect with continuous mode and interim results enabled. When the user clicks the mic button, we start recognition. As the user speaks, the `onresult` event fires with the transcript and we update the textarea value in real-time. When the user stops speaking (or clicks mic again), we stop recognition. Since this is a browser API, it works without any external service — completely free. We stored the recognition instance in a useRef so it persists across re-renders."

---

**Q25: What is react-markdown and why did you need it?**

> **Answer:** "AI responses often contain Markdown formatting — headers with #, bullet points with -, code blocks with backticks, bold text with **. React-markdown converts this Markdown text into actual HTML elements. We customized the renderer for each element: code blocks use react-syntax-highlighter for beautiful syntax highlighting, links open in a new tab, images support a lightbox zoom feature. Without react-markdown, the AI's response would appear as raw Markdown text — asterisks and hashtags literally visible — instead of formatted, readable content."

---

## Category 7: Payment & Billing

---

**Q26: How does the Razorpay payment flow work?**

> **Answer:** "Step 1: User selects a plan in the BillingDrawer and clicks purchase. Step 2: Frontend calls POST /api/billing/create-order. Step 3: Backend creates an order with Razorpay API and saves it to MongoDB with 'created' status. Step 4: Frontend opens Razorpay's payment popup using the order ID. Step 5: User enters card/UPI details and pays. Step 6: Razorpay calls our verify-payment endpoint with three fields: orderId, paymentId, and signature. Step 7: We verify the signature by creating an HMAC-SHA256 hash of orderId|paymentId using our secret key and comparing it to Razorpay's signature. If they match, payment is genuine. Step 8: We update payment status to 'paid' in MongoDB and call the Auth service to add credits and update the user's plan. Step 9: Redis session is updated with new credits."

---

**Q27: Why do you verify the Razorpay signature?**

> **Answer:** "Without signature verification, anyone could call our verify-payment endpoint with a fake orderId and claim they paid. The signature is a cryptographic hash created using our secret Razorpay key — only Razorpay knows this key. When we recreate the same hash on our server and it matches Razorpay's hash, we know the payment data wasn't tampered with and the request genuinely came from Razorpay. It's like a wax seal — only the original sender's stamp produces the correct pattern."

---

## Category 8: Database & Storage

---

**Q28: Why MongoDB over PostgreSQL?**

> **Answer:** "Our data is naturally document-shaped. A message can optionally have images, or optionally have artifacts — which are arrays of files, each with a name and content. In PostgreSQL, this would require multiple joins across 4-5 tables. In MongoDB, one message document contains everything. The schema also evolves as we add new agents — adding an 'images' field to messages doesn't require a migration. The trade-off is we sacrifice relational integrity, but for a chat application where each message clearly belongs to one conversation, this is acceptable."

---

**Q29: What is the purpose of the `timestamps: true` option in Mongoose schemas?**

> **Answer:** "When you set timestamps: true in a Mongoose schema, it automatically adds `createdAt` and `updatedAt` fields to every document. Mongoose updates `updatedAt` whenever you save a document. This is useful for showing when a conversation was created, sorting conversations by most recent, or debugging when something changed."

---

## Category 9: DevOps & Deployment

---

**Q30: How would you scale this project for 10,000 concurrent users?**

> **Answer:** "Several steps: First, horizontally scale the Agent service since it's the bottleneck — multiple instances behind a load balancer. Second, Redis Cluster instead of single Redis for session storage. Third, MongoDB Atlas with replica sets for database redundancy. Fourth, add a CDN (CloudFront) for static frontend assets. Fifth, implement streaming responses with Server-Sent Events so users see tokens appear instead of waiting. Sixth, add a message queue (like RabbitMQ) between the gateway and agent service for decoupling. Seventh, consider caching common LLM responses for identical prompts. The current architecture is ready for microservices scaling since each service is already independent."

---

**Q31: What is CORS and why did you configure it?**

> **Answer:** "CORS stands for Cross-Origin Resource Sharing. Browsers by default block JavaScript from making requests to a different domain (e.g., frontend at localhost:5173 can't request localhost:3000). CORS is a security feature. We configured it in the gateway by setting the `origin` to our frontend URL and `credentials: true` to allow cookies to be sent cross-origin. Without this, the browser would block all our API calls."

---

## Category 10: General Technical

---

**Q32: What is the difference between `async/await` and `.then()/.catch()`?**

> **Answer:** "Both handle asynchronous operations in JavaScript. `.then()/.catch()` chains callbacks — hard to read when nested. `async/await` makes async code look synchronous — much more readable, especially when multiple async operations depend on each other. We use async/await throughout the project. For example, in the login handler, we await the token verification, then await the database query, then await the Redis set — all reading top to bottom like synchronous code."

---

**Q33: What is FormData and why do you use it for sending messages?**

> **Answer:** "FormData is a browser API for sending multipart form data — the format needed when uploading files. When a user attaches a PDF or image along with their message, we need to send both text (prompt, conversationId, agent) and binary file data in the same request. Regular JSON can't carry binary files. FormData creates a multipart request that contains both. On the backend, we use Multer middleware to parse this multipart data and save the file temporarily. For text-only messages, FormData still works fine."

---

**Q34: What is Multer?**

> **Answer:** "Multer is a Node.js middleware for handling multipart form data (file uploads). When the frontend sends a FormData request with a file, Express by default can't parse it. Multer intercepts the request, parses the file, and saves it to a temporary directory (our `temp/` folder). It then makes the file available as `req.file` with fields like path, mimetype, originalname, and size. After the agent processes the file (reads the PDF or image), we delete it from disk using `fs.unlinkSync` to clean up."

---

**Q35: What happens if the LLM API call fails?**

> **Answer:** "Every agent is wrapped in a try-catch block. If the API call fails — network error, quota exceeded, or API down — the catch block catches the error and returns the state with an error message in `aiResponse`. The agent controller then saves this as an assistant message with the error text. The user sees the error message in the chat rather than a broken screen. The credit deduction only happens AFTER a successful API call, so users aren't charged for failed requests."

---

## Category 11: Debugging & Challenges

---

**Q36: What was the biggest challenge you faced?**

> **Answer (honest, student-appropriate):** "The most challenging part was implementing the RAG pipeline for PDF analysis. Understanding the concept was easy, but the practical challenges were: choosing the right chunk size and overlap for good retrieval quality, figuring out when to clean up the Qdrant vector collection after the PDF is no longer needed, and handling the file upload lifecycle — the file needs to be temporarily saved by Multer, read by pdf-parse, then deleted. Getting all these pieces to work together without memory leaks took real debugging effort."

---

**Q37: How did you debug issues in this project?**

> **Answer:** "Multiple approaches: Console.log throughout the LangGraph workflow to trace which agent was called and what state looked like at each step. Morgan logger in the gateway to see every incoming HTTP request. Browser DevTools Network tab to inspect API request/response payloads. Redis CLI (`redis-cli monitor`) to watch session operations. Mongoose query logs to debug database operations. For the Razorpay integration, I used Razorpay's test mode with dummy card numbers to simulate payment flows without real money."

---

**Q38: How would you add a new agent (e.g., a YouTube summarizer)?**

> **Answer:** "It's cleanly extensible with LangGraph: Step 1 — create `youtube.agent.js` in the agents folder with a function that accepts state, calls the YouTube transcript API, summarizes it with an LLM, and returns updated state. Step 2 — add a new icon and 'YouTube' option to the agents array in ChatInput.jsx. Step 3 — import and add `workflow.addNode('youtube', youtubeAgent)` in graph.js. Step 4 — add `workflow.addEdge('youtube', '__end__')` and update the conditional edge routing. Step 5 — add a cost for 'youtube' in the COST object in agentLimit.js. The modular design means adding a new agent doesn't touch any existing agent code."

---

## HR + Technical Combination Questions

---

**Q39: Why are you proud of this project?**

> **Answer:** "I'm most proud of the architectural maturity. This isn't a tutorial-following project — the microservices pattern, LangGraph orchestration, Redis session management with two-way references for invalidation, the RAG pipeline, Razorpay signature verification — these are patterns used in real production systems. As a student, learning to think about authentication not just as 'does the user exist?' but as 'how do we revoke access instantly?' or thinking about rate limiting per agent type — these are the mindsets that make good engineers. The fact that it actually works end to end, with billing, multiple AI capabilities, and responsive UI, makes me genuinely proud."

---

**Q40: What was your contribution?**

> **Answer:** "I built the entire project independently. The key design decisions were mine: choosing the microservices pattern over a monolith, implementing Redis sessions over JWT for revocability, using LangGraph for a clean agent workflow over imperative if-else routing, and using Qdrant for semantic PDF search over simple keyword matching. The coding agent's two-step intent classification (identify what the user wants before deciding what to generate) was a design I came up with to prevent code generation when users just want explanations."

---

**Q41: What did you learn from building this?**

> **Answer:** "The biggest lessons: First, building distributed systems is hard — when services need to communicate, you must design for failure. Second, caching is powerful but dangerous — Redis memory gave instant responses but I had to think carefully about cache invalidation when user data changes. Third, AI prompting is engineering — the quality of the LLM's output directly depends on how well the prompt is structured. Fourth, security isn't optional — HTTP-only cookies, CSRF prevention with sameSite, signature verification for payments — these aren't afterthoughts. And fifth, modular code pays dividends — the clean LangGraph design means adding new agents takes 30 minutes instead of rearchitecting everything."

---

**Q42: What would you do differently?**

> **Answer:** "Three things. First, implement Server-Sent Events for streaming from day one — it's a much better user experience and retrofitting streaming into an existing architecture is complex. Second, set up proper monitoring and alerting from the start — Prometheus + Grafana for metrics, so I know when an LLM API is slow or Redis memory is getting full. Third, write integration tests for the agent workflows — the LangGraph graph is tested manually right now, but automated tests would catch regressions when prompts are updated."

---

# PART 12 — MOCK INTERVIEW QUESTIONS (3 per major topic)

## After Reading About Architecture

**Mock Q1:** "If the Agent service goes down, what happens?"
> **Answer:** "All requests to /api/agent would fail. The Gateway would return a 502 proxy error. Since agent, auth, chat, and billing are separate services, the other services remain unaffected — users can still see their conversation history, they just can't send new messages. The frontend's error handling should catch this and show an appropriate error message. This is one of the key benefits of microservices — partial failure instead of total failure."

**Mock Q2:** "How many databases does your project use?"
> **Answer:** "MongoDB for persistent data (users, conversations, messages, payments). Redis for fast in-memory data (sessions, message cache, rate limit counters). Qdrant for vector embeddings (PDF RAG). AWS S3 for object storage (generated images). So 4 different storage systems, each chosen for its specific strength."

**Mock Q3:** "How do your frontend and backend handle CORS?"
> **Answer:** "The gateway configures CORS with the specific frontend origin URL and credentials:true. The frontend's Axios instance has withCredentials: true. This combination allows the browser to send cookies across origins (localhost:5173 to localhost:3000) which is needed for session authentication. We use a specific origin rather than wildcard '*' because credentials can't be sent to a wildcard origin — browsers refuse it as a security measure."

---

# PART 13 — NIGHT BEFORE INTERVIEW REVISION SHEET

## A. 1-Page Quick Revision

### Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| State | Redux Toolkit (userSlice, conversationSlice, messageSlice) |
| Auth Client | Firebase Google Sign-In |
| HTTP Client | Axios (withCredentials:true) |
| Animation | Motion (Framer Motion) |
| Code Editor | Monaco Editor (@monaco-editor/react) |
| Gateway | Express + express-http-proxy + Morgan |
| Auth Backend | Node/Express + Firebase Admin SDK |
| Chat Backend | Node/Express + Mongoose |
| Agent Backend | Node/Express + LangChain + LangGraph |
| Billing | Node/Express + Razorpay |
| Database | MongoDB (3 DBs: auth, chat, billing) |
| Cache/Sessions | Redis |
| Vector DB | Qdrant |
| File Storage | AWS S3 + pre-signed URLs |
| LLMs | Groq (LLaMA), Gemini 2.5, DeepSeek (OpenRouter) |
| Web Search | Tavily |
| Payments | Razorpay |
| Containerization | Docker (docker-compose for Redis) |

---

### Main Features
- 🔐 Google Sign-In → Redis session-based auth
- 💬 Persistent chat with conversation history
- 🤖 Auto-routing to 8 specialized AI agents
- 🌐 Web search with real-time results (Tavily)
- 💻 Code generation with Monaco Editor + live preview
- 📄 PDF Q&A with RAG (Qdrant vector search)
- 🖼️ AI image generation (Pollinations) → stored in S3
- 🎤 Voice input (Web Speech API)
- 📊 PowerPoint generation
- 💳 Credit system with Razorpay payment plans
- ⚡ Rate limiting per agent (Redis)

---

### Auth Flow
```
Google Popup → Firebase Token → Backend verifies → MongoDB user → 
Redis session (7 days) → HTTP-only cookie → Redux state
```

### Message Flow
```
User types → FormData → Gateway (protect middleware) → 
Agent Service → LangGraph → Router → Agent → 
MongoDB save → Response to frontend → Redux addMessage
```

### Payment Flow
```
Plan selected → Create Razorpay order → Payment popup → 
User pays → Verify signature (HMAC-SHA256) → 
Update MongoDB payment status → Auth service updates credits → 
Redis session refreshed
```

---

## B. 5-Minute Revision Bullets

- **Project:** Multi-agent AI platform — chat, search, code, PDF, PPT, vision, image analysis
- **Architecture:** Microservices — Gateway + Auth + Chat + Agent + Billing services
- **Auth:** Firebase Google → session ID → Redis → HTTP-only cookie
- **Redis:** 3 uses — sessions, conversation memory cache, rate limiting
- **LangGraph:** Directed graph → Router node → Conditional edges → Agent nodes
- **Agents:** chat (Groq), search (Tavily→chat), coding (DeepSeek intent-first), pdf (RAG+Qdrant), vision (Pollinations→S3), imageAnalyzer (Gemini), pptAgent, pdfRag
- **MongoDB:** Users (auth db), Conversations + Messages (chat db), Payments (billing db)
- **Redux slices:** userSlice, conversationSlice, messageSlice — all accessed via useSelector, updated via dispatch
- **Hooks used:** useState (local state), useEffect (side effects), useSelector (read Redux), useDispatch (write Redux), useRef (DOM refs/persist values)
- **RAG:** PDF → pdf-parse → chunk → embed → Qdrant → similarity search → LLM with context
- **Payment:** Create Razorpay order → user pays → verify HMAC signature → update credits
- **Rate limiting:** Redis INCR per userId+agent, 60s TTL window

---

## C. 30-Second Emergency Answers

| Technology | 30-Second Answer |
|---|---|
| **React** | "UI library for building reusable components. We use it to build SideBar, ChatArea, MessageBubble etc. as independent pieces." |
| **Redux Toolkit** | "Global state manager. Stores user info, conversations, and messages so any component can access them without prop drilling." |
| **Firebase** | "We use only its authentication — Google OAuth popup generates an ID token that our backend verifies with Firebase Admin SDK." |
| **Redis** | "In-memory store used for 3 things: session storage (7-day TTL), conversation memory cache (24h TTL), and per-agent rate limiting (60s window)." |
| **MongoDB** | "NoSQL database storing users, conversations, messages, and payments as JSON documents with flexible schema." |
| **LangGraph** | "Directed graph framework for AI agent orchestration. We define nodes (agents) and edges (transitions), then compile into an executable workflow." |
| **Microservices** | "Architecture pattern where Auth, Chat, Agent, and Billing are independent services. Each can be deployed and scaled independently." |
| **API Gateway** | "Single entry point for all requests. Handles CORS, logging, auth, and routes to the right microservice." |
| **Qdrant** | "Vector database for PDF RAG. Stores text chunks as embeddings, finds semantically similar chunks for any user query." |
| **Razorpay** | "Payment gateway. We create an order, user pays in popup, we verify the cryptographic signature, then update their credits." |
| **Tailwind CSS** | "Utility-first CSS framework. We style by applying class names directly in JSX — no separate CSS files needed." |
| **Axios** | "HTTP client configured with withCredentials:true so session cookies are sent automatically on every API request." |

---

> [!TIP]
> **Night Before Strategy:** Read sections 7 (auth), 4.3 (gateway), 4.6 (graph), and 11 (Q&A). Sleep well. The answers are already in your head from building this project — these words are just organizing what you already know.

> [!NOTE]
> **Confidence tip:** When an interviewer asks "why did you choose X?", always structure your answer as: "We chose X because [specific reason for this project], compared to [alternative], which would have [downside]." This shows you evaluated options, not just copied a tutorial.
