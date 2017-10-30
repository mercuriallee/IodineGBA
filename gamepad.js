const Gamepad2keyboard = {'1':88, '2':90, '3':16, '4':65, '5':83, '9':13, '10':80, '14':38, '15':40, '16':37, '17':39};
const Arrows = [16, 17, 14, 15];
var Frame_Num = 60;
function remapGamePad(states={axis_i:-1,buttons:[]}) {
	let gp = window.navigator.getGamepads()[0];
	if(gp) {
		for(let i=0; i<gp.buttons.length; i++) {
			if(gp.buttons[i].pressed) {
				if(!states['buttons'][i]) gamepadKeyDown(i);
				states['buttons'][i] = true;
			} else {
				if(states['buttons'][i]) gamepadKeyUp(i);
				states['buttons'][i] = false;
			}
		}
		//arrow_index: [left, right, up, down];
		let axes = [gp.axes[0],gp.axes[1]];
		let [arrow_index, arrow_value] = axes.reduce((i_m,e,i)=>Math.abs(i_m[1])<Math.abs(e)?[i,e]:i_m,[-1,0]);
		if(arrow_value > 0 ) {
			arrow_index = 2*arrow_index+1;
		} else {
			arrow_index = 2*arrow_index;
		}
		if(Math.abs(arrow_value) < 0.5) {
			if(states.axis_i !== -1) {
				gamepadKeyUp(Arrows[states.axis_i]);
				states.axis_i = -1;
			}
		}
		else if(states.axis_i !== arrow_index) {
			gamepadKeyUp(Arrows[states.axis_i]);
			gamepadKeyDown(Arrows[arrow_index]);
			states.axis_i = arrow_index;
		}
	}
	setTimeout(function(){remapGamePad(states)}, 1000/Frame_Num);
}

function gamepadKeyDown(num) {
	if (typeof num !== 'number') return;
	console.log('Key '+num+' Down.')
	if(Gamepad2keyboard[num]) {
		simulateKeyPress(Gamepad2keyboard[num], 'keydown');
	}
}
function gamepadKeyUp(num) {
	if (typeof num !== 'number') return;
	console.log('Key '+num+' Up.')
	if(Gamepad2keyboard[num]) {
		simulateKeyPress(Gamepad2keyboard[num], 'keyup');
	}
}

function simulateKeyPress(keycode,state) {
	 let e = new Event(state);
	  //e.key=keychar;    // just enter the char you want to send 
	  e.keyCode=keycode;
	  e.which=e.keyCode;
	  e.altKey=false;
	  e.ctrlKey=false;
	  e.shiftKey=false;
	  e.metaKey=false;
	  e.bubbles=true;
	  document.dispatchEvent(e);
}

remapGamePad();

