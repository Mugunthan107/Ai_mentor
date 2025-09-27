# Troubleshooting Guide for Adaptive Mock Interview AI

## Problem: AI Generating Same Questions

If your AI interviewer is generating the same responses, here are the most common causes and solutions:

### 1. API Key Issues

**Check your environment variables:**
```bash
# Verify your .env file contains:
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

**Test your API key:**
- Go to [Google AI Studio](https://aistudio.google.com/)
- Try generating content with the same API key
- Make sure the key has proper permissions

### 2. Model Configuration

**Update to the latest model:**
```javascript
// Use the newer model version
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
```

### 3. Rate Limiting

**Check if you're hitting rate limits:**
- Free tier: 15 requests per minute
- Add delay between requests if needed
- Monitor usage in Google AI Studio

### 4. Prompt Engineering Issues

The new adaptive version includes:

**Smart Response Analysis:**
- Detects skills mentioned in responses
- Identifies confidence levels
- Recognizes stress indicators
- Tracks conversation context

**Dynamic Question Generation:**
- 5 distinct interview phases
- Context-aware prompts
- Adaptive difficulty based on responses
- Personalized follow-up questions

**Phase-Based System:**
1. **Introduction** - Building rapport and basic info
2. **Behavioral** - STAR method questions
3. **Technical** - Role-specific technical questions
4. **Stress Test** - Pressure scenarios and quick thinking
5. **Closing** - Wrap-up and candidate questions

### 5. Enhanced Features

**Visual Progress Tracking:**
- Phase indicators showing current interview stage
- Question counter
- Reset functionality for new sessions

**Smart Fallbacks:**
- Phase-appropriate backup questions
- Error handling for API failures
- Contextual default responses

**User Experience Improvements:**
- Better input handling
- Visual feedback during AI thinking
- Helpful tips and guidance

### 6. Testing the Adaptive System

To test if it's working:

1. **Start with basic introduction**: "Hi, I'm John and I'm preparing for a software developer role"
2. **Mention specific skills**: "I have experience with React and Node.js"
3. **Show confidence/uncertainty**: Use phrases like "I'm confident in..." or "I'm still learning..."
4. **Progress through phases**: Answer 2-3 questions to see phase transitions

### 7. Debug Console

Add this to check what's happening:
```javascript
// Add to your component for debugging
useEffect(() => {
  console.log('Current phase:', interviewPhase);
  console.log('Question count:', questionCount);
  console.log('User profile:', userProfile);
}, [interviewPhase, questionCount, userProfile]);
```

### 8. Advanced Customization

You can further customize by:

**Adding Industry-Specific Questions:**
- Modify the skill detection arrays
- Add domain-specific terminology
- Include role-specific scenarios

**Adjusting Stress Levels:**
- Modify when stress phase begins
- Change stress indicators detection
- Customize pressure question types

**Personalizing Responses:**
- Track user performance over sessions
- Build learning profiles
- Adapt to individual weak spots

## Key Improvements in This Version

✅ **Context Awareness**: Remembers previous responses
✅ **Adaptive Questioning**: Questions change based on user input
✅ **Phase Management**: Structured interview flow
✅ **Smart Analysis**: Detects skills, confidence, and stress
✅ **Better Error Handling**: Graceful failures with smart fallbacks
✅ **Visual Progress**: Clear phase indicators
✅ **Reset Functionality**: Easy restart capability

This version should eliminate the repetitive question problem and provide a truly adaptive interview experience!

## Common Issues & Solutions

### Issue: "API key not found" Error
**Solution**: 
1. Create `.env` file in project root
2. Add `REACT_APP_GEMINI_API_KEY=your_key_here`
3. Restart development server

### Issue: Questions Not Adapting
**Solution**:
1. Check browser console for errors
2. Verify API key is working
3. Try mentioning specific skills in responses
4. Use the debug console code above

### Issue: Phase Not Changing
**Solution**:
1. Answer more questions (phases change after 2+ questions)
2. Mention technical skills to trigger technical phase
3. Use stress-related words to trigger stress phase

### Issue: AI Responses Too Generic
**Solution**:
1. Be more specific in your answers
2. Mention your role and experience
3. Include technical details
4. The AI adapts based on your input specificity

## Performance Tips

1. **Be Specific**: The more details you provide, the better the AI can adapt
2. **Mention Skills**: Include technical skills you know to get relevant questions
3. **Show Personality**: The AI picks up on confidence levels and stress indicators
4. **Use Full Sentences**: Detailed responses lead to better follow-up questions

## Advanced Features

### Custom Skill Detection
Add your own skills to the detection array:
```javascript
const techSkills = ['javascript', 'react', 'node', 'python', 'java', 'sql', 'aws', 'docker', 'git', 'your-skill-here'];
```

### Phase Timing Customization
Adjust when phases change:
```javascript
// Modify these thresholds in the generateInterviewResponse function
if (newQuestionCount > 8) {
  setInterviewPhase('closing');
} else if (newQuestionCount > 6 || analysis.hasStressIndicators) {
  setInterviewPhase('stress');
}
```

### Stress Level Detection
Customize stress indicators:
```javascript
const stressIndicators = ['difficult', 'challenge', 'stress', 'pressure', 'nervous', 'worried', 'your-indicator'];
```

This adaptive system provides a much more realistic and personalized interview experience!
