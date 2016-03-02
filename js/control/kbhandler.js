/** KeyBoard Handler
 *
 * Answers if a key is pressed.
 * Uses listeners for 'keydown' and 'keyup' events.
 *
 * pressed: Object with key states.
 * qty    : Quantity of pressed keys.
 */
var KBHandler = function() {
    var pressed = {};
    var qty = 0;

    var keydown_listener = function(event) {
        var code = event.keyCode;

        if(!pressed[code]) qty++;

        pressed[code] = true;
    };

    var keyup_listener = function(event) {
        var code = event.keyCode;

        if(pressed[code]) qty--;

        pressed[code] = false;
    };

    window.addEventListener('keydown', keydown_listener, false);
    window.addEventListener('keyup',   keyup_listener,   false);

    return {
        isPressed       : function(code) {
            return pressed[code];
        },

        release         : function(code) {
            if(pressed[code]) qty--;

            pressed[code] = false;
        },

        anythingPressed : function() {
            return qty > 0;
        },

        getPressed      : function() {
            return pressed;
        }
    };
};
