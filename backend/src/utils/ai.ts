import axios from "axios";

// Multi-AI Integration: Groq (fastest) or Google Gemini (most reliable)
// Get FREE API keys:
// - Groq: https://console.groq.com
// - Gemini: https://aistudio.google.com/app/apikey
export async function generateAIResponse(userMessage: string, conversationHistory: any[] = []): Promise<string> {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  // Try Groq first (fastest)
  if (GROQ_API_KEY) {
    try {
      return await generateGroqResponse(userMessage, conversationHistory);
    } catch (error) {
      console.error('Groq API error:', error);
      // Try Gemini as fallback
      if (GEMINI_API_KEY) {
        try {
          return await generateGeminiResponse(userMessage, conversationHistory);
        } catch (geminiError) {
          console.error('Gemini API error:', geminiError);
        }
      }
    }
  }
  
  // Try Gemini if Groq not available
  if (GEMINI_API_KEY) {
    try {
      return await generateGeminiResponse(userMessage, conversationHistory);
    } catch (error) {
      console.error('Gemini API error:', error);
    }
  }
  
  // Fallback to pattern matching if no API keys
  return generatePatternResponse(userMessage);
}

// Groq AI Integration (FREE and FASTEST!)
async function generateGroqResponse(userMessage: string, conversationHistory: any[]): Promise<string> {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  
  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.1-70b-versatile',
      messages: [
        { 
          role: 'system', 
          content: 'You are Nova, a helpful and friendly AI assistant. You help users with productivity, planning, creative tasks, and answering questions. Be concise but informative. Use formatting like bullet points and numbered lists when appropriate.' 
        },
        ...conversationHistory.slice(-10),
        { role: 'user', content: userMessage }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    },
    {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  return response.data.choices[0].message.content;
}

// Google Gemini Integration (FREE and RELIABLE!)
async function generateGeminiResponse(userMessage: string, conversationHistory: any[]): Promise<string> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  // Format conversation history for Gemini
  const contents = conversationHistory.slice(-10).map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
  
  // Add current message
  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });
  
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      contents,
      systemInstruction: {
        parts: [{
          text: 'You are Nova, a helpful and friendly AI assistant. You help users with productivity, planning, creative tasks, and answering questions. Be concise but informative. Use formatting like bullet points and numbered lists when appropriate.'
        }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    }
  );
  
  return response.data.candidates[0].content.parts[0].text;
}

// Pattern matching fallback (works without API key)
function generatePatternResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Motivation and inspiration
  if (lowerMessage.includes("motivat") || lowerMessage.includes("inspir") || lowerMessage.includes("stay focused")) {
    return `Here are powerful ways to stay motivated:

**1. Set Clear Goals**
- Break big goals into small, achievable steps
- Write them down and review daily
- Celebrate small wins along the way

**2. Create a Routine**
- Start your day with a morning ritual
- Build consistent habits
- Use the "2-minute rule" to get started

**3. Find Your Why**
- Connect tasks to your bigger purpose
- Visualize your success
- Remember why you started

**4. Stay Accountable**
- Share goals with friends or mentors
- Track your progress visually
- Join communities with similar goals

**5. Manage Energy, Not Just Time**
- Take regular breaks
- Exercise and eat well
- Get enough sleep (7-9 hours)

**6. Eliminate Distractions**
- Turn off notifications
- Create a dedicated workspace
- Use website blockers during focus time

**7. Reward Yourself**
- Set up a reward system
- Take breaks guilt-free
- Treat yourself after milestones

**Remember**: Motivation is like a muscle - it gets stronger with practice. Start small, be consistent, and don't be too hard on yourself!

What specific area would you like to work on?`;
  }
  
  // Planning related
  if (lowerMessage.includes("plan") && lowerMessage.includes("day")) {
    return `I'd be happy to help you plan your day! Here's a suggested structure:

1. **Morning (6-9 AM)**: Start with a healthy breakfast and review your goals
2. **Mid-Morning (9-12 PM)**: Focus on your most important tasks
3. **Afternoon (12-3 PM)**: Lunch break and collaborative work
4. **Late Afternoon (3-6 PM)**: Meetings and lighter tasks
5. **Evening (6+ PM)**: Wind down, exercise, and personal time

What specific activities would you like to include in your schedule?`;
  }
  
  // Task management
  if (lowerMessage.includes("task") || lowerMessage.includes("todo")) {
    return "I can help you manage your tasks! You can create, organize, and track tasks in the Tasks section. Would you like me to guide you through creating a task, or do you have specific questions about task management?";
  }
  
  // Note taking
  if (lowerMessage.includes("note")) {
    return "Notes are a great way to capture your thoughts! You can create colorful notes in the Notes section. Each note can have a title, content, and custom color. Would you like tips on organizing your notes effectively?";
  }
  
  // Productivity tips
  if (lowerMessage.includes("productivity") || lowerMessage.includes("productive")) {
    return `Here are some proven productivity tips:

1. **Time Blocking**: Schedule specific time slots for different tasks
2. **Pomodoro Technique**: Work in 25-minute focused sessions with 5-minute breaks
3. **Prioritize**: Use the Eisenhower Matrix (urgent/important)
4. **Minimize Distractions**: Turn off notifications during focus time
5. **Take Breaks**: Regular breaks improve focus and creativity

Which area would you like to explore further?`;
  }
  
  // Creative writing
  if (lowerMessage.includes("story") || lowerMessage.includes("creative")) {
    return `I'd love to help with creative writing! Here's a story starter:

**The Mysterious Door**

In the heart of an ancient library, behind rows of dusty books, Sarah discovered a door that wasn't there yesterday. Its surface shimmered with an otherworldly glow, and strange symbols danced across its frame. As she reached for the handle, she heard a whisper: "Only those who seek knowledge may enter..."

Would you like me to continue this story, or would you prefer to write about a different theme?`;
  }
  
  // Science explanations
  if (lowerMessage.includes("quantum") || lowerMessage.includes("physics")) {
    return `Quantum physics is fascinating! Here's a simple explanation:

**Quantum Physics Basics:**

Quantum physics studies the behavior of matter and energy at the smallest scales (atoms and subatomic particles). Key concepts include:

1. **Wave-Particle Duality**: Particles can behave as both waves and particles
2. **Superposition**: Particles can exist in multiple states simultaneously
3. **Entanglement**: Particles can be connected across vast distances
4. **Uncertainty Principle**: We cannot know both position and momentum precisely

Think of it like this: At the quantum level, reality is probabilistic rather than deterministic. It's like a coin that's both heads and tails until you look at it!

What specific aspect interests you most?`;
  }
  
  // Greetings
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! I'm Nova, your AI assistant. I'm here to help you with planning, productivity, creative tasks, and answering questions. What can I help you with today?";
  }
  
  // Default response with helpful suggestions
  return `I'm here to help! I can assist you with:

• **Planning & Scheduling**: Help organize your day or week
• **Task Management**: Create and track your to-dos
• **Creative Writing**: Generate stories or content ideas
• **Learning**: Explain concepts and answer questions
• **Productivity**: Share tips and strategies
• **Motivation**: Tips to stay focused and inspired

What would you like to explore?`;
}
