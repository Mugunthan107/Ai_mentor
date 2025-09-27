# Environment Variables Setup

## Google Custom Search API Configuration

To enable dynamic roadmap generation, you need to set up Google's Custom Search API.

### Step 1: Create Environment File

Create a `.env` file in your project root with the following variables:

```env
REACT_APP_GOOGLE_API_KEY=your_google_api_key_here
REACT_APP_SEARCH_ENGINE_ID=your_search_engine_id_here
```

### Step 2: Get Google API Credentials

1. **Google Custom Search Engine ID:**
   - Go to [Google Custom Search](https://cse.google.com/)
   - Click "Add" to create a new search engine
   - In "Sites to search", enter: `*` (to search the entire web)
   - Give your search engine a name (e.g., "Learning Roadmap Search")
   - Click "Create"
   - Note down your Search Engine ID from the settings

2. **Google API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Custom Search API"
   - Go to "Credentials" and click "Create Credentials" → "API Key"
   - Copy your API Key

### Step 3: Update Your .env File

Replace the placeholder values in your `.env` file with your actual credentials:

```env
REACT_APP_GOOGLE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_SEARCH_ENGINE_ID=012345678901234567890:abcdefghijk
```

### Step 4: Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
# or
yarn dev
```

### Features Without API Setup

If you don't set up the API credentials, the enhanced roadmap will still work with:
- ✅ Predefined roadmap templates (Machine Learning, Web Development, Data Science, Digital Marketing)
- ✅ Generic roadmap generation for any search query
- ✅ All UI/UX features and animations
- ❌ Real-time search results from Google (will use fallback templates)

### API Usage Limits

- **Free Tier:** 100 searches per day
- **Paid Plans:** Available for higher usage
- **Fallback:** App gracefully handles API failures

### Troubleshooting

**API Key Issues:**
- Ensure your API key has Custom Search API enabled
- Check that the API key is correctly set in your `.env` file
- Verify your Search Engine ID is correct

**Search Not Working:**
- Check browser console for API errors
- Verify your search engine is set to search the entire web (*)
- Ensure you haven't exceeded the free tier limits
