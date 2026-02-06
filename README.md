# Nodebase

Nodebase is a workflow automation platform that enables users to design, execute, and monitor complex workflows using a node-based visual editor. Users can connect triggers, actions, and AI-powered nodes to automate tasks, integrate external services, and observe real-time execution results.

The platform is built with a modern, type-safe full-stack architecture and is designed to support production-grade workflow execution.

---

## Features

- Visual node-based workflow builder
- Multiple workflow triggers, including manual triggers, Google Forms, and Stripe webhooks
- Action nodes for AI providers, HTTP requests, and messaging platforms
- Asynchronous workflow execution using background jobs
- Real-time execution status updates
- Secure authentication and subscription-based feature gating
- Encrypted credential storage and safe secret handling
- Execution logs, history, and error monitoring

---

## How It Works

### Workflow Creation
Users create workflows through a visual editor. Nodes and their connections are validated and persisted to the database using a type-safe API layer.

### Workflow Triggering
Workflows can be initiated manually or through external events such as form submissions or payment webhooks. Trigger events are dispatched to the workflow engine.

### Execution Engine
Each workflow is executed asynchronously. The system:
- Fetches the workflow definition
- Validates the workflow graph
- Sorts nodes to ensure correct execution order
- Prevents circular dependencies

### Node Execution
Each node is executed by a dedicated executor. During execution:
- Required credentials are decrypted securely at runtime
- Inputs are dynamically resolved using templating
- Outputs are stored and passed to dependent nodes

### Realtime Updates
Execution progress is published to real-time channels. The frontend subscribes to these updates to display node-level execution status as the workflow runs.

### Completion
Once execution finishes, the workflow is marked as completed or failed. Execution history remains available for debugging and review.

---

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- React Query

### Backend
- tRPC for type-safe APIs
- Prisma ORM
- PostgreSQL

### Infrastructure and Services
- Inngest for workflow orchestration
- Better Auth for authentication
- Polar for subscription management
- Sentry for error monitoring
- Handlebars for dynamic input templating

---

## Security

- Credentials are encrypted before being stored
- Secrets are decrypted only during workflow execution
- Authorization and subscription checks are enforced at the API level
- Sensitive logic is never exposed to the client

---

## Local Development

```bash
npm install
npx prisma migrate dev
npm run dev
```

Environment variables are required for:

- Database configuration
- Authentication providers
- AI service providers
- Inngest
- Subscription management

---

## Future Improvements

- Workflow versioning
- Conditional branching and advanced control flow
- Role-based access control
- Exportable workflow documentation
- Enhanced execution analytics

---

## License

MIT License
