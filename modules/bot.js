import { user } from "../script.js";
const chatBody = document.querySelector('.chat-body');

let chatHistory = [];

export async function generateBotResponse() {
	const API_KEY = 'AIzaSyDX7I56dPaMUZsxuvuE09W4EeXV6CXvV8A';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    chatHistory.push({
			role: "user",
			parts: [
				{ text: user.text },
				...(user.file.data ? [{ inline_data: user.file }] : []),
			],
		});

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			contents: chatHistory
		}),
	};
	const nodes = document.querySelectorAll('.message-text');
	let messageDiv = nodes[nodes.length - 1]; // always accessing the last message div created by displaybot function

	try {
		const response = await fetch(url, requestOptions);
		const json = await response.json();
		if (!response.ok) throw new Error(data.error.message);
		const botReply = json.candidates[0].content.parts[0].text
			.replace(/\*\*(.*?)\*\*/g, '$1')
			.trim();
        messageDiv.innerText = botReply;
        
        chatHistory.push({
            role: "model",
            parts: [{ text: botReply }],
		});

	} catch (err) {
		messageDiv.innerText = err.message;
		messageDiv.style.color = '#ff0000';
    } finally {
        user.file = {};
		chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
	}
}
