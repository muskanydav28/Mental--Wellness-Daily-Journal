const form = document.getElementById("journalForm");
const moodChartCanvas = document.getElementById("moodChart");
const quoteElement = document.getElementById("quote");
let chart;

// Example quotes
const quotes = [
  "Every day may not be good, but there is something good in every day.",
  "You are stronger than you think.",
  "Self-care is how you take your power back.",
  "Happiness is not out there, it's inside you.",
  "Take it one day at a time, you’re doing great!"
];

// Show random quote of the day
function showQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex];
}
showQuote();

// Save mood entry
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const mood = document.getElementById("mood").value;
  const notes = document.getElementById("notes").value;

  if (!mood) {
    alert("Please select a mood");
    return;
  }

  // Save entry to local storage
  let journal = JSON.parse(localStorage.getItem("journal")) || [];
  journal.push({ mood: parseInt(mood), notes, date: new Date().toLocaleDateString() });
  localStorage.setItem("journal", JSON.stringify(journal));

  updateChart(journal);

  form.reset();
  alert("Entry saved!");
});

// Update chart with history
function updateChart(journal) {
  const labels = journal.map(entry => entry.date);
  const data = journal.map(entry => entry.mood);

  if (chart) chart.destroy();

  chart = new Chart(moodChartCanvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Mood Level (1-5)",
        data: data,
        borderColor: "#6a9fb5",
        backgroundColor: "#b3d7e3"
      }]
    },
    options: {
      scales: {
        y: {
          min: 1,
          max: 5,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Load existing data on page load
window.onload = function() {
  let journal = JSON.parse(localStorage.getItem("journal")) || [];
  if (journal.length > 0) {
    updateChart(journal);
  }
};
