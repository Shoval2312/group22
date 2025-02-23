document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer");
    fetch("../Footer/footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch footer.html");
            }
            return response.text();
        })
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(err => console.error("Error loading footer:", err));
});
