function validateForm( doneMessage, event) {
	event.preventDefault();
	const target = event.target || event.srcElement;
	const req = document.getElementsByTagName('form');
	const values = req;
    if ( checkValues(values) === true) {
		document.querySelector('.display_message').textContent = doneMessage;
    }
    return checkValues(values);
}
function checkValues(values){
   for(let i=0;i<values.length;i++){
       if(values[i].value === "") {
           return false;
       }
   }
   return true;
}

function editEntry() {
  const doneMessage = 'Your entry is now updated!';
  const none_empty = validateForm(doneMessage, event);
  if ( none_empty === true) {

  }
  setTimeout(() => {window.location.href = '../html/allentries.html';}, 1000);
}

