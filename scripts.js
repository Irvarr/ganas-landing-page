document.addEventListener('DOMContentLoaded', function () {
  // Quotes Array
  const quotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Success usually comes to those who are too busy to be looking for it."
  ];

  // Element Selectors
  const quoteText = document.getElementById('quote');
  const newQuoteBtn = document.getElementById('new-quote-btn');

  // Reset animation by removing and re-adding the 'fade' class
  function resetFadeAnimation(element) {
    element.classList.remove('fade');
    void element.offsetWidth; // Trigger reflow to restart animation
    element.classList.add('fade');
  }

  // Display Random Quote Function
  function displayRandomQuote() {
    if (quoteText) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteText.textContent = quotes[randomIndex];
      resetFadeAnimation(quoteText); // Apply fade-in effect
    }
  }

  // Event Listeners
  if (quoteText && newQuoteBtn) {
    newQuoteBtn.addEventListener('click', displayRandomQuote);
  } else {
    console.error('Quote text or new quote button element not found');
  }

  // Display a Quote on Page Load
  displayRandomQuote(); // Display an initial quote when the page loads
});
