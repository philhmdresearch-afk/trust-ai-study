# Trust in AI Agents Study - Online Experiment Platform

This is an unmoderated online experiment platform for validating the S-TIAS (Revised) and Social/Functional Trust in AI Agents scales.

## Overview

This experiment platform allows participants to:
1. Complete two tasks using an assigned AI agent (ChatGPT, Claude, Gemini, or Microsoft Copilot)
2. Answer validated trust questionnaires after each task
3. Upload screenshots of their interactions
4. Provide background information
5. Download their data as a JSON file

## Features

- **Pure client-side application** - No backend required
- **Random assignment** - Participants are randomly assigned to an AI agent and task order
- **Data persistence** - Uses browser localStorage to save progress
- **Screenshot capture** - Participants upload screenshots as evidence of completion
- **Data export** - Participants download their data as JSON at the end
- **Resume capability** - Participants can close and resume the study
- **Mobile responsive** - Works on desktop and mobile devices

## Project Structure

```
trust-ai-experiment/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styling
├── js/
│   ├── config.js          # Study configuration (tasks, scales, etc.)
│   ├── data-manager.js    # Data storage and export
│   ├── experiment.js      # Experiment flow and UI
│   └── main.js            # Entry point
├── data/                  # (Empty - for documentation)
├── screenshots/           # (Empty - for documentation)
└── README.md             # This file
```

## Deployment Options

### Option 1: GitHub Pages (Recommended)

1. **Create a GitHub repository:**
   ```bash
   cd trust-ai-experiment
   git init
   git add .
   git commit -m "Initial commit: Trust in AI Agents study"
   ```

2. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/trust-ai-study.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be available at: `https://YOUR-USERNAME.github.io/trust-ai-study/`

### Option 2: Netlify

1. **Install Netlify CLI (optional):**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy via Netlify website:**
   - Go to [netlify.com](https://www.netlify.com)
   - Drag and drop the `trust-ai-experiment` folder
   - Your site will be live immediately with a random URL
   - You can customize the URL in settings

3. **Or deploy via CLI:**
   ```bash
   cd trust-ai-experiment
   netlify deploy --prod
   ```

### Option 3: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd trust-ai-experiment
   vercel --prod
   ```

## Local Testing

To test locally before deployment:

1. **Using Python:**
   ```bash
   cd trust-ai-experiment
   python3 -m http.server 8000
   ```
   Then open: `http://localhost:8000`

2. **Using Node.js:**
   ```bash
   cd trust-ai-experiment
   npx http-server -p 8000
   ```
   Then open: `http://localhost:8000`

3. **Using VS Code:**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

## Study Flow

1. **Consent** - Participant reads and consents to study
2. **Briefing** - Random agent assignment and task order
3. **Task 1** - Complete first task with assigned agent
4. **Scales 1** - Answer trust questionnaires (order counterbalanced)
5. **Screenshot 1** - Upload screenshot of interaction
6. **Clear Chat Reminder** - Instruction to clear chat
7. **Task 2** - Complete second task
8. **Scales 2** - Answer trust questionnaires (reversed order)
9. **Screenshot 2** - Upload screenshot of interaction
10. **Background** - Demographics and AI experience questions
11. **Completion** - Download data file

## Data Collection

### What Gets Collected

- Participant ID (auto-generated)
- Assigned AI agent
- Task order and completion times
- All scale responses (Social/Functional Trust, s-TIAS, usefulness, satisfaction)
- Screenshots (embedded as base64)
- Background information
- Timestamps

### Data Format

Data is exported as JSON with this structure:

```json
{
  "participantId": "P1738410000000-abc123",
  "startTime": "2026-02-01T10:00:00.000Z",
  "assignedAgent": {
    "id": "chatgpt",
    "name": "ChatGPT",
    "url": "https://chat.openai.com"
  },
  "taskOrder": ["informational", "generative"],
  "task1": {
    "type": "informational",
    "taskId": "info_1",
    "startTime": "2026-02-01T10:05:00.000Z",
    "endTime": "2026-02-01T10:15:00.000Z",
    "scales": {
      "socialFunctional": { "func_1": 6, "func_2": 5, ... },
      "sTIAS": { "stias_1": 6, "stias_2": 6, "stias_3": 5 },
      "singleItems": { "usefulness": 6, "satisfaction": 5 }
    },
    "screenshot": "data:image/png;base64,..."
  },
  "task2": { ... },
  "background": {
    "role": "Software Engineer",
    "age": "25-34",
    ...
  },
  "completionTime": "2026-02-01T10:30:00.000Z",
  "completed": true
}
```

## Collecting Data from Participants

### Method 1: Email Collection
Ask participants to email their JSON file to you after completion.

### Method 2: File Upload Service
Set up a simple file upload service (e.g., Dropbox File Request, Google Form with file upload).

### Method 3: Automated Collection (Requires Backend)
If you need automated collection, you can add a simple backend:
- Use Firebase/Supabase for database storage
- Modify `data-manager.js` to send data to your backend
- This requires additional setup but enables real-time data collection

## Customization

### Modify Tasks

Edit `js/config.js` to change tasks:

```javascript
informationalTasks: [
    {
        id: 'info_1',
        title: 'Your Task Title',
        description: 'Task description',
        instructions: 'Detailed instructions'
    }
]
```

### Modify Scales

Edit `js/config.js` to change scale items:

```javascript
trustScale: {
    functional: [
        { id: 'func_1', text: 'Your item text here' }
    ]
}
```

### Change AI Agents

Edit `js/config.js` to modify the agent list:

```javascript
agents: [
    { id: 'agent_id', name: 'Agent Name', url: 'https://agent-url.com' }
]
```

## Testing Features

### Reset Study Data
Press `Ctrl+Shift+R` to clear all data and restart (useful for testing).

### Test Different Paths
The study automatically saves progress, so you can:
- Close and reopen to test resume functionality
- Complete partially to test data persistence
- Test on different devices/browsers

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Mobile browsers: ✅ Responsive design

## Troubleshooting

### Screenshots Too Large
If JSON files are too large due to screenshots:
- Ask participants to crop screenshots
- Or modify `data-manager.js` to compress images before storing

### Data Not Saving
- Check browser localStorage is enabled
- Check browser is not in private/incognito mode
- Ensure participants don't clear browser data mid-study

### Study Won't Load
- Check browser console for errors
- Ensure all JS files are loaded correctly
- Test in different browser

## Research Plan

The full research plan is included in this directory:
`Research Plan :: Validating the S-TIAS and Social and Functional Trust in AI scales.rtf`

## Support

For questions or issues with the experiment platform, please contact the researcher.

## License

This experiment platform is for research purposes only.