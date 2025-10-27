import { ResourceNotFoundError } from './errors/resource-not-found-error.js';

export class GetSchoolUseCase {
    constructor(schoolsRepository, dependenciesRepository) {
        this.schoolsRepository = schoolsRepository
        this.dependenciesRepository = dependenciesRepository
    }

    async execute(id) {
        const school = await this.schoolsRepository.getById(id)
        if (!school) {
            throw new ResourceNotFoundError()
        }

        const dependencies = await this.dependenciesRepository.getBySchoolId(id)

        return {
            ...school,
            dependencies
        }
    }
}