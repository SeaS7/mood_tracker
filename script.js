document.addEventListener("DOMContentLoaded", () => {
    // Selecting all necessary elements
    const moodButtons = document.querySelectorAll(".mood-btn");
    const moodList = document.getElementById("moodList");
    const saveMoodButton = document.getElementById("saveMood");
    const moodNote = document.getElementById("moodNote");
    const themeToggle = document.getElementById("themeToggle");
    const clearHistoryButton = document.getElementById("clearHistory");

    let selectedMood = "";
    let moods = JSON.parse(localStorage.getItem("moods")) || [];

    // Saving moods to localStorage
    function saveMoods() {
        localStorage.setItem("moods", JSON.stringify(moods));
    }

    // Rendering mood history on the page
    function renderMoods() {
        moodList.innerHTML = "";
        moods.forEach((mood) => {
            const li = document.createElement("li");
            li.classList.add("mood-item");

            // Create mood history entry
            li.innerHTML = `
                <span class="mood-emoji">${mood.emoji}</span>
                <div class="mood-text">${mood.note}</div>
                <div class="mood-date">${mood.date} - ${mood.time}</div>
            `;

            moodList.appendChild(li);
        });
    }

    // Handling mood selection
    moodButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedMood = button.getAttribute("data-mood");

            // Reducing opacity of all buttons & highlight the selected one
            moodButtons.forEach(btn => btn.style.opacity = "0.5");
            button.style.opacity = "1";
        });
    });

    // Saving the selected mood along with the note and timestamp
    saveMoodButton.addEventListener("click", () => {
       // Prevent saving if no mood is selected
        if (!selectedMood) return;

        const note = moodNote.value.trim();
        const now = new Date();
        const today = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        // Adding new mood entry
        moods.push({ date: today, time, emoji: selectedMood, note });
        saveMoods();
        renderMoods();
        moodNote.value = "";
    });

    // Clearing all mood history
    clearHistoryButton.addEventListener("click", () => {
        moods = [];
        saveMoods();
        renderMoods();
    });

    // Loading existing moods on page load
    renderMoods();

    // Toggling between Light and Dark Mode
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀️" : "🌙"; // Change icon
        localStorage.setItem("darkMode", isDarkMode); // Store preference
    });

    // Applying Dark Mode if previously set
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }
});
