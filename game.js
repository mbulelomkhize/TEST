let array = [];
let size = 3;

let algorithm = "bubble";

let index = 0;
let pass = 0;

let score = 0;
let mistakes = 0;
let level = 1;

let timer = 60;
let interval;

/* INIT */
generateArray();
setAlgorithmUI();

/* =========================
   ARRAY GENERATION
========================= */
function generateArray() {

    array = [];

    size = 3 + (level - 1);

    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 90) + 10);
    }

    index = 0;
    pass = 0;

    render();
}

/* =========================
   RENDER
========================= */
function render() {

    const container = document.getElementById("array-container");
    container.innerHTML = "";

    array.forEach((v) => {

        const div = document.createElement("div");
        div.classList.add("bar");

        div.style.height = (v * 3) + "px";
        div.innerText = v;

        container.appendChild(div);
    });

    highlight();
}

/* =========================
   HIGHLIGHT
========================= */
function highlight() {

    let bars = document.querySelectorAll(".bar");

    bars.forEach(b => b.classList.remove("active"));

    if (algorithm === "bubble") {
        if (bars[index]) bars[index].classList.add("active");
        if (bars[index + 1]) bars[index + 1].classList.add("active");
    }

    if (algorithm === "selection") {
        bars[index]?.classList.add("active");
    }

    if (algorithm === "insertion") {
        bars[index]?.classList.add("active");
    }
}

/* =========================
   ALGORITHM SWITCH
========================= */
function setAlgorithm(type) {

    algorithm = type;
    index = 0;

    setAlgorithmUI();
    render();
}

/* SHOW/HIDE UI */
function setAlgorithmUI() {

    document.getElementById("bubble-ui").style.display =
        algorithm === "bubble" ? "flex" : "none";

    document.getElementById("selection-ui").style.display =
        algorithm === "selection" ? "flex" : "none";

    document.getElementById("insertion-ui").style.display =
        algorithm === "insertion" ? "flex" : "none";
}

/* =========================
   BUBBLE GAME
========================= */
function answer(choice) {

    let a = array[index];
    let b = array[index + 1];

    let shouldSwap = a > b;

    if (choice === shouldSwap) {

        score += 10;

        if (choice) swap(index, index + 1);

        nextBubble();

    } else {

        score -= 5;
        mistakes++;
    }

    update();
    render();
    checkWin();
}

function nextBubble() {

    index++;

    if (index >= array.length - 1 - pass) {
        index = 0;
        pass++;
    }
}

/* =========================
   SELECTION SORT
========================= */
function selectMin() {

    let minIndex = index;

    for (let i = index; i < array.length; i++) {
        if (array[i] < array[minIndex]) {
            minIndex = i;
        }
    }

    swap(index, minIndex);

    score += 10;

    index++;

    update();
    render();
    checkWin();
}

/* =========================
   INSERTION SORT
========================= */
function insertHere() {

    let key = array[index];
    let j = index - 1;

    while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
    }

    array[j + 1] = key;

    score += 10;

    index++;

    update();
    render();
    checkWin();
}

/* =========================
   SWAP
========================= */
function swap(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

/* =========================
   WIN CHECK
========================= */
function checkWin() {

    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) return;
    }

    level++;
    score += 100;

    alert("LEVEL COMPLETE!");

    generateArray();
}

/* =========================
   TIMER
========================= */
function startGame() {

    clearInterval(interval);

    interval = setInterval(() => {

        timer--;
        update();

        if (timer <= 0) {
            alert("TIME UP!");
            resetGame();
        }

    }, 1000);
}

/* RESET */
function resetGame() {

    score = 0;
    mistakes = 0;
    level = 1;
    timer = 60;

    generateArray();
}

/* UPDATE UI */
function update() {

    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
    document.getElementById("mistakes").innerText = mistakes;
    document.getElementById("timer").innerText = timer;
}
