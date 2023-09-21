//game constants & variables
let inputDir = {x : 0, y: 0};
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio ('move.mp3');
const musicsound = new Audio ('music.mp3');
let speed = 5 ;
let score = 0 ;
let lastPaintTime = 0 ;
let snakeaArr = [ 
    {x : 13 , y : 12}
];
food = { x : 6 , y : 7} ;



//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed ){
        return;
    }
    lastPaintTime = ctime ;
    gameEngine ();

}
function isCollide(snake){
    //if you bump into yourself
    for (let i = 1 ; i < snakeaArr.length; i++) {
        if (snake[i].x === snake[0].x && snake [i].y === snake [0].y){
            return true ;
        
        }
    }  

    // If you bump into thr wall
    
         if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y>= 18 || snake[0].y <= 0){
           return true ;
    }

    
}

function gameEngine(){
    // part 1 : updating the snake array & food 
    if (isCollide(snakeaArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = {x : 0 , y: 0};
        alert("Game over . press any key to play again !");
        snakeaArr = [{x : 13, y: 15}];
        musicsound.play();
        score = 0 ;

    }

    // If you have eaten the food , increment the score and renegate the food
     if (snakeaArr[0].y=== food.y && snakeaArr[0].x === food.x) {
        foodsound.play();
        score += 1 ;
        if (score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML= "Hiscore :" + hiscoreval;

        }
        scoreBox.innerHTML = "score:"+ score ;
        snakeaArr.unshift({x: snakeaArr[0].x + inputDir.x , y : snakeaArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = { x: Math.round( a + (b-a)* Math.random()), y : Math.round(a+(b-a)*Math.random())}
     }
     // Moving the snake 
     for (let i  = snakeaArr.length - 2 ; i>= 0; i--) {
        snakeaArr[i+1] = {...snakeaArr[i]};
        
     }
      snakeaArr[0].x += inputDir.x;
      snakeaArr[0].y += inputDir.y;

    // part 2 : Display the snake and food 
    // Display the snake
    board.innerHTML = "";
    snakeaArr.forEach((e, index)=>{
        snakeElement = document.createElement( 'div');
        snakeElement.style.gridRowStart = e.y ;
        snakeElement.style.gridColumnStart = e.x ;

        if ( index === 0){
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
     // Display the food 
     foodElement = document.createElement( 'div');
     foodElement.style.gridRowStart = food.y ;
     foodElement.style.gridColumnStart = food.x ;
     foodElement.classList.add('food') 
     board.appendChild(foodElement);



}






// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0 ;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))

}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscore.innerHTML= "Hiscore :" + hiscore;
}
   
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = { x: 0 , y : 1 } // start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1 ;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0 ;
            break;

         case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1 ;
            inputDir.y = 0 ;
             break;

        default:
            break;
    }

});