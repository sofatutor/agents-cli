# Agent Configuration - OpenAI Agents JS SDK

Comprehensive guide to all agent configuration options and patterns.

## Basic Agent Configuration

```typescript
const agent = new Agent({
  name: 'Agent Name',
  instructions: 'Agent behavior description',
  model: 'gpt-4o',
  tools: [toolArray],
  modelSettings: {},
  outputType: zodSchema,
  context: contextData,
  handoffs: [otherAgents],
  inputGuardrails: [guardrailFunctions],
  outputGuardrails: [guardrailFunctions]
});
```

## Configuration Properties

### name (required)
```typescript
name: 'Customer Support Agent'
```
- Identifies the agent in logs, traces, and handoffs
- Used as tool name when agent becomes a tool via `asTool()`

### instructions (required)
Static instructions:
```typescript
instructions: 'You are a helpful customer support agent. Be polite and professional.'
```

Dynamic instructions:
```typescript
instructions: async (context) => {
  return `You are helping ${context.user}.
         Current time: ${new Date().toISOString()}.
         User tier: ${context.userTier}`;
}
```

Context-aware instructions:
```typescript
instructions: (context) => {
  const baseInstructions = 'You are a helpful assistant.';

  if (context.emergencyMode) {
    return baseInstructions + ' Prioritize urgent requests.';
  }

  return baseInstructions;
}
```

### model (optional)
```typescript
model: 'gpt-4o'          // Default recommended model
model: 'gpt-4o-mini'     // Faster, cheaper option
model: 'gpt-5'           // Advanced reasoning (higher cost)
```

### tools (optional)
```typescript
tools: [
  weatherTool,
  databaseTool,
  emailTool.needsApproval(), // Requires human approval
  otherAgent.asTool()        // Agent as tool
]
```

### modelSettings (optional)
Fine-tune model behavior:
```typescript
modelSettings: {
  temperature: 0.7,           // Creativity (0-1)
  topP: 0.9,                 // Nucleus sampling
  maxTokens: 1000,           // Response length limit
  toolChoice: 'auto',        // 'auto', 'none', or specific tool
  reasoning: {
    effort: 'medium'         // 'low', 'medium', 'high' (GPT-5)
  },
  text: {
    verbosity: 'concise'     // 'concise', 'normal', 'verbose'
  }
}
```

### outputType (optional)
Structured output validation:
```typescript
import { z } from 'zod';

const SummarySchema = z.object({
  title: z.string(),
  keyPoints: z.array(z.string()),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
  confidence: z.number().min(0).max(1)
});

const agent = new Agent({
  name: 'Summarizer',
  instructions: 'Summarize the input text',
  outputType: SummarySchema
});

// Result will be typed and validated
const result = await run(agent, text);
const summary = result.finalOutput; // TypeScript knows this is SummarySchema
```

### context (optional)
Dynamic context injection:
```typescript
// Static context
context: {
  companyName: 'Acme Corp',
  supportEmail: 'help@acme.com'
}

// Dynamic context function
context: async (input, history) => {
  const user = await getUserFromSession();
  return {
    userId: user.id,
    userName: user.name,
    accountType: user.tier,
    recentTickets: await getRecentTickets(user.id)
  };
}
```

### handoffs (optional)
Agent delegation:
```typescript
handoffs: [
  billingAgent,
  technicalSupportAgent,
  handoff(escalationAgent, {
    inputType: z.object({
      reason: z.string(),
      urgency: z.enum(['low', 'medium', 'high'])
    }),
    onHandoff: (context, input) => {
      logEscalation(input.reason, input.urgency);
    }
  })
]
```

## Advanced Configuration Patterns

### Lifecycle Hooks

```typescript
const agent = new Agent({
  name: 'Monitored Agent',
  instructions: 'Be helpful',

  // Pre-execution hook
  beforeRun: async (input, context) => {
    console.log('Starting run with input:', input);
    await logAgentStart(context.userId);
  },

  // Post-execution hook
  afterRun: async (result, context) => {
    console.log('Completed with output:', result.finalOutput);
    await logAgentComplete(context.userId, result);
  },

  // Error handling hook
  onError: async (error, context) => {
    console.error('Agent error:', error.message);
    await logAgentError(context.userId, error);
  }
});
```

### Conditional Tool Access

```typescript
const agent = new Agent({
  name: 'Role-Based Agent',
  instructions: 'Help users based on their permissions',

  tools: async (context) => {
    const baseTools = [searchTool, helpTool];

    if (context.userRole === 'admin') {
      return [...baseTools, adminTool, deleteTool];
    }

    if (context.userRole === 'moderator') {
      return [...baseTools, moderatorTool];
    }

    return baseTools;
  }
});
```

### Multi-Environment Configuration

```typescript
const createAgent = (environment: 'dev' | 'staging' | 'prod') => {
  const baseConfig = {
    name: 'Assistant',
    instructions: 'Be helpful and accurate'
  };

  const envConfigs = {
    dev: {
      ...baseConfig,
      modelSettings: { temperature: 0.8 }, // More creative in dev
      tools: [...baseTools, debugTool]
    },
    staging: {
      ...baseConfig,
      modelSettings: { temperature: 0.5 },
      tools: baseTools
    },
    prod: {
      ...baseConfig,
      modelSettings: { temperature: 0.3 }, // More deterministic
      tools: baseTools,
      inputGuardrails: [contentFilter, rateLimiter],
      outputGuardrails: [safetyFilter]
    }
  };

  return new Agent(envConfigs[environment]);
};
```

### Agent Cloning and Variants

```typescript
const baseAgent = new Agent({
  name: 'Base Assistant',
  instructions: 'You are a helpful assistant',
  tools: [searchTool, calculatorTool]
});

// Clone with modifications
const mathAgent = baseAgent.clone({
  name: 'Math Specialist',
  instructions: 'You are a mathematics expert. Focus on precise calculations.',
  tools: [calculatorTool, graphingTool, statisticsTool]
});

// Clone with different model settings
const creativeAgent = baseAgent.clone({
  name: 'Creative Assistant',
  modelSettings: { temperature: 0.9 }
});
```

### Prompt Engineering Patterns

#### Chain of Thought
```typescript
const reasoningAgent = new Agent({
  name: 'Reasoning Agent',
  instructions: `
    You are an expert problem solver. For each problem:
    1. Break down the problem into steps
    2. Work through each step methodically
    3. Double-check your reasoning
    4. Provide a clear final answer

    Always show your thought process.
  `
});
```

#### Role-Based Instructions
```typescript
const supportAgent = new Agent({
  name: 'Customer Support',
  instructions: `
    You are a senior customer support representative with 10 years of experience.

    Your personality:
    - Empathetic and patient
    - Professional but friendly
    - Solution-oriented

    Your process:
    1. Listen carefully to the customer's issue
    2. Ask clarifying questions if needed
    3. Provide step-by-step solutions
    4. Escalate complex issues when appropriate
    5. Always end with asking if there's anything else you can help with
  `
});
```

#### Few-Shot Examples
```typescript
const classifierAgent = new Agent({
  name: 'Intent Classifier',
  instructions: `
    Classify user messages into these categories: billing, technical, sales, general.

    Examples:
    - "My credit card was charged twice" → billing
    - "The app keeps crashing on startup" → technical
    - "What plans do you offer?" → sales
    - "What are your business hours?" → general

    Respond with just the category name.
  `
});
```

## Configuration Validation

```typescript
import { z } from 'zod';

const AgentConfigSchema = z.object({
  name: z.string().min(1),
  instructions: z.union([z.string(), z.function()]),
  model: z.string().optional(),
  tools: z.array(z.any()).optional(),
  modelSettings: z.object({
    temperature: z.number().min(0).max(1).optional(),
    topP: z.number().min(0).max(1).optional(),
    maxTokens: z.number().positive().optional()
  }).optional()
});

const createValidatedAgent = (config: unknown) => {
  const validConfig = AgentConfigSchema.parse(config);
  return new Agent(validConfig);
};
```

## Best Practices

### Instructions
- Be specific and clear about the agent's role
- Include examples for complex behaviors
- Define boundaries and limitations
- Use context for personalization

### Model Selection
- Use GPT-4o for balanced performance
- Use GPT-4o-mini for simple tasks requiring speed
- Use GPT-5 for complex reasoning tasks
- Consider cost implications

### Tool Organization
- Group related tools together
- Use descriptive tool names
- Implement proper error handling
- Consider approval requirements for sensitive actions

### Context Management
- Keep context relevant and concise
- Update context based on conversation flow
- Consider privacy and data sensitivity
- Cache expensive context computations

### Performance
- Minimize tool count for faster execution
- Use structured outputs to reduce parsing
- Implement timeouts for long-running operations
- Monitor token usage and costs

This comprehensive configuration guide enables building sophisticated, production-ready agents.