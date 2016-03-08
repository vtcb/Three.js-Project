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

	var dx = [0, 1];
	var dx2 = [0, -1];
	var dy = [1, 0];
	var dy2 = [-1, 0];

	for(var i = 1; i < height-1; i++){
		for(var j = 1; j < width-1; j++){
			if(mat[i][j] === 1){
				var prob = Math.floor(Math.random()*100);
				var flag = 0;
				if(prob < 25){
					for(var k = 0; k < 4; k++) {
						var x  = i + dx[k];
						var y  = j + dy[k];
						var xx = i + dx2[k];
						var yy = j + dy2[k];

						if(x >= 0 && y >= 0 && x < height && y < width && xx >= 0 && yy >= 0 && xx < height && yy < width) {
							if(mat[x][y] === 1 && mat[xx][yy] === 1) flag = 1;
						}
					}

					if(flag === 1) mat[i][j] = 2;
				}
			}
		}
	}

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