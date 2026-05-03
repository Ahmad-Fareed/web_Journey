let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newBtn=document.querySelector("#new-btn");
let msg=document.querySelector(".msg");
let message=document.querySelector("#message");

let turn0=true;
const winPatrn=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]];

const resetGame=()=>{
    enableBoxes();
    turn0=true;
    msg.classList.add("hide");
}

    boxes.forEach((box)=>{
        box.addEventListener("click",()=>{
            console.log("box clicked");
            if(turn0){
                box.innerHTML="X";
                turn0=false;
            }
            else{
                box.innerHTML="O";
                turn0=true;
            }
            box.disabled=true;
            checkWin();
        });
    });

    const disableBoxes=()=>{
        boxes.forEach((box)=>{
            box.disabled=true;
        });

    }

    const enableBoxes=()=>{
        boxes.forEach((box)=>{
            box.disabled=false;
            box.innerHTML="";
        });

    }

    function showMsg(winner){
        message.innerHTML=`${winner} wins the game`;
        msg.classList.remove("hide");
        disableBoxes();
    }
    function checkWin(){
        for(let pattern of winPatrn){
            let val1=boxes[pattern[0]].innerHTML;
            let val2=boxes[pattern[1]].innerHTML;
            let val3=boxes[pattern[2]].innerHTML;
            if(val1!="" && val1==val2 && val2==val3){
                if(val1===val2 && val2===val3){
                    console.log("winner ");
                    showMsg(val1);
                }
            }
        }
    }
resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",resetGame);
