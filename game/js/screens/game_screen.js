var GameScreen = function(kbh, winWidth, winHeight) {
	var obj = Screen.call(this, kbh, winWidth, winHeight);

	return obj;
};

GameScreen.prototype = Object.create(Screen.prototype);
