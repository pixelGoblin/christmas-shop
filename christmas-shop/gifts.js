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

// const giftsImage


document.addEventListener("DOMContentLoaded", () => {
    const giftsContainer = document.getElementById("gifts-container");

    fetch('gifts.json')
        .then(response => response.json())
        .then(data => {
            shuffledData = data.sort(() => Math.random() - 0.5);

            shuffledData.forEach((card, index) => {
                drawCard(card, giftsContainer, index);
            });
            shuffledDataHarmony = shuffledData.filter(card => card['category'] === 'For Harmony');
            shuffledDataHealth = shuffledData.filter(card => card['category'] === 'For Health');
            shuffledDataWork = shuffledData.filter(card => card['category'] === 'For Work');
        })
});

function drawCard(card, container, index) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("gift-item");
    cardContainer.dataset.idx = index;
    cardContainer.dataset.tab = card['category'].toLowerCase().replace(' ', '-');
    cardContainer.innerHTML = `
        <div class="gift-img"></div>
        <div class="gift-text">
            <h4>${card['category']}</h4>
            <h3>${card['name']}</h3>
        </div>
    `;
    cardContainer.classList.add(card['category'].toLowerCase().replace(' ', '-'));
    container.appendChild(cardContainer);
    cardContainer.addEventListener("click", (event) => {
        // console.log(event.currentTarget.classList); //delete later
        drawModal(event.currentTarget);
    })
}



const modal = document.getElementById("card-modal");
const closeButton = document.getElementById("close-modal");

closeButton.addEventListener("click", () => {
    modal.close();
    document.body.style.overflowY = null;
});

function drawModal(card) {
    const cardModal = document.getElementById("card-modal");
    const cardModalContent = cardModal.querySelector(".modal-content");
    const modalBasicInfo = cardModal.querySelector(".modal-basic-info");
    const modalSkills = cardModal.querySelector(".modal-skills").querySelectorAll("li");

    const categoryDataMap = {
        "For Work": shuffledDataWork,
        "For Health": shuffledDataHealth,
        "For Harmony": shuffledDataHarmony,
        "All": shuffledData
    };

    const selectedTab = document.getElementById("gifts-menu").querySelector(`li[data-state="active"]`).querySelector("span").textContent;

    cardModalContent.classList.remove("for-work", "for-health", "for-harmony");
    cardModalContent.classList.add(card.classList[1]);
    modalBasicInfo.querySelector(".category").textContent = card.querySelector("h4").textContent;
    modalBasicInfo.querySelector(".name").textContent = card.querySelector("h3").textContent;
    modalBasicInfo.querySelector(".paragraph").textContent = categoryDataMap[selectedTab][card.dataset.idx].description;
    
    modalSkills.forEach((skill) => {
        const skillScore = categoryDataMap[selectedTab][card.dataset.idx].superpowers[skill.querySelector("span.skill-name").textContent.toLowerCase()];
        skill.querySelector("span.paragraph.score").textContent = skillScore;
        skill.querySelector("div.icons").innerHTML = `<img src="img/icon.svg" alt="snowflake icon" class="score-icon">`.repeat(5);
        skill.querySelectorAll("img.score-icon").forEach((icon, iconIndex) => {
            if (iconIndex + 1 > skillScore.replace(/[^0-9]/g, '') / 100) {
                icon.classList.add("bleak");
            }
        })
    })
    document.body.style.overflowY = 'hidden';

    // console.log(categoryDataMap[card.querySelector("h4").textContent][card.dataset.idx].description);
    modal.showModal();
}



// TABS

// const tabMenu = Array.from(document.getElementById("gifts-menu").children);
const tabMenu = document.getElementById("gifts-menu").querySelectorAll(".tab");

tabMenu.forEach((item) => {
    item.addEventListener("click", () => {
        tabMenu.forEach((item) => item.dataset.state = null);
        item.dataset.state = "active";
        const categoryDataMap = {
            "For Work": shuffledDataWork,
            "For Health": shuffledDataHealth,
            "For Harmony": shuffledDataHarmony,
            "All": shuffledData
        };
        const giftsContainer = document.getElementById("gifts-container");
        const category = item.querySelector("span").textContent.trim();
        giftsContainer.innerHTML = "";

        categoryDataMap[category].forEach((card, index) => {
            drawCard(card, giftsContainer, index);
        });
    });
});

