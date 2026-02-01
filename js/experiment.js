// Experiment Logic - Handles experiment flow and UI rendering

class Experiment {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.currentStep = 'consent';
        this.app = document.getElementById('app');
    }

    // Start the experiment
    start() {
        // Check if study is already in progress or completed
        if (this.dataManager.isCompleted()) {
            this.showCompletionScreen();
            return;
        }
        
        if (this.dataManager.isInProgress()) {
            this.resumeExperiment();
            return;
        }

        this.showConsent();
    }

    // Resume experiment from where participant left off
    resumeExperiment() {
        const data = this.dataManager.getData();
        
        if (!data.task1.startTime) {
            this.showTask(1);
        } else if (!data.task1.scales.socialFunctional) {
            this.showScales(1);
        } else if (!data.task1.screenshot) {
            this.showScreenshotUpload(1);
        } else if (!data.task2.startTime) {
            this.showClearChatReminder();
        } else if (!data.task2.scales.socialFunctional) {
            this.showScales(2);
        } else if (!data.task2.screenshot) {
            this.showScreenshotUpload(2);
        } else if (!data.background.role) {
            this.showBackgroundQuestions();
        } else {
            this.showCompletionScreen();
        }
    }

    // Show consent form
    showConsent() {
        this.app.innerHTML = `
            <h1>Trust in AI Agents Study</h1>
            <h2>Informed Consent</h2>
            
            <p><strong>Purpose:</strong> This study aims to validate measures of trust in AI agents following real interactions with contemporary AI systems.</p>
            
            <p><strong>What you will do:</strong></p>
            <ul>
                <li>Complete two tasks using an AI agent (ChatGPT, Claude, Gemini, or Microsoft Copilot)</li>
                <li>Answer questions about your experience after each task</li>
                <li>Provide screenshots of your interactions</li>
                <li>Complete background questions</li>
            </ul>
            
            <p><strong>Time commitment:</strong> Approximately 20-30 minutes</p>
            
            <p><strong>Data handling:</strong></p>
            <ul>
                <li>Your responses will be stored locally in your browser</li>
                <li>At the end, you will download your data as a file</li>
                <li>You will share this file with the researcher</li>
                <li>Your data will be kept confidential and used only for research purposes</li>
                <li>You may withdraw at any time</li>
            </ul>
            
            <div class="checkbox-group">
                <label>
                    <input type="checkbox" id="consent-check">
                    I have read and understood the above information, and I consent to participate in this study
                </label>
            </div>
            
            <button class="btn" id="consent-btn" disabled>Continue</button>
        `;

        const checkbox = document.getElementById('consent-check');
        const btn = document.getElementById('consent-btn');
        
        checkbox.addEventListener('change', () => {
            btn.disabled = !checkbox.checked;
        });
        
        btn.addEventListener('click', () => this.showBriefing());
    }

    // Show briefing and assign agent
    showBriefing() {
        // Randomly assign agent
        const agent = CONFIG.agents[Math.floor(Math.random() * CONFIG.agents.length)];
        this.dataManager.setAgent(agent);
        
        // Randomly assign task order
        const taskOrder = Math.random() < 0.5 
            ? ['informational', 'generative'] 
            : ['generative', 'informational'];
        this.dataManager.setTaskOrder(taskOrder);

        this.app.innerHTML = `
            <h1>Study Briefing</h1>
            
            <div class="reminder-box">
                <h3>⚠️ Setup Requirements</h3>
                <p><strong>You will need TWO screens (or windows) for this study:</strong></p>
                <ul>
                    <li><strong>Screen 1:</strong> This study interface (keep it open throughout)</li>
                    <li><strong>Screen 2:</strong> The AI Agent chat window (${agent.name})</li>
                </ul>
                <p>This setup allows you to follow instructions while interacting with the AI Agent and easily switch between windows to answer questions.</p>
            </div>
            
            <div class="agent-info">
                <h3>Your Assigned AI Agent</h3>
                <p><strong>${agent.name}</strong></p>
                <p>You will use ${agent.name} to complete both tasks in this study.</p>
                <p>Access ${agent.name} at: <a href="${agent.url}" target="_blank">${agent.url}</a></p>
            </div>
            
            <h2>What to Expect</h2>
            <p>You will complete two tasks using ${agent.name}:</p>
            <ol>
                <li><strong>Task 1:</strong> A ${taskOrder[0]} task</li>
                <li><strong>Task 2:</strong> A ${taskOrder[1]} task</li>
            </ol>
            
            <h2>After Each Task</h2>
            <p>After completing each task, you will:</p>
            <ol>
                <li>Answer questions about your experience (keep your chat window open!)</li>
                <li>Upload screenshots of your interaction (1-5 images)</li>
            </ol>
            
            <div class="reminder-box">
                <strong>Important:</strong> Please keep your ${agent.name} chat window open until you have completed the questionnaires for that task. You will be reminded to take screenshots before moving on.
            </div>
            
            <button class="btn" id="start-btn">Start Task 1</button>
        `;

        document.getElementById('start-btn').addEventListener('click', () => this.showTask(1));
    }

    // Show task instructions
    showTask(taskNumber) {
        const data = this.dataManager.getData();
        const taskType = data.taskOrder[taskNumber - 1];
        const tasks = taskType === 'informational' ? CONFIG.informationalTasks : CONFIG.generativeTasks;
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        
        this.dataManager.startTask(taskNumber, taskType, task.id);

        this.app.innerHTML = `
            <h1>Task ${taskNumber} of 2</h1>
            
            <div class="agent-info">
                <strong>Using:</strong> ${data.assignedAgent.name}
            </div>
            
            <div class="task-box">
                <h2>${task.title}</h2>
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Instructions:</strong> ${task.instructions}</p>
            </div>
            
            <div class="reminder-box">
                <strong>Remember:</strong>
                <ul>
                    <li>Keep your ${data.assignedAgent.name} chat window open after completing the task</li>
                    <li>You will need it to answer questions and take screenshots</li>
                    <li><strong>Do NOT copy and paste prompts from the instructions above</strong> - write your own prompts in your own words</li>
                    <li>Your screenshots must show the prompts you created</li>
                </ul>
            </div>
            
            <h3>Steps:</h3>
            <ol>
                <li>Open ${data.assignedAgent.name} in a new tab: <a href="${data.assignedAgent.url}" target="_blank">${data.assignedAgent.url}</a></li>
                <li>Complete the task described above using your own prompts (not copied from instructions)</li>
                <li>Ask 2-3 follow-up questions to explore the topic further</li>
                <li>Keep the chat window open</li>
                <li>Return here and click "I've Completed the Task" below</li>
            </ol>
            
            <button class="btn" id="task-complete-btn">I've Completed the Task</button>
        `;

        document.getElementById('task-complete-btn').addEventListener('click', () => {
            this.dataManager.endTask(taskNumber);
            this.showScales(taskNumber);
        });
    }

    // Show scale questionnaires
    showScales(taskNumber) {
        const data = this.dataManager.getData();
        const scaleOrder = taskNumber === 1 ? ['socialFunctional', 'sTIAS'] : ['sTIAS', 'socialFunctional'];
        
        this.currentScaleIndex = 0;
        this.scaleOrder = scaleOrder;
        this.taskNumber = taskNumber;
        
        this.showNextScale();
    }

    // Show next scale in sequence
    showNextScale() {
        if (this.currentScaleIndex >= this.scaleOrder.length) {
            this.showSingleItems(this.taskNumber);
            return;
        }

        const scaleType = this.scaleOrder[this.currentScaleIndex];
        
        if (scaleType === 'socialFunctional') {
            this.showSocialFunctionalScale();
        } else {
            this.showSTIASScale();
        }
    }

    // Show Social/Functional Trust Scale (Semantic Differential)
    showSocialFunctionalScale() {
        const data = this.dataManager.getData();
        const reversePoles = data.poleReversal;
        
        // Combine and randomize items
        const allItems = [
            ...CONFIG.trustScale.functional,
            ...CONFIG.trustScale.social
        ].sort(() => Math.random() - 0.5);

        let html = `
            <h1>Task ${this.taskNumber} - Questionnaire (Part ${this.currentScaleIndex + 1})</h1>
            
            <div class="reminder-box">
                <strong>Remember:</strong> Keep your ${data.assignedAgent.name} chat window open. You will need to take screenshots after completing these questions.
            </div>
            
            <div class="scale-header">
                <h3>Please rate ${data.assignedAgent.name} on the following dimensions</h3>
                <p style="font-size: 14px; font-weight: normal; margin-top: 10px;">Select the point on the scale that best represents your view</p>
            </div>
            
            <form id="scale-form">
                <div class="response-matrix">
                    <table class="matrix-table semantic-diff-table">
                        <thead>
                            <tr>
                                <th class="pole-col left-pole"></th>
        `;
        
        CONFIG.semanticDifferentialScale.forEach(option => {
            html += `<th class="scale-col-sd">${option.value}</th>`;
        });
        
        html += `
                                <th class="pole-col right-pole"></th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        allItems.forEach(item => {
            const leftPole = reversePoles ? item.posPole : item.negPole;
            const rightPole = reversePoles ? item.negPole : item.posPole;
            
            html += `
                            <tr>
                                <td class="pole-cell left-pole-cell"><strong>${leftPole}</strong></td>
            `;
            
            CONFIG.semanticDifferentialScale.forEach(option => {
                // Store actual value (reverse if poles are reversed)
                const actualValue = reversePoles ? (8 - option.value) : option.value;
                html += `
                                <td class="radio-cell-sd">
                                    <input type="radio"
                                           id="${item.id}_${option.value}"
                                           name="${item.id}"
                                           value="${actualValue}"
                                           required>
                                    <label for="${item.id}_${option.value}" class="radio-label-sd"></label>
                                </td>
                `;
            });
            
            html += `
                                <td class="pole-cell right-pole-cell"><strong>${rightPole}</strong></td>
                            </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
                <button type="submit" class="btn">Continue</button>
            </form>
        `;

        this.app.innerHTML = html;

        document.getElementById('scale-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const responses = {};
            allItems.forEach(item => {
                const value = document.querySelector(`input[name="${item.id}"]:checked`)?.value;
                if (value) {
                    responses[item.id] = parseInt(value);
                }
            });

            if (Object.keys(responses).length === allItems.length) {
                this.dataManager.saveScaleResponses(this.taskNumber, 'socialFunctional', responses);
                this.currentScaleIndex++;
                this.showNextScale();
            } else {
                alert('Please answer all questions before continuing.');
            }
        });
    }

    // Show s-TIAS Scale
    showSTIASScale() {
        const data = this.dataManager.getData();

        let html = `
            <h1>Task ${this.taskNumber} - Questionnaire (Part ${this.currentScaleIndex + 1})</h1>
            
            <div class="reminder-box">
                <strong>Remember:</strong> Keep your ${data.assignedAgent.name} chat window open. You will need to take a screenshot after completing these questions.
            </div>
            
            <div class="scale-header">
                <h3>Please rate your agreement with the following statements about ${data.assignedAgent.name}</h3>
            </div>
            
            <form id="scale-form">
        `;

        CONFIG.sTIAS.forEach(item => {
            html += `
                <div class="scale-item">
                    <p>${item.text}</p>
                    <div class="likert-scale">
            `;
            
            CONFIG.likertScale.forEach(option => {
                html += `
                    <div class="likert-option">
                        <input type="radio" 
                               id="${item.id}_${option.value}" 
                               name="${item.id}" 
                               value="${option.value}" 
                               required>
                        <label for="${item.id}_${option.value}">${option.value}<br>${option.label}</label>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });

        html += `
                <button type="submit" class="btn">Continue</button>
            </form>
        `;

        this.app.innerHTML = html;

        document.getElementById('scale-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const responses = {};
            CONFIG.sTIAS.forEach(item => {
                const value = document.querySelector(`input[name="${item.id}"]:checked`)?.value;
                if (value) {
                    responses[item.id] = parseInt(value);
                }
            });

            if (Object.keys(responses).length === CONFIG.sTIAS.length) {
                this.dataManager.saveScaleResponses(this.taskNumber, 'sTIAS', responses);
                this.currentScaleIndex++;
                this.showNextScale();
            } else {
                alert('Please answer all questions before continuing.');
            }
        });
    }

    // Show single-item measures
    showSingleItems(taskNumber) {
        const data = this.dataManager.getData();

        let html = `
            <h1>Task ${taskNumber} - Final Questions</h1>
            
            <div class="reminder-box">
                <strong>Remember:</strong> Keep your ${data.assignedAgent.name} chat window open. You will need to take a screenshot next.
            </div>
            
            <form id="single-items-form">
        `;

        CONFIG.singleItems.forEach(item => {
            const scaleToUse = item.id === 'usefulness' ? CONFIG.usefulnessScale : CONFIG.satisfactionScale;
            html += `
                <div class="scale-item">
                    <p>${item.text}</p>
                    <div class="likert-scale">
            `;
            
            scaleToUse.forEach(option => {
                html += `
                    <div class="likert-option">
                        <input type="radio"
                               id="${item.id}_${option.value}"
                               name="${item.id}"
                               value="${option.value}"
                               required>
                        <label for="${item.id}_${option.value}">${option.value}<br>${option.label}</label>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });

        html += `
                <button type="submit" class="btn">Continue to Screenshot Upload</button>
            </form>
        `;

        this.app.innerHTML = html;

        document.getElementById('single-items-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const responses = {};
            CONFIG.singleItems.forEach(item => {
                const value = document.querySelector(`input[name="${item.id}"]:checked`)?.value;
                if (value) {
                    responses[item.id] = parseInt(value);
                }
            });

            if (Object.keys(responses).length === CONFIG.singleItems.length) {
                this.dataManager.saveScaleResponses(taskNumber, 'singleItems', responses);
                this.showScreenshotUpload(taskNumber);
            } else {
                alert('Please answer all questions before continuing.');
            }
        });
    }

    // Show screenshot upload
    showScreenshotUpload(taskNumber) {
        const data = this.dataManager.getData();
        let screenshots = [];

        this.app.innerHTML = `
            <h1>Task ${taskNumber} - Upload Screenshots</h1>
            
            <div class="reminder-box">
                <strong>Important:</strong> Please upload 1-5 screenshots of your ${data.assignedAgent.name} chat showing your interaction for Task ${taskNumber}.
                <ul>
                    <li>Include screenshots showing your initial prompt and the AI's response</li>
                    <li>Include screenshots of your follow-up questions and responses</li>
                    <li>Make sure your prompts are visible (to verify you didn't copy from instructions)</li>
                </ul>
            </div>
            
            <p>These screenshots help us verify that you completed the task and allow us to check for any issues you may have encountered.</p>
            
            <div class="upload-area" id="drop-zone">
                <input type="file" id="screenshot-input" accept="image/*" multiple style="display: none;">
                <div class="upload-instructions">
                    <p>📷 <strong>Drag and drop images here</strong></p>
                    <p>or</p>
                    <button type="button" class="btn btn-secondary" id="browse-btn">Browse Files</button>
                    <p class="screenshot-count">Upload 1-5 screenshots (0 uploaded)</p>
                </div>
                <div id="preview-container" class="screenshot-preview-container"></div>
            </div>
            
            <button class="btn" id="upload-btn" disabled>Continue</button>
        `;

        const dropZone = document.getElementById('drop-zone');
        const input = document.getElementById('screenshot-input');
        const browseBtn = document.getElementById('browse-btn');
        const previewContainer = document.getElementById('preview-container');
        const uploadBtn = document.getElementById('upload-btn');
        const countDisplay = document.querySelector('.screenshot-count');

        const updateUI = () => {
            countDisplay.textContent = `Upload 1-5 screenshots (${screenshots.length} uploaded)`;
            uploadBtn.disabled = screenshots.length === 0;
        };

        const addScreenshot = async (file) => {
            if (screenshots.length >= 5) {
                alert('Maximum 5 screenshots allowed');
                return;
            }

            const base64 = await this.dataManager.imageToBase64(file);
            const id = Date.now() + Math.random();
            screenshots.push({ id, data: base64, name: file.name });

            const previewItem = document.createElement('div');
            previewItem.className = 'screenshot-preview-item';
            previewItem.dataset.id = id;
            previewItem.innerHTML = `
                <img src="${base64}" alt="${file.name}">
                <button type="button" class="screenshot-remove-btn" data-id="${id}">×</button>
            `;

            previewContainer.appendChild(previewItem);
            updateUI();
        };

        const removeScreenshot = (id) => {
            screenshots = screenshots.filter(s => s.id !== id);
            const previewItem = previewContainer.querySelector(`[data-id="${id}"]`);
            if (previewItem) {
                previewItem.remove();
            }
            updateUI();
        };

        // Browse button
        browseBtn.addEventListener('click', () => input.click());

        // File input change
        input.addEventListener('change', async (e) => {
            const files = Array.from(e.target.files);
            for (const file of files) {
                if (screenshots.length < 5) {
                    await addScreenshot(file);
                }
            }
            input.value = ''; // Reset input
        });

        // Drag and drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', async (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
            for (const file of files) {
                if (screenshots.length < 5) {
                    await addScreenshot(file);
                }
            }
        });

        // Remove screenshot
        previewContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('screenshot-remove-btn')) {
                const id = parseFloat(e.target.dataset.id);
                removeScreenshot(id);
            }
        });

        // Continue button
        uploadBtn.addEventListener('click', () => {
            const screenshotData = screenshots.map(s => s.data);
            this.dataManager.saveScreenshot(taskNumber, screenshotData);
            
            if (taskNumber === 1) {
                this.showClearChatReminder();
            } else {
                this.showBackgroundQuestions();
            }
        });
    }

    // Show reminder to clear chat before Task 2
    showClearChatReminder() {
        const data = this.dataManager.getData();
        const agentId = data.assignedAgent.id;

        const clearInstructions = {
            chatgpt: {
                location: 'Top-left corner of the screen',
                button: '"New chat" button (or "+ New chat")',
                details: 'Look for the button in the sidebar on the left side of your screen.'
            },
            claude: {
                location: 'Top-left corner or center of the screen',
                button: '"New chat" button or the "+" icon',
                details: 'The button is typically located in the top navigation bar or sidebar.'
            },
            gemini: {
                location: 'Top-left or top-center of the screen',
                button: '"New chat" button',
                details: 'Look for the button near the top of the interface, often with a "+" icon.'
            },
            copilot: {
                location: 'Top-right corner of the screen',
                button: '"New topic" button or the broom/sweep icon',
                details: 'Alternatively, you can refresh the page (F5 or Cmd+R) to start fresh.'
            }
        };

        const instruction = clearInstructions[agentId] || clearInstructions.chatgpt;

        this.app.innerHTML = `
            <h1>Prepare for Task 2</h1>
            
            <div class="reminder-box">
                <h3>⚠️ Important: Clear Your Chat</h3>
                <p>Before starting Task 2, please <strong>clear or start a new chat</strong> in ${data.assignedAgent.name}.</p>
                <p>This ensures Task 2 is independent from Task 1.</p>
            </div>
            
            <div class="task-box">
                <h3>How to clear your chat in ${data.assignedAgent.name}:</h3>
                <ol>
                    <li><strong>Location:</strong> ${instruction.location}</li>
                    <li><strong>Look for:</strong> ${instruction.button}</li>
                    <li><strong>Details:</strong> ${instruction.details}</li>
                </ol>
                
                <div class="reminder-box" style="margin-top: 15px;">
                    <strong>Visual Guide:</strong>
                    <ul>
                        <li><strong>ChatGPT:</strong> Sidebar → "New chat" (top-left)</li>
                        <li><strong>Claude:</strong> Top bar → "+" or "New chat" button</li>
                        <li><strong>Gemini:</strong> Top navigation → "New chat" button</li>
                        <li><strong>Copilot:</strong> Top-right → "New topic" or broom icon</li>
                    </ul>
                    <p style="margin-top: 10px;"><em>If you can't find the button, try refreshing the page or opening ${data.assignedAgent.name} in a new tab.</em></p>
                </div>
            </div>
            
            <p>Once you've cleared your chat and started fresh, click below to start Task 2.</p>
            
            <button class="btn" id="task2-btn">I've Cleared My Chat - Start Task 2</button>
        `;

        document.getElementById('task2-btn').addEventListener('click', () => this.showTask(2));
    }

    // Show background questions
    showBackgroundQuestions() {
        const data = this.dataManager.getData();
        const agentName = data.assignedAgent.name;

        this.app.innerHTML = `
            <h1>Background Information</h1>
            
            <p>Finally, please answer a few questions about yourself and your experience with AI.</p>
            
            <form id="background-form">
                <h2>Demographics</h2>
                
                <div class="form-group">
                    <label for="role">${CONFIG.demographics.role.question}</label>
                    <input type="text" id="role" required>
                </div>
                
                <div class="form-group">
                    <label for="age">${CONFIG.demographics.age.question}</label>
                    <select id="age" required>
                        <option value="">Select...</option>
                        ${CONFIG.demographics.age.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="gender">${CONFIG.demographics.gender.question}</label>
                    <select id="gender" required>
                        <option value="">Select...</option>
                        ${CONFIG.demographics.gender.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="education">${CONFIG.demographics.education.question}</label>
                    <select id="education" required>
                        <option value="">Select...</option>
                        ${CONFIG.demographics.education.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
                
                <div class="section-divider"></div>
                
                <h2>AI Experience</h2>
                
                <div class="form-group">
                    <label for="ai-frequency">${CONFIG.aiExperience.frequency.question}</label>
                    <select id="ai-frequency" required>
                        <option value="">Select...</option>
                        ${CONFIG.aiExperience.frequency.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="ai-literacy">${CONFIG.aiExperience.literacy.question}</label>
                    <select id="ai-literacy" required>
                        <option value="">Select...</option>
                        ${CONFIG.aiExperience.literacy.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
                
                <div class="section-divider"></div>
                
                <h2>Familiarity with ${agentName}</h2>
                
                <div class="form-group">
                    <label for="prior-use">${CONFIG.agentFamiliarity.priorUse.question.replace('[AGENT_NAME]', agentName)}</label>
                    <select id="prior-use" required>
                        <option value="">Select...</option>
                        ${CONFIG.agentFamiliarity.priorUse.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="familiarity">${CONFIG.agentFamiliarity.familiarity.question.replace('[AGENT_NAME]', agentName)}</label>
                    <select id="familiarity" required>
                        <option value="">Select...</option>
                        ${CONFIG.agentFamiliarity.familiarity.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
                
                <button type="submit" class="btn">Complete Study</button>
            </form>
        `;

        document.getElementById('background-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const backgroundData = {
                role: document.getElementById('role').value,
                age: document.getElementById('age').value,
                gender: document.getElementById('gender').value,
                education: document.getElementById('education').value,
                aiFrequency: document.getElementById('ai-frequency').value,
                aiLiteracy: document.getElementById('ai-literacy').value,
                priorUse: document.getElementById('prior-use').value,
                familiarity: document.getElementById('familiarity').value
            };

            this.dataManager.saveBackground(backgroundData);
            this.dataManager.markComplete();
            this.showCompletionScreen();
        });
    }

    // Show completion screen with data export
    showCompletionScreen() {
        const data = this.dataManager.getData();

        this.app.innerHTML = `
            <h1>Study Complete!</h1>
            
            <div class="success-message">
                <p><strong>Thank you for participating in this study!</strong></p>
            </div>
            
            <h2>Next Steps</h2>
            <p>Please download your data files and send them to the researcher:</p>
            
            <ol>
                <li>Click both download buttons below to get your data in two formats</li>
                <li>Two files will be downloaded: a JSON file (complete data) and a CSV file (for analysis)</li>
                <li>Send both files to the researcher via email or the method they provided</li>
            </ol>
            
            <div class="reminder-box">
                <strong>Important:</strong> Your data is stored only in your browser. Once you close this page or clear your browser data, it will be lost. Please download and send your data files now.
            </div>
            
            <div class="button-group">
                <button class="btn" id="download-json-btn">📥 Download JSON (Complete Data)</button>
                <button class="btn btn-secondary" id="download-csv-btn">📊 Download CSV (Analysis Ready)</button>
            </div>
            
            <div class="section-divider"></div>
            
            <h3>Your Participant ID</h3>
            <p><code>${data.participantId}</code></p>
            <p><small>This ID is included in your data files for reference.</small></p>
            
            <div class="section-divider"></div>
            
            <h3>What's the difference?</h3>
            <ul>
                <li><strong>JSON file:</strong> Contains all your data including screenshots (larger file)</li>
                <li><strong>CSV file:</strong> Contains questionnaire responses and demographics in spreadsheet format (no screenshots, smaller file, ready for statistical analysis)</li>
            </ul>
        `;

        document.getElementById('download-json-btn').addEventListener('click', () => {
            this.dataManager.exportData();
            alert('JSON file downloaded! Now download the CSV file too.');
        });

        document.getElementById('download-csv-btn').addEventListener('click', () => {
            this.dataManager.exportCSV();
            alert('CSV file downloaded! Please send both files to the researcher. Thank you!');
        });
    }
}

// Made with Bob
