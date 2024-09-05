'use strict';
// selecting elements 
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer = 0, playing;

//starting coditions
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  scores = [0, 0];

  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;

  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  activePlayer = 0;
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

  playing = true;

}

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//rolling dice functionality
btnRoll.addEventListener('click', function () {

  if (playing) {
    // 1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;//tu 1 => 6

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
      // Swith to next player
      switchPlayer();
    }
  }

})


btnHold.addEventListener('click', function () {

  if (playing) {
    //1.Add current score to active player's score
    scores[activePlayer] += currentScore;
    // score0El.textContent = scores[0];
    // score1El.textContent = scores[1];

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

    //2. Check iplayer's socre is >= 100

    if (scores[activePlayer] >= 20) {

      // Finish the game
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Swith to next player
      switchPlayer();
    }
  }

})

btnNew.addEventListener('click', init)