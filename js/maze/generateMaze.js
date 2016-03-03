var coordGenerator = function(_var){
	return 2*_var + 1;
}

var mazeGenerator = function(width, height, I_ini, J_ini, I_end, J_end){
	var mat = [];

	for(var i = 0; i < height; i++){
		mat[i] = [];
 	}

 	for(var i = 0; i < height; i+=2){
 		for(var j = 0; j < width; j++){
 			mat[i][j] = 1;
 		}
 	}

 	for(var i = 1; i < height; i+=2){
 		for(var j = 0; j < width; j+=2){
 			mat[i][j] = 1;
 		}
 		for(var j = 1; j < width; j+=2){
 			mat[i][j] = 0;
 		}
 	}


 	var dirx = [0, 0, 2, -2];
 	var diry = [2, -2, 0, 0];

	var dfs = function(atI, atJ){
		mat[atI][atJ] = 2;
		if(atI === I_end && atJ === J_end) return;

		var v = [];
		for(var i = 0; i < 4; i++){
			var x = atI + dirx[i];
			var y = atJ + diry[i];

			if(x >= 0 && y >= 0 && x < height && y < width && mat[x][y] === 0){
				if(i === 0){
					mat[x][y-1] = 2;
				}
				else if(i === 1){
					mat[x][y+1] = 2;
				}
				else if(i === 2){
					mat[x-1][y] = 2;
				}
				else{
					mat[x+1][y] = 2;
				}
				dfs(x, y);
			}
		}
	};

	dfs(I_ini, J_ini);

	for(var i = 0; i < height; i++){
		console.log(mat[i]);
	}

	return mat;
}; 