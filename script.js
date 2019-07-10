let board = []; // główny kontener
let tileArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
let tileFlippedOver = [];
let cardFlipped = -1;
let timer = '';
let playLockout = false;
let gamePlay = false; // kontroluje czy jest odnawiany restart tablicy

const startButton = document.querySelector('button.easy');
const advancedButton = document.querySelector('button.advanced');
const gameBoard = document.getElementById('board');

startButton.onclick = function () {
    startGame('basic')
};

advancedButton.onclick = function () {
    startGame('advanced')
};


function startGame(levelType) {

    cardFlipped = -1;
    playLockout = false;
    startButton.style.display = 'none';
    advancedButton.style.display = 'none';
    if (!gamePlay) {
        gamePlay = true;
        if (levelType == 'basic') {
            buildArray(9);
        } else {
            buildArray(18);
        };
        tileArray = board.concat(board);
        shuffleArray(tileArray);
        buildBoard();
    }
}

function buildArray(amount) {
    for (var x = 1; x <= amount; x++) {
        board.push(x + '.jpg');
    }
}

function buildBoard() {
    var html = "";
    for (var x = 0; x <= (tileArray.length - 1); x++) {
        html += '<div class="gameTile"><div class="gameTile">';
        html += '<img id="cardz' + x + '" src="images/back.jpg" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';
    }
    gameBoard.innerHTML = html;
}


function pickCard(tileIndex, t) {
    if (!isinArray(t.id, tileFlippedOver) && !playLockout) {
        if (cardFlipped >= 0) {
            cardFlip(t, tileIndex);
            playLockout = true;
            if (checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) == checkSrc(tileFlippedOver[tileFlippedOver.length - 2])) {
                playLockout = false;
                cardFlipped = -1;

                if (tileFlippedOver.length == tileArray.length) {
                    gameover();
                    location.reload(board);
                }
            } else {
                timer = setInterval(hideCard, 1000);
            }
        } else {
            cardFlipped = tileIndex;
            cardFlip(t, tileIndex);
        }
    }
}

function hideCard() {
    for (var x = 0; x < 2; x++) {
        var vid = tileFlippedOver.pop();
        document.getElementById(vid).src = "images/back.jpg";
    }
    clearInterval(timer);
    playLockout = false;
    cardFlipped = -1;
}

function gameover() {
    startButton.style.display = 'block';
    advancedButton.style.display = 'block';
    gamePlay = false;
    board = [];
    tileFlippedOver = [];
}

function isinArray(v, array) {
    return array.indexOf(v) > -1;
}

function cardFlip(t, ti) {
    t.src = "images/" + tileArray[ti];
    tileFlippedOver.push(t.id);
}

function checkSrc(v) {
    var v = document.getElementById(v).src;
    return v;
}

function shuffleArray(array) {
    for (var x = array.length - 1; x > 0; x--) {
        var holder = Math.floor(Math.random() * (x + 1));
        var itemValue = array[x];
        array[x] = array[holder];
        array[holder] = itemValue;
    }
    return array;
}

document.addEventListener('DOMContentLoaded', function () {
    //startButton.addEventListener('click', startGame());
    //advancedButton.addEventListener('click', startGame);
});
