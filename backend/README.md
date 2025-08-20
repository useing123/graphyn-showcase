# Pennywise Backend - Encore.dev TypeScript Architecture

## 🚀 Quick Start

```bash
# Install Encore CLI
curl -L https://encore.dev/install.sh | bash

# Initialize the backend
cd backend
npm install
encore run

# The API will be available at: http://localhost:4000
```

## 🏗️ Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐
│   Expo App      │────▶│  Encore.dev API │
│ (React Native)  │     │   (TypeScript)  │
└─────────────────┘     └────────┬────────┘
                                 │
    ┌────────────────────────────┼────────────────────────────┐
    │                            │                            │
┌───▼───┐              ┌────▼────┐               ┌─────▼─────┐
│ Users │              │Trans-   │               │    AI     │
│Service│              │actions  │               │   Chat    │
│       │              │Service  │               │  Service  │
└───┬───┘              └────┬────┘               └─────┬─────┘
    │                       │                          │
    └───────────┬───────────┴──────────────────────────┘
                │
        ┌───────▼────────┐
        │   PostgreSQL   │
        │   Database     │
        └────────────────┘
```

## 📁 Project Structure

```
backend/
├── encore.app                 # Encore app configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── users/                    # User management service
│   ├── users.ts             # User CRUD operations
│   └── migrations/          # Database migrations
├── transactions/            # Transaction service
│   ├── transactions.ts     # Transaction CRUD
│   ├── categories.ts       # Category management
│   └── migrations/         # Database migrations
├── chat/                   # AI Chat service
│   ├── chat.ts            # Chat endpoints
│   └── ai.ts              # AI provider integration
└── docker/                # Docker configuration
    ├── Dockerfile
    └── docker-compose.yml
```

## 🛠️ Services Architecture

### 1. Users Service (`/users`)
**Purpose**: Manage user accounts using device IDs (no auth for hackathon)

**Endpoints**:
```typescript
POST   /users                    // Create user with device ID
GET    /users/:deviceId          // Get user by device ID  
POST   /users/:deviceId/balance  // Update user balance
POST   /users/generate-device-id // Generate test device ID
```

### 2. Transactions Service (`/transactions`) 
**Purpose**: Handle all transaction CRUD operations

**Endpoints**:
```typescript
POST   /transactions/:deviceId           // Create transaction
GET    /transactions/:deviceId           // List user transactions
GET    /transactions/:deviceId/:id       // Get specific transaction
PUT    /transactions/:deviceId/:id       // Update transaction
DELETE /transactions/:deviceId/:id       // Delete transaction
GET    /categories                       // Get available categories
```

### 3. AI Chat Service (`/chat`)
**Purpose**: AI financial advisor chat with streaming responses

**Endpoints**:
```typescript
POST   /chat/:deviceId/message     // Send message to AI
GET    /chat/:deviceId/stream      // SSE stream for AI responses
GET    /chat/:deviceId/history     // Get chat history
```

## 💾 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id TEXT UNIQUE NOT NULL,
    balance DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Transactions Table  
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    transaction_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Categories Table
```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Chat Messages Table
```sql
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🤖 AI Integration

**Provider Options**:
- OpenAI GPT-4 (recommended for hackathon)
- Anthropic Claude
- Local LLM (Ollama)

**Features**:
- Streaming responses via Server-Sent Events (SSE)
- Financial advice based on transaction history
- Expense analysis and budgeting tips
- Natural language transaction queries

## 🐳 Docker Configuration

**Development**:
```bash
# Run with Docker Compose
docker-compose up -d

# Services included:
# - Encore.dev app (port 4000)
# - PostgreSQL (port 5432)
# - Redis (optional, for caching)
```

**Production**:
```bash
# Build production image
docker build -t pennywise-backend .

# Deploy to your container platform
docker run -p 4000:4000 pennywise-backend
```

## 🔧 Configuration

**Environment Variables**:
```bash
# AI Provider
OPENAI_API_KEY=your_openai_key
# or
ANTHROPIC_API_KEY=your_anthropic_key

# Database (auto-configured by Encore in dev)
DATABASE_URL=postgresql://localhost:5432/pennywise

# Encore config
ENCORE_ENVIRONMENT=development
```

## 📱 Frontend Integration

**API Base URL**: `http://localhost:4000` (development)

**Example Usage**:
```typescript
// Create user
const user = await fetch('http://localhost:4000/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ device_id: 'unique-device-id' })
});

// Add transaction  
const transaction = await fetch(`http://localhost:4000/transactions/${deviceId}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: -25.50,
    category: 'Food',
    description: 'Lunch at cafe',
    date: new Date().toISOString()
  })
});

// AI Chat with SSE
const eventSource = new EventSource(`http://localhost:4000/chat/${deviceId}/stream`);
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('AI Response:', data.content);
};
```

## 🚀 Deployment Options

1. **Encore Cloud** (Recommended)
   ```bash
   encore deploy
   ```

2. **Docker Container**
   ```bash
   docker build -t pennywise-backend .
   docker run -p 4000:4000 pennywise-backend
   ```

3. **Cloud Platforms**
   - AWS ECS/Fargate
   - Google Cloud Run  
   - Azure Container Instances

## 📊 Performance Optimizations

- **Connection Pooling**: PostgreSQL connection reuse
- **Caching**: Redis for frequent queries (categories, user data)
- **Streaming**: SSE for real-time AI responses
- **Indexing**: Database indexes on frequently queried fields

## 🧪 Testing Strategy

```bash
# Unit tests
npm test

# API tests
npm run test:api

# Load testing
npm run test:load
```

This architecture provides a scalable, hackathon-ready backend that can handle multiple users, real-time AI chat, and efficient transaction management while being simple to deploy and extend.