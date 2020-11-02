/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, gamePlaying, roundScore, scores;

function hideDice() {
    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;

    // reset scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // reset players
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // reset player classes
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner')

    document.querySelector('.player-0-panel').classList.add('active');

    // hide the dice
    hideDice();
}

// initialize game
init();

// run function when the roll button is clicked
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {

        // make dice equal to a random number between 1 and 6
        var dice = Math.floor(Math.random() * 6) + 1; 
        //console.log(dice);

        // display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        // update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            // add dice roll to the player's round score
            roundScore += dice; // roundScore equals roundScore plus dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // if 1 is rolled, next player's turn
        nextPlayer();
        }
    }
});

// run function when the hold button is clicked
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add current score to player's global score
        scores[activePlayer] += roundScore;

        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if the player won the game
        if (scores[activePlayer] >= 100) {
            // player won
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // hide dice
            hideDice();
            // remove active class, add winner class
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            gamePlaying = false;
        } else {
            // game continues, next player's turn
            nextPlayer();
        }
    }

});

function nextPlayer() {
    // change active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // reset round score
    roundScore = 0; 
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // set current player to active
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // hide the dice
    hideDice();
};

// run init function when the new game button is clicked
document.querySelector('.btn-new').addEventListener('click', init);

 
