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

  function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.innerText = quotes[randomIndex];
  }

  newQuoteBtn.addEventListener('click', generateQuote);
});
