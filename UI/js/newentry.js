const newEntry = document.querySelector('.js-form-newEntry');

const submitEntry = (e) => {
	e.preventDefault();
	setTimeout(() => {window.location.href = '../html/allentries.html';}, 1000);
};

if (newEntry) newEntry.addEventListener('submit', submitEntry);