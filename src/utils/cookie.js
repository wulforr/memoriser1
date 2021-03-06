export const setCookie = (name, value, days) => {
	let expires = '';
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toGMTString();
	}
	document.cookie = name + '=' + JSON.stringify(value) + expires + '; path=/';
};

export const getCookie = (name) => {
	let nameEQ = name + '=',
		ca = document.cookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
	}

	return null;
};

export const deleteCookie = (name) => {
	setCookie(name, '', -1);
};
