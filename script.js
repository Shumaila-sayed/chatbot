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



async function generateBotResponse(message) {
    const API_KEY = 'AIzaSyDX7I56dPaMUZsxuvuE09W4EeXV6CXvV8A';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    { parts: [{ text: message }] },
                ],
            }),
        })

        const json = await response.json();
        const botReply = json.candidates[0].content.parts[0].text
        return botReply;
    } catch (err) {
        console.log(err)
    }
}