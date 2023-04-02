/*------ western/ swordsman game musical chairs ------*/

/*-------------------------------- Constants --------------------------------*/
const numRounds = 4
const winningScore = 3

/*---------------------------- Variables (state) ----------------------------*/
let player1Score = 0
let player2Score = 0
//have to set to 1 for the if else statement to check for point distr.
let globalTimer
let roundStart = false
let gameOver = false
let startTime = 0


/*------------------------ Cached Element References ------------------------*/

let header = document.querySelector('h1')
let button = document.querySelector('button')


/*----------------------------- Event Listeners -----------------------------*/

button.addEventListener('click', makeAnimationGo)



/*-------------------------------- Functions --------------------------------*/
function initialize () {

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

console.log(makeRandomNum(0, 100))
function playRandom() {
  //declare if a round is started, if not ignore the timer
  if (roundStart === true){
      // declare random num 
      let randomNumber = Math.floor(Math.random() * 1000) + 5000
      //declare sound
      let song = new Audio('Assets/Songs/Honey And Bleach.mp3')
      // play song
      song.play()
      // record start time of song playing
      let startTime = Date.now()
      // declare end time 
      let endTime
      console.time('startRoundTimer')
      // set the timeout function to pause based on random delay
      setTimeout(function() {
      song.pause()
      endTime = Date.now()
      let button = document.getElementById('button')
      button.disabled = false
      button.addEventListener('click', function() {
      let userTime = Date.now()
      let difference = Math.abs(endTime - userTime)
      console.log(`Player input time: ${userTime}`)
      console.log(`Song end time: ${endTime}`)
      console.log(`Difference: ${difference}`)
      button.disabled = true
    })
    document.body.style.backgroundColor = "black"
    }, randomNumber) //generate rand time btw 5-15 secs
    document.body.style.backgroundColor = "white"
  } 

}
  
  //pause song
  //record end time
  //get the button and enable click event
  //record user input time
  // calculate difference btw end time and user input time for both players seperately
  //add the random delay function at end
  // turn off user inputs after first input per player

function playSong() {
  
}
let countdownEl = document.getElementById('scene')
