/* HAMBURGER MENU */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close menu after clicking a link
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


/* DARK AND LIGHT MODE */
const themeToggle = document.getElementById("themeToggle");

// Start with Light Mode
document.body.classList.remove("dark-mode");
themeToggle.textContent = "🌙";

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
});



/* PROJECT DETAILS POPUP */
const projectButtons = document.querySelectorAll(".view-project");
const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

projectButtons.forEach(button => {
    button.addEventListener("click", () => {

        document.getElementById("modalTitle").textContent =
            button.dataset.title;

        document.getElementById("modalDescription").textContent =
            button.dataset.description;

        document.getElementById("modalTech").textContent =
            button.dataset.tech;

        const features = button.dataset.features.split("|");
        const featureList = document.getElementById("modalFeatures");

        featureList.innerHTML = "";

        features.forEach(feature => {
            const li = document.createElement("li");
            li.textContent = feature;
            featureList.appendChild(li);
        });

        projectModal.classList.add("active");
    });
});

// Close popup
modalClose.addEventListener("click", () => {
    projectModal.classList.remove("active");
});

// Close when clicking outside
projectModal.addEventListener("click", event => {
    if (event.target === projectModal) {
        projectModal.classList.remove("active");
    }
});

// Close with Escape key
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        projectModal.classList.remove("active");
    }
});

