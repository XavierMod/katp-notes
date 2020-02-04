import uniqid from 'uniqid';

export default class Note {
    constructor (title, body, ID) {
        this.title = title;
        this.body = body;
        this.ID = ID;
    } 

    getOwnId() {
        const newID = uniqid();
        this.ID = newID;
        return newID;
    }
    
}
