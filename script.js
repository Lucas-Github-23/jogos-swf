// script.js
fetch('jogos.json')
   .then(response => {
       if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
       }
       return response.json();
   })
   .then(data => {
       const gameList = document.getElementById('game-list');
       const loadingMessage = document.getElementById('loading-message');

       if (loadingMessage) loadingMessage.remove(); // Remove loading message

       if (data.jogos && data.jogos.length > 0) {
           data.jogos.forEach(jogo => {
               const listItem = document.createElement('div');
               listItem.classList.add('game-item');

               // Game image (you can add images to jogos.json)
               const gameImage = document.createElement('img');
               gameImage.src = `images/${jogo.file.replace('.swf', '.jpg')}`; // Assuming images are stored with the same name as the game file
               gameImage.alt = jogo.name;

               // Game title
               const gameTitle = document.createElement('h2');
               gameTitle.textContent = jogo.name;

               // Game description (add descriptions to jogos.json if needed)
               const gameDescription = document.createElement('p');
               gameDescription.textContent = jogo.description || 'Descrição não disponível';

               // Game link
               const gameLink = document.createElement('a');
               gameLink.href = `jogo.html?file=${encodeURIComponent(jogo.file)}`;
               gameLink.textContent = 'Jogar agora';
               gameLink.classList.add('game-link');

               listItem.appendChild(gameImage);
               listItem.appendChild(gameTitle);
               listItem.appendChild(gameDescription);
               listItem.appendChild(gameLink);
               gameList.appendChild(listItem);
           });
       } else {
           const noGamesMessage = document.createElement('p');
           noGamesMessage.textContent = 'Nenhum jogo disponível no momento.';
           noGamesMessage.classList.add('no-games-message');
           gameList.appendChild(noGamesMessage);
       }
   })
   .catch(error => {
       console.error('Erro ao carregar os jogos:', error);
       const gameList = document.getElementById('game-list');
       gameList.innerHTML = '<p class="error-message">Erro ao carregar os jogos. Tente novamente mais tarde.</p>';
   });
