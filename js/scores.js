// DOM Elements for scores
const scoresContainer = document.getElementById('scores-container');
const currentDateElement = document.getElementById('current-date');

// Update date display
function updateDateDisplay() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = currentDate.toLocaleDateString('en-US', options);
}

// Change date
function changeDate(days) {
    currentDate.setDate(currentDate.getDate() + days);
    updateDateDisplay();
    loadScores();
}

// Load scores
function loadScores() {
    scoresContainer.innerHTML = '<div class="loading">Loading scores...</div>';
    if (currentView === 'mens') {
        fetchMensScores();
    } else {
        fetchWomensScores();
    }
}

// Show scores section
function showScoresSection() {
    currentSection = 'scores';
    hideAllSections();
    scoresContainer.style.display = 'grid';
    if (document.querySelector('.filters-container')) 
        document.querySelector('.filters-container').style.display = 'block';
    if (document.querySelector('.pagination'))
        document.querySelector('.pagination').style.display = 'flex';
    resetNavigation();
    document.querySelector('.nav-links a[href="#"]').classList.add('active');
    
    updateToggleButtons();
    loadScores();
}

// Men's scores
async function fetchMensScores() {
    try {
        const dateStr = formatDateForAPI(currentDate);
        const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=${dateStr}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        displayScores(data.events);
    } catch (error) {
        console.error('Error fetching men\'s scores:', error);
        scoresContainer.innerHTML = '<div class="loading">Error loading scores. Please try again later.</div>';
    }
}

// Women's scores
async function fetchWomensScores() {
    try {
        const dateStr = formatDateForAPI(currentDate);
        const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/womens-college-basketball/scoreboard?dates=${dateStr}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        displayScores(data.events);
    } catch (error) {
        console.error('Error fetching women\'s scores:', error);
        scoresContainer.innerHTML = '<div class="loading">Error loading scores. Please try again later.</div>';
    }
}

// Display scores
function displayScores(events) {
    scoresContainer.innerHTML = '';
    
    if (!events || events.length === 0) {
        scoresContainer.innerHTML = '<div class="loading">No games scheduled for this date.</div>';
        return;
    }
    
    // Game card for each event
    events.forEach(event => {
        const homeTeam = event.competitions[0].competitors.find(team => team.homeAway === 'home');
        const awayTeam = event.competitions[0].competitors.find(team => team.homeAway === 'away');
        
        // Game status
        let statusClass = 'scheduled';
        let statusText = event.status.type.shortDetail;
        
        if (event.status.type.completed) {
            statusClass = 'final';
            statusText = 'Final';
        } else if (event.status.type.state === 'in') {
            statusClass = 'live';
        }
        
        // Winner?
        const homeWinner = homeTeam.winner;
        const awayWinner = awayTeam.winner;
        
        // Game card HTML with team logos from ESPN API
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-status ${statusClass}">${statusText}</div>
            
            <div class="team">
                <div class="team-info ${awayWinner ? 'winner' : ''}">
                    <img class="team-logo" src="${awayTeam.team.logo || 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/default-team-logo-500.png'}" alt="${awayTeam.team.displayName} logo">
                    <span>${awayTeam.team.displayName}</span>
                </div>
                <div class="score">${awayTeam.score || '-'}</div>
            </div>
            
            <div class="team">
                <div class="team-info ${homeWinner ? 'winner' : ''}">
                    <img class="team-logo" src="${homeTeam.team.logo || 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/default-team-logo-500.png'}" alt="${homeTeam.team.displayName} logo">
                    <span>${homeTeam.team.displayName}</span>
                </div>
                <div class="score">${homeTeam.score || '-'}</div>
            </div>
        `;
        scoresContainer.appendChild(gameCard);
    });
}