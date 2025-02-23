document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.getElementById('filter-btn');
    const searchBar = document.getElementById('search-bar');

    filterButton.addEventListener('click', () => {
        const searchValue = searchBar.value.toLowerCase();
        const rows = document.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const teamName = row.querySelector('td:first-child').textContent.toLowerCase();
            if (teamName.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});
