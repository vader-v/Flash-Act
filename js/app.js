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
    {title: "Snow", audio: snow, round: 1, volume: 0.5},
    {title: "Warfield", audio: warField, round: 2, volume: 0.4},
    {title: "Honey and Bleach", audio: hAndB, round: 3, volume: 0.4},
    {title: "Stress Filled", audio: stressFilled, round: 4, volume: 0.4}
  ]
  const numRounds = 5
  const winningScore = 3
  /*---------------------------- Variables (state) ----------------------------*/
  // use of file 
  let round = 1
  let songsIndex = 0
  let player1Score = 0
  let player2Score = 0
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
  const winnerElem = document.querySelector("#win-message")
  const loserElem = document.querySelector("#loss-message")
  /*----------------------------- Event Listeners -----------------------------*/
  
  startButton.addEventListener("click", function(){
    startGame()
    allowInput(true)
  })
  roundStartButton.addEventListener("click", function(){
    startRound()
  })
  resetButton.addEventListener("click", resetGame)
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
    player1Score = 0
    player2Score = 0
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
    //reset variables
    player1Score = 0
    player2Score = 0
    round = 1
    songsIndex = 0
    // reset display
    player1ScoreDisplay.textContent = "0"
    player2ScoreDisplay.textContent = "0"
    winnerElem.style.display = "none"
    loserElem.style.display = "none"
  }
  function endGame(){
    let winner = ""
    let loser = ""
    winnerElem.textContent = `${winner} Has won!`
    loserElem.textContent = `${loser} is the loser.`
    if (player1Score >= winningScore) { 
      console.log("Player 1 is the winner!")
      winner = "Player 1"
      loser = "Player 2"
    } else if (player2Score >= winningScore) {
      console.log("Player 2 is the winner!")
      winner = "Player 2"
      loser = "Player 1" 
        } else {
          nextRound()
          return
        }
        // update div with win message
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
    if (round > 0){
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
          let player1Clicked = false
          let player2Clicked = false
        attackButton1.addEventListener('click', () => {
          player1Clicked = true
          let player1ScoreDisplay = document.getElementById("player1ScoreDisplay")
          let player2ScoreDisplay = document.getElementById("player2ScoreDisplay")
          // let player1Score = parseInt(player1ScoreDisplay.textContent)
          // let player2Score = parseInt(player2ScoreDisplay.textContent)
          player1ScoreDisplay.textContent = player1Score.toString()
          const user1Time = Date.now()
          difference1 = Math.abs(songEndTime - user1Time)
          if (player2Clicked){
            if (difference1 < difference2){
                player1Score++
                console.log('Player 1 wins!')
                player1ScoreDisplay.textContent =  player1Score.toString()
                console.log("Player 1 score:",player1Score)
                } else if (difference2 < difference1) {
                player2Score++
                console.log('Player 2 wins!')
                player2ScoreDisplay.textContent = player2Score.toString()
                console.log("player 2 score:",player2Score)
                console.log(`Player 1 input time: ${user1Time}`)
                console.log(`Song end time: ${songEndTime}`)
                console.log(`Difference: ${difference1}`)
                attackButton1.disabled = false
                attackButton2.disabled = false
                }
              player1Clicked = false
              player2Clicked = false
              } 
              //this will print a longer number remember to cut off when displaying
      })
      attackButton2.addEventListener('click', () => {
        player2Clicked = true
      let player1ScoreDisplay = document.getElementById("player1ScoreDisplay")
      let player2ScoreDisplay = document.getElementById("player2ScoreDisplay")
      player2ScoreDisplay.textContent = player2Score.toString()
      // let player1Score = parseInt(player1ScoreDisplay.textContent)
      // let player2Score = parseInt(player2ScoreDisplay.textContent)
      const user2Time = Date.now()
      difference2 = Math.abs(songEndTime - user2Time)
      //this will print a longer number remember to cut off when displaying
      console.log(`Player 2 input time: ${user2Time}`)
      console.log(`Song end time: ${songEndTime}`)
      console.log(`Difference: ${difference2}`)
      attackButton2.disabled = false
      attackButton1.disabled = false
      if (player1Clicked){
      if (difference1 < difference2){
        player1Score++
        console.log('Player 1 wins!')
        player1ScoreDisplay.textContent = player1Score.toString()
        console.log("player 1 score:", player1Score)
        } else if (difference2 < difference1) {
        player2Score++
        console.log('player 2 wins!')
        player2ScoreDisplay.textContent = player2Score.toString()
        console.log("player 2 score:", player2Score)
        } 
      }
      })
      let winner = ""
      let loser = ""
      winnerElem.textContent = `${winner} Has won!`
      loserElem.textContent = `${loser} is the loser.`
      if (player1Score >= winningScore) { 
        console.log("Player 1 is the winner!")
        winner = "Player 1"
        loser = "Player 2"
      } else if (player2Score >= winningScore) {
        console.log("Player 2 is the winner!")
        winner = "Player 2"
        loser = "Player 1" 
          } else {
            nextRound()
            return
          }
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