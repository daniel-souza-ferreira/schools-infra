import { ResourceNotFoundError } from './errors/resource-not-found-error.js';

export class DeleteSchoolUseCase {
    constructor(schoolsRepository) {
        this.schoolsRepository = schoolsRepository
    }

    async execute(id) {
        const targetSchool = await this.schoolsRepository.getById(id)
        if (!targetSchool) {
            throw new ResourceNotFoundError()
        }

        const result = await this.schoolsRepository.delete(id)
        return {
            result
        }
    }
}