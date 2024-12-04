// SLIDER

const sliderRow = document.getElementById("slider-row");
let posLeft = sliderRow.getBoundingClientRect().left;
// let posRight = sliderRow.getBoundingClientRect().right;

function setButtonState(buttonId, state) {
    const button = document.getElementById(buttonId);
    button.setAttribute("data-enabled", state ? "true" : "false");
}

function checkSliderPosition() {
    if (Math.round(sliderRow.getBoundingClientRect().left) < Math.round(posLeft)) {
        setButtonState("prev", true);
    } else {
        setButtonState("prev", false);
    }
    if (Math.round(posLeft - sliderRow.getBoundingClientRect().left) >= Math.round(sliderRow.scrollWidth - sliderRow.getBoundingClientRect().width)) {
        setButtonState("next", false);
    } else {
        setButtonState("next", true);
    }
    if (sliderRow.style.transform === "translateX(0px)") {
        setButtonState("prev", false);
        setButtonState("next", true);
    }
}


let numOfClicks = 0;
let movingDistance = 0;

function calculateMovingDistance() {
    if (window.innerWidth > 768) {
        numOfClicks = 3;
    } else {
        numOfClicks = 6;
    }
    movingDistance = (sliderRow.scrollWidth - sliderRow.getBoundingClientRect().width) / numOfClicks;
}

calculateMovingDistance();

document.getElementById("prev").addEventListener("click", () => {
    const currentPosition = parseFloat(sliderRow.style.transform.replace("translateX(", "")) || 0;
    // const movingDistance = (sliderRow.scrollWidth - window.innerWidth) / numOfClicks;
    sliderRow.style.transform = `translateX(${currentPosition + movingDistance}px)`;
    checkSliderPosition();
});

document.getElementById("next").addEventListener("click", () => {
    const currentPosition = parseFloat(sliderRow.style.transform.replace("translateX(", "")) || 0;
    sliderRow.style.transform = `translateX(${currentPosition - movingDistance}px)`;
    checkSliderPosition();
});


onresize = () => {
    if (window.innerWidth <= 768) {
        document.getElementById('nav-menu').style.display = 'none';
        setTimeout(() => {
            document.getElementById('nav-menu').style.display = null;
        }, 300);
    } else if (window.innerWidth > 768) {
        menuToggle.checked = false;
        document.body.style.overflowY = null;
    }
    sliderRow.style.transform = `translateX(0px)`;
    posLeft = sliderRow.getBoundingClientRect().left;
    calculateMovingDistance();
    checkSliderPosition();
};


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

// GIFTS

let shuffledData = [];

document.addEventListener("DOMContentLoaded", () => {
    const giftItems = document.querySelectorAll(".gift-item");

    fetch('gifts.json')
        .then(response => response.json())
        .then(data => {
            shuffledData = data.sort(() => Math.random() - 0.5);

            giftItems.forEach((container, index) => {
                const card = shuffledData[index];
                container.dataset.idx = index;
                container.innerHTML = `
                    <div class="gift-img"></div>
                    <div class="gift-text">
                        <h4>${card['category']}</h4>
                        <h3>${card['name']}</h3>
                    </div>
                `;
                container.classList.add(card['category'].toLowerCase().replace(' ', '-'));
                container.addEventListener("click", (event) => {
                    drawModal(event.currentTarget);
                })
            });
        })
});

const modal = document.getElementById("card-modal");
const closeButton = document.getElementById("close-modal");

closeButton.addEventListener("click", () => {
    modal.close();
    document.body.style.overflowY = null;
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
        document.body.style.overflowY = null;
    }
});

function drawModal(card) {
    const cardModal = document.getElementById("card-modal");
    const cardModalContent = cardModal.querySelector(".modal-content");
    const modalBasicInfo = cardModal.querySelector(".modal-basic-info");
    const modalSkills = cardModal.querySelector(".modal-skills").querySelectorAll("li");

    cardModalContent.classList.remove("for-work", "for-health", "for-harmony");
    cardModalContent.classList.add(card.classList[1]);
    modalBasicInfo.querySelector(".category").textContent = card.querySelector("h4").textContent;
    modalBasicInfo.querySelector(".name").textContent = card.querySelector("h3").textContent;
    modalBasicInfo.querySelector(".paragraph").textContent = shuffledData[card.dataset.idx].description;

    modalSkills.forEach((skill) => {
        const skillScore = shuffledData[card.dataset.idx].superpowers[skill.querySelector("span.skill-name").textContent.toLowerCase()];
        skill.querySelector("span.paragraph.score").textContent = skillScore;
        skill.querySelector("div.icons").innerHTML = `<img src="img/icon.svg" alt="snowflake icon" class="score-icon">`.repeat(5);
        skill.querySelectorAll("img.score-icon").forEach((icon, iconIndex) => {
            if (iconIndex + 1 > skillScore.replace(/[^0-9]/g, '') / 100) {
                icon.classList.add("bleak");
            }
        })
    })
    document.body.style.overflowY = 'hidden';
    modal.showModal();
}