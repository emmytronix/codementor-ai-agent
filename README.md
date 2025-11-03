# 🎓 CodeMentor AI Agent

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-412991?style=for-the-badge&logo=ai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> 🤖 An interactive AI-powered programming tutor that makes learning to code engaging and fun! Built for Telex.im using the Mastra A2A framework with Meta's Llama 4 Maverick AI.

---

## 📖 Overview

CodeMentor is an intelligent programming tutor that combines AI-powered personalized learning with gamification elements to create an engaging educational experience. Whether you're a beginner learning your first programming language or an experienced developer exploring new concepts, CodeMentor adapts to your needs.

### 🎯 Key Highlights

- **FREE AI Integration** - Powered by Meta Llama 4 Maverick via OpenRouter
- **Interactive Learning** - Command-based interface with natural language support
- **Gamified Experience** - XP system, achievements, and learning streaks
- **Practical Challenges** - Curated coding problems across multiple difficulty levels
- **Progress Tracking** - Monitor your learning journey with detailed statistics

---

## ✨ Features

### 🤖 AI-Powered Tutorials
Get personalized, context-aware tutorials on any programming topic. Each tutorial includes:
- Clear concept explanations
- Real-world applications
- Commented code examples
- Practice challenges
- Next steps guidance

### 🎯 Coding Challenges
Practice your skills with curated challenges in three difficulty levels:
- **Easy** - String manipulation, arrays, basic algorithms
- **Medium** - Logic problems, pattern recognition, data structures
- **Hard** - Complex algorithms, optimization, advanced concepts

### 📊 Progress Tracking
Monitor your growth with comprehensive statistics:
- Topics completed
- Challenges solved
- Total XP earned
- Learning streaks
- Unlocked achievements

### 🏆 Achievement System
Unlock achievements as you learn:
- 🎓 **First Steps** - Complete your first topic
- 📚 **Knowledge Seeker** - Complete 5 topics
- 🌟 **Learning Master** - Complete 10 topics
- 💪 **Problem Solver** - Solve your first challenge
- 🔥 **Challenge Champion** - Solve 10 challenges
- ⭐ **XP Master** - Earn 500+ XP
- 🔥 **Week Warrior** - Maintain a 7-day streak

### 💬 Natural Language Q&A
Ask programming questions in plain English and get clear, helpful answers with code examples.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Language** | TypeScript |
| **Runtime** | Node.js v22+ |
| **Framework** | Express.js |
| **AI Model** | Meta Llama 4 Maverick (17B parameters) |
| **AI Provider** | OpenRouter (FREE tier) |
| **Integration** | Telex.im A2A Protocol |
| **Deployment** | Railway |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenRouter API key (free at [openrouter.ai](https://openrouter.ai))
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Emmytronix/codementor-ai-agent.git

# Navigate to project directory
cd codementor-ai-agent

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
# OpenRouter API Key (FREE)
OPENROUTER_API_KEY=your-openrouter-api-key-here

# Telex Configuration
TELEX_CHANNEL_ID=your-channel-id
TELEX_API_URL=https://api.telex.im

# Server Configuration
PORT=3000
NODE_ENV=development

# Feature Flags
ENABLE_DAILY_QUESTS=true
ENABLE_LEADERBOARD=true
```

### Running Locally

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

The server will start at `http://localhost:3000`

### Testing the A2A Endpoint

```bash
curl -X POST http://localhost:3000/a2a/agent/codeMentorAgent \
  -H "Content-Type: application/json" \
  -d '{"message":"/help","userId":"testuser"}'
```

---

## 💡 Usage

### Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/help` | Display all available commands | `/help` |
| `/learn [topic]` | Get an AI-generated tutorial | `/learn promises` |
| `/challenge [difficulty]` | Get a coding challenge | `/challenge easy` |
| `/progress` | View your learning statistics | `/progress` |

### Natural Language Queries

You can also ask questions naturally:
- "How do closures work in JavaScript?"
- "Explain async/await"
- "What are promises?"

### Example Interactions

**Learning a Topic:**
```
User: /learn promises

CodeMentor: 📚 Learning: Promises

🎯 Concept Overview:
A Promise is an object representing the eventual completion...
[AI-generated tutorial follows]
```

**Getting a Challenge:**
```
User: /challenge medium

CodeMentor: 🎯 MEDIUM CHALLENGE

**FizzBuzz**
Print numbers 1-100. For multiples of 3 print "Fizz"...
[Challenge details follow]
```

**Checking Progress:**
```
User: /progress

CodeMentor: 📊 Your Learning Journey

🎓 Topics Completed: 5
💪 Challenges Solved: 3
⭐ Total XP: 175
🔥 Streak: 3 days

🏆 Achievements:
✨ 🎓 First Steps!
✨ 💪 Problem Solver!
```

---

## 🏗️ Project Structure

```
codementor-ai-agent/
├── src/
│   ├── index.ts                    # Main server & A2A endpoint
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   ├── services/
│   │   ├── openaiService.ts        # AI integration (OpenRouter)
│   │   ├── progressTracker.ts      # User progress & achievements
│   │   └── challengeManager.ts     # Coding challenges database
│   ├── utils/
│   │   └── intentParser.ts         # Command parsing logic
│   └── integrations/
│       └── telexIntegration.ts     # Telex API integration
├── dist/                            # Compiled JavaScript (generated)
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript configuration
├── .env                             # Environment variables (not in git)
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## 🌐 Deployment

### Deploy to Railway

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Railway Project:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `codementor-ai-agent`

3. **Add Environment Variables:**
   ```
   OPENROUTER_API_KEY=your-key
   TELEX_CHANNEL_ID=your-channel-id
   TELEX_API_URL=https://api.telex.im
   NODE_ENV=production
   PORT=3000
   ```

4. **Generate Domain:**
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Copy your Railway URL

5. **Update Telex Configuration:**
   - Go to Telex.im → AI Coworkers → CodeMentor
   - Update webhook URL with your Railway URL
   - Save and publish

---

## 🔧 API Reference

### A2A Endpoint

**POST** `/a2a/agent/codeMentorAgent`

**Request Body:**
```json
{
  "message": "string",
  "userId": "string"
}
```

**Response:**
```json
{
  "response": "string",
  "metadata": {
    "userId": "string",
    "timestamp": "ISO 8601 string",
    "intent": "learn | challenge | progress | help | general"
  }
}
```

### Health Check

**GET** `/health`

**Response:**
```json
{
  "status": "healthy",
  "agent": "CodeMentor",
  "timestamp": "ISO 8601 string",
  "uptime": "number (seconds)"
}
```

---

## 🎮 Gamification System

### XP Rewards

| Action | XP Earned |
|--------|-----------|
| Complete a topic | 10 XP |
| Easy challenge | 25 XP |
| Medium challenge | 50 XP |
| Hard challenge | 100 XP |

### Achievements

- **First Steps** (1 topic completed)
- **Knowledge Seeker** (5 topics completed)
- **Learning Master** (10 topics completed)
- **Problem Solver** (1 challenge solved)
- **Challenge Champion** (10 challenges solved)
- **XP Master** (500+ XP earned)
- **Week Warrior** (7-day streak maintained)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

---

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Emmanuel Udodirim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Emmy-way**

- GitHub: [@Emmytronix](https://github.com/Emmytronix)
- Project: [CodeMentor AI Agent](https://github.com/Emmytronix/codementor-ai-agent)

---

## 🙏 Acknowledgments

- **Meta AI** - For Llama 4 Maverick model
- **OpenRouter** - For free AI API access
- **Telex.im** - For the A2A integration platform
- **Mastra** - For the A2A framework
- **Railway** - For simple deployment platform

---

## 🐛 Known Issues

- Local network DNS resolution may prevent OpenRouter API calls on some systems (works fine on Railway deployment)
- Streak tracking resets after 48 hours of inactivity

---

## 🗺️ Roadmap

- [ ] Multi-language support (Python, Java, C++)
- [ ] Visual code execution environment
- [ ] Peer-to-peer challenge mode
- [ ] Integration with popular coding platforms
- [ ] Mobile-friendly interface
- [ ] Advanced analytics dashboard
- [ ] Custom challenge creation
- [ ] Team learning features

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/Emmytronix/codementor-ai-agent?style=social)
![GitHub forks](https://img.shields.io/github/forks/Emmytronix/codementor-ai-agent?style=social)
![GitHub issues](https://img.shields.io/github/issues/Emmytronix/codementor-ai-agent)
![GitHub last commit](https://img.shields.io/github/last-commit/Emmytronix/codementor-ai-agent)

---

<div align="center">

**⭐ If you find this project helpful, please give it a star! ⭐**

Made with ❤️ by Emmanuel Udodirim for developers learning to code

[Report Bug](https://github.com/Emmytronix/codementor-ai-agent/issues) · [Request Feature](https://github.com/Emmytronix/codementor-ai-agent/issues)

</div>