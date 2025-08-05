const CACHE_KEY = "bestScore";
let randomNumber;
let maxNum;
let minNum;
let  tries = 1;
let navigatorMin;
let navigatorMax;
let maxScore = 0;

document.querySelector('.resultContainer').style.visibility = "hidden";
document.querySelector('.generateAgain').style.display = "none";
const alert = document.querySelector('.alert').style.display = "none";

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
    document.querySelector('.countTries').style.display = "block";

    navigatorMin = minNum;
    navigatorMax = maxNum;
}

const loadBestScore = async () => {
    const cachedData = getProductsFromCache();

    if(cachedData){
        maxScore = Number(cachedData);
        console.log("Best Score loaded from cache!", maxScore);
        return maxScore;
    }
    else{
        maxScore = Infinity; // Set to Infinity so any score will be better
        console.log("No score in cache, setting maxScore to Infinity");
        return maxScore;
    }
}

const getProductsFromCache = () => {
    try{
        const cached = localStorage.getItem(CACHE_KEY);
        if(cached){
            return cached;
        }
    } catch (error) {
      console.error(error);
    }

    return null
}

const setCachedScore = (data) => {
    try {
        localStorage.setItem(CACHE_KEY, data);
    } catch (error) {
      console.error(error);
    }
}

(async () => {
    maxScore = await loadBestScore();
    console.log("maxScore:", maxScore);
    
    if(maxScore === Infinity || maxScore === null || maxScore === 0){
        document.querySelector('.score').innerHTML = '-';
    } else {
        document.querySelector('.score').innerHTML = maxScore;
    }
})();

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
        document.querySelector('.countTries').innerHTML = `The number of tries: ${tries}`;
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
        document.querySelector('.countTries').innerHTML = `The number of tries: ${tries}`;
        tries += 1;
        document.querySelector('.guessInput').value = '';
        document.querySelector('.guessInput').focus();
    } 
    
    else if(randomNumber === guessedNum){
        resultP.innerHTML = `You guessed the number CORRECT in ${tries} attempts! The random number was ${randomNumber}!`;

        // Update maxScore if this is a better score (fewer tries) or if no previous score exists
        if(tries < maxScore || maxScore === Infinity){
            maxScore = tries;
            setCachedScore(maxScore);
            document.querySelector('.score').innerHTML = maxScore;
        }

        resultP.style.color = "green";
        document.querySelector('.guessInput').disabled = true;
        document.querySelector('.generateAgain').style.display = "block";
        document.querySelector('.checkGuess').style.display = "none";
        document.querySelector('.navigator').style.display = "none";
        document.querySelector('.countTries').innerHTML = `The number of tries: ${tries}`;
        tries = 1;
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
    document.querySelector('.countTries').style.display = "none";
    navigatorMin = minNum;
    navigatorMax = maxNum;
}

function resetMaxScore() {
    localStorage.removeItem(CACHE_KEY);
    maxScore = Infinity;
    console.log("Max Score reset!", maxScore);
    document.querySelector('.score').innerHTML = "-";
}
