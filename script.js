let cHits=0;
let uHits=0;
var turnflag;
var gameIsOver=false;
var placeShip;
var checkHit;
let text=document.getElementById("gameText");
function genBoard(){
	cHits=0;
	uHits=0;
	gameIsOver=false;	
	document.getElementById("restart").style.display = "none";
	let playerBoard=document.getElementById("game1");
	playerBoard.innerHTML="";
	let compBoard=document.getElementById("game2");
	compBoard.innerHTML="";	
	for(i=0;i<5;i++){				
		let userRow=document.createElement("DIV");				
		let compRow=document.createElement("DIV");				
		userRow.setAttribute('id', 'p'+i);
		compRow.setAttribute('id', 'c'+i);
		userRow.setAttribute('class', 'userRow');	
		compRow.setAttribute('class', 'compRow');	
		playerBoard.appendChild(userRow);
		compBoard.appendChild(compRow);		
		for(j=0;j<5;j++){			
			let currUserRow=document.getElementById("p"+i);
			let currCompRow=document.getElementById("c"+i);
			let ucol=document.createElement("DIV");
			let ccol=document.createElement("DIV");
			ucol.setAttribute('id', 'p'+i+""+j);
			ccol.setAttribute('id', 'c'+i+""+j);			
			ucol.setAttribute('class', 'userCol');
			ccol.setAttribute('class', 'compCol');
			currUserRow.appendChild(ucol);
			currCompRow.appendChild(ccol);
		}
	}
	setShips();	
}

function setShips(){	
	let shipCount=3;	
	text.innerHTML="Click your board to place your ships <br /> "+shipCount+" ships remaining";
	let count1=0;	
		document.querySelectorAll('.userCol').forEach(item => {						
			placeShip=function(event){				
				if(count1<3 && !item.classList.contains("placedUser")){					
					item.classList.add("placedUser");
					shipCount--;
					text.innerHTML="Click your board to place your ships <br /> "+shipCount+" ships remaining";
					count1++;
					if(count1==3){
						text.innerHTML="The computer has placed their ships. You may go first. Choose a space by clicking on the opponent's board";
						startGame();	
					}
				}				
			}
			item.addEventListener('click',placeShip);
		})
	let count2=0;
	while(count2<3){
		let row=Math.floor(Math.random()*5);
		let col=Math.floor(Math.random()*5);		
		let compShip=document.getElementById("c"+row+""+col);
		if(count2<3 && !compShip.classList.contains("placedComp")){			
			compShip.classList.add("placedComp");
			count2++;
		}
	}	
}
function restart(){	
	genBoard();
}
function startGame(){
	document.querySelectorAll('.compCol').forEach(item2 => {				
		checkHit=function (event){						
			if(!item2.classList.contains("miss") && !item2.classList.contains("hit")){
				if(!gameIsOver && turnFlag==false && !item2.classList.contains("placedComp")){
					item2.classList.add("miss");
					turnFlag=true;
					compTurn();				
				}
				else if(!gameIsOver && turnFlag==false && item2.classList.contains("placedComp")){
					uHits++;
					item2.classList.add("hit");
					turnFlag=true;
					compTurn();					
				}
			}			
		}
		item2.addEventListener('click',checkHit);	
	})	
	userTurn();
}
function userTurn(){	
	turnFlag=false;
}

function compTurn(){
	if(uHits==3){
		endGame(2);
	}
	let cturnFlag=false;	
	while(cturnFlag==false){
		let row=Math.floor(Math.random()*5);
		let col=Math.floor(Math.random()*5);		
		let compAttack=document.getElementById("p"+row+""+col);		
		if(!compAttack.classList.contains("attacked")){			
			compAttack.classList.add("attacked");
			if(compAttack.classList.contains("placedUser")){
				cHits++;
				compAttack.classList.add("hit");
				if(cHits==3){
					endGame(1);					
				}				
			}
			else{
				compAttack.classList.add("miss");
			}
			cturnFlag=true;
		}		
	}
	userTurn();
}
function endGame(gameOver){
	gameIsOver=true;
	document.getElementById("restart").style.display = "block";
	if(gameOver==1){
		text.innerHTML="You lose! Computer sank your battleships";				
	}
	else if(gameOver==2){
		text.innerHTML="You win! You sank all the battleships";		
	}	
}