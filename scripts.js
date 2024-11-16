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

  const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbw-44vrGkgVgnglzV8126lheg0I3vSQlyPEz5DiBr1Fiv5LR7ieAQFZFaUNgCO8GIddBQ/exec"; // Deployed script URL

  // Function to display a random quote
  function displayRandomQuote() {
    if (quoteText) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteText.classList.remove('fade'); // Reset animation
      void quoteText.offsetWidth; // Trigger reflow to restart animation
      quoteText.innerText = quotes[randomIndex];
      quoteText.classList.add('fade'); // Add fade class for fade-in effect
    } else {
      console.error("Quote element not found");
    }
  }

  // Add event listener to generate a new quote
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', displayRandomQuote);
  } else {
    console.error("New quote button not found");
  }

  // Function to handle form submission
  function handleSignup(event) {
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
            return response.json(); // Parse response as JSON
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })
        .then((data) => {
          if (data.message === "Subscription successful!") {
            alert("Thank you for signing up!");
            emailInput.value = ""; // Clear input field
          } else {
            alert(data.message || "There was an issue with your submission.");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          alert("An error occurred. Please try again later.");
        });
    } else {
      alert("Please enter a valid email address.");
    }
  }

  // Add event listener to handle form submission
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  } else {
    console.error("Signup form not found");
  }

  // Display a random quote on page load
  displayRandomQuote();
});
