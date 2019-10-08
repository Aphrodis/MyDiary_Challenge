const signinForm = document.querySelector('.signin-form');

const processSubmit = (e) => {
	e.preventDefault();
	setTimeout(() => {window.location.href = '../html/dashboard.html';}, 1000);
};

if (signinForm) signinForm.addEventListener('submit', processSubmit);