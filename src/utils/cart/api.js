import { getSession } from './session';
import { isEmpty } from 'lodash';

export const getApiCartConfig = () => {
	
	const config = {
		headers: {
			'X-Headless-CMS': true,
		},
	}
	
	var hours = 20; // to clear the localStorage after 1 hour
               // (if someone want to clear after 8hrs simply change hours=8)
	var now = new Date().getTime();
	var setupTime = localStorage.getItem('setupTime');
	if (setupTime == null) {
		localStorage.setItem('setupTime', now)
	} else {
		if(now-setupTime > hours*60*60*1000) {
			localStorage.clear()
			localStorage.setItem('setupTime', now);
		}
	}

	const storedSession = getSession();
	
	if ( !isEmpty( storedSession ) ) {
		config.headers['x-wc-session'] = storedSession;
	}
	
	return config;
}

