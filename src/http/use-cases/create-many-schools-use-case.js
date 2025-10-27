
export class CreateManySchoolsUseCase {
    constructor(schoolsRepository, dependenciesRepository) {
        this.schoolsRepository = schoolsRepository
        this.dependenciesRepository = dependenciesRepository
    }

    async execute(data) {
        // Validações

        const { success } = await this.schoolsRepository.createMany(data)
        return {
            success
        }
    }
}