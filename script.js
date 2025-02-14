import { displayText, displayBotText } from "./modules/dom.js";
import { generateBotResponse } from "./modules/bot.js";

const userMessage = document.querySelector('.message-input');
const submitBtn = document.querySelector('#submit-message');
const fileInput = document.querySelector('#file-input');
const fileUploadWrapper = document.querySelector('.file-upload-wrapper');
const cancelFileBtn = document.querySelector('#file-cancel');

let user = {
    text: null,
    file: {
        data: null,
        mime_type: null
    }
}

function handleFlow(e) {
    e.preventDefault();
    user.text = userMessage.value.trim();
    displayText();
    displayBotText();
    generateBotResponse()
    userMessage.value = '';
    fileUploadWrapper.classList.remove('file-uploaded');
}

userMessage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && userMessage.value) {    
      handleFlow(e)
    }}
);

submitBtn.addEventListener('click', (e) => handleFlow(e));

document.querySelector('#file-output').addEventListener('click', () => fileInput.click());

cancelFileBtn.addEventListener('click', () => {
    user.file = {};
    fileUploadWrapper.classList.remove('file-uploaded');
})


fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector('img').src = e.target.result;
        fileUploadWrapper.classList.add('file-uploaded')
        const base64String = e.target.result.split(',')[1];

        user.file = {
            data: base64String,
            mime_type: file.type
        }
        fileInput.value = '';
    }
    reader.readAsDataURL(file)
})

export { user, userMessage }