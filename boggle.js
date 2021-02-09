// source of boggle dice faces 
// https://boardgames.stackexchange.com/questions/29264/boggle-what-is-the-dice-configuration-for-boggle-in-various-languages?rq=1
window.onload = initialize;

function initialize() { // loads these functions on page load
    rollDice();
    select();
}

function reset() {
    rollDice();
    clear();
    letterArray = [];
    selectedDice = new Set();
    printWord();
    word.innerHTML = "_________";
    
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

let selectedDice = new Set();
let letterArr = [];

function select(td) {
    if (td.className === "" || td.className === null ) {
        td.className = "selected";
        selectedDice.add(td);
        letterArr.push(td.innerHTML);
    } else
    if (td.className === "selected" ) {
        td.className = "";
        selectedDice.delete(td);
        letterArr.pop(td.innerHTML);
    }
    printWord();
}

let word = document.getElementById("word");

function printWord() {
    word.innerHTML = [letterArr.join('')];
}

document.getElementById("#clear").onclick = clear();

function clear() {
    // for ( let td of tdArray ) {
    //     td.className = "";
    // }
    // for ( let i = 0 ; i < 16 ; i++ ) { 
    //     tdArray[i].className = "";
    // }
    for ( let td in selectedDice ) {
        td.className = "";
    }
}



// create word
