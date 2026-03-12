const { onRequest } = require('firebase-functions/v2/https');

function generateMockReply(body) {
  let userText = '';
  const messages = body?.messages || [];
  for (const msg of messages) {
    if (msg.role === 'user') {
      if (typeof msg.content === 'string') {
        userText = msg.content;
      } else if (Array.isArray(msg.content)) {
        for (const part of msg.content) {
          if (part.type === 'text') userText = part.text;
        }
      }
    }
  }
  const lower = userText.toLowerCase();

  if (lower.includes('progress') || lower.includes('how am i doing')) {
    return "You're making great progress! Keep focusing on system design fundamentals this week. Check your Roadmap page to see which items are next on your list.";
  }
  if (lower.includes('system design') || lower.includes('design')) {
    return 'Key system design topics for senior interviews:\n\n- **Load balancing** — Round-robin, consistent hashing, L4 vs L7\n- **Caching strategies** — Write-through, write-back, cache invalidation\n- **Database sharding** — Horizontal partitioning, shard keys\n- **Microservices** — Service discovery, API gateways, circuit breakers\n\nFor staff level, also prepare for capacity planning and cross-team technical strategy.';
  }
  if (lower.includes('behavioral') || lower.includes('star')) {
    return 'The STAR method is essential for behavioral interviews:\n\n- **S**ituation: Set the context\n- **T**ask: Your responsibility\n- **A**ction: What you specifically did\n- **R**esult: Measurable outcome\n\nPrepare 8 stories covering leadership, conflict resolution, failure & learning, and innovation. Check the Behavioral page for the full list of categories.';
  }
  if (lower.includes('quiz') || lower.includes('question') || lower.includes('mock interview')) {
    return "Here's a practice question:\n\n> \"Tell me about a time you had to make a technical decision with incomplete information.\"\n\nUse the STAR method to structure your answer. Focus on the **Action** — what did *you* specifically do, and why?";
  }

  return "I'm your Interview Prep Coach! I can help you with:\n\n- **Study plans** — What to focus on next based on your progress\n- **System design** — Key concepts and patterns\n- **Behavioral prep** — STAR method and practice questions\n- **Mock questions** — Try asking me to quiz you!\n\nWhat would you like to work on?";
}

exports.copilotkit = onRequest(
  { cors: true, region: 'us-central1' },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const reply = generateMockReply(req.body);

    // CopilotKit-compatible streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const events = [
      { type: 'text-message-start', id: 'mock-msg' },
      { type: 'text-message-content', id: 'mock-msg', content: reply },
      { type: 'text-message-end', id: 'mock-msg' },
    ];

    for (const event of events) {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }
    res.end();
  }
);
