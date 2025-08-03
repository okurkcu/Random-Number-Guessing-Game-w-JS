let randomNumber;
let maxNum;
let minNum;
let  tries = 0;
let navigatorMin;
let navigatorMax;

document.querySelector('.resultContainer').style.visibility = "hidden";
document.querySelector('.generateAgain').style.display = "none";

function generateRandomNumber(){
    minNum = document.querySelector('.minNum').value;
    maxNum = document.querySelector('.maxNum').value;
    randomNumber = Math.floor(Math.random() * maxNum + minNum);

    console.log(minNum, maxNum, randomNumber);

    document.querySelector('.numberContainer').style.display = "none";

    document.querySelector('.numbers').innerHTML = `The random number is between ${minNum} - ${maxNum}!`;

    document.querySelector('.resultContainer').style.visibility = "visible";
    document.querySelector('.result').style.display = "block";
    document.querySelector('.numbers').style.display = "block";

    navigatorMin = minNum;
    navigatorMax = maxNum;
}

function guessNumber(){
    const resultP = document.querySelector('.result');
    const guessedNum = Number(document.querySelector('.guessInput').value);
    const navigator = document.querySelector('.navigator');
    navigator.style.display = "block";

    if(guessedNum < randomNumber){
        resultP.innerHTML = `Your guess ${guessedNum} is TOO LOW! Try Again!`;
        console.log("in while loop if too low");
        resultP.style.color = "red";
        if(guessedNum > navigatorMin){
            navigatorMin = guessedNum;
        }
        navigator.innerHTML = `You need to guess between ${navigatorMin} - ${navigatorMax}`;
        tries += 1;
        document.querySelector('.guessInput').value = '';
        document.querySelector('.guessInput').focus();
    } 
    
    else if (guessedNum > randomNumber){
        resultP.innerHTML= `Your guess ${guessedNum} is TOO HIGH! Try Again!`;
        console.log("in while loop if too high");
        resultP.style.color = "red";
        if(guessedNum < navigatorMax){
            navigatorMax = guessedNum;
        }
        navigator.innerHTML = `You need to guess between ${navigatorMin} - ${navigatorMax}`;
        tries += 1;
        document.querySelector('.guessInput').value = '';
        document.querySelector('.guessInput').focus();
    } 
    
    else if(randomNumber === guessedNum){
        resultP.innerHTML = `You guessed CORRECT in ${tries} attempts! The random number was ${randomNumber}!`;
        resultP.style.color = "green";
        document.querySelector('.guessInput').disabled = true;
        document.querySelector('.generateAgain').style.display = "block";
        document.querySelector('.checkGuess').style.display = "none";
        document.querySelector('.navigator').style.display = "none";
    }
}

function arrangeNumberAgain(){
    document.querySelector('.resultContainer').style.visibility = "hidden";
    document.querySelector('.numberContainer').style.display = "block";
    document.querySelector('.result').style.display = "none";
    document.querySelector('.numbers').style.display = "none";
    document.querySelector('.guessInput').value = '';
    document.querySelector('.result').innerHTML = '';
    document.querySelector('.minNum').value = '';
    document.querySelector('.maxNum').value = '';
    document.querySelector('.guessInput').disabled = false;
    document.querySelector('.generateAgain').style.display = "none";
    document.querySelector('.checkGuess').style.display = "block";
    document.querySelector('.navigator').style.display = "none";
    navigatorMin = minNum;
    navigatorMax = maxNum;
}
