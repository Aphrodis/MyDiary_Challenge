const signinForm = document.querySelector('.signin-form');

const processSubmit = (e) => {
	e.preventDefault();
	setTimeout(() => {window.location.href = './dashboard.html';}, 1000);
};

if (signinForm) signinForm.addEventListener('submit', processSubmit);