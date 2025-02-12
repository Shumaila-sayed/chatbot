const userMessage = document.querySelector('.message-input');
const chatBody = document.querySelector('.chat-body'); 


let user = {
    text: null
}

// will return the string typed in text box before hitting enter
userMessage.addEventListener('keydown', (e) => {
    if (userMessage.value === " ") return;
    if (e.key === 'Enter') {
        console.log(e)
        console.log(userMessage.value)
        displayText(userMessage.value);
        generateBotResponse(userMessage.value)
        userMessage.value = ' ';
    }
})

function displayText(message) {
    const textDiv = document.createElement('div');
    textDiv.classList.add('chat-message', 'user-message');

    const text = document.createElement('div');
    text.classList.add('message-text');
    text.textContent = message;
    textDiv.appendChild(text);

    chatBody.appendChild(textDiv)
}