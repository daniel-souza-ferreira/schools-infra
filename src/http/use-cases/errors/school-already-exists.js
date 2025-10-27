export class SchoolAlreadyExists extends Error {
    constructor() {
        super('School already exists.')
    }
}