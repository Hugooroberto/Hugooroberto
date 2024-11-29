// JavaScript for dynamic typing effect
const words = [
    { text: "Learn", color: "#58a700" }, // Green
    { text: "Practice", color: "#ffa700" }, // Orange
    { text: "Master", color: "#f6b800" }, // Mango Yellow
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const typingSpeed = 150;
const deletingSpeed = 100;
const delayBetweenWords = 1500;
const dynamicTextElement = document.getElementById("dynamic-text");

function typeEffect() {
    const currentWord = words[wordIndex].text;
    const currentColor = words[wordIndex].color;
    dynamicTextElement.style.color = currentColor; // Set the color dynamically

    if (isDeleting) {
        // Remove characters
        dynamicTextElement.textContent = currentWord.slice(0, letterIndex--);
        if (letterIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to the next word
        }
    } else {
        // Add characters
        dynamicTextElement.textContent = currentWord.slice(0, ++letterIndex);
        if (letterIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenWords); // Pause before deleting
            return;
        }
    }

    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

typeEffect();