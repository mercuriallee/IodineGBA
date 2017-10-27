var Gamepad2keyboard = {'0':'x', '1':'', '2':'', '3':'', '12':'', '13':'', '14':'', '15':''};
var Frame_Num = 60;
function remapGamePad(states={axis_1:[],buttons:[]}) {
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
	}
	setTimeout(function(){remapGamePad(states)}, 1000/Frame_Num);
}

function gamepadKeyDown(num) {
	console.log('Key '+num+' Down.')
	if(Gamepad2keyboard[num]) {
		simulateKeyPress(Gamepad2keyboard[num], 'keydown');
	}
}
function gamepadKeyUp(num) {
	console.log('Key '+num+' Up.')
	if(Gamepad2keyboard[num]) {
		simulateKeyPress(Gamepad2keyboard[num], 'keyup');
	}
}

function simulateKeyPress(keychar,state) {
	 let e = new Event(state);
	  e.key=keychar;    // just enter the char you want to send 
	  e.keyCode=e.key.charCodeAt(0);
	  e.which=e.keyCode;
	  e.altKey=false;
	  e.ctrlKey=false;
	  e.shiftKey=false;
	  e.metaKey=false;
	  e.bubbles=true;
	  document.dispatchEvent(e);
}

remapGamePad();

