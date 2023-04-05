/*------ western/ swordsman game musical chairs ------*/

/*-------------------------------- Constants --------------------------------*/
import {
  snow,
  warField,
  hAndB,
  stressFilled
} from "./audio.js"
const numRounds = 5
const winningScore = 3
/*---------------------------- Variables (state) ----------------------------*/
// use of file 
const songs = [
  {title: "Snow", audio: snow, round: 0},
  {title: "Warfield", audio: warField, round: 1},
  {title: "Honey and Bleach", audio: hAndB, round: 2},
  {title: "Stress Filled", audio: stressFilled, round: 3}
]
let round = 1
let songsIndex = 0
let player1Score = 0
let player2Score = 0
let timerIntervalId
/*------------------------ Cached Element References ------------------------*/

const startRoundTimerEl = document.getElementById('timer')
let header = document.querySelector('h1')
let button = document.querySelector('button')
const startScreen = document.getElementById("start-screen")
const startButton = document.getElementById("start-button")
const roundStartButton = document.getElementById("round-start-button")
const nextRoundbtn = document.getElementById("next-round-button")
const attackButton1 = document.getElementById('attack1')
const attackButton2 = document.getElementById('attack2')
const resetButton = document.getElementById("reset-button")
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
// nextRoundbtn.addEventListener("click", function(){
//   nextRound()
// })

/*-------------------------------- Functions --------------------------------*/
function startGame () {
  startRound()
}

function playSong(){
  songs[songsIndex].audio.play()
}

function stopSong() {
  songs[songsIndex].audio.pause()
}

function startRound() {
  playRandom()
  startRoundTimerEl.textContent = `Round ${round}`
  startTimer()
}

function startTimer() {
  const endTime = Date.now() + 4000
  timerIntervalId = setInterval(() => {
    const remainingTime = Math.round((endTime - Date.now()) / 1000) 
    startRoundTimerEl.textContent = `Starting round in ${remainingTime} seconds`
    if (remainingTime <= 0) {
      clearInterval(timerIntervalId)
      startRoundTimerEl.textContent = ''
      allowInput(true)
      playRandom()
    }
  }, 1000)
}

function allowInput() {
  button.disabled = false
}

function renderMessage(message){
  const messageElem = document.getElementById("win-message")
  messageElem.textContent = message
  messageElem.classList.remove("hidden")
  setTimeout(() => {
    messageElem.classList.add("hidden")
  }, 5000)
}
function nextRound(){
  round++
  if (round <= numRounds){
  endRound()
  } else {
    endRound()
    endGame()
  }
}

function endRound() {
  // stop song disable player input
  stopSong()
  allowInput(false)
  clearTimeout(timerIntervalId)
  renderMessage("Round end")
  //enable next round
  roundStartButton.disabled = false
}

function endGame(){
  let winner = ""
  if (player1Score === winningScore) { 
    winner = "Player 1 has won!"
    loser = "Player 2 has lost"
  } else if (player2Score === winningScore) {
    winner = "Player 2 has won!"
    loser = "Player 1 has lost" 
  } else {
    nextRound()
    return
  }
  // update div with win message
  const winnerElem = document.querySelector("#win-message")
  winnerElem.textContent = winner
  const loserElem = document.querySelector("#loss-message")
  loserElem.textContent = loser
  // hide game board show start screen
  gameBoard.style.display = "none"
  startScreen.style.display = "flex"
}
// let audio

function changeSong() {
  if (songs.audio) {
  songs.audio.pause();
  }
  songs.audio = new Audio(`audio/${songsIndex}.mp3`);
  songs.audio.play();
  // songs.file.pause()
  // playSong(round)
}

function makeAnimationGo() {
  header.classList.add('animate__animated', "animate__bounce")
}

function playRandom() {
  // change song for the start of the round
  changeSong(songs[songsIndex].title)
  if (round <= 1){
    // declare random num 
    const randomNumber = Math.floor(Math.random() * 3000) + 5000
    // play song based on what round it is
    let songEndTime, songStartTime
    playSong()
    // record start time of song playing
    songStartTime = Date.now()
    // set the timeout function to pause based on random delay
    let difference1, difference2
    setTimeout(() => {
      stopSong()
      songEndTime = Date.now()
      attackButton1.disabled = false
      attackButton2.disabled = false
      attackButton1.addEventListener('click', () => {
        const user1Time = Date.now()
        difference1 = Math.abs(songEndTime - user1Time)
        //this will print a longer number remember to cut off when displaying
        console.log(`Player 1 input time: ${user1Time}`)
        console.log(`Song end time: ${songEndTime}`)
        console.log(`Difference: ${difference1}`)
        attackButton1.disabled = true
        attackButton2.disabled = false
        player1Score
      })
      attackButton2.addEventListener('click', () => {
        const user2Time = Date.now()
        difference2 = Math.abs(songEndTime - user2Time)
        //this will print a longer number remember to cut off when displaying
        console.log(`Player 2 input time: ${user2Time}`)
        console.log(`Song end time: ${songEndTime}`)
        console.log(`Difference: ${difference2}`)
        attackButton2.disabled = true
        attackButton1.disabled = true
        player2Score
      })
      songsIndex++
    // visual effect i want to implement very unsure of how this will work 
    // document.body.style.backgroundColor = "black"
    //add the randomNumber delay function at end
    }, randomNumber) //generate rand time btw 5-15 secs
    // document.body.style.backgroundColor = "white"
  }
}

  
  //pause song
  //record end time
  //get the button and enable click event
  //record user input time
  // calculate difference btw end time and user input time for both players seperately
  // turn off user inputs after first input per player

