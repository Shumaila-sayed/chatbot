import { displayText, displayBotText } from "./modules/dom.js";
import { generateBotResponse } from "./modules/bot.js";

const userMessage = document.querySelector('.message-input');
const submitBtn = document.querySelector('#submit-message');

let user = {
    text: null
}

userMessage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && userMessage.value) {    
      handleFlow(e)
    }}
);

submitBtn.addEventListener('click', (e) =>  handleFlow(e) );

function handleFlow(e) {
    e.preventDefault();
    user.text = userMessage.value.trim();
        displayText(user.text);
        displayBotText();
        generateBotResponse(user.text)
        userMessage.value = '';
}