import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"

export class UpdateSchoolUseCase {
    constructor(schoolsRepository, dependenciesRepository) {
        this.schoolsRepository = schoolsRepository
        this.dependenciesRepository = dependenciesRepository
    }
    
    async execute(id, data, dependencies) {
        const targetSchool = await this.schoolsRepository.getById(id)
        if (!targetSchool) {
            throw new ResourceNotFoundError()
        }

        const updatedSchool = await this.schoolsRepository.update(id, data)
        dependencies.forEach(async dependencyData => {
            await this.dependenciesRepository.update(dependencyData.id, dependencyData)
        })

        return {
            school: updatedSchool
        }
    }
}