
// let board=[ [5,3,0,0,7,0,0,0,0],
//             [6,0,0,1,9,5,0,0,0],
//             [0,9,8,0,0,0,0,6,0],
//             [8,0,0,0,6,0,0,0,3],
//             [4,0,0,8,0,3,0,0,1],
//             [7,0,0,0,2,0,0,0,6],
//             [0,6,0,0,0,0,2,8,0],
//             [0,0,0,4,1,9,0,0,5],
//             [0,0,0,0,8,0,0,7,9]];

 let board=[ [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];
        

function nextEmpty(board){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j]===0 || board[i][j]==""){
                return [i,j];
            }
        }
    }
    return [-1,-1];
}

function validRow(board,row,value){
    for(let i=0;i<9;i++){
        if(board[row][i]===value)
        return false;
    }
    return true;
}

function validCol(board,col,value){
    for(let i=0;i<9;i++){
        if(board[i][col]===value)
        return false;
    }
    return true;
}

function validBox(board,row,col,value){
    let firstrow=Math.floor(row/3)*3;
    let firstcol=Math.floor(col/3)*3;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
           if(board[firstrow+i][firstcol+j]===value)
           return false;
        }
    }
    return true;
}

function isValid(board,row,col,value){
    if(validCol(board,col,value) && validRow(board,row,value) && validBox(board,row,col,value)){
        return true;
    }
    return false;
}

function solveSudoku(board){
    var empty=nextEmpty(board);
    let row=empty[0];
    let col=empty[1];
    if(row===-1){   
        return true;
    }
    for(let num=1;num<=9;num++){
        if(isValid(board,row,col,num)){
            board[row][col]=num;
            if(solveSudoku(board)){
                return true;
            }
            board[row][col]=0;
        }
    }
    return false;
}
// solveSudoku(board);
// console.log(board);


const board_=document.getElementById('board');

window.onload=function(){
    initgame()
}
function initgame(){
for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
        var cell=document.createElement('input');
        cell.id=`${r}-${c}`;
        // if(board[r][c]!==0){
        //     cell.value=board[r][c];
        //     cell.classList.add("cell-start");
        //     cell.disabled=true;
        // }
        if(r==2 || r==5){
            cell.classList.add("horizontal");
        }
        if(c==2 || c==5){
            cell.classList.add("vertical");
        }
        cell.classList.add('cell');
        board_.appendChild(cell);
    }
}
shuffle();
console.log(board);
}

function solve(){
    solveSudoku(board);
    console.log(board);
    fillBoard(board);
}
function fillBoard(board){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let cell=document.getElementById(`${i}-${j}`);
            if(board[i][j]===0){
                cell.value="";
            }
            else
            cell.value=board[i][j];
        }
    }
}
var tempboard;
function reset(){
    console.log("reset");
    fillBoard(tempboard);
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let cell=document.getElementById(`${i}-${j}`);
            cell.classList.remove('correct');
            cell.classList.remove('incorrect');
           }
    }
    document.getElementById('result').innerHTML="";
}

function validate(){
    let flag=true;

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let cell=document.getElementById(`${i}-${j}`);
            let val=Number(cell.value);
            if(cell.value==="" || isNaN(cell.value)){   
                cell.classList.remove('correct');
                cell.classList.add('incorrect');
                flag=false;
            }
           else if(board[i][j]===0 && isValid(board,i,j,val)){
            console.log(cell.value);
            // console.log(i,j);
            board[i][j]=cell.value;
            cell.classList.remove('incorrect');
            cell.classList.add('correct');
           }
           else if(board[i][j]===0){
            console.log(i,j);
            // console.log(cell.value);
            cell.classList.remove('correct');
            cell.classList.add('incorrect');
            flag=false;
           }
        }
    }
    var res=document.getElementById('result');
    if(flag){
        res.innerHTML="Congratulation! You Win";
        res.style.color="green";
    }
    else{
        res.innerHTML="You lost! Better luck next time";
        res.style.color="red";
    }

}

function shuffle(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            board[i][j]=0;
        }
    }
    console.log(board)
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
                let randomcell=document.getElementById(`${i}-${j}`);
                randomcell.value="";
                randomcell.disabled=false;
                randomcell.classList.remove('cell-start');
        }
    }

    for(let i=0;i<30;i++){
        let r=Math.floor(Math.random()*9);
        let c=Math.floor(Math.random()*9);
        let randomcell=document.getElementById(`${r}-${c}`);
        let v=1+Math.floor(Math.random()*9);
        if(isValid(board,r,c,v)){
        randomcell.value=v;
        board[r][c]=v;
        randomcell.classList.add("cell-start");
        randomcell.disabled=true;
        }
    }
     var temp=JSON.parse(JSON.stringify(board));
     if(!solveSudoku(temp)){
        shuffle();
     }
     tempboard=JSON.parse(JSON.stringify(board));
}
