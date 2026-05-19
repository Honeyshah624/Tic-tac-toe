const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const bttn = document.querySelector(".btn");

let currntpos;
let gamegrid;

const winpos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initgame() {

    currntpos = 'X';
    
    gamegrid = ["", "", "", "", "", "", "", "", ""];

    gameinfo.innerText = `Current player - ${currntpos}`;

    bttn.classList.remove("active");

    boxes.forEach((box, idx) => {
        box.innerText = "";
        boxes[idx].style.pointerEvents = "all";
        box.classList = `box box${idx+1}`;
    })
}
initgame();


function swapTurn() {

    if(currntpos === "X")
        currntpos = "O";
    else
        currntpos = 'X';

    gameinfo.innerText = `Current player - ${currntpos}`;
}

function gameover() {
    let ans = "";

    winpos.forEach((pos) => {

        if( (gamegrid[pos[0]] !== "" || gamegrid[pos[1]] !== "" || gamegrid[pos[2]] !== "")  &&  (gamegrid[pos[0]] === gamegrid[pos[1]] ) && (gamegrid[pos[1]] === gamegrid[pos[2]]) ) {

            if(gamegrid[pos[0]] === "X")
                ans = "X";

            else
                ans = "O";


            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            
            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");


        }  
    })

    if(ans !== "") {
        gameinfo.innerText = `Winner player ${ans}`;
        bttn.classList.add("active");
        return;
    }

    let cnt = 0;
    gamegrid.forEach((box) => {
        if(box !== "")
            cnt++;
    });

    if(cnt === 9) {
        gameinfo.innerText = `Game Tied`;
        bttn.classList.add("active");
    }
}

function handleclick(idx) {
    if(gamegrid[idx] === "") {

        boxes[idx].textContent = currntpos;

        gamegrid[idx] = currntpos;

        boxes[idx].style.pointerEvents = "none";

        swapTurn();

        gameover();
    }
}

boxes.forEach((box, idx) => {
    box.addEventListener("click", () => {
        handleclick(idx);
    })
});

bttn.addEventListener("click", initgame);