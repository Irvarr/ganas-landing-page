document.addEventListener('DOMContentLoaded', function () {
  const quotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Success usually comes to those who are too busy to be looking for it."
  ];

  const quoteText = document.getElementById('quote');
  const newQuoteBtn = document.getElementById('new-quote-btn');
  const signupForm = document.getElementById('signup-form');
  const emailInput = document.getElementById('email-signup');

  const googleScriptURL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"; // Replace with your deployed script URL

  // Display a random quote
  function displayRandomQuote() {
    if (quoteText) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteText.classList.remove('fade'); // Remove fade class to reset animation
      void quoteText.offsetWidth; // Trigger reflow to restart animation
      quoteText.innerText = quotes[randomIndex];
      quoteText.classList.add('fade'); // Add fade class for fade-in effect
    }
  }

  // Event listener for generating a new quote
  if (quoteText && newQuoteBtn) {
    newQuoteBtn.addEventListener('click', displayRandomQuote);
  } else {
    console.error('Quote text or new quote button element not found');
  }

  // Handle form submission
  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      const email = emailInput.value.trim();

      if (email) {
        fetch(googleScriptURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        })
          .then((response) => {
            if (response.ok) {
              alert("Thank you for signing up!"); // Success message
              emailInput.value = ""; // Clear input
            } else {
              alert("There was a problem with your submission. Please try again.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
          });
      } else {
        alert("Please enter a valid email address.");
      }
    });
  } else {
    console.error('Signup form not found');
  }
});
