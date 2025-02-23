document.addEventListener('DOMContentLoaded', () => {
    const teams = [
        {name: 'Tel Aviv Lions', logo: '../Images/tel_aviv_lions.jpg'},
        {name: 'Jerusalem Kings', logo: '../Images/jerusalem_kings.jpg'},
        {name: 'Haifa Hawks', logo: '../Images/haifa_hawks.jpg'},
        {name: 'Eilat Eagles', logo: '../Images/eilat_eagles.png'},
        {name: 'Shoval Group', logo: '../Images/shoval_group.png'},
        {name: 'BGU Warriors', logo: '../Images/bgu_warriors.png'},
        {name: 'Desert Strikers', logo: '../Images/desert_strikers.png'},
        {name: 'Herzliya Dolphins', logo: '../Images/herzliya_dolphins.png'},
        {name: 'Gal Group', logo: '../Images/gal_group.png'},
        {name: 'Carmel Storm', logo: '../Images/carmel_storm.png'}
    ];

    const resultsTable = document.querySelector('#results-table tbody');
    const team1Select = document.getElementById('team1');
    const team2Select = document.getElementById('team2');
    const resultForm = document.getElementById('result-form');

    //Filling the list of groups in SELECT
    teams.forEach(team => {
        const option1 = new Option(team.name, team.name);
        const option2 = new Option(team.name, team.name);
        team1Select.appendChild(option1);
        team2Select.appendChild(option2);
    });

    // A function to return the group logo
    function getTeamLogo(teamName) {
        const team = teams.find(t => t.name === teamName);
        return team ? team.logo : '../Images/default_logo.png';
    }

    // Adding a result to the table with a logo
    function addResultToTable(date, team1, score1, team2, score2) {
        const row = document.createElement('tr');
        const winner = score1 > score2 ? team1 : score2 > score1 ? team2 : 'Draw';

        row.innerHTML = `
        <td>${date}</td>
        <td class="team-name">
            <img src="${getTeamLogo(team1)}" class="team-logo"> ${team1}
        </td>
        <td>${score1} - ${score2}</td>
        <td class="team-name">
            <img src="${getTeamLogo(team2)}" class="team-logo"> ${team2}
        </td>
        <td>${winner}</td>
        <td><span class="delete-icon">🗑️</span></td>
    `;

        // Delete a row
        row.querySelector('.delete-icon').addEventListener('click', () => {
            row.remove();
            saveResults();
        });

        resultsTable.appendChild(row);
        saveResults();
    }

    // Saving results in localStorage
    function saveResults() {
        const results = [];
        document.querySelectorAll('#results-table tbody tr').forEach(row => {
            results.push(row.innerHTML);
        });
        localStorage.setItem('matchResults', JSON.stringify(results));
    }

    // Loading results from localStorage
    function loadResults() {
        const savedResults = JSON.parse(localStorage.getItem('matchResults')) || [];
        savedResults.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = result;
            row.querySelector('.delete-icon').addEventListener('click', () => {
                row.remove();
                saveResults();
            });
            resultsTable.appendChild(row);
        });
    }

    // Added a new result
    resultForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const team1 = team1Select.value;
        const team2 = team2Select.value;
        const score1 = document.getElementById('score1').value;
        const score2 = document.getElementById('score2').value;
        const date = new Date().toLocaleDateString('en-GB');

        if (team1 === team2) {
            alert("Teams must be different!");
            return;
        }

        if (score1 === '' || score2 === '') {
            alert("Please enter scores!");
            return;
        }

        addResultToTable(date, team1, score1, team2, score2);
    });

    // Loading saved data
    loadResults();
});
