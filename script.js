let level = 1;

let currentArray = [];

let currentIndex = 0;

let pass = 0;

let score = 0;

let mistakes = 0;

let timer = 60;

let interval;

/* START */

startLevel();

/* LEVEL */

function startLevel(){

    generateArray();

    startTimer();

    renderArray();

    updateStats();

    highlightPair();

    robotMessage(
        "Should these bars swap?"
    );
}

/* ARRAY */

function generateArray(){

    let size = level + 2;

    currentArray = [];

    for(let i=0;i<size;i++){

        currentArray.push(
            Math.floor(Math.random()*90)+10
        );
    }

    currentIndex = 0;

    pass = 0;
}

/* RENDER */

function renderArray(){

    const container =
    document.getElementById(
        'array-container'
    );

    container.innerHTML = '';

    currentArray.forEach((num,index)=>{

        const bar =
        document.createElement('div');

        bar.classList.add('bar');

        bar.style.height =
        `${num*3}px`;

        bar.innerText = num;

        if(index >= currentArray.length-pass){

            bar.classList.add('sorted');
        }

        container.appendChild(bar);
    });

    highlightPair();
}

/* HIGHLIGHT */

function highlightPair(){

    const bars =
    document.querySelectorAll('.bar');

    bars.forEach(bar=>{

        bar.classList.remove(
            'current'
        );
    });

    if(bars[currentIndex]){

        bars[currentIndex]
        .classList.add('current');
    }

    if(bars[currentIndex+1]){

        bars[currentIndex+1]
        .classList.add('current');
    }
}

/* PLAYER CHOICE */

function playerChoice(choice){

    const a =
    currentArray[currentIndex];

    const b =
    currentArray[currentIndex+1];

    const shouldSwap = a > b;

    if(choice === shouldSwap){

        correctMove();

        if(choice){

            swap(
                currentIndex,
                currentIndex+1
            );

            robotMessage(
                "✅ Great swap!"
            );
        }

        else{

            robotMessage(
                "✅ Correct! No swap needed."
            );
        }
    }

    else{

        wrongMove();

        shakeBars();

        if(shouldSwap){

            robotMessage(
                "❌ They SHOULD swap."
            );
        }

        else{

            robotMessage(
                "❌ They should NOT swap."
            );
        }
    }

    nextPair();

    renderArray();

    checkWin();
}

/* NEXT PAIR */

function nextPair(){

    currentIndex++;

    if(
        currentIndex >=
        currentArray.length-1-pass
    ){

        currentIndex = 0;

        pass++;
    }
}

/* SWAP */

function swap(i,j){

    let temp =
    currentArray[i];

    currentArray[i] =
    currentArray[j];

    currentArray[j] = temp;
}

/* SCORE */

function correctMove(){

    score += 10;

    updateStats();
}

function wrongMove(){

    score -= 5;

    mistakes++;

    updateStats();
}

/* STATS */

function updateStats(){

    document.getElementById(
        'score'
    ).innerText = score;

    document.getElementById(
        'mistakes'
    ).innerText = mistakes;

    document.getElementById(
        'level'
    ).innerText = level;

    document.getElementById(
        'timer'
    ).innerText = timer;
}

/* ROBOT */

function robotMessage(text){

    document.getElementById(
        'robot-text'
    ).innerHTML =
    `🤖 ${text}`;
}

/* SHAKE */

function shakeBars(){

    const bars =
    document.querySelectorAll('.bar');

    if(bars[currentIndex]){

        bars[currentIndex]
        .classList.add('wrong');
    }

    if(bars[currentIndex+1]){

        bars[currentIndex+1]
        .classList.add('wrong');
    }

    setTimeout(()=>{

        bars.forEach(bar=>{

            bar.classList.remove(
                'wrong'
            );
        });

    },300);
}

/* WIN */

function checkWin(){

    let sorted = true;

    for(let i=0;i<currentArray.length-1;i++){

        if(
            currentArray[i] >
            currentArray[i+1]
        ){

            sorted = false;
            break;
        }
    }

    if(sorted){

        levelComplete();
    }
}

/* LEVEL COMPLETE */

function levelComplete(){

    clearInterval(interval);

    score += 100;

    robotMessage(
        "🏆 LEVEL COMPLETE!"
    );

    updateStats();

    setTimeout(()=>{

        level++;

        timer = Math.max(
            15,
            60-level*3
        );

        startLevel();

    },2000);
}

/* TIMER */

function startTimer(){

    clearInterval(interval);

    interval = setInterval(()=>{

        timer--;

        updateStats();

        if(timer <= 0){

            clearInterval(interval);

            robotMessage(
                "⏰ Time Up!"
            );

            setTimeout(()=>{

                restartLevel();

            },1500);
        }

    },1000);
}

/* RESTART */

function restartLevel(){

    timer = Math.max(
        15,
        60-level*3
    );

    mistakes = 0;

    startLevel();
}
