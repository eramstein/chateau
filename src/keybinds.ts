import { saveState, resetState } from './stores';

export function handleKeyPress(event) {	
	// s -> save   
	if (event.charCode === 115) {		
		saveState()
	}
	// r -> reset
	if (event.charCode === 114) {		
		resetState()
	}
}
