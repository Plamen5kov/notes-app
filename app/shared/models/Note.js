export class Note {
    constructor(title, content) {
        if (!title) {
            throw new Error("Note title not set!");
        }

        if (!content) {
            throw new Error("Note content not set!");
        }

        this.title = title;
        this.content = content;
    }
}

