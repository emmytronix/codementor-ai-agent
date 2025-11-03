// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import { parseUserIntent } from './utils/intentParser';
import { UserProgressManager } from './services/progressTracker';
import { ChallengeManager } from './services/challengeManager';
import { generateTutorial, answerQuestion } from './services/openaiService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize managers
const progressManager = new UserProgressManager();
const challengeManager = new ChallengeManager();

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    agent: 'CodeMentor',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// A2A endpoint for Telex
app.post('/a2a/agent/codeMentorAgent', async (req, res) => {
  try {
    const { message, userId } = req.body;
    
    console.log('📨 Received:', message);
    console.log('👤 User:', userId);

    if (!message || !userId) {
      return res.status(400).json({ error: 'Missing message or userId' });
    }

    const intent = parseUserIntent(message);
    console.log('🎯 Intent:', intent.type);

    let response: string;

    switch (intent.type) {
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
        console.log('📚 Generating tutorial for:', intent.topic);
        response = await generateTutorial(intent.topic || 'JavaScript');
        progressManager.addTopic(userId);
        progressManager.updateStreak(userId);
        break;

      case 'challenge':
        const challenge = challengeManager.getChallenge(intent.difficulty || 'medium');
        response = `🎯 **${challenge.difficulty.toUpperCase()} CHALLENGE**

**${challenge.title}**

${challenge.description}

**Example:**
\`\`\`
Input: ${challenge.example.input}
Output: ${challenge.example.output}
\`\`\`

💡 **Hint:** ${challenge.hints[0]}

Reply with your solution when ready! Good luck! 🚀`;
        progressManager.addChallenge(userId, challenge.difficulty);
        break;

      case 'progress':
        const progress = progressManager.getProgress(userId);
        response = `📊 **Your Learning Journey**

🎓 **Topics Completed:** ${progress.topicsCompleted}
💪 **Challenges Solved:** ${progress.challengesSolved}
⭐ **Total XP:** ${progress.xp}
🔥 **Streak:** ${progress.streak} days

🏆 **Achievements:**
${progress.achievements.length > 0 
  ? progress.achievements.map(a => `✨ ${a}`).join('\n') 
  : '📝 Complete challenges to unlock achievements!'}

Keep up the great work, ${userId}! 🚀`;
        break;

      case 'general':
      default:
        console.log('💬 Answering general question');
        response = await answerQuestion(message);
        break;
    }

    console.log('✅ Response generated');
    
    res.json({
      response,
      metadata: {
        userId,
        timestamp: new Date().toISOString(),
        intent: intent.type,
      },
    });

  } catch (error: any) {
    console.error('❌ ERROR:', error);
    console.error('Stack:', error.stack);
    
    res.status(500).json({
      error: 'Failed to process request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CodeMentor Agent running on port ${PORT}`);
  console.log(`📡 A2A endpoint: http://localhost:${PORT}/a2a/agent/codeMentorAgent`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Ready to mentor!`);
});