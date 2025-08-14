// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const sunIcon = document.getElementById("sun-icon")
const moonIcon = document.getElementById("moon-icon")
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const menuIcon = document.getElementById("menu-icon")
const closeIcon = document.getElementById("close-icon")
const mobileNav = document.getElementById("mobile-nav")
const contactForm = document.getElementById("contact-form")
const enrollmentModal = document.getElementById("enrollment-modal")

// Dark Mode Functionality
let isDarkMode = localStorage.getItem("darkMode") === "true"

function updateTheme() {
  if (isDarkMode) {
    document.body.classList.add("dark-mode")
    sunIcon.classList.remove("hidden")
    moonIcon.classList.add("hidden")
  } else {
    document.body.classList.remove("dark-mode")
    sunIcon.classList.add("hidden")
    moonIcon.classList.remove("hidden")
  }
  localStorage.setItem("darkMode", isDarkMode)
}

// Initialize theme
updateTheme()

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode
  updateTheme()
})

// Mobile Menu Functionality
let isMobileMenuOpen = false

function toggleMobileMenu() {
  isMobileMenuOpen = !isMobileMenuOpen

  if (isMobileMenuOpen) {
    mobileNav.classList.remove("hidden")
    menuIcon.classList.add("hidden")
    closeIcon.classList.remove("hidden")
  } else {
    mobileNav.classList.add("hidden")
    menuIcon.classList.remove("hidden")
    closeIcon.classList.add("hidden")
  }
}

mobileMenuToggle.addEventListener("click", toggleMobileMenu)

// Smooth Scrolling Navigation
function scrollToSection(sectionId) {
  // Handle courses section mapping
  if (sectionId === "subjects") {
    sectionId = "courses"
  }

  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
  // Close mobile menu if open
  if (isMobileMenuOpen) {
    toggleMobileMenu()
  }
}

// Make scrollToSection available globally
window.scrollToSection = scrollToSection

// Contact Form Handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const phone = formData.get("phone")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Create WhatsApp message
  const whatsappMessage = `Hello Achiever, I am ${name}. I got your contact from your website and I want to enquire about ${subject}. ${message ? "Additional message: " + message : ""}`
  const whatsappURL = `https://api.whatsapp.com/send?phone=2348071342141&text=${encodeURIComponent(whatsappMessage)}`

  // Open WhatsApp
  window.open(whatsappURL, "_blank")

  // Reset form
  contactForm.reset()

  // Show success message (simple alert for now)
  alert("Thank you for your message! You will be redirected to WhatsApp to complete your inquiry.")
})

// Resource Download Handlers
document.addEventListener("DOMContentLoaded", () => {
  const resourceButtons = document.querySelectorAll(".resource-btn")

  resourceButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const resourceType = e.target.closest(".resource-card").querySelector(".resource-title").textContent
      alert(`${resourceType} download will be available soon. Please contact us via WhatsApp for immediate access.`)
    })
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.backdropFilter = "blur(12px)"
  } else {
    header.style.backdropFilter = "blur(8px)"
  }
})

// Google Form Enrollment Functionality
function openEnrollmentForm() {
  enrollmentModal.classList.remove("hidden")
  document.body.style.overflow = "hidden"
}

function closeEnrollmentModal() {
  enrollmentModal.classList.add("hidden")
  document.body.style.overflow = "auto"
}

// Make enrollment functions available globally
window.openEnrollmentForm = openEnrollmentForm
window.closeEnrollmentModal = closeEnrollmentModal

// Handle form submission success from Google Forms
window.addEventListener("message", (event) => {
  // Check if the message is from Google Forms
  if (event.origin === "https://docs.google.com") {
    // Check if form was submitted successfully
    if (event.data && event.data.includes && event.data.includes("formResponse")) {
      // Show success message
      setTimeout(() => {
        alert("Registration successful! Thank you for enrolling with Achievers Educare Academy.")
        closeEnrollmentModal()
        // Redirect to home section
        scrollToSection("home")
      }, 1000)
    }
  }
})

// Close modal when clicking outside
enrollmentModal.addEventListener("click", function (e) {
  if (e.target === this) {
    closeEnrollmentModal()
  }
})
