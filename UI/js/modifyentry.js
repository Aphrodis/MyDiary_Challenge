function checkValues(values) {
  // eslint-disable-next-line indent
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < values.length; i++) {
    if (values[i].value === '') {
      return false;
    }
  }
  return true;
}
function validateForm(doneMessage, event) {
  event.preventDefault();
  const target = event.target || event.srcElement;
  const req = document.getElementsByTagName('form');
  const values = req;
  if (checkValues(values) === true) {
    document.querySelector('.display_message').textContent = doneMessage;
  }
  return checkValues(values);
}

function editEntry() {
  const doneMessage = 'Your entry is now updated!';
  // eslint-disable-next-line no-restricted-globals
  const notEmpty = validateForm(doneMessage, event);
  // if (notEmpty === true) {
  // }
  setTimeout(() => { window.location.href = '../html/dashboard.html'; }, 1000);
}
