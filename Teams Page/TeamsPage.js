document.addEventListener('DOMContentLoaded', () => {
    const teamsContainer = document.querySelector('.teams-container');
    const sportFilter = document.getElementById('sport-filter');
    const locationFilter = document.getElementById('location-filter');
    const levelFilter = document.getElementById('level-filter');
    const filterBtn = document.getElementById('filter-btn');

    function getRandomDate() {
        const today = new Date();
        const randomDays = Math.floor(Math.random() * 7) + 1; // בין יום ל-7 ימים מהיום
        today.setDate(today.getDate() + randomDays);
        return today.toLocaleDateString('en-GB'); // פורמט תאריך קריא
    }

    let teams = [
        {name: 'Tel Aviv Lions', sport: 'Soccer', location: 'Tel Aviv', level: 'Amateur', nextPlay: getRandomDate()},
        {
            name: 'Jerusalem Kings',
            sport: 'Basketball',
            location: 'Jerusalem',
            level: 'Professional',
            nextPlay: getRandomDate()
        },
        {name: 'Haifa Hawks', sport: 'Volleyball', location: 'Haifa', level: 'Amateur', nextPlay: getRandomDate()},
        {name: 'Eilat Eagles', sport: 'Soccer', location: 'Eilat', level: 'Professional', nextPlay: getRandomDate()},
        {name: 'Shoval Group', sport: 'Basketball', location: 'Beersheba', level: 'Amateur', nextPlay: getRandomDate()},
        {
            name: 'BGU Warriors',
            sport: 'Soccer',
            location: 'Beersheba',
            level: 'Professional',
            nextPlay: getRandomDate()
        },
        {
            name: 'Desert Strikers',
            sport: 'Tennis',
            location: 'Mitzpe Ramon',
            level: 'Amateur',
            nextPlay: getRandomDate()
        },
        {
            name: 'Herzliya Dolphins',
            sport: 'Volleyball',
            location: 'Herzliya',
            level: 'Professional',
            nextPlay: getRandomDate()
        },
        {
            name: 'Gal Group',
            sport: 'Basketball',
            location: 'Rishon LeZion',
            level: 'Amateur',
            nextPlay: getRandomDate()
        },
        {name: 'Carmel Storm', sport: 'Soccer', location: 'Haifa', level: 'Professional', nextPlay: getRandomDate()},
    ];

    function renderTeams(filter = {}) {
        teamsContainer.innerHTML = '';
        const filteredTeams = teams.filter(team => {
            if (filter.sport && team.sport !== filter.sport) return false;
            if (filter.location && !team.location.toLowerCase().includes(filter.location.toLowerCase())) return false;
            if (filter.level && team.level !== filter.level) return false;
            return true;
        });

        if (filteredTeams.length === 0) {
            teamsContainer.innerHTML = '<p>No teams match your search criteria.</p>';
            return;
        }

        filteredTeams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.classList.add('team-card');
            teamCard.innerHTML = `
                <h2>${team.name}</h2>
                <p>Sport: ${team.sport}</p>
                <p>Location: ${team.location}</p>
                <p>Level: ${team.level}</p>
                <p><strong>Upcoming Game:</strong> ${team.nextPlay}</p>
                <button class="join-btn">Join</button>
            `;
            teamsContainer.appendChild(teamCard);
        });
    }

    filterBtn.addEventListener('click', () => {
        const sport = sportFilter.value;
        const location = locationFilter.value;
        const level = levelFilter.value;
        renderTeams({sport, location, level});
    });

    renderTeams();

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('join-btn')) {
            event.target.textContent = 'Joined Successfully';
            event.target.style.backgroundColor = 'green';
            event.target.style.cursor = 'default';
            event.target.disabled = true;
        }
    });
});
