let inputDir={x:0,y:0} //matlab snake abhi rest pe h (0,0)
const foodSound=new Audio('food.mp3')
const gameOverSound=new Audio('gameover.mp3')
const moveSound=new Audio('move.mp3')
const musicSound=new Audio('music.mp3')
let speed=8;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:13, y:15}];
food ={x:6,y:7};



//Game functions
function isCollide(snake){
   for (let i = 0; i < snakeArr.length; i++) {
    if(snake[i].x=== snake[0].x && snake[i]===snake[0].y){
        return true;}}
    //if you bump into the wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true;

        }
        return false;

}

function gameEngine(){
    musicSound.play();
    // Part 1 ; updating the snake variable(array) and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over.Press any key to play again!");
        snakeArr=[{x:13, y:15}]
        musicSound.play();
        score=0;
        scoreBox.innerHTML="Score: " + score;



    }
// if you have eaten the food, regenerate the food and increase score by 1
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play()
        score += 1;
        scoreBox.innerHTML="Score: " + score;


        snakeArr.unshift({x:snakeArr[0].x+inputDir.x + inputDir.x,y:snakeArr[0].y+inputDir.y}); // ek aur mundi ghusane ko
        let a=2;
        let b=16; //thoda sa easy rakh rahi hun game ko . acha rahega

        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())} //formula to generate random number between a and b

    }
//Moving the Snake
    for(let i=snakeArr.length-2;i>=0;i--){

        snakeArr[i+1]={...snakeArr[i]}; //... se ek naya object create kar rahe h

}

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2 : render the snake 
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y; // dhyan do ki row y h aur column x h 
        snakeElement.style.gridColumnStart=e.x;
        if (index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');


        }
        board.appendChild(snakeElement);

    });


    //Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y; // dhyan do ki row y h aur column x h 
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}
//ctime is current time
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
        return;

    }  //kitne kitne seconds baad render ho jata h
    lastPaintTime=ctime;
    gameEngine();

    
}
//main logic starts here
window.requestAnimationFrame(main); //No flicker. for high quality animation
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} //start the game on pressing any key
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp") //jab snake move karega tab koi sa ek zero rahega
            inputDir.x=0;
            inputDir.y=-1;

            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
        }
})








