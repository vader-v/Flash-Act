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
  {title: "Snow", audio: snow},
  {title: "Warfield", audio: warField},
  {title: "Honey and Bleach", audio: hAndB},
  {title: "Stress Filled", audio: stressFilled}
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

function playSong(){
  songs[songsIndex].audio.play()
}

function stopSong() {
  songs[songsIndex].audio.pause()
}

function startRound() {
  playSong()
  playRandom()
  startRoundTimerEl.textContent = `Round ${round}`
  startTimer()
  setTimeout(()=> {
    allowInput()
    makeAnimationGo()
  }, 5000)
}

function startTimer() {
  const endTime = Date.now() + 5000
  const timerIntervalId = setInterval(() => {
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
      inputAllowed = true
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

function endRound() {
  // stop song disable player input
  stopSong()
  allowInput = false
  clearTimeout(timerIntervalId)
  renderMessage("Round end")
  //enable next round
  roundStartButton.disabled = false
}

function endGame(){
  let winner = ""
  if (player1Score === winningScore) { 
    winner = "Player 1 has won!"
  } else if (player2Score === winningScore) {
    winner = "Player 2 has won!" 
  } else {
    nextRound()
    return
  }
  // update div with win message
  const winnerElem = document.querySelector("#win-message")
  winnerElem.textContent = winner
  // hide game board show start screen
  gameBoard.style.display = "none"
  startScreen.style.display = "flex"
}
let audio

function changeSong() {
  if (audio) {
    audio.pause();
  }
  audio = new Audio(`audio/${songsIndex}.mp3`);
  audio.play();
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
    const randomNumber = Math.floor(Math.random() * 1000) + 5000
    // play song based on what round it is
    let songEndTime, songStartTime
    songs[round -1].audio.play()
    // record start time of song playing
    songStartTime = Date.now()
    // set the timeout function to pause based on random delay
    let difference
    setTimeout(() => {
      stopSong()
      songEndTime = Date.now()
      const attackButton1 = document.getElementById('attack1')
      const attackButton2 = document.getElementById('attack2')
      attackButton1.disabled = false
      attackButton2.disabled = false
      attackButton1.addEventListener('click', () => {
        const user1Time = Date.now()
        const difference = Math.abs(songEndTime - user1Time)
        //this will print a longer number remember to cut off when displaying
        console.log(`Player 1 input time: ${user1Time}`)
        console.log(`Song end time: ${songEndTime}`)
        console.log(`Difference: ${difference}`)
        attackButton1.disabled = true
        attackButton2.disabled = false
        player1Score
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
  round++
  if (round <= numRounds){
  endRound()
  } else {
    endRound()
    endGame()
  }
}

  
  //pause song
  //record end time
  //get the button and enable click event
  //record user input time
  // calculate difference btw end time and user input time for both players seperately
  // turn off user inputs after first input per player

