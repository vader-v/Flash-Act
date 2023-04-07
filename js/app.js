/*------ western/ swordsman game musical chairs ------*/

/*-------------------------------- Constants --------------------------------*/
import {
  snow,
  warField,
  hAndB,
  stressFilled,
  princess
} from "./audio.js"

document.addEventListener("DOMContentLoaded", function(){
  const songs = [
    {title: "Snow", audio: snow, round: 1},
    {title: "Warfield", audio: warField, round: 2},
    {title: "Honey and Bleach", audio: hAndB, round: 3},
    {title: "Stress Filled", audio: stressFilled, round: 4},
    {title: "Princess", audio: princess, round: 5}
  ]
  const numRounds = 4
  const winningScore = 3
  /*---------------------------- Variables (state) ----------------------------*/
  // use of file 
  let round = 1
  let songsIndex = 0
  let songEndTime
  let player1ScoreDisplay = document.getElementById("player1ScoreDisplay")
  let player2ScoreDisplay = document.getElementById("player2ScoreDisplay")
  let player1Score = player1ScoreDisplay.textContent ? Number(player1ScoreDisplay.textContent) : 0
  let player2Score = player2ScoreDisplay.textContent ? Number(player2ScoreDisplay.textContent) : 0
  let timerIntervalId
  let difference1, difference2
  /*------------------------ Cached Element References ------------------------*/
  
  const startScreen = document.getElementById("start-screen")
  const gameBoard = document.getElementById("gameboard")
  const buttonSection = document.getElementById("buttonSection")
  const startRoundTimerEl = document.getElementById('timer')
  let header = document.querySelector('h1')
  const startButton = document.getElementById("start-button")
  const roundStartButton = document.getElementById("round-start-button")
  const attackButton1 = document.getElementById('attack1')
  const attackButton2 = document.getElementById('attack2')
  const resetButton = document.getElementById("reset-button")
  const winnerElem = document.querySelector("#win-message")
  const loserElem = document.querySelector("#loss-message")
  let originalWinnerElem = winnerElem.textContent
  let originalLoserElem = loserElem.textContent
  const player1Attack = document.getElementById('player1Attack')
  const player2Attack = document.getElementById('player2Attack')

  /*----------------------------- Event Listeners -----------------------------*/
  
  startButton.addEventListener("click", function(){
    startScreen.style.display = "none"
    buttonSection.style.display = "flex"
    startGame()
    allowInput()
  })
  roundStartButton.addEventListener("click", function(){
    startRound()
  })
  resetButton.addEventListener("click", resetGame)


  attackButton1.addEventListener('click', handlePlayer1Click)
  document.addEventListener('keydown', function(event){
    if (event.code === 'Space'){
      event.preventDefault()
      attackButton1.click()
    
    }
  })
  attackButton2.addEventListener('click', handlePlayer2Click)
  //Add keyboard key functionality in place of mouse click
  document.addEventListener('keydown', function(event){
    if (event.code === 'KeyK'){
      event.preventDefault()
      attackButton2.click()
    }
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
    } 
  }
  function endRound() {
    // stop song disable player input
    denyInput()
    clearTimeout(timerIntervalId)
    renderMessage(`Round ${round}`)
    //enable next round
    roundStartButton.disabled = false
    resetButton.disabled = false
  }
  function turnOnButtons(){
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button =>{
    button.disabled = false
    })
  }
  function resetGame(){
    //reset variables
    loserElem.textContent = originalLoserElem
    winnerElem.textContent = originalWinnerElem
    player1Score = 0
    player2Score = 0
    round = 1
    songsIndex = 0
    resetSongStartTime()
    // reset display
    turnOnButtons()
    player1ScoreDisplay.textContent = "0"
    player2ScoreDisplay.textContent = "0"
    player1Attack.textContent = ""
    player2Attack.textContent = ""
  }
  //in order for the songs to replay sequentially when the game is reset the songs start time will have to be reset using the currentTime value for the audio.
  function resetSongStartTime(){
    songs.forEach((song) => {
      song.audio.currentTime = 0
    })
  }
  function checkWinner(){
    if (player1Score >= winningScore) {
      console.log("Player 1 has won!")
      winnerElem.textContent = "Player 1 has won!"
      loserElem.textContent = "Player 2 is the loser."
      endGame()
    } else if (player2Score >= winningScore){
      console.log("Player 2 has won!")
      winnerElem.textContent = "Player 2 has won!"
      loserElem.textContent = "Player 1 is the loser."
      endGame()
    } else {
      nextRound()
      return
    }
  }
  function denyInput(){
    // disable all buttons besides reset button
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button =>{
      if (button.id !== 'resetButton'){
        button.disabled = true
      }
    })
  }
  function allowInput() {
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => {
    button.disabled = false
    })
  }
  
  let gameEnd = false
  function endGame(){
    gameEnd = true
    denyInput()
    resetButton.disabled = false
  }
  // let audio
  
  function changeSong() {
    if (songs[songsIndex].audio) {
      songs[songsIndex].audio.pause()
      //to ensure that songs stays within the array length
      songsIndex = (songsIndex +1) % songs.length
      playSong()
    }
  }
  
  function makeAnimationGo() {
    header.classList.add('animate__animated', "animate__bounce")
  }
  let player1Clicked = false
  let player2Clicked = false
  function handlePlayer1Click(){
    if (!player1Clicked){
      
      player1Clicked = true
      let player1ScoreString = player1ScoreDisplay.textContent
      let player2ScoreString = player2ScoreDisplay.textContent
      player1Score = player1ScoreString
      player2Score = player2ScoreString
      player1ScoreDisplay.textContent = player1Score.toString()
      const user1Time = Date.now()
      difference1 = Math.abs(songEndTime - user1Time)
      player1Attack.textContent = `Player 1 Difference ${difference1}`
      if (player2Clicked){
        if (difference1 < difference2){
          player1Score++
          player1ScoreDisplay.textContent =  player1Score.toString()
          player1Attack.textContent = difference1.toString(), user1Time.toString(), `Player 1 wins the round!`
        } else if (difference2 < difference1) {
          player2Score++
          
          player2ScoreDisplay.textContent = player2Score.toString()
          attackButton1.disabled = false
          attackButton2.disabled = false
        }
        player1Clicked = false
        player2Clicked = false
        checkWinner()
      }
    } 
  }
  function handlePlayer2Click(){
    if (!player2Clicked){
      player2Clicked = true
      let player1ScoreString = player1ScoreDisplay.textContent
      let player2ScoreString = player2ScoreDisplay.textContent
      player1Score = player1ScoreString
      player2Score = player2ScoreString
      player2ScoreDisplay.textContent = player2Score.toString()
      const user2Time = Date.now()
      difference2 = Math.abs(songEndTime - user2Time)
      player2Attack.textContent = `Player 2 Difference ${difference2}`
      attackButton2.disabled = false
      attackButton1.disabled = false
      if (player1Clicked){
        if (difference1 < difference2){
          player1Score++
          player1ScoreDisplay.textContent = player1Score.toString()
        } else if (difference2 < difference1) {
          player2Score++
          console.log('player 2 wins!')
          player2ScoreDisplay.textContent = player2Score.toString()
          player2Attack.textContent = parseInt("Difference :", difference2, "Input time :", user2Time, `Player 2 wins the round!`)
        
        } else if (player1Score || player2Score >= 3){
          endGame()
        }
        checkWinner()
        player1Clicked = false
        player2Clicked = false
      }
    }
  }
  function playRandom() {
    // change song for the start of the round
    if (round > 0){
      // declare random num 
      const randomNumber = Math.floor(Math.random() * 3000) + 6000
      // play song based on what round it is
      let songStartTime
      changeSong(songs[songsIndex].audio)
      // record start time of song playing
      songStartTime = Date.now()
      // set the timeout function to pause based on random delay
      setTimeout(() => {
        stopSong()
        
        songEndTime = Date.now()
        attackButton1.disabled = false
        attackButton2.disabled = false
    }, randomNumber) //generate rand time btw 5-15 secs
  }
}

})