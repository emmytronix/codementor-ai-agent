// src/services/openaiService.ts
import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callOpenRouter(messages: Message[]): Promise<string> {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'meta-llama/llama-4-maverick:free', // ✅ UPDATED TO WORKING FREE MODEL
        messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://telex.im',
          'X-Title': 'CodeMentor AI',
        },
        timeout: 30000,
      }
    );

    return response.data.choices[0]?.message?.content || 'No response generated.';
  } catch (error: any) {
    console.error('❌ OpenRouter Error:', error.response?.data || error.message);
    throw error;
  }
}

export async function generateTutorial(topic: string): Promise<string> {
  try {
    console.log('📚 Generating tutorial for:', topic);

    const messages: Message[] = [
      {
        role: 'system',
        content: `You are CodeMentor, an expert programming tutor. Create concise, engaging tutorials.

Format your response as:
1. 🎯 Concept Overview (2-3 sentences)
2. 💡 Why It Matters (real-world use)
3. 📝 Example Code (well-commented, runnable)
4. 🎓 Practice Challenge (small exercise)
5. 🚀 Next Steps

Keep under 400 words. Use proper markdown code blocks with language tags.`
      },
      {
        role: 'user',
        content: `Create an interactive tutorial for: ${topic}`
      }
    ];

    const response = await callOpenRouter(messages);
    console.log('✅ Tutorial generated successfully');
    return response;

  } catch (error: any) {
    console.error('❌ Tutorial generation failed:', (error as any).message);
    
    // Fallback response
    return `📚 **Learning: ${topic}**

🎯 **Concept Overview:**
${topic} is a fundamental programming concept that helps you write better, more efficient code. It's essential for modern development and used widely across the industry.

💡 **Why It Matters:**
Understanding ${topic} will help you:
- Write cleaner, more maintainable code
- Solve complex problems efficiently
- Build robust applications
- Advance your programming skills

📝 **Example Code:**
\`\`\`javascript
// ${topic} - Practical Example
function example() {
  // Demonstrating ${topic}
  console.log('Learning ${topic}!');
  
  // Apply the concept
  const result = process();
  return result;
}

// Try it out!
example();
\`\`\`

🎓 **Practice Challenge:**
Build a small project using ${topic}. Start simple and gradually add complexity!

🚀 **Next Steps:**
1. Practice with real examples
2. Try /challenge for coding exercises
3. Build something with ${topic}
4. Keep learning! 💪`;
  }
}

export async function answerQuestion(question: string): Promise<string> {
  try {
    console.log('💬 Answering question:', question);

    const messages: Message[] = [
      {
        role: 'system',
        content: 'You are CodeMentor, a helpful programming tutor. Provide clear, concise answers with code examples when relevant. Be encouraging and patient. Keep responses under 300 words.'
      },
      {
        role: 'user',
        content: question
      }
    ];

    const response = await callOpenRouter(messages);
    console.log('✅ Answer generated successfully');
    return response;

  } catch (error: any) {
    console.error('❌ Answer generation failed:', (error as any).message);
    
    // Fallback response
    return `👋 **Great question!**

You asked: "${question}"

💡 **Quick Tips:**
- Break the problem into smaller parts
- Practice with code examples
- Use /learn [topic] for detailed tutorials

Try /challenge easy for practice exercises! 🚀`;
  }
}