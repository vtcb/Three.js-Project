var GameScreen = function(winWidth, winHeight) {
	var obj = Screen.call(this, winWidth, winHeight);

	return obj;
};

GameScreen.prototype = Object.create(Screen.prototype);
