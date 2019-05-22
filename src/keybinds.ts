import { saveState } from './stores';

export function handleKeyPress(event) {    
	if (event.charCode === 115) {		
		saveState()
	}
}

