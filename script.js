// ===== Filter Buttons =====
const filterBtns = document.querySelectorAll(".filter-btn");
const videoCards = document.querySelectorAll(".video-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    videoCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ===== Search Bar =====
const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("keyup", () => {
  const searchText = searchBar.value.toLowerCase();

  videoCards.forEach((card) => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    if (title.includes(searchText)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// ========== SMOOTH NAVIGATION ==========
document.querySelectorAll("header nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// ========== CONTACT FORM VALIDATION ==========
const form = document.querySelector(".contact-form form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("⚠️ Please enter a valid email address!");
      return;
    }

    alert("✅ Thank you for contacting us, " + name + "!");
    form.reset();
  });
}

// ========== SMALL ANIMATION ==========
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  { threshold: 0.2 }
);

videoCards.forEach((card) => {
  observer.observe(card);
});
