document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const skillSelect = document.getElementById("skill");
    const positionSelect = document.getElementById("position");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let valid = true;

            // Name check - make sure there are at least 2 words
            if (!validateFullName(nameInput.value.trim())) {
                showError(nameInput, "⚠ נא להזין שם מלא עם לפחות 2 מילים");
                valid = false;
            } else {
                clearError(nameInput);
            }

            // Email check
            if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, "⚠ נא להזין כתובת אימייל תקינה");
                valid = false;
            } else {
                clearError(emailInput);
            }

            // Password check
            if (!validatePassword(passwordInput.value)) {
                showError(passwordInput, "⚠ הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד");
                valid = false;
            } else {
                clearError(passwordInput);
            }

            // Skill level check
            if (!skillSelect.value) {
                showError(skillSelect, "⚠ אנא בחר רמת מיומנות");
                valid = false;
            } else {
                clearError(skillSelect);
            }

            // Preferred position check
            if (!positionSelect.value) {
                showError(positionSelect, "⚠ אנא בחר עמדה מועדפת");
                valid = false;
            } else {
                clearError(positionSelect);
            }

            // If there are errors - stop here
            if (!valid) {
                return;
            }

            // If all the fields are correct - display a success message and refer to the Login page
            showSuccessMessage();
        });

        // function to check that the full name is correct (at least 2 words)
        function validateFullName(name) {
            const nameParts = name.split(" ").filter(part => part.length > 0);
            return nameParts.length >= 2;
        }

        // Function to check correct email
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Function to check that the password meets the requirements
        function validatePassword(password) {
            return /.{8,}/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
        }

        // A function to display an error message
        function showError(input, message) {
            let error = input.nextElementSibling;

            if (!error || !error.classList.contains("error-message")) {
                error = document.createElement("span");
                error.className = "error-message";
                error.style.color = "red";
                error.style.fontSize = "12px";
                error.style.display = "block";
                input.insertAdjacentElement("afterend", error);
            }
            error.textContent = message;
        }

        // function to clear an error message
        function clearError(input) {
            let error = input.nextElementSibling;
            if (error && error.classList.contains("error-message")) {
                error.remove();
            }
        }

        // Function to display a success message and transfer to the LOGIN page
        function showSuccessMessage() {
            const successMessage = document.createElement("div");
            successMessage.textContent = "🎉 החשבון נוצר בהצלחה! מועבר לעמוד הכניסה...";
            successMessage.style.color = "green";
            successMessage.style.fontSize = "16px";
            successMessage.style.fontWeight = "bold";
            successMessage.style.textAlign = "center";
            successMessage.style.marginTop = "20px";
            form.appendChild(successMessage);

            setTimeout(() => {
                form.reset();
                successMessage.remove();
                window.location.href = "../Log in Page/LoginPage.html";
            }, 2000);
        }
    }
});
