let currentDate = new Date();
let currentView = 'mens';
let currentSection = 'scores';

// Format date for API calls
function formatDateForAPI(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
}

// Common helpers
function hideAllSections() {
    const scoresContainer = document.getElementById('scores-container');
    const newsContainer = document.getElementById('news-container');
    const rankingsContainer = document.getElementById('rankings-container');
    const statsContainer = document.getElementById('stats-container');
    
    if (scoresContainer) scoresContainer.style.display = 'none';
    if (newsContainer) newsContainer.style.display = 'none';
    if (rankingsContainer) rankingsContainer.style.display = 'none';
    if (statsContainer) statsContainer.style.display = 'none';
    
    // Hide common elements
    if (document.querySelector('.filters-container')) 
        document.querySelector('.filters-container').style.display = 'none';
    if (document.querySelector('.view-toggle'))
        document.querySelector('.view-toggle').style.display = 'none';
    if (document.querySelector('.pagination'))
        document.querySelector('.pagination').style.display = 'none';
}

// Reset active
function resetNavigation() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
}

// Set active
function updateToggleButtons() {
    const mensBtn = document.getElementById('mens-btn');
    const womensBtn = document.getElementById('womens-btn');
    
    if (currentView === 'mens') {
        mensBtn.classList.add('active');
        womensBtn.classList.remove('active');
    } else {
        womensBtn.classList.add('active');
        mensBtn.classList.remove('active');
    }
}