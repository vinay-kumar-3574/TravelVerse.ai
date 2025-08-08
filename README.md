# TravelVerse - AI-Powered Travel Assistant

TravelVerse is a comprehensive AI-powered travel application that helps users plan, book, and manage their trips with intelligent assistance. Built with React, Tailwind CSS, and modern web technologies.

## 🌟 Features

### 🎯 Core Features
- **AI-Powered Trip Planning**: Intelligent trip planning with GPT-4 integration
- **Multi-Step Onboarding**: Comprehensive user onboarding process
- **Family Member Management**: Add and manage family members for group trips
- **Real-time Chat Interface**: Lovable.dev-style chat interface for trip planning
- **AI Tour Guide**: Real-time assistance and recommendations during trips
- **Budget Management**: Track and manage trip expenses
- **Emergency Support**: SOS features and emergency contacts
- **Language Translation**: Multi-language support for international travel

### 🎨 UI/UX Features
- **Modern Design**: Beautiful, responsive design with Tailwind CSS
- **Dark/Light Mode**: Theme switching with system preference detection
- **Smooth Animations**: Framer Motion animations throughout the app
- **Mobile-First**: Responsive design optimized for all devices
- **Accessibility**: WCAG compliant components and navigation

### 🔧 Technical Features
- **React 18**: Latest React features and hooks
- **Vite**: Fast development and build tooling
- **TypeScript**: Type-safe development (optional)
- **State Management**: React Context API for global state
- **Routing**: React Router DOM for navigation
- **API Integration**: Axios for HTTP requests
- **Authentication**: JWT-based authentication system
- **Real-time Updates**: WebSocket support for live updates

## 🏗️ Project Structure

```
TravelVerse/
├── frontend/                          # React frontend application
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── ui/                    # Shadcn UI components
│   │   │   │   ├── button.jsx
│   │   │   │   ├── card.jsx
│   │   │   │   ├── dialog.jsx
│   │   │   │   ├── input.jsx
│   │   │   │   ├── label.jsx
│   │   │   │   ├── avatar.jsx
│   │   │   │   ├── tabs.jsx
│   │   │   │   ├── progress.jsx
│   │   │   │   ├── toast.jsx
│   │   │   │   └── tooltip.jsx
│   │   │   ├── Sidebar.jsx            # Main sidebar component
│   │   │   └── ProtectedRoute.jsx     # Route protection component
│   │   ├── context/                   # React Context providers
│   │   │   ├── AuthContext.jsx        # Authentication state
│   │   │   ├── ChatContext.jsx        # Chat and AI state
│   │   │   ├── LocationContext.jsx    # Location services
│   │   │   └── ThemeContext.jsx       # Theme management
│   │   ├── features/                  # Feature-specific components
│   │   │   ├── Auth/                  # Authentication features
│   │   │   │   └── authService.js     # Auth API service
│   │   │   └── ChatInterface/         # Chat interface features
│   │   │       ├── ChatWindow.jsx     # Chat message display
│   │   │       ├── MessageInput.jsx   # Message input component
│   │   │       └── chatService.js     # Chat API service
│   │   ├── pages/                     # Page components
│   │   │   ├── LandingPage.jsx        # Landing page
│   │   │   ├── LoginPage.jsx          # Login page
│   │   │   ├── SignupPage.jsx         # Signup page
│   │   │   ├── OnboardingPage.jsx     # Multi-step onboarding
│   │   │   ├── ChatPage.jsx           # Main chat interface
│   │   │   ├── DashboardPage.jsx      # AI tour guide dashboard
│   │   │   └── GuideModePage.jsx      # AI tour guide mode
│   │   ├── lib/                       # Utility functions
│   │   │   └── utils.js               # Common utilities
│   │   ├── App.jsx                    # Main application component
│   │   └── main.jsx                   # Application entry point
│   ├── package.json                   # Frontend dependencies
│   └── vite.config.js                 # Vite configuration
├── backend/                           # Node.js backend (to be implemented)
├── docs/                              # Documentation
└── README.md                          # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/travelverse.git
   cd travelverse
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Environment variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=TravelVerse
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### Backend Setup (Coming Soon)

The backend will be implemented with:
- Node.js/Express
- MongoDB for database
- JWT for authentication
- GPT-4 API integration
- WebSocket for real-time features

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
2. **Login/Signup** → Authentication with email/password or Google
3. **Onboarding** → Multi-step form for user preferences
4. **Chat Interface** → Main AI-powered trip planning

### Chat Interface
- **Lovable.dev Style**: Clean, modern chat interface
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lovable.dev** for chat interface inspiration
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