const msg = document.querySelector('.msg');
const guess = document.querySelector('input');
const btn = document.querySelector('.btn');
const timeElement = document.querySelector('.time span b');
let play = false;
let newWords = "";
let randWords = "";
let timer;
let sWords = ['burger', 'pizza', 'sandwich', 'rice', 'meat', 'fish', 'noodles', 'cheese', 'cookie', 'candy', 'cupcake', 'bread', 'chicken', 'donut', 'biryani', 'mutton', 'paneer', 'pasta', 'momo', 'chapati'];

const playTimer = maxTime => {
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeElement.innerText = maxTime;
        }
        loseGame(`Time Out! ${newWords} is a correct word`);
    }, 1000);
}

function loseGame(msg){
    alert(msg);
    clearInterval(timer);
}

const createNewWords = () => {
        playTimer(30);  /*calling playTimer function with passing 30 as maxtime value*/
        let ranNum = Math.floor(Math.random() * sWords.length);   /*getting random objects from words.*/
        // console.log(ranNum);
        let newTempSwords = sWords[ranNum];
        // console.log(newTempSwords.split(""));
        return newTempSwords;
}

const scrambleWords = (arr) => {
    for (let i = arr.length -1; i>0; i--){
        let temp = arr[i];
        let j = Math.floor(Math.random()*(i+1));  /*getting random number*/
        // console.log(i);
        // console.log(j);

        // shuffling and swiping arr letters randomly
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
}

btn.addEventListener('click', function(){
    if(!play){
        play = true;
        btn.innerHTML = "Guess";
        guess.classList.toggle('hidden');
        newWords = createNewWords();
        randWords = scrambleWords(newWords.split("")).join("");  /* splitting each letter of random words. split: to convert a string into an array we use split*/
        // console.log(randWords.join(""));    using join("") above we are passing shuffled word as word text
        msg.innerHTML = `Guess the Word: ${randWords}`;
    }else{
        let tempWord = guess.value;
        if(tempWord === newWords){
            // console.log('correct');
            play = false;
            msg.innerHTML = `Awesome It's Correct. It is ${newWords}`;
            btn.innerHTML = "Start Again";
            guess.classList.toggle('hidden');
            guess.value = "";
        }else{
            console.log('incorrect');
            msg.innerHTML = `Sorry Boss. It's Incorrect. Plz try again. 
                ${randWords}`;
        }
    }

    
})