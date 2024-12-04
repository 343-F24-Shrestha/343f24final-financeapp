// feedback.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize feedback data
    let feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];

    // DOM Elements
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackList = document.getElementById('feedback-list');
    const exportButton = document.getElementById('export-button');
    const clearButton = document.getElementById('clear-button');

    // Modal Elements
    const addModal = document.getElementById('add-modal');
    const openModalButton = document.getElementById('open-modal-button');
    const addCloseButton = document.getElementById('add-close-button');

    // Function to display feedback
    function displayFeedback() {
        feedbackList.innerHTML = '';
        if (feedbackData.length === 0) {
            feedbackList.innerHTML = '<p>No feedback available.</p>';
            return;
        }
        feedbackData.forEach((feedback) => {
            const li = document.createElement('li');
            li.className = 'feedback-item';
            li.innerHTML = `
                <h3>${feedback.name} (${feedback.rating}/5)</h3>
                <p>${feedback.comments}</p>
                <p><strong>Recommend:</strong> ${feedback.recommend}</p>
                <p><em>${feedback.email}</em></p>
            `;
            feedbackList.appendChild(li);
        });
    }

    // Save feedback data to localStorage
    function saveFeedbackData() {
        localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
    }

    // Open Modal
    openModalButton.addEventListener('click', () => {
        addModal.style.display = 'block';
    });

    // Close Modal
    addCloseButton.addEventListener('click', () => {
        addModal.style.display = 'none';
    });

    // Add Feedback
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newFeedback = {
            name: feedbackForm.name.value,
            email: feedbackForm.email.value,
            rating: feedbackForm.rating.value,
            recommend: feedbackForm.recommend.value,
            comments: feedbackForm.comments.value
        };
        feedbackData.push(newFeedback);
        saveFeedbackData();
        displayFeedback();
        feedbackForm.reset();
        addModal.style.display = 'none';
    });

    // Export Data as JSON
    exportButton.addEventListener('click', () => {
        if (feedbackData.length === 0) {
            alert('No data to export.');
            return;
        }
        const dataStr = JSON.stringify(feedbackData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'feedbackData.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Clear Data
    clearButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all feedback data?')) {
            feedbackData = [];
            saveFeedbackData();
            displayFeedback();
        }
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === addModal) {
            addModal.style.display = 'none';
        }
    });

    // Display feedback on page load
    displayFeedback();
});
