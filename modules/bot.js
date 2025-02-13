const chatBody = document.querySelector('.chat-body');

export async function generateBotResponse(message) {
	const API_KEY = 'AIzaSyDX7I56dPaMUZsxuvuE09W4EeXV6CXvV8A';
	const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			contents: [{ parts: [{ text: message }] }],
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
	} catch (err) {
		messageDiv.innerText = err.message;
		messageDiv.style.color = '#ff0000';
	} finally {
		chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
	}
}
