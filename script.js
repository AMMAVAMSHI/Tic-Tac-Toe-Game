// Select all game boxes
let boxes=document.querySelectorAll(".box");
// Select buttons
let mainResetBtn=document.querySelector("#main-reset-btn");
let boardResetBtn = document.querySelector("#reset-btn");
let popupNewBtn = document.querySelector("#popup-new-btn");
// Popup elements
let popup = document.querySelector(".popup");  
let overlay = document.querySelector(".overlay"); 
let popupMsg = document.querySelector("#popup-msg");

// Track turns: true = O's turn, false = X's turn
let turnO=true; 
let count=0;   // Track number of moves
// Winning patterns for Tic-Tac-Toe
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

// Function to reset the game
const resetGame=()=>{
 turnO=true; // Reset turn to O
 count=0; // Reset move count
 enableBoxes(); // Enable all boxes and clear text
closePopup(); // Close any open popup
};

// Function to open popup with message
function openPopup(message){
    popupMsg.innerText = message;
    popup.style.display = "block";
    overlay.style.display = "block";
}

// Function to close popup
function closePopup(){
    popup.style.display = "none";
    overlay.style.display = "none";
}
// Add click events to each box
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        // Fill box with O or X depending on turn
        if(turnO){
        box.innerText="O";
        turnO=false;

    }else{
        box.innerText="X";
        turnO=true;
    }
    box.disabled=true; // Prevent further clicks
    count++; // Increase move count
    
    let isWinner=checkWinner(); // Check if someone won

     // If all boxes filled and no winner, it's a draw
    if(count===9 && !isWinner){
        openPopup("Game Draw!");
    }
    
    });
});
    // Disable all boxes
    const disableBoxes=()=>{
        for(let box of boxes){
            box.disabled=true;
        }
    };
// Enable all boxes and clear text
    const enableBoxes=()=>{
        for(let box of boxes){
            box.disabled=false;
            box.innerText="";
        }
    };
// Show winner popup and disable board
const showWinner=(winner)=>{
    openPopup(`Winner is ${winner}`);
     disableBoxes();
        
};
// Check if there is a winner
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

// Event listeners for buttons
mainResetBtn.addEventListener("click",resetGame);
popupNewBtn.addEventListener("click",resetGame);
boardResetBtn.addEventListener("click", resetGame);


