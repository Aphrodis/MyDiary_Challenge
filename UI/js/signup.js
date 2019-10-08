const signupForm = document.querySelector('.signup-form');

const processSubmit = (e) => {
	e.preventDefault();
	// const button = document.querySelector('.signupBtn');
	setTimeout(() => {window.location.href = '../html/dashboard.html';}, 1000);
};


if (signupForm) signupForm.addEventListener('submit', processSubmit);