# PennyWise Product Specification

## Executive Summary

AI-powered expense tracking application designed for users aged 22-35 who want to build money tracking habits with minimal effort. The app uses AI for receipt scanning, spending analysis, and personalized financial advice delivered through a direct, conversational interface.

## Product Objectives

### Primary Goal
Enable users to track daily expenses in under 10 seconds per transaction while providing actionable insights to reduce spending.

### Success Metrics
- User logs expenses 5+ days per week
- Average transaction entry time under 10 seconds
- Day 7 retention rate above 40%
- AI categorization accuracy above 80%

## Core Functionality

### 1. Transaction Management

#### 1.1 Manual Entry
- **Amount Input**: Numeric keypad with quick amount buttons (5, 10, 20, 50 USD)
- **Category Selection**: Required field with 3 most recent categories displayed at top
- **Description Field**: Optional text input, maximum 100 characters
- **Recurring Flag**: Boolean toggle for recurring transactions
- **Validation**: Positive amounts only, no future dates

#### 1.2 AI-Powered Camera Entry
- **Input**: Photo capture of receipts, bills, screenshots, or handwritten notes
- **Processing**: OCR and AI extraction of amount, merchant, and category
- **Preview**: Editable fields before confirmation
- **Fallback**: Manual entry if extraction confidence below 70%

#### 1.3 Quick Templates
- **Default Templates**:
  - Morning coffee: 5 USD
  - Lunch: 12 USD
  - Transport: 3 USD
- **Custom Templates**: User-created with name and amount
- **Limit**: Maximum 10 templates

### 2. Category System

#### 2.1 Default Categories
- Food and Drinks
- Transport
- Housing and Bills
- Shopping
- Entertainment
- Health
- Education

#### 2.2 Custom Categories
- User-defined name (max 20 characters)
- Optional emoji selection
- Maximum 20 custom categories

#### 2.3 Category Limits
- Monthly spending limit per category
- Default limits: Food (500), Transport (200), Housing (1500), Shopping (300), Entertainment (150), Health (100), Education (200)
- User-adjustable limits

### 3. Dashboard Interface

#### 3.1 Information Hierarchy
1. Current balance
2. Today's spending with change indicator
3. Weekly spending against budget
4. AI-generated insight
5. Quick add button
6. Recent transactions (last 5)

#### 3.2 Data Display
- Balance: Total current funds
- Daily spending: Sum of today's transactions
- Weekly progress: Percentage bar of budget consumed
- Transactions: Grouped by day, showing amount, category, and description

### 4. AI Assistant Features

#### 4.1 Capabilities
- Spending pattern analysis
- Subscription detection
- Cost reduction recommendations
- Natural language queries about spending history
- Bulk transaction categorization

#### 4.2 Query Types Supported
- Amount queries: "How much did I spend on food this week"
- Comparison queries: "Am I spending more than last month"
- Pattern queries: "What is my biggest expense category"
- Advice queries: "How can I save 100 dollars this month"

#### 4.3 Response Characteristics
- Direct and actionable advice
- Specific dollar amounts in recommendations
- Identification of wasteful spending patterns
- Subscription audit suggestions

### 5. Notification System

#### 5.1 Daily Reminder
- **Primary**: 7:00 PM local time
- **Follow-up**: Every 3 hours if ignored
- **Morning Recovery**: Prompt if previous day missed

#### 5.2 Weekly Summary
- **Schedule**: Sunday 8:00 PM
- **Content**: Total spent, comparison to previous week, largest expense category

#### 5.3 Goal Alerts
- Goal achievement notification
- Warning when 90% of budget consumed
- Over-budget alerts

### 6. Data Management

#### 6.1 Storage Architecture
- **Primary Storage**: LocalStorage for all transaction data
- **Data Format**: JSON structure with transactions array
- **Offline Capability**: Full functionality except AI features
- **Data Export**: JSON file download
- **Data Import**: JSON file upload for device migration

#### 6.2 Data Schema
```
Transaction {
  id: string
  amount: number
  category: string
  description: string (optional)
  date: timestamp
  isRecurring: boolean
  createdAt: timestamp
  updatedAt: timestamp
}

UserData {
  balance: number
  monthlyGoal: number
  categoryLimits: Map<string, number>
  streak: number
  longestStreak: number
  templates: Array<Template>
}
```

### 7. Gamification

#### 7.1 Streak Tracking
- Daily logging streak counter
- Longest streak record
- Streak break on missed day
- Morning and evening streak notifications

#### 7.2 Progress Indicators
- Daily savings compared to previous day
- Weekly savings compared to previous week
- Monthly goal progress percentage

## Technical Architecture

### Frontend Stack
- **Framework**: React Native with Expo
- **Navigation**: expo-router (file-based)
- **Styling**: NativeWind (Tailwind CSS)
- **State Management**: TanStack Query for server state
- **Forms**: react-hook-form with Zod validation
- **Icons**: lucide-react-native

### Backend Stack
- **Framework**: Encore.dev
- **Database**: PostgreSQL
- **AI Integration**: Google Gemini API
- **Services**:
  - transactions: CRUD operations
  - ai: Chat and analysis
  - analytics: Aggregation and patterns

### API Endpoints
- POST /transactions - Create transaction
- GET /transactions - List transactions with pagination
- PUT /transactions/:id - Update transaction
- DELETE /transactions/:id - Delete transaction
- POST /ai/categorize - AI categorization
- POST /ai/chat - Chat interaction
- GET /analytics/summary - Weekly/monthly summaries

## User Flows

### Onboarding Flow
1. Enter current balance
2. Set monthly spending goal
3. Configure notification time
4. Complete first transaction entry
5. Review dashboard

### Daily Usage Flow
1. Receive 7 PM notification
2. Open app to add expense
3. Use camera or manual entry
4. Confirm categorization
5. View updated balance and streak

### AI Interaction Flow
1. Navigate to AI chat
2. Type or select suggested query
3. Receive analysis with specific recommendations
4. Optional: Apply suggested actions

## Design Guidelines

### Visual Hierarchy
- Primary action: Add transaction button
- Secondary: View history, AI chat
- Tertiary: Settings, export

### Color Scheme
- Primary: Blue (#007AFF)
- Success: Green (#34C759)
- Warning: Red (#FF3B30)
- Background: White (#FFFFFF)
- Text: Black (#000000)

### Typography
- Headers: System font, bold, 24px
- Body: System font, regular, 16px
- Captions: System font, regular, 12px

### Spacing System
- Base unit: 8px
- Component padding: 16px
- Screen margins: 20px

## Constraints and Limitations

### Technical Constraints
- Maximum 10,000 transactions in LocalStorage
- AI features require internet connection
- Camera resolution minimum 2MP for OCR
- Response time maximum 3 seconds for AI

### Functional Constraints
- Single user profile only
- Single currency (USD) for MVP
- No bank integration
- No data sync between devices without manual export/import

## Success Criteria for MVP

### Functional Requirements
1. User can add transaction manually
2. User can add transaction via camera
3. AI categorizes with 80% accuracy
4. Notifications send at scheduled times
5. Data persists in LocalStorage
6. AI chat provides spending insights

### Non-Functional Requirements
1. Transaction entry under 10 seconds
2. App loads under 2 seconds
3. No crashes during 5-minute demo
4. Responsive on devices 5.5" to 6.7"

## Implementation Priority

### Phase 1: Core (Hours 0-4)
1. Basic transaction CRUD
2. LocalStorage integration
3. Dashboard with balance display
4. Manual categorization

### Phase 2: AI Integration (Hours 4-6)
1. Camera OCR implementation
2. Gemini API integration
3. AI categorization
4. Basic chat interface

### Phase 3: Enhancement (Hours 6-8)
1. Notification system
2. Streak tracking
3. Weekly summaries
4. Quick templates

### Phase 4: Polish (Hours 8-10)
1. UI refinements
2. Error handling
3. Loading states
4. Performance optimization