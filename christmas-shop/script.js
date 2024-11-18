// COUNTDOWN

const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

const newYearTime = new Date("Jan 1, 2025 00:00:00").getTime();

updateCountdown();

function updateCountdown() {
    const now = new Date().getTime();
    const gap = newYearTime - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day / hour));
    const m = Math.floor((gap % hour / minute));
    const s = Math.floor((gap % minute / second));

    dayEl.innerText = d;
    hourEl.innerText = h;
    minuteEl.innerText = m;
    secondEl.innerText = s;
    setTimeout(updateCountdown, 1000);
}

// HAMBURGER MENU

document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false;
    });
});

// SLIDER

function setButtonState(buttonId, isDisabled) {
    const button = document.getElementById(buttonId);
    button.setAttribute("data-disabled", isDisabled ? "true" : "false");
}

// setButtonState("prev", true);
// setButtonState("next", false);



document.querySelectorAll(".gift-item").forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    })
})

