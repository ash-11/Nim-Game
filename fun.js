var ct = 0
var dp = []
var arr = [1, 3, 5, 7]

for(var i0 = 0; i0 <= arr[0]; i0++){ // initializing the js array with -1
	var a0 = []
	for(var i1 = 0; i1 <= arr[1]; i1++){
		var a1 = []
		for(var i2 = 0; i2 <= arr[2]; i2++){
			var a2 = []
			for(var i3 = 0; i3 <= arr[3]; i3++){
				a2.push(-1)
			}
			a1.push(a2)
		}
		a0.push(a1)
	}
	dp.push(a0)
}
dp[0][0][0][0] = 0;


function sol(a){ //Recursive function to calculate all the dp states
	if(dp[a[0]][a[1]][a[2]][a[3]] != -1) return dp[a[0]][a[1]][a[2]][a[3]]
	var ans = 0
	for(var ind = 0; ind < 4; ind++){
		for(var i = 1; i <= a[ind]; i++){
			a[ind] -= i
			ans = ans|sol(a)
			a[ind] += i
		}
	}
	ans = 1 - ans
	dp[a[0]][a[1]][a[2]][a[3]] = ans
	return ans
}

emp = new Image()
emp.src = "back.png"
mat = new Image()
mat.src = "img.png"
var mov = -2

function new_game(){
	mov = -2	// -2 means both player and PC can play first and choice is left to player
	arr = [1, 3, 5, 7]
	for(var i = 0; i < 16; i++) document.images[i].src = mat.src
}

function player_move(row){
	if((mov == -1 || mov == row || mov == -2) && (arr[row] > 0)){
		mov = row
		arr[row]--
		document.images[row*row + arr[row]].src = emp.src
		if(arr[0] == 0 && arr[1] == 0 && arr[2] == 0 && arr[3] == 0){
			ct++
			alert("You lose buddy..... ")
			new_game()
			if(ct >= 3){
				var ans = confirm("Want a Hint ?") // if you lose three times continuously, program asks if you need a hint
				if(ans == true){
					alert("Try giving first move to PC.") // Hint
				}
			}
		}
	}
}

function computer_move(){
	if(mov == -1) return
	mov = -1
	var possible_moves = []
	for(var ind = 0; ind < 4; ind++){
		for(var i = 1; i <= arr[ind]; i++){
			arr[ind] -= i
			if(sol(arr)){ // returns 1 if the given state is a winning state
				var b = []
				b.push(ind)
				b.push(i)
				possible_moves.push(b) // Determine all possible winning moves
			}
			arr[ind] += i
		}
	}

	if(possible_moves.length == 0){ // if there is no winning move insert all possible moves computer can play
		for(var ind = 0; ind < 4; ind++){
			for(var i = 1; i <= arr[ind]; i++){
				var b = []
				b.push(ind)
				b.push(i)
				possible_moves.push(b)
			}
		}		
	}

	var j = Math.floor(Math.random()*possible_moves.length) //randomly select one move from all possible moves, so that PC doesn't play the same move each time
	var ind = possible_moves[j][0]
	var i = possible_moves[j][1]
	arr[ind] -= i
	for(var z = 0; z < i; z++){
		document.images[ind*ind + arr[ind] + z].src = emp.src
	}

	if(arr[0] == 0 && arr[1] == 0 && arr[2] == 0 && arr[3] == 0){
		alert("Congratulations You won")
		new_game()
	}
}

function rmv() {
	document.getElementById("instructions").style.display = "none";
}

function intro() {
	var scale = 'scale(1)';
	document.body.style.webkitTransform =  scale;
 	document.body.style.msTransform =   scale;
 	document.body.style.transform = scale;
	document.getElementById("instructions").style.display = "block";
}
