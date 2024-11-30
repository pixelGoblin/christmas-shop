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

document.addEventListener("DOMContentLoaded", () => {
    const giftsContainer = document.getElementById("gifts-container");

    fetch('gifts.json')
        .then(response => response.json())
        .then(data => {
            const shuffledData = data.sort(() => Math.random() - 0.5);

            shuffledData.forEach((card) => {
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
                giftsContainer.appendChild(cardContainer);

            });
        })
});

// TABS

// const tabMenu = Array.from(document.getElementById("gifts-menu").children);
const tabMenu = document.getElementById("gifts-menu").querySelectorAll(".tab");
// console.log(tabMenu);

tabMenu.forEach((item) => {
    item.addEventListener("click", () => {
        const category = item.querySelector("span").textContent.trim();
        console.log(`Category selected: ${category}`);
    });
});