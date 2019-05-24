import { saveState, resetState, State } from './stores';

export function handleKeyPress(event) {	
	// s -> save   
	if (event.charCode === 115) {		
		saveState()
	}
	// r -> reset
	if (event.charCode === 114) {		
		resetState()
	}
	// space -> toggle pause
	if (event.charCode === 32) {		
		State.togglePause()
	}
	// plus -> speed up	
	if (event.charCode === 43) {		
		State.updateSpeed(1)
	}
	// minus -> slow down
	if (event.charCode === 45) {		
		State.updateSpeed(-1)
	}
}
