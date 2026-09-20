let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function updateDisplay() {
    let time = Date.now() - startTime + elapsedTime;

    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time / 1000) % 60);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

startBtn.addEventListener("click", function () {
    startTime = Date.now();

    timerInterval = setInterval(updateDisplay, 1000);

    startBtn.disabled = true;
});

pauseBtn.addEventListener("click", function () {
    clearInterval(timerInterval);

    elapsedTime += Date.now() - startTime;

    startBtn.disabled = false;
});

resetBtn.addEventListener("click", function () {
    clearInterval(timerInterval);

    startTime = 0;
    elapsedTime = 0;

    display.textContent = "00:00:00";

    startBtn.disabled = false;

    laps.innerHTML = "";
});

lapBtn.addEventListener("click", function () {
    if (startTime === 0) {
        return;
    }

    const lapTime = display.textContent;

    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;

    laps.appendChild(li);
});