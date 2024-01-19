document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startbtn');

    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF5733', '#33FF57', '#5733FF', '#FFD700', '#FFD700'];

    let cards = [];
    let flippedCards = [];
    let score = 0;

    // Shuffle function to randomize card order
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Generate and shuffle cards
    function generateCards() {
        cards = shuffle(colors.concat(colors));

        gameContainer.innerHTML = '';

        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.color = cards[i];
            card.addEventListener('click', flipCard);
            gameContainer.appendChild(card);
        }
    }

    // Flip a card
    function flipCard() {
        if (flippedCards.length < 2) {
            const card = this;
            card.style.backgroundColor = card.dataset.color;
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    // Check if the flipped cards match
    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.color === card2.dataset.color) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);

            if (score === colors.length) {
                alert('Congratulations! You matched all pairs!');
                resetGame();
            }
        } else {
            card1.style.backgroundColor = '';
            card2.style.backgroundColor = '';
        }

        flippedCards = [];
    }

    // Reset the game
    function resetGame() {
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
        flippedCards = [];
        generateCards();
    }

    // Event listener for the Start/Restart button
    startButton.addEventListener('click', resetGame);

    // Initial card generation
    generateCards();
});
