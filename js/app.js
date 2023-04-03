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
  playSong(round)
  startRoundTimer.textContent = `Round ${round}`
  setTimeout(()=> {
    allowInput()
    makeAnimationGo()
    startTimer()
  }, 5000)
}

function endRound() {
  // stop song disable player input
  stopSong()
  inputAllowed = false
  clearTimeout(timerIntervalId)
  //enable next round
  roundStartButton.disabled = false
}

// function startTimer() {
//   // check for active timer intv
//   if (timerIntervalId) {
//     seconds = 0
//     // if interval is active
//     clearInterval(timerIntervalId)
//     renderMessage()
//   }
// }

function allowInput() {
  inputAllowed = true
  button.disabled = false
}

function renderMessage(){
  
}

function changeSong() {
  songs.file.pause()
  playSong(round)
}

function makeAnimationGo() {
  header.classList.add('animate__animated', "animate__bounce")
}

function makeRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function endGame(){

  if (player1Score || player2Score === winningScore) { gameOver()
  } else {
    nextRound()
  }
}

console.log(makeRandomNum(0, 100))

function playRandom() {
  // change song for the start of the round
  changeSong()
  if (round < 1){
    const attackButton = document.getElementById('attack')
    // declare random num 
      const randomNumber = Math.floor(Math.random() * 1000) + 5000
      //import sound from seperate js file
      // play song based on what round it is
      let songStartTime, songEndTime
      round.song.play()
      // record start time of song playing
      songStartTime = Date.now()
      // set the timeout function to pause based on random delay
      setTimeout(() => {
        round.song.pause()
        songEndTime = Date.now()
        attackButton.disabled = false
        attackButton.addEventListener('click', () => {
          const userTime = Date.now()
          const difference = Math.abs(songEndTime - userTime)
      //this will print a longer number remember to cut off when displaying
      console.log(`Player input time: ${userTime}`)
      console.log(`Song end time: ${songEndTime}`)
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

