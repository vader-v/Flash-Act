/*------ western/ swordsman game musical chairs

  user pushes a button to start a count down to prepare the song to play, the song plays, the song stops exclaiming for the user to attack the enemy player...

  two inputs, one kill, one win, one loss....

  song plays based on a random number with a minimum value and a maximum value
  letting the player input a keyboard press upon the song finishing, an icon will flash on screen to say "draw" if the audio is an issue.
  if the player draws before the icon is displayed they get penalized with a loss.
  the first player to react to the icon displaying will be the winner.
  "stopPlaying" will have to call the image to invoke the function to allow a player input

  add event listener to button with id thats off until the song stops
  when song finishes calculate players reaction time based on the input time and the "endTime()" for the song 
  log user input time
  log sound end time
  log the difference between the two, disable the button show the winner and log one win one loss as you do
  !!change song!!
  repeat core game mechanics until one player gains 3 wins (best out of 5)

  Math.abs() would ensure a positive number (mdn says so) since the user could input before or after the songs end so its necessary to discern a positive difference
  ROUND ONE
  game start button pops up
    round start countdown 5 4 2 3 6 7 8 1 9 10 0
      run math to determine song 2 length
      song2 starts
    player input allowed
    song2 stops
    wait for both player input
  round end
    calculate diff
    calculate winner
    display winner
  next round\
  possibly change character design/background per round (maybe too much work)
  game start button pops up
  round start countdown 5 4 2 3 6 7 8 1 9 10 0
    run math to determine song 2 length
  song2 starts
    player input allowed
  song2 stops
    wait for both player input
  round end
    calculate diff
    calculate winner
    display winner

  next round\
  possibly change character design/background per round (maybe too much work)
    game start button pops up
    round start countdown 5 4 2 3 6 7 8 1 9 10 0
      run math to determine song 2 length
    song2 starts
      player input allowed
    song2 stops
      wait for both player input
    round end
      calculate diff
      calculate winner
  display winner
    if player wins = 3{
    player ${player1 or 2} wins
}

if i wanted to be extremely hard on myself i would make a second input for each player to block the other players attack, saving their life maybe granting a point to the player that blocks, if two players block neither gets a point, idk about that though too clunky
add source links for my friends songs i will be using at the end of the game once all rounds are over
 */