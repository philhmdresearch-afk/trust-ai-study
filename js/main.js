// Main entry point - Initialize the experiment

document.addEventListener('DOMContentLoaded', () => {
    // Initialize data manager
    const dataManager = new DataManager();
    
    // Initialize experiment
    const experiment = new Experiment(dataManager);
    
    // Start the experiment
    experiment.start();
    
    // Add keyboard shortcut for clearing data (for testing only)
    // Press Ctrl+Shift+R to reset
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'R') {
            if (confirm('Are you sure you want to clear all data and restart? This cannot be undone.')) {
                dataManager.clearData();
                location.reload();
            }
        }
    });
});

// Made with Bob
