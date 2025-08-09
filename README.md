# TravelVerse - AI-Powered Travel Assistant

TravelVerse is a comprehensive AI-powered travel application that helps users plan, book, and manage their trips with intelligent assistance. Built with React, Node.js, and modern web technologies.

## 🌟 Features

### 🎯 Core Features
- **AI-Powered Trip Planning**: Intelligent trip planning with GPT-4 integration
- **Multi-Step Onboarding**: Comprehensive user onboarding process
- **Family Member Management**: Add and manage family members for group trips
- **Real-time Chat Interface**: Interactive chat interface for trip planning
- **AI Tour Guide**: Real-time assistance and recommendations during trips
- **Budget Management**: Track and manage trip expenses with visual charts
- **Emergency Support**: SOS features and emergency contacts
- **Language Translation**: Multi-language support for international travel
- **What-If Scenarios**: Alternative plans and contingency planning
- **Transport Advisor**: Intelligent transportation recommendations
- **Hotel Selector**: AI-powered hotel recommendations
- **Booking Agent**: Automated booking assistance

### 🎨 UI/UX Features
- **Modern Design**: Beautiful, responsive design with Tailwind CSS
- **Dark/Light Mode**: Theme switching with system preference detection
- **Smooth Animations**: Framer Motion animations throughout the app
- **Mobile-First**: Responsive design optimized for all devices
- **Accessibility**: WCAG compliant components and navigation
- **Shadcn/ui Components**: Modern, accessible UI components

### 🔧 Technical Features
- **React 18**: Latest React features and hooks
- **Vite**: Fast development and build tooling
- **Node.js/Express**: Robust backend API
- **MongoDB**: NoSQL database for data persistence
- **JWT Authentication**: Secure user authentication
- **State Management**: React Context API for global state
- **Routing**: React Router DOM for navigation
- **API Integration**: Axios for HTTP requests
- **Real-time Updates**: WebSocket support for live updates
- **AI Integration**: OpenAI GPT-4 for intelligent responses

## 🏗️ Project Structure

```
TravelVerse/
├── AI-agent/                          # AI Agent System
│   ├── agent.js                       # Main AI agent
│   ├── ai-config.js                   # AI configuration
│   ├── memory/                        # Memory management
│   │   └── memoryManager.js
│   ├── pipelines/                     # AI processing pipelines
│   │   ├── bookingAgent.js
│   │   ├── budgetPlanner.js
│   │   ├── dashboardAgent.js
│   │   ├── hotelSelector.js
│   │   ├── onboardingAgent.js
│   │   ├── sosHandler.js
│   │   ├── transportAdvisor.js
│   │   ├── tripPlanner.js
│   │   └── whatIfScenario.js
│   ├── prompts/                       # AI prompt templates
│   │   ├── booking.js
│   │   ├── dashboard.js
│   │   ├── general.js
│   │   ├── onboarding.js
│   │   └── tripPlanning.js
│   └── translator/                    # Translation services
│       └── index.js
├── backend/                           # Node.js backend
│   ├── src/
│   │   ├── config/                    # Configuration files
│   │   │   └── database.js
│   │   ├── controllers/               # API controllers
│   │   │   ├── aiController.js
│   │   │   └── authController.js
│   │   ├── middlewares/               # Express middlewares
│   │   │   └── auth.js
│   │   ├── models/                    # Database models
│   │   │   ├── Chat.js
│   │   │   ├── Trip.js
│   │   │   └── User.js
│   │   ├── routes/                    # API routes
│   │   │   ├── ai.js
│   │   │   ├── auth.js
│   │   │   ├── chat.js
│   │   │   ├── trip.js
│   │   │   └── user.js
│   │   ├── services/                  # Business logic
│   │   │   └── emailService.js
│   │   ├── utils/                     # Utility functions
│   │   │   ├── helpers.js
│   │   │   └── validation.js
│   │   └── server.js                  # Express server
│   └── package.json                   # Backend dependencies
├── frontend/                          # React frontend
│   ├── src/
│   │   ├── api/                       # API service layer
│   │   │   ├── authApi.js
│   │   │   ├── bookingApi.js
│   │   │   └── tripApi.js
│   │   ├── components/                # Reusable UI components
│   │   │   ├── ui/                    # Shadcn UI components
│   │   │   │   ├── avatar.jsx
│   │   │   │   ├── button.jsx
│   │   │   │   ├── card.jsx
│   │   │   │   ├── dialog.jsx
│   │   │   │   ├── dropdown-menu.jsx
│   │   │   │   ├── input.jsx
│   │   │   │   ├── label.jsx
│   │   │   │   ├── progress.jsx
│   │   │   │   ├── tabs.jsx
│   │   │   │   ├── textarea.jsx
│   │   │   │   ├── toast.jsx
│   │   │   │   └── tooltip.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── context/                   # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ChatContext.jsx
│   │   │   ├── LocationContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── features/                  # Feature-specific components
│   │   │   ├── Auth/                  # Authentication
│   │   │   │   ├── AuthProvider.jsx
│   │   │   │   ├── authService.js
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   ├── Booking/               # Booking features
│   │   │   │   ├── BookingForm.jsx
│   │   │   │   ├── bookingService.js
│   │   │   │   └── BookingSummary.jsx
│   │   │   ├── ChatInterface/         # Chat interface
│   │   │   │   ├── ChatMessage.jsx
│   │   │   │   ├── chatService.js
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   └── MessageInput.jsx
│   │   │   ├── Dashboard/             # Dashboard features
│   │   │   │   ├── BudgetPlanner/
│   │   │   │   │   ├── BudgetChart.jsx
│   │   │   │   │   ├── BudgetForm.jsx
│   │   │   │   │   └── budgetService.js
│   │   │   │   ├── Overview/
│   │   │   │   │   ├── TripOverview.jsx
│   │   │   │   │   ├── UpcomingEventsWidget.jsx
│   │   │   │   │   └── WeatherWidget.jsx
│   │   │   │   ├── Planner/
│   │   │   │   │   ├── ActivityCard.jsx
│   │   │   │   │   ├── DayPlanner.jsx
│   │   │   │   │   └── plannerService.js
│   │   │   │   ├── SOS/
│   │   │   │   │   ├── SOSButton.jsx
│   │   │   │   │   ├── SOSContacts.jsx
│   │   │   │   │   └── sosService.js
│   │   │   │   ├── Summary/
│   │   │   │   │   ├── DownloadSummaryButton.jsx
│   │   │   │   │   └── TripSummary.jsx
│   │   │   │   ├── Translator/
│   │   │   │   │   ├── TranslatorBox.jsx
│   │   │   │   │   └── translatorService.js
│   │   │   │   └── WhatIfScenarios/
│   │   │   │       ├── ScenarioResult.jsx
│   │   │   │       └── ScenarioSelector.jsx
│   │   │   ├── FamilyMembers/         # Family management
│   │   │   │   ├── AddFamilyMemberForm.jsx
│   │   │   │   ├── FamilyList.jsx
│   │   │   │   └── familyService.js
│   │   │   ├── Onboarding/            # Onboarding flow
│   │   │   │   ├── onboardingService.js
│   │   │   │   ├── OnboardingStep1.jsx
│   │   │   │   ├── OnboardingStep2.jsx
│   │   │   │   └── OnboardingStep3.jsx
│   │   │   └── TransportSelector/     # Transport features
│   │   │       ├── TransportCard.jsx
│   │   │       ├── TransportOptions.jsx
│   │   │       └── transportService.js
│   │   ├── hooks/                     # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useChat.js
│   │   │   ├── useLocation.js
│   │   │   └── useTheme.js
│   │   ├── lib/                       # Utility libraries
│   │   │   ├── currencyFormatter.js
│   │   │   ├── formatDate.js
│   │   │   ├── locationHelper.js
│   │   │   └── utils.js
│   │   ├── pages/                     # Page components
│   │   │   ├── ChatPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── GuideModePage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── OnboardingPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── App.jsx                    # Main application
│   │   └── main.jsx                   # Entry point
│   ├── package.json                   # Frontend dependencies
│   └── vite.config.js                 # Vite configuration
└── README.md                          # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- MongoDB (for backend)

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vinay-kumar-3574/TravelVerse.ai.git
   cd TravelVerse
   ```

2. **Set up environment variables**
   
   Create `.env` files in each directory:
   
   **AI-agent/.env:**
   ```env
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_MODEL=gpt-4
   ```
   
   **backend/.env:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/travelverse
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   ```
   
   **frontend/.env:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=TravelVerse
   ```

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```
   
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:5173`

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) to Pink (#EC4899) gradient
- **Secondary**: Slate (#64748B)
- **Background**: Dark slate (#0F172A)
- **Surface**: Slate 800 (#1E293B)
- **Text**: White (#FFFFFF) and Slate 300 (#CBD5E1)

### Typography
- **Font Family**: Inter (system font fallback)
- **Headings**: Font weights 600-700
- **Body**: Font weight 400
- **Captions**: Font weight 500

### Components
- **Cards**: Rounded corners (12px), subtle shadows
- **Buttons**: Gradient backgrounds, hover effects
- **Inputs**: Clean borders, focus states
- **Modals**: Backdrop blur, smooth animations

## 🔄 Application Flow

### Entry Flow
1. **Landing Page** → Modern, animated landing page
2. **Login/Signup** → Authentication with email/password
3. **Onboarding** → Multi-step form for user preferences
4. **Chat Interface** → Main AI-powered trip planning

### Chat Interface
- **Interactive Chat**: Clean, modern chat interface
- **AI Integration**: GPT-4 powered responses
- **Trip Parsing**: Intelligent trip information extraction
- **Booking Simulation**: Mock booking and payment flows

### Dashboard Features
- **Overview**: Trip status, location, weather
- **Trip Planner**: Daily itineraries and recommendations
- **Translator**: Multi-language translation
- **Budget Planner**: Expense tracking and management
- **What If Scenarios**: Alternative plans and contingencies
- **SOS**: Emergency contacts and assistance
- **Trip Summary**: Post-trip analytics and insights

## 🛠️ Development

### Code Style
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality

### Testing
- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Cypress**: E2E testing (planned)

### Deployment
- **Vercel**: Frontend deployment
- **Railway**: Backend deployment
- **MongoDB Atlas**: Database hosting

## 🔒 Security

### Environment Variables
- All sensitive data is stored in `.env` files
- `.env` files are excluded from version control
- API keys and secrets are properly secured

### Authentication
- JWT-based authentication
- Secure password hashing
- Protected routes and middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 integration
- **Shadcn/ui** for component library
- **Tailwind CSS** for styling framework
- **Framer Motion** for animations
- **Radix UI** for accessible components

## 📞 Support

For support and questions:
- 📧 Email: support@travelverse.com
- 💬 Discord: [TravelVerse Community](https://discord.gg/travelverse)
- 📖 Documentation: [docs.travelverse.com](https://docs.travelverse.com)

---

**Made with ❤️ by the TravelVerse Team** 