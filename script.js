// ==========================================
// IMAN Elevate Bootcamp - Frontend Track
// Author: Zakaria Muzayan
// ==========================================


// ---------- 1. MOBILE MENU ----------
// The Menu button shows or hides the links on small screens.
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close the menu after a link is clicked
document.querySelectorAll("#nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});


// ---------- 2. FAQ ACCORDION ----------
// Clicking a question opens or closes its answer.
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    item.classList.toggle("open");
    question.setAttribute("aria-expanded", item.classList.contains("open"));
  });
});


// ---------- 3. PROJECT FILTER ----------
// Show only the projects that match the clicked button.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const noProjects = document.getElementById("no-projects");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter; // all, html, css, or javascript
    let shown = 0;

    // Mark the clicked button as active
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    // Show or hide each project card
    projectCards.forEach((card) => {
      if (category === "all" || card.dataset.category.includes(category)) {
        card.classList.remove("hidden");
        shown++;
      } else {
        card.classList.add("hidden");
      }
    });

    // Show a message if no project matches
    noProjects.classList.toggle("hidden", shown > 0);
  });
});


// ---------- 4. TESTIMONIALS SLIDER ----------
// The arrows move between testimonials.
const testimonials = document.querySelectorAll(".testimonial");
const slideCounter = document.getElementById("slide-counter");
let current = 0;

function showTestimonial(index) {
  if (index < 0) {
    index = testimonials.length - 1; // go to the last one
  }
  if (index >= testimonials.length) {
    index = 0; // go back to the first one
  }
  current = index;

  testimonials.forEach((item, i) => {
    item.classList.toggle("active", i === current);
  });
  slideCounter.textContent = current + 1 + " / " + testimonials.length;
}

document.getElementById("prev-btn").addEventListener("click", () => {
  showTestimonial(current - 1);
});
document.getElementById("next-btn").addEventListener("click", () => {
  showTestimonial(current + 1);
});


// ---------- 5. FORM VALIDATION ----------
// Check every field and show a message under it.
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const formMessage = document.getElementById("form-message");

// Show (or clear) the error text under an input
function setError(input, text) {
  input.nextElementSibling.textContent = text;
  input.classList.toggle("invalid", text !== "");
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  let errors = 0;

  // Name is required
  if (nameInput.value.trim() === "") {
    setError(nameInput, "Please enter your name.");
    errors++;
  } else {
    setError(nameInput, "");
  }

  // Email must look like name@site.com
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    setError(emailInput, "Please enter a valid email address.");
    errors++;
  } else {
    setError(emailInput, "");
  }

  // Phone must have 7 to 15 digits
  const digits = phoneInput.value.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    setError(phoneInput, "Please enter a valid phone number (7 to 15 digits).");
    errors++;
  } else {
    setError(phoneInput, "");
  }

  // Message needs at least 10 characters
  if (messageInput.value.trim().length < 10) {
    setError(messageInput, "Please write at least 10 characters.");
    errors++;
  } else {
    setError(messageInput, "");
  }

  // Show the result
  if (errors === 0) {
    formMessage.textContent = "Thank you, " + nameInput.value.trim() + "! Your details are correct.";
    form.reset();
  } else {
    formMessage.textContent = "";
  }
});
