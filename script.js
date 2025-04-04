document.addEventListener('DOMContentLoaded', () => {
    fetch('jogos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const gameList = document.getElementById('game-list');
            const loadingMessage = document.getElementById('loading-message');

            if (loadingMessage) loadingMessage.remove(); // Remove mensagem de carregamento

            if (data.jogos && data.jogos.length > 0) {
                data.jogos.forEach(jogo => {
                    const listItem = document.createElement('div');
                    listItem.classList.add('game-item');

                    // Imagem do jogo ou imagem padrão
                    const gameImage = document.createElement('img');
                    const imagePath = `images/${jogo.file.replace('.swf', '.jpg')}`;

                    gameImage.src = imagePath;
                    gameImage.alt = jogo.name;
                    gameImage.onerror = () => gameImage.src = 'images/default.jpg';

                    // Título do jogo
                    const gameTitle = document.createElement('h2');
                    gameTitle.textContent = jogo.name;

                    // Descrição do jogo
                    const gameDescription = document.createElement('p');
                    gameDescription.textContent = jogo.description || 'Descrição não disponível';

                    // Link para jogar
                    const gameLink = document.createElement('a');
                    gameLink.href = `jogo.html?file=${encodeURIComponent(jogo.file)}`;
                    gameLink.textContent = 'Jogar agora';
                    gameLink.classList.add('game-link');

                    // Adiciona elementos ao container
                    listItem.appendChild(gameImage);
                    listItem.appendChild(gameTitle);
                    listItem.appendChild(gameDescription);
                    listItem.appendChild(gameLink);
                    gameList.appendChild(listItem);
                });
            } else {
                gameList.innerHTML = '<p class="no-games-message">Nenhum jogo disponível no momento.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os jogos:', error);
            document.getElementById('game-list').innerHTML =
                '<p class="error-message">Erro ao carregar os jogos. Verifique sua conexão e tente novamente.</p>';
        });
});
