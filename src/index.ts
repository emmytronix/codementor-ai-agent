// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import { parseIntent } from './utils/intentParser';
import { generateTutorial, answerQuestion } from './services/openaiService';
import { getRandomChallenge } from './services/challengeManager';
import { trackProgress, getProgress } from './services/progressTracker';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    agent: 'CodeMentor',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// A2A endpoint for CodeMentor agent
app.post('/a2a/agent/codeMentorAgent', async (req, res) => {
  try {
    const { message, userId } = req.body;

    console.log('📨 Received:', message);
    console.log('👤 User:', userId);

    if (!message || !userId) {
      return res.status(400).json({ 
        error: 'Missing required fields: message and userId' 
      });
    }

    // Parse user intent
    const parsed = parseIntent(message);
    console.log('🎯 Intent:', parsed.intent);

    let response = '';

    switch (parsed.intent) {
      case 'help':
        response = `🤖 **CodeMentor Commands**

📚 \`/learn [topic]\` - Get an interactive tutorial
   Example: \`/learn promises\`

🎯 \`/challenge easy\` - Get coding challenges
   Difficulties: easy, medium, hard

📊 \`/progress\` - View your learning stats

💬 **Or just ask naturally!**
   "How do closures work?"
   "Explain async/await"

Let's code together! 🚀`;
        break;

      case 'learn':
        console.log('📚 Learning topic:', parsed.topic);
        if (parsed.topic) {
          response = await generateTutorial(parsed.topic);
          await trackProgress(userId, 'topic', parsed.topic);
        } else {
          response = `📚 **Let's learn something!**

Use: \`/learn [topic]\`

Example topics:
- \`/learn promises\`
- \`/learn async/await\`
- \`/learn closures\`
- \`/learn arrays\`

What would you like to learn? 🎓`;
        }
        break;

      case 'challenge':
        console.log('🎯 Challenge difficulty:', parsed.difficulty);
        const challenge = getRandomChallenge(parsed.difficulty || 'easy');
        response = `🎯 **${challenge.difficulty.toUpperCase()} CHALLENGE**

**${challenge.title}**

${challenge.description}

**Example:**
\`\`\`
${challenge.example}
\`\`\`

💡 **Hint:** ${challenge.hint}

Reply with your solution when ready! Good luck! 🚀`;
        
        await trackProgress(userId, 'challenge', challenge.id);
        break;

      case 'progress':
        console.log('📊 Checking progress for:', userId);
        const progress = await getProgress(userId);
        
        const achievementsList = progress.achievements.length > 0
          ? progress.achievements.map((a: any) => `✨ ${a}`).join('\n')
          : 'No achievements yet - keep learning!';

        response = `📊 **Your Learning Journey**

🎓 **Topics Completed:** ${progress.topicsCompleted}
💪 **Challenges Solved:** ${progress.challengesSolved}
⭐ **Total XP:** ${progress.totalXP}
🔥 **Streak:** ${progress.currentStreak} days

🏆 **Achievements:**
${achievementsList}

Keep up the great work, ${userId}! 🚀`;
        break;

      case 'general':
        console.log('💬 Answering general question');
        response = await answerQuestion(message);
        break;

      default:
        response = `👋 Hey! I'm CodeMentor, your AI programming tutor!

Try:
- \`/help\` - See all commands
- \`/learn [topic]\` - Learn something new
- \`/challenge easy\` - Practice coding

Or just ask me a question! 🚀`;
    }

    console.log('✅ Response generated');

    res.json({
      response,
      metadata: {
        userId,
        timestamp: new Date().toISOString(),
        intent: parsed.intent
      }
    });

  } catch (error: any) {
    console.error('❌ Error processing request:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CodeMentor Agent running on port ${PORT}`);
  console.log(`📡 A2A endpoint: http://localhost:${PORT}/a2a/agent/codeMentorAgent`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('✅ Ready to mentor!');
});