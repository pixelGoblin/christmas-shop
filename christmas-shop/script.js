

// HAMBURGER MENU

const menuToggle = document.getElementById('menu-toggle');

document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
        menuToggle.checked = false;
        document.body.style.overflowY = null;
    });
});

menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
        document.body.style.overflowY = 'hidden';
        // document.body.classList.add('no-scroll');
    } else if (!menuToggle.checked) {
        // document.body.classList.remove('no-scroll');
        document.body.style.overflowY = null;
    }
});

onresize = () => {
    if (window.innerWidth <= 768) {
        document.getElementById('nav-menu').style.display = 'none';
        setTimeout(() => {
            document.getElementById('nav-menu').style.display = null;
        }, 300);
    }
};

// GIFTS

// document.querySelectorAll(".gift-item").forEach((item) => {
//     item.addEventListener("click", () => {
//         item.classList.toggle("active");
//     })
// })

// HIDE HEADER

const header = document.querySelector("header");
let lastScrollY = window.scrollY;

function handleScroll() {
    const currentScrollY = window.scrollY;
    console.log(currentScrollY);

    if (currentScrollY > lastScrollY && currentScrollY > 64) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
        
    }
    lastScrollY = currentScrollY;
}
window.addEventListener("scroll", handleScroll);