document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents automatic submission of the form until verified

        const nameInput = document.getElementById("name");
        const messageInput = document.getElementById("message");

        const nameValue = nameInput.value.trim();
        const messageValue = messageInput.value.trim();

        // Checking that the name contains only letters (no numbers or special characters)
        const namePattern = /^[A-Za-zא-ת\s]+$/;

        if (!namePattern.test(nameValue)) {
            alert("נא להזין שם תקין המכיל רק אותיות");
            return;
        }

        // Checking that the feedback contains at least two words
        const words = messageValue.split(/\s+/).filter(word => word.length > 0);
        if (words.length < 2) {
            alert("נא להזין לפחות שתי מילים בפידבק.");
            return;
        }

        // If everything is in order - you can send the form
        alert("הטופס נשלח בהצלחה!");
        form.submit();
    });
});
