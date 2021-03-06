// source of boggle dice faces 
// https://boardgames.stackexchange.com/questions/29264/boggle-what-is-the-dice-configuration-for-boggle-in-various-languages?rq=1
window.onload = initialize;

function initialize() { // loads these functions on page load
    rollDice();
    select();
    enterButton();
}

function reset() {
    rollDice();
    clearMe();
    clearTotals();
}

// array of all td elements in order
let tdArray = document.getElementsByTagName("TD");
// let buttons = document.querySelectorAll(".board td"); // static

function rollDice() {
    let dice = [
        ['R', 'I', 'F', 'O', 'B', 'X'],
        ['I', 'F', 'E', 'H', 'E', 'Y'],
        ['D', 'E', 'N', 'O', 'W', 'S'],
        ['U', 'T', 'O', 'K', 'N', 'D'],
        ['H', 'M', 'S', 'R', 'A', 'O'],
        ['L', 'U', 'P', 'E', 'T', 'S'],
        ['A', 'C', 'I', 'T', 'O', 'A'],
        ['Y', 'L', 'G', 'K', 'U', 'E'],
        ['Qu', 'B', 'M', 'J', 'O', 'A'],
        ['E', 'H', 'I', 'S', 'P', 'N'],
        ['V', 'E', 'T', 'I', 'G', 'N'],
        ['B', 'A', 'L', 'I', 'Y', 'T'],
        ['E', 'Z', 'A', 'V', 'N', 'D'],
        ['R', 'A', 'L', 'E', 'S', 'C'],
        ['U', 'W', 'I', 'L', 'R', 'G'],
        ['P', 'A', 'C', 'E', 'M', 'D']
    ];

    let randomDice = [];    // shuffles dice
    for ( let i = dice.length ; i > 0 ; i-- ) {
        let random = Math.floor( Math.random() * i );
        randomDice.push(...dice.splice(random, 1));
    }

    // adds letters into td
    for ( let i = 0 ; i < 16 ; i++ ) {
        let random = Math.floor( Math.random() * 6 );
        tdArray[i].innerHTML = randomDice[i][random];
    }
}

// listen for click
for ( let i = 0 ; i < 16 ; i++ ) {     // need function(){} to prevent immediate firing of select() onload.
    tdArray[i].onclick = function(){select(tdArray[i])};
}

// let selectedDice = new Set();   // set of td elements if selected
let letterArr = []; // array of letters if selected
let selectedDiceArr = [];
let submittedWords = [];

function select(td) {
    let lastSelectedDice = selectedDiceArr[selectedDiceArr.length-1];
    if ( selectedDiceArr[0] === undefined ) {   // empty array of selections, highlight anything
        highlight(td);
    } else
    if ( td.className === "" || td.className === null ) {
        // get column and row numbers from data- attributes and parse them into integers
        let c = parseInt( lastSelectedDice.getAttribute("data-column") );
        let r = parseInt( lastSelectedDice.getAttribute("data-row") );
        let tdC = parseInt( td.getAttribute("data-column") );
        let tdR = parseInt( td.getAttribute("data-row") );
        // add logic to limit selection to match row/column within +/- 1
        if ( ( tdC <= c+1 && tdC >= c-1 ) && ( tdR <= r+1 && tdR >= r-1 ) ) {
            highlight(td);
        }
    } else
        // must be selected AND the last selected value in order to unselect (remove highlight)
    if (td.className === "selected" && td === lastSelectedDice) {
        td.className = "";
        // selectedDice.delete(td);
        selectedDiceArr.pop(td);
        letterArr.pop(td.innerHTML);
    }
    printWord();
}

function highlight(td) {
    td.className = "selected";
    // selectedDice.add(td);
    selectedDiceArr.push(td);
    letterArr.push(td.innerHTML);
}


let word = document.getElementById("word");
let length = document.getElementById("length");
let points = document.getElementById("points");
let total = document.getElementById("total");
let foundWords = document.getElementById("foundWords");

function printWord() {
    let displayWord = letterArr.join('');
    if ( displayWord.length > letterArr.length ) {  // for Qu condition
        displayWord = displayWord.toUpperCase();
    }
    word.innerHTML = displayWord;
    let wordLength = displayWord.length;
    length.innerHTML = wordLength;
    if ( dictionarySet.has(displayWord) ) {
        word.className = "valid";
        switch (wordLength) {
            case 0:
            case 1:
            case 2:
                points.innerHTML = 0;
                break;
            case 3:
            case 4:
                points.innerHTML = 1;
                break;
            case 5:
                points.innerHTML = 2;
                break;
            case 6:
                points.innerHTML = 3;
                break;
            case 7:
                points.innerHTML = 5;
                break;
            default:
                points.innerHTML = 11;
        }
    } else {
        points.innerHTML = 0;
        word.className = "";
    }
    if ( points.innerHTML > 0 ) {
        points.className = "valid";
    } else {
        points.className = "";
    }
}

function enterButton() {
    document.addEventListener('keyup', (e) => {
        switch(e.code) {
            case "Enter":
            case "click":
                submitWord();
                break;
        }
    });
}

function submitWord() {
    let displayWord = word.innerHTML;
    let submittedSet = new Set(submittedWords);
    if ( word.className === "valid" && submittedSet.has(displayWord) === false ) {
        let li = document.createElement("LI");
        li.innerHTML = displayWord;
        foundWords.appendChild(li);
        submittedWords.push(displayWord);
        if ( points.className === "valid" ) {
           
            total.innerHTML = parseInt(total.innerHTML) + parseInt(points.innerHTML);
        }
        clearMe();
    }
}

// document.getElementById("#clear").onclick = function(){clear()};

function clearMe() {
    // for ( let td of tdArray ) {
    //     td.className = "";
    // }
    for ( let i = 0 ; i < 16 ; i++ ) { 
        tdArray[i].className = "";
    }
    // document.querySelectorAll(".selected") {

    // }
    letterArr = [];
    // selectedDice = new Set();
    selectedDiceArr = [];
    printWord();
    word.innerHTML = "&nbsp";
}

function clearTotals() {
    total.innerHTML = 0;
    foundWords.innerHTML = "";
    submittedWords.length = 0;
}
