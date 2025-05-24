const messagePage = document.getElementById('messagePage');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const lastSeen = document.getElementById('lastSeen');
const menuButton = document.getElementById('menuButton');
const menuDropdown = document.getElementById('menuDropdown');

// Responses for common conversational phrases
const predefinedResponses = {
  hello: "Hi there! How's it going?",
  hi: "Hello! How can I assist you today?",
  hey: "Hey! What's on your mind?",
  how: "I'm doing great, thank you! How about you?",
  fine: "Good to hear that! 😊",
  good: "That's wonderful! How can I help?",
  bad: "Oh no! What's wrong?",
  thanks: "You're welcome! 😊",
  thank: "You're welcome! Let me know if there's anything else I can do for you.",
  bye: "Goodbye! Have a great day!",
  name: "I'm your chatbot buddy! What's your name?",
  age: "I’m timeless! But I’m here to chat anytime. 😊",
  help: "Of course! Let me know what you need help with.",
  love: "Aw, thank you! You're amazing too! 💖",
  default: "I'm here to chat about anything! Tell me more. 😊"
};

// Function to match a user's message to a response
function getResponse(message) {
  const lowerCaseMessage = message.toLowerCase();
  for (const key in predefinedResponses) {
    if (lowerCaseMessage.includes(key)) {
      return predefinedResponses[key];
    }
  }
  return predefinedResponses.default;
}

// Update last seen
function updateLastSeen() {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  lastSeen.textContent = `Last seen: Today at ${currentTime}`;
}

// Render messages
function renderMessages(type, text, time) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.innerHTML = `
    <div class="message-content">
      <p>${text}</p>
      <span class="message-time">
        ${time}
        ${type === 'outgoing' ? '<span class="blue-ticks">✓✓</span>' : ''}
      </span>
    </div>
  `;
  messagePage.appendChild(messageDiv);
  messagePage.scrollTop = messagePage.scrollHeight; // Keep scrolling to the bottom
}

// Add a new message
function addMessage(text, type = 'outgoing') {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Render the user's or bot's message
  renderMessages(type, text, currentTime);

  // If the message is outgoing, simulate a response
  if (type === 'outgoing') {
    updateLastSeen();
    setTimeout(() => {
      const reply = getResponse(text);
      addMessage(reply, 'incoming');
    }, 1500); // 1.5-second delay for the response
  }
}

// Toggle menu visibility
menuButton.addEventListener('click', () => {
  menuDropdown.style.display = menuDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
    menuDropdown.style.display = 'none';
  }
});

// Handle Send button click
sendButton.addEventListener('click', () => {
  const messageText = messageInput.value.trim();
  if (messageText) {
    addMessage(messageText);
    messageInput.value = ''; // Clear the input field after sending the message
  }
});

// Handle Enter key press
messageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent page reload
    sendButton.click();
  }
});

// Initialize with a greeting message
addMessage('Hi! How can I assist you today?', 'incoming');
