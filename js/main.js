document.addEventListener("DOMContentLoaded", () => {
    //show menu
    const navMenu = document.getElementById("nav-menu"),
        navToggle = document.getElementById("nav-toggle"),
        navClose = document.getElementById("nav-close");
    
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.add("show-menu");
        });
    }

    if (navClose) {
        navClose.addEventListener("click", () => {
            navMenu.classList.remove("show-menu");
        });
    }

    //remove menu mobile
    const navLink = document.querySelectorAll(".nav__link");

    function linkAction() {
        const navMenu = document.getElementById("nav-menu");
        navMenu.classList.remove("show-menu");
    }

    navLink.forEach((n) => n.addEventListener("click", linkAction));

    
    //change background header
    function scrollHeader() {
        const header = document.getElementById("header");
        if (this.scrollY >= 80) header.classList.add("scroll-header");
        else header.classList.remove("scroll-header");
    }

    window.addEventListener("scroll", scrollHeader);

    //show scrollup
    function scrollup() {
        const scrollup = document.getElementById("scroll-up");
        if (this.scrollY >= 350) scrollup.classList.add("show-scroll");
        else scrollup.classList.remove("show-scroll");
    }
        
    window.addEventListener("scroll", scrollup);

    const tabs = document.querySelectorAll(".tabs__btn"); // Select all tab buttons
    const tabContents = document.querySelectorAll(".tabs__item"); // Select all tab content items

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.target); // Find the content corresponding to the clicked tab

            // Remove the active class from all tabs and content
            tabs.forEach((t) => t.classList.remove("tab__active"));
            tabContents.forEach((content) => content.classList.remove("tab__active"));

            // Add the active class to the clicked tab and its content
            tab.classList.add("tab__active");
            target.classList.add("tab__active");
        });
    });

    const navLinks = document.querySelectorAll(".nav__link");
    const sections = document.querySelectorAll("section"); // Select all sections

    function highlightActiveLink() {
        let scrollPosition = window.scrollY + 150; // Scroll offset to trigger active link slightly earlier
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = section.offsetTop + section.offsetHeight;

            // If the section is in view, activate its corresponding link
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    // Check if the link's href matches the section's ID
                    if (link.getAttribute("href") === `#${section.id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    // Event listener for scroll
    window.addEventListener("scroll", highlightActiveLink);

    // Call the function on page load to check the current section if the page is reloaded
    highlightActiveLink();

    //about cretification buttons

    const images = ["img/cert1.PNG", "img/cert2.jpg", "img/cert3.jpg"];
    let currentIndex = 0;

    const certImage = document.getElementById("certImage");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        certImage.src = images[currentIndex];
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        certImage.src = images[currentIndex];
    });

    //concat from

const contactForm = document.getElementById("contact-form"),
    contactName = document.getElementById("contact-name"),
    contactEmail = document.getElementById("contact-email"),
    contactSubject = document.getElementById("contact-subject"),
    contactMessage = document.getElementById("contact-message"),
    errorMessage = document.getElementById("error-message");



const sendEmail = async (e) => {
    e.preventDefault();

    errorMessage.classList.remove("success__message", "error__message");
    errorMessage.textContent = "";  

    if (contactName.value === "" || contactEmail.value === "" || contactSubject.value === "" || contactMessage.value === "") {
        errorMessage.classList.add("error__message");
        errorMessage.textContent = "All fields are required!";
        setTimeout(() => {
            errorMessage.textContent = "";
        }, 3000);
        return;
    }

    errorMessage.textContent = "";

    // Prepare data for Formspree
    const formData = new FormData(contactForm);

    try {
    const response = await fetch(contactForm.action, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: formData,
    });

    errorMessage.classList.remove("success__message", "error__message");

    if (response.ok) {
        errorMessage.classList.add("success__message");
        errorMessage.textContent = "Message sent ✔";
        contactForm.reset();
        setTimeout(() => {
            errorMessage.textContent = "";
        }, 3000);
    } else {
        const data = await response.json();
        
        errorMessage.classList.add("error__message"); // Add error styling
        errorMessage.textContent = data.errors ? data.errors.map(error => error.message).join(", ") : "Something went wrong. Please try again.";
        setTimeout(() => {
            errorMessage.textContent = "";
        }, 3000);
    }

    } catch (err) {
    errorMessage.classList.add("error__message");
    errorMessage.textContent = "Failed to send message. Check your connection.";
    setTimeout(() => {
        errorMessage.textContent = "";
    }, 3000);

    }

};


    
// Event listener for the form submission

contactForm.addEventListener('submit', sendEmail);

});



