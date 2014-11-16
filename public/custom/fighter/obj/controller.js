var CONTROLLER = {};

CONTROLLER.P1 = new FLIXI.Controller({
        left: "left",
        right: "right",
        up: "up",
        down: "down",
        attack: "/",
        special: ".",
        grab: ",",
        shield: "m",
        jump: "up"
    }, {
    	slot: 0,
    	controls: {
    		left: {axis: 0, value: function(val){
    			return (val < -0.40)
    		}},
	        right: {axis: 0, value: function(val){
    			return (val > 0.40)
    		}},
	        up: {axis: 1, value: function(val){
    			return (val < -0.40)
    		}},
	        down: {axis: 1, value: function(val){
    			return (val > 0.40)
    		}},
	        attack: {button: 0},
            special: {button: 2},
            grab: {button: 6},
            shield: {button: 7},
            jump: {button: 3}
    	}
    });

CONTROLLER.P2 = new FLIXI.Controller({
    left: "a",
    right: "d",
    up: "w",
    down: "s",
    attack: "f",
    special: "g",
    grab: "h",
    shield: "j",
    jump: "w"
}, {
    slot: 1,
    controls: {
        left: {axis: 0, value: function(val){
            return (val < -0.40)
        }},
        right: {axis: 0, value: function(val){
            return (val > 0.40)
        }},
        up: {axis: 1, value: function(val){
            return (val < -0.40)
        }},
        down: {axis: 1, value: function(val){
            return (val > 0.40)
        }},
        attack: {button: 0},
        special: {button: 2},
        grab: {button: 6},
        shield: {button: 7},
        jump: {button: 3}
    }
});