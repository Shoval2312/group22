document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".buttonNewGame");

    // Prevent duplicate event listener
    if (!button.dataset.listenerAdded) {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default form submission
            createGame();
        });
        button.dataset.listenerAdded = "true";
    }

    setupPlayerSuggestions(); // Ensure player suggestions setup runs after page loads
});

// Function to setup player name suggestions
function setupPlayerSuggestions() {
    const playersList = ["Alice", "Alex", "עדן", "שובל", "רז", "גל", "Andrew", "Ben", "Bob", "Charlie", "David", "Daniel", "Ethan", "Ella"];
    const playerInput = document.getElementById("players");

    // Create a container for the suggestions
    const suggestionsBox = document.createElement("div");
    suggestionsBox.classList.add("suggestions");
    playerInput.parentNode.style.position = "relative"; // Ensure parent is positioned
    playerInput.insertAdjacentElement("afterend", suggestionsBox); // Place it right after the input

    playerInput.addEventListener("input", function () {
        const inputValue = this.value.toLowerCase();
        suggestionsBox.innerHTML = "";

        if (inputValue) {
            const filteredPlayers = playersList.filter(player => player.toLowerCase().startsWith(inputValue));
            filteredPlayers.forEach(player => {
                const div = document.createElement("div");
                div.textContent = player;

                div.addEventListener("click", function () {
                    playerInput.value = player;
                    suggestionsBox.style.display = "none";
                });

                suggestionsBox.appendChild(div);
            });

            suggestionsBox.style.display = filteredPlayers.length ? "block" : "none";
        } else {
            suggestionsBox.style.display = "none";
        }
    });

    document.addEventListener("click", function (e) {
        if (!playerInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.display = "none";
        }
    });
}

// A function to create a game with validations
function createGame() {
    if (window.createGameRunning) return; // Prevent multiple executions
    window.createGameRunning = true; // Set flag to prevent duplicate calls

    const gameName = document.getElementById("gameName");
    const gameType = document.getElementById("gameType");
    const dateTime = document.getElementById("dateTime");
    const location = document.getElementById("location");
    const skillLevel = document.getElementById("skillLevel");

    let isValid = true;

    // Reset all input borders before validation
    [gameName, gameType, dateTime, location, skillLevel].forEach(field => {
        field.style.border = "1px solid #ccc";
    });

    // Checking that all mandatory fields have been filled and marking empty fields
    if (!gameName.value.trim()) {
        gameName.style.border = "2px solid red";
        isValid = false;
    }
    if (!gameType.value) {
        gameType.style.border = "2px solid red";
        isValid = false;
    }
    if (!dateTime.value) {
        dateTime.style.border = "2px solid red";
        isValid = false;
    }
    if (!location.value.trim()) {
        location.style.border = "2px solid red";
        isValid = false;
    }
    if (!skillLevel.value) {
        skillLevel.style.border = "2px solid red";
        isValid = false;
    }

    if (!isValid) {
        alert("נא למלא את כל שדות החובה המסומנים באדום");
        window.createGameRunning = false; // Reset flag so user can retry
        return;
    }

    // Convert the entered date to a Date object
    const selectedDate = new Date(dateTime.value);
    const currentDate = new Date();

    // Checking that the date is not in the past
    if (selectedDate < currentDate) {
        alert("אי אפשר לקבוע משחק בתאריך שכבר עבר! נא לבחור תאריך עתידי..");
        dateTime.style.border = "2px solid red";
        window.createGameRunning = false; // Reset flag
        return;
    }

    // Checking that the date is within six months from today
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);

    if (selectedDate > maxDate) {
        alert("הופ הופ! לאיפה הלכת? מותר לקבוע משחק עד חצי שנה מהיום!");
        dateTime.style.border = "2px solid red";
        window.createGameRunning = false; // Reset flag
        return;
    }

    // If all validations pass, show a success message and reset the form
    alert("אלוף!! המשחק נוסף בהצלחה!");
    document.querySelector("form").reset(); // Cleaning the form after submission

    window.createGameRunning = false; // Reset flag so user can submit again
}
