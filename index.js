//Rules

//Traditional war rules. Highest card wins, 2 being the lowest, A the highest. 
//Also ranking cards by suits. Club, Diamond, Heart, Spade (lowest to highest).
//First to the given point total wins, 1 point per round won.
//Whoever wins the prior point gets to draw first.

/************************************
 * HELPER FUNCTIONS/VARIABLE SET-UP
 ************************************/

var score, activePlayer, cardImg1, cardImg2, playTo;

//score[0] is a placeholder for more intuitive classes
score = [null, 0, 0];
activePlayer = 1;
playTo = document.querySelector('#play-to').defaultValue = 10;

//function to display the current score
displayScore = () => {
    document.querySelector('.player-1-score').textContent = score[1];
    document.querySelector('.player-2-score').textContent = score[2];
};

//Changing winning score
document.querySelector('.play-to-form').addEventListener('submit', function(event){
    playTo = document.querySelector('#play-to').value;
    event.preventDefault();
    document.querySelector('.form').classList.add('blank');
    document.querySelector('.score-to').textContent = playTo;
});

//Player active class
playerActive = () => {
    if (activePlayer === 1){
        document.querySelector('.playarea1').classList.add('active');
        document.querySelector('.playarea2').classList.remove('active');
    } else if (activePlayer === 2) {
        document.querySelector('.playarea2').classList.add('active');
        document.querySelector('.playarea1').classList.remove('active');
    }
};

//Random number, 1-52
cardNum = () => {
    return Math.ceil(Math.random() * 52);
};

//If the random numbers are the same, run the number again and run the function again
sameCard = () => {
    if (cardImg1 === cardImg2){
        cardImg1 = cardNum();
        sameCard();
    } else if (cardImg2 === cardImg1){
        cardImg2 = cardNum();
        sameCard();
    }
};

//Checking to see if the round is over
roundOver = () => {
    if (cardImg1 > cardImg2 && cardImg1 && cardImg2){
        score[1] += 1;
        activePlayer = 1;
        document.querySelector('.player-1-score').textContent = score[1];
        document.querySelector('.draw').classList.add('blank');
        setTimeout(gameInit, 1000);
        setTimeout(playerActive, 1000);
    } else if (cardImg1 < cardImg2 && cardImg1 && cardImg2){
        score[2] += 1;
        activePlayer = 2;
        document.querySelector('.player-2-score').textContent = score[2];
        document.querySelector('.draw').classList.add('blank');
        setTimeout(gameInit, 1000);
        setTimeout(playerActive, 1000);
    }
};

//Checking to see if the game is over
gameOver = () => {
    if (score[1] >= playTo){
        setTimeout(function(){
            document.querySelector('.container').classList.add('blank');
            document.querySelector('.body').classList.add('winner');
            document.querySelector('.congrats').classList.remove('blank');
            document.querySelector('.player-num').textContent = "1";
        }, 350);
        setTimeout(function(){
            document.querySelector('.form').classList.remove('blank');
            playTo = document.querySelector('#play-to').value = 10;
            document.querySelector('.score-to').textContent = playTo;
            document.querySelector('.container').classList.remove('blank');
            document.querySelector('.body').classList.remove('winner');
            document.querySelector('.congrats').classList.add('blank');
            gameInit();
            reset();
        }, 3500);
    } else if (score[2] >= playTo){
        setTimeout(function(){
            document.querySelector('.container').classList.add('blank');
            document.querySelector('.body').classList.add('winner');
            document.querySelector('.congrats').classList.remove('blank');
            document.querySelector('.player-num').textContent = "2";
        }, 350);
        setTimeout(function(){
            document.querySelector('.form').classList.remove('blank');
            playTo = document.querySelector('#play-to').value = 10;
            document.querySelector('.score-to').textContent = playTo;
            document.querySelector('.container').classList.remove('blank');
            document.querySelector('.body').classList.remove('winner');
            document.querySelector('.congrats').classList.add('blank');
            gameInit();
            reset();
        }, 3500);
    }
};

//Initializing the game
gameInit = () => {
    cardImg1 = 0;
    cardImg2 = 0;
    document.querySelector('.player-1-card').src = './images/back.png';
    document.querySelector('.player-2-card').src = './images/back.png';
    document.querySelector('.draw').classList.remove('blank');
    displayScore();
};

//Reset the game
reset = () => {
    score[1] = 0;
    score[2] = 0;
    activePlayer = 1;
    displayScore();
    playerActive();
};

/******************************************
 * GAMEPLAY
 ******************************************/

gameInit();

//Click listener on the "deck" of cards
//Main function of game
document.querySelector('.draw').addEventListener('click', function(){
    if (activePlayer === 1){
        //In the event that the default score is chosen but not submitted
        document.querySelector('.form').classList.add('blank');
        cardImg1 = cardNum();
        sameCard();
        document.querySelector('.player-1-card').src = `./images/crd-${cardImg1}.png`;
        activePlayer = 2;
        if (!cardImg2){
            playerActive();
        };
        roundOver();
        gameOver();
    } else {
        cardImg2 = cardNum();
        sameCard();
        document.querySelector('.player-2-card').src = `./images/crd-${cardImg2}.png`;
        activePlayer = 1;
        if (!cardImg1){
            playerActive();
        };
        roundOver();
        gameOver();
    };
});

//New game
document.querySelector('.button').addEventListener('click', function(){
    gameInit();
    activePlayer = 1;
    reset();
    playTo = document.querySelector('#play-to').value = 10;
    document.querySelector('.score-to').textContent = playTo;
    document.querySelector('.form').classList.remove('blank');
});

