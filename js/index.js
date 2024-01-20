document.addEventListener('DOMContentLoaded', function () {
    const monsterContainer = document.getElementById('monster-container');
    const createMonsterForm = document.getElementById('create-monster');
    const backBtn = document.getElementById('back');
    const forwardBtn = document.getElementById('forward');
  
    const API_URL = 'http://localhost:3000/monsters';
    let currentPage = 1;
  
    function fetchMonsters(page) {
      fetch(`${API_URL}?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => displayMonsters(monsters));
    }
  
    function displayMonsters(monsters) {
      monsterContainer.innerHTML = '';
      monsters.forEach(monster => {
        const monsterCard = document.createElement('div');
        monsterCard.innerHTML = `
          <h3>${monster.name}</h3>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterCard);
      });
    }
  
    function createMonster(event) {
      event.preventDefault();
  
      const name = event.target.name.value;
      const age = event.target.age.value;
      const description = event.target.description.value;
  
      if (name && age && description) {
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ name, age, description })
        })
        .then(response => response.json())
        .then(() => fetchMonsters(currentPage));
        
        // Clear the form fields after submitting
        createMonsterForm.reset();
      }
    }
  
    function loadNextPage() {
      currentPage++;
      fetchMonsters(currentPage);
    }
  
    function loadPreviousPage() {
      if (currentPage > 1) {
        currentPage--;
        fetchMonsters(currentPage);
      }
    }
  
    createMonsterForm.addEventListener('submit', createMonster);
    forwardBtn.addEventListener('click', loadNextPage);
    backBtn.addEventListener('click', loadPreviousPage);
  
    // Initial fetch to load the first page of monsters
    fetchMonsters(currentPage);
  });
  