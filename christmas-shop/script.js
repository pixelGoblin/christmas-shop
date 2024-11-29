// HAMBURGER MENU

const menuToggle = document.getElementById('menu-toggle');

document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
        menuToggle.checked = false;
    });
});

menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
});

// GIFTS

document.querySelectorAll(".gift-item").forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    })
})

