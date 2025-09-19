# Production Deployment - OpenAI Agents JS SDK

Complete guide to deploying agents in production environments with scalability, monitoring, and operational best practices.

> **Official Guide**: [https://openai.github.io/openai-agents-js/guides/configuration](https://openai.github.io/openai-agents-js/guides/configuration)

## Production Architecture

```mermaid
graph TB
    subgraph "Load Balancer"
        LB[Load Balancer]
    end

    subgraph "Application Tier"
        A1[Agent Server 1]
        A2[Agent Server 2]
        A3[Agent Server N]
        AP[Agent Pool Manager]
    end

    subgraph "Caching Layer"
        RC[Redis Cache]
        MC[Memory Cache]
    end

    subgraph "Storage"
        DB[(Database)]
        FS[(File Storage)]
    end

    subgraph "Monitoring"
        M1[Metrics Collector]
        M2[Log Aggregator]
        M3[Tracing System]
        M4[Alert Manager]
    end

    subgraph "External Services"
        OAI[OpenAI API]
        MCP[MCP Servers]
    end

    LB --> A1
    LB --> A2
    LB --> A3

    A1 --> AP
    A2 --> AP
    A3 --> AP

    AP --> RC
    AP --> MC
    AP --> DB
    AP --> FS

    A1 --> M1
    A2 --> M2
    A3 --> M3
    M4 --> M1
    M4 --> M2
    M4 --> M3

    AP --> OAI
    AP --> MCP

    style LB fill:#e3f2fd
    style AP fill:#e8f5e8
    style M4 fill:#fff3e0
```

## Production Environment Setup

### Environment Configuration

```typescript
// production.config.ts
export const productionConfig = {
  // Model configuration
  defaultModel: 'gpt-4o',
  fallbackModel: 'gpt-4o-mini',

  // Performance settings
  maxConcurrentRuns: 100,
  requestTimeout: 30000,
  maxRetries: 3,

  // Safety settings
  enableGuardrails: true,
  requireApproval: ['sensitive_operations', 'data_modification'],
  maxTokensPerRequest: 4000,

  // Monitoring
  enableTracing: true,
  enableMetrics: true,
  logLevel: 'info',

  // Rate limiting
  rateLimits: {
    requestsPerMinute: 60,
    tokensPerMinute: 100000,
    concurrentRequests: 10
  }
};
```

### Environment Variables

```bash
# API Configuration
OPENAI_API_KEY=your_production_api_key
OPENAI_ORG_ID=your_organization_id

# Environment
NODE_ENV=production
LOG_LEVEL=info
DEBUG=openai-agents:*

# Database
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=redis://host:port

# Monitoring
SENTRY_DSN=your_sentry_dsn
DATADOG_API_KEY=your_datadog_key

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
```

## Scalable Architecture

### Load Balancing and Clustering

```typescript
import cluster from 'cluster';
import os from 'os';

if (cluster.isPrimary) {
  const numWorkers = process.env.WORKERS || os.cpus().length;

  console.log(`Master process ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  // Worker process
  startAgentServer();
}

async function startAgentServer() {
  const app = express();

  // Configure middleware
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      worker: process.pid,
      uptime: process.uptime(),
      memory: process.memoryUsage()
    });
  });

  // Agent endpoints
  app.use('/api/agents', agentRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Worker ${process.pid} started on port ${port}`);
  });
}
```

### Agent Pool Management

```typescript
class ProductionAgentPool {
  private pools = new Map<string, Agent[]>();
  private metrics = new Map<string, PoolMetrics>();
  private config: PoolConfig;

  constructor(config: PoolConfig) {
    this.config = config;
    this.initializePools();
    this.startMetricsCollection();
  }

  async getAgent(type: string, priority: 'low' | 'normal' | 'high' = 'normal'): Promise<Agent> {
    const pool = this.pools.get(type);
    if (!pool) {
      throw new Error(`No pool configured for agent type: ${type}`);
    }

    // Check for available agents
    const available = pool.filter(agent => !this.isAgentBusy(agent));

    if (available.length === 0) {
      // Handle pool exhaustion based on priority
      if (priority === 'high') {
        return await this.createEmergencyAgent(type);
      } else {
        throw new Error(`No available agents for type: ${type}`);
      }
    }

    // Select best agent based on performance metrics
    const bestAgent = this.selectOptimalAgent(available, type);
    this.markAgentBusy(bestAgent);

    return bestAgent;
  }

  releaseAgent(agent: Agent, type: string) {
    this.markAgentFree(agent);
    this.updateAgentMetrics(agent, type);
  }

  private initializePools() {
    const poolConfigs = this.config.pools;

    for (const [type, config] of Object.entries(poolConfigs)) {
      const pool = [];

      for (let i = 0; i < config.minSize; i++) {
        const agent = this.createAgent(type, config.agentConfig);
        pool.push(agent);
      }

      this.pools.set(type, pool);
      this.metrics.set(type, {
        totalRequests: 0,
        activeAgents: 0,
        averageResponseTime: 0,
        errorRate: 0
      });
    }
  }

  private selectOptimalAgent(agents: Agent[], type: string): Agent {
    const metrics = this.metrics.get(type);

    // Sort by performance metrics
    return agents.sort((a, b) => {
      const aMetrics = this.getAgentMetrics(a);
      const bMetrics = this.getAgentMetrics(b);

      // Prioritize agents with better response times and lower error rates
      const aScore = aMetrics.avgResponseTime * (1 + aMetrics.errorRate);
      const bScore = bMetrics.avgResponseTime * (1 + bMetrics.errorRate);

      return aScore - bScore;
    })[0];
  }

  private startMetricsCollection() {
    setInterval(() => {
      this.collectPoolMetrics();
    }, 30000); // Every 30 seconds
  }

  private collectPoolMetrics() {
    for (const [type, pool] of this.pools.entries()) {
      const metrics = this.metrics.get(type)!;

      metrics.activeAgents = pool.filter(agent => this.isAgentBusy(agent)).length;

      // Auto-scaling logic
      if (metrics.activeAgents / pool.length > 0.8) {
        this.scaleUp(type);
      } else if (metrics.activeAgents / pool.length < 0.2 && pool.length > this.config.pools[type].minSize) {
        this.scaleDown(type);
      }
    }
  }
}
```

### Caching Strategy

```typescript
class AgentResponseCache {
  private cache: Map<string, CacheEntry> = new Map();
  private redis?: Redis;

  constructor(private config: CacheConfig) {
    if (config.redis) {
      this.redis = new Redis(config.redis);
    }
  }

  async get(key: string): Promise<any | null> {
    // Try local cache first
    const local = this.cache.get(key);
    if (local && !this.isExpired(local)) {
      return local.data;
    }

    // Try Redis cache
    if (this.redis) {
      const cached = await this.redis.get(key);
      if (cached) {
        const entry = JSON.parse(cached);
        if (!this.isExpired(entry)) {
          // Warm local cache
          this.cache.set(key, entry);
          return entry.data;
        }
      }
    }

    return null;
  }

  async set(key: string, data: any, ttl?: number): Promise<void> {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.defaultTTL
    };

    // Set in local cache
    this.cache.set(key, entry);

    // Set in Redis cache
    if (this.redis) {
      await this.redis.setex(key, entry.ttl, JSON.stringify(entry));
    }
  }

  generateCacheKey(agent: string, input: string, context?: any): string {
    const contextHash = context ? this.hashObject(context) : '';
    return `agent:${agent}:${this.hashString(input)}:${contextHash}`;
  }

  private hashString(str: string): string {
    return crypto.createHash('md5').update(str).digest('hex');
  }

  private hashObject(obj: any): string {
    return this.hashString(JSON.stringify(obj));
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > entry.ttl * 1000;
  }
}
```

## Monitoring and Observability

### Comprehensive Logging

```typescript
import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

class ProductionLogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        // Console output
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),

        // File logging
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error'
        }),
        new winston.transports.File({
          filename: 'logs/combined.log'
        }),

        // Elasticsearch for production
        ...(process.env.ELASTICSEARCH_URL ? [
          new ElasticsearchTransport({
            level: 'info',
            clientOpts: {
              node: process.env.ELASTICSEARCH_URL
            },
            index: 'agents-logs'
          })
        ] : [])
      ]
    });
  }

  logAgentExecution(agentName: string, input: string, result: any, duration: number) {
    this.logger.info('agent_execution', {
      agent: agentName,
      input_length: input.length,
      output_length: result.finalOutput?.length || 0,
      duration_ms: duration,
      tool_calls: result.newItems?.filter(item => item.type === 'tool_call').length || 0,
      turns: result.history?.length || 0,
      model_used: result.modelUsed,
      tokens_used: result.tokenUsage
    });
  }

  logError(error: Error, context?: any) {
    this.logger.error('agent_error', {
      message: error.message,
      stack: error.stack,
      context
    });
  }

  logPerformanceMetrics(metrics: any) {
    this.logger.info('performance_metrics', metrics);
  }
}
```

### Metrics Collection

```typescript
import { StatsD } from 'node-statsd';

class AgentMetrics {
  private statsd?: StatsD;
  private metrics: Map<string, number> = new Map();

  constructor() {
    if (process.env.STATSD_HOST) {
      this.statsd = new StatsD({
        host: process.env.STATSD_HOST,
        port: parseInt(process.env.STATSD_PORT || '8125')
      });
    }
  }

  recordAgentExecution(agentName: string, duration: number, success: boolean) {
    // Timing metrics
    this.timing(`agent.execution.duration.${agentName}`, duration);

    // Success/failure counters
    this.increment(`agent.execution.${success ? 'success' : 'failure'}.${agentName}`);

    // Overall counters
    this.increment('agent.execution.total');
    if (success) this.increment('agent.execution.success.total');
    else this.increment('agent.execution.failure.total');
  }

  recordTokenUsage(agentName: string, tokens: { input: number; output: number; total: number }) {
    this.gauge(`agent.tokens.input.${agentName}`, tokens.input);
    this.gauge(`agent.tokens.output.${agentName}`, tokens.output);
    this.gauge(`agent.tokens.total.${agentName}`, tokens.total);

    // Aggregate metrics
    this.increment('agent.tokens.total.all', tokens.total);
  }

  recordCacheMetrics(hits: number, misses: number) {
    this.gauge('agent.cache.hits', hits);
    this.gauge('agent.cache.misses', misses);
    this.gauge('agent.cache.hit_rate', hits / (hits + misses));
  }

  private timing(key: string, duration: number) {
    if (this.statsd) {
      this.statsd.timing(key, duration);
    }

    // Store for local aggregation
    this.updateLocalMetric(`timing.${key}`, duration);
  }

  private increment(key: string, value: number = 1) {
    if (this.statsd) {
      this.statsd.increment(key, value);
    }

    this.updateLocalMetric(`counter.${key}`, value);
  }

  private gauge(key: string, value: number) {
    if (this.statsd) {
      this.statsd.gauge(key, value);
    }

    this.metrics.set(`gauge.${key}`, value);
  }

  private updateLocalMetric(key: string, value: number) {
    const current = this.metrics.get(key) || 0;
    this.metrics.set(key, current + value);
  }

  getLocalMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics.entries());
  }
}
```

## Health Check Flow

```mermaid
flowchart TD
    A[Health Check Timer] --> B[Run All Checks]
    B --> C{Database OK?}
    B --> D{OpenAI API OK?}
    B --> E{Memory Usage OK?}
    B --> F{Agent Pool OK?}

    C -->|Pass| G[Log Success]
    C -->|Fail| H[Alert Database Issue]

    D -->|Pass| G
    D -->|Fail| I[Alert API Issue]

    E -->|Pass| G
    E -->|Fail| J[Alert Memory Issue]

    F -->|Pass| G
    F -->|Fail| K[Alert Pool Issue]

    G --> L[Overall Health: OK]
    H --> M[Overall Health: DEGRADED]
    I --> M
    J --> M
    K --> M

    M --> N[Send Alerts]
    N --> O[Update Status Page]
    L --> O

    style A fill:#e3f2fd
    style L fill:#e8f5e8
    style M fill:#ffcdd2
    style N fill:#fff3e0
```

### Health Checks and Alerting

```typescript
class HealthCheckSystem {
  private checks: Map<string, HealthCheck> = new Map();
  private alertManager: AlertManager;

  constructor(alertManager: AlertManager) {
    this.alertManager = alertManager;
    this.registerDefaultChecks();
    this.startPeriodicChecks();
  }

  private registerDefaultChecks() {
    // Database connectivity
    this.addCheck('database', {
      name: 'Database Connection',
      check: async () => {
        try {
          await database.query('SELECT 1');
          return { healthy: true };
        } catch (error) {
          return { healthy: false, error: error.message };
        }
      },
      interval: 30000,
      timeout: 5000
    });

    // OpenAI API connectivity
    this.addCheck('openai', {
      name: 'OpenAI API',
      check: async () => {
        try {
          const testAgent = new Agent({
            name: 'Health Check',
            instructions: 'Say "OK"'
          });
          const result = await run(testAgent, 'Health check');
          return { healthy: true, responseTime: Date.now() };
        } catch (error) {
          return { healthy: false, error: error.message };
        }
      },
      interval: 60000,
      timeout: 10000
    });

    // Memory usage
    this.addCheck('memory', {
      name: 'Memory Usage',
      check: async () => {
        const usage = process.memoryUsage();
        const usagePercent = usage.heapUsed / usage.heapTotal;

        return {
          healthy: usagePercent < 0.9,
          metrics: {
            heapUsed: usage.heapUsed,
            heapTotal: usage.heapTotal,
            usagePercent
          }
        };
      },
      interval: 15000,
      timeout: 1000
    });
  }

  addCheck(name: string, check: HealthCheck) {
    this.checks.set(name, check);
  }

  async runAllChecks(): Promise<HealthCheckResult> {
    const results = new Map<string, any>();
    let overallHealthy = true;

    for (const [name, check] of this.checks.entries()) {
      try {
        const result = await Promise.race([
          check.check(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), check.timeout)
          )
        ]);

        results.set(name, result);

        if (!result.healthy) {
          overallHealthy = false;
          await this.alertManager.sendAlert({
            type: 'health_check_failed',
            check: name,
            error: result.error
          });
        }
      } catch (error) {
        overallHealthy = false;
        results.set(name, { healthy: false, error: error.message });
      }
    }

    return {
      healthy: overallHealthy,
      checks: Object.fromEntries(results),
      timestamp: Date.now()
    };
  }

  private startPeriodicChecks() {
    for (const [name, check] of this.checks.entries()) {
      setInterval(async () => {
        try {
          const result = await check.check();
          if (!result.healthy) {
            console.warn(`Health check failed: ${name}`, result);
          }
        } catch (error) {
          console.error(`Health check error: ${name}`, error);
        }
      }, check.interval);
    }
  }
}
```

## Security Best Practices

### Authentication and Authorization

```typescript
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

class SecurityMiddleware {
  static authenticate() {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    };
  }

  static authorize(permissions: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as any;

      if (!user || !user.permissions) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      const hasPermission = permissions.some(permission =>
        user.permissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    };
  }

  static rateLimiter() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP',
      standardHeaders: true,
      legacyHeaders: false
    });
  }

  static inputSanitization() {
    return (req: Request, res: Response, next: NextFunction) => {
      // Sanitize input
      if (req.body) {
        req.body = this.sanitizeObject(req.body);
      }

      next();
    };
  }

  private static sanitizeObject(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return typeof obj === 'string' ? this.sanitizeString(obj) : obj;
    }

    const sanitized: any = Array.isArray(obj) ? [] : {};

    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = this.sanitizeObject(value);
    }

    return sanitized;
  }

  private static sanitizeString(str: string): string {
    // Remove potentially dangerous characters
    return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+\s*=/gi, '');
  }
}
```

### Secrets Management

```typescript
import { SecretsManager } from 'aws-sdk';

class SecureConfigManager {
  private secrets: Map<string, string> = new Map();
  private secretsManager?: SecretsManager;

  constructor() {
    if (process.env.AWS_REGION) {
      this.secretsManager = new SecretsManager({
        region: process.env.AWS_REGION
      });
    }
  }

  async loadSecrets() {
    if (process.env.NODE_ENV === 'production' && this.secretsManager) {
      // Load from AWS Secrets Manager
      await this.loadFromSecretsManager();
    } else {
      // Load from environment variables in development
      this.loadFromEnvironment();
    }
  }

  private async loadFromSecretsManager() {
    try {
      const secretName = process.env.SECRET_NAME || 'agents-api-secrets';
      const result = await this.secretsManager!.getSecretValue({
        SecretId: secretName
      }).promise();

      if (result.SecretString) {
        const secrets = JSON.parse(result.SecretString);
        for (const [key, value] of Object.entries(secrets)) {
          this.secrets.set(key, value as string);
        }
      }
    } catch (error) {
      console.error('Failed to load secrets:', error);
      throw error;
    }
  }

  private loadFromEnvironment() {
    const secretKeys = [
      'OPENAI_API_KEY',
      'JWT_SECRET',
      'DATABASE_PASSWORD',
      'ENCRYPTION_KEY'
    ];

    for (const key of secretKeys) {
      const value = process.env[key];
      if (value) {
        this.secrets.set(key, value);
      }
    }
  }

  getSecret(key: string): string {
    const secret = this.secrets.get(key);
    if (!secret) {
      throw new Error(`Secret not found: ${key}`);
    }
    return secret;
  }
}
```

## Deployment Strategies

## Blue-Green Deployment Flow

```mermaid
sequenceDiagram
    participant D as Deployer
    participant LB as Load Balancer
    participant B as Blue Environment
    participant G as Green Environment
    participant H as Health Check

    Note over B: Currently serving traffic
    D->>G: Deploy new version
    G->>G: Start new services
    D->>H: Health check green
    H->>G: Run health checks

    alt Health Checks Pass
        H-->>D: Green is healthy
        D->>LB: Switch traffic to green
        LB->>G: Route traffic
        Note over G: Now serving traffic
        D->>B: Stop old version
    else Health Checks Fail
        H-->>D: Green is unhealthy
        D->>G: Stop green deployment
        Note over B: Continue serving traffic
        D->>D: Rollback or fix issues
    end
```

### Blue-Green Deployment

```typescript
// deployment/blue-green.ts
export class BlueGreenDeployment {
  private currentEnvironment: 'blue' | 'green' = 'blue';
  private environments = {
    blue: { port: 3000, healthy: true },
    green: { port: 3001, healthy: true }
  };

  async deploy(newVersion: string) {
    const targetEnv = this.currentEnvironment === 'blue' ? 'green' : 'blue';

    console.log(`Deploying ${newVersion} to ${targetEnv} environment`);

    // Deploy to target environment
    await this.deployToEnvironment(targetEnv, newVersion);

    // Health check
    await this.waitForHealthy(targetEnv);

    // Warm up
    await this.warmUpEnvironment(targetEnv);

    // Switch traffic
    await this.switchTraffic(targetEnv);

    console.log(`Deployment complete. Now serving from ${targetEnv}`);
  }

  private async deployToEnvironment(env: 'blue' | 'green', version: string) {
    // Implementation depends on your deployment system
    // Could be Docker, Kubernetes, etc.
  }

  private async waitForHealthy(env: 'blue' | 'green') {
    const maxAttempts = 30;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const health = await this.checkEnvironmentHealth(env);
        if (health.healthy) {
          return;
        }
      } catch (error) {
        console.log(`Health check attempt ${attempts + 1} failed:`, error.message);
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds
    }

    throw new Error(`Environment ${env} failed to become healthy`);
  }

  private async warmUpEnvironment(env: 'blue' | 'green') {
    // Send some test requests to warm up the environment
    const testRequests = [
      'Simple test request',
      'More complex test request with tools',
      'Streaming test request'
    ];

    for (const request of testRequests) {
      try {
        await this.sendTestRequest(env, request);
      } catch (error) {
        console.warn('Warm-up request failed:', error.message);
      }
    }
  }

  private async switchTraffic(targetEnv: 'blue' | 'green') {
    // Update load balancer to point to new environment
    // Implementation depends on your load balancer
    this.currentEnvironment = targetEnv;
  }
}
```

## Canary Deployment Flow

```mermaid
flowchart TD
    A[Deploy Canary Version] --> B[Route 10% Traffic]
    B --> C[Monitor Metrics]
    C --> D{Metrics Healthy?}

    D -->|Yes| E[Increase to 25%]
    D -->|No| F[Rollback Canary]

    E --> G[Monitor Again]
    G --> H{Still Healthy?}

    H -->|Yes| I[Increase to 50%]
    H -->|No| J[Rollback to Previous]

    I --> K[Continue Gradual Increase]
    K --> L[Monitor Each Step]
    L --> M{Each Step OK?}

    M -->|Yes| N[Full Deployment]
    M -->|No| O[Immediate Rollback]

    F --> P[Stay on Current Version]
    J --> P
    O --> P

    style A fill:#e3f2fd
    style N fill:#e8f5e8
    style P fill:#fff3e0
    style F fill:#ffcdd2
    style J fill:#ffcdd2
    style O fill:#ffcdd2
```

### Canary Deployment

```typescript
export class CanaryDeployment {
  private canaryPercent: number = 0;
  private maxCanaryPercent: number = 100;
  private incrementPercent: number = 10;

  async deployCanary(newVersion: string) {
    console.log(`Starting canary deployment of ${newVersion}`);

    // Deploy canary version
    await this.deployCanaryVersion(newVersion);

    // Gradually increase traffic
    while (this.canaryPercent < this.maxCanaryPercent) {
      await this.increaseCanaryTraffic();
      await this.monitorCanaryHealth();
      await this.waitBetweenIncrements();
    }

    // Promote canary to production
    await this.promoteCanary();

    console.log('Canary deployment successful');
  }

  private async increaseCanaryTraffic() {
    this.canaryPercent = Math.min(
      this.canaryPercent + this.incrementPercent,
      this.maxCanaryPercent
    );

    console.log(`Increasing canary traffic to ${this.canaryPercent}%`);

    // Update load balancer configuration
    await this.updateLoadBalancer(this.canaryPercent);
  }

  private async monitorCanaryHealth() {
    const canaryMetrics = await this.getCanaryMetrics();
    const productionMetrics = await this.getProductionMetrics();

    // Compare error rates
    if (canaryMetrics.errorRate > productionMetrics.errorRate * 1.5) {
      throw new Error('Canary error rate too high, rolling back');
    }

    // Compare response times
    if (canaryMetrics.avgResponseTime > productionMetrics.avgResponseTime * 1.2) {
      console.warn('Canary response time higher than production');
    }

    console.log(`Canary health check passed at ${this.canaryPercent}%`);
  }
}
```

## Monitoring Dashboard Flow

```mermaid
graph TB
    subgraph "Data Sources"
        A1[Application Logs]
        A2[System Metrics]
        A3[Agent Traces]
        A4[Error Reports]
    end

    subgraph "Processing"
        B1[Log Parser]
        B2[Metrics Aggregator]
        B3[Trace Analyzer]
        B4[Alert Engine]
    end

    subgraph "Storage"
        C1[(Time Series DB)]
        C2[(Document Store)]
        C3[(Alert History)]
    end

    subgraph "Visualization"
        D1[Performance Dashboard]
        D2[Error Dashboard]
        D3[Agent Dashboard]
        D4[Business Metrics]
    end

    A1 --> B1
    A2 --> B2
    A3 --> B3
    A4 --> B4

    B1 --> C2
    B2 --> C1
    B3 --> C2
    B4 --> C3

    C1 --> D1
    C1 --> D4
    C2 --> D2
    C2 --> D3
    C3 --> D2

    style B4 fill:#fff3e0
    style C1 fill:#e8f5e8
    style D1 fill:#e3f2fd
```

## References

### Official Documentation
- 📚 [Configuration Guide](https://openai.github.io/openai-agents-js/guides/configuration)
- 🚨 [Troubleshooting](https://openai.github.io/openai-agents-js/guides/troubleshooting)
- 📊 [Tracing & Monitoring](https://openai.github.io/openai-agents-js/guides/tracing)

### Related Guides
- 🛡️ [Guardrails](https://openai.github.io/openai-agents-js/guides/guardrails)
- ⚙️ [Models](https://openai.github.io/openai-agents-js/guides/models)

This comprehensive production deployment guide ensures reliable, scalable, and secure agent deployments with proper monitoring and operational practices.