const rows = 3, cols = 3;
const items = document.querySelectorAll('.item');
const playAgain = document.querySelector('#play');
const containerModal = document.querySelector('.container-modal');
const containerGame = document.querySelector('.container-game');
const modalH3 = document.querySelector('.modal h3');
const scoreContent = document.querySelector('#score');



const colors = [ '#ee9b00', '#d90368' , '#e63946', '#4f772d','#78290f','#133c55'];
let score;

primaryGame();
function primaryGame() {
    score = 0;
    scoreContent.innerHTML = 'Score : 0'
    colorItems();
}


function colorItems() {
    let randomColor = Math.floor(Math.random() * colors.length); //find random color
    let colorMain = colors[randomColor];


 // Calculate the amount based on the score
 let amount = 60 + Math.floor(score / 5) * -7; // Increase amount by 10 for every 5 points


    items.forEach(item => {
        item.style.backgroundColor = colorMain;
    })
    let targetItem = Math.floor(Math.random() * (rows * cols - 1)); //find random cell
    items[targetItem].style.backgroundColor = LightenDarkenColor(colorMain, amount);

    items.forEach((item, index) => {
        // console.log(index);
        if (targetItem === index) {
            item.removeEventListener('click', loseGame);
            item.addEventListener('click', nextLevel);
        } else {
            item.addEventListener('click', loseGame);
            item.removeEventListener('click', nextLevel);
        }
    })
}


function LightenDarkenColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function loseGame() {
    containerGame.style.visibility = 'hidden';
    modalH3.innerHTML = `your score : ${score}`;
    containerModal.classList.add('display');

    const audio = new Audio('audio/lose.mp3');
    audio.play();
}

playAgain.addEventListener('click', () => {
    containerModal.classList.remove('display');
    containerGame.style.visibility = 'visible';
    const audio = new Audio('audio/again.mp3');
    audio.play();
    primaryGame();
});

function nextLevel() { 
    score++;
    scoreContent.innerHTML = `Score : ${score}`;
    colorItems();

    const audio = new Audio('audio/press.mp3');
    audio.play();
}


