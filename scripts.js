document.addEventListener("DOMContentLoaded", function () {
  const quotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Success usually comes to those who are too busy to be looking for it.",
  ];

  const quoteText = document.getElementById("quote");
  const newQuoteBtn = document.getElementById("new-quote-btn");
  const signupForm = document.getElementById("signup-form");
  const emailInput = document.getElementById("email-signup");
  const signupButton = document.getElementById("signup-btn");
  const bottomSignupForm = document.getElementById("bottom-signup-form");
  const bottomEmailInput = document.getElementById("bottom-email-signup");
  const bottomSignupButton = document.getElementById("bottom-signup-btn");
  const firebaseFunctionURL =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:5001/ganas-landing/us-central1/subscribeUser"
      : "https://us-central1-ganas-landing.cloudfunctions.net/submitEmail";

  // Display a random quote
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
  }

  // Email validation
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Handle form submission
  function handleFormSubmit(emailInput, button) {
    const email = emailInput.value.trim();
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    button.disabled = true;
    button.textContent = "Submitting...";

    fetch(firebaseFunctionURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Server Error");
      })
      .then((data) => {
        alert("Thank you for signing up!");
        emailInput.value = "";
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again.");
      })
      .finally(() => {
        button.disabled = false;
        button.textContent = "Sign Up";
      });
  }

  // Event listeners
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", displayRandomQuote);
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleFormSubmit(emailInput, signupButton);
    });
  }

  if (bottomSignupForm) {
    bottomSignupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleFormSubmit(bottomEmailInput, bottomSignupButton);
    });
  }

  // Initial random quote
  displayRandomQuote();
});
