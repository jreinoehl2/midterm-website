// DOM Elements
const mensBtn = document.getElementById('mens-btn');
const womensBtn = document.getElementById('womens-btn');
const prevDayBtn = document.getElementById('prev-day');
const nextDayBtn = document.getElementById('next-day');
const mensNewsLink = document.getElementById('mens-news');
const womensNewsLink = document.getElementById('womens-news');
const rankingsLink = document.getElementById('rankings-link');
const backToScoresBtn = document.getElementById('back-to-scores');
const backFromRankingsBtn = document.getElementById('back-from-rankings');

// Stats elements
const statsContainer = document.getElementById('stats-container');
const statsLinks = document.querySelectorAll('.dropdown:last-child .dropdown-menu a');
const backFromStatsBtn = document.getElementById('back-from-stats');

// Event Listeners for scores view
mensBtn.addEventListener('click', () => {
    setActiveView('mens');
});
womensBtn.addEventListener('click', () => {
    setActiveView('womens');
});
prevDayBtn.addEventListener('click', () => {
    changeDate(-1);
});
nextDayBtn.addEventListener('click', () => {
    changeDate(1);
});

// Event Listeners for news
if (mensNewsLink) {
    mensNewsLink.addEventListener('click', function(e) {
        e.preventDefault();
        currentView = 'mens';
        showNewsSection('Men\'s Basketball News');
        fetchMensNews();
    });
}
if (womensNewsLink) {
    womensNewsLink.addEventListener('click', function(e) {
        e.preventDefault();
        currentView = 'womens';
        showNewsSection('Women\'s Basketball News');
        fetchWomensNews();
    });
}

// Event Listeners for rankings
if (rankingsLink) {
    rankingsLink.addEventListener('click', function(e) {
        e.preventDefault();
        showRankingsSection();
        fetchMensRankings();
    });
}

// Back from rankings
if (backFromRankingsBtn) {
    backFromRankingsBtn.addEventListener('click', function() {
        hideRankingsSection();
    });
}

// Event Listeners for stats
statsLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showStatsSection();
    });
});

// Back from stats
if (backFromStatsBtn) {
    backFromStatsBtn.addEventListener('click', function() {
        hideStatsSection();
    });
}

// Back to scores
if (backToScoresBtn) {
    backToScoresBtn.addEventListener('click', function() {
        hideNewsSection();
    });
}

// Set active view
function setActiveView(view) {
    currentView = view;
    updateToggleButtons();
    if (currentSection === 'scores') {
        loadScores();
    } else if (currentSection === 'news') {
        loadNews();
    }
}

// Show stats section with "not available" message
function showStatsSection() {
    hideAllSections();
    statsContainer.style.display = 'block';
    resetNavigation();
    document.querySelector('.nav-links .dropdown:last-child > a').classList.add('active');
}

// Hide stats section
function hideStatsSection() {
    statsContainer.style.display = 'none';
    showScoresSection();
}

function init() {
    updateDateDisplay();
    loadScores();
}

document.addEventListener('DOMContentLoaded', init);