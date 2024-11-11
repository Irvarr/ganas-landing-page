document.addEventListener('DOMContentLoaded', function() {
  const quotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Success usually comes to those who are too busy to be looking for it."
  ];

  const quoteText = document.getElementById('quote');
  const newQuoteBtn = document.getElementById('new-quote-btn');

  function displayRandomQuote() {
    if (quoteText) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteText.classList.remove('fade'); // Remove fade class to reset animation
      void quoteText.offsetWidth; // Trigger reflow to restart animation
      quoteText.innerText = quotes[randomIndex];
      quoteText.classList.add('fade'); // Add fade class for fade-in effect
    }
  }

  if (quoteText && newQuoteBtn) {
    newQuoteBtn.addEventListener('click', displayRandomQuote);
  } else {
    console.error('Quote text or new quote button element not found');
  }
});
