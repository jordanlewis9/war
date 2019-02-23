//Rules

//Traditional war rules. Highest card wins, 2 being the lowest, A the highest. 
//Also ranking cards by suits. Club, Diamond, Heart, Spade (lowest to highest).
//First to the given point total wins, 1 point per round won.
//Whoever wins the prior point gets to draw first.

var score, activePlayer, card, cardImg1, cardImg2, playTo;

//score[0] is a placeholder for more intuitive classes
score = [null, 0, 0]
activePlayer = 1;
playTo = document.querySelector('#play-to').defaultValue = 10;

document.querySelector('.player-1-score').textContent = score[1];
document.querySelector('.player-2-score').textContent = score[2];

//Changing score to 
document.querySelector('.play-to-form').addEventListener('submit', function(event){
    playTo = document.querySelector('#play-to').value;
    event.preventDefault();
    document.querySelector('.form').classList.add('blank');
});

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
}

//Checking to see if the round is over
roundOver = () => {
    if (cardImg1 > cardImg2 && cardImg1 && cardImg2){
        score[1] += 1;
        document.querySelector('.player-1-score').textContent = score[1];
        document.querySelector('.draw').classList.add('blank');
        setTimeout(gameInit, 1000);
        activePlayer = 1;
    } else if (cardImg1 < cardImg2 && cardImg1 && cardImg2){
        score[2] += 1;
        document.querySelector('.player-2-score').textContent = score[2];
        document.querySelector('.draw').classList.add('blank');
        setTimeout(gameInit, 1000);
        activePlayer = 2;
    }
};

//Checking to see if the game is over
gameOver = () => {
    if (score[1] >= playTo){
        gameInit();
        reset();
        document.querySelector('.form').classList.remove('blank');
        playTo = document.querySelector('#play-to').value = 10;
    } else if (score[2] >= playTo){
        gameInit();
        reset();
        document.querySelector('.form').classList.remove('blank');
        playTo = document.querySelector('#play-to').value = 10;
    }
};

//Initializing the game
gameInit = () => {
    cardImg1 = 0;
    cardImg2 = 0;
    document.querySelector('.player-1-card').src = './images/back.png';
    document.querySelector('.player-2-card').src = './images/back.png';
    document.querySelector('.draw').classList.remove('blank');
};

//Reset the game
reset = () => {
    score[1] = 0;
    score[2] = 0;
    document.querySelector('.player-1-score').textContent = score[1];
    document.querySelector('.player-2-score').textContent = score[2];
}

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
        roundOver();
        gameOver();
    } else {
        cardImg2 = cardNum();
        sameCard();
        document.querySelector('.player-2-card').src = `./images/crd-${cardImg2}.png`;
        activePlayer = 1;
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
    document.querySelector('.form').classList.remove('blank');
})

