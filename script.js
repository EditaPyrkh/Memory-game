const card = document.querySelectorAll('.card');
const field = document.querySelector('.field');
var opened = []
var moves = 0;
/* the number of steps taken */
var matched = 0;
/* the number of cards that matched */
var arr = [];
var shuffled = [];


function shuffle(array) {
  let arr1 = [...array];
  arr1.sort(() => Math.random() - 0.5);
  return arr1;
}
/* mixes cards */

function init() {
  moves = 0;
  matched = 0;

  let arr = [...card];
  let shuffled = shuffle(arr);
  for (let i = 0; i < card.length; i++) {
      card[i].classList.remove('match');
      console.log(i)
  }
  for (let j = 0; j < shuffled.length; j++) {
      field.append(shuffled[j]);
  }
  document.querySelector('.modal').style.display = 'none'
}
for (let i = 0; i < card.length; i++) {
      card[i].addEventListener('click', () => {
          if(opened.length !== 2 ) {
              card[i].classList.add('opened');
              opened.push(card[i]);
              addMove();
              gameEngine(card,i);
          }
      })
}
function addMove() {
  moves++;
  document.querySelector('.moves-counter span').innerHTML = moves;
}
function showModal() {
  document.querySelector('.congratulation-message span').innerHTML = moves;
  document.querySelector('.modal').style.display = 'block';
}
function gameEngine() {
  if (opened.length === 2) {
      if (opened[0].getAttribute('type') !== opened[1].getAttribute('type')) {
          const newGame = setTimeout(() => {
              opened[0].classList.remove('opened');
              opened[1].classList.remove('opened');
              opened = [];
              clearTimeout(newGame);
          }, 1000);
      } else {
          opened[0].classList.add('match');
          opened[1].classList.add('match');
          matched +=2;
          opened[0].classList.remove('opened');
          opened[1].classList.remove('opened');
          opened = [];
          if(matched === 16) {
              showModal()
          }
      }
  }
}
init();
document.querySelector('#try-again').addEventListener('click', () => {
  init();
})