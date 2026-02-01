// Data Manager - Handles data storage and export

class DataManager {
    constructor() {
        this.storageKey = 'trustAIStudyData';
        this.data = this.loadData();
    }

    // Initialize or load existing data
    loadData() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }
        
        return {
            participantId: this.generateParticipantId(),
            startTime: new Date().toISOString(),
            assignedAgent: null,
            taskOrder: [],
            poleReversal: Math.random() < 0.5, // Randomly reverse poles for semantic differential
            task1: {
                type: null,
                taskId: null,
                startTime: null,
                endTime: null,
                scales: {},
                screenshot: null
            },
            task2: {
                type: null,
                taskId: null,
                startTime: null,
                endTime: null,
                scales: {},
                screenshot: null
            },
            background: {},
            completionTime: null,
            completed: false
        };
    }

    // Generate unique participant ID
    generateParticipantId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 9);
        return `P${timestamp}-${random}`;
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    // Set assigned agent
    setAgent(agent) {
        this.data.assignedAgent = agent;
        this.saveData();
    }

    // Set task order
    setTaskOrder(order) {
        this.data.taskOrder = order;
        this.saveData();
    }

    // Start task
    startTask(taskNumber, taskType, taskId) {
        const taskKey = `task${taskNumber}`;
        this.data[taskKey].type = taskType;
        this.data[taskKey].taskId = taskId;
        this.data[taskKey].startTime = new Date().toISOString();
        this.saveData();
    }

    // End task
    endTask(taskNumber) {
        const taskKey = `task${taskNumber}`;
        this.data[taskKey].endTime = new Date().toISOString();
        this.saveData();
    }

    // Save scale responses
    saveScaleResponses(taskNumber, scaleType, responses) {
        const taskKey = `task${taskNumber}`;
        this.data[taskKey].scales[scaleType] = responses;
        this.saveData();
    }

    // Save screenshot
    saveScreenshot(taskNumber, screenshotData) {
        const taskKey = `task${taskNumber}`;
        this.data[taskKey].screenshot = screenshotData;
        this.saveData();
    }

    // Save background data
    saveBackground(backgroundData) {
        this.data.background = backgroundData;
        this.saveData();
    }

    // Mark study as complete
    markComplete() {
        this.data.completionTime = new Date().toISOString();
        this.data.completed = true;
        this.saveData();
    }

    // Get current data
    getData() {
        return this.data;
    }

    // Export data as JSON file
    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `trust-ai-study-${this.data.participantId}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Export data as CSV file (analysis-ready format)
    exportCSV() {
        const d = this.data;
        const rows = [];
        
        // Headers
        const headers = [
            'Participant_ID', 'Start_Time', 'Completion_Time', 'Completed',
            'Agent_ID', 'Agent_Name', 'Task_Order', 'Pole_Reversal',
            // Task 1
            'Task1_Type', 'Task1_ID', 'Task1_Start', 'Task1_End', 'Task1_Duration_Min',
            // Task 1 - Functional Trust (10 items)
            'T1_Func_1', 'T1_Func_2', 'T1_Func_3', 'T1_Func_4', 'T1_Func_5',
            'T1_Func_6', 'T1_Func_7', 'T1_Func_8', 'T1_Func_9', 'T1_Func_10',
            // Task 1 - Social Trust (10 items)
            'T1_Soc_1', 'T1_Soc_2', 'T1_Soc_3', 'T1_Soc_4', 'T1_Soc_5',
            'T1_Soc_6', 'T1_Soc_7', 'T1_Soc_8', 'T1_Soc_9', 'T1_Soc_10',
            // Task 1 - s-TIAS (3 items)
            'T1_STIAS_1', 'T1_STIAS_2', 'T1_STIAS_3',
            // Task 1 - Single items
            'T1_Usefulness', 'T1_Satisfaction',
            'T1_Usefulness_Reason', 'T1_Satisfaction_Reason',
            // Task 2
            'Task2_Type', 'Task2_ID', 'Task2_Start', 'Task2_End', 'Task2_Duration_Min',
            // Task 2 - Functional Trust (10 items)
            'T2_Func_1', 'T2_Func_2', 'T2_Func_3', 'T2_Func_4', 'T2_Func_5',
            'T2_Func_6', 'T2_Func_7', 'T2_Func_8', 'T2_Func_9', 'T2_Func_10',
            // Task 2 - Social Trust (10 items)
            'T2_Soc_1', 'T2_Soc_2', 'T2_Soc_3', 'T2_Soc_4', 'T2_Soc_5',
            'T2_Soc_6', 'T2_Soc_7', 'T2_Soc_8', 'T2_Soc_9', 'T2_Soc_10',
            // Task 2 - s-TIAS (3 items)
            'T2_STIAS_1', 'T2_STIAS_2', 'T2_STIAS_3',
            // Task 2 - Single items
            'T2_Usefulness', 'T2_Satisfaction',
            'T2_Usefulness_Reason', 'T2_Satisfaction_Reason',
            // Demographics
            'Role', 'Age', 'Gender', 'Education',
            // AI Experience
            'AI_Frequency', 'AI_Literacy', 'Agent_Prior_Use', 'Agent_Familiarity',
            // Screenshot counts
            'Task1_Screenshot_Count', 'Task2_Screenshot_Count'
        ];
        
        rows.push(headers.join(','));
        
        // Calculate durations
        const task1Duration = d.task1.startTime && d.task1.endTime ?
            ((new Date(d.task1.endTime) - new Date(d.task1.startTime)) / 60000).toFixed(2) : '';
        const task2Duration = d.task2.startTime && d.task2.endTime ?
            ((new Date(d.task2.endTime) - new Date(d.task2.startTime)) / 60000).toFixed(2) : '';
        
        // Data row
        const row = [
            d.participantId,
            d.startTime,
            d.completionTime || '',
            d.completed,
            d.assignedAgent?.id || '',
            d.assignedAgent?.name || '',
            d.taskOrder.join(';'),
            d.poleReversal ? 'Reversed' : 'Normal',
            // Task 1
            d.task1.type || '',
            d.task1.taskId || '',
            d.task1.startTime || '',
            d.task1.endTime || '',
            task1Duration,
            // Task 1 scales
            ...this.extractScaleValues(d.task1, 'func', 10),
            ...this.extractScaleValues(d.task1, 'soc', 10),
            ...this.extractScaleValues(d.task1, 'stias', 3),
            d.task1.scales?.singleItems?.usefulness || '',
            d.task1.scales?.singleItems?.satisfaction || '',
            this.escapeCSV(d.task1.scales?.singleItems?.usefulness_reason || ''),
            this.escapeCSV(d.task1.scales?.singleItems?.satisfaction_reason || ''),
            // Task 2
            d.task2.type || '',
            d.task2.taskId || '',
            d.task2.startTime || '',
            d.task2.endTime || '',
            task2Duration,
            // Task 2 scales
            ...this.extractScaleValues(d.task2, 'func', 10),
            ...this.extractScaleValues(d.task2, 'soc', 10),
            ...this.extractScaleValues(d.task2, 'stias', 3),
            d.task2.scales?.singleItems?.usefulness || '',
            d.task2.scales?.singleItems?.satisfaction || '',
            this.escapeCSV(d.task2.scales?.singleItems?.usefulness_reason || ''),
            this.escapeCSV(d.task2.scales?.singleItems?.satisfaction_reason || ''),
            // Demographics
            this.escapeCSV(d.background?.role || ''),
            d.background?.age || '',
            d.background?.gender || '',
            d.background?.education || '',
            // AI Experience
            d.background?.aiFrequency || '',
            d.background?.aiLiteracy || '',
            d.background?.priorUse || '',
            d.background?.familiarity || '',
            // Screenshot counts
            Array.isArray(d.task1.screenshot) ? d.task1.screenshot.length : (d.task1.screenshot ? 1 : 0),
            Array.isArray(d.task2.screenshot) ? d.task2.screenshot.length : (d.task2.screenshot ? 1 : 0)
        ];
        
        rows.push(row.join(','));
        
        // Create and download CSV
        const csvContent = rows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `trust-ai-study-${this.data.participantId}-ANALYSIS.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Helper: Extract scale values in order
    extractScaleValues(task, prefix, count) {
        const values = [];
        for (let i = 1; i <= count; i++) {
            const key = `${prefix}_${i}`;
            values.push(task.scales?.socialFunctional?.[key] || task.scales?.sTIAS?.[`stias_${i}`] || '');
        }
        return values;
    }

    // Helper: Escape CSV values
    escapeCSV(value) {
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
    }

    // Clear all data (for testing)
    clearData() {
        localStorage.removeItem(this.storageKey);
        this.data = this.loadData();
    }

    // Check if study is already in progress
    isInProgress() {
        return this.data.assignedAgent !== null && !this.data.completed;
    }

    // Check if study is completed
    isCompleted() {
        return this.data.completed;
    }

    // Get current task number
    getCurrentTaskNumber() {
        if (!this.data.task1.startTime) return 1;
        if (!this.data.task1.endTime) return 1;
        if (!this.data.task2.startTime) return 2;
        if (!this.data.task2.endTime) return 2;
        return 0; // All tasks complete
    }

    // Validate scale responses
    validateScaleResponses(responses, expectedCount) {
        const answered = Object.keys(responses).length;
        return answered === expectedCount;
    }

    // Convert image file to base64
    async imageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

// Made with Bob
