    let missed  = 0;
    const overlay = document.querySelector('#overlay');
    const hintDiv = document.getElementById('hint');
    const keyboard = document.getElementById('qwerty');
    const startButton = document.querySelector('.btn__reset');
    const ul = document.querySelector('#phrase ul');
    const letters = document.getElementsByClassName('letter');
    const lives = document.querySelectorAll('.tries img');
    const show = document.getElementsByClassName('show');
    const title = document.querySelector('.title');
    const keyrow = document.querySelectorAll('.keyrow button');
    const check = document.querySelector('.check');

	fetch('https://dog.ceo/api/breeds/image/random');

    const phrases = [
    {
      hint: 'a programmer who specializes in or is specifically engaged in the development of World Wide Web applications',
      answer: 'web developer'
    },
    {
      hint: 'a person who writes computer programs',
      answer: 'programmer'
    },
    {
      hint: 'someone who is able to work on both the front-end and back-end portions of an application',
      answer: 'full stack developer'
    },
    {
      hint: 'a global computer network providing a variety of information and communication facilities consisting from interconnected networks using standardized communication protocols',
      answer: 'internet'
    },
    {
      hint: 'Hypertext Markup Language, a standardized system for tagging text files to achieve font, color, graphic, and hyperlink effects on World Wide Web pages.',
      answer: 'html'
    }
    ];

        //hide the start screen overlay.
    startButton.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

        //choose a phrase and split it into a new array of characters
    function randomPhrases(){
      const phrase = phrases[(Math.random()*phrases.length)|0];
      const hintWord = phrase.hint;
      const answerWord = phrase.answer.split('');
      return {
        hint : hintWord,
        answer : answerWord
      }
    }

    const random = randomPhrases();
    const answer = random.answer;
    const hint = random.hint;

        //create new list items of characters
    function addPhraseToDisplay (arr) {
      for(let i = 0; i <arr.length; i += 1) {
        const listItem = document.createElement('li');
        let character = arr[i];
        listItem.textContent = character;

        if (character === ' ' ) {
          listItem.className = 'space';
        } else {
          listItem.className = 'letter';
        }
        ul.appendChild(listItem);
      }
    }

    //call the above function
    addPhraseToDisplay(answer);
    //insert the hint in the div
    hintDiv.innerHTML = "<p><strong>Hint: </strong>"+hint+" </hp>";


        //check if the letter from the phrase match the one from the button clicked
    function checkLetter(button) {
      let matched = null;
      const buttonClicked = button.target;
      for(let i = 0; i < letters.length; i += 1) {
        if (buttonClicked.textContent === letters[i].textContent) {
          letters[i].classList.add('show');
          const letterMatched = letters[i];
          buttonClicked.className = 'correctChosen';
          matched = true;
        }
      }
      return matched;
    }
      //change the overlay screen and propreties if the user wn or lost the game
    function checkWin() {
      if(show.length === letters.length) {
        overlay.style.display = 'flex';
        overlay.className = 'win';
        startButton.textContent = 'Play again';
        startButton.style.background = "#fff";
        startButton.style.color = "#399543";
        check.textContent = 'You Win!';
      }
      if (missed === 5) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        startButton.textContent = 'Play again';
        startButton.style.background = "#fff";
        startButton.style.color = "#D94545";
        check.textContent = 'You Lose!';
      }
    }


    keyboard.addEventListener('click', (e) => {
        //disable the chosen buttons
      if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;

        const letterFound =  checkLetter(e);

          //Count the missed guesses in the game.
        if (letterFound === null) {
          let lifeLost = missed;
          lives[lifeLost].setAttribute('src', 'images/lostHeart.png' );
          missed += 1;
        }
      }
      checkWin();
    });

      //EXTRA CREDIT
    startButton.addEventListener('click', (e) => {
      if(e.target.textContent === 'Play again') {

          //set the number of misses to zero
        missed = 0;

        //reset the listItem
        ul.innerHTML = '';

        //reset the hintDiv
        hintDiv.innerHTML = '';

          //recreate the buttons in the keyboard
        for (let i=0; i < keyrow.length; i += 1) {
        keyrow[i].className = "";
        keyrow[i].disabled = false;
        }

          //reset the lives
        for(let i = 0; i < lives.length; i += 1 ){
        lives[i].src = 'images/liveHeart.png';
        }

          //generate a new random phrase
        const random = randomPhrases();
        const answer = random.answer;
        const hint = random.hint;
        addPhraseToDisplay(answer);
        hintDiv.innerHTML = "<p><strong>Hint: </strong>"+hint+" </hp>";

      }
    });
