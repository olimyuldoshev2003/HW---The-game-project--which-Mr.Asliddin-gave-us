const fruits = [
  {
    id: 1,
    name: "Apple",
    image: "../img/Apple.jpg",
  },
  {
    id: 2,
    name: "Apple",
    image: "../img/Apple.jpg",
  },
  {
    id: 3,
    name: "Banana",
    image: "../img/Banana.jpg",
  },
  {
    id: 4,
    name: "Banana",
    image: "../img/Banana.jpg",
  },
  {
    id: 5,
    name: "Grapefruit",
    image: "../img/Grapefruit.jpg",
  },
  {
    id: 6,
    name: "Grapefruit",
    image: "../img/Grapefruit.jpg",
  },
  {
    id: 7,
    name: "Grapes",
    image: "../img/Grapes.png",
  },
  {
    id: 8,
    name: "Grapes",
    image: "../img/Grapes.png",
  },
  {
    id: 9,
    name: "Kiwi",
    image: "../img/Kiwi.jpg",
  },
  {
    id: 10,
    name: "Kiwi",
    image: "../img/Kiwi.jpg",
  },
  {
    id: 11,
    name: "Mango",
    image: "../img/Mango.jpg",
  },
  {
    id: 12,
    name: "Mango",
    image: "../img/Mango.jpg",
  },
  {
    id: 13,
    name: "Orange",
    image: "../img/Orange.jpg",
  },
  {
    id: 14,
    name: "Orange",
    image: "../img/Orange.jpg",
  },
  {
    id: 15,
    name: "Pineapple",
    image: "../img/Pineapple.jpg",
  },
  {
    id: 16,
    name: "Pineapple",
    image: "../img/Pineapple.jpg",
  },
  {
    id: 17,
    name: "Strawberry",
    image: "../img/Strawberry.png",
  },
  {
    id: 18,
    name: "Strawberry",
    image: "../img/Strawberry.png",
  },
  {
    id: 19,
    name: "Watermelon",
    image: "../img/Watermelon.png",
  },
  {
    id: 20,
    name: "Watermelon",
    image: "../img/Watermelon.png",
  },
];

const score = document.querySelector(".score")
const clock = document.querySelector(".clock")
const timer = document.querySelector(".timer")



score.textContent = 0
let cnt = 0




setInterval(() => {
  let newDate = new Date()
  clock.innerHTML =
  newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds(); 
}, 1000);



let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return
  if(this === firstCard) return
  
  this.classList.add("flipped");
  
  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    
    return;
  }
  //second click
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.img === secondCard.dataset.img
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  cnt++;
  score.textContent = cnt
  resetBoard()
}

function unflipCards() {
  lockBoard = true
  setTimeout(() => {
    firstCard.classList.toggle("flipped");
    secondCard.classList.toggle("flipped");
    resetBoard()
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null]
}


let shuffledArr = [...fruits];
let index = fruits.length;
let indexRand;

while (index != 0) {
  indexRand = Math.floor(Math.random() * index);
  index -= 1;
  [shuffledArr[index], shuffledArr[indexRand]] = [
    shuffledArr[indexRand],
    shuffledArr[index],
  ];
}

const root = document.querySelector(".root");


function getData(data) {
  data.forEach((item) => {
    const mainBlockImg = document.createElement("div");
    mainBlockImg.classList.add("img_rotate_block");

    const blockImg = document.createElement("div");
    blockImg.classList.add("img_block");

    blockImg.setAttribute("data-img", item.name);

    const img = document.createElement("img");
    img.src = item.image;

    blockImg.addEventListener("click", flipCard);
    

    blockImg.appendChild(img);
    mainBlockImg.appendChild(blockImg);
    root.appendChild(mainBlockImg);
  });
}

getData(shuffledArr);
