// Configuration for the Trust in AI Agents Study

const CONFIG = {
    // AI Agents for random assignment
    agents: [
        { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com' },
        { id: 'claude', name: 'Claude', url: 'https://claude.ai' },
        { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com' },
        { id: 'copilot', name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com' }
    ],

    // Task types
    taskTypes: ['informational', 'generative'],

    // Informational tasks
    informationalTasks: [
        {
            id: 'info_1',
            title: 'Summarize a Document',
            description: 'Use the AI Agent to summarize a technical document or report relevant to your work or interests.',
            instructions: 'Provide the AI Agent with a document (paste text or describe it) and ask it to create a concise summary. After receiving the initial summary, ask 2-3 relevant follow-up questions based on the output to explore specific aspects in more detail. <strong>Important:</strong> Do not copy and paste prompts from these instructions - generate your own prompts in your own words.'
        },
        {
            id: 'info_2',
            title: 'Answer a Domain-Specific Question',
            description: 'Ask the AI Agent a question related to the domain you work in.',
            instructions: 'Ask the AI Agent a question related to the domain you work in. After receiving the initial response, ask 2-3 relevant follow-up questions based on the output to explore the topic further.'
        },
        {
            id: 'info_3',
            title: 'Translate Technical Information',
            description: 'Ask the AI Agent to translate technical or complex information into plain language.',
            instructions: 'Provide technical content (e.g., a technical specification, research finding, or jargon-heavy text) and ask the AI Agent to explain it in simple, accessible terms. After receiving the initial explanation, ask 2-3 relevant follow-up questions to clarify specific points or explore related concepts. <strong>Important:</strong> Do not copy and paste prompts from these instructions - generate your own prompts in your own words.'
        }
    ],

    // Generative tasks
    generativeTasks: [
        {
            id: 'gen_1',
            title: 'Draft an Email or Communication',
            description: 'Use the AI Agent to draft a professional email or communication.',
            instructions: 'Describe the purpose and context of the email (e.g., requesting information, following up on a meeting) and ask the AI Agent to draft it for you. After receiving the initial draft, ask 2-3 relevant follow-up questions to refine the tone, add specific details, or adjust the content. <strong>Important:</strong> Do not copy and paste prompts from these instructions - generate your own prompts in your own words.'
        },
        {
            id: 'gen_2',
            title: 'Create a Meeting Agenda',
            description: 'Ask the AI Agent to create a meeting agenda or action list.',
            instructions: 'Provide the AI Agent with the meeting topic and objectives, and ask it to generate a structured agenda with time allocations and discussion points. After receiving the initial agenda, ask 2-3 relevant follow-up questions to refine specific sections, adjust timing, or add additional items. <strong>Important:</strong> Do not copy and paste prompts from these instructions - generate your own prompts in your own words.'
        },
        {
            id: 'gen_3',
            title: 'Draft a Knowledge-Base Article',
            description: 'Use the AI Agent to draft an article or guide for a knowledge base.',
            instructions: 'Describe the topic and target audience for the article, and ask the AI Agent to create a structured draft with sections and key information. After receiving the initial draft, ask 2-3 relevant follow-up questions to expand specific sections, add examples, or adjust the level of detail. <strong>Important:</strong> Do not copy and paste prompts from these instructions - generate your own prompts in your own words.'
        },
        {
            id: 'gen_4',
            title: 'Recommend Tools or Resources',
            description: 'Ask the AI Agent to recommend tools or resources for a specific project or task.',
            instructions: 'Describe your project needs or goals, and ask the AI Agent to suggest appropriate tools, software, or resources with brief explanations. After receiving the initial recommendations, ask 2-3 relevant follow-up questions to compare specific options, understand implementation details, or explore alternatives. <strong>Important:</strong> Do not copy and paste prompts from these instructions - generate your own prompts in your own words.'
        }
    ],

    // s-TIAS (Revised) - 3 items
    sTIAS: [
        { id: 'stias_1', text: 'I am confident in the AI Agent.' },
        { id: 'stias_2', text: 'I can rely on the AI Agent.' },
        { id: 'stias_3', text: 'I can trust the AI Agent.' }
    ],

    // Social/Functional Trust Scale - 20 items (Semantic Differential Format)
    // Note: Poles will be randomly reversed for each participant to control for response bias
    trustScale: {
        functional: [
            { id: 'func_1', negPole: 'Unreliable', posPole: 'Reliable' },
            { id: 'func_2', negPole: 'Inaccurate', posPole: 'Accurate' },
            { id: 'func_3', negPole: 'Inconsistent', posPole: 'Consistent' },
            { id: 'func_4', negPole: 'Unpredictable', posPole: 'Predictable' },
            { id: 'func_5', negPole: 'Inefficient', posPole: 'Efficient' },
            { id: 'func_6', negPole: 'Error-prone', posPole: 'Error-resistant' },
            { id: 'func_7', negPole: 'Imprecise', posPole: 'Precise' },
            { id: 'func_8', negPole: 'Fragile', posPole: 'Robust' },
            { id: 'func_9', negPole: 'Slow', posPole: 'Timely' },
            { id: 'func_10', negPole: 'Unsafe', posPole: 'Safe' }
        ],
        social: [
            { id: 'soc_1', negPole: 'Opaque', posPole: 'Transparent' },
            { id: 'soc_2', negPole: 'Unfair', posPole: 'Fair' },
            { id: 'soc_3', negPole: 'Disrespectful', posPole: 'Respectful' },
            { id: 'soc_4', negPole: 'Privacy-invasive', posPole: 'Privacy-protective' },
            { id: 'soc_5', negPole: 'Unaccountable', posPole: 'Accountable' },
            { id: 'soc_6', negPole: 'Non-compliant', posPole: 'Compliant' },
            { id: 'soc_7', negPole: 'Manipulative', posPole: 'Non-manipulative' },
            { id: 'soc_8', negPole: 'Uncontrollable', posPole: 'Controllable' },
            { id: 'soc_9', negPole: 'Dishonest', posPole: 'Honest' },
            { id: 'soc_10', negPole: 'Unclear', posPole: 'Clear' }
        ]
    },

    // Semantic differential scale (7-point, no labels on intermediate points)
    semanticDifferentialScale: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 7 }
    ],

    // Single-item measures
    singleItems: [
        { id: 'usefulness', text: 'How useful was the AI Agent for completing this task?' },
        { id: 'satisfaction', text: 'How satisfied are you with the AI Agent\'s performance on this task?' }
    ],

    // Likert scale labels (7-point)
    likertScale: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Somewhat Disagree' },
        { value: 4, label: 'Neither Agree nor Disagree' },
        { value: 5, label: 'Somewhat Agree' },
        { value: 6, label: 'Agree' },
        { value: 7, label: 'Strongly Agree' }
    ],

    // Usefulness scale labels (7-point)
    usefulnessScale: [
        { value: 1, label: 'Not at all useful' },
        { value: 2, label: 'Slightly useful' },
        { value: 3, label: 'Somewhat useful' },
        { value: 4, label: 'Moderately useful' },
        { value: 5, label: 'Useful' },
        { value: 6, label: 'Very useful' },
        { value: 7, label: 'Extremely useful' }
    ],

    // Satisfaction scale labels (7-point)
    satisfactionScale: [
        { value: 1, label: 'Very dissatisfied' },
        { value: 2, label: 'Dissatisfied' },
        { value: 3, label: 'Somewhat dissatisfied' },
        { value: 4, label: 'Neither satisfied nor dissatisfied' },
        { value: 5, label: 'Somewhat satisfied' },
        { value: 6, label: 'Satisfied' },
        { value: 7, label: 'Very satisfied' }
    ],

    // Background questions
    demographics: {
        role: {
            question: 'What is your current role or occupation?',
            type: 'text'
        },
        age: {
            question: 'What is your age range?',
            type: 'select',
            options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'Prefer not to say']
        },
        gender: {
            question: 'What is your gender?',
            type: 'select',
            options: ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say']
        },
        education: {
            question: 'What is your highest level of education?',
            type: 'select',
            options: [
                'High school or equivalent',
                'Some college',
                'Bachelor\'s degree',
                'Master\'s degree',
                'Doctoral degree',
                'Other',
                'Prefer not to say'
            ]
        }
    },

    aiExperience: {
        frequency: {
            question: 'How often do you use AI tools or agents?',
            type: 'select',
            options: ['Daily', 'Several times a week', 'Weekly', 'Monthly', 'Rarely', 'Never']
        },
        literacy: {
            question: 'How would you rate your understanding of AI technology?',
            type: 'select',
            options: ['Expert', 'Advanced', 'Intermediate', 'Beginner', 'No knowledge']
        }
    },

    agentFamiliarity: {
        priorUse: {
            question: 'Have you used [AGENT_NAME] before this study?',
            type: 'select',
            options: ['Yes, frequently', 'Yes, occasionally', 'Yes, rarely', 'No, this is my first time']
        },
        familiarity: {
            question: 'How familiar are you with [AGENT_NAME]?',
            type: 'select',
            options: ['Very familiar', 'Somewhat familiar', 'Slightly familiar', 'Not at all familiar']
        }
    }
};

// Made with Bob
