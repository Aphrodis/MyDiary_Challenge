// class for defining an entry model

class Entry {
    constructor(id, title, description) {
        this.id = id;
        this.setCreationDate();
        this.title = title;
        this.description = description;
    }

    setCreationDate() {
        const currentDate = new Date();
        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const fullDate = `${year}-${month + 1}-${date}`;
        this.createdOn = fullDate;
        return this.createdOn;
    }
}

export default Entry;
