// Array of image URLs
const images = [
    'images/hollow-hold.gif',
    'images/v-up.gif',
    'images/tuck-up.gif',
    'images/toe-touch.gif',
    'images/leg-lower.gif',
    'images/flutter.gif',
    'images/scissor.gif'
    // Add more image URLs as needed
];

const pauseImage = 'images/pause-image.png'; // Replace with the path to your pause image

let currentImageIndex = 1;
let loopCounter = 0;
let countdownInterval;
let evenLoop = true;
let imageChangeInterval; // Declare imageChangeInterval here to access it in toggleStartStop

// Function to play a beep sound
function playBeep() {
    const beep = new Audio('beep.mp3'); // Change 'beep.mp3' to the actual path of your beep sound file
    beep.play();
}

function changeImage() {
    const imageElement = document.getElementById('image');

    if (evenLoop) {
        imageElement.src = images[0];
    } else {
        imageElement.src = images[currentImageIndex];
        currentImageIndex++; // Move to the next image
    }

    evenLoop = !evenLoop; // Toggle evenLoop for the next iteration

    loopCounter++;

    if (loopCounter === 13) {
        clearInterval(imageChangeInterval); // Stop the interval after 12 loops
    }

    updateTimer(); // Update the timer display
    playBeep(); // Play a beep sound
}

function displayPauseImage() {
    const imageElement = document.getElementById('image');
    imageElement.src = pauseImage;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    let remainingTime = 12;

    // Clear the existing countdownInterval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // Update the timer every second until it reaches 0
    countdownInterval = setInterval(() => {
        remainingTime--;
        timerElement.textContent = `Time remaining: ${remainingTime} seconds`;

        if (remainingTime === 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function toggleStartStop() {
    const imageElement = document.getElementById('image');

    if (imageChangeInterval) {
        // If the interval is active, stop it and show the pause image
        clearInterval(imageChangeInterval);
        clearInterval(countdownInterval);
        imageChangeInterval = null;
        displayPauseImage();
    } else {
        // If the interval is not active, resume from the current state or start from the beginning
        if (loopCounter == 0) {
            startApp();
        } else {
            resumeApp();
        }
    }
}

function startApp() {
    // Start the app from the beginning
    currentImageIndex = 1;
    loopCounter = 0;
    evenLoop = true;

    // Call changeImage once to display the current or next image
    changeImage();

    // Set interval to change image every 12 seconds
    imageChangeInterval = setInterval(changeImage, 12000);
}

function resumeApp() {
    // Resume the timer from where it was paused
    updateTimer();

    // Set interval to change image every 12 seconds
    imageChangeInterval = setInterval(changeImage, 12000);
}

function resetApp() {
    // Clear existing intervals and reset variables
    clearInterval(imageChangeInterval);
    clearInterval(countdownInterval);

    currentImageIndex = 1;
    loopCounter = 0;
    evenLoop = true;

    // Reset the image and timer
    const imageElement = document.getElementById('image');
    imageElement.src = 'images/init.jpg';

    const timerElement = document.getElementById('timer');
    timerElement.textContent = 'Time remaining: 12 seconds';

    imageChangeInterval = null;
}