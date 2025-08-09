# AI Agent Setup Guide

## Environment Variables Required

Create a `.env` file in the AI-agent directory with the following variables:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-NLZbHF8i4yEyE1T2Nv9ePrSIuR-J3aDc7XToFBpjYX4VLWbvTG3YvQBO1lckA2kRP8-YqhXs6fT3BlbkFJnX9CxlTc0b5zLEACl-5ZJ9SkKmoVs51Wll50z8Uv9JiI_JCsRShM3Ngsgvn3
gGxXR8wxIV4F4A
OPENAI_MODEL=gpt-4

# AI Agent Configuration
AI_MEMORY_ENABLED=true
AI_CONVERSATION_HISTORY_LIMIT=20
AI_MAX_TOKENS=2000
AI_TEMPERATURE=0.7
```

## Steps to Set Up:

1. **Get OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key

2. **Create .env file:**
   - Create a file named `.env` in the AI-agent directory
   - Add your OpenAI API key to the file

3. **Test the setup:**
   ```bash
   cd backend
   node test-ai-agent.js
   ```

## Backend Environment Variables

Also create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travelverse
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key_here
```

## Frontend Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=TravelVerse
```

## Testing the Integration

Once you've set up the environment variables, run:

```bash
# Test AI agent
cd backend
node test-ai-agent.js

# Start backend
npm start

# Start frontend (in another terminal)
cd frontend
npm run dev
```
