/*------ western/ swordsman game musical chairs ------*/

/*-------------------------------- Constants --------------------------------*/
import {
  snow,
  warField,
  hAndB,
  stressFilled
} from "./audio.js"
document.addEventListener("DOMContentLoaded", function(){
  
  const songs = [
    {title: "Snow", audio: snow, round: 0, volume: 0.5},
    {title: "Warfield", audio: warField, round: 1, volume: 0.4},
    {title: "Honey and Bleach", audio: hAndB, round: 2, volume: 0.4},
    {title: "Stress Filled", audio: stressFilled, round: 3, volume: 0.4}
  ]
  const numRounds = 5
  const winningScore = 3
  /*---------------------------- Variables (state) ----------------------------*/
  // use of file 
  let round = 0
  let songsIndex = 0
  let player1Score = 0
  let player2Score = 0
  let player1ScoreDisplay = document.getElementById("player1ScoreDisplay");
let player2ScoreDisplay = document.getElementById("player2ScoreDisplay");
  let timerIntervalId
  let difference1, difference2
  /*------------------------ Cached Element References ------------------------*/
  const startRoundTimerEl = document.getElementById('timer')
  let header = document.querySelector('h1')
  let button = document.querySelector('button')
  const startScreen = document.getElementById("start-screen")
  const startButton = document.getElementById("start-button")
  const roundStartButton = document.getElementById("round-start-button")
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
    // playRandom()
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
    songsIndex++
    if (round <= numRounds){
      endRound()
    } else {
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
  function resetGame(){
    endGame()
    endRound()
  }
  function endGame(){
    let winner = ""
    let loser = ""
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
    winnerElem.textContent = `${winner}`
    const loserElem = document.querySelector("#loss-message")
    loserElem.textContent = `${loser}`
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
      changeSong(songs[songsIndex].audio)
      if (round >= 0){
        // declare random num 
        const randomNumber = Math.floor(Math.random() * 3000) + 6000
        // play song based on what round it is
        let songEndTime, songStartTime
        playSong()
        // record start time of song playing
        songStartTime = Date.now()
        // set the timeout function to pause based on random delay
        setTimeout(() => {
          stopSong()
        songEndTime = Date.now()
        attackButton1.disabled = false
        attackButton2.disabled = false
        attackButton1.addEventListener('click', () => {
          let player1Score = document.getElementById("#player1ScoreDisplay")
          let player2Score = document.getElementById("#player2ScoreDisplay")
          let player1ScoreValue = document.getElementById("#player1ScoreDisplay")
          let player2ScoreValue = document.getElementById("#player2ScoreDisplay")
          const user1Time = Date.now()
          difference1 = Math.abs(songEndTime - user1Time)
        //this will print a longer number remember to cut off when displaying
        console.log(`Player 1 input time: ${user1Time}`)
        console.log(`Song end time: ${songEndTime}`)
        console.log(`Difference: ${difference1}`)
        attackButton1.disabled = true
        attackButton2.disabled = false
        if (difference1 < difference2){
          player1Score++
          console.log('Player 1 wins!')
          player1Score.textContent =  player1ScoreValue
          console.log("player 2 score:",player1ScoreValue)
        } else if (difference2 < difference1) {
          player2Score++
          console.log('Player 2 wins!')
          player2Score.textContent = player2ScoreValue
          console.log("player 2 score:",player2ScoreValue)
        }
      })
      attackButton2.addEventListener('click', () => {
        let player1ScoreValue = document.getElementById("#player1ScoreDisplay")
        let player2ScoreValue = document.getElementById("#player2ScoreDisplay")
        player1ScoreDisplay.textContent = player1Score;
        player2ScoreDisplay.textContent = player2Score;
        const user2Time = Date.now()
        difference2 = Math.abs(songEndTime - user2Time)
        //this will print a longer number remember to cut off when displaying
        console.log(`Player 2 input time: ${user2Time}`)
        console.log(`Song end time: ${songEndTime}`)
        console.log(`Difference: ${difference2}`)
        attackButton2.disabled = true
        attackButton1.disabled = false

        if (difference1 < difference2){
          player1Score++
          console.log('Player 1 wins!')
          player1ScoreDisplay.innerHTML = player1ScoreValue
          console.log("player 1 score:",`${player1ScoreValue}`)
        } else if (difference2 < difference1) {
          player2Score++
          console.log('player 2 wins!')
          player2ScoreDisplay.innerHTML = player2ScoreValue
          console.log("player 2 score:", `${player2ScoreValue}`)
        } 
      })
      songsIndex++
    }, randomNumber) //generate rand time btw 5-15 secs
  }
}

// visual effect i want to implement very unsure of how this will work 
// document.body.style.backgroundColor = "black"
//add the randomNumber delay function at end
// document.body.style.backgroundColor = "white"

//pause song
//record end time
//get the button and enable click event
//record user input time
// calculate difference btw end time and user input time for both players seperately
// turn off user inputs after first input per player

})