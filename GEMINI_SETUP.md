# Google Gemini API Integration Setup Guide

## Prerequisites
- A Google account
- Existing React/TypeScript project
- Node.js and npm installed

## Step 1: Get Your Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API key" in the left sidebar
4. Create a new API key or use an existing one
5. Copy your API key (keep it secure!)

## Step 2: Install Required Package
The package is already installed in your project:
```bash
npm install @google/generative-ai
```

## Step 3: Set Up Environment Variable
Create a `.env` file in your project root and add your API key:
```
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

**Important:**
- Never commit your `.env` file to version control
- The `.env` file is already added to `.gitignore`
- The `REACT_APP_` prefix is required for React to recognize the environment variable

## Step 4: Test the Integration
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to your mock interview page
3. Try having a conversation with the AI interviewer

## API Rate Limits (Free Tier)
Google Gemini API free tier includes:
- Gemini 2.0 Flash: 15 requests per minute (RPM)
- 1M tokens per minute (TPM)
- 200 requests per day (RPD)

This is generous for development and testing purposes.

## Security Best Practices
- Never expose your API key in client-side code for production
- For production apps, implement a backend proxy to secure your API key
- Consider implementing user authentication and rate limiting
- Monitor your API usage in Google AI Studio

## Error Handling
The updated component includes:
- Try-catch blocks for API calls
- Fallback responses if API fails
- Loading states during AI generation
- Input validation

## Customization Options
You can customize the AI interviewer by modifying the `systemPrompt` in the `generateInterviewResponse` function to:
- Change the interview style (technical, behavioral, etc.)
- Adjust the response length
- Modify the question types
- Add specific industry focus
