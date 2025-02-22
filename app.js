// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Particle.js Configuration
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#6B46C1",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#6B46C1",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
});

// Floating Cards Animation
const cards = document.querySelectorAll(".feature-preview");
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
  setInterval(() => {
    card.style.transform = `translateY(${
      Math.sin(Date.now() / 1000 + index) * 10
    }px)`;
  }, 50);
});

// Reveal on Scroll Animation
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.1,
});

document
  .querySelectorAll(".reveal-slide-up, .reveal-card")
  .forEach((element) => {
    observer.observe(element);
  });

// Contact Form Submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  submitButton.innerHTML =
    '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
  submitButton.disabled = true;

  const formData = {
    name: contactForm.querySelector("#name").value,
    email: contactForm.querySelector("#email").value,
    message: contactForm.querySelector("#message").value,
  };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      showNotification("Message sent successfully!", "success");
      contactForm.reset();
    } else {
      throw new Error(data.message || "Failed to send message");
    }
  } catch (error) {
    showNotification(error.message, "error");
  } finally {
    submitButton.innerHTML = originalButtonText;
    submitButton.disabled = false;
  }
});

// Enhanced Notification System
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type} glass`;
  notification.innerHTML = `
        <i class='bx ${type === "success" ? "bx-check" : "bx-x"}'></i>
        <span>${message}</span>
    `;

  document.body.appendChild(notification);

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "var(--radius)",
    backgroundColor:
      type === "success" ? "rgba(16, 185, 129, 0.9)" : "rgba(239, 68, 68, 0.9)",
    backdropFilter: "blur(8px)",
    color: "white",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transform: "translateY(100px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateY(0)";
  }, 100);

  // Remove notification
  setTimeout(() => {
    notification.style.transform = "translateY(100px)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Update copyright year
document.getElementById("current-year").textContent = new Date().getFullYear();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      navLinks.classList.remove("active");
    }
  });
});

// Typewriter effect for hero text
const typewriter = document.querySelector(".typewriter");
if (typewriter) {
  const text = typewriter.textContent;
  typewriter.textContent = "";
  let i = 0;
  const speed = 100;

  function type() {
    if (i < text.length) {
      typewriter.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 1000);
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !e.target.closest(".nav-links") &&
    !e.target.closest(".mobile-menu-btn")
  ) {
    navLinks.classList.remove("active");
  }
});
