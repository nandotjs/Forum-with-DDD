import { randomUUID } from "node:crypto";

export class Instructor {
    public id: string;
    public title: string;

    constructor(title: string, id?: string) {
        this.title = title;
        this.id = id ?? randomUUID();
    }
}