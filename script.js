let cHits=0;
let uHits=0;
var turnflag;
var gameHasBegun=false;
var gameIsOver=false;
var placeShip;
var checkHit;
let text=document.getElementById("gameText");
function genBoard(){
	cHits=0;
	uHits=0;
	gameIsOver=false;
	gameHasBegun=false;	
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
	text.innerHTML="Left click main ship to move; Right/middle click to rotate";
	let count1=0;
	while(count1<3){
		let row=Math.floor(Math.random()*5);
		let col=Math.floor(Math.random()*5);		
		let userShip1=document.getElementById("p"+row+""+col);			
		
		let offset=1;			
		//flip a coin for vertical or horizontal
		let coinFlip=Math.floor(Math.random()*2);		
		//let offSetShip=0;
		//decide offset direction, checking for other ships
		console.log(coinFlip);	
		console.log(row);			
		console.log(col);
		//vertical
		if(coinFlip==0){			
			if(row==4){			
				offset=-1;			
			}
			console.log("Offset will be "+offset+" vertically");
			console.log("p"+(row+offset)+""+(col));
			let detectShip=document.getElementById("p"+(row+offset)+""+(col));
			if(detectShip.classList.contains("placedUser")){
				console.log("Collision when placing ship "+(count1+1)+" in "+row+","+col);
				continue;
			}
			offsetShip=document.getElementById("p"+(row+offset)+""+col);
			console.log("Putting offset of "+count1+" vertically in "+"p"+(row+offset)+""+col);
		}
		//horizontal
		else if(coinFlip==1){
			if(col==4){			
				offset=-1;			
			}
			let detectShip=document.getElementById("p"+(row)+""+(col+offset));
			if(detectShip.classList.contains("placedUser")){
				console.log("Collision when placing ship "+(count1+1)+" in "+row+","+col);
				continue;
			}
			offsetShip=document.getElementById("p"+row+""+(col+offset));
			console.log("Putting offset of "+count1+" horiz in "+"p"+row+""+(col+offset));
		}
		//place ship and offset
		if(count1<3 && !userShip1.classList.contains("placedUser")){			
			userShip1.classList.add("placedUser","mainShip","ship"+count1,);			
			offsetShip.classList.add("placedUser","extraShip","ship"+count1+"extra");
			count1++;
		}
	}	
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
	//Allow user to move their own ships before game begins	
	let selected=false;
	document.querySelectorAll('.userCol').forEach(item => {
		shipClass="";
		selectedPosition=0;
		extraPosition=0;
		extraOffset=0;
		moveShip=function(event){						
			if(!gameHasBegun && !selected && item.classList.contains("mainShip")){				
				selectedPosition=item.id.substring(1, 3);				
				shipClass=item.classList[3];
				document.querySelectorAll('.'+shipClass+"extra").forEach(item2 => {
					//alert("Found at "+item2.id);
					extraPosition=item2.id.substring(1, 3);
					item2.className="userCol";
				})						
				//alert("Extra: "+extraPosition);
				//alert("Main: "+selectedPosition);
				extraOffset=(extraPosition-selectedPosition);
				//alert("offset:"+extraOffset);
				
				//alert(shipClass);
				selected=true;		
				//item.classList.remove("placedUser");					
				item.className="userCol";				
			}
			else if(!gameHasBegun && selected && !item.classList.contains("placedUser")){
				selectedPosition=parseInt(item.id.substring(1, 3));
				extraOffset=selectedPosition+extraOffset;
				//alert(extraPosition);
				item.classList.add("placedUser","mainShip",shipClass);
				document.getElementById("p"+extraOffset).classList.add("placedUser","extraShip",shipClass+"extra");
				selected=false;
			}	
		}
		rotate=function(event){
			shipClass="";
			selectedPosition=0;
			extraPosition=0;
			extraOffset=0;
			if(!gameHasBegun && item.classList.contains("mainShip")){				
				selectedPosition=parseInt(item.id.substring(1, 3));				
				shipClass=item.classList[3];
				document.querySelectorAll('.'+shipClass+"extra").forEach(item2 => {
					//alert("Found at "+item2.id);
					extraPosition=item2.id.substring(1, 3);
					item2.className="userCol";
				})						
				//alert("Extra: "+extraPosition);
				//alert("Main: "+selectedPosition);
				extraOffset=(extraPosition-selectedPosition);
				//alert("offset:"+extraOffset);
				if(extraOffset==-1){
					//alert(typeof(selectedPosition));
					extraOffset=parseInt(selectedPosition+10);
				}
				else if(extraOffset==10){
					extraOffset=selectedPosition-1;
				}
				else if(extraOffset==-10){
					extraOffset=selectedPosition+1;
				}
				else if(extraOffset==1){
					extraOffset=selectedPosition-10;
				}
				//alert("New offset: p"+extraOffset);
				//alert(shipClass);
				//selected=true;		
				//item.classList.remove("placedUser");					
				//item.className="userCol";	
				document.getElementById("p"+extraOffset).classList.add("placedUser","extraShip",shipClass+"extra");
			}				
		}		
		item.addEventListener('auxclick',rotate);
		item.addEventListener('click',moveShip);
	})
	document.getElementById("start").style.display = "block";
}
function restart(){	
	genBoard();
}
function startGame(){
	gameHasBegun=true;
	document.getElementById("start").style.display = "none";
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