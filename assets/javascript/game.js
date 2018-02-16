
// Hangman
var game = {

	// Variables

	availableWords: ["bulls", "jordan", "pippen", "rodman", "gordon", "butler", "champions", "jackson", "chicago", "deng", "basketball", "nba", "noah", "lavine", "dunn", "markkanen", "portis", "rose"],
	currentWord: "",
	displayWord: [],
	availableLetters: [],
	guesses: 0,
	wins: 0,
	goodLetterGuess: 0,
	isGameOver: false,
	isShown: false,

	// displays

	wordDisp: {},
	guessDisp: {},
	winDisp: {},
	guessLtrDisp: {},
	warnDisp: {},

	// sounds

	goodGuess: new Howl({
		src:['assets/sounds/swoosh.wav'],
	}),
	badGuess:new Howl({
		src:['assets/sounds/miss.wav'],
	}),
	gameOverSound: new Howl({
		src:['assets/sounds/endofgame.wav'],
	}),
	winSound: new Howl({
		src:['assets/sounds/win.mp3'],
	}),
	
	


//start game

	startGame: function(currentWordDisp, currentGuessDisp, winsDisp, guessLetterDisp, warningDisp){

		// Initialize Game So that a new round can be played when Game Over happenes.
		

		this.wordDisp = currentWordDisp;
		this.guessDisp = currentGuessDisp;
		this.winDisp = winsDisp;
		this.warnDisp = warningDisp;
		this.guessLtrDisp = guessLetterDisp;


		// Setup Game Values

		this.isGameOver = false;
		this.guesses = 13;
		this.availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'],
        this.currentWord = this.availableWords[Math.floor(Math.random() * this.availableWords.length)];
        this.goodLetterGuess = 0;

		// Reset Game Display
		
		this.displayGame();
		this.wordDisp.textContent = "_";
		this.guessLtrDisp.textContent = "";
		this.displayWord = [];
		for(var i=0; i<this.currentWord.length; i++){
	        if(this.currentWord.charAt(i).match(/[a-z]/i)){
	          this.displayWord.push("_");
	        } else {
	          this.displayWord.push(" ");
	        }
	    }
	    this.wordDisp.textContent = this.displayWord.join(" ");
	    this.warnDisp.textContent = "";

	},

	
		
		
	
	
	displayGame: function(){
		
		//Updates Game Display

		this.guessDisp.textContent = this.guesses;
		this.winDisp.textContent = this.wins;
	},


		
	
	checkGuess: function(userGuess){

		// Check if what they selected is available
		if(this.availableLetters.indexOf(userGuess) > -1){
			this.warnDisp.textContent = "";

			// if it is we check it versus the current word
			if(this.currentWord.includes(userGuess)){
				
				// We found a match
				for(var i=0; i<this.currentWord.length; i++){
			        if(this.currentWord.charAt(i)===userGuess){
			          this.displayWord[i] = userGuess;
			          this.goodLetterGuess++;
			          this.wordDisp.textContent = this.displayWord.join(" ");
			          this.availableLetters = this.availableLetters.filter( a => a !== userGuess);
			        }
			    }

				// Play goodGuess Sound Effect
				
			    this.goodGuess.play();
			     

			     
				// user wins

				if(this.goodLetterGuess === this.currentWord.length ){

					
					
					this.wins++;
					this.isGameOver = true;
					this.wordDisp.textContent = "You Won!!! " ;
					this.warnDisp.textContent = "You Won!!! Press Any Key to restart!";
			
					this.winSound.play();
				}
						
				
			} else {
				// otherwise then we see if they still have guesses left
				if(this.guesses > 0){
					this.badGuess.play();
					// if they do then we remove a guess and add their current guess to the list of guessed letters and remove from valid guesses
					this.availableLetters = this.availableLetters.filter( a => a !== userGuess);
					this.guesses--;
					this.guessLtrDisp.textContent += userGuess + " " ;
					
				
					
				
				} else {
					// game over 
					this.gameOverSound.play();
					
					this.wordDisp.textContent = "you lost!!";
					this.warnDisp.textContent = "You lost! Press Any Key to restart!";
					this.wins = 0;
					
					this.isGameOver = true;

					// reset the game to play again
					
		reset()

				}
			}
		} else {
			//already guessed or invalid key
					
			this.warningSound.play();
			if(userGuess.match(/^[a-z]+$/)){
				this.warnDisp.textContent = "You have already guessed " + userGuess;
				this.warningSound.play();
			} else {
				
				this.warnDisp.textContent = "You didn't enter a valid letter. Please try again.";
				
			}
		}
	}
}


// Grab Display Hooks from HTML

var currentWordDisp = document.querySelector("#currentWord");
var currentGuessDisp = document.querySelector("#guesses");
var winsDisp = document.querySelector("#wins");
var guessLetterDisp = document.querySelector("#guessedLetters");
var warningDisp = document.querySelector("#warning");

// Starts Game
game.startGame(currentWordDisp,currentGuessDisp, winsDisp, guessLetterDisp, warningDisp);

// User Input Runs the game loop
document.onkeyup = function(e){
	// Check if Game is Over
	if(game.isGameOver === false){
		// Check User Input for Key pressed	
		game.checkGuess(e.key);
		game.displayGame();
	} else {
		// Restart the game
		game.startGame(currentWordDisp,currentGuessDisp, winsDisp, guessLetterDisp, warningDisp);
		console.log("Restarted Game");
		
	}
}