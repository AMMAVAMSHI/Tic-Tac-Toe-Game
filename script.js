let boxes=document.querySelectorAll(".box");
let mainResetBtn=document.querySelector("#main-reset-btn");
// Board Reset Game button below the board
let boardResetBtn = document.querySelector("#reset-btn");
let popupNewBtn = document.querySelector("#popup-new-btn");
let popup = document.querySelector(".popup");     // ADD
let overlay = document.querySelector(".overlay"); // ADD
let popupMsg = document.querySelector("#popup-msg"); // ADD

let turnO=true;  //player x and player O
let count=0;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>{
 turnO=true;
 count=0;
 enableBoxes();
closePopup();
};

//add popup functions 
function openPopup(message){
    popupMsg.innerText = message;
    popup.style.display = "block";
    overlay.style.display = "block";
}

function closePopup(){
    popup.style.display = "none";
    overlay.style.display = "none";
}

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){
        box.innerText="O";
        turnO=false;

    }else{
        box.innerText="X";
        turnO=true;
    }
    box.disabled=true;
    count++;
    

    let isWinner=checkWinner();
    if(count===9 && !isWinner){
        openPopup("Game Draw!");
    }
    
    });
});
    
    const disableBoxes=()=>{
        for(let box of boxes){
            box.disabled=true;
        }
    };

    const enableBoxes=()=>{
        for(let box of boxes){
            box.disabled=false;
            box.innerText="";
        }
    };
const showWinner=(winner)=>{
    openPopup(`Winner is ${winner}`);
     disableBoxes();
        
};

    const checkWinner=()=>{
       for(let pattern of winPatterns){
            let pos1Val=boxes[pattern[0]].innerText;
            let pos2Val=boxes[pattern[1]].innerText;
            let pos3Val=boxes[pattern[2]].innerText;
            if(pos1Val!=="" && pos2Val!=="" && pos3Val!==""){
                if(pos1Val===pos2Val && pos2Val===pos3Val){
                    showWinner(pos1Val);
                    return true;
                }
            }
       }
       return false;
    };


mainResetBtn.addEventListener("click",resetGame);
popupNewBtn.addEventListener("click",resetGame);
boardResetBtn.addEventListener("click", resetGame);


