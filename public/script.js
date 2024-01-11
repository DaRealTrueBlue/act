document.addEventListener('DOMContentLoaded', () => {
    const chatDisplay = document.getElementById('chat-display');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message');

    const termsModal = document.getElementById('terms-modal');
    const agreeCheckbox = document.getElementById('agree-checkbox');

    // Show the terms modal on page load
    termsModal.style.display = 'block';

    // Function to close the terms modal
    window.closeTermsModal = function () {
        if (agreeCheckbox.checked) {
            // If the user agrees, hide the modal and proceed
            termsModal.style.display = 'none';
        } else {
            // If the user doesn't agree, you might want to handle this case (e.g., display an error message)
            alert('You must agree to the Terms and Conditions to continue.');
        }
    };

    const socket = io();

    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            socket.emit('chat message', messageText);
            messageInput.value = '';
        }
    });

    socket.on('chat message', function (message) {
        displayMessage(message);
    });

    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message-entry');
        messageElement.textContent = `> ${message}`;
        chatDisplay.appendChild(messageElement);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    function displayMessages() {
        // Clear the chat display
        chatDisplay.innerHTML = '';
    
        // Get the current timestamp
        const currentTime = new Date().getTime();
    
        // Display messages from the last hour
        const lastHourMessages = messages.filter(
            msg => currentTime - msg.timestamp < 60 * 60 * 1000
        );
    
        lastHourMessages.forEach(({ message }) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message-entry');
            messageElement.textContent = `> ${message}`;
            chatDisplay.appendChild(messageElement);
    
            // Trigger reflow before applying animation
            void messageElement.offsetWidth;
    
            // Apply animation only to the newly added message
            messageElement.style.animation = 'fadeIn 0.5s ease-in-out forwards';
        });
    
        // Scroll to the bottom of the chat display
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
    
    
});