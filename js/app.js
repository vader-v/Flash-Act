/*------ western/ swordsman game musical chairs ------*/

/*-------------------------------- Constants --------------------------------*/
import {
  snow,
  warField,
  hAndB,
  stressFilled
} from "./audio.js"
const numRounds = 4
const winningScore = 3
/*---------------------------- Variables (state) ----------------------------*/
// use of file 
const songs = [
  {title: "Snow", file: snow},
  {title: "Warfield", file: warField},
  {title: "Honey and Bleach", file: hAndB},
  {title: "Stress Filled", file: stressFilled}
]
let round = 1

let player1Score = 0
let player2Score = 0

let timerIntervalId
/*------------------------ Cached Element References ------------------------*/

const startRoundTimerEl = document.getElementById('timer')
let header = document.querySelector('h1')
let button = document.querySelector('button')
const startScreen = document.getElementById("start-screen")
const startButton = document.getElementById("startButton")
const roundStartButton = document.getElementById("roundStartButton")
const gameBoard = document.getElementById("gameboard")
/*----------------------------- Event Listeners -----------------------------*/

startButton.addEventListener("click", function(){
  startGame()
})
roundStartButton.addEventListener("click", function(){
  startRound()
})
resetButton.addEventListener("click", function(){
  resetGame()
})

/*-------------------------------- Functions --------------------------------*/
function startGame () {
  startScreen.style.display = "none"
  playRandom()
  startRound()
}

function startRound() {
  changeSong()
  playRandom()
  endGame()
}

function startTimer() {
  // check for active timer intv
  if (timerIntervalId) {
    seconds = 0
    // if interval is active
    clearInterval(timerIntervalId)
    renderMessage()
  }
}

function renderMessage(){
  
}

function makeAnimationGo() {
  // header.classList.remove('animate__animated ', "animate__bounce")
  header.offsetHeight
  header.classList.add('animate__animated', "animate__bounce")
}
function makeRandomNum(min, max) {
  min = Math.ceil(3000)
  max = Math.floor(1)
  return parseInt(Math.random() * (max - min) + min);
}
function endGame(){

  if (player1Score || player2Score === winningScore) { gameOver()
  } else {
    nextRound()
  }
}

console.log(makeRandomNum(0, 100))
function playRandom() {
  //declare if a round is started, if not ignore the timer
  changeSong()
  if (round < 1){
      // declare random num 
      let randomNumber = Math.floor(Math.random() * 1000) + 5000
      //import sound from seperate js file
      // play song based on what round it is
      round.song.play()
      // record start time of song playing
      // let songStartTime = Date.now()
      // declare end time 
      let endTime
      console.time('startRoundTimer')
      // set the timeout function to pause based on random delay
      setTimeout(function() {
      round.song.pause()
      endTime = Date.now()
      let attackButton = document.getElementById('attack')
      attackButton.disabled = false
      attackButton.addEventListener('click', function() {
      let userTime = Date.now()
      let difference = Math.abs(endTime - userTime)
      //this will print a longer number remember to cut off when displaying
      console.log(`Player input time: ${userTime}`)
      console.log(`Song end time: ${endTime}`)
      console.log(`Difference: ${difference}`)
      button.disabled = true
    })
    // visual effect i want to implement very unsure of how this will work 
    // document.body.style.backgroundColor = "black"
    //add the randomNumber delay function at end
    }, randomNumber) //generate rand time btw 5-15 secs
    // document.body.style.backgroundColor = "white"
    console.log(randomNumber)
    console.log(difference)
  } else {
    nextRound()
  }
}
function nextRound(){
  if (round == 0){
    round++
    console.log(round)
  } if (round == 1){
    round++
  } if (round == 2){
    round++
  } if (round == 3){
    round++
  } else {
    endGame()
  }
}

  
  //pause song
  //record end time
  //get the button and enable click event
  //record user input time
  // calculate difference btw end time and user input time for both players seperately
  // turn off user inputs after first input per player

