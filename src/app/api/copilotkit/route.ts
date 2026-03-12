import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from '@copilotkit/runtime';
import { NextRequest } from 'next/server';

const IS_MOCK =
  !process.env.OPENAI_API_KEY ||
  process.env.OPENAI_API_KEY.startsWith('sk-placeholder');

function buildRuntime() {
  if (!IS_MOCK) {
    const serviceAdapter = new OpenAIAdapter();
    const runtime = new CopilotRuntime();
    return { runtime, serviceAdapter };
  }

  // Mock mode: adapter provides a MockLanguageModelV3 via getLanguageModel().
  // The CopilotKit runtime creates a BuiltInAgent from it automatically.
  const { MockLanguageModelV3, simulateReadableStream } = require('ai/test');

  const mockModel = new MockLanguageModelV3({
    provider: 'mock',
    modelId: 'interview-coach-mock',
    doGenerate: async ({ prompt }: { prompt: unknown[] }) => {
      const reply = generateMockReply(prompt);
      return {
        text: reply,
        finishReason: 'stop' as const,
        usage: { inputTokens: 10, outputTokens: reply.length },
        warnings: [],
      };
    },
    doStream: async ({ prompt }: { prompt: unknown[] }) => {
      const reply = generateMockReply(prompt);
      const textId = `mock-${Date.now()}`;
      return {
        stream: simulateReadableStream({
          chunks: [
            { type: 'stream-start' as const, warnings: [] },
            { type: 'text-start' as const, id: textId },
            { type: 'text-delta' as const, id: textId, delta: reply },
            { type: 'text-end' as const, id: textId },
            {
              type: 'finish' as const,
              finishReason: 'stop' as const,
              usage: { inputTokens: 10, outputTokens: reply.length },
            },
          ],
          chunkDelayInMs: 50,
        }),
      };
    },
  });

  // Custom adapter: name != "EmptyAdapter" so runtime creates BuiltInAgent
  const serviceAdapter = {
    name: 'MockAdapter',
    getLanguageModel: () => mockModel,
    async process(request: { threadId?: string }) {
      return { threadId: request.threadId || 'mock-thread' };
    },
  };

  const runtime = new CopilotRuntime();
  return { runtime, serviceAdapter };
}

function generateMockReply(prompt: unknown[]): string {
  let userText = '';
  for (const msg of prompt) {
    const m = msg as { role?: string; content?: unknown };
    if (m.role === 'user' && typeof m.content === 'string') {
      userText = m.content;
    } else if (m.role === 'user' && Array.isArray(m.content)) {
      for (const part of m.content) {
        if ((part as { type?: string }).type === 'text') {
          userText = (part as { text: string }).text;
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

const { runtime, serviceAdapter } = buildRuntime();

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: '/api/copilotkit',
  });
  return handleRequest(req);
};
