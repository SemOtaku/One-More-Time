function guess_start() {
    var colors = ["blue", "green", "khaki", "red", "yellow"];
    answer = Math.floor(Math.random()*5);
    alert("The right answer is " + colors[answer]);
    guess = -1;
    counter = 0;
    while (!(guess == answer)) {
      guess_name = prompt("Guess a color of:" + colors);
      i = 0;
      while (i<=4) {
        if (guess_name == colors[i]) guess = i;
        i++;
      };
      if (guess == -1) {
          alert("I don't know such color");
          guess = -1;
      }
      else if (guess < answer) {
        alert("My color is lower");
        guess = -1;
      }
      else if (guess > answer) {
        alert("My answer is higher");
        guess = -1;
      }
      else if (guess == answer) {
        document.body.style.backgroundColor = colors[guess];
        alert("You guessed it! It took you "+ counter + " guesses");
      }
      counter++;
    }
}
