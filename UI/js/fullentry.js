const deleteEntryContainer= document.querySelector(".deleteEntryContainer");
const deleteEntry= document.querySelector(".deleteEntry");
const cancelDeleteBtn = document.querySelector(".cancel-delete");
const confirmDeleteBtn = document.querySelector(".allow-delete");

const showDeleteEntry = (e) => {
    deleteEntryContainer.style.display ='block';
};
const hideDeleteEntry = (e) => {
	deleteEntryContainer.style.display ='none';
};

const allowDeleteEntry = (e) =>{
	deleteEntryContainer.style.display ='none';
};

if (deleteEntry) {
    deleteEntry.addEventListener('click', showDeleteEntry);
}
if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', allowDeleteEntry);
}
if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', hideDeleteEntry);
}