// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const body = document.body
const themeIcon = themeToggle.querySelector("i")

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)

  // Reset navbar background to let CSS handle it
  const navbar = document.querySelector(".navbar")
  navbar.style.backgroundColor = ""
})

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"
  } else {
    themeIcon.className = "fas fa-moon"
  }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  const currentTheme = body.getAttribute("data-theme")

  if (window.scrollY > 50) {
    if (currentTheme === "dark") {
      navbar.style.backgroundColor = "rgba(31, 41, 55, 0.95)"
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    }
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.backgroundColor = ""
    navbar.style.backdropFilter = "none"
  }
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const course = formData.get("course")
  const message = formData.get("message")

  // Basic validation
  if (!name || !email || !phone || !course) {
    showNotification("Please fill in all required fields.", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    showNotification("Please enter a valid email address.", "error")
    return
  }

  // Phone validation (basic Nigerian phone number format)
  const phoneRegex = /^(\+234|0)[789][01]\d{8}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    showNotification("Please enter a valid Nigerian phone number.", "error")
    return
  }

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent
  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    showNotification("Thank you! Your message has been sent successfully. We will contact you soon.", "success")
    contactForm.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
})

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `

  // Add to DOM
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOut 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)

  // Close button functionality
  const closeButton = notification.querySelector(".notification-close")
  closeButton.addEventListener("click", () => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => notification.remove(), 300)
  })
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle"
    case "error":
      return "fa-exclamation-circle"
    case "warning":
      return "fa-exclamation-triangle"
    default:
      return "fa-info-circle"
  }
}

function getNotificationColor(type) {
  switch (type) {
    case "success":
      return "var(--success-color)"
    case "error":
      return "var(--error-color)"
    case "warning":
      return "var(--warning-color)"
    default:
      return "var(--primary-color)"
  }
}

// Add CSS for notifications
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`
document.head.appendChild(notificationStyles)

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".about-card, .service-card, .course-card, .testimonial-card")
  animatedElements.forEach((el) => {
    el.classList.add("loading")
    observer.observe(el)
  })
})

// Counter animation for hero stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/[^\d]/g, ""))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        if (counter.textContent.includes("%")) {
          counter.textContent = Math.ceil(current) + "%"
        } else if (counter.textContent.includes("+")) {
          counter.textContent = Math.ceil(current) + "+"
        } else {
          counter.textContent = Math.ceil(current)
        }
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = counter.textContent // Reset to original
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        heroObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const heroSection = document.querySelector(".hero")
if (heroSection) {
  heroObserver.observe(heroSection)
}

// Add loading state to page
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Preload critical images
function preloadImages() {
  const images = [
    "/placeholder.svg?height=500&width=600",
    "/placeholder.svg?height=60&width=60",
    "/placeholder.svg?height=60&width=60",
    "/placeholder.svg?height=60&width=60",
  ]

  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Initialize preloading
preloadImages()

// Add scroll-to-top functionality
const scrollToTopButton = document.createElement("button")
scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollToTopButton.className = "scroll-to-top"
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
`

document.body.appendChild(scrollToTopButton)

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopButton.style.opacity = "1"
    scrollToTopButton.style.visibility = "visible"
  } else {
    scrollToTopButton.style.opacity = "0"
    scrollToTopButton.style.visibility = "hidden"
  }
})

// Scroll to top functionality
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Add hover effect to scroll to top button
scrollToTopButton.addEventListener("mouseenter", () => {
  scrollToTopButton.style.transform = "scale(1.1)"
})

scrollToTopButton.addEventListener("mouseleave", () => {
  scrollToTopButton.style.transform = "scale(1)"
})
