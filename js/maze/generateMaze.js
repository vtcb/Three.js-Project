var GenerateMaze = function(w, h, I_ini1, J_ini1, I_end1, J_end1){
	var coordGenerator = function(_var){
		return 2*_var + 1;
	}

	var mat = [];
	var width = coordGenerator(w);
	var height = coordGenerator(h);
	var I_ini = coordGenerator(I_ini1);
	var J_ini = coordGenerator(J_ini1);
	var I_end = coordGenerator(I_end1);
	var J_end = coordGenerator(J_end1);

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

 	var markAnt = function(x, y, i){
 		switch(i) {
 			case 0:
 				mat[x][y-1] = 2;
 				break;
 			case 1:
 				mat[x][y+1] = 2;
 				break;
 			case 2:
 				mat[x-1][y] = 2;
 				break;
 			case 3:
 				mat[x+1][y] = 2;
 				break;
 		}

 	};

	var dfs = function(atI, atJ){
		mat[atI][atJ] = 2;
		if(atI === I_end && atJ === J_end) return;

		var v = [];
		for(var i = 0; i < 4; i++){
			var x = atI + dirx[i];
			var y = atJ + diry[i];

			if(x >= 0 && y >= 0 && x < height && y < width && mat[x][y] === 0){
				v.push([x, y, i]);
			}
		}

		while(v.length > 0){
			var n = Math.floor(Math.random()*v.length);
			if(mat[v[n][0]][v[n][1]] === 0){
				dfs(v[n][0], v[n][1]);
				markAnt(v[n][0], v[n][1], v[n][2]);
			}
			v.splice(n, 1);
		}
	};

	dfs(I_ini, J_ini);

	/*
	for(var i = 0; i < height; i++){
		console.log(mat[i]);
	}
	*/

	return{
		getMat: function(){
			return mat;
		},
		getWidth: function(){
			return width;
		},
		getHeight: function(){
			return height;
		}
	};
}; 