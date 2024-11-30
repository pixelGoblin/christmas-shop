// BACK TO TOP BUTTON

document.addEventListener("DOMContentLoaded", () => {
    const backToTopButton = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// GIFTS

let shuffledData = [];
let shuffledDataHarmony = [];
let shuffledDataHealth = [];
let shuffledDataWork = [];



document.addEventListener("DOMContentLoaded", () => {
    const giftsContainer = document.getElementById("gifts-container");

    fetch('gifts.json')
        .then(response => response.json())
        .then(data => {
            shuffledData = data.sort(() => Math.random() - 0.5);

            shuffledData.forEach((card) => {
                drawCard(card, giftsContainer);
            });
            shuffledDataHarmony = shuffledData.filter(card => card['category'] === 'For Harmony');
            shuffledDataHealth = shuffledData.filter(card => card['category'] === 'For Health');
            shuffledDataWork = shuffledData.filter(card => card['category'] === 'For Work');
        })
});

function drawCard(card, container) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("gift-item");
    cardContainer.innerHTML = `
        <div class="gift-img"></div>
        <div class="gift-text">
            <h4>${card['category']}</h4>
            <h3>${card['name']}</h3>
        </div>
    `;
    cardContainer.classList.add(card['category'].toLowerCase().replace(' ', '-'));
    container.appendChild(cardContainer);
}

// TABS

// const tabMenu = Array.from(document.getElementById("gifts-menu").children);
const tabMenu = document.getElementById("gifts-menu").querySelectorAll(".tab");

tabMenu.forEach((item) => {
    item.addEventListener("click", () => {
        tabMenu.forEach((item) => item.dataset.state = null);
        item.dataset.state = "active";

        const giftsContainer = document.getElementById("gifts-container");
        const category = item.querySelector("span").textContent.trim();
        const categoryDataMap = {
            "For Work": shuffledDataWork,
            "For Health": shuffledDataHealth,
            "For Harmony": shuffledDataHarmony,
            "All": shuffledData
        };
        giftsContainer.innerHTML = "";

        categoryDataMap[category].forEach((card) => {
            drawCard(card, giftsContainer);
        });
    });
});

// fetch('gifts.json')
//         .then(response => response.json())
//         .then(data => {
//             const shuffledData = data.sort(() => Math.random() - 0.5);
            
//         });
