export class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.createdOn = new Date();
    }
}