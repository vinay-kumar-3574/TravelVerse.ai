const fs = require('fs');

const envContent = `# OpenAI Configuration
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4

# AI Agent Configuration
AI_MEMORY_ENABLED=true
AI_CONVERSATION_HISTORY_LIMIT=20
AI_MAX_TOKENS=2000
AI_TEMPERATURE=0.7`;

fs.writeFileSync('.env', envContent);
console.log('✅ .env file created successfully!');

