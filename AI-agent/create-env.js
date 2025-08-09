const fs = require('fs');

const envContent = `# OpenAI Configuration
OPENAI_API_KEY=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
OPENAI_MODEL=gpt-4

# AI Agent Configuration
AI_MEMORY_ENABLED=true
AI_CONVERSATION_HISTORY_LIMIT=20
AI_MAX_TOKENS=2000
AI_TEMPERATURE=0.7`;

fs.writeFileSync('.env', envContent);
console.log('✅ .env file created successfully!');
