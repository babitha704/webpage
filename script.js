let timer;
let timeElapsed = 0;
let isTyping = false;
const correctText = "The quick brown fox jumps over the lazy dog."; // Given sentence

const startBtn = document.getElementById('start-btn');
const userInput = document.getElementById('user-input');
const timeDisplay = document.getElementById('time');
const speedDisplay = document.getElementById('speed');
const results = document.getElementById('results');
const textToType = document.getElementById('text-to-type');

function startTimer() {
    timeElapsed = 0;
    isTyping = true;
    results.classList.add('hidden');
    userInput.value = '';
    userInput.disabled = false;

    timer = setInterval(() => {
        timeElapsed++;
        timeDisplay.textContent = timeElapsed;
    }, 1000);
}

function calculateSpeed() {
    const typedText = userInput.value.trim();
    const wordCount = typedText.split(/\s+/).filter(word => word.length > 0).length;
    const minutes = timeElapsed / 60;
    const speed = Math.round(wordCount / minutes);

    return speed || 0; // Return 0 if speed is undefined
}

function endTest() {
    clearInterval(timer);
    isTyping = false;
    userInput.disabled = true;

    const speed = calculateSpeed();
    speedDisplay.textContent = speed;
    results.classList.remove('hidden');
}

function checkInput() {
    const typedText = userInput.value;

    if (typedText === correctText) {
        endTest();
        alert(`Congratulations! You've completed the test in ${timeElapsed} seconds with a speed of ${calculateSpeed()} WPM.`);
    }
}

startBtn.addEventListener('click', startTimer);
userInput.addEventListener('input', () => {
    if (!isTyping) {
        startTimer();
    }
    checkInput(); // Check input on each keystroke
});

userInput.addEventListener('blur', endTest);
