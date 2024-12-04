// feedback.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize feedback data
    let feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];

    // DOM Elements
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackList = document.getElementById('feedback-list');
    const exportButton = document.getElementById('export-button');
    const clearButton = document.getElementById('clear-button');

    // Modals
    const editModal = document.getElementById('edit-modal');
    const deleteModal = document.getElementById('delete-modal');

    // Close Buttons
    const editCloseButton = document.getElementById('edit-close-button');
    const deleteCloseButton = document.getElementById('delete-close-button');

    // Edit Form Elements
    const editFeedbackForm = document.getElementById('edit-feedback-form');

    // Delete Confirmation
    let deleteIndex = null;

    // Function to display feedback
    function displayFeedback() {
        feedbackList.innerHTML = '';
        if (feedbackData.length === 0) {
            feedbackList.innerHTML = '<p>No feedback available.</p>';
            return;
        }
        feedbackData.forEach((feedback, index) => {
            const li = document.createElement('li');
            li.className = 'feedback-item';
            li.innerHTML = `
                <h3>${feedback.name} (${feedback.rating}/5)</h3>
                <p>${feedback.comments}</p>
                <p><strong>Recommend:</strong> ${feedback.recommend}</p>
                <p><em>${feedback.email}</em></p>
                <div class="feedback-actions">
                    <button onclick="editFeedback(${index})">Edit</button>
                    <button onclick="deleteFeedback(${index})">Delete</button>
                </div>
            `;
            feedbackList.appendChild(li);
        });
    }

    // Save feedback data to localStorage
    function saveFeedbackData() {
        localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
    }

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
    });

    // Edit Feedback
    window.editFeedback = function(index) {
        const feedback = feedbackData[index];
        document.getElementById('edit-id').value = index;
        document.getElementById('edit-name').value = feedback.name;
        document.getElementById('edit-email').value = feedback.email;
        document.getElementById('edit-rating').value = feedback.rating;
        document.getElementById('edit-comments').value = feedback.comments;
        if (feedback.recommend === 'Yes') {
            document.getElementById('edit-recommend-yes').checked = true;
        } else {
            document.getElementById('edit-recommend-no').checked = true;
        }
        editModal.style.display = 'block';
    };

    editFeedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const index = document.getElementById('edit-id').value;
        feedbackData[index] = {
            name: editFeedbackForm['edit-name'].value,
            email: editFeedbackForm['edit-email'].value,
            rating: editFeedbackForm['edit-rating'].value,
            recommend: editFeedbackForm['recommend'].value,
            comments: editFeedbackForm['edit-comments'].value
        };
        saveFeedbackData();
        displayFeedback();
        editModal.style.display = 'none';
    });

    editCloseButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Delete Feedback
    window.deleteFeedback = function(index) {
        deleteIndex = index;
        deleteModal.style.display = 'block';
    };

    document.getElementById('confirm-delete-button').addEventListener('click', () => {
        feedbackData.splice(deleteIndex, 1);
        saveFeedbackData();
        displayFeedback();
        deleteModal.style.display = 'none';
    });

    document.getElementById('cancel-delete-button').addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });

    deleteCloseButton.addEventListener('click', () => {
        deleteModal.style.display = 'none';
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

    // Display feedback on page load
    displayFeedback();
});
