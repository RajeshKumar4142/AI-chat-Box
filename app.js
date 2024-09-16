document.addEventListener('DOMContentLoaded', function () {
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('chat-messages');
  const loginContainer = document.querySelector('.login-container');
  const chatContainer = document.querySelector('.chat-container');
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');

  let isLoggedIn = false;

  // Toggle between Sign-In and Sign-Up forms
  switchToSignup.addEventListener('click', function () {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });

  switchToLogin.addEventListener('click', function () {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // Check login status
  function checkLogin() {
    if (isLoggedIn) {
      loginContainer.style.display = 'none';
      chatContainer.style.display = 'block';
    } else {
      loginContainer.style.display = 'flex';
      chatContainer.style.display = 'none';
    }
  }

  // Handle sending messages
  sendButton.addEventListener('click', function () {
    const message = messageInput.value;
    if (message.trim() !== '') {
      addMessageToChat('You', message);  // Add user message to chat
      messageInput.value = '';
      setTimeout(() => generateAIResponse(message), 1000);  // Simulate AI response after 1s
    }
  });

  // Sign-Up functionality
  document.getElementById('signup-button').addEventListener('click', function () {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
      // Save user details in localStorage (simple storage for demo purposes)
      localStorage.setItem('user', JSON.stringify({ username, password }));
      alert('Sign Up successful! Please log in.');
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
    } else {
      alert('Please fill in all fields.');
    }
  });

  // Login functionality
  document.getElementById('login-button').addEventListener('click', function () {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser && username === savedUser.username && password === savedUser.password) {
      isLoggedIn = true;
      checkLogin();
    } else {
      alert('Invalid login details.');
    }
  });

  // Log-out functionality
  document.getElementById('logout-button').addEventListener('click', function () {
    isLoggedIn = false;
    checkLogin();
  });

  // Initial login check
  checkLogin();

  // Utility function to add message to the chat
  function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'You' ? 'sent' : 'received');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;  // Scroll to bottom
  }

  // Generate AI response (basic logic for now)
  function generateAIResponse(userMessage) {
    const aiResponse = generateAIReply(userMessage);
    addMessageToChat('AI', aiResponse);
  }

  // Simulated AI logic
  function generateAIReply(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! How can I assist you today?';
    } else if (lowerMessage.includes('how are you')) {
      return 'I am just a program, but I am functioning as expected! How about you?';
    } else if (lowerMessage.includes('bye')) {
      return 'Goodbye! Feel free to chat with me anytime!';
    } else {
      return 'I am sorry, I didn\'t quite understand that. Could you please rephrase?';
    }
  }
});
