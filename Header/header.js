document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header");
    fetch("../Header/header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch header.html");
            }
            return response.text();
        })
        .then(data => {
            headerContainer.innerHTML = data;

            // Menus and boxes
            const authIcon = document.getElementById('auth-icon');
            const dropdownMenu = document.getElementById('dropdown-menu');
            const alarmIcon = document.getElementById('Alarm-icon');
            const alarmDropdown = document.getElementById('alarm-dropdown');
            const searchIcon = document.getElementById('Search-icon');
            const searchBox = document.getElementById('search-box');

            // Function to close all menu
            function closeAllMenus() {
                dropdownMenu?.classList.add('hidden');
                alarmDropdown?.classList.add('hidden');
                searchBox?.classList.add('hidden');
            }

            // Opening and closing a user dropdown
            authIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu?.classList.toggle('hidden');
                closeOtherMenus(dropdownMenu);
            });

            // Opening and closing the notifications dropdown
            alarmIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                alarmDropdown?.classList.toggle('hidden');
                closeOtherMenus(alarmDropdown);
            });

            // Opening and closing a search box
            searchIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                searchBox?.classList.toggle('hidden');
                closeOtherMenus(searchBox);
            });

            // Preventing a menu from closing when there is a click in it
            dropdownMenu?.addEventListener('click', (e) => e.stopPropagation());
            alarmDropdown?.addEventListener('click', (e) => e.stopPropagation());
            searchBox?.addEventListener('click', (e) => e.stopPropagation());

            // Listens to close if clicked outside the menus
            document.addEventListener('click', closeAllMenus);

            // A function to close the rest of the menus
            function closeOtherMenus(currentMenu) {
                [dropdownMenu, alarmDropdown, searchBox].forEach(menu => {
                    if (menu && menu !== currentMenu) {
                        menu.classList.add('hidden');
                    }
                });
            }
        })
        .catch(err => console.error("Error loading header:", err));
});
