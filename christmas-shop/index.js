// SLIDER

function setButtonState(buttonId, state) {
    const button = document.getElementById(buttonId);
    button.setAttribute("data-enabled", state ? "true" : "false");
}

function checkButtonPosition() {
    if (sliderRow.getBoundingClientRect().left < posLeft) {
        setButtonState("prev", true);
    } else if (sliderRow.getBoundingClientRect().right > posRight) {
        setButtonState("next", false);
    }
}

const sliderRow = document.getElementById("slider-row");
const posLeft = sliderRow.getBoundingClientRect().left;
const posRight = sliderRow.getBoundingClientRect().right;

document.getElementById("prev").addEventListener("click", () => {
    const currentPosition = parseFloat(sliderRow.style.transform.replace("translateX(", "")) || 0;
    // const movingDistance = (sliderRow.scrollWidth - window.innerWidth) / 4;
    const movingDistance = (sliderRow.scrollWidth - window.innerWidth) / 4;
    sliderRow.style.transform = `translateX(${currentPosition + movingDistance}px)`;
    checkButtonPosition()
});

document.getElementById("next").addEventListener("click", () => {
    const currentPosition = parseFloat(sliderRow.style.transform.replace("translateX(", "")) || 0;
    // const movingDistance = (sliderRow.scrollWidth - window.innerWidth) / 4;
    const movingDistance = (sliderRow.scrollWidth - sliderRow.getBoundingClientRect().width) / 4;
    sliderRow.style.transform = `translateX(${currentPosition - movingDistance}px)`;
    checkButtonPosition()
    console.log(`${sliderRow.getBoundingClientRect().right}`);
});

// COUNTDOWN

const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

const newYearTime = new Date("Jan 1, 2025 00:00:00 GMT+00:00").getTime();

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


document.addEventListener("DOMContentLoaded", () => {
    const giftItems = document.querySelectorAll(".gift-item");

    fetch('gifts.json')
        .then(response => response.json())
        .then(data => {
            const shuffledData = data.sort(() => Math.random() - 0.5);

            giftItems.forEach((container, index) => {
                const card = shuffledData[index];
                container.innerHTML = `
                    <div class="gift-img"></div>
                    <div class="gift-text">
                        <h4>${card['category']}</h4>
                        <h3>${card['name']}</h3>
                    </div>
                `;
                container.classList.add(card['category'].toLowerCase().replace(' ', '-'));
            });
        })
});